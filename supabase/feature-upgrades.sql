-- Requires schema.sql and admin-direct-chat.sql.
-- Adds availability, booking completion/payment guards, reviews, and chat safety.
-- Run once in the Supabase SQL Editor.

alter table public.renter_profiles
  add column if not exists availability jsonb not null default
    '[{"day":0,"from":10,"to":22},{"day":1,"from":10,"to":22},{"day":2,"from":10,"to":22},{"day":3,"from":10,"to":22},{"day":4,"from":10,"to":22},{"day":5,"from":10,"to":22},{"day":6,"from":10,"to":22}]'::jsonb;

alter table public.messages add column if not exists read_at timestamptz;
alter table public.admin_chat_messages add column if not exists read_at timestamptz;

create or replace function public.validate_renter_availability()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_item jsonb;
  v_days integer[] := '{}';
  v_day integer;
  v_from integer;
  v_to integer;
begin
  if jsonb_typeof(new.availability) is distinct from 'array' then
    raise exception 'Availability must contain unique weekdays with valid opening and closing hours';
  end if;
  if jsonb_array_length(new.availability) > 7 then
    raise exception 'Availability cannot contain more than seven weekdays';
  end if;
  for v_item in select item from jsonb_array_elements(new.availability) as schedule(item)
  loop
    if coalesce(v_item ->> 'day', '') !~ '^[0-6]$'
      or coalesce(v_item ->> 'from', '') !~ '^(?:[0-9]|1[0-9]|2[0-3])$'
      or coalesce(v_item ->> 'to', '') !~ '^(?:[0-9]|1[0-9]|2[0-4])$' then
      raise exception 'Availability contains an invalid weekday or hour';
    end if;
    v_day := (v_item ->> 'day')::integer;
    v_from := (v_item ->> 'from')::integer;
    v_to := (v_item ->> 'to')::integer;
    if v_from >= v_to or v_day = any(v_days) then
      raise exception 'Availability must contain unique weekdays with increasing hours';
    end if;
    v_days := array_append(v_days, v_day);
  end loop;
  return new;
end;
$$;

drop trigger if exists validate_renter_availability_before_write on public.renter_profiles;
create trigger validate_renter_availability_before_write
  before insert or update of availability on public.renter_profiles
  for each row execute function public.validate_renter_availability();

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
      or (booking.status = 'pending' and booking.created_at >= now() - interval '15 minutes')
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
          or (booking.status = 'pending' and booking.created_at >= now() - interval '15 minutes')
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

drop trigger if exists validate_booking_schedule_before_insert on public.bookings;
create trigger validate_booking_schedule_before_insert
  before insert on public.bookings
  for each row execute function public.validate_booking_schedule();

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

drop trigger if exists validate_booking_payment_schedule_before_update on public.bookings;
create trigger validate_booking_payment_schedule_before_update
  before update of status on public.bookings
  for each row execute function public.validate_booking_payment_schedule();

create table if not exists public.booking_completion_confirmations (
  booking_id uuid not null references public.bookings(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  confirmed_at timestamptz not null default now(),
  primary key (booking_id, user_id)
);
alter table public.booking_completion_confirmations enable row level security;
revoke all on public.booking_completion_confirmations from public, anon, authenticated;
grant select on public.booking_completion_confirmations to authenticated;

drop policy if exists "Participants read completion confirmations" on public.booking_completion_confirmations;
create policy "Participants read completion confirmations"
  on public.booking_completion_confirmations for select to authenticated
  using (
    exists (
      select 1 from public.bookings b
      left join public.renter_profiles r on r.id = b.renter_profile_id
      where b.id = booking_completion_confirmations.booking_id
        and (b.customer_id = (select auth.uid()) or r.owner_id = (select auth.uid()))
    )
  );

create or replace function public.confirm_booking_complete(p_code text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := (select auth.uid());
  v_booking public.bookings%rowtype;
  v_renter_owner uuid;
  v_renter_is_ai boolean;
  v_end timestamp;
begin
  select b.* into v_booking
  from public.bookings b
  where b.code = upper(trim(p_code))
  for update;
  select owner_id, persona_mode = 'ai' into v_renter_owner, v_renter_is_ai
  from public.renter_profiles
  where id = v_booking.renter_profile_id;
  if not found or v_booking.status <> 'paid'
    or (v_booking.customer_id <> v_actor and v_renter_owner <> v_actor) then
    raise exception 'A paid booking participant is required';
  end if;

  select max((item ->> 'd')::date + (item ->> 't')::time
    + make_interval(hours => v_booking.hours))
  into v_end
  from jsonb_array_elements(v_booking.sessions) as sessions(item);
  if v_end > (now() at time zone 'Asia/Ho_Chi_Minh') then
    raise exception 'Booking can only be confirmed complete after its final session';
  end if;

  insert into public.booking_completion_confirmations (booking_id, user_id)
  values (v_booking.id, v_actor)
  on conflict (booking_id, user_id) do nothing;

  if exists (
    select 1 from public.booking_completion_confirmations
    where booking_id = v_booking.id and user_id = v_booking.customer_id
  ) and (
    (v_renter_owner is not null and exists (
      select 1 from public.booking_completion_confirmations
      where booking_id = v_booking.id and user_id = v_renter_owner
    ))
    or v_renter_is_ai
  ) then
    update public.bookings set status = 'completed' where id = v_booking.id;
  end if;
  return true;
end;
$$;

revoke all on function public.confirm_booking_complete(text) from public, anon;
grant execute on function public.confirm_booking_complete(text) to authenticated;

create table if not exists public.renter_reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete cascade,
  renter_profile_id uuid not null references public.renter_profiles(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text not null default '' check (char_length(comment) <= 500),
  created_at timestamptz not null default now()
);
alter table public.renter_reviews enable row level security;
revoke all on public.renter_reviews from public, anon, authenticated;
grant select (renter_profile_id, rating, comment, created_at)
  on public.renter_reviews to anon, authenticated;
grant insert (booking_id, renter_profile_id, customer_id, rating, comment)
  on public.renter_reviews to authenticated;

drop policy if exists "Public can read verified renter reviews" on public.renter_reviews;
create policy "Public can read verified renter reviews"
  on public.renter_reviews for select to anon, authenticated using (true);

drop policy if exists "Customers review completed bookings once" on public.renter_reviews;
create policy "Customers review completed bookings once"
  on public.renter_reviews for insert to authenticated
  with check (
    customer_id = (select auth.uid())
    and exists (
      select 1 from public.bookings b
      where b.id = renter_reviews.booking_id
        and b.renter_profile_id = renter_reviews.renter_profile_id
        and b.customer_id = (select auth.uid())
        and b.status = 'completed'
    )
  );

create table if not exists public.chat_blocks (
  blocker_id uuid not null references public.profiles(id) on delete cascade,
  renter_profile_id uuid not null references public.renter_profiles(id) on delete cascade,
  blocked_user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);
create unique index if not exists chat_blocks_user_target_idx
  on public.chat_blocks (blocker_id, renter_profile_id, blocked_user_id)
  where blocked_user_id is not null;
create unique index if not exists chat_blocks_profile_target_idx
  on public.chat_blocks (blocker_id, renter_profile_id)
  where blocked_user_id is null;
alter table public.chat_blocks enable row level security;
revoke all on public.chat_blocks from public, anon, authenticated;
grant select, delete on public.chat_blocks to authenticated;

drop policy if exists "Users read own chat blocks" on public.chat_blocks;
create policy "Users read own chat blocks"
  on public.chat_blocks for select to authenticated
  using (blocker_id = (select auth.uid()));
drop policy if exists "Users remove own chat blocks" on public.chat_blocks;
create policy "Users remove own chat blocks"
  on public.chat_blocks for delete to authenticated
  using (blocker_id = (select auth.uid()));

create table if not exists public.chat_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  renter_profile_id uuid not null references public.renter_profiles(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete set null,
  thread_id uuid references public.admin_chat_threads(id) on delete set null,
  reason text not null check (char_length(reason) between 10 and 1000),
  status text not null default 'open' check (status in ('open', 'resolved', 'dismissed')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
alter table public.chat_reports enable row level security;
revoke all on public.chat_reports from public, anon, authenticated;

create or replace function public.set_chat_block(
  p_booking_id uuid,
  p_thread_id uuid,
  p_blocked boolean
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := (select auth.uid());
  v_profile uuid;
  v_other uuid;
begin
  if p_blocked is null then
    raise exception 'Block state is required';
  end if;
  if (p_booking_id is null) = (p_thread_id is null) then
    raise exception 'Specify exactly one chat conversation';
  end if;
  if p_booking_id is not null then
    select b.renter_profile_id,
      case when b.customer_id = v_actor then r.owner_id else b.customer_id end
    into v_profile, v_other
    from public.bookings b
    join public.renter_profiles r on r.id = b.renter_profile_id
    where b.id = p_booking_id and b.status in ('paid', 'completed')
      and (b.customer_id = v_actor or r.owner_id = v_actor);
  else
    select thread.renter_profile_id,
      case when thread.admin_id = v_actor then renter.owner_id else thread.admin_id end
    into v_profile, v_other
    from public.admin_chat_threads thread
    join public.renter_profiles renter on renter.id = thread.renter_profile_id
    where thread.id = p_thread_id
      and (thread.admin_id = v_actor or renter.owner_id = v_actor);
  end if;
  if v_profile is null then
    raise exception 'Chat participant access required';
  end if;

  delete from public.chat_blocks
  where blocker_id = v_actor and renter_profile_id = v_profile
    and blocked_user_id is not distinct from v_other;
  if p_blocked then
    insert into public.chat_blocks (blocker_id, renter_profile_id, blocked_user_id)
    values (v_actor, v_profile, v_other);
  end if;
  return p_blocked;
end;
$$;

revoke all on function public.set_chat_block(uuid, uuid, boolean) from public, anon;
grant execute on function public.set_chat_block(uuid, uuid, boolean) to authenticated;

create or replace function public.get_chat_block_status(
  p_booking_id uuid,
  p_thread_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := (select auth.uid());
  v_profile uuid;
  v_other uuid;
  v_blocked_by_me boolean;
  v_blocked_by_other boolean;
begin
  if (p_booking_id is null) = (p_thread_id is null) then
    raise exception 'Specify exactly one chat conversation';
  end if;
  if p_booking_id is not null then
    select b.renter_profile_id,
      case when b.customer_id = v_actor then r.owner_id else b.customer_id end
    into v_profile, v_other
    from public.bookings b
    join public.renter_profiles r on r.id = b.renter_profile_id
    where b.id = p_booking_id and b.status in ('paid', 'completed')
      and (b.customer_id = v_actor or r.owner_id = v_actor);
  else
    select thread.renter_profile_id,
      case when thread.admin_id = v_actor then renter.owner_id else thread.admin_id end
    into v_profile, v_other
    from public.admin_chat_threads thread
    join public.renter_profiles renter on renter.id = thread.renter_profile_id
    where thread.id = p_thread_id
      and (thread.admin_id = v_actor or renter.owner_id = v_actor);
  end if;
  if v_profile is null then
    raise exception 'Chat participant access required';
  end if;
  select exists (
    select 1 from public.chat_blocks
    where renter_profile_id = v_profile and blocker_id = v_actor
      and blocked_user_id is not distinct from v_other
  ) into v_blocked_by_me;
  select exists (
    select 1 from public.chat_blocks
    where renter_profile_id = v_profile and blocker_id = v_other
      and blocked_user_id is not distinct from v_actor
  ) into v_blocked_by_other;
  return jsonb_build_object(
    'blocked_by_me', v_blocked_by_me,
    'blocked_by_other', v_blocked_by_other
  );
end;
$$;

revoke all on function public.get_chat_block_status(uuid, uuid) from public, anon;
grant execute on function public.get_chat_block_status(uuid, uuid) to authenticated;

create or replace function public.prevent_blocked_chat_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile uuid;
  v_sender uuid;
  v_recipient uuid;
begin
  if new.sender_kind = 'persona' then
    return new;
  end if;
  if tg_table_name = 'messages' then
    select b.renter_profile_id,
      case when new.sender_id = b.customer_id then r.owner_id else b.customer_id end
    into v_profile, v_recipient
    from public.bookings b
    join public.renter_profiles r on r.id = b.renter_profile_id
    where b.id = new.booking_id;
  else
    if new.sender_kind = 'persona' then return new; end if;
    select thread.renter_profile_id,
      case when new.sender_id = thread.admin_id then renter.owner_id else thread.admin_id end
    into v_profile, v_recipient
    from public.admin_chat_threads thread
    join public.renter_profiles renter on renter.id = thread.renter_profile_id
    where thread.id = new.thread_id;
  end if;
  v_sender := new.sender_id;
  if exists (
    select 1 from public.chat_blocks block
    where block.renter_profile_id = v_profile
      and (
        (block.blocker_id = v_sender and block.blocked_user_id is not distinct from v_recipient)
        or (block.blocker_id = v_recipient and block.blocked_user_id is not distinct from v_sender)
      )
  ) then
    raise exception 'Chat is blocked by a participant';
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_blocked_booking_chat_message on public.messages;
create trigger prevent_blocked_booking_chat_message
  before insert on public.messages
  for each row execute function public.prevent_blocked_chat_message();
drop trigger if exists prevent_blocked_admin_chat_message on public.admin_chat_messages;
create trigger prevent_blocked_admin_chat_message
  before insert on public.admin_chat_messages
  for each row execute function public.prevent_blocked_chat_message();

create or replace function public.submit_chat_report(
  p_booking_id uuid,
  p_thread_id uuid,
  p_reason text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := (select auth.uid());
  v_profile uuid;
  v_report_id uuid;
begin
  if char_length(trim(coalesce(p_reason, ''))) not between 10 and 1000 then
    raise exception 'Please provide a report between 10 and 1000 characters';
  end if;
  if (p_booking_id is null) = (p_thread_id is null) then
    raise exception 'Specify exactly one chat conversation';
  end if;
  if p_booking_id is not null then
    select b.renter_profile_id into v_profile
    from public.bookings b
    left join public.renter_profiles r on r.id = b.renter_profile_id
    where b.id = p_booking_id and b.status in ('paid', 'completed')
      and (b.customer_id = v_actor or r.owner_id = v_actor);
  else
    select thread.renter_profile_id into v_profile
    from public.admin_chat_threads thread
    left join public.renter_profiles r on r.id = thread.renter_profile_id
    where thread.id = p_thread_id
      and (thread.admin_id = v_actor or r.owner_id = v_actor);
  end if;
  if v_profile is null then
    raise exception 'Chat participant access required';
  end if;
  insert into public.chat_reports (reporter_id, renter_profile_id, booking_id, thread_id, reason)
  values (v_actor, v_profile, p_booking_id, p_thread_id, trim(p_reason))
  returning id into v_report_id;
  return v_report_id;
end;
$$;

revoke all on function public.submit_chat_report(uuid, uuid, text) from public, anon;
grant execute on function public.submit_chat_report(uuid, uuid, text) to authenticated;

create or replace function public.list_chat_reports()
returns table (
  id uuid,
  status text,
  reason text,
  created_at timestamptz,
  reporter_name text,
  renter_name text,
  booking_code text
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
  select report.id, report.status, report.reason, report.created_at,
    reporter.full_name, renter.display_name, booking.code
  from public.chat_reports report
  join public.profiles reporter on reporter.id = report.reporter_id
  join public.renter_profiles renter on renter.id = report.renter_profile_id
  left join public.bookings booking on booking.id = report.booking_id
  order by report.created_at desc
  limit 200;
end;
$$;
revoke all on function public.list_chat_reports() from public, anon;
grant execute on function public.list_chat_reports() to authenticated;

create or replace function public.resolve_chat_report(p_report_id uuid, p_status text)
returns boolean
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
  if p_status not in ('resolved', 'dismissed') then
    raise exception 'Invalid report status';
  end if;
  update public.chat_reports
  set status = p_status, resolved_at = now()
  where id = p_report_id and status = 'open';
  return found;
end;
$$;
revoke all on function public.resolve_chat_report(uuid, text) from public, anon;
grant execute on function public.resolve_chat_report(uuid, text) to authenticated;

create or replace function public.list_my_reviewed_booking_codes()
returns text[]
language sql
security definer
set search_path = ''
as $$
  select coalesce(array_agg(booking.code), '{}'::text[])
  from public.renter_reviews review
  join public.bookings booking on booking.id = review.booking_id
  where review.customer_id = (select auth.uid())
$$;
revoke all on function public.list_my_reviewed_booking_codes() from public, anon;
grant execute on function public.list_my_reviewed_booking_codes() to authenticated;

drop policy if exists "Participants read paid booking messages" on public.messages;
create policy "Participants read paid booking messages"
  on public.messages for select to authenticated
  using (
    exists (
      select 1
      from public.bookings b
      left join public.renter_profiles r on r.id = b.renter_profile_id
      where b.id = messages.booking_id
        and b.status in ('paid', 'completed')
        and (b.customer_id = (select auth.uid()) or r.owner_id = (select auth.uid()))
    )
  );

drop policy if exists "Participants send paid booking messages" on public.messages;
create policy "Participants send paid booking messages"
  on public.messages for insert to authenticated
  with check (
    sender_id = (select auth.uid())
    and sender_kind in ('customer', 'renter')
    and exists (
      select 1
      from public.bookings b
      left join public.renter_profiles r on r.id = b.renter_profile_id
      join public.profiles p on p.id = (select auth.uid())
      where b.id = messages.booking_id
        and b.status in ('paid', 'completed')
        and (
          (b.customer_id = (select auth.uid()) and p.role = 'customer' and sender_kind = 'customer')
          or (r.owner_id = (select auth.uid()) and p.role = 'renter' and sender_kind = 'renter')
        )
    )
  );

drop policy if exists "Recipients mark booking messages read" on public.messages;
create policy "Recipients mark booking messages read"
  on public.messages for update to authenticated
  using (
    read_at is null and exists (
      select 1 from public.bookings b
      left join public.renter_profiles r on r.id = b.renter_profile_id
      where b.id = messages.booking_id and b.status in ('paid', 'completed')
        and (
          (b.customer_id = (select auth.uid()) and messages.sender_id is distinct from (select auth.uid()))
          or (r.owner_id = (select auth.uid()) and messages.sender_kind = 'customer')
        )
    )
  )
  with check (read_at is not null);
grant update (read_at) on public.messages to authenticated;

drop policy if exists "Recipients mark admin chat messages read" on public.admin_chat_messages;
create policy "Recipients mark admin chat messages read"
  on public.admin_chat_messages for update to authenticated
  using (
    read_at is null and exists (
      select 1
      from public.admin_chat_threads thread
      left join public.renter_profiles renter on renter.id = thread.renter_profile_id
      where thread.id = admin_chat_messages.thread_id
        and (
          (thread.admin_id = (select auth.uid()) and admin_chat_messages.sender_id is distinct from (select auth.uid()))
          or (renter.owner_id = (select auth.uid()) and admin_chat_messages.sender_kind = 'admin')
        )
    )
  )
  with check (read_at is not null);
grant update (read_at) on public.admin_chat_messages to authenticated;

create index if not exists booking_completion_confirmations_user_idx
  on public.booking_completion_confirmations (user_id, confirmed_at desc);
create index if not exists renter_reviews_profile_created_idx
  on public.renter_reviews (renter_profile_id, created_at desc);
create index if not exists chat_reports_status_created_idx
  on public.chat_reports (status, created_at desc);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public'
      and tablename = 'admin_chat_messages'
  ) then
    alter publication supabase_realtime add table public.admin_chat_messages;
  end if;
end;
$$;
