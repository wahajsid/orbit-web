/* ── Self-serve volume bands (owner, 2026-09-30) ─────────────────────
   Indicative, USD a month. One source for /pricing (en + ar), the FAQ,
   llms.txt and the Offer structured data. A transaction is each supplier
   bill, each sales invoice and each bank statement line Hysaab processes
   in the month. Over the band in a month: Hysaab keeps working and the
   next band applies from the following month. Above the last band the
   work is the managed service, scoped. */

export type Band = { upTo: number; usd: number };

export const BANDS: Band[] = [
  { upTo: 100, usd: 199 },
  { upTo: 250, usd: 399 },
  { upTo: 500, usd: 649 },
  { upTo: 1000, usd: 999 },
];

/** The highest band's ceiling; above it the work is managed and scoped. */
export const BAND_MAX = BANDS[BANDS.length - 1].upTo;

/** 1000 → "1,000" (Western digits in both languages). */
export const fmt = (n: number) => n.toLocaleString("en-US");

/** "up to 100 transactions USD 199, up to 250 USD 399, …" for plain-text surfaces. */
export const BANDS_TEXT = BANDS.map((b, i) => `up to ${fmt(b.upTo)}${i === 0 ? " transactions" : ""} USD ${b.usd}`).join(", ");
