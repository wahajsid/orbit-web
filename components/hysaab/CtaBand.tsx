/* ── The closing band ───────────────────────────────────────────────
   Closes every English inner page: the launch date, one line about the
   first conversation and the enquiry button. It replaced the founding
   cohort waitlist band (owner decision 2026-09-17): no seat counts, no
   waitlist. Callers may still pass their own kicker, title and body. */

import { LAUNCH_DATE_LONG } from "@/lib/launch";

export function CtaBand({ kicker, title, body }: { kicker?: string; title?: string; body?: string }) {
  return (
    <section className="hw-talk hw-chrome" aria-label="Talk to the Hysaab team">
      <div className="hw-wrap hw-talk-in">
        <div>
          <p className="hw-eyebrow">{kicker ?? `Launching ${LAUNCH_DATE_LONG}`}</p>
          <h2>{title ?? <>Let’s start<br />with your books.</>}</h2>
          <p className="hw-talk-p">{body ?? "Tell us what takes too long. We will show you where Hysaab fits, confirm the scope and fees upfront, and agree a clear fit before any commitment."}</p>
        </div>
        <div className="hw-talk-actions">
          <a href="/contact" className="hw-btn hw-btn--navy">Let’s talk <span aria-hidden="true">↗</span></a>
          <a href="/how-it-works" className="hw-link hw-link--ruled">See how it works <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
