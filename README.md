# orbit-web

Marketing landing page + early-access waitlist for **Orbit** (orbitgulf.com).
Standalone, static site — no framework, no build step. **Isolated** from the
Orbit app and from Oblique OS (separate repo, separate Supabase project,
separate Vercel project).

- `index.html` — the entire site (dark theme, inline CSS/JS). Source of truth; do not redesign.
- `supabase-setup.sql` — creates the insert-only `early_access` table in a **new** Supabase project.

## Deploy
1. Create a new Supabase project → run `supabase-setup.sql` → copy Project URL + anon key.
2. Paste them into the `SUPABASE_URL` / `SUPABASE_ANON_KEY` constants in `index.html` (`<script>` block near the bottom).
3. New Vercel project → connect this repo → deploy (static; output = repo root).
4. Domain: point `orbitgulf.com` + `www` at Vercel. (`app.orbitgulf.com` is reserved for the app, later.)

## Security
- Only the **anon** key goes in `index.html`. Never the service_role key.
- The waitlist table is insert-only for anon (RLS); read signups from the Supabase dashboard.
