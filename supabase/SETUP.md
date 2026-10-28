# Diamond Rental backend setup

The HTML page stays at its current URL. Keep `supabase-config.js` and
`supabase-app.js` next to `Diamond Rental.html` when updating the existing
hosting location.

## Supabase

1. Create a Supabase project and run `supabase/schema.sql` in its SQL Editor.
2. Put the project URL and **anon/public** key in `supabase-config.js`.
   Never put the service-role key in that file or in the HTML.
3. Configure Auth email confirmation and the allowed site/redirect URLs for
   the existing website URL. New accounts must be at least 18 years old.
4. Set server-side secrets for the Edge Functions:

   ```text
   supabase secrets set SEPAY_WEBHOOK_SECRET=... SEPAY_BANK_ACCOUNT=6440205910363 OPENAI_API_KEY=...
   ```

   Supabase provides `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` to Edge Functions. Do not copy the service-role
   key into the website.
5. Link the Supabase CLI to this project, then deploy `sepay-webhook` and
   `ai-chat-reply` (`supabase link --project-ref <project-ref>`,
   `supabase functions deploy sepay-webhook`, and
   `supabase functions deploy ai-chat-reply`). The deploy uses the supplied
   `supabase/config.toml`. Keep the existing website URL in Auth's site and
   redirect URL settings.
6. To enable the operator tools, create a normal account, then promote that
   account to `admin` from the Supabase SQL Editor:

   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'the-operator-email@example.com';
   ```

   Sign out and sign back in to refresh the role. Never expose a service-role
   key in the site.

## Agribank QR and SePay

The checkout QR is generated in the browser from the Agribank account in the
provided QR image (BIN `970405`, account `6440205910363`, beneficiary
`BUI TUNG BACH`). Each QR contains the server-calculated VND amount and unique
booking code. The QR content is generated locally; the account and booking
details are not sent to a QR image service.
Profile images are uploaded to the public `renter-photos` bucket; do not add
private identity documents there.

In SePay, create an incoming-transfer webhook for that same Agribank account,
select **HMAC-SHA256**, and point it to:

```text
https://<project-ref>.supabase.co/functions/v1/sepay-webhook
```

Save SePay's webhook signing secret as `SEPAY_WEBHOOK_SECRET`. The function
checks the signature, timestamp, destination account, transfer direction,
booking code, exact VND amount, and duplicate transaction ID before it marks
the booking paid. Chat is available only after this confirmation.

## AI personas

Renter accounts created through the site are human profiles. To add an
operator-managed fictional AI persona, sign in with the promoted admin account
and use **Add profile (+)**. Enter the character's personality instructions.
They are stored separately from public profile data. Set an OpenAI API key as
a Supabase secret to enable replies. AI personas must be clearly disclosed as
fictional.

## GitHub Pages preview

The repository's `.github/workflows/pages.yml` publishes the page and its
adjacent assets to GitHub Pages after a push to `main`. It publishes
`Diamond Rental.html` both as the site's `index.html` and under its original
filename. GitHub Pages uses a public repository, so the source is publicly
visible. The former `file:///...` address only works on one computer and
cannot be used as a public website URL.

This deployment is a preview until a real Supabase project is configured.
With `supabase-config.js` left blank, online registration, booking, chat, and
payment confirmation do not work. Do not collect real customer data or accept
payments until Supabase and the SePay webhook are configured and tested.
