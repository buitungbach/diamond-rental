-- Run after product-expansion.sql. Renters can view paid bookings and chat,
-- but only the booking customer can reschedule; only the customer or an
-- administrator can cancel.

create or replace function public.reschedule_booking(p_code text, p_sessions jsonb)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := (select auth.uid());
  v_booking public.bookings%rowtype;
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
  if v_booking.customer_id is distinct from v_actor then
    raise exception 'Only the booking customer can reschedule this booking';
  end if;
  if v_booking.change_count >= 1 then
    raise exception 'A booking can only be rescheduled once';
  end if;
  if v_booking.status = 'pending'
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

create or replace function public.cancel_booking(p_code text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := (select auth.uid());
  v_booking public.bookings%rowtype;
  v_actor_role text;
  v_first_start timestamp;
begin
  select * into v_booking
  from public.bookings booking
  where booking.code = upper(trim(p_code))
  for update;
  if not found or v_booking.status not in ('pending', 'paid') then
    raise exception 'Booking cannot be cancelled';
  end if;
  select profile.role into v_actor_role
  from public.profiles profile
  where profile.id = v_actor;
  if v_booking.customer_id is distinct from v_actor and v_actor_role is distinct from 'admin' then
    raise exception 'Only the booking customer or an administrator can cancel this booking';
  end if;

  select min((item ->> 'd')::date + (item ->> 't')::time)
  into v_first_start
  from jsonb_array_elements(v_booking.sessions) as sessions(item);
  if v_booking.status = 'paid'
    and v_first_start <= (now() at time zone 'Asia/Ho_Chi_Minh') + interval '24 hours' then
    raise exception 'Paid bookings can only be cancelled at least 24 hours before the first session';
  end if;

  insert into public.booking_change_events
    (booking_id, actor_id, event_type, old_sessions, new_sessions)
  values
    (v_booking.id, v_actor, 'cancelled', v_booking.sessions, '[]'::jsonb);
  update public.bookings set status = 'cancelled' where id = v_booking.id;
  return true;
end;
$$;
revoke all on function public.cancel_booking(text) from public, anon;
grant execute on function public.cancel_booking(text) to authenticated;
