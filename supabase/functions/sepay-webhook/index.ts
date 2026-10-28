import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function hex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ success: false }, 405);

  const secret = Deno.env.get("SEPAY_WEBHOOK_SECRET");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const destinationAccount = Deno.env.get("SEPAY_BANK_ACCOUNT");
  if (!secret || !supabaseUrl || !serviceRoleKey || !destinationAccount) {
    console.error("Missing required SePay or Supabase function secrets");
    return json({ success: false }, 500);
  }

  const timestamp = request.headers.get("x-sepay-timestamp") ?? "";
  const signature = request.headers.get("x-sepay-signature") ?? "";
  const timestampSeconds = Number(timestamp);
  if (!Number.isInteger(timestampSeconds) || Math.abs(Date.now() / 1000 - timestampSeconds) > 300) {
    return json({ success: false, message: "Invalid or expired signature timestamp" }, 401);
  }

  const rawBody = await request.text();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${rawBody}`),
  );
  const expected = `sha256=${hex(new Uint8Array(digest))}`;
  if (!safeEqual(signature, expected)) {
    return json({ success: false, message: "Invalid signature" }, 401);
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ success: false, message: "Invalid JSON" }, 400);
  }

  const accountNumber = String(event.accountNumber ?? "");
  const transferType = String(event.transferType ?? "");
  const transactionId = String(event.id ?? "");
  const amount = Number(event.transferAmount);
  const transferText = `${String(event.content ?? "")} ${String(event.description ?? "")}`;
  const match = transferText.match(/\b(DM[A-Z0-9]{6,12})\b/i);
  if (
    transferType !== "in" ||
    accountNumber !== destinationAccount ||
    !transactionId ||
    !Number.isSafeInteger(amount) ||
    amount <= 0 ||
    !match
  ) {
    return json({ success: true, ignored: true });
  }

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  const { error } = await client.rpc("process_sepay_payment", {
    p_transaction_id: transactionId,
    p_code: match[1].toUpperCase(),
    p_amount_vnd: amount,
    p_reference_code: String(event.referenceCode ?? ""),
    p_payload: event,
  });
  if (error) {
    console.error("Could not reconcile SePay transaction", {
      transactionId,
      message: error.message,
    });
    return json({ success: false, message: "Payment reconciliation failed" }, 500);
  }

  return json({ success: true });
});
