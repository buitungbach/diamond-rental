-- Run after product-expansion.sql.

create table if not exists public.push_subscriptions (
  endpoint text primary key check (endpoint like 'https://%'),
  user_id uuid not null references public.profiles(id) on delete cascade,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists push_subscriptions_user_idx
  on public.push_subscriptions(user_id);
alter table public.push_subscriptions enable row level security;
revoke all on public.push_subscriptions from public, anon, authenticated;
grant select, insert, update, delete on public.push_subscriptions to authenticated;
drop policy if exists "Users read own push subscriptions" on public.push_subscriptions;
create policy "Users read own push subscriptions"
  on public.push_subscriptions for select to authenticated
  using (user_id = (select auth.uid()));
drop policy if exists "Users add own push subscriptions" on public.push_subscriptions;
create policy "Users add own push subscriptions"
  on public.push_subscriptions for insert to authenticated
  with check (user_id = (select auth.uid()));
drop policy if exists "Users update own push subscriptions" on public.push_subscriptions;
create policy "Users update own push subscriptions"
  on public.push_subscriptions for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
drop policy if exists "Users remove own push subscriptions" on public.push_subscriptions;
create policy "Users remove own push subscriptions"
  on public.push_subscriptions for delete to authenticated
  using (user_id = (select auth.uid()));

create table if not exists public.push_outbox (
  id bigint generated always as identity primary key,
  notification_id uuid not null unique references public.app_notifications(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  attempts integer not null default 0,
  available_at timestamptz not null default now(),
  claimed_at timestamptz,
  sent_at timestamptz,
  last_error text,
  created_at timestamptz not null default now()
);
create index if not exists push_outbox_pending_idx
  on public.push_outbox (available_at, id) where sent_at is null;
alter table public.push_outbox enable row level security;
revoke all on public.push_outbox from public, anon, authenticated;

create or replace function public.enqueue_web_push()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.push_outbox (notification_id, user_id)
  values (new.id, new.user_id)
  on conflict (notification_id) do nothing;
  return new;
end;
$$;
drop trigger if exists enqueue_web_push_after_notification on public.app_notifications;
create trigger enqueue_web_push_after_notification
  after insert on public.app_notifications
  for each row execute function public.enqueue_web_push();

create or replace function public.notify_persona_chat_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_customer_id uuid;
  v_booking_code text;
begin
  if tg_table_name = 'messages' then
    select booking.customer_id, booking.code
    into v_customer_id, v_booking_code
    from public.bookings booking
    where booking.id = new.booking_id
      and booking.status in ('paid', 'completed');
  else
    select thread.admin_id, 'ADMIN'
    into v_customer_id, v_booking_code
    from public.admin_chat_threads thread
    where thread.id = new.thread_id;
  end if;
  if v_customer_id is not null then
    insert into public.app_notifications (user_id, notification_type, title, body, reference_code)
    values (v_customer_id, 'new_message', 'Tin nhắn mới', 'Bạn có tin nhắn mới.', v_booking_code);
  end if;
  return new;
end;
$$;
revoke all on function public.notify_persona_chat_message() from public, anon, authenticated;
drop trigger if exists notify_persona_chat_message_after_insert on public.messages;
create trigger notify_persona_chat_message_after_insert
  after insert on public.messages
  for each row when (new.sender_kind = 'persona')
  execute function public.notify_persona_chat_message();
drop trigger if exists notify_persona_admin_chat_message_after_insert on public.admin_chat_messages;
create trigger notify_persona_admin_chat_message_after_insert
  after insert on public.admin_chat_messages
  for each row when (new.sender_kind = 'persona')
  execute function public.notify_persona_chat_message();

create or replace function public.claim_push_outbox(p_limit integer default 50)
returns table (
  id bigint,
  user_id uuid,
  notification_type text,
  title text,
  body text,
  reference_code text
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.role() <> 'service_role' then
    raise exception 'Service role required';
  end if;
  return query
  with candidates as (
    select outbox.id, outbox.notification_id
    from public.push_outbox outbox
    where outbox.sent_at is null
      and outbox.available_at <= now()
      and (outbox.claimed_at is null or outbox.claimed_at < now() - interval '10 minutes')
    order by outbox.id
    limit greatest(1, least(coalesce(p_limit, 50), 100))
    for update skip locked
  )
  update public.push_outbox outbox
  set claimed_at = now(), attempts = attempts + 1
  from candidates
  join public.app_notifications notification
    on notification.id = candidates.notification_id
  where outbox.id = candidates.id
  returning outbox.id, outbox.user_id, notification.notification_type,
    notification.title, notification.body, notification.reference_code;
end;
$$;
revoke all on function public.claim_push_outbox(integer) from public, anon, authenticated;
grant execute on function public.claim_push_outbox(integer) to service_role;

create or replace function public.set_push_outbox_result(
  p_id bigint,
  p_delivered boolean,
  p_error text default null
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attempts integer;
begin
  if auth.role() <> 'service_role' then
    raise exception 'Service role required';
  end if;
  select attempts into v_attempts from public.push_outbox
  where id = p_id and sent_at is null;
  if not found then
    return false;
  end if;
  update public.push_outbox
  set sent_at = case when p_delivered or v_attempts >= 8 then now() else null end,
      available_at = case when p_delivered or v_attempts >= 8 then available_at
        else now() + make_interval(secs => least(3600, 30 * power(2, least(v_attempts, 6))::integer)) end,
      claimed_at = null,
      last_error = case when p_delivered then null else left(coalesce(p_error, 'Push delivery failed'), 1000) end
  where id = p_id and sent_at is null;
  return found;
end;
$$;
revoke all on function public.set_push_outbox_result(bigint, boolean, text) from public, anon, authenticated;
grant execute on function public.set_push_outbox_result(bigint, boolean, text) to service_role;
