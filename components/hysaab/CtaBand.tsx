/* ── The waitlist band ──────────────────────────────────────────────
   A navy call-to-action that closes every inner page: founding cohort,
   seat count, the waitlist button and the demo link. Server component;
   seats come from the same source as the homepage so the numbers agree. */

import { getSeatsTaken, FOUNDING_SEATS, LAUNCH_DATE_SHORT } from "@/lib/launch";

export async function CtaBand({ kicker = "Founding cohort", title, body }: { kicker?: string; title?: string; body?: string }) {
  const taken = await getSeatsTaken();
  return (
    <section className="hy-cta-band" aria-label="Join the waitlist">
      <div className="hy-wrap hy-cta-band-inner">
        <div className="hy-cta-band-copy">
          <span className="hy-kicker hy-kicker--blush">{kicker}</span>
          <h2 className="hy-cta-band-h">{title ?? "Close the month in days. Take your evenings back."}</h2>
          <p className="hy-cta-band-p">{body ?? `${taken} of ${FOUNDING_SEATS} founding seats are taken. Doors open ${LAUNCH_DATE_SHORT}, with founder pricing locked in for as long as you stay. Work email only; a real person reads every entry.`}</p>
        </div>
        <div className="hy-cta-band-actions">
          <a href="/#cohort" className="hy-btn hy-btn--blush hy-btn--lg">Join the waitlist →</a>
          <a href="/#contact" className="hy-btn hy-btn--outline-cream hy-btn--lg">Book a demo</a>
        </div>
      </div>
    </section>
  );
}
