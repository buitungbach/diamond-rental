create table if not exists public.admin_chat_threads (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references public.profiles(id) on delete cascade,
  renter_profile_id uuid not null references public.renter_profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (admin_id, renter_profile_id)
);

create table if not exists public.admin_chat_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.admin_chat_threads(id) on delete cascade,
  reply_to_message_id uuid unique references public.admin_chat_messages(id),
  sender_id uuid references public.profiles(id),
  sender_kind text not null check (sender_kind in ('admin', 'renter', 'persona')),
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now(),
  constraint admin_chat_persona_sender check (
    (sender_kind = 'persona' and sender_id is null)
    or (sender_kind <> 'persona' and sender_id is not null)
  ),
  constraint admin_chat_persona_reply check (
    reply_to_message_id is null or sender_kind = 'persona'
  )
);

alter table public.admin_chat_threads enable row level security;
alter table public.admin_chat_messages enable row level security;

revoke all on public.admin_chat_threads, public.admin_chat_messages from public, anon, authenticated;
grant select on public.admin_chat_threads, public.admin_chat_messages to authenticated;
grant insert on public.admin_chat_messages to authenticated;

drop policy if exists "Admins and profile owners read admin chat threads" on public.admin_chat_threads;
create policy "Admins and profile owners read admin chat threads"
  on public.admin_chat_threads for select to authenticated
  using (
    admin_id = (select auth.uid())
    or exists (
      select 1 from public.renter_profiles r
      where r.id = admin_chat_threads.renter_profile_id
        and r.owner_id = (select auth.uid())
    )
  );

drop policy if exists "Participants read admin chat messages" on public.admin_chat_messages;
create policy "Participants read admin chat messages"
  on public.admin_chat_messages for select to authenticated
  using (
    exists (
      select 1
      from public.admin_chat_threads thread
      left join public.renter_profiles renter on renter.id = thread.renter_profile_id
      where thread.id = admin_chat_messages.thread_id
        and (
          thread.admin_id = (select auth.uid())
          or renter.owner_id = (select auth.uid())
        )
    )
  );

drop policy if exists "Participants send admin chat messages" on public.admin_chat_messages;
create policy "Participants send admin chat messages"
  on public.admin_chat_messages for insert to authenticated
  with check (
    sender_id = (select auth.uid())
    and sender_kind in ('admin', 'renter')
    and exists (
      select 1
      from public.admin_chat_threads thread
      join public.profiles profile on profile.id = (select auth.uid())
      left join public.renter_profiles renter on renter.id = thread.renter_profile_id
      where thread.id = admin_chat_messages.thread_id
        and (
          (thread.admin_id = (select auth.uid()) and profile.role = 'admin' and sender_kind = 'admin')
          or (renter.owner_id = (select auth.uid()) and profile.role = 'renter' and sender_kind = 'renter')
        )
    )
  );

create or replace function public.open_admin_chat(p_renter_profile_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_thread_id uuid;
begin
  if not exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ) then
    raise exception 'An admin account is required';
  end if;

  if not exists (
    select 1 from public.renter_profiles
    where id = p_renter_profile_id and is_active = true
  ) then
    raise exception 'Renter profile is unavailable';
  end if;

  insert into public.admin_chat_threads (admin_id, renter_profile_id)
  values (auth.uid(), p_renter_profile_id)
  on conflict (admin_id, renter_profile_id) do nothing;

  select id into v_thread_id
  from public.admin_chat_threads
  where admin_id = auth.uid() and renter_profile_id = p_renter_profile_id;

  return v_thread_id;
end;
$$;

revoke all on function public.open_admin_chat(uuid) from public, anon;
grant execute on function public.open_admin_chat(uuid) to authenticated;

create index if not exists admin_chat_messages_thread_created_idx
  on public.admin_chat_messages (thread_id, created_at);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'admin_chat_messages'
  ) then
    alter publication supabase_realtime add table public.admin_chat_messages;
  end if;
end;
$$;
