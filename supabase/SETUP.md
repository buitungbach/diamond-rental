# Diamond Rental backend setup

The HTML page stays at its current URL. Keep `supabase-config.js` and
`supabase-app.js` next to `Diamond Rental.html` when updating the existing
hosting location.

## Supabase

1. Create a Supabase project and run `supabase/schema.sql` in its SQL Editor.
   For manual Agribank transfers, also run `supabase/manual-payment.sql`.
2. Put the project URL and **anon/public** key in `supabase-config.js`.
   Never put the service-role key in that file or in the HTML.
3. Configure Auth email confirmation and the allowed site/redirect URLs for
   the existing website URL. New accounts must be at least 18 years old.
4. To enable AI chat, add `OPENAI_API_KEY` under Supabase **Edge Function
   Secrets**. Payment confirmation for Agribank transfers is manual and does
   not require a payment-provider API key.

   ```text
   supabase secrets set OPENAI_API_KEY=...
   ```

   Supabase provides `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` to Edge Functions. Do not copy the service-role
   key into the website.
5. Link the Supabase CLI to this project and deploy `ai-chat-reply` if using
   AI profiles. The existing `sepay-webhook` function is an optional,
   separate integration; it is not used for manual bank-transfer confirmation.
   Keep the website URL in Auth's site and redirect URL settings.
6. To enable the operator tools, create a normal account, then promote that
   account to `admin` from the Supabase SQL Editor:

   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'the-operator-email@example.com';
   ```

   Sign out and sign back in to refresh the role. Never expose a service-role
   key in the site.

## Agribank QR and manual payment confirmation

The checkout QR is generated in the browser from the Agribank account in the
provided QR image (BIN `970405`, account `6440205910363`, beneficiary
`BUI TUNG BACH`). Each QR contains the server-calculated VND amount and unique
booking code. The QR content is generated locally; the account and booking
details are not sent to a QR image service.
Profile images are uploaded to the public `renter-photos` bucket; do not add
private identity documents there.

An administrator reviews pending orders under the Orders/Inbox page and
confirms a transfer only after checking the exact amount and bank transaction
reference in the Agribank statement. A customer-provided screenshot or receipt
does not confirm payment. The database records the admin account, bank
reference, booking, and amount. Chat opens only after this confirmation.

The SQL editor migration `supabase/manual-payment.sql` installs the
administrator-only queue and confirmation functions. After running it, sign
in with the account promoted to `admin`; the manual-review interface appears
in the account page and Orders/Inbox page. Never give an admin login to a
customer.

Do not advertise automatic payment verification while this manual process is
in use. The optional SePay webhook requires a supported Agribank connection,
its own HMAC secret, and separate end-to-end testing before it can be enabled.

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

The deployment uses the configured Supabase project. Payment stays pending
until an administrator verifies the incoming bank transfer. AI chat requires
`OPENAI_API_KEY`; human-to-human chat requires a paid booking and works after
the admin confirms payment.
