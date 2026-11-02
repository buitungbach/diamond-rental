-- Requires pg_cron, pg_net, and Vault extensions.
-- Set WEB_PUSH_SCHEDULER_SECRET in Edge Function Secrets and replace the
-- placeholder below with the same randomly generated secret.

select cron.unschedule(jobid)
from cron.job
where jobname = 'diamond-web-push-notifications';

select vault.create_secret(
  'REPLACE_WITH_WEB_PUSH_SCHEDULER_SECRET',
  'diamond-web-push-scheduler-secret'
);

select cron.schedule(
  'diamond-web-push-notifications',
  '* * * * *',
  $job$
    select net.http_post(
      url := 'https://tsojexeevcsizazservy.supabase.co/functions/v1/dispatch-web-push',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-scheduler-secret',
        (select decrypted_secret from vault.decrypted_secrets
         where name = 'diamond-web-push-scheduler-secret')
      ),
      body := '{}'::jsonb
    );
  $job$
);
