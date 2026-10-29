import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const authorization = request.headers.get("authorization");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const openAiKey = Deno.env.get("OPENAI_API_KEY");
  if (!authorization || !supabaseUrl || !anonKey || !serviceRoleKey || !openAiKey) {
    return json({ error: "Chat AI is not configured" }, 503);
  }

  let input: { booking_id?: string; admin_chat_id?: string; message_id?: string };
  try {
    input = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const isAdminChat = Boolean(input.admin_chat_id);
  if ((!input.booking_id && !isAdminChat) || (input.booking_id && isAdminChat) || !input.message_id) {
    return json({ error: "Missing or conflicting message identifiers" }, 400);
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { authorization } },
    auth: { persistSession: false },
  });
  const { data: userData, error: userError } = await userClient.auth.getUser();
  if (userError || !userData.user) return json({ error: "Unauthorized" }, 401);

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  let conversationId: string;
  let renterProfileId: string;
  let expectedSenderKind: "customer" | "admin";
  if (isAdminChat) {
    const { data: thread, error: threadError } = await admin
      .from("admin_chat_threads")
      .select("id,admin_id,renter_profile_id")
      .eq("id", input.admin_chat_id)
      .maybeSingle();
    if (threadError) return json({ error: "Could not load admin chat" }, 500);
    if (!thread || thread.admin_id !== userData.user.id) {
      return json({ error: "Admin chat access required" }, 403);
    }
    conversationId = thread.id;
    renterProfileId = thread.renter_profile_id;
    expectedSenderKind = "admin";
  } else {
    const { data: booking, error: bookingError } = await admin
      .from("bookings")
      .select("id,customer_id,renter_profile_id,status")
      .eq("id", input.booking_id)
      .maybeSingle();
    if (bookingError) return json({ error: "Could not load booking" }, 500);
    if (!booking || booking.status !== "paid" || booking.customer_id !== userData.user.id) {
      return json({ error: "Paid customer booking required" }, 403);
    }
    conversationId = booking.id;
    renterProfileId = booking.renter_profile_id;
    expectedSenderKind = "customer";
  }

  const { data: persona, error: profileError } = await admin
    .from("renter_profiles")
    .select("id,persona_mode,display_name")
    .eq("id", renterProfileId)
    .maybeSingle();
  if (profileError) return json({ error: "Could not load renter profile" }, 500);
  if (!persona || persona.persona_mode !== "ai") return json({ skipped: true });
  const { data: personaConfig, error: personaError } = await admin
    .from("renter_personas")
    .select("system_prompt")
    .eq("renter_profile_id", persona.id)
    .maybeSingle();
  if (personaError) return json({ error: "Could not load persona configuration" }, 500);
  if (!personaConfig) return json({ error: "AI persona is not configured" }, 503);

  const messageTable = isAdminChat ? "admin_chat_messages" : "messages";
  const conversationColumn = isAdminChat ? "thread_id" : "booking_id";
  const { data: message, error: messageError } = await admin
    .from(messageTable)
    .select("id,body,sender_id,sender_kind")
    .eq("id", input.message_id)
    .eq(conversationColumn, conversationId)
    .maybeSingle();
  if (messageError) return json({ error: "Could not load message" }, 500);
  if (!message || message.sender_id !== userData.user.id || message.sender_kind !== expectedSenderKind) {
    return json({ error: "Chat message not found" }, 404);
  }

  const { data: existingReply, error: existingReplyError } = await admin
    .from(messageTable)
    .select("id")
    .eq("reply_to_message_id", message.id)
    .maybeSingle();
  if (existingReplyError) return json({ error: "Could not check existing AI reply" }, 500);
  if (existingReply) return json({ success: true, already_replied: true });

  const { data: recent, error: historyError } = await admin
    .from(messageTable)
    .select("sender_kind,body")
    .eq(conversationColumn, conversationId)
    .order("created_at", { ascending: false })
    .limit(12);
  if (historyError) return json({ error: "Could not load chat history" }, 500);

  const completion = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${openAiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: Deno.env.get("OPENAI_MODEL") ?? "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Bạn là nhân vật hư cấu ${persona.display_name}. ${personaConfig.system_prompt} Hãy trả lời bằng tiếng Việt tự nhiên, thân thiện, không khẳng định bạn là người thật và không yêu cầu thông tin thanh toán.`,
        },
        ...(recent ?? []).reverse().map((entry) => ({
          role: entry.sender_kind === "persona" ? "assistant" : "user",
          content: entry.body,
        })),
      ],
      max_tokens: 300,
      temperature: 0.8,
    }),
  });
  if (!completion.ok) {
    console.error("OpenAI chat request failed", completion.status);
    return json({ error: "AI reply service failed" }, 502);
  }
  const result = await completion.json();
  const reply = String(result.choices?.[0]?.message?.content ?? "").trim();
  if (!reply) return json({ error: "AI returned an empty reply" }, 502);

  const { error: saveError } = await admin.from(messageTable).insert({
    [conversationColumn]: conversationId,
    reply_to_message_id: message.id,
    sender_id: null,
    sender_kind: "persona",
    body: reply.slice(0, 2000),
  });
  if (saveError) {
    console.error("Could not save AI reply", saveError.message);
    return json({ error: "Could not save AI reply" }, 500);
  }
  return json({ success: true });
});
