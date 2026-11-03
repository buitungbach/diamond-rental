-- Run after web-push.sql and web-push-schedule.sql.
-- Requires pg_net and the Vault secret created by web-push-schedule.sql.

create or replace function public.dispatch_web_push_immediately()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_scheduler_secret text;
begin
  select decrypted_secret into v_scheduler_secret
  from vault.decrypted_secrets
  where name = 'diamond-web-push-scheduler-secret';

  if v_scheduler_secret is null then
    raise warning 'Web Push scheduler secret is missing from Vault; cron fallback remains available';
    return new;
  end if;

  perform net.http_post(
    url := 'https://tsojexeevcsizazservy.supabase.co/functions/v1/dispatch-web-push',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-scheduler-secret', v_scheduler_secret
    ),
    body := '{}'::jsonb
  );
  return new;
end;
$$;
revoke all on function public.dispatch_web_push_immediately() from public, anon, authenticated;

drop trigger if exists dispatch_web_push_immediately_after_enqueue on public.push_outbox;
create trigger dispatch_web_push_immediately_after_enqueue
  after insert on public.push_outbox
  for each row execute function public.dispatch_web_push_immediately();
