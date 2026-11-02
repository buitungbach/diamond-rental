import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-scheduler-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });

function sameSecret(a: string, b: string) {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let i = 0; i < left.length; i++) mismatch |= left[i] ^ right[i];
  return mismatch === 0;
}

function notificationContent(type: string, code: string) {
  const siteUrl = "https://buitungbach.github.io/diamond-rental/";
  const detail = code ? ` · ${code}` : "";
  if (type === "new_message") return {
    title: "VELORA · Tin nhắn mới",
    body: "Bạn có tin nhắn mới. Chạm để mở tài khoản.",
    url: `${siteUrl}#account`,
  };
  const messages: Record<string, string> = {
    booking_created: "Bạn có đơn thuê mới đang chờ thanh toán.",
    booking_paid: "Thanh toán đơn thuê đã được xác nhận.",
    booking_cancelled: "Đơn thuê của bạn đã được hủy.",
    booking_rescheduled: "Lịch thuê của bạn vừa được thay đổi.",
    booking_updated: "Đơn thuê của bạn vừa được cập nhật.",
  };
  return {
    title: "VELORA · Cập nhật đơn thuê",
    body: `${messages[type] ?? "Tài khoản của bạn có cập nhật mới."}${detail}`,
    url: `${siteUrl}#orders`,
  };
}

function isSupportedPushEndpoint(endpoint: string) {
  try {
    const url = new URL(endpoint);
    return url.protocol === "https:"
      && !url.username
      && !url.password
      && (
        ["fcm.googleapis.com", "web.push.apple.com", "push.services.mozilla.com", "updates.push.services.mozilla.com"].includes(url.hostname)
        || url.hostname.endsWith(".notify.windows.com")
      );
  } catch {
    return false;
  }
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const expectedSecret = Deno.env.get("WEB_PUSH_SCHEDULER_SECRET");
  const providedSecret = request.headers.get("x-scheduler-secret") ?? "";
  if (!expectedSecret || !sameSecret(providedSecret, expectedSecret)) {
    return json({ error: "Unauthorized scheduler" }, 401);
  }
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY");
  const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY");
  const vapidSubject = Deno.env.get("VAPID_SUBJECT");
  if (!supabaseUrl || !serviceRoleKey || !vapidPublicKey || !vapidPrivateKey || !vapidSubject) {
    return json({ error: "Web Push service secrets are not configured" }, 503);
  }

  webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  const { data: jobs, error: claimError } = await admin.rpc("claim_push_outbox", { p_limit: 50 });
  if (claimError) {
    console.error("Could not claim push jobs", claimError.message);
    return json({ error: "Could not claim push jobs" }, 500);
  }

  let sent = 0;
  let failed = 0;
  for (const job of jobs ?? []) {
    let deliveryError = "";
    const { data: subscriptions, error: subscriptionError } = await admin.from("push_subscriptions")
      .select("endpoint,p256dh,auth").eq("user_id", job.user_id);
    if (subscriptionError) {
      deliveryError = "Could not load push subscriptions";
      console.error(deliveryError, subscriptionError.message);
    } else {
      const notice = notificationContent(job.notification_type, job.reference_code || "");
      const payload = JSON.stringify({
        ...notice,
        tag: `velora-${job.id}`,
      });
      for (const subscription of subscriptions ?? []) {
        if (!isSupportedPushEndpoint(subscription.endpoint)) {
          const { error: deleteError } = await admin.from("push_subscriptions")
            .delete().eq("endpoint", subscription.endpoint);
          if (deleteError) {
            deliveryError ||= "Could not remove unsupported push subscription";
            console.error(deliveryError, deleteError.message);
          }
          continue;
        }
        try {
          await webpush.sendNotification({
            endpoint: subscription.endpoint,
            keys: { p256dh: subscription.p256dh, auth: subscription.auth },
          }, payload);
        } catch (error) {
          const statusCode = typeof error === "object" && error !== null && "statusCode" in error
            ? Number(error.statusCode) : 0;
          if (statusCode === 404 || statusCode === 410) {
            const { error: deleteError } = await admin.from("push_subscriptions")
              .delete().eq("endpoint", subscription.endpoint);
            if (deleteError) {
              deliveryError ||= "Could not remove expired push subscription";
              console.error(deliveryError, deleteError.message);
            }
          } else {
            deliveryError ||= error instanceof Error ? error.message.slice(0, 250) : "Push provider failed";
          }
        }
      }
    }

    const { error: resultError } = await admin.rpc("set_push_outbox_result", {
      p_id: job.id,
      p_delivered: !deliveryError,
      p_error: deliveryError || null,
    });
    if (resultError) {
      console.error("Could not record push delivery result", resultError.message);
      failed++;
    } else if (deliveryError) {
      failed++;
    } else {
      sent++;
    }
  }
  return json({ success: failed === 0, sent, failed });
});
