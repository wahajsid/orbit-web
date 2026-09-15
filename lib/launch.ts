/* Launch gate — one constant, shared by every CTA, the founding ledger and
   the sticky countdown bar. Pre-launch the page sells founding seats via the
   capture forms; from the launch instant every CTA points straight at the
   app's signup instead. ?preview=post / ?preview=pre override for testing.

   The instant comes from NEXT_PUBLIC_LAUNCH_AT (ISO 8601 with offset) so it
   can be moved on Vercel without a deploy; the default is the design's
   28 October 2026, 09:00 Gulf time. */

const RAW = process.env.NEXT_PUBLIC_LAUNCH_AT || "2026-10-28T09:00:00+04:00";
const parsed = new Date(RAW).getTime();
export const LAUNCH_AT = Number.isFinite(parsed) ? parsed : new Date("2026-10-28T09:00:00+04:00").getTime();
export const APP_SIGNUP = "https://app.hysaab.ai/signup";

/* Display forms of the launch date, DERIVED from LAUNCH_AT so copy can never
   drift from the gate again (it did once: two emails said different dates).
   Formatted in Gulf time — the audience's calendar, and the gate's anchor. */
const launchDate = new Date(LAUNCH_AT);
export const LAUNCH_DATE_LONG = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dubai",
}).format(launchDate);                       // "28 October 2026"
export const LAUNCH_DATE_SHORT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "long", timeZone: "Asia/Dubai",
}).format(launchDate);                       // "28 October"
export const LAUNCH_DATE_BAR = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", timeZone: "Asia/Dubai",
}).format(launchDate);                       // "28 Oct"

/* Arabic display forms — Latin digits (Gulf business convention), Arabic
   month names. Same LAUNCH_AT anchor, so the two languages can't drift. */
export const LAUNCH_DATE_LONG_AR = new Intl.DateTimeFormat("ar-AE-u-nu-latn", {
  day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dubai",
}).format(launchDate);
export const LAUNCH_DATE_SHORT_AR = new Intl.DateTimeFormat("ar-AE-u-nu-latn", {
  day: "numeric", month: "long", timeZone: "Asia/Dubai",
}).format(launchDate);

export const FOUNDING_SEATS = 100;

/* Seats shown as taken = a base offset + the LIVE waitlist row count (read
   server-side from the site's own early_access table). The offset accounts
   for seats reserved off-site; the owner set it to 76 (2026-09-15) so the
   ledger opens at "76 of 100" and climbs only with real signups. */
export const SEAT_BASE = 76;
export const SEAT_FALLBACK = 76;   // shown if the live count is unreachable

export async function getSeatsTaken(): Promise<number> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return SEAT_FALLBACK;
  try {
    const r = await fetch(`${url}/rest/v1/early_access?select=id`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Prefer: "count=exact", Range: "0-0" },
      next: { revalidate: 60 },
    });
    if (!r.ok && r.status !== 206) return SEAT_FALLBACK;
    const range = r.headers.get("content-range") ?? "";          // "0-0/123"
    const total = Number(range.split("/")[1]);
    const n = SEAT_BASE + (Number.isFinite(total) ? total : 0);
    return Math.min(n, FOUNDING_SEATS - 1);
  } catch {
    return SEAT_FALLBACK;
  }
}

/* Legacy name used by the inner pages: the NEXT seat number (taken + 1). */
export async function getNextSeat(): Promise<number> {
  return (await getSeatsTaken()) + 1;
}

export function isPostLaunch(search?: string): boolean {
  if (typeof window !== "undefined") {
    const p = new URLSearchParams(search ?? window.location.search).get("preview");
    if (p === "post") return true;
    if (p === "pre") return false;
  }
  return Date.now() >= LAUNCH_AT;
}
