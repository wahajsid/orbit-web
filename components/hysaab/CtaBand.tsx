/* ── The closing band ───────────────────────────────────────────────
   Closes every inner page, in either language. It replaced the founding
   cohort band (owner decision 2026-09-17): no seat counts. Callers may
   pass their own kicker, title, body.
   Owner 2026-09-30 (invite-only): "Request access" is the main button
   (/access), "Book a demo" (the team's Calendly, new tab, lib/demo.ts)
   sits beside it, and the key line runs under both. */

import { KineticTitle } from "../motion/Kinetic";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { ACCESS_HREF, ACCESS_LABEL, KEY_LINE } from "@/lib/access";

export function CtaBand({ kicker, title, body, locale = "en" }: { kicker?: string; title?: React.ReactNode; body?: string; locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  /* AR-REVIEW: the Arabic button label "احجز عرضًا تجريبيًا" (Book a demo). */
  const t = ar
    ? { label: "تحدث إلى فريق Hysaab", kicker: "تحدث إلينا", title: <>لنبدأ<br />بدفاترك.</>, body: "أخبرنا بما يستغرق وقتًا أطول مما ينبغي. سنريك أين يناسبك Hysaab، ونؤكد النطاق والأتعاب مسبقًا، ونتفق على الملاءمة قبل أي التزام.", demo: "احجز عرضًا تجريبيًا", arrow: "←" }
    : { label: "Talk to the Hysaab team", kicker: "Let’s talk", title: <>Let’s start<br />with your books.</>, body: "Tell us what takes too long. We will show you where Hysaab fits, confirm the scope and fees upfront, and agree a clear fit before any commitment.", demo: "Book a demo", arrow: "→" };
  return (
    <section className="hw-talk hw-chrome" aria-label={t.label} data-kin-on-view="">
      <div className="hw-wrap hw-talk-in">
        <div>
          <p className="hw-eyebrow">{kicker ?? t.kicker}</p>
          <h2><KineticTitle title={title ?? t.title} maxMark={0} /></h2>
          <p className="hw-talk-p">{body ?? t.body}</p>
        </div>
        <div className="hw-talk-actions">
          <a href={ACCESS_HREF[locale]} className="hw-btn hw-btn--navy m-cta m-cta--on-blush m-magnetic">{ACCESS_LABEL[locale]} <span aria-hidden="true">{t.arrow}</span></a>
          <a {...DEMO} className="hw-link hw-link--ruled">{t.demo} <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB[locale]}</span></a>
          <p className="hw-talk-key">{KEY_LINE[locale]}</p>
        </div>
      </div>
    </section>
  );
}
