-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  orbit-web: early_access v2, access requests (2026-09-30)          ║
-- ║  Hysaab is invite-only. Paste into the site's Supabase project     ║
-- ║  (the one supabase-setup.sql created) → SQL Editor → Run.          ║
-- ║  Safe to run more than once. Run supabase-setup.sql first if the   ║
-- ║  table does not exist yet.                                         ║
-- ╚══════════════════════════════════════════════════════════════════╝
--
-- What it does
--   1. Adds the request fields: accounting_system (if an older table lacks
--      it), role, country, monthly_volume, locale, source, status.
--   2. Adds ref_no, a number in arrival order (existing rows numbered by
--      created_at, from 1), and ref, its display form "HY-0127".
--   3. Adds request_access(p jsonb): the site calls it with the anon key.
--      It inserts the request and returns ONLY that new row's reference,
--      or { already: true } for an email that has already requested.
--      The table itself stays insert-only for anon (no SELECT policy).
--
-- Until this runs, /api/early-access still works: it falls back to the
-- plain insert, drops columns that do not exist, and puts every field in
-- the internal email to SIGNUP_CC. Confirmations then show no reference.

-- 1) Request fields ------------------------------------------------------
alter table early_access add column if not exists accounting_system text;
alter table early_access add column if not exists role            text;
alter table early_access add column if not exists country         text;
alter table early_access add column if not exists monthly_volume  text;
alter table early_access add column if not exists locale          text default 'en';
alter table early_access add column if not exists source          text;
alter table early_access add column if not exists status          text not null default 'requested';
-- status is yours to move by hand: requested → invited → active (or declined).

-- 2) Reference in arrival order ------------------------------------------
alter table early_access add column if not exists ref_no bigint;
create sequence if not exists early_access_ref_seq owned by early_access.ref_no;

-- Number the rows that exist, oldest first, continuing after any numbered row.
with numbered as (
  select id,
         (select coalesce(max(ref_no), 0) from early_access)
           + row_number() over (order by created_at nulls first, id) as n
  from early_access
  where ref_no is null
)
update early_access e set ref_no = numbered.n from numbered where e.id = numbered.id;

-- The next request gets max + 1.
select setval('early_access_ref_seq', coalesce((select max(ref_no) from early_access), 0) + 1, false);

alter table early_access alter column ref_no set default nextval('early_access_ref_seq');
-- A direct anon insert (the site's fallback) needs to draw from the sequence.
grant usage on sequence early_access_ref_seq to anon;
create unique index if not exists early_access_ref_no_uniq on early_access (ref_no);

-- "HY-0127": four digits minimum, never truncated past 9999.
alter table early_access add column if not exists ref text
  generated always as ('HY-' || lpad(ref_no::text, greatest(4, length(ref_no::text)), '0')) stored;

-- 3) request_access(p jsonb) ---------------------------------------------
-- SECURITY DEFINER so it can read back the reference of the row it just
-- wrote; it never returns anything about any other row. A repeat email
-- returns already = true and NO reference.
create or replace function public.request_access(p jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := left(btrim(coalesce(p->>'email', '')), 320);
  v_ref   text;
begin
  if v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'a valid email is required' using errcode = '22023';
  end if;

  insert into early_access (name, email, company, accounting_system, role, country, monthly_volume, locale, source)
  values (
    nullif(left(btrim(coalesce(p->>'name', '')), 200), ''),
    v_email,
    left(btrim(coalesce(p->>'company', '')), 200),
    nullif(left(p->>'accounting_system', 60), ''),
    nullif(left(p->>'role', 60), ''),
    nullif(left(p->>'country', 60), ''),
    nullif(left(p->>'monthly_volume', 60), ''),
    case when p->>'locale' = 'ar' then 'ar' else 'en' end,
    nullif(left(p->>'source', 40), '')
  )
  on conflict ((lower(email))) do nothing
  returning early_access.ref into v_ref;

  if v_ref is null then
    return jsonb_build_object('already', true);
  end if;
  return jsonb_build_object('already', false, 'ref', v_ref);
end;
$$;

revoke all on function public.request_access(jsonb) from public;
grant execute on function public.request_access(jsonb) to anon;

-- PostgREST caches the schema: make the new columns and function visible now.
notify pgrst, 'reload schema';

-- Reading requests (dashboard / SQL editor), oldest first:
--   select ref, created_at, name, email, company, role, accounting_system,
--          monthly_volume, country, locale, source, status
--   from early_access order by ref_no;
