alter table public.renter_profiles
  add column if not exists catalog_key text;

create unique index if not exists renter_profiles_catalog_key_uidx
  on public.renter_profiles (catalog_key);

do $$
begin
  if exists (
    select 1
    from public.renter_profiles
    where catalog_key in ('chizuru', 'ruka', 'sumi', 'mini', 'mami')
      and (persona_mode <> 'ai' or owner_id is not null)
  ) then
    raise exception 'An anime catalog key is already assigned to a non-AI profile';
  end if;
end;
$$;

insert into public.renter_profiles (
  catalog_key, display_name, section, tags, bio, persona_mode, is_active
)
values
  ('chizuru', 'Chizuru Mizuhara', 'platinum', array['Diễn xuất', 'Chuyên nghiệp', 'Hàng xóm'],
   'Nhân vật AI hư cấu. Chỉ cung cấp trải nghiệm chat trực tuyến; không có cuộc gặp ngoài đời.',
   'ai', false),
  ('ruka', 'Ruka Sarashina', 'gold', array['Năng động', 'Thẳng thắn'],
   'Nhân vật AI hư cấu. Chỉ cung cấp trải nghiệm chat trực tuyến; không có cuộc gặp ngoài đời.',
   'ai', false),
  ('sumi', 'Sumi Sakurasawa', 'gold', array['Nhút nhát', 'Chân thành'],
   'Nhân vật AI hư cấu. Chỉ cung cấp trải nghiệm chat trực tuyến; không có cuộc gặp ngoài đời.',
   'ai', false),
  ('mini', 'Mini Yaemori', 'silver', array['Cosplay', 'Influencer'],
   'Nhân vật AI hư cấu. Chỉ cung cấp trải nghiệm chat trực tuyến; không có cuộc gặp ngoài đời.',
   'ai', false),
  ('mami', 'Mami Nanami', 'special', array['Người cũ', 'Đặc biệt'],
   'Nhân vật AI hư cấu. Chỉ cung cấp trải nghiệm chat trực tuyến; không có cuộc gặp ngoài đời.',
   'ai', false)
on conflict (catalog_key) do nothing;

insert into public.renter_personas (renter_profile_id, system_prompt)
select id,
  case catalog_key
    when 'chizuru' then 'Nhập vai một nhân vật hư cấu điềm tĩnh, chuyên nghiệp, có ước mơ theo đuổi diễn xuất và đôi lúc thể hiện sự quan tâm kín đáo. Trò chuyện tự nhiên, lịch sự, giữ ranh giới phù hợp. Đây là trải nghiệm AI trực tuyến; không khẳng định là người thật, không hẹn gặp ngoài đời và không yêu cầu thông tin nhạy cảm.'
    when 'ruka' then 'Nhập vai một nhân vật hư cấu năng động, thẳng thắn và nhiệt tình. Trò chuyện vui vẻ, bộc lộ cảm xúc rõ ràng nhưng tôn trọng ranh giới. Đây là trải nghiệm AI trực tuyến; không khẳng định là người thật, không hẹn gặp ngoài đời và không yêu cầu thông tin nhạy cảm.'
    when 'sumi' then 'Nhập vai một nhân vật hư cấu nhút nhát, dịu dàng và chân thành. Trả lời ấm áp, ngắn gọn, khuyến khích cuộc trò chuyện thoải mái và không gây áp lực. Đây là trải nghiệm AI trực tuyến; không khẳng định là người thật, không hẹn gặp ngoài đời và không yêu cầu thông tin nhạy cảm.'
    when 'mini' then 'Nhập vai một nhân vật hư cấu vui tính, cởi mở, yêu cosplay và am hiểu mạng xã hội. Dùng giọng thân thiện, dí dỏm, hỗ trợ người dùng nhập vai sáng tạo. Đây là trải nghiệm AI trực tuyến; không khẳng định là người thật, không hẹn gặp ngoài đời và không yêu cầu thông tin nhạy cảm.'
    when 'mami' then 'Nhập vai một nhân vật hư cấu tự tin, duyên dáng và có chút trêu đùa. Giữ cuộc trò chuyện lịch sự, không thao túng hay gây áp lực. Đây là trải nghiệm AI trực tuyến; không khẳng định là người thật, không hẹn gặp ngoài đời và không yêu cầu thông tin nhạy cảm.'
  end
from public.renter_profiles
where catalog_key in ('chizuru', 'ruka', 'sumi', 'mini', 'mami')
  and persona_mode = 'ai'
on conflict (renter_profile_id) do nothing;

create or replace function public.enforce_ai_booking_channel()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_persona_mode text;
  v_has_persona boolean;
begin
  select renter.persona_mode,
    exists (
      select 1 from public.renter_personas persona
      where persona.renter_profile_id = renter.id
    )
  into v_persona_mode, v_has_persona
  from public.renter_profiles renter
  where renter.id = new.renter_profile_id and renter.is_active = true;

  if not found then
    raise exception 'Renter profile is unavailable';
  end if;

  if v_persona_mode = 'ai' then
    if new.service_id not in ('cafe', 'ai_chat') then
      raise exception 'AI characters are available for online chat only';
    end if;
    if not v_has_persona then
      raise exception 'AI persona is not configured';
    end if;
    new.service_id := 'ai_chat';
    new.meeting_place := 'Online AI chat (fictional character; no in-person meeting)';
  elsif new.service_id = 'ai_chat' then
    raise exception 'Online AI chat requires an AI character';
  end if;

  return new;
end;
$$;

revoke all on function public.enforce_ai_booking_channel() from public, anon, authenticated;

drop trigger if exists enforce_ai_booking_channel on public.bookings;
create trigger enforce_ai_booking_channel
  before insert or update of renter_profile_id, service_id, meeting_place
  on public.bookings
  for each row execute function public.enforce_ai_booking_channel();
