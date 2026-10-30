import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const reply = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });

async function listMediaPaths(
  admin: ReturnType<typeof createClient>,
  bucket: string,
  prefix: string,
) {
  const paths: string[] = [];
  const pending = [prefix];
  let foldersVisited = 0;
  while (pending.length) {
    const current = pending.pop()!;
    foldersVisited++;
    if (foldersVisited > 1000 || current.split("/").length > 12) {
      throw new Error(`Account media folder structure in ${bucket} exceeds cleanup limits`);
    }
    for (let offset = 0; ; offset += 100) {
      const { data, error } = await admin.storage.from(bucket).list(current, {
        limit: 100,
        offset,
        sortBy: { column: "name", order: "asc" },
      });
      if (error) throw new Error(`Could not enumerate ${bucket} media`);
      for (const entry of data ?? []) {
        if (entry.name === ".emptyFolderPlaceholder") continue;
        const path = `${current}/${entry.name}`;
        if (entry.id) paths.push(path);
        else pending.push(path);
      }
      if ((data ?? []).length < 100) break;
    }
  }
  return paths;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return reply({ error: "Method not allowed" }, 405);

  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceRoleKey) return reply({ error: "Backend is not configured" }, 503);
  if (!token) return reply({ error: "Unauthorized" }, 401);

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false },
  });
  const { data: userData, error: userError } = await userClient.auth.getUser(token);
  if (userError || !userData.user) return reply({ error: "Unauthorized" }, 401);

  let input: { action?: string };
  try {
    input = await request.json();
  } catch {
    return reply({ error: "Invalid JSON" }, 400);
  }
  if (input.action !== "export" && input.action !== "delete") {
    return reply({ error: "Unsupported privacy action" }, 400);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  const userId = userData.user.id;

  if (input.action === "delete") {
    const { data: profile, error: profileError } = await admin.from("profiles")
      .select("role").eq("id", userId).maybeSingle();
    if (profileError) return reply({ error: "Could not read account profile" }, 500);
    if (!profile) return reply({ error: "Account profile was not found" }, 404);
    if (profile.role === "admin") {
      return reply({ error: "Transfer administrator duties before deleting this account" }, 409);
    }

    const { data: ownedProfiles, error: renterError } = await admin.from("renter_profiles")
      .select("id").eq("owner_id", userId);
    if (renterError) return reply({ error: "Could not prepare account media cleanup" }, 500);

    let mediaPaths: string[] = [];
    try {
      mediaPaths = await listMediaPaths(admin, "renter-photos", userId);
      for (const profile of ownedProfiles ?? []) {
        mediaPaths.push(...await listMediaPaths(admin, "renter-social-media", profile.id));
      }
    } catch (error) {
      console.error("Could not enumerate account media", String(error));
      return reply({ error: "Could not safely remove account media; no account deletion was started" }, 500);
    }

    const { error: eraseError } = await userClient.rpc("erase_my_account_data");
    if (eraseError) {
      console.error("Could not erase account data", eraseError.message);
      return reply({ error: eraseError.message }, 409);
    }
    let mediaCleanupError = "";
    for (const bucket of ["renter-social-media", "renter-photos"]) {
      const bucketPaths = mediaPaths.filter((path) =>
        bucket === "renter-photos" ? path.startsWith(`${userId}/`)
          : (ownedProfiles ?? []).some((profile) => path.startsWith(`${profile.id}/`)));
      if (!bucketPaths.length) continue;
      const { error } = await admin.storage.from(bucket).remove(bucketPaths);
      if (error) {
        console.error(`Could not remove user media from ${bucket}`, error.message);
        mediaCleanupError ||= `${bucket}: ${error.message}`;
      }
    }
    const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
    if (deleteError) {
      console.error("Account data was erased but the authentication account could not be deleted", deleteError.message);
      return reply({
        error: "Account data was erased, but authentication deletion did not finish. Contact the administrator.",
        data_erased: true,
      }, 500);
    }
    if (mediaCleanupError) {
      return reply({
        error: "The account was deleted, but some stored media could not be removed. Contact the administrator for cleanup.",
        data_erased: true,
        auth_deleted: true,
      }, 500);
    }
    return reply({ success: true });
  }

  const { data: profile, error: profileError } = await admin.from("profiles")
    .select("id,role,full_name,date_of_birth,phone,email,created_at,email_notifications_enabled")
    .eq("id", userId).single();
  if (profileError) return reply({ error: "Could not export account profile" }, 500);

  const { data: renterProfiles, error: renterError } = await admin.from("renter_profiles")
    .select("id,display_name,section,tags,bio,avatar_url,chat_background_url,availability,is_verified,created_at")
    .eq("owner_id", userId);
  if (renterError) return reply({ error: "Could not export renter profiles" }, 500);
  const renterIds = (renterProfiles ?? []).map((renter) => renter.id);
  const customerBookingsResult = profile.role === "customer"
    ? await admin.from("bookings").select("id,code,invoice_number,status,service_id,hours,package_id,sessions,meeting_place,note,coupon,total_vnd,transfer_reference,created_at,paid_at")
      .eq("customer_id", userId)
    : { data: [], error: null };
  if (customerBookingsResult.error) return reply({ error: "Could not export bookings" }, 500);

  const renterBookingsResult = renterIds.length
    ? await admin.from("bookings").select("id,code,status,service_id,hours,package_id,sessions,total_vnd,created_at,paid_at,renter_profile_id")
      .in("renter_profile_id", renterIds)
    : { data: [], error: null };
  if (renterBookingsResult.error) return reply({ error: "Could not export renter bookings" }, 500);
  const bookingRows = [...(customerBookingsResult.data ?? []), ...(renterBookingsResult.data ?? [])];
  const bookingIds = [...new Set(bookingRows.map((booking) => booking.id))];
  const messagesResult = bookingIds.length
    ? await admin.from("messages").select("booking_id,sender_kind,body,read_at,created_at").in("booking_id", bookingIds)
    : { data: [], error: null };
  if (messagesResult.error) return reply({ error: "Could not export chat messages" }, 500);
  const adminThreadsResult = renterIds.length
    ? await admin.from("admin_chat_threads").select("id,renter_profile_id,created_at")
      .in("renter_profile_id", renterIds)
    : { data: [], error: null };
  if (adminThreadsResult.error) return reply({ error: "Could not export admin chat threads" }, 500);
  const adminThreadIds = (adminThreadsResult.data ?? []).map((thread) => thread.id);
  const adminMessagesResult = adminThreadIds.length
    ? await admin.from("admin_chat_messages")
      .select("thread_id,sender_kind,body,read_at,created_at")
      .in("thread_id", adminThreadIds)
    : { data: [], error: null };
  if (adminMessagesResult.error) return reply({ error: "Could not export admin chat messages" }, 500);

  const [galleryResult, postResult, commentResult, likeResult, notificationResult, socialReportsResult, chatReportsResult] = await Promise.all([
    renterIds.length ? admin.from("renter_gallery").select("renter_profile_id,media_url,media_type,caption,source_url,source_credit,status,created_at").in("renter_profile_id", renterIds) : Promise.resolve({ data: [], error: null }),
    renterIds.length ? admin.from("social_posts").select("renter_profile_id,caption,media_url,media_type,source_url,source_credit,status,created_at,published_at").in("renter_profile_id", renterIds) : Promise.resolve({ data: [], error: null }),
    admin.from("social_comments").select("post_id,body,created_at").eq("author_id", userId),
    admin.from("social_likes").select("post_id,created_at").eq("user_id", userId),
    admin.from("app_notifications").select("notification_type,title,body,reference_code,read_at,created_at").eq("user_id", userId),
    admin.from("social_reports").select("post_id,reason,status,created_at,resolved_at").eq("reporter_id", userId),
    admin.from("chat_reports").select("booking_id,reason,status,created_at,resolved_at").eq("reporter_id", userId),
  ]);
  const errors = [
    galleryResult.error, postResult.error, commentResult.error, likeResult.error,
    notificationResult.error, socialReportsResult.error, chatReportsResult.error,
  ];
  if (errors.some(Boolean)) return reply({ error: "Could not export all account data" }, 500);

  return reply({
    schema_version: 1,
    exported_at: new Date().toISOString(),
    account: profile,
    renter_profiles: renterProfiles ?? [],
    bookings: bookingRows,
    booking_messages: messagesResult.data ?? [],
    admin_chat_threads: adminThreadsResult.data ?? [],
    admin_chat_messages: adminMessagesResult.data ?? [],
    gallery: galleryResult.data ?? [],
    posts: postResult.data ?? [],
    comments: commentResult.data ?? [],
    likes: likeResult.data ?? [],
    notifications: notificationResult.data ?? [],
    social_reports: socialReportsResult.data ?? [],
    chat_reports: chatReportsResult.data ?? [],
  });
});
