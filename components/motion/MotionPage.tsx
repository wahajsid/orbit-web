/* ── Page-level motion opt-in (brand/MOTION.md) ──────────────────────
   Drop <MotionPage /> anywhere inside a PageShell page. Its PageHero
   then enters with the calm stagger (pure CSS, via :has) and the shared
   kit (headings, cards, rows, forms, the closing band) reveals on
   scroll. Pages without it are untouched, so the site adopts motion one
   page at a time. Renders an empty, hidden marker and nothing else. */

export function MotionPage() {
  return <span data-motion-page="" hidden />;
}
