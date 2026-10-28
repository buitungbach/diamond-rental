# Diamond Rental backend setup

The HTML page stays at its current URL. Keep `supabase-config.js` and
`supabase-app.js` next to `Diamond Rental.html` when updating the existing
hosting location.

## Supabase

1. Create a Supabase project and run `supabase/schema.sql` in its SQL Editor.
   For an existing installation, run `supabase/pricing-vnd.sql` after applying
   the original schema to update server-side booking prices. For manual
   Agribank transfers, also run `supabase/manual-payment.sql`.
2. Put the project URL and **anon/public** key in `supabase-config.js`.
   Never put the service-role key in that file or in the HTML.
3. In **Authentication → URL Configuration**, set **Site URL** to
   `https://buitungbach.github.io/diamond-rental/` and add that exact URL
   under **Redirect URLs**. Do not leave `http://localhost:3000` as the Site
   URL for production. The website explicitly sends signup and resend links
   back to its stable GitHub Pages URL. New accounts must be at least 18 years
   old.
4. To enable AI chat, create an API key in the OpenAI API dashboard and add
   it as `OPENAI_API_KEY` under Supabase **Edge Function Secrets**. ChatGPT
   subscriptions do not include API credits; OpenAI API usage is billed
   separately. Set a usage budget in the OpenAI dashboard. Never put this key
   in the website, repository, SQL, or a chat message. Payment confirmation
   for Agribank transfers is manual and does not require a payment-provider
   API key.

   ```text
   supabase secrets set OPENAI_API_KEY=...
   ```

   Supabase provides `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` to Edge Functions. Do not copy the service-role
   key into the website.
5. Link the Supabase CLI to this project and deploy `ai-chat-reply` if using
   AI profiles. After setting `OPENAI_API_KEY`, run
   `supabase/anime-ai-catalog.sql` in the SQL Editor. The seeded profiles stay
   inactive until you verify the secret is configured and run:

   ```sql
   update public.renter_profiles
   set is_active = true
   where catalog_key in ('chizuru', 'ruka', 'sumi', 'mini', 'mami')
     and persona_mode = 'ai';
   ```

   The existing `sepay-webhook` function is an optional,
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

All tier prices are VND for a two-hour session: Platinum 20,000, Gold 15,000,
Silver 10,000, and Special 7,000. Longer sessions and multiple sessions scale
from that base. Service add-ons are percentages of the same base: movie 5%,
walk 10%, dinner 15%, photo 20%, and family/friends 40%. The checkout creates
the booking first and then displays its amount- and booking-specific QR. This
is a manual bank transfer, not an automatic card charge; the order stays
pending until an administrator verifies the incoming transfer. Pending orders
created before applying `pricing-vnd.sql` keep their old amount: do not pay
those orders; create a fresh booking after the migration.

Only active renter profiles stored in Supabase accept bookings. The five
built-in anime profiles can be enabled using `supabase/anime-ai-catalog.sql`
and the activation SQL above after the AI key is configured. Those profiles
accept online AI chat bookings only; the database prevents assigning them an
in-person meeting service. Human renter profiles remain available through
their own accounts and continue using the existing meeting-service flow.

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

## Adding AI characters and chat automatically

1. In the OpenAI API dashboard, create an API key for a project with API
   billing enabled. ChatGPT Plus/Pro is separate from API billing.
2. In the Supabase dashboard, open the Diamond Rental project, then **Edge
   Functions → Secrets → Add new secret**. Set the name to exactly
   `OPENAI_API_KEY` and paste the key as its value. Do not include quotes or
   whitespace. Save it as a secret; do not send the key to anyone.
3. If `ai-chat-reply` has not already been deployed, from PowerShell in the
   project folder run:

   ```powershell
   npx.cmd supabase functions deploy ai-chat-reply --project-ref tsojexeevcsizazservy
   ```

   Adding or rotating a secret does not require editing the website or
   redeploying its Pages URL.
4. Sign in to the website with the admin account, open **Account → Add profile
   (+)**, enter the character name, tier, tags, short bio, and personality
   instructions, then save. The create operation stores the public profile and
   its private AI prompt together in Supabase. The existing chat Edge Function
   loads the correct prompt by the booked character's profile ID, so every
   character added this way is automatically connected to chat; no per-character
   code, SQL, or Edge Function is needed.
5. To chat, a customer books that character's online AI chat experience and
   pays by Agribank transfer. An administrator must verify the funds before
   chat is unlocked. Each character must be clearly labeled as fictional and
   cannot offer in-person meetings.

The five built-in anime characters are seeded by `supabase/anime-ai-catalog.sql`
and remain inactive until the OpenAI secret is configured. To activate those
five after setting the key, run the activation SQL from step 5 in the
Supabase SQL Editor. New characters created from the admin account are
connected automatically by the site.

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
