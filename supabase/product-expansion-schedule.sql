-- Install after product-expansion.sql and after enabling pg_cron, pg_net, and
-- Vault from Supabase Dashboard > Database > Extensions.
--
-- Set NOTIFICATION_SCHEDULER_SECRET in Supabase Edge Function Secrets and Vault.
-- Generate a random secret (at least 32 bytes) and replace the value below
-- with that same secret. This scheduler is only needed for email delivery.

select cron.unschedule(jobid)
from cron.job
where jobname = 'diamond-ai-social-posts';

select vault.create_secret(
  'REPLACE_WITH_NOTIFICATION_SCHEDULER_SECRET',
  'diamond-notification-scheduler-secret'
);

select cron.unschedule(jobid)
from cron.job
where jobname = 'diamond-email-notifications';

select cron.schedule(
  'diamond-email-notifications',
  '*/5 * * * *',
  $job$
    select net.http_post(
      url := 'https://tsojexeevcsizazservy.supabase.co/functions/v1/dispatch-email-notifications',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-scheduler-secret',
        (select decrypted_secret from vault.decrypted_secrets
         where name = 'diamond-notification-scheduler-secret')
      ),
      body := '{}'::jsonb
    );
  $job$
);
