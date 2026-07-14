/* Launch gate — one constant, shared by every CTA and the founding ledger.
   Pre-launch the page sells founding seats via the capture forms; from 20 July
   2026 (Gulf time) every CTA points straight at the app's signup instead.
   ?preview=post / ?preview=pre override for testing either state. */

export const LAUNCH_AT = new Date("2026-07-20T00:00:00+04:00").getTime();
export const APP_SIGNUP = "https://app.orbitgulf.com/signup";

export const FOUNDING_SEATS = 100;

/* The displayed seat number is a base offset + the LIVE waitlist row count
   (fetched server-side from the app's public seat-count endpoint). The offset
   accounts for seats reserved before the public counter existed. */
export const SEAT_BASE = 15;   // -1 compensates for the 2026-07-04 E2E test row
export const SEAT_FALLBACK = 27;   // shown if the live count is unreachable

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
