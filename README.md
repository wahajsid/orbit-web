# orbit-web

Marketing site + early-access waitlist for **Orbit** (orbitgulf.com) — an AI
finance team for UAE/KSA SMEs. **Isolated** from the Orbit app repo and from
Oblique OS (separate repo, separate Vercel project); both share the single
OrbitFinance Supabase project.

Next.js 14 (App Router), no Tailwind. Design system: **"The Wire"** — ink &
paper, petrol & brass (see the design_handoff README for the full token spec).
Brass = action, petrol = data. No gradients, glows, pills or starfields.

## Layout
- `app/page.tsx` — the whole page: ink hero band (nav + Morning Brief bleed),
  paper stat band, ink terminal ("one invoice, start to finish"), ruled
  features grid with real product screenshots, connectors, pricing + the
  founding ledger (the waitlist form IS a ledger entry), founder note, footer.
- `app/wire.css` + `app/globals.css` — tokens and section styles.
- `app/api/early-access/route.ts` — waitlist endpoint: honeypot + submit-timing
  decoys, business-email-only guard, insert-only Supabase write (409 = already
  listed), Resend welcome email.
- `lib/launch.ts` — the July-20 launch gate (`?preview=post` / `?preview=pre`
  to preview either state) + the founding-seat counter (`NEXT_SEAT`, bump by hand).
- `lib/email-domains.ts` — personal/disposable domain lists, mirrored by hand
  from the app repo's `lib/email-domain.ts`.
- `public/shots/` — product screenshots (captured from the app's real
  components + pure-lib outputs; regenerate when the app UI changes).
- Motion budget (all reduced-motion safe): hero brief arrival, terminal
  type-on, the logo's 8s orbit. Lenis smooth scroll. Nothing else moves.

## Deploy
`vercel --prod --yes` from this directory (Vercel project **orbit** →
orbitgulf.com). Env vars already set in the project: `SUPABASE_URL`,
`SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO`.

## Security
- No keys client-side; the form posts to `/api/early-access`, keys live in
  Vercel env, server-side only.
- `early_access` is insert-only for anon (RLS); the app's `/admin` panel
  (service role, other repo) is where signups are reviewed and approved.
- Never put the service_role key here.
