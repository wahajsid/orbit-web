/* ── Book a demo ─────────────────────────────────────────────────────
   Owner decision 2026-09-23: every "Book a demo" button on the site,
   the header's main button included, opens the team's Calendly in a
   new tab. Spread DEMO onto the anchor; add the screen-reader note
   (DEMO_NEW_TAB) inside it so the new tab is announced. */

export const DEMO_URL = "https://www.calendly.com/obco";

export const DEMO = { href: DEMO_URL, target: "_blank", rel: "noopener" } as const;

export const DEMO_NEW_TAB = { en: " (opens in a new tab)", ar: " (يفتح في تبويب جديد)" } as const;
