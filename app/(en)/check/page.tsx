/* ── /check ──────────────────────────────────────────────────────────
   The Books Check landing page (2026-09-24, owner's copy): one question,
   one button, three facts. The button opens the app's magic-link flow at
   app.hysaab.ai/check — no sign-up, no card. The form at the foot is the
   human path (Zoho Books, Wafeq, or a walk-through). */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { CheckRun } from "@/components/hysaab/CheckRun";
import { MotionPage } from "@/components/motion/MotionPage";

export const metadata = {
  title: "How clean are your books, really? Books Check by Hysaab",
  description:
    "Connect Xero or QuickBooks with view-only access. Hysaab spots potential mistakes, money at risk, and what needs fixing first. Free in preview, no sign-up, no credit card.",
  alternates: { canonical: "./" },
};

const APP = "https://app.hysaab.ai/check";

export default function CheckPage() {
  return (
    <PageShell band={{ kicker: "Books Check", title: "How clean are your books, really?", body: "Connect your accounting system with view-only access. In about a minute Hysaab shows what needs attention and what to do first. No sign-up, no credit card." }}>
      <PageHero
        eyebrow="See Hysaab in action"
        title={<>How clean are your books,<br /><span>really?</span></>}
        lede="Connect your accounting system. Hysaab spots potential mistakes, money at risk, and what needs fixing first."
      >
        <a className="hw-btn hw-btn--peach" href={APP}>Check my books <span aria-hidden="true">→</span></a>
        <span className="hw-link hw-link--light" style={{ cursor: "default" }}>Free in preview · Read-only · Xero &amp; QuickBooks · No sign-up, no credit card</span>
      </PageHero>

      {/* ── Motion: hero entrance + kit reveals (brand/MOTION.md), a check running ── */}
      <MotionPage />
      <CheckRun />

      {/* ── Found something? ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Found something? Let&rsquo;s fix it.</p>
              <h2>Get your findings, understand the next steps, and ask Hysaab to help.</h2>
            </div>
          </div>
          <div className="hw-cards">
            <article>
              <p className="hw-eyebrow">1 · Your findings</p>
              <h3>Ranked by what matters, with the documents behind each.</h3>
              <p>Cash, performance and the reliability of the books in a minute, then every finding with its evidence and the entries to open.</p>
            </article>
            <article>
              <p className="hw-eyebrow">2 · The next steps</p>
              <h3>What to check, what to correct, what to change.</h3>
              <p>Each finding says what we saw, what it means for you, and the next step. Nothing is changed in your ledger.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">3 · Ask Hysaab to help</p>
              <h3>Tick the items you want us to look into.</h3>
              <p>We investigate the supporting records and propose the next steps for your approval.</p>
            </article>
          </div>
          <div className="hw-actions" style={{ marginTop: 34 }}>
            <a className="hw-btn hw-btn--peach" href={APP}>Check my books <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      {/* ── Prefer a person ── */}
      <section id="conversation">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Zoho Books, Wafeq, or prefer a person?</p>
              <h2>Leave your email and we run the first check with you.</h2>
            </div>
            <p>Which system you use is enough. We reply within one working day.</p>
          </div>
          <EnquiryForm source="Books Check" />
        </div>
      </section>
    </PageShell>
  );
}
