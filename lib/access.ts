/* ── Request access (owner decision 2026-09-30) ──────────────────────
   Hysaab is invite-only. Every "sign up / get started" call to action on
   the site goes to /access (or /ar/access); "Book a demo" stays next to
   it. Tone "By invitation": exclusive but never flaunted. No waitlist
   wording, no counts, no queue positions, no scarcity numbers.

   One source for the form (components/hysaab/RequestAccessForm.tsx),
   the route (app/api/early-access/route.ts) and the emails. The value
   stored and emailed is always the English label; Arabic pages show the
   Arabic label. */

import { BANDS, BAND_MAX, fmt } from "./pricing";

export type Locale = "en" | "ar";

export const ACCESS_HREF: Record<Locale, string> = { en: "/access", ar: "/ar/access" };

/** The key line. Used under every Request access button that has room for it. */
export const KEY_LINE: Record<Locale, string> = {
  en: "Hysaab is opening by invitation. Requests are admitted in the order they arrive.",
  /* AR-REVIEW: the key line. */
  ar: "يفتح Hysaab أبوابه بالدعوة، ونقبل الطلبات بحسب ترتيب وصولها.",
};

/* The key line in two halves, for the /access hero: the heading carries
   the first sentence, the lede the second. */
export const KEY_TAIL: Record<Locale, string> = {
  en: "Requests are admitted in the order they arrive.",
  /* AR-REVIEW */
  ar: "ونقبل الطلبات بحسب ترتيب وصولها.",
};

export const ACCESS_LABEL: Record<Locale, string> = {
  en: "Request access",
  /* AR-REVIEW: "اطلب الانضمام" (Request access). */
  ar: "اطلب الانضمام",
};

type Opt = readonly [en: string, ar: string];

export const SYSTEM_OPTS: readonly Opt[] = [
  ["Zoho Books", "Zoho Books"],
  ["QuickBooks", "QuickBooks"],
  ["Xero", "Xero"],
  ["Odoo", "Odoo"],
  ["Tally", "Tally"],
  ["Spreadsheets", "جداول بيانات"],
  ["Other", "نظام آخر"],
];

/* The self-serve bands from lib/pricing.ts, then "More than 1,000". */
export const VOLUME_OPTS: readonly Opt[] = [
  ...BANDS.map((b) => [`Up to ${fmt(b.upTo)}`, `حتى ${fmt(b.upTo)}`] as const),
  [`More than ${fmt(BAND_MAX)}`, `أكثر من ${fmt(BAND_MAX)}`],
];

/* AR-REVIEW: country and role labels. */
export const COUNTRY_OPTS: readonly Opt[] = [
  ["UAE", "الإمارات"],
  ["KSA", "السعودية"],
  ["Other GCC", "دولة خليجية أخرى"],
  ["Other", "دولة أخرى"],
];

export const ROLE_OPTS: readonly Opt[] = [
  ["Business owner", "صاحب عمل"],
  ["Finance lead / CFO", "مسؤول مالي / مدير مالي"],
  ["Accountant", "محاسب"],
  ["Firm partner", "شريك في مكتب مهني"],
  ["Other", "دور آخر"],
];

const set = (o: readonly Opt[]) => new Set(o.map(([en]) => en));
export const SYSTEMS = set(SYSTEM_OPTS);
export const VOLUMES = set(VOLUME_OPTS);
export const COUNTRIES = set(COUNTRY_OPTS);
export const ROLES = set(ROLE_OPTS);

/** Row order → "HY-0127". Four digits minimum, never truncated. */
export function formatRef(n: number): string {
  return `HY-${String(Math.trunc(n)).padStart(4, "0")}`;
}

export const REF_RE = /^HY-\d{4,}$/;
