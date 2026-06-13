-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  orbit-web — early-access waitlist (standalone Supabase project)   ║
-- ║  Paste into the NEW Supabase project → SQL Editor → Run.          ║
-- ║  Insert-only from the public site: anon may INSERT, nothing else. ║
-- ╚══════════════════════════════════════════════════════════════════╝

create table if not exists early_access (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  company text,
  created_at timestamptz default now()
);

-- Lock it down.
alter table early_access enable row level security;

-- Anon (the public site, using the anon key) may INSERT only.
-- No SELECT / UPDATE / DELETE policies exist for anon, so those are denied —
-- the waitlist can be added to but never read or modified from the browser.
drop policy if exists "anon insert only" on early_access;
create policy "anon insert only"
  on early_access for insert
  to anon
  with check (true);

-- (Read your signups from the Supabase dashboard / SQL editor, or later via
--  the service_role key on a trusted server — never from the public site.)

-- Dedupe: one row per email (case-insensitive). A repeat signup hits this
-- index → PostgREST returns 409 → the function reports "already on the list"
-- and skips the welcome email.
create unique index if not exists early_access_email_uniq on early_access (lower(email));
