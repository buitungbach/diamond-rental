-- Requires schema.sql, admin-direct-chat.sql, manual-payment.sql, and
-- feature-upgrades.sql. Run once in the Supabase SQL Editor.

alter table public.renter_profiles
  add column if not exists is_verified boolean not null default false,
  add column if not exists verified_at timestamptz,
  add column if not exists verified_by uuid references public.profiles(id) on delete set null;

alter table public.bookings
  alter column customer_id drop not null,
  add column if not exists change_count integer not null default 0
    check (change_count between 0 and 1);

alter table public.profiles
  add column if not exists email_notifications_enabled boolean not null default true;
grant update (email_notifications_enabled) on public.profiles to authenticated;

revoke insert, update on public.renter_profiles from authenticated;
grant insert (owner_id, display_name, section, tags, bio, avatar_url, persona_mode)
  on public.renter_profiles to authenticated;
grant update (
  owner_id, display_name, section, tags, bio, avatar_url, persona_mode,
  availability, chat_background_url
) on public.renter_profiles to authenticated;
drop policy if exists "Renters create own profile" on public.renter_profiles;
create policy "Renters create own profile"
  on public.renter_profiles for insert to authenticated
  with check (
    owner_id = (select auth.uid())
    and persona_mode = 'human'
    and is_verified = false
    and verified_at is null
    and verified_by is null
    and catalog_key is null
    and exists (
      select 1 from public.profiles profile
      where profile.id = (select auth.uid()) and profile.role = 'renter'
    )
  );

create or replace function public.set_email_notifications_enabled(p_enabled boolean)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.profiles
  set email_notifications_enabled = p_enabled
  where id = (select auth.uid());
  return found;
end;
$$;
revoke all on function public.set_email_notifications_enabled(boolean) from public, anon;
grant execute on function public.set_email_notifications_enabled(boolean) to authenticated;

create table if not exists public.booking_change_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null check (event_type in ('rescheduled', 'cancelled')),
  old_sessions jsonb not null default '[]'::jsonb,
  new_sessions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.booking_change_events enable row level security;
revoke all on public.booking_change_events from public, anon, authenticated;
grant select on public.booking_change_events to authenticated;
drop policy if exists "Participants read booking change events" on public.booking_change_events;
create policy "Participants read booking change events"
  on public.booking_change_events for select to authenticated
  using (
    exists (
      select 1
      from public.bookings booking
      left join public.renter_profiles renter on renter.id = booking.renter_profile_id
      where booking.id = booking_change_events.booking_id
        and (booking.customer_id = (select auth.uid()) or renter.owner_id = (select auth.uid()))
    )
  );

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

drop trigger if exists validate_booking_schedule_before_insert on public.bookings;
create trigger validate_booking_schedule_before_insert
  before insert or update of sessions, hours, renter_profile_id on public.bookings
  for each row execute function public.validate_booking_schedule();

create or replace function public.cancel_booking(p_code text)
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
begin
  select * into v_booking
  from public.bookings booking
  where booking.code = upper(trim(p_code))
  for update;
  if not found or v_booking.status not in ('pending', 'paid') then
    raise exception 'Booking cannot be cancelled';
  end if;
  select owner_id into v_owner
  from public.renter_profiles
  where id = v_booking.renter_profile_id;
  if v_booking.customer_id is distinct from v_actor and v_owner is distinct from v_actor
    and not exists (
      select 1 from public.profiles profile
      where profile.id = v_actor and profile.role = 'admin'
    ) then
    raise exception 'Booking participant access required';
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

create or replace function public.set_renter_verification(p_profile_id uuid, p_verified boolean)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles profile
    where profile.id = (select auth.uid()) and profile.role = 'admin'
  ) then
    raise exception 'Administrator access required';
  end if;
  update public.renter_profiles
  set is_verified = p_verified,
      verified_at = case when p_verified then now() else null end,
      verified_by = case when p_verified then (select auth.uid()) else null end
  where id = p_profile_id and owner_id is not null;
  return found;
end;
$$;
revoke all on function public.set_renter_verification(uuid, boolean) from public, anon;
grant execute on function public.set_renter_verification(uuid, boolean) to authenticated;

create table if not exists public.renter_gallery (
  id uuid primary key default gen_random_uuid(),
  renter_profile_id uuid not null references public.renter_profiles(id) on delete cascade,
  media_url text not null,
  media_type text not null check (media_type in ('image', 'video')),
  caption text not null default '' check (char_length(caption) <= 500),
  source_url text,
  source_credit text,
  is_ai_generated boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now(),
  moderated_at timestamptz,
  moderated_by uuid references public.profiles(id) on delete set null,
  unique (renter_profile_id, source_url)
);
alter table public.renter_gallery enable row level security;
revoke all on public.renter_gallery from public, anon, authenticated;
grant select on public.renter_gallery to anon, authenticated;
grant insert (renter_profile_id, media_url, media_type, caption) on public.renter_gallery to authenticated;
grant delete on public.renter_gallery to authenticated;
drop policy if exists "Public read published renter gallery" on public.renter_gallery;
create policy "Public read published renter gallery"
  on public.renter_gallery for select to anon, authenticated
  using (
    status = 'published'
    or exists (
      select 1 from public.renter_profiles renter
      where renter.id = renter_gallery.renter_profile_id
        and (renter.owner_id = (select auth.uid())
          or exists (select 1 from public.profiles profile
            where profile.id = (select auth.uid()) and profile.role = 'admin'))
    )
  );
drop policy if exists "Renters submit own gallery media" on public.renter_gallery;
create policy "Renters submit own gallery media"
  on public.renter_gallery for insert to authenticated
  with check (
    status = 'pending' and not is_ai_generated and
    exists (
      select 1 from public.renter_profiles renter
      join public.profiles profile on profile.id = (select auth.uid())
      where renter.id = renter_gallery.renter_profile_id
        and renter.owner_id = (select auth.uid())
        and profile.role = 'renter'
    )
  );
drop policy if exists "Renters delete own gallery media" on public.renter_gallery;
create policy "Renters delete own gallery media"
  on public.renter_gallery for delete to authenticated
  using (
    exists (
      select 1 from public.renter_profiles renter
      where renter.id = renter_gallery.renter_profile_id
        and renter.owner_id = (select auth.uid())
    )
  );

create table if not exists public.social_posts (
  id uuid primary key default gen_random_uuid(),
  renter_profile_id uuid not null references public.renter_profiles(id) on delete cascade,
  caption text not null check (char_length(caption) between 1 and 2000),
  media_url text not null,
  media_type text not null check (media_type in ('image', 'video')),
  source_url text,
  source_credit text,
  is_ai_generated boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now(),
  published_at timestamptz,
  moderated_at timestamptz,
  moderated_by uuid references public.profiles(id) on delete set null,
  unique (renter_profile_id, source_url)
);
create index if not exists social_posts_feed_idx
  on public.social_posts (published_at desc) where status = 'published';
alter table public.social_posts enable row level security;
revoke all on public.social_posts from public, anon, authenticated;
grant select on public.social_posts to anon, authenticated;
grant insert (renter_profile_id, caption, media_url, media_type) on public.social_posts to authenticated;
drop policy if exists "Public read published social posts" on public.social_posts;
create policy "Public read published social posts"
  on public.social_posts for select to anon, authenticated
  using (
    (status = 'published' and published_at <= now())
    or exists (
      select 1 from public.renter_profiles renter
      where renter.id = social_posts.renter_profile_id
        and (renter.owner_id = (select auth.uid())
          or exists (select 1 from public.profiles profile
            where profile.id = (select auth.uid()) and profile.role = 'admin'))
    )
  );
drop policy if exists "Renters submit own social posts for review" on public.social_posts;
create policy "Renters submit own social posts for review"
  on public.social_posts for insert to authenticated
  with check (
    status = 'pending' and not is_ai_generated and published_at is null and
    exists (
      select 1 from public.renter_profiles renter
      join public.profiles profile on profile.id = (select auth.uid())
      where renter.id = social_posts.renter_profile_id
        and renter.owner_id = (select auth.uid())
        and profile.role = 'renter'
    )
  );

create table if not exists public.social_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.social_posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  author_label text not null,
  body text not null check (char_length(body) between 1 and 500),
  created_at timestamptz not null default now()
);
create index if not exists social_comments_post_created_idx
  on public.social_comments (post_id, created_at);
alter table public.social_comments enable row level security;
revoke all on public.social_comments from public, anon, authenticated;
grant select (id, post_id, author_label, body, created_at) on public.social_comments to anon, authenticated;
grant insert (post_id, author_id, body) on public.social_comments to authenticated;
grant delete on public.social_comments to authenticated;
create or replace function public.prepare_social_comment()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_role text;
  v_public_name text;
begin
  if new.author_id is distinct from (select auth.uid()) then
    raise exception 'Comment author must match the signed-in user';
  end if;
  select profile.role into v_role
  from public.profiles profile where profile.id = new.author_id;
  if v_role not in ('customer', 'renter') then
    raise exception 'Customer or renter account required';
  end if;
  if not exists (
    select 1 from public.social_posts post
    where post.id = new.post_id and post.status = 'published' and post.published_at <= now()
  ) then
    raise exception 'Post is unavailable for comments';
  end if;
  if (select count(*) from public.social_comments comment
      where comment.author_id = new.author_id
        and comment.created_at > now() - interval '1 hour') >= 20 then
    raise exception 'Comment rate limit reached';
  end if;
  if v_role = 'renter' then
    select renter.display_name into v_public_name
    from public.renter_profiles renter where renter.owner_id = new.author_id and renter.is_active
    limit 1;
  end if;
  new.author_label := coalesce(v_public_name, 'Khách hàng');
  new.body := trim(new.body);
  return new;
end;
$$;
drop trigger if exists prepare_social_comment_before_insert on public.social_comments;
create trigger prepare_social_comment_before_insert
  before insert on public.social_comments
  for each row execute function public.prepare_social_comment();
drop policy if exists "Read comments on visible posts" on public.social_comments;
create policy "Read comments on visible posts"
  on public.social_comments for select to anon, authenticated
  using (
    exists (
      select 1 from public.social_posts post where post.id = social_comments.post_id
        and (post.status = 'published' and post.published_at <= now()
          or exists (
            select 1 from public.renter_profiles renter
            where renter.id = post.renter_profile_id and renter.owner_id = (select auth.uid())
          ))
    )
  );
drop policy if exists "Signed-in users comment on published posts" on public.social_comments;
create policy "Signed-in users comment on published posts"
  on public.social_comments for insert to authenticated
  with check (author_id = (select auth.uid()));
drop policy if exists "Authors delete own comments" on public.social_comments;
create policy "Authors delete own comments"
  on public.social_comments for delete to authenticated
  using (author_id = (select auth.uid()));

create table if not exists public.social_likes (
  post_id uuid not null references public.social_posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);
alter table public.social_likes enable row level security;
revoke all on public.social_likes from public, anon, authenticated;
grant select (post_id) on public.social_likes to anon, authenticated;
grant insert, delete on public.social_likes to authenticated;
drop policy if exists "Read likes on published posts" on public.social_likes;
create policy "Read likes on published posts"
  on public.social_likes for select to anon, authenticated
  using (exists (
    select 1 from public.social_posts post
    where post.id = social_likes.post_id and post.status = 'published' and post.published_at <= now()
  ));
drop policy if exists "Users like published posts" on public.social_likes;
create policy "Users like published posts"
  on public.social_likes for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.social_posts post
      where post.id = social_likes.post_id and post.status = 'published' and post.published_at <= now()
    )
  );
drop policy if exists "Users remove own likes" on public.social_likes;
create policy "Users remove own likes"
  on public.social_likes for delete to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.get_my_social_likes(p_post_ids uuid[])
returns table (post_id uuid)
language sql
stable
security definer
set search_path = ''
as $$
  select likes.post_id
  from public.social_likes likes
  where likes.user_id = (select auth.uid())
    and likes.post_id = any(coalesce(p_post_ids, '{}'::uuid[]))
$$;
revoke all on function public.get_my_social_likes(uuid[]) from public, anon;
grant execute on function public.get_my_social_likes(uuid[]) to authenticated;

create table if not exists public.social_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid not null references public.social_posts(id) on delete cascade,
  reason text not null check (char_length(reason) between 10 and 1000),
  status text not null default 'open' check (status in ('open', 'resolved', 'dismissed')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
alter table public.social_reports enable row level security;
revoke all on public.social_reports from public, anon, authenticated;
create or replace function public.report_social_post(p_post_id uuid, p_reason text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := (select auth.uid());
  v_report uuid;
begin
  if v_actor is null or char_length(trim(coalesce(p_reason, ''))) not between 10 and 1000 then
    raise exception 'Sign in and provide a report between 10 and 1000 characters';
  end if;
  if not exists (select 1 from public.social_posts post where post.id = p_post_id and post.status = 'published') then
    raise exception 'Post not found';
  end if;
  insert into public.social_reports (reporter_id, post_id, reason)
  values (v_actor, p_post_id, trim(p_reason))
  returning id into v_report;
  return v_report;
end;
$$;
revoke all on function public.report_social_post(uuid, text) from public, anon;
grant execute on function public.report_social_post(uuid, text) to authenticated;

create table if not exists public.ai_social_schedule (
  renter_profile_id uuid primary key references public.renter_profiles(id) on delete cascade,
  next_post_at timestamptz not null default now(),
  last_posted_at timestamptz,
  last_error text
);
insert into public.ai_social_schedule (renter_profile_id)
select renter.id from public.renter_profiles renter
where renter.persona_mode = 'ai' and renter.is_active
on conflict (renter_profile_id) do nothing;
alter table public.ai_social_schedule enable row level security;
revoke all on public.ai_social_schedule from public, anon, authenticated;

create or replace function public.ensure_ai_social_schedule()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.persona_mode = 'ai' and new.is_active then
    insert into public.ai_social_schedule (renter_profile_id)
    values (new.id)
    on conflict (renter_profile_id) do nothing;
  end if;
  return new;
end;
$$;
revoke all on function public.ensure_ai_social_schedule() from public, anon, authenticated;
drop trigger if exists ensure_ai_social_schedule_after_profile_write on public.renter_profiles;
create trigger ensure_ai_social_schedule_after_profile_write
  after insert or update of persona_mode, is_active on public.renter_profiles
  for each row execute function public.ensure_ai_social_schedule();

create or replace function public.publish_ai_social_post(
  p_renter_profile_id uuid,
  p_caption text,
  p_media_url text,
  p_source_url text,
  p_source_credit text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_gallery_id uuid;
begin
  if auth.role() <> 'service_role' then
    raise exception 'Service role required';
  end if;
  if char_length(trim(coalesce(p_caption, ''))) not between 1 and 2000
    or p_media_url is null
    or p_media_url !~ '^https://i\.pinimg\.com/'
    or p_source_url is null
    or p_source_url !~ '^https://www\.pinterest\.com/pin/[0-9]+/?$' then
    raise exception 'Invalid Pinterest image, pin, or caption';
  end if;
  if not exists (
    select 1 from public.renter_profiles renter
    where renter.id = p_renter_profile_id and renter.is_active and renter.persona_mode = 'ai'
  ) then
    raise exception 'Active AI profile required';
  end if;
  insert into public.renter_gallery (
    renter_profile_id, media_url, media_type, caption, source_url,
    source_credit, is_ai_generated, status, moderated_at
  ) values (
    p_renter_profile_id, p_media_url, 'image', p_caption, p_source_url,
    left(p_source_credit, 200), true, 'published', now()
  )
  on conflict (renter_profile_id, source_url) do nothing
  returning id into v_gallery_id;
  if v_gallery_id is null then
    return false;
  end if;
  insert into public.social_posts (
    renter_profile_id, caption, media_url, media_type, source_url,
    source_credit, is_ai_generated, status, published_at, moderated_at
  ) values (
    p_renter_profile_id, left(trim(p_caption), 2000), p_media_url, 'image', p_source_url,
    left(p_source_credit, 200), true, 'published', now(), now()
  );
  return true;
end;
$$;
revoke all on function public.publish_ai_social_post(uuid, text, text, text, text) from public, anon, authenticated;
grant execute on function public.publish_ai_social_post(uuid, text, text, text, text) to service_role;

create table if not exists public.app_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  notification_type text not null,
  title text not null,
  body text not null default '',
  reference_code text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists app_notifications_user_created_idx
  on public.app_notifications (user_id, created_at desc);
alter table public.app_notifications enable row level security;
revoke all on public.app_notifications from public, anon, authenticated;
grant select on public.app_notifications to authenticated;
grant update (read_at) on public.app_notifications to authenticated;
drop policy if exists "Users read own notifications" on public.app_notifications;
create policy "Users read own notifications"
  on public.app_notifications for select to authenticated
  using (user_id = (select auth.uid()));
drop policy if exists "Users mark own notifications read" on public.app_notifications;
create policy "Users mark own notifications read"
  on public.app_notifications for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create table if not exists public.email_outbox (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  recipient_email text not null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  attempts integer not null default 0,
  available_at timestamptz not null default now(),
  claimed_at timestamptz,
  sent_at timestamptz,
  last_error text,
  created_at timestamptz not null default now()
);
create index if not exists email_outbox_pending_idx
  on public.email_outbox (available_at, id) where sent_at is null;
alter table public.email_outbox enable row level security;
revoke all on public.email_outbox from public, anon, authenticated;

create table if not exists public.ai_chat_rate_limits (
  user_id uuid not null references public.profiles(id) on delete cascade,
  window_kind text not null check (window_kind in ('minute', 'hour')),
  window_start timestamptz not null,
  request_count integer not null check (request_count > 0),
  primary key (user_id, window_kind, window_start)
);
alter table public.ai_chat_rate_limits enable row level security;
revoke all on public.ai_chat_rate_limits from public, anon, authenticated;

create or replace function public.consume_ai_chat_quota(p_user_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_minute_count integer;
  v_hour_count integer;
  v_now timestamptz := now();
begin
  if auth.role() <> 'service_role' or p_user_id is null then
    raise exception 'Service role and user id required';
  end if;
  insert into public.ai_chat_rate_limits (user_id, window_kind, window_start, request_count)
  values (p_user_id, 'minute', date_trunc('minute', v_now), 1)
  on conflict (user_id, window_kind, window_start)
  do update set request_count = public.ai_chat_rate_limits.request_count + 1
    where public.ai_chat_rate_limits.request_count < 10
  returning request_count into v_minute_count;
  if not found then
    return false;
  end if;
  insert into public.ai_chat_rate_limits (user_id, window_kind, window_start, request_count)
  values (p_user_id, 'hour', date_trunc('hour', v_now), 1)
  on conflict (user_id, window_kind, window_start)
  do update set request_count = public.ai_chat_rate_limits.request_count + 1
    where public.ai_chat_rate_limits.request_count < 60
  returning request_count into v_hour_count;
  if not found then
    return false;
  end if;
  delete from public.ai_chat_rate_limits where window_start < v_now - interval '2 hours';
  return true;
end;
$$;
revoke all on function public.consume_ai_chat_quota(uuid) from public, anon, authenticated;
grant execute on function public.consume_ai_chat_quota(uuid) to service_role;

create or replace function public.enqueue_email(
  p_user_id uuid,
  p_email text,
  p_event_type text,
  p_payload jsonb
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_email is null or p_email = '' or not exists (
    select 1 from public.profiles profile
    where profile.id = p_user_id and profile.email_notifications_enabled
  ) then
    return;
  end if;
  insert into public.email_outbox (user_id, recipient_email, event_type, payload)
  values (p_user_id, p_email, p_event_type, coalesce(p_payload, '{}'::jsonb));
end;
$$;

create or replace function public.notify_booking_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_event text;
  v_customer public.profiles%rowtype;
  v_owner public.profiles%rowtype;
  v_owner_id uuid;
begin
  if tg_op = 'INSERT' then
    v_event := 'booking_created';
  elsif new.status is distinct from old.status then
    v_event := case new.status when 'paid' then 'booking_paid' when 'cancelled' then 'booking_cancelled' else 'booking_updated' end;
  elsif new.sessions is distinct from old.sessions then
    v_event := 'booking_rescheduled';
  else
    return new;
  end if;
  select * into v_customer from public.profiles where id = new.customer_id;
  select owner_id into v_owner_id from public.renter_profiles where id = new.renter_profile_id;
  select * into v_owner from public.profiles where id = v_owner_id;
  if new.customer_id is not null then
    insert into public.app_notifications (user_id, notification_type, title, body, reference_code)
    values (new.customer_id, v_event, v_event, new.code, new.code);
    perform public.enqueue_email(new.customer_id, v_customer.email, v_event,
      jsonb_build_object('booking_code', new.code, 'recipient', v_customer.full_name));
  end if;
  if v_owner_id is not null then
    insert into public.app_notifications (user_id, notification_type, title, body, reference_code)
    values (v_owner_id, v_event, v_event, new.code, new.code);
    perform public.enqueue_email(v_owner_id, v_owner.email, v_event,
      jsonb_build_object('booking_code', new.code, 'recipient', v_owner.full_name));
  end if;
  return new;
end;
$$;
drop trigger if exists notify_booking_change_after_write on public.bookings;
create trigger notify_booking_change_after_write
  after insert or update of status, sessions on public.bookings
  for each row execute function public.notify_booking_change();

create or replace function public.notify_chat_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_recipient uuid;
  v_booking_code text;
  v_recipient_profile public.profiles%rowtype;
begin
  if new.sender_kind = 'persona' or new.sender_id is null then
    return new;
  end if;
  if tg_table_name = 'messages' then
    select case when booking.customer_id = new.sender_id then renter.owner_id else booking.customer_id end,
      booking.code
    into v_recipient, v_booking_code
    from public.bookings booking
    left join public.renter_profiles renter on renter.id = booking.renter_profile_id
    where booking.id = new.booking_id and booking.status in ('paid', 'completed');
  else
    select case when thread.admin_id = new.sender_id then renter.owner_id else thread.admin_id end,
      'ADMIN'
    into v_recipient, v_booking_code
    from public.admin_chat_threads thread
    join public.renter_profiles renter on renter.id = thread.renter_profile_id
    where thread.id = new.thread_id;
  end if;
  if v_recipient is null or v_recipient = new.sender_id then
    return new;
  end if;
  select * into v_recipient_profile from public.profiles where id = v_recipient;
  insert into public.app_notifications (user_id, notification_type, title, body, reference_code)
  values (v_recipient, 'new_message', 'Tin nhắn mới', 'Bạn có tin nhắn mới.', v_booking_code);
  perform public.enqueue_email(v_recipient, v_recipient_profile.email, 'new_message',
    jsonb_build_object('booking_code', v_booking_code, 'recipient', v_recipient_profile.full_name));
  return new;
end;
$$;
drop trigger if exists notify_booking_message_after_insert on public.messages;
create trigger notify_booking_message_after_insert after insert on public.messages
  for each row execute function public.notify_chat_message();
drop trigger if exists notify_admin_chat_message_after_insert on public.admin_chat_messages;
create trigger notify_admin_chat_message_after_insert after insert on public.admin_chat_messages
  for each row execute function public.notify_chat_message();

create or replace function public.claim_email_outbox(p_limit integer default 50)
returns table (id bigint, recipient_email text, event_type text, payload jsonb)
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
    select outbox.id
    from public.email_outbox outbox
    where outbox.sent_at is null
      and outbox.available_at <= now()
      and (outbox.claimed_at is null or outbox.claimed_at < now() - interval '10 minutes')
    order by outbox.id
    limit greatest(1, least(coalesce(p_limit, 50), 100))
    for update skip locked
  )
  update public.email_outbox outbox
  set claimed_at = now(), attempts = attempts + 1
  from candidates
  where outbox.id = candidates.id
  returning outbox.id, outbox.recipient_email, outbox.event_type, outbox.payload;
end;
$$;
revoke all on function public.claim_email_outbox(integer) from public, anon, authenticated;
grant execute on function public.claim_email_outbox(integer) to service_role;

create or replace function public.set_email_outbox_result(p_id bigint, p_sent boolean, p_error text default null)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.role() <> 'service_role' then
    raise exception 'Service role required';
  end if;
  update public.email_outbox
  set sent_at = case when p_sent then now() else null end,
      available_at = case when p_sent then available_at else now() + interval '15 minutes' end,
      claimed_at = null,
      last_error = case when p_sent then null else left(coalesce(p_error, 'Unknown error'), 1000) end
  where id = p_id and sent_at is null;
  return found;
end;
$$;
revoke all on function public.set_email_outbox_result(bigint, boolean, text) from public, anon, authenticated;
grant execute on function public.set_email_outbox_result(bigint, boolean, text) to service_role;

create or replace function public.moderate_social_content(
  p_content_type text,
  p_content_id uuid,
  p_decision text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles profile
    where profile.id = (select auth.uid()) and profile.role = 'admin'
  ) then
    raise exception 'Administrator access required';
  end if;
  if p_decision not in ('published', 'rejected') then
    raise exception 'Invalid moderation decision';
  end if;
  if p_content_type = 'post' then
    update public.social_posts
    set status = p_decision,
        published_at = case when p_decision = 'published' then now() else null end,
        moderated_at = now(), moderated_by = (select auth.uid())
    where id = p_content_id
      and (status = 'pending' or (status = 'published' and p_decision = 'rejected'));
  elsif p_content_type = 'gallery' then
    update public.renter_gallery
    set status = p_decision,
        moderated_at = now(), moderated_by = (select auth.uid())
    where id = p_content_id
      and (status = 'pending' or (status = 'published' and p_decision = 'rejected'));
  else
    raise exception 'Invalid social content type';
  end if;
  return found;
end;
$$;
revoke all on function public.moderate_social_content(text, uuid, text) from public, anon;
grant execute on function public.moderate_social_content(text, uuid, text) to authenticated;

create or replace function public.resolve_social_report(p_report_id uuid, p_status text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles profile
    where profile.id = (select auth.uid()) and profile.role = 'admin'
  ) then
    raise exception 'Administrator access required';
  end if;
  if p_status not in ('resolved', 'dismissed') then
    raise exception 'Invalid report status';
  end if;
  update public.social_reports
  set status = p_status, resolved_at = now()
  where id = p_report_id and status = 'open';
  return found;
end;
$$;
revoke all on function public.resolve_social_report(uuid, text) from public, anon;
grant execute on function public.resolve_social_report(uuid, text) to authenticated;

create or replace function public.list_admin_expansion_data()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_result jsonb;
begin
  if not exists (
    select 1 from public.profiles profile
    where profile.id = (select auth.uid()) and profile.role = 'admin'
  ) then
    raise exception 'Administrator access required';
  end if;
  select jsonb_build_object(
    'pending_payments', (select count(*) from public.bookings where status = 'pending'),
    'active_bookings', (select count(*) from public.bookings where status = 'paid'),
    'upcoming_bookings', (
      select count(*) from public.bookings booking
      where booking.status = 'paid'
        and exists (
          select 1 from jsonb_array_elements(booking.sessions) session(item)
          where (session.item ->> 'd')::date + (session.item ->> 't')::time >= now() at time zone 'Asia/Ho_Chi_Minh'
        )
    ),
    'open_chat_reports', (select count(*) from public.chat_reports where status = 'open'),
    'open_social_reports', (select count(*) from public.social_reports where status = 'open'),
    'pending_posts', (select count(*) from public.social_posts where status = 'pending'),
    'pending_gallery', (select count(*) from public.renter_gallery where status = 'pending'),
    'unverified_renters', (select count(*) from public.renter_profiles where owner_id is not null and is_active and not is_verified),
    'recent_bookings', coalesce((
      select jsonb_agg(jsonb_build_object(
        'code', booking.code, 'status', booking.status, 'created_at', booking.created_at,
        'sessions', booking.sessions, 'renter_name', renter.display_name,
        'total_vnd', booking.total_vnd
      ) order by booking.created_at desc)
      from (
        select * from public.bookings order by created_at desc limit 25
      ) booking
      join public.renter_profiles renter on renter.id = booking.renter_profile_id
    ), '[]'::jsonb),
    'pending_content', coalesce((
      select jsonb_agg(item order by created_at desc)
      from (
        select candidates.item, candidates.created_at
        from (
          select jsonb_build_object(
            'id', post.id, 'type', 'post', 'profile_id', renter.id,
            'profile_name', renter.display_name, 'caption', post.caption,
            'media_url', post.media_url, 'media_type', post.media_type, 'created_at', post.created_at
          ) as item, post.created_at
          from public.social_posts post
          join public.renter_profiles renter on renter.id = post.renter_profile_id
          where post.status = 'pending'
          union all
          select jsonb_build_object(
            'id', media.id, 'type', 'gallery', 'profile_id', renter.id,
            'profile_name', renter.display_name, 'caption', media.caption,
            'media_url', media.media_url, 'media_type', media.media_type, 'created_at', media.created_at
          ), media.created_at
          from public.renter_gallery media
          join public.renter_profiles renter on renter.id = media.renter_profile_id
          where media.status = 'pending'
        ) candidates
        order by candidates.created_at desc
        limit 50
      ) pending_items
    ), '[]'::jsonb),
    'unverified_profiles', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', renter.id, 'display_name', renter.display_name, 'owner_id', renter.owner_id,
        'created_at', renter.created_at, 'is_verified', renter.is_verified
      ) order by renter.created_at)
      from (
        select profile.id, profile.display_name, profile.owner_id, profile.created_at, profile.is_verified
        from public.renter_profiles profile
        where profile.owner_id is not null and profile.is_active and not profile.is_verified
        order by profile.created_at
        limit 100
      ) renter
    ), '[]'::jsonb),
    'open_social_reports_list', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', report.id, 'reason', report.reason, 'created_at', report.created_at,
        'post_id', report.post_id, 'caption', post.caption, 'status', report.status
      ) order by report.created_at desc)
      from (select * from public.social_reports where status = 'open' order by created_at desc limit 100) report
      join public.social_posts post on post.id = report.post_id
    ), '[]'::jsonb)
  ) into v_result;
  return v_result;
end;
$$;
revoke all on function public.list_admin_expansion_data() from public, anon;
grant execute on function public.list_admin_expansion_data() to authenticated;

create or replace function public.erase_my_account_data()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := (select auth.uid());
  v_role text;
begin
  select role into v_role from public.profiles where id = v_actor for update;
  if v_actor is null or v_role is null then
    raise exception 'Signed-in account required';
  end if;
  if v_role = 'admin' then
    raise exception 'Transfer administrator duties before deleting this account';
  end if;
  if exists (
    select 1 from public.bookings booking
    left join public.renter_profiles renter on renter.id = booking.renter_profile_id
    where booking.status = 'paid'
      and (booking.customer_id = v_actor or renter.owner_id = v_actor)
      and exists (
        select 1 from jsonb_array_elements(booking.sessions) session(item)
        where (session.item ->> 'd')::date + (session.item ->> 't')::time > now() at time zone 'Asia/Ho_Chi_Minh'
      )
  ) then
    raise exception 'Complete or cancel upcoming paid bookings before account deletion';
  end if;

  delete from public.messages message
  using public.bookings booking
  left join public.renter_profiles renter on renter.id = booking.renter_profile_id
  where message.booking_id = booking.id
    and (booking.customer_id = v_actor or renter.owner_id = v_actor);

  delete from public.admin_chat_threads thread
  using public.renter_profiles renter
  where thread.renter_profile_id = renter.id
    and (thread.admin_id = v_actor or renter.owner_id = v_actor);

  delete from public.social_comments where author_id = v_actor;
  delete from public.social_likes where user_id = v_actor;
  delete from public.social_reports where reporter_id = v_actor;
  delete from public.chat_reports where reporter_id = v_actor;
  delete from public.social_posts post using public.renter_profiles renter
  where post.renter_profile_id = renter.id and renter.owner_id = v_actor;
  delete from public.renter_gallery media using public.renter_profiles renter
  where media.renter_profile_id = renter.id and renter.owner_id = v_actor;

  update public.bookings set customer_id = null where customer_id = v_actor;
  update public.payment_transactions transaction
  set payload = jsonb_build_object(
    'provider', coalesce(transaction.payload ->> 'provider', 'payment'),
    'booking_code', booking.code,
    'account_erased', true
  )
  from public.bookings booking
  where transaction.booking_id = booking.id
    and booking.customer_id is null
    and transaction.payload ->> 'confirmed_by' = v_actor::text;

  if v_role = 'renter' then
    update public.renter_profiles renter
    set owner_id = null, display_name = 'Hồ sơ đã đóng', bio = '',
        avatar_url = null, chat_background_url = null,
        is_active = false, is_verified = false, verified_at = null, verified_by = null
    where renter.owner_id = v_actor
      and exists (select 1 from public.bookings booking where booking.renter_profile_id = renter.id);
    delete from public.renter_profiles renter
    where renter.owner_id = v_actor;
  end if;

  delete from public.profiles where id = v_actor;
  return true;
end;
$$;
revoke all on function public.erase_my_account_data() from public, anon;
grant execute on function public.erase_my_account_data() to authenticated;

create or replace function public.claim_due_ai_social_profiles(p_limit integer default 20)
returns table (renter_profile_id uuid)
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
    select schedule.renter_profile_id
    from public.ai_social_schedule schedule
    join public.renter_profiles renter on renter.id = schedule.renter_profile_id
    where schedule.next_post_at <= now() and renter.is_active and renter.persona_mode = 'ai'
    order by schedule.next_post_at
    limit greatest(1, least(coalesce(p_limit, 20), 100))
    for update of schedule skip locked
  )
  update public.ai_social_schedule schedule
  set next_post_at = now() + interval '3 days',
      last_posted_at = now(),
      last_error = null
  from candidates
  where schedule.renter_profile_id = candidates.renter_profile_id
  returning schedule.renter_profile_id;
end;
$$;
revoke all on function public.claim_due_ai_social_profiles(integer) from public, anon, authenticated;
grant execute on function public.claim_due_ai_social_profiles(integer) to service_role;

create or replace function public.set_ai_social_post_error(p_renter_profile_id uuid, p_error text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.role() <> 'service_role' then
    raise exception 'Service role required';
  end if;
  update public.ai_social_schedule
  set next_post_at = now() + interval '6 hours',
      last_error = left(coalesce(p_error, 'Unknown error'), 1000)
  where renter_profile_id = p_renter_profile_id;
  return found;
end;
$$;
revoke all on function public.set_ai_social_post_error(uuid, text) from public, anon, authenticated;
grant execute on function public.set_ai_social_post_error(uuid, text) to service_role;

create extension if not exists pgcrypto;
create or replace function public.can_access_renter_social_media(p_object_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.social_posts post
    join public.renter_profiles renter on renter.id = post.renter_profile_id
    where split_part(post.media_url, '/renter-social-media/', 2) = p_object_name
      and (
        (post.status = 'published' and post.published_at <= now())
        or renter.owner_id = (select auth.uid())
        or exists (select 1 from public.profiles profile
          where profile.id = (select auth.uid()) and profile.role = 'admin')
      )
  ) or exists (
    select 1
    from public.renter_gallery media
    join public.renter_profiles renter on renter.id = media.renter_profile_id
    where split_part(media.media_url, '/renter-social-media/', 2) = p_object_name
      and (
        media.status = 'published'
        or renter.owner_id = (select auth.uid())
        or exists (select 1 from public.profiles profile
          where profile.id = (select auth.uid()) and profile.role = 'admin')
      )
  );
$$;
revoke all on function public.can_access_renter_social_media(text) from public;
grant execute on function public.can_access_renter_social_media(text) to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'renter-social-media',
  'renter-social-media',
  false,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "Public can view renter social media" on storage.objects;
drop policy if exists "Authorized users can view renter social media" on storage.objects;
create policy "Authorized users can view renter social media"
  on storage.objects for select to anon, authenticated
  using (
    bucket_id = 'renter-social-media'
    and public.can_access_renter_social_media(name)
  );
drop policy if exists "Renters upload own social media" on storage.objects;
create policy "Renters upload own social media"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'renter-social-media'
    and exists (
      select 1 from public.renter_profiles renter
      join public.profiles profile on profile.id = (select auth.uid())
      where renter.id::text = (storage.foldername(name))[1]
        and renter.owner_id = (select auth.uid())
        and profile.role = 'renter'
    )
  );
drop policy if exists "Renters delete own social media" on storage.objects;
create policy "Renters delete own social media"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'renter-social-media'
    and exists (
      select 1 from public.renter_profiles renter
      where renter.id::text = (storage.foldername(name))[1]
        and renter.owner_id = (select auth.uid())
    )
  );

create index if not exists booking_change_events_booking_created_idx
  on public.booking_change_events (booking_id, created_at desc);
create index if not exists social_reports_status_created_idx
  on public.social_reports (status, created_at desc);
