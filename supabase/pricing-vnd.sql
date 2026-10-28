-- Run in the Supabase SQL Editor to switch booking prices to VND.
-- total_jpy is retained only for compatibility with existing installations.
alter table public.bookings alter column currency_rate set default 1;
comment on column public.bookings.total_jpy is
  'Legacy compatibility column; new bookings use total_vnd and store 0 here.';
comment on column public.bookings.currency_rate is
  'Legacy compatibility column; new bookings use VND and store 1 here.';

create or replace function public.create_booking(
  p_renter_profile_id uuid,
  p_service_id text,
  p_hours integer,
  p_package_id text,
  p_sessions jsonb,
  p_meeting_place text,
  p_note text default '',
  p_coupon text default ''
)
returns public.bookings
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_customer_id uuid := auth.uid();
  v_role text;
  v_renter public.renter_profiles%rowtype;
  v_package_count integer;
  v_service_fee_vnd integer;
  v_base_vnd integer;
  v_subtotal_vnd integer;
  v_total_vnd bigint;
  v_vip_discount integer := 0;
  v_coupon_discount integer := 0;
  v_paid_vnd bigint;
  v_code text := 'DM' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10));
  v_booking public.bookings%rowtype;
begin
  select role into v_role from public.profiles where id = v_customer_id;
  if v_role is distinct from 'customer' then
    raise exception 'A customer account is required';
  end if;

  select * into v_renter
  from public.renter_profiles
  where id = p_renter_profile_id and is_active = true;
  if not found then
    raise exception 'Renter profile is unavailable';
  end if;

  if p_hours is null or p_hours not in (2, 4, 6, 8)
    or p_package_id is null or p_package_id not in ('pk1', 'pk2', 'pk3') then
    raise exception 'Invalid booking options';
  end if;
  if p_service_id is null or p_service_id not in ('cafe', 'movie', 'walk', 'dinner', 'photo', 'family') then
    raise exception 'Invalid service';
  end if;
  v_package_count := case p_package_id when 'pk1' then 1 when 'pk2' then 2 else 3 end;
  if p_sessions is null or jsonb_typeof(p_sessions) is distinct from 'array' then
    raise exception 'Invalid booking sessions';
  end if;
  if jsonb_array_length(p_sessions) <> v_package_count then
    raise exception 'Invalid booking sessions';
  end if;
  if exists (
    select 1
    from jsonb_array_elements(p_sessions) as sessions(item)
    where coalesce(item ->> 'd', '') !~ '^\d{4}-\d{2}-\d{2}$'
      or coalesce(item ->> 't', '') !~ '^([01]\d|2[0-3]):[0-5]\d$'
      or case
        when coalesce(item ->> 'd', '') ~ '^\d{4}-\d{2}-\d{2}$'
          then (item ->> 'd')::date < current_date
        else true
      end
  ) then
    raise exception 'Invalid booking date or time';
  end if;
  if coalesce(trim(p_meeting_place), '') = '' then
    raise exception 'Meeting place is required';
  end if;

  v_base_vnd := case v_renter.section
    when 'platinum' then 20000 when 'gold' then 15000
    when 'silver' then 10000 else 7000 end * p_hours / 2;
  v_service_fee_vnd := round(v_base_vnd * case p_service_id
    when 'cafe' then 0 when 'movie' then 5 when 'walk' then 10
    when 'dinner' then 15 when 'photo' then 20 when 'family' then 40 end / 100.0);
  v_subtotal_vnd := (v_base_vnd + v_service_fee_vnd) * v_package_count;
  v_total_vnd := v_subtotal_vnd
    - round(v_subtotal_vnd * case p_package_id when 'pk2' then 6 when 'pk3' then 10 else 0 end / 100.0);

  select coalesce(sum(total_vnd), 0) into v_paid_vnd
  from public.bookings where customer_id = v_customer_id and status in ('paid', 'completed');
  v_vip_discount := case
    when v_paid_vnd >= 150000 then 8 when v_paid_vnd >= 80000 then 5
    when v_paid_vnd >= 30000 then 3 else 0 end;
  v_total_vnd := v_total_vnd - round(v_total_vnd * v_vip_discount / 100.0);

  if upper(trim(coalesce(p_coupon, ''))) = 'DIAMOND10' then
    v_coupon_discount := round(v_total_vnd * 10 / 100.0);
  elsif upper(trim(coalesce(p_coupon, ''))) = 'KAZUYA' then
    v_coupon_discount := round(v_total_vnd * 5 / 100.0);
  elsif upper(trim(coalesce(p_coupon, ''))) = 'WELCOME' then
    v_coupon_discount := least(v_total_vnd, 1000);
  elsif trim(coalesce(p_coupon, '')) <> '' then
    raise exception 'Invalid coupon';
  end if;
  v_total_vnd := greatest(v_total_vnd - v_coupon_discount, 0);

  insert into public.bookings (
    code, customer_id, renter_profile_id, service_id, hours, package_id,
    sessions, meeting_place, note, coupon, total_jpy, total_vnd, transfer_reference
  ) values (
    v_code, v_customer_id, p_renter_profile_id, p_service_id, p_hours, p_package_id,
    p_sessions, trim(p_meeting_place), left(coalesce(p_note, ''), 1000), upper(trim(coalesce(p_coupon, ''))),
    0, v_total_vnd, v_code
  ) returning * into v_booking;

  return v_booking;
end;
$$;

revoke all on function public.create_booking(uuid, text, integer, text, jsonb, text, text, text) from public, anon;
grant execute on function public.create_booking(uuid, text, integer, text, jsonb, text, text, text) to authenticated;
