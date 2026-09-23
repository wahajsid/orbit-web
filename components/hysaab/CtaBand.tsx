/* ── The closing band ───────────────────────────────────────────────
   Closes every inner page, in either language: the launch date, one
   line about the first conversation and the enquiry button. It replaced
   the founding cohort waitlist band (owner decision 2026-09-17): no seat
   counts, no waitlist. Callers may pass their own kicker, title, body.
   Owner 2026-09-23: the button is "Book a demo" and opens the team's
   Calendly in a new tab (lib/demo.ts). */


import { KineticTitle } from "../motion/Kinetic";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

export function CtaBand({ kicker, title, body, locale = "en" }: { kicker?: string; title?: React.ReactNode; body?: string; locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  /* AR-REVIEW: the Arabic button label "احجز عرضًا تجريبيًا" (Book a demo). */
  const t = ar
    ? { label: "تحدث إلى فريق Hysaab", kicker: "تحدث إلينا", title: <>لنبدأ<br />بدفاترك.</>, body: "أخبرنا بما يستغرق وقتًا أطول مما ينبغي. سنريك أين يناسبك Hysaab، ونؤكد النطاق والأتعاب مسبقًا، ونتفق على الملاءمة قبل أي التزام.", talk: "احجز عرضًا تجريبيًا", how: "شاهد كيف يعمل", howHref: "/ar/how-it-works" }
    : { label: "Talk to the Hysaab team", kicker: "Let’s talk", title: <>Let’s start<br />with your books.</>, body: "Tell us what takes too long. We will show you where Hysaab fits, confirm the scope and fees upfront, and agree a clear fit before any commitment.", talk: "Book a demo", how: "See how it works", howHref: "/how-it-works" };
  return (
    <section className="hw-talk hw-chrome" aria-label={t.label} data-kin-on-view="">
      <div className="hw-wrap hw-talk-in">
        <div>
          <p className="hw-eyebrow">{kicker ?? t.kicker}</p>
          <h2><KineticTitle title={title ?? t.title} maxMark={0} /></h2>
          <p className="hw-talk-p">{body ?? t.body}</p>
        </div>
        <div className="hw-talk-actions">
          <a {...DEMO} className="hw-btn hw-btn--navy m-cta m-cta--on-blush m-magnetic">{t.talk} <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB[locale]}</span></a>
          <a href={t.howHref} className="hw-link hw-link--ruled">{t.how} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
