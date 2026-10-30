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

type PinterestImage = {
  url?: string;
  width?: number;
  height?: number;
};

type PinterestPin = {
  id: string;
  media?: { images?: Record<string, PinterestImage> };
};

function pinterestImages(pin: PinterestPin): PinterestImage[] {
  return Object.values(pin.media?.images ?? {})
    .filter((image) => {
      if (typeof image.url !== "string") return false;
      try {
        const url = new URL(image.url);
        return url.protocol === "https:" && url.hostname === "i.pinimg.com";
      } catch {
        return false;
      }
    })
    .sort((a, b) => (b.width ?? 0) * (b.height ?? 0) - (a.width ?? 0) * (a.height ?? 0));
}

function sameSecret(a: string, b: string) {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let i = 0; i < left.length; i++) mismatch |= left[i] ^ right[i];
  return mismatch === 0;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const expectedSecret = Deno.env.get("AI_SOCIAL_SCHEDULER_SECRET");
  const providedSecret = request.headers.get("x-scheduler-secret") ?? "";
  if (!expectedSecret || !sameSecret(providedSecret, expectedSecret)) {
    return json({ error: "Unauthorized scheduler" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const pinterestAccessToken = Deno.env.get("PINTEREST_ACCESS_TOKEN");
  const pinterestBoardId = Deno.env.get("PINTEREST_BOARD_ID");
  const cloudflareAccountId = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
  const cloudflareApiToken = Deno.env.get("CLOUDFLARE_API_TOKEN");
  const model = Deno.env.get("CLOUDFLARE_AI_MODEL") ?? "@cf/meta/llama-3.2-3b-instruct";
  if (!supabaseUrl || !serviceRoleKey || !pinterestAccessToken || !pinterestBoardId || !cloudflareAccountId || !cloudflareApiToken) {
    return json({ error: "Pinterest, Cloudflare, or Supabase secrets are not configured" }, 503);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  const { data: due, error: claimError } = await admin.rpc("claim_due_ai_social_profiles", { p_limit: 20 });
  if (claimError) {
    console.error("Could not claim scheduled AI profiles", claimError.message);
    return json({ error: "Could not claim scheduled profiles" }, 500);
  }
  const profileIds = (due ?? []).map((item: { renter_profile_id: string }) => item.renter_profile_id);
  if (!profileIds.length) return json({ success: true, published: 0 });

  const [{ data: profiles, error: profilesError }, { data: personas, error: personasError }] = await Promise.all([
    admin.from("renter_profiles").select("id,display_name,tags").in("id", profileIds),
    admin.from("renter_personas").select("renter_profile_id,system_prompt").in("renter_profile_id", profileIds),
  ]);
  if (profilesError || personasError) {
    console.error("Could not load scheduled AI profiles", profilesError?.message || personasError?.message);
    return json({ error: "Could not load scheduled profiles" }, 500);
  }
  const personaById = new Map((personas ?? []).map((persona) => [persona.renter_profile_id, persona.system_prompt]));
  let published = 0;
  const errors: string[] = [];

  for (const profile of profiles ?? []) {
    try {
      const boardPinsUrl = new URL(
        `https://api.pinterest.com/v5/boards/${encodeURIComponent(pinterestBoardId)}/pins`,
      );
      boardPinsUrl.searchParams.set("page_size", "100");
      const pinsResponse = await fetch(boardPinsUrl, {
        headers: { Authorization: `Bearer ${pinterestAccessToken}` },
      });
      if (!pinsResponse.ok) throw new Error(`Pinterest API HTTP ${pinsResponse.status}`);
      const pinsBody = await pinsResponse.json();
      const pins: PinterestPin[] = Array.isArray(pinsBody.items) ? pinsBody.items : [];
      if (!pins.length) throw new Error("Pinterest board has no readable pins");

      const { data: priorPhotos, error: priorError } = await admin.from("social_posts")
        .select("source_url").eq("renter_profile_id", profile.id).not("source_url", "is", null)
        .order("created_at", { ascending: false }).limit(50);
      if (priorError) throw new Error("Could not check previously used Pinterest pins");
      const prior = new Set((priorPhotos ?? []).map((row) => row.source_url));
      const pin = pins.find((candidate) => {
        if (!/^\d+$/.test(candidate.id)) return false;
        const sourceUrl = `https://www.pinterest.com/pin/${candidate.id}/`;
        return !prior.has(sourceUrl) && pinterestImages(candidate).length > 0;
      });
      if (!pin) throw new Error("No unused, readable Pinterest image is available");
      const image = pinterestImages(pin)[0];
      if (!image?.url) throw new Error("Pinterest pin has no supported image URL");
      const sourceUrl = `https://www.pinterest.com/pin/${pin.id}/`;

      const systemPrompt = personaById.get(profile.id) ?? "Bạn là nhân vật AI hư cấu, thân thiện và tự nhiên.";
      const captionResponse = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(cloudflareAccountId)}/ai/run/${model}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${cloudflareApiToken}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: `${systemPrompt}\nBạn là nhân vật hư cấu ${profile.display_name}. Viết caption mạng xã hội bằng tiếng Việt, tối đa 180 ký tự, không nói hoặc ám chỉ ảnh Pinterest là ảnh thật do bạn chụp, không đề cập gặp mặt ngoài đời, không đưa dữ liệu cá nhân hay nội dung nhạy cảm. Chú thích ngắn rằng đây là ảnh minh họa.`,
              },
              { role: "user", content: "Viết một caption tích cực về một buổi đi cà phê hoặc dạo phố." },
            ],
            max_tokens: 120,
            temperature: 0.8,
          }),
        },
      );
      if (!captionResponse.ok) throw new Error(`Caption model HTTP ${captionResponse.status}`);
      const captionBody = await captionResponse.json();
      const generated = typeof captionBody.result?.response === "string"
        ? captionBody.result.response.trim().replace(/^["“]|["”]$/g, "")
        : "";
      if (!generated) throw new Error("Caption model returned an empty caption");
      const caption = `${generated.slice(0, 170)} · Ảnh minh họa từ Pinterest.`;

      const { data: didPublish, error: publishError } = await admin.rpc("publish_ai_social_post", {
        p_renter_profile_id: profile.id,
        p_caption: caption,
        p_media_url: image.url,
        p_source_url: sourceUrl,
        p_source_credit: "Ảnh từ Pinterest board do quản trị viên cấp quyền",
      });
      if (publishError) throw new Error("Could not publish scheduled post");
      if (didPublish === true) published++;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown scheduled post error";
      console.error(`AI social post failed for ${profile.id}`, message);
      errors.push(profile.id);
      const { error: scheduleError } = await admin.rpc("set_ai_social_post_error", {
        p_renter_profile_id: profile.id,
        p_error: message,
      });
      if (scheduleError) console.error("Could not reschedule failed AI post", scheduleError.message);
    }
  }

  return json({ success: errors.length === 0, published, failed: errors.length });
});
