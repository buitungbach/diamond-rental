-- Add QR-transfer and cash-at-meeting payment choices.
-- Run after schema.sql, pricing-vnd.sql, feature-upgrades.sql, and
-- manual-payment.sql.

alter table public.bookings
  add column if not exists payment_method text not null default 'qr'
  check (payment_method in ('qr', 'cash'));

create or replace function public.create_booking_with_payment_method(
  p_renter_profile_id uuid,
  p_service_id text,
  p_hours integer,
  p_package_id text,
  p_sessions jsonb,
  p_meeting_place text,
  p_note text default '',
  p_coupon text default '',
  p_payment_method text default 'qr'
)
returns public.bookings
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_booking public.bookings%rowtype;
  v_persona_mode text;
begin
  if p_payment_method not in ('qr', 'cash') then
    raise exception 'Invalid payment method';
  end if;

  select persona_mode into v_persona_mode
  from public.renter_profiles
  where id = p_renter_profile_id and is_active;
  if not found then
    raise exception 'Renter profile is unavailable';
  end if;
  if p_payment_method = 'cash' and v_persona_mode <> 'human' then
    raise exception 'Cash payment is available only for in-person renter profiles';
  end if;

  v_booking := public.create_booking(
    p_renter_profile_id, p_service_id, p_hours, p_package_id, p_sessions,
    p_meeting_place, p_note, p_coupon
  );
  update public.bookings
  set payment_method = p_payment_method
  where id = v_booking.id and customer_id = (select auth.uid())
  returning * into v_booking;
  if not found then
    raise exception 'Could not set booking payment method';
  end if;
  return v_booking;
end;
$$;
revoke all on function public.create_booking_with_payment_method(uuid, text, integer, text, jsonb, text, text, text, text) from public, anon;
grant execute on function public.create_booking_with_payment_method(uuid, text, integer, text, jsonb, text, text, text, text) to authenticated;

create or replace function public.get_renter_busy_slots(
  p_renter_profile_id uuid,
  p_date date
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_result jsonb;
begin
  if not exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'customer'
  ) then
    raise exception 'Customer account required';
  end if;
  if p_date < (now() at time zone 'Asia/Ho_Chi_Minh')::date
    or p_date > (now() at time zone 'Asia/Ho_Chi_Minh')::date + 90 then
    raise exception 'Availability can only be checked for the next 90 days';
  end if;
  if not exists (
    select 1 from public.renter_profiles
    where id = p_renter_profile_id and is_active
  ) then
    raise exception 'Renter profile is unavailable';
  end if;

  select coalesce(
    jsonb_agg(jsonb_build_object('t', session.item ->> 't', 'hours', booking.hours)),
    '[]'::jsonb
  )
  into v_result
  from public.bookings booking
  cross join lateral jsonb_array_elements(booking.sessions) as session(item)
  where booking.renter_profile_id = p_renter_profile_id
    and (
      booking.status in ('paid', 'completed')
      or (booking.status = 'pending' and (
        booking.payment_method = 'cash'
        or booking.created_at >= now() - interval '15 minutes'
      ))
    )
    and session.item ->> 'd' = p_date::text;

  return v_result;
end;
$$;
revoke all on function public.get_renter_busy_slots(uuid, date) from public, anon;
grant execute on function public.get_renter_busy_slots(uuid, date) to authenticated;

create or replace function public.validate_booking_schedule()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_availability jsonb;
  v_session jsonb;
  v_start timestamp;
  v_end timestamp;
  v_date date;
  v_minute integer;
  v_seen_sessions jsonb := '[]'::jsonb;
begin
  update public.bookings
  set status = 'cancelled'
  where renter_profile_id = new.renter_profile_id
    and status = 'pending'
    and payment_method = 'qr'
    and created_at < now() - interval '15 minutes';

  select availability into v_availability
  from public.renter_profiles
  where id = new.renter_profile_id and is_active
  for update;
  if not found then
    raise exception 'Renter profile is unavailable';
  end if;

  for v_session in select item from jsonb_array_elements(new.sessions) as sessions(item)
  loop
    v_date := (v_session ->> 'd')::date;
    v_minute := extract(hour from (v_session ->> 't')::time)::integer * 60
      + extract(minute from (v_session ->> 't')::time)::integer;
    v_start := v_date + (v_session ->> 't')::time;
    v_end := v_start + make_interval(hours => new.hours);

    if v_start <= (now() at time zone 'Asia/Ho_Chi_Minh') then
      raise exception 'Booking time must be in the future';
    end if;
    if v_date > (now() at time zone 'Asia/Ho_Chi_Minh')::date + 90 then
      raise exception 'Booking date must be within the next 90 days';
    end if;
    if not exists (
      select 1 from jsonb_array_elements(v_availability) as schedule(item)
      where (schedule.item ->> 'day')::integer = extract(dow from v_date)::integer
        and v_minute >= (schedule.item ->> 'from')::integer * 60
        and v_minute + new.hours * 60 <= (schedule.item ->> 'to')::integer * 60
    ) then
      raise exception 'Selected time is outside the renter availability';
    end if;
    if exists (
      select 1 from jsonb_array_elements(v_seen_sessions) as previous(item)
      where previous.item ->> 'd' = v_date::text
        and v_start < (v_date + (previous.item ->> 't')::time
          + make_interval(hours => new.hours))
        and (v_date + (previous.item ->> 't')::time) < v_end
    ) then
      raise exception 'Sessions in the same booking cannot overlap';
    end if;
    if exists (
      select 1
      from public.bookings booking
      cross join lateral jsonb_array_elements(booking.sessions) as booked(item)
      where booking.renter_profile_id = new.renter_profile_id
        and booking.id <> new.id
        and (
          booking.status in ('paid', 'completed')
          or (booking.status = 'pending' and (
            booking.payment_method = 'cash'
            or booking.created_at >= now() - interval '15 minutes'
          ))
        )
        and booked.item ->> 'd' = v_date::text
        and v_start < (v_date + (booked.item ->> 't')::time
          + make_interval(hours => booking.hours))
        and (v_date + (booked.item ->> 't')::time) < v_end
    ) then
      raise exception 'Selected time is no longer available';
    end if;
    v_seen_sessions := v_seen_sessions || jsonb_build_array(v_session);
  end loop;
  return new;
end;
$$;

create or replace function public.validate_booking_payment_schedule()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_session jsonb;
  v_start timestamp;
  v_end timestamp;
  v_date date;
begin
  if old.status <> 'pending' or new.status not in ('paid', 'completed') then
    return new;
  end if;
  if old.payment_method = 'cash' then
    if not exists (
      select 1 from public.profiles
      where id = (select auth.uid()) and role = 'admin'
    ) then
      raise exception 'Administrator confirmation is required for cash payment';
    end if;
    return new;
  end if;
  if old.created_at < now() - interval '15 minutes' then
    raise exception 'Booking payment window has expired; create a new booking';
  end if;

  perform 1 from public.renter_profiles
  where id = new.renter_profile_id
  for update;
  if not found then
    raise exception 'Renter profile is unavailable';
  end if;

  for v_session in select item from jsonb_array_elements(new.sessions) as sessions(item)
  loop
    v_date := (v_session ->> 'd')::date;
    v_start := v_date + (v_session ->> 't')::time;
    v_end := v_start + make_interval(hours => new.hours);
    if v_start <= (now() at time zone 'Asia/Ho_Chi_Minh') then
      raise exception 'Booking time has passed; create a new booking';
    end if;
    if exists (
      select 1
      from public.bookings booking
      cross join lateral jsonb_array_elements(booking.sessions) as booked(item)
      where booking.renter_profile_id = new.renter_profile_id
        and booking.id <> new.id
        and booking.status in ('paid', 'completed')
        and booked.item ->> 'd' = v_date::text
        and v_start < (v_date + (booked.item ->> 't')::time
          + make_interval(hours => booking.hours))
        and (v_date + (booked.item ->> 't')::time) < v_end
    ) then
      raise exception 'Booking time is no longer available; do not confirm payment';
    end if;
  end loop;
  return new;
end;
$$;

create or replace function public.reschedule_booking(p_code text, p_sessions jsonb)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := (select auth.uid());
  v_booking public.bookings%rowtype;
  v_owner uuid;
  v_first_start timestamp;
  v_new_first_start timestamp;
begin
  select * into v_booking
  from public.bookings booking
  where booking.code = upper(trim(p_code))
  for update;
  if not found or v_booking.status not in ('pending', 'paid') then
    raise exception 'Booking cannot be rescheduled';
  end if;
  select owner_id into v_owner
  from public.renter_profiles
  where id = v_booking.renter_profile_id;
  if v_booking.customer_id is distinct from v_actor and v_owner is distinct from v_actor then
    raise exception 'Booking participant access required';
  end if;
  if v_booking.change_count >= 1 then
    raise exception 'A booking can only be rescheduled once';
  end if;
  if v_booking.status = 'pending'
    and v_booking.payment_method <> 'cash'
    and v_booking.created_at < now() - interval '15 minutes' then
    raise exception 'Unpaid booking has expired';
  end if;

  select min((item ->> 'd')::date + (item ->> 't')::time)
  into v_first_start
  from jsonb_array_elements(v_booking.sessions) as sessions(item);
  if v_booking.status = 'paid'
    and v_first_start <= (now() at time zone 'Asia/Ho_Chi_Minh') + interval '24 hours' then
    raise exception 'Bookings can only be changed at least 24 hours before the first session';
  end if;
  if jsonb_typeof(p_sessions) is distinct from 'array' then
    raise exception 'New schedule must be an array';
  end if;
  if jsonb_array_length(p_sessions) <> jsonb_array_length(v_booking.sessions) then
    raise exception 'New schedule must contain the same number of sessions';
  end if;
  select min((item ->> 'd')::date + (item ->> 't')::time)
  into v_new_first_start
  from jsonb_array_elements(p_sessions) as sessions(item);
  if v_booking.status = 'paid'
    and v_new_first_start <= (now() at time zone 'Asia/Ho_Chi_Minh') + interval '24 hours' then
    raise exception 'New sessions must be scheduled at least 24 hours in advance';
  end if;

  insert into public.booking_change_events
    (booking_id, actor_id, event_type, old_sessions, new_sessions)
  values
    (v_booking.id, v_actor, 'rescheduled', v_booking.sessions, p_sessions);

  update public.bookings
  set sessions = p_sessions, change_count = change_count + 1
  where id = v_booking.id;
  return true;
end;
$$;
revoke all on function public.reschedule_booking(text, jsonb) from public, anon;
grant execute on function public.reschedule_booking(text, jsonb) to authenticated;

drop function if exists public.list_pending_manual_payments();
create function public.list_pending_manual_payments()
returns table (
  booking_id uuid,
  code text,
  invoice_number text,
  customer_name text,
  renter_name text,
  total_vnd bigint,
  transfer_reference text,
  created_at timestamptz,
  payment_method text
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  ) then
    raise exception 'Administrator access required';
  end if;

  return query
  select b.id, b.code, b.invoice_number, customer.full_name,
    renter.display_name, b.total_vnd, b.transfer_reference, b.created_at,
    b.payment_method
  from public.bookings b
  join public.profiles customer on customer.id = b.customer_id
  join public.renter_profiles renter on renter.id = b.renter_profile_id
  where b.status = 'pending'
  order by b.created_at desc;
end;
$$;
revoke all on function public.list_pending_manual_payments() from public, anon;
grant execute on function public.list_pending_manual_payments() to authenticated;

create or replace function public.validate_payment_transaction_method()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_method text;
  v_provider text := new.payload ->> 'provider';
begin
  select payment_method into v_method
  from public.bookings where id = new.booking_id;
  if (v_provider = 'manual_bank_transfer' and v_method <> 'qr')
    or (v_provider = 'manual_cash' and v_method <> 'cash') then
    raise exception 'Payment type does not match the booking method';
  end if;
  return new;
end;
$$;

drop trigger if exists validate_payment_transaction_method_before_insert on public.payment_transactions;
create trigger validate_payment_transaction_method_before_insert
  before insert on public.payment_transactions
  for each row execute function public.validate_payment_transaction_method();

create or replace function public.confirm_manual_cash_payment(p_code text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id uuid := (select auth.uid());
  v_transaction_id text;
  v_booking public.bookings%rowtype;
  v_existing public.payment_transactions%rowtype;
begin
  if not exists (
    select 1 from public.profiles
    where id = v_actor_id and role = 'admin'
  ) then
    raise exception 'Administrator access required';
  end if;
  if p_code is null or length(trim(p_code)) not between 8 and 32 then
    raise exception 'Invalid booking code';
  end if;

  select * into v_booking
  from public.bookings
  where code = upper(trim(p_code))
  for update;
  if not found then
    raise exception 'Booking not found';
  end if;
  if v_booking.payment_method <> 'cash' then
    raise exception 'Booking is not a cash payment';
  end if;

  v_transaction_id := 'MANUAL:CASH:' || v_booking.code;
  select * into v_existing
  from public.payment_transactions
  where transaction_id = v_transaction_id;
  if found then
    if v_existing.booking_id = v_booking.id
      and v_existing.amount_vnd = v_booking.total_vnd
      and v_booking.status in ('paid', 'completed') then
      return true;
    end if;
    raise exception 'Cash payment has already been recorded';
  end if;
  if v_booking.status <> 'pending' then
    raise exception 'Booking is not awaiting cash payment';
  end if;

  insert into public.payment_transactions (
    transaction_id, booking_id, amount_vnd, reference_code, payload
  ) values (
    v_transaction_id, v_booking.id, v_booking.total_vnd, v_booking.code,
    jsonb_build_object(
      'provider', 'manual_cash',
      'confirmed_by', v_actor_id,
      'booking_code', v_booking.code
    )
  );
  update public.bookings
  set status = 'paid', paid_at = now()
  where id = v_booking.id;
  return true;
end;
$$;
revoke all on function public.confirm_manual_cash_payment(text) from public, anon;
grant execute on function public.confirm_manual_cash_payment(text) to authenticated;
