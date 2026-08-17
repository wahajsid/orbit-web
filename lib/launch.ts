/* Launch gate — one constant, shared by every CTA and the founding ledger.
   Pre-launch the page sells founding seats via the capture forms; from
   14 October 2026 (Gulf time) every CTA points straight at the app's signup
   instead. ?preview=post / ?preview=pre override for testing either state. */

export const LAUNCH_AT = new Date("2026-10-14T00:00:00+04:00").getTime();
export const APP_SIGNUP = "https://app.orbitgulf.com/signup";

/* Display forms of the launch date, DERIVED from LAUNCH_AT so copy can never
   drift from the gate again (it did once: two emails said different dates).
   Formatted in Gulf time — the audience's calendar, and the gate's anchor. */
const launchDate = new Date(LAUNCH_AT);
export const LAUNCH_DATE_LONG = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dubai",
}).format(launchDate);                       // "14 October 2026"
export const LAUNCH_DATE_SHORT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "long", timeZone: "Asia/Dubai",
}).format(launchDate);                       // "14 October"

/* Arabic display forms — Latin digits (Gulf business convention), Arabic
   month names. Same LAUNCH_AT anchor, so the two languages can't drift. */
export const LAUNCH_DATE_LONG_AR = new Intl.DateTimeFormat("ar-AE-u-nu-latn", {
  day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dubai",
}).format(launchDate);                       // "14 أكتوبر 2026"
export const LAUNCH_DATE_SHORT_AR = new Intl.DateTimeFormat("ar-AE-u-nu-latn", {
  day: "numeric", month: "long", timeZone: "Asia/Dubai",
}).format(launchDate);                       // "14 أكتوبر"

export const FOUNDING_SEATS = 100;

/* The displayed seat number is a base offset + the LIVE waitlist row count
   (fetched server-side from the app's public seat-count endpoint). The offset
   accounts for seats reserved off-site (owner-set, 2026-08-16: raised so the
   counter opens in the mid-80s — scarcity is the point of a founding cohort). */
export const SEAT_BASE = 69;
export const SEAT_FALLBACK = 83;   // shown if the live count is unreachable

export async function getNextSeat(): Promise<number> {
  try {
    const r = await fetch("https://app.orbitgulf.com/api/public/seat-count", {
      next: { revalidate: 60 },
    });
    if (!r.ok) return SEAT_FALLBACK;
    const data = await r.json();
    const n = SEAT_BASE + Number(data.count ?? 0);
    return Number.isFinite(n) && n > 0 ? Math.min(n, FOUNDING_SEATS) : SEAT_FALLBACK;
  } catch {
    return SEAT_FALLBACK;
  }
}

export function isPostLaunch(search?: string): boolean {
  if (typeof window !== "undefined") {
    const p = new URLSearchParams(search ?? window.location.search).get("preview");
    if (p === "post") return true;
    if (p === "pre") return false;
  }
  return Date.now() >= LAUNCH_AT;
}
