-- Install after product-expansion.sql and after enabling pg_cron, pg_net, and
-- Vault from Supabase Dashboard > Database > Extensions.
--
-- Set both scheduler secrets in Supabase Edge Function Secrets and Vault.
-- Generate separate random values (at least 32 bytes) for:
--   AI_SOCIAL_SCHEDULER_SECRET
--   NOTIFICATION_SCHEDULER_SECRET
-- Then replace the two values below with the same respective values.

select vault.create_secret(
  'REPLACE_WITH_AI_SOCIAL_SCHEDULER_SECRET',
  'diamond-ai-social-scheduler-secret'
);

select vault.create_secret(
  'REPLACE_WITH_NOTIFICATION_SCHEDULER_SECRET',
  'diamond-notification-scheduler-secret'
);

select cron.schedule(
  'diamond-ai-social-posts',
  '0 8 * * *',
  $job$
    select net.http_post(
      url := 'https://tsojexeevcsizazservy.supabase.co/functions/v1/ai-social-autopost',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-scheduler-secret',
        (select decrypted_secret from vault.decrypted_secrets
         where name = 'diamond-ai-social-scheduler-secret')
      ),
      body := '{}'::jsonb
    );
  $job$
);

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
