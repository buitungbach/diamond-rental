-- Run after product-expansion.sql. Adds customer-controlled public identity
-- without exposing the private fields stored in public.profiles.

create table if not exists public.customer_public_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  display_name text check (
    display_name is null or char_length(trim(display_name)) between 1 and 50
  ),
  avatar_path text,
  updated_at timestamptz not null default now(),
  constraint customer_avatar_path_belongs_to_user check (
    avatar_path is null or avatar_path like user_id::text || '/%'
  )
);
alter table public.customer_public_profiles enable row level security;
revoke all on public.customer_public_profiles from public, anon, authenticated;
grant select on public.customer_public_profiles to anon, authenticated;
grant insert, update on public.customer_public_profiles to authenticated;
drop policy if exists "Public can read customer display profiles" on public.customer_public_profiles;
create policy "Public can read customer display profiles"
  on public.customer_public_profiles for select to anon, authenticated
  using (true);
drop policy if exists "Customers create own public profile" on public.customer_public_profiles;
create policy "Customers create own public profile"
  on public.customer_public_profiles for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.profiles profile
      where profile.id = (select auth.uid()) and profile.role = 'customer'
    )
  );
drop policy if exists "Customers update own public profile" on public.customer_public_profiles;
create policy "Customers update own public profile"
  on public.customer_public_profiles for update to authenticated
  using (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.profiles profile
      where profile.id = (select auth.uid()) and profile.role = 'customer'
    )
  )
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.profiles profile
      where profile.id = (select auth.uid()) and profile.role = 'customer'
    )
  );
create or replace function public.touch_customer_public_profile()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
drop trigger if exists touch_customer_public_profile_before_update on public.customer_public_profiles;
create trigger touch_customer_public_profile_before_update
  before update on public.customer_public_profiles
  for each row execute function public.touch_customer_public_profile();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'customer-avatars',
  'customer-avatars',
  true,
  1048576,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view customer avatars" on storage.objects;
create policy "Public can view customer avatars"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'customer-avatars');
drop policy if exists "Customers upload own avatars" on storage.objects;
create policy "Customers upload own avatars"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'customer-avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and exists (
      select 1 from public.profiles profile
      where profile.id = (select auth.uid()) and profile.role = 'customer'
    )
  );
drop policy if exists "Customers update own avatars" on storage.objects;
create policy "Customers update own avatars"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'customer-avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and exists (
      select 1 from public.profiles profile
      where profile.id = (select auth.uid()) and profile.role = 'customer'
    )
  )
  with check (
    bucket_id = 'customer-avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and exists (
      select 1 from public.profiles profile
      where profile.id = (select auth.uid()) and profile.role = 'customer'
    )
  );
drop policy if exists "Customers delete own avatars" on storage.objects;
create policy "Customers delete own avatars"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'customer-avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and exists (
      select 1 from public.profiles profile
      where profile.id = (select auth.uid()) and profile.role = 'customer'
    )
  );

alter table public.social_comments
  add column if not exists author_avatar_path text,
  add column if not exists author_avatar_url text;
revoke all on public.social_comments from public, anon, authenticated;
grant select on public.social_comments to anon, authenticated;
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
    select renter.display_name, renter.avatar_url
    into v_public_name, new.author_avatar_url
    from public.renter_profiles renter
    where renter.owner_id = new.author_id and renter.is_active
    limit 1;
    new.author_avatar_path := null;
  else
    select public_profile.display_name, public_profile.avatar_path
    into v_public_name, new.author_avatar_path
    from public.customer_public_profiles public_profile
    where public_profile.user_id = new.author_id;
    new.author_avatar_url := null;
  end if;
  new.author_label := coalesce(nullif(trim(v_public_name), ''), case when v_role = 'renter' then 'Bạn gái thuê' else 'Khách hàng' end);
  new.body := trim(new.body);
  return new;
end;
$$;
drop trigger if exists prepare_social_comment_before_insert on public.social_comments;
create trigger prepare_social_comment_before_insert
  before insert on public.social_comments
  for each row execute function public.prepare_social_comment();

create or replace function public.sync_customer_social_comment_identity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.social_comments
  set author_label = coalesce(nullif(trim(new.display_name), ''), 'Khách hàng'),
      author_avatar_path = new.avatar_path,
      author_avatar_url = null
  where author_id = new.user_id;
  return new;
end;
$$;
drop trigger if exists sync_customer_social_comment_identity_after_write on public.customer_public_profiles;
create trigger sync_customer_social_comment_identity_after_write
  after insert or update of display_name, avatar_path on public.customer_public_profiles
  for each row execute function public.sync_customer_social_comment_identity();

create or replace function public.sync_renter_social_comment_identity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.owner_id is not null then
    update public.social_comments
    set author_label = coalesce(nullif(trim(new.display_name), ''), 'Bạn gái thuê'),
        author_avatar_path = null,
        author_avatar_url = new.avatar_url
    where author_id = new.owner_id;
  end if;
  return new;
end;
$$;
drop trigger if exists sync_renter_social_comment_identity_after_write on public.renter_profiles;
create trigger sync_renter_social_comment_identity_after_write
  after insert or update of display_name, avatar_url on public.renter_profiles
  for each row execute function public.sync_renter_social_comment_identity();

create or replace function public.get_booking_chat_identities(p_booking_id uuid)
returns table (
  user_id uuid,
  account_role text,
  display_name text,
  avatar_path text,
  avatar_url text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1
    from public.bookings booking
    left join public.renter_profiles renter on renter.id = booking.renter_profile_id
    where booking.id = p_booking_id
      and booking.status in ('paid', 'completed')
      and ((select auth.uid()) = booking.customer_id or (select auth.uid()) = renter.owner_id)
  ) then
    raise exception 'Paid booking participant access required';
  end if;
  return query
  select booking.customer_id,
    'customer'::text,
    coalesce(nullif(trim(customer_profile.display_name), ''), 'Khách hàng'),
    customer_profile.avatar_path,
    null::text
  from public.bookings booking
  left join public.customer_public_profiles customer_profile
    on customer_profile.user_id = booking.customer_id
  where booking.id = p_booking_id
    and booking.status in ('paid', 'completed')
  union all
  select renter.owner_id,
    'renter'::text,
    renter.display_name,
    null::text,
    renter.avatar_url
  from public.bookings booking
  join public.renter_profiles renter on renter.id = booking.renter_profile_id
  where booking.id = p_booking_id
    and booking.status in ('paid', 'completed')
    and renter.owner_id is not null;
end;
$$;
revoke all on function public.get_booking_chat_identities(uuid) from public, anon;
grant execute on function public.get_booking_chat_identities(uuid) to authenticated;

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
  v_customer_title text;
  v_customer_body text;
  v_owner_title text;
  v_owner_body text;
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
  v_customer_title := case v_event
    when 'booking_paid' then 'Đã xác nhận thanh toán'
    when 'booking_created' then 'Đơn thuê đang chờ thanh toán'
    when 'booking_cancelled' then 'Đơn thuê đã hủy'
    when 'booking_rescheduled' then 'Lịch thuê đã thay đổi'
    else 'Đơn thuê vừa được cập nhật' end;
  v_customer_body := case v_event
    when 'booking_paid' then 'Đơn thuê ' || new.code || ' đã được xác nhận thanh toán. Bạn có thể mở đơn để chat với bạn gái thuê.'
    when 'booking_created' then 'Đơn thuê ' || new.code || ' đã được tạo và đang chờ thanh toán.'
    when 'booking_cancelled' then 'Đơn thuê ' || new.code || ' đã được hủy.'
    when 'booking_rescheduled' then 'Lịch thuê của đơn ' || new.code || ' đã được thay đổi.'
    else 'Đơn thuê ' || new.code || ' vừa được cập nhật.' end;
  v_owner_title := case v_event
    when 'booking_paid' then 'Khách đã thanh toán'
    when 'booking_created' then 'Có đơn thuê mới'
    when 'booking_cancelled' then 'Đơn thuê đã hủy'
    when 'booking_rescheduled' then 'Lịch thuê đã thay đổi'
    else 'Đơn thuê vừa được cập nhật' end;
  v_owner_body := case v_event
    when 'booking_paid' then 'Đơn thuê ' || new.code || ' đã được thanh toán. Mở đơn để chat với khách hàng.'
    when 'booking_created' then 'Bạn có đơn thuê ' || new.code || ' đang chờ khách thanh toán.'
    when 'booking_cancelled' then 'Đơn thuê ' || new.code || ' đã được hủy.'
    when 'booking_rescheduled' then 'Lịch thuê của đơn ' || new.code || ' đã được thay đổi.'
    else 'Đơn thuê ' || new.code || ' vừa được cập nhật.' end;
  if new.customer_id is not null then
    insert into public.app_notifications (user_id, notification_type, title, body, reference_code)
    values (new.customer_id, v_event, v_customer_title, v_customer_body, new.code);
    perform public.enqueue_email(new.customer_id, v_customer.email, v_event,
      jsonb_build_object('booking_code', new.code, 'recipient', v_customer.full_name));
  end if;
  if v_owner_id is not null then
    insert into public.app_notifications (user_id, notification_type, title, body, reference_code)
    values (v_owner_id, v_event, v_owner_title, v_owner_body, new.code);
    perform public.enqueue_email(v_owner_id, v_owner.email, v_event,
      jsonb_build_object('booking_code', new.code, 'recipient', v_owner.full_name));
  end if;
  return new;
end;
$$;

create or replace function public.notify_chat_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_recipient uuid;
  v_booking_code text;
  v_sender_name text;
  v_recipient_profile public.profiles%rowtype;
begin
  if new.sender_kind = 'persona' or new.sender_id is null then
    return new;
  end if;
  if tg_table_name = 'messages' then
    select case when booking.customer_id = new.sender_id then renter.owner_id else booking.customer_id end,
      booking.code,
      case when new.sender_kind = 'customer' then customer_profile.display_name
        when new.sender_kind = 'renter' then renter.display_name
        else sender.full_name end
    into v_recipient, v_booking_code, v_sender_name
    from public.bookings booking
    left join public.renter_profiles renter on renter.id = booking.renter_profile_id
    left join public.profiles sender on sender.id = new.sender_id
    left join public.customer_public_profiles customer_profile on customer_profile.user_id = new.sender_id
    where booking.id = new.booking_id and booking.status in ('paid', 'completed');
  else
    select case when thread.admin_id = new.sender_id then renter.owner_id else thread.admin_id end,
      'ADMIN',
      case when new.sender_kind = 'admin' then sender.full_name else renter.display_name end
    into v_recipient, v_booking_code, v_sender_name
    from public.admin_chat_threads thread
    join public.renter_profiles renter on renter.id = thread.renter_profile_id
    left join public.profiles sender on sender.id = new.sender_id
    where thread.id = new.thread_id;
  end if;
  if v_recipient is null or v_recipient = new.sender_id then
    return new;
  end if;
  select * into v_recipient_profile from public.profiles where id = v_recipient;
  insert into public.app_notifications (user_id, notification_type, title, body, reference_code)
  values (
    v_recipient,
    'new_message',
    'Tin nhắn từ ' || coalesce(nullif(trim(v_sender_name), ''), 'Khách hàng'),
    'Bạn có tin nhắn mới trong đơn thuê.',
    v_booking_code
  );
  perform public.enqueue_email(v_recipient, v_recipient_profile.email, 'new_message',
    jsonb_build_object('booking_code', v_booking_code, 'recipient', v_recipient_profile.full_name));
  return new;
end;
$$;
