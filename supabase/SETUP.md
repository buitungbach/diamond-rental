# Diamond Rental backend setup

The HTML page stays at its current URL. Keep `supabase-config.js` and
`supabase-app.js` next to `Diamond Rental.html` when updating the existing
hosting location.

## Supabase

1. Create a Supabase project and run `supabase/schema.sql` in its SQL Editor.
   For an existing installation, run `supabase/pricing-vnd.sql` after applying
   the original schema to update server-side booking prices. Run
   `supabase/admin-direct-chat.sql` before `supabase/feature-upgrades.sql`;
   the feature migration adds weekly renter availability, server-side
   double-booking protection, completion confirmation, verified reviews,
   chat block/report tools, and read receipts. Run
   `supabase/chat-backgrounds.sql` so a renter can set a shared chat
   background. For manual Agribank transfers, also run
   `supabase/manual-payment.sql`. To enable rescheduling/cancellation,
   social posts and gallery moderation, account privacy export/deletion,
   notifications, per-user AI chat rate limits (10 requests/minute and 60/hour),
   and the admin dashboard, run
   `supabase/product-expansion.sql` after those migrations.
   To enable customer choice between an Agribank QR transfer and cash at an
   in-person meeting, run `supabase/payment-methods.sql` after
   `supabase/product-expansion.sql`. Cash orders stay pending and chat remains
   locked until an administrator confirms receipt of the cash. AI character
   bookings are online-only and use QR.
   To let customers report human renter profiles and let administrators review
   those reports, run `supabase/profile-reports.sql` after
   `supabase/product-expansion.sql`.
   To enable browser push notifications for booking updates and new messages,
   run `supabase/web-push.sql` after `supabase/product-expansion.sql`. Then
   configure and deploy the `dispatch-web-push` Edge Function as described in
   **Web push notifications** below, then run
   `supabase/web-push-schedule.sql` and `supabase/web-push-immediate.sql`.
   To show the sender's name in new-message push notifications, apply
   `supabase/web-push-sender-name.sql` after those Web Push SQL files and
   redeploy `dispatch-web-push`.
   To let administrators add and remove published photos in AI character
   profiles, run `supabase/ai-character-gallery.sql` after
   `supabase/product-expansion.sql`. To let human renters add and remove
   immediately published photos on their own profiles, run
   `supabase/renter-self-managed-gallery.sql` after
   `supabase/ai-character-gallery.sql`.

   For an existing project, run migrations in this order: `schema.sql` (only
   if the base schema has not been installed), `pricing-vnd.sql`,
   `admin-direct-chat.sql`, `manual-payment.sql`, `feature-upgrades.sql`,
   `chat-backgrounds.sql`, then `product-expansion.sql`, then
   `payment-methods.sql`, `profile-reports.sql`, and `web-push.sql`. The feature migration
   assumes the admin chat tables already exist. Do not advertise these
   features as enabled until the SQL Editor reports that each migration
   succeeded. Run `ai-character-gallery.sql` after `product-expansion.sql`
   to enable administrator-managed AI character photo galleries, then run
   `renter-self-managed-gallery.sql` to enable self-managed human renter
   profile galleries.
2. Put the project URL and **anon/public** key in `supabase-config.js`.
   Never put the service-role key in that file or in the HTML.
3. In **Authentication → URL Configuration**, set **Site URL** to
   `https://buitungbach.github.io/diamond-rental/` and add that exact URL
   under **Redirect URLs**. Do not leave `http://localhost:3000` as the Site
   URL for production. The website explicitly sends signup and resend links
   back to its stable GitHub Pages URL. New accounts must be at least 18 years
   old.
4. To enable AI chat with Cloudflare Workers AI, create a Cloudflare account,
   get the Account ID, and create a Workers AI API token. Save them as
   `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` under Supabase
   **Edge Function Secrets**. Workers AI currently includes a free daily
   allocation of 10,000 Neurons; usage above that requires a paid Workers
   plan. Model usage and availability may vary. Never put the token in the
   website, repository, SQL, or a chat message. Payment confirmation for
   Agribank transfers is manual and does not require a payment-provider API
   key.

   ```text
   supabase secrets set CLOUDFLARE_ACCOUNT_ID=...
   supabase secrets set CLOUDFLARE_API_TOKEN=...
   ```

   Supabase provides `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` to Edge Functions. Do not copy the service-role
   key into the website.
5. Link the Supabase CLI to this project and deploy `ai-chat-reply` if using
   AI profiles or admin chats with AI profiles:

   ```text
   supabase functions deploy ai-chat-reply
   ```

   After setting the Cloudflare secrets, run
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
   key in the site. After running `admin-direct-chat.sql`, the admin can open
   **Tài khoản → Chat quản trị không cần thanh toán** and start a chat with any
   active AI or human renter profile. Human renters receive the thread in
   **Tài khoản → Tin nhắn từ quản trị viên**.
   The chat background is blurred behind messages. The owner of a human renter
   profile can change it from a chat; the image is shared with everyone
   chatting with that profile and stored in the public renter-photos bucket.

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
reference, booking, and amount. Chat opens only after this confirmation. The
site's downloadable or printable receipt is not a VAT invoice.

## Web push notifications

Web push sends booking-created/paid/changed and new-message alerts to devices
that explicitly enable notifications while signed in. Notifications contain
only a short event description and booking code; chat text is never included.
Push is sent by the `dispatch-web-push` Edge Function using VAPID, not by the
open browser tab. It requires the `web-push.sql` database migration, the
scheduled dispatcher, and the VAPID secrets below.

1. Generate one VAPID key pair locally:

   ```powershell
   npx.cmd web-push generate-vapid-keys --json
   ```

   Keep the private key secret. Set `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`,
   `VAPID_SUBJECT` (for example `mailto:admin@example.com`), and a randomly
   generated `WEB_PUSH_SCHEDULER_SECRET` in Supabase Edge Function Secrets.
   Use the same scheduler secret in the Vault setup in step 3. For example:

   ```powershell
   npx.cmd supabase secrets set VAPID_PUBLIC_KEY="..." VAPID_PRIVATE_KEY="..." VAPID_SUBJECT="mailto:admin@example.com" WEB_PUSH_SCHEDULER_SECRET="..." --project-ref tsojexeevcsizazservy
   ```

   Do not commit the private key or scheduler secret.

2. Put only the generated public key in `supabase-config.js` as
   `vapidPublicKey`, then deploy the dispatcher:

   ```powershell
   npx.cmd supabase functions deploy dispatch-web-push --project-ref tsojexeevcsizazservy
   ```

3. Enable `pg_cron`, `pg_net`, and Vault in Supabase **Database → Extensions**.
   In `supabase/web-push-schedule.sql`, replace
   `REPLACE_WITH_WEB_PUSH_SCHEDULER_SECRET` with the same scheduler secret
   from step 1, then run the SQL in the Supabase SQL Editor. Run
   `supabase/web-push-immediate.sql` in the SQL Editor as well. This trigger
   asks `pg_net` to invoke the dispatcher as soon as a notification is queued;
   the once-per-minute cron remains as a retry/fallback.

4. Publish the site files. Customers and renters can then sign in, open
   **Account**, and select **Enable notifications on this device**. On iPhone
   or iPad, first add the site to the Home Screen and open it from there;
   notifications require iOS/iPadOS 16.4 or later. Each device must grant
   permission separately. Turning notifications off removes that device's
   subscription; deleting an account removes all its subscriptions.
   Push is sent promptly after an event is queued, but mobile operating systems
   and browser push services can still delay delivery while a device is offline,
   in battery-saver mode, or has restricted background activity.

## Add VELORA to a phone's Home Screen

The site publishes a web app manifest and uses the VELORA logo for its app
icon. Android users can use the in-page **Add VELORA to Home Screen** button
to open the browser's install prompt, or use Chrome's menu if no prompt appears.
On iPhone/iPad, open the site in Safari, tap **Share → Add to Home Screen →
Add**. The button displays the matching instructions, and is hidden when the
site is already installed.

After `feature-upgrades.sql` is applied, renter accounts can configure weekly
availability in **Account**; customers see available time slots during
checkout, and the database checks for conflicts again when creating a booking.
Pending bookings expire for availability purposes after 15 minutes. After the
last session ends, both participants confirm completion for human bookings;
the customer confirms AI bookings. Only then can that customer submit one
verified review. Participants can block or report a chat; administrators can
review and resolve reports from **Account**. In-app notifications remain in
the account history; device push alerts require opting in on each device and
the Web Push setup above.

The SQL editor migration `supabase/admin-direct-chat.sql` installs a separate,
admin-only direct chat with active AI and human renter profiles. It does not
create a booking or change a booking's payment status. Human renters receive
these messages in the account inbox and can reply there. AI replies use the
deployed `ai-chat-reply` Edge Function and require the Cloudflare Workers AI
secrets.

The SQL editor migration `supabase/manual-payment.sql` installs the
administrator-only queue and confirmation functions. After running it, sign
in with the account promoted to `admin`; the manual-review interface appears
in the account page and Orders/Inbox page. Never give an admin login to a
customer.

Do not advertise automatic payment verification while this manual process is
in use. The optional SePay webhook requires a supported Agribank connection,
its own HMAC secret, and separate end-to-end testing before it can be enabled.

## Adding AI characters and chat automatically

1. In the Cloudflare dashboard, open **Workers AI → Use REST API** and create
   a Workers AI API token. Copy the account ID shown there. The token needs
   Workers AI access; do not send it to anyone. The default model is
   `@cf/meta/llama-3.2-3b-instruct`. If you previously set the optional
   `CLOUDFLARE_AI_MODEL` secret to another value, remove that override or set
   it to a model currently available in Cloudflare's model catalog.
2. In the Supabase dashboard, open the Diamond Rental project, then **Edge
   Functions → Secrets → Add new secret**. Add `CLOUDFLARE_ACCOUNT_ID` with
   the account ID and `CLOUDFLARE_API_TOKEN` with the token. Do not include
   quotes or whitespace; never put the token in the website or repository.
   The free plan currently includes 10,000 Neurons per day; check Cloudflare
   Workers AI usage and model pricing for current limits.
3. Deploy the updated `ai-chat-reply` from PowerShell in the project folder:

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
and remain inactive until the Cloudflare secrets are configured. To activate those
five after setting the key, run the activation SQL from step 5 in the
Supabase SQL Editor. New characters created from the admin account are
connected automatically by the site.

## Social feed and renter gallery

Renters can upload photos and videos they own or are authorized to use.
Submitted posts are held for administrator approval before appearing in the
feed. The site does not scrape Google Images or automatically publish images
from Pinterest or another external source. The expansion migration removes
the unused AI image-post scheduler and its database functions.

The social-media bucket is private. The website creates short-lived viewing
URLs for published content and for the owning renter or administrators during
review.

The account privacy and AI-chat updates use these Edge Functions:

   ```powershell
   npx.cmd supabase functions deploy ai-chat-reply --project-ref tsojexeevcsizazservy
   npx.cmd supabase functions deploy account-privacy --project-ref tsojexeevcsizazservy
   ```

To enable optional email delivery, configure `RESEND_API_KEY` and
`RESEND_FROM_EMAIL` in Supabase Edge Function Secrets; the sender address must
be verified with Resend. Deploy `dispatch-email-notifications`, then enable
`pg_cron`, `pg_net`, and Vault if they are not already enabled. Set
`NOTIFICATION_SCHEDULER_SECRET` in Edge Function Secrets and Vault, replace
the matching placeholder in `supabase/product-expansion-schedule.sql`, and
run that SQL in the SQL Editor. Do not commit the edited SQL or share the
secret. In-app notifications work without email.

Because `product-expansion.sql` has already been applied, run its updated
version once more to remove the obsolete AI image-post scheduler from the
database. This does not delete existing renter posts, gallery items, or
uploaded media.

## GitHub Pages preview

The repository's `.github/workflows/pages.yml` publishes the page and its
adjacent assets to GitHub Pages after a push to `main`. It publishes
`Diamond Rental.html` both as the site's `index.html` and under its original
filename. GitHub Pages uses a public repository, so the source is publicly
visible. The former `file:///...` address only works on one computer and
cannot be used as a public website URL.

The deployment uses the configured Supabase project. Payment stays pending
until an administrator verifies the incoming bank transfer. AI chat requires
`CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`; human-to-human chat
requires a paid booking and works after the admin confirms payment.
