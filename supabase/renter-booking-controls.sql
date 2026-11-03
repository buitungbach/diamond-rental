-- Run after product-expansion.sql. Renters can view paid bookings and chat,
-- but only the booking customer or an administrator can cancel one.

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
