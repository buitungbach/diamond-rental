create table if not exists public.renter_profile_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  renter_profile_id uuid not null references public.renter_profiles(id) on delete cascade,
  reason text not null check (char_length(reason) between 10 and 1000),
  status text not null default 'open' check (status in ('open', 'resolved', 'dismissed')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

alter table public.renter_profile_reports enable row level security;
revoke all on public.renter_profile_reports from public, anon, authenticated;

create unique index if not exists renter_profile_reports_one_open_per_reporter_idx
  on public.renter_profile_reports (reporter_id, renter_profile_id)
  where status = 'open';
create index if not exists renter_profile_reports_status_created_idx
  on public.renter_profile_reports (status, created_at desc);

create or replace function public.report_renter_profile(
  p_profile_id uuid,
  p_reason text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := (select auth.uid());
  v_report_id uuid;
begin
  if v_actor is null then
    raise exception 'Sign in to report a profile';
  end if;
  if char_length(trim(coalesce(p_reason, ''))) not between 10 and 1000 then
    raise exception 'Please provide a report between 10 and 1000 characters';
  end if;
  if not exists (
    select 1 from public.renter_profiles profile
    where profile.id = p_profile_id
      and profile.is_active
      and profile.persona_mode = 'human'
      and profile.owner_id is distinct from v_actor
  ) then
    raise exception 'Active human profile not found';
  end if;

  insert into public.renter_profile_reports (reporter_id, renter_profile_id, reason)
  values (v_actor, p_profile_id, trim(p_reason))
  on conflict (reporter_id, renter_profile_id) where status = 'open' do nothing
  returning id into v_report_id;
  if v_report_id is null then
    raise exception 'You already have an open report for this profile';
  end if;
  return v_report_id;
end;
$$;
revoke all on function public.report_renter_profile(uuid, text) from public, anon;
grant execute on function public.report_renter_profile(uuid, text) to authenticated;

create or replace function public.list_renter_profile_reports()
returns table (
  id uuid,
  status text,
  reason text,
  created_at timestamptz,
  reporter_name text,
  profile_name text
)
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
  return query
  select report.id, report.status, report.reason, report.created_at,
    reporter.full_name, renter.display_name
  from public.renter_profile_reports report
  join public.profiles reporter on reporter.id = report.reporter_id
  join public.renter_profiles renter on renter.id = report.renter_profile_id
  order by (report.status = 'open') desc, report.created_at desc
  limit 200;
end;
$$;
revoke all on function public.list_renter_profile_reports() from public, anon;
grant execute on function public.list_renter_profile_reports() to authenticated;

create or replace function public.resolve_renter_profile_report(
  p_report_id uuid,
  p_status text
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
  if p_status not in ('resolved', 'dismissed') then
    raise exception 'Invalid report status';
  end if;
  update public.renter_profile_reports
  set status = p_status, resolved_at = now()
  where id = p_report_id and status = 'open';
  return found;
end;
$$;
revoke all on function public.resolve_renter_profile_report(uuid, text) from public, anon;
grant execute on function public.resolve_renter_profile_report(uuid, text) to authenticated;
