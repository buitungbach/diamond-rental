create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('customer', 'renter', 'admin')),
  full_name text not null,
  date_of_birth date not null,
  phone text not null,
  email text not null,
  created_at timestamptz not null default now(),
  constraint profiles_name_not_blank check (length(trim(full_name)) > 0),
  constraint profiles_phone_not_blank check (length(trim(phone)) > 0)
);

create or replace function public.create_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  account_role text := coalesce(new.raw_user_meta_data ->> 'role', 'customer');
  account_dob date := (new.raw_user_meta_data ->> 'date_of_birth')::date;
  account_name text := trim(coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  account_phone text := trim(coalesce(new.raw_user_meta_data ->> 'phone', ''));
begin
  if account_role not in ('customer', 'renter') then
    raise exception 'Invalid account role';
  end if;
  if account_dob > current_date - interval '18 years' then
    raise exception 'Account holder must be at least 18 years old';
  end if;
  if account_name = '' or account_phone = '' then
    raise exception 'Name and phone are required';
  end if;

  insert into public.profiles (id, role, full_name, date_of_birth, phone, email)
  values (
    new.id,
    account_role,
    account_name,
    account_dob,
    account_phone,
    coalesce(new.email, '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.create_profile_for_auth_user();

create or replace function public.keep_profile_role_immutable()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.role <> old.role and current_user not in ('postgres', 'service_role') then
    raise exception 'Account role cannot be changed';
  end if;
  return new;
end;
$$;

drop trigger if exists profile_role_is_immutable on public.profiles;
create trigger profile_role_is_immutable
  before update on public.profiles
  for each row execute function public.keep_profile_role_immutable();

create or replace function public.validate_profile_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.date_of_birth > current_date - interval '18 years' then
    raise exception 'Account holder must be at least 18 years old';
  end if;
  if length(trim(new.full_name)) = 0 or length(trim(new.phone)) = 0 then
    raise exception 'Name and phone are required';
  end if;
  return new;
end;
$$;

drop trigger if exists validate_profile_before_update on public.profiles;
create trigger validate_profile_before_update
  before update on public.profiles
  for each row execute function public.validate_profile_update();

create or replace function public.sync_profile_email()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.email is distinct from old.email then
    update public.profiles set email = coalesce(new.email, '') where id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_email_updated on auth.users;
create trigger on_auth_user_email_updated
  after update of email on auth.users
  for each row execute function public.sync_profile_email();

create or replace function public.sync_renter_display_name()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.full_name is distinct from old.full_name then
    update public.renter_profiles
    set display_name = new.full_name, updated_at = now()
    where owner_id = new.id;
  end if;
  return new;
end;
$$;

create table if not exists public.renter_profiles (
  id uuid primary key default gen_random_uuid(),
  catalog_key text,
  owner_id uuid unique references public.profiles(id) on delete cascade,
  display_name text not null,
  section text not null check (section in ('platinum', 'gold', 'silver', 'special')),
  tags text[] not null default '{}',
  bio text not null default '',
  avatar_url text,
  chat_background_url text,
  availability jsonb not null default
    '[{"day":0,"from":10,"to":22},{"day":1,"from":10,"to":22},{"day":2,"from":10,"to":22},{"day":3,"from":10,"to":22},{"day":4,"from":10,"to":22},{"day":5,"from":10,"to":22},{"day":6,"from":10,"to":22}]'::jsonb,
  persona_mode text not null default 'human' check (persona_mode in ('human', 'ai')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_persona_requires_no_owner check (persona_mode <> 'ai' or owner_id is null)
);

drop trigger if exists on_profile_name_updated on public.profiles;
create trigger on_profile_name_updated
  after update of full_name on public.profiles
  for each row execute function public.sync_renter_display_name();

create table if not exists public.renter_personas (
  renter_profile_id uuid primary key references public.renter_profiles(id) on delete cascade,
  system_prompt text not null
);
alter table public.renter_personas enable row level security;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'renter-photos',
  'renter-photos',
  true,
  4194304,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view renter photos" on storage.objects;
create policy "Public can view renter photos"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'renter-photos');

drop policy if exists "Profile owners upload renter photos" on storage.objects;
create policy "Profile owners upload renter photos"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'renter-photos'
    and (
      (
        (storage.foldername(name))[1] = (select auth.uid())::text
        and exists (
          select 1 from public.profiles p
          where p.id = (select auth.uid()) and p.role = 'renter'
        )
      )
      or (
        (storage.foldername(name))[1] = 'ai'
        and exists (
          select 1 from public.profiles p
          where p.id = (select auth.uid()) and p.role = 'admin'
        )
      )
    )
  );

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  invoice_number text not null unique default
    ('DR-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12))),
  customer_id uuid not null references public.profiles(id),
  renter_profile_id uuid not null references public.renter_profiles(id),
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled', 'completed')),
  service_id text not null,
  hours integer not null check (hours in (2, 4, 6, 8)),
  package_id text not null check (package_id in ('pk1', 'pk2', 'pk3')),
  sessions jsonb not null,
  meeting_place text not null,
  note text not null default '',
  coupon text not null default '',
  total_jpy integer not null check (total_jpy >= 0),
  total_vnd bigint not null check (total_vnd >= 0),
  transfer_reference text not null unique,
  currency_rate integer not null default 1,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

comment on column public.bookings.total_jpy is
  'Legacy compatibility column; new bookings use total_vnd and store 0 here.';
comment on column public.bookings.currency_rate is
  'Legacy compatibility column; new bookings use VND and store 1 here.';

create table if not exists public.payment_transactions (
  transaction_id text primary key,
  booking_id uuid not null references public.bookings(id),
  amount_vnd bigint not null,
  reference_code text not null,
  payload jsonb not null,
  received_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  reply_to_message_id uuid unique references public.messages(id),
  sender_id uuid references public.profiles(id),
  sender_kind text not null check (sender_kind in ('customer', 'renter', 'persona')),
  body text not null check (char_length(body) between 1 and 2000),
  read_at timestamptz,
  created_at timestamptz not null default now(),
  constraint persona_sender_has_no_user check (
    (sender_kind = 'persona' and sender_id is null)
    or (sender_kind <> 'persona' and sender_id is not null)
  ),
  constraint only_personas_reply_to_messages check (
    reply_to_message_id is null or sender_kind = 'persona'
  )
);

alter table public.profiles enable row level security;
alter table public.renter_profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.payment_transactions enable row level security;
alter table public.messages enable row level security;

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

drop policy if exists "Renters update own profile" on public.profiles;
create policy "Renters update own profile"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()) and role = 'renter')
  with check (id = (select auth.uid()) and role = 'renter');

drop policy if exists "Public read active renter profiles" on public.renter_profiles;
create policy "Public read active renter profiles"
  on public.renter_profiles for select to anon, authenticated
  using (is_active or owner_id = (select auth.uid()));

drop policy if exists "Renters create own profile" on public.renter_profiles;
create policy "Renters create own profile"
  on public.renter_profiles for insert to authenticated
  with check (
    owner_id = (select auth.uid())
    and persona_mode = 'human'
    and exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid()) and p.role = 'renter'
    )
  );

drop policy if exists "Renters update own profile" on public.renter_profiles;
create policy "Renters update own profile"
  on public.renter_profiles for update to authenticated
  using (
    owner_id = (select auth.uid())
    and exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid()) and p.role = 'renter'
    )
  )
  with check (owner_id = (select auth.uid()) and persona_mode = 'human');

drop policy if exists "Customers and renters read participant bookings" on public.bookings;
create policy "Customers and renters read participant bookings"
  on public.bookings for select to authenticated
  using (
    customer_id = (select auth.uid())
    or exists (
      select 1 from public.renter_profiles r
      where r.id = bookings.renter_profile_id
        and r.owner_id = (select auth.uid())
        and bookings.status in ('paid', 'completed')
    )
  );

drop policy if exists "Participants read paid booking messages" on public.messages;
create policy "Participants read paid booking messages"
  on public.messages for select to authenticated
  using (
    exists (
      select 1 from public.bookings b
      left join public.renter_profiles r on r.id = b.renter_profile_id
      where b.id = messages.booking_id
        and b.status = 'paid'
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
      select 1 from public.bookings b
      left join public.renter_profiles r on r.id = b.renter_profile_id
      join public.profiles p on p.id = (select auth.uid())
      where b.id = messages.booking_id
        and b.status = 'paid'
        and (
          (b.customer_id = (select auth.uid()) and p.role = 'customer' and sender_kind = 'customer')
          or (r.owner_id = (select auth.uid()) and p.role = 'renter' and sender_kind = 'renter')
        )
    )
  );

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

create or replace function public.create_ai_persona(
  p_name text,
  p_section text,
  p_tags text[],
  p_bio text,
  p_avatar_url text,
  p_system_prompt text
)
returns public.renter_profiles
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile public.renter_profiles%rowtype;
begin
  if not exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ) then
    raise exception 'Admin account required';
  end if;
  if length(trim(coalesce(p_name, ''))) = 0
    or p_section not in ('platinum', 'gold', 'silver', 'special')
    or length(trim(coalesce(p_system_prompt, ''))) = 0 then
    raise exception 'Name, service tier, and persona instructions are required';
  end if;

  insert into public.renter_profiles (
    owner_id, display_name, section, tags, bio, avatar_url, persona_mode, is_active
  ) values (
    null, trim(p_name), p_section, coalesce(p_tags, '{}'),
    left(coalesce(p_bio, ''), 1000), p_avatar_url, 'ai', true
  ) returning * into v_profile;

  insert into public.renter_personas (renter_profile_id, system_prompt)
  values (v_profile.id, left(trim(p_system_prompt), 4000));

  return v_profile;
end;
$$;

revoke all on function public.create_ai_persona(text, text, text[], text, text, text) from public, anon;
grant execute on function public.create_ai_persona(text, text, text[], text, text, text) to authenticated;

create or replace function public.process_sepay_payment(
  p_transaction_id text,
  p_code text,
  p_amount_vnd bigint,
  p_reference_code text,
  p_payload jsonb
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_booking public.bookings%rowtype;
  v_existing public.payment_transactions%rowtype;
  v_inserted_booking_id uuid;
begin
  select * into v_booking from public.bookings where code = upper(trim(p_code)) for update;
  if not found then
    raise exception 'Booking not found';
  end if;

  select * into v_existing
  from public.payment_transactions
  where transaction_id = p_transaction_id;
  if found then
    if v_existing.booking_id = v_booking.id and v_existing.amount_vnd = p_amount_vnd then
      return true;
    end if;
    raise exception 'Transaction has already been used';
  end if;

  if v_booking.status = 'paid' or v_booking.status = 'completed' then
    raise exception 'Booking already paid';
  end if;
  if v_booking.status <> 'pending' or v_booking.total_vnd <> p_amount_vnd then
    raise exception 'Payment does not match pending booking';
  end if;

  insert into public.payment_transactions (transaction_id, booking_id, amount_vnd, reference_code, payload)
  values (p_transaction_id, v_booking.id, p_amount_vnd, p_reference_code, p_payload)
  on conflict (transaction_id) do nothing
  returning booking_id into v_inserted_booking_id;
  if v_inserted_booking_id is null then
    select booking_id into v_inserted_booking_id
    from public.payment_transactions where transaction_id = p_transaction_id;
    if v_inserted_booking_id is distinct from v_booking.id then
      raise exception 'Transaction has already been used';
    end if;
  end if;

  update public.bookings set status = 'paid', paid_at = now() where id = v_booking.id;
  return true;
end;
$$;

revoke all on function public.process_sepay_payment(text, text, bigint, text, jsonb) from public, anon, authenticated;
grant execute on function public.process_sepay_payment(text, text, bigint, text, jsonb) to service_role;

revoke all on public.profiles, public.renter_profiles, public.bookings,
  public.payment_transactions, public.messages from public, anon, authenticated;
grant select on public.profiles, public.bookings, public.messages to authenticated;
grant select on public.renter_profiles to anon, authenticated;
grant update (full_name, date_of_birth, phone) on public.profiles to authenticated;
grant insert (owner_id, display_name, section, tags, bio, avatar_url, persona_mode)
  on public.renter_profiles to authenticated;
grant update (owner_id, display_name, section, tags, bio, avatar_url, persona_mode, availability, chat_background_url)
  on public.renter_profiles to authenticated;
grant insert on public.messages to authenticated;
revoke all on public.renter_personas from public, anon, authenticated;
grant select on public.renter_personas to service_role;
grant insert, select on public.payment_transactions to service_role;

create index if not exists bookings_customer_created_idx
  on public.bookings (customer_id, created_at desc);
create index if not exists bookings_renter_status_idx
  on public.bookings (renter_profile_id, status);
create index if not exists messages_booking_created_idx
  on public.messages (booking_id, created_at);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'messages'
  ) then
    alter publication supabase_realtime add table public.messages;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'bookings'
  ) then
    alter publication supabase_realtime add table public.bookings;
  end if;
end;
$$;
