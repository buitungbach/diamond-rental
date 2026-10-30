import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

function template(event: string, code: string, recipient: string) {
  const detail = code && code !== "ADMIN" ? `\nMã đơn: ${code}` : "";
  const messages: Record<string, string> = {
    booking_created: `Đơn đặt lịch của bạn đã được tạo và đang chờ quản trị viên đối chiếu chuyển khoản.`,
    booking_paid: `Thanh toán cho đơn của bạn đã được xác nhận.`,
    booking_cancelled: `Đơn của bạn đã được hủy. Nếu đã thanh toán, quản trị viên sẽ liên hệ để xử lý hoàn/đối soát thủ công.`,
    booking_rescheduled: `Lịch đặt của bạn đã được thay đổi.`,
    booking_updated: `Đơn đặt lịch của bạn vừa được cập nhật.`,
    new_message: `Bạn có tin nhắn mới. Đăng nhập website để xem; nội dung chat không được đính kèm trong email.`,
  };
  return {
    subject: event === "new_message" ? "Diamond Rental: bạn có tin nhắn mới" : "Diamond Rental: cập nhật đơn đặt lịch",
    text: `Xin chào ${recipient || "bạn"},\n\n${messages[event] ?? "Tài khoản của bạn có cập nhật mới."}${detail}\n\nĐăng nhập tại https://buitungbach.github.io/diamond-rental/ để xem chi tiết.\n\nĐây là email thông báo tự động.`,
  };
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const expectedSecret = Deno.env.get("NOTIFICATION_SCHEDULER_SECRET");
  const providedSecret = request.headers.get("x-scheduler-secret") ?? "";
  if (!expectedSecret || !sameSecret(providedSecret, expectedSecret)) {
    return json({ error: "Unauthorized scheduler" }, 401);
  }
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("RESEND_FROM_EMAIL");
  if (!supabaseUrl || !serviceRoleKey || !resendApiKey || !from) {
    return json({ error: "Email service secrets are not configured" }, 503);
  }
  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  const { data: jobs, error: claimError } = await admin.rpc("claim_email_outbox", { p_limit: 50 });
  if (claimError) {
    console.error("Could not claim email jobs", claimError.message);
    return json({ error: "Could not claim email jobs" }, 500);
  }

  let sent = 0;
  let failed = 0;
  for (const job of jobs ?? []) {
    const recipient = typeof job.payload?.recipient === "string" ? job.payload.recipient : "";
    const code = typeof job.payload?.booking_code === "string" ? job.payload.booking_code : "";
    const message = template(job.event_type, code, recipient);
    let deliveryError = "";
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${resendApiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [job.recipient_email],
          subject: message.subject,
          text: message.text,
        }),
      });
      if (!response.ok) deliveryError = `Resend HTTP ${response.status}`;
    } catch (error) {
      deliveryError = error instanceof Error ? error.message.slice(0, 250) : "Email provider connection failed";
    }

    const { error: resultError } = await admin.rpc("set_email_outbox_result", {
      p_id: job.id,
      p_sent: !deliveryError,
      p_error: deliveryError || null,
    });
    if (resultError) {
      console.error("Could not record email delivery result", resultError.message);
      failed++;
    } else if (deliveryError) {
      failed++;
    } else {
      sent++;
    }
  }
  return json({ success: failed === 0, sent, failed });
});
