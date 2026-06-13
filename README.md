# orbit-web

Marketing landing page + early-access waitlist for **Orbit** (orbitgulf.com).
Standalone, static site — no framework, no build step. **Isolated** from the
Orbit app and from Oblique OS (separate repo, separate Supabase project,
separate Vercel project).

- `index.html` — the entire site (dark theme, inline CSS/JS) incl. the launch countdown. Source of truth; do not redesign.
- `api/early-access.js` — Vercel serverless function: stores the lead in Supabase **and** sends the welcome email (Resend), server-side.
- `email/welcome.html` — the welcome email (reference copy; the function inlines it).
- `supabase-setup.sql` — creates the insert-only `early_access` table.

## Deploy
1. Run `supabase-setup.sql` in the Supabase project (insert-only `early_access`).
2. New Vercel project → connect this repo → deploy (static + the `/api` function; no build command, output = repo root).
3. **Set Vercel env vars** (Project → Settings → Environment Variables):
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY` — the waitlist project.
   - `RESEND_API_KEY`, `EMAIL_FROM` (`Orbit <notifications@app.orbitgulf.com>`), `EMAIL_REPLY_TO` (`info@orbitgulf.com`).
   - Redeploy after adding them.
4. Domain: point `orbitgulf.com` + `www` at Vercel. (`app.orbitgulf.com` is reserved for the app, later.)

## Security
- **No keys in `index.html`** — the form posts to `/api/early-access`; all keys live in Vercel env, server-side.
- `early_access` is insert-only for anon (RLS); read signups from the Supabase dashboard.
- Never put the service_role key here — the function uses the anon key for the insert.
