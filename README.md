# PR & Strategic Communications agency website

Marketing and lead-generation site for a PR agency. Next.js 16 (App Router,
Cache Components), TypeScript, Tailwind CSS 4, Motion, Lucide, PostgreSQL.

## Run it

```bash
pnpm install
cp .env.example .env.local   # then fill in what you have
pnpm dev                     # http://localhost:3000
```

`pnpm build && pnpm start` for production, `pnpm lint` and `pnpm typecheck` to check.

## Before launch

Everything a visitor sees about the company is configured in one place and is
blank until you fill it in — the site never shows invented details.

| What | Where |
| --- | --- |
| Brand name, wordmark, legal name, email, phone, address, social links, jurisdiction | `src/config/site.ts` |
| Domain, booking link, database, admin password, secrets | environment variables — see `.env.example` |
| Service copy, FAQs, SEO titles | `src/content/services.ts` |
| Industries, approach, insight articles | `src/content/site-content.ts` |
| Enquiry form options (industries, budget ranges, contact methods) | `src/lib/lead-schema.ts` |
| Favicon / social image | `src/app/icon.svg`, `src/app/opengraph-image.tsx` |

Checklist:

1. Add verified contact details in `src/config/site.ts`.
2. Set `NEXT_PUBLIC_SITE_URL` — this switches on canonical URLs, the sitemap's real URLs and Organization structured data.
3. Set `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `IP_HASH_SECRET`.
4. Have the privacy policy and terms reviewed, then set `legal.reviewed: true` to remove the "draft" notice.
5. Replace the draft Insights entries with real articles. While every entry is a draft, `/insights` is `noindex` and left out of the sitemap, and cards are labelled as drafts.

## Enquiries (lead capture)

`POST /api/leads` → validated with the same Zod schema the form uses → stored
in the `leads` table (created automatically; see `db/schema.sql`).

- **No fake success.** Without `DATABASE_URL`, or if the insert fails, the API
  returns an error and the form says the enquiry was not sent.
- **Spam protection:** server-side validation, same-origin check, honeypot
  field, body-size cap, an in-memory burst limit (5 / 10 min per address) and a
  database-backed limit (5 stored enquiries / hour per address). Addresses are
  stored only as a keyed hash. On a host that does not set `x-forwarded-for`,
  put the app behind one that does, or all visitors share one bucket.
- **Notifications (optional):** set `LEAD_WEBHOOK_URL` to receive a JSON
  summary of each new enquiry (Slack, Zapier/Make, a CRM).

### Reviewing leads

`/admin` — sign in with `ADMIN_PASSWORD`. Filter by status, update status,
delete, export CSV. Sessions are signed, httpOnly, and last 8 hours. This is a
single shared password: adequate for a small team, but swap in a real identity
provider (everything goes through `isAdmin()` in `src/lib/admin-auth.ts`) if
you need per-user accounts.

### Consultation booking

Set `NEXT_PUBLIC_BOOKING_URL` (Calendly, Cal.com, …) and every "Book a
consultation" button links to it. Until then those buttons open the enquiry
form with "Video call" preselected. `NEXT_PUBLIC_*` values are read at build
time, so rebuild after changing them.

## Deploy on Vercel

No `vercel.json` is needed — Vercel detects Next.js and pnpm from the repo.

1. Import the GitHub repository at <https://vercel.com/new> and keep the
   default build settings.
2. Add the environment variables from `.env.example` under
   Project → Settings → Environment Variables: `DATABASE_URL`,
   `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `IP_HASH_SECRET`, and
   `NEXT_PUBLIC_SITE_URL` once the domain is known.
3. Use a hosted PostgreSQL with a pooled connection string (Neon, Supabase,
   Vercel Postgres) and keep `DATABASE_POOL_MAX` low — each serverless
   instance opens its own pool.
4. Redeploy after changing any `NEXT_PUBLIC_*` value; they are read at build
   time.

The site builds and serves without any variables set; the enquiry form and
`/admin` stay disabled until the database and admin variables are present.

## Structure

```
src/config/site.ts        brand, contact, legal — single source of truth
src/content/              all page copy as typed data
src/app/(site)/           public pages (shared header/footer)
src/app/admin/            lead review (login, list, CSV export)
src/app/api/leads/        enquiry endpoint
src/components/           ui/, layout/, sections/, forms/
src/lib/                  db, leads, validation schema, rate limit, auth, seo
src/proxy.ts              real 404s for unknown /services/* slugs
```

Note for contributors: this is Next.js 16 with Cache Components. Pages are
prerendered; anything that depends on the request (cookies, the database) must
sit behind `<Suspense>`. See `AGENTS.md`.
