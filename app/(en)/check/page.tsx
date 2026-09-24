/* ── /check ──────────────────────────────────────────────────────────
   The Books Check landing page (2026-09-24, owner's copy): one question,
   one button, three facts. The button opens the app's magic-link flow at
   app.hysaab.ai/check — no sign-up, no card. The form at the foot is the
   human path (Zoho Books, Wafeq, or a walk-through).
   Round 2 (2026-09-24, owner): less copy, more design. Kinetic hero with
   the sample report assembling, a marquee of the checks, a sticky step
   reveal, a sage verdict, oversized numerals, a giant closing link.
   Styles: app/check.css (ck-*) on top of the motion system (MOTION.md).
   2026-09-24 (owner): "read-only" stays here as Books Check fine print;
   it links to the trust ladder, and one line pairs the check with
   Hysaab Finance ("Books Check reads. Hysaab Finance fixes."). */

import "../../check.css";
import { PageShell } from "@/components/home/PageShell";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { SampleReport } from "@/components/check/SampleReport";
import { CheckSteps } from "@/components/check/CheckSteps";
import { KineticLines, Mark, SwapLabel, DigitRoll, ScrollWords } from "@/components/motion/Kinetic";
import { PeachScroller } from "@/components/home/PeachScroller";

export const metadata = {
  title: "How clean are your books, really? Books Check by Hysaab",
  description:
    "Connect Xero or QuickBooks with view-only access. Hysaab spots potential mistakes, money at risk, and what needs fixing first. Free, no sign-up, no credit card.",
  alternates: { canonical: "./" },
};

const APP = "https://app.hysaab.ai/check";
const OFFER = "Free. No sign-up, no credit card.";

/* The tests a check runs (SPEC §6), in the ledger's own words. */
const CHECKS = [
  "Possible duplicate bills",
  "Re-posted journals",
  "Suspense balances",
  "Receivables over 60 days",
  "Unreconciled bank lines",
  "Missed and doubled months",
  "Round-sum journals",
  "Payments with no description",
  "Invoice number gaps",
  "Related-party balances",
  "VAT at the wrong rate",
  "Corporate tax add-backs",
  "Your P&L, reconciled",
];

export default function CheckPage() {
  return (
    <PageShell band={false}>
      {/* ── Hero: kinetic headline + the sample report assembling ── */}
      <section className="ck-hero">
        <div className="hw-wrap ck-hero-grid">
          <div className="ck-hero-copy">
            <p className="ck-eyebrow"><span className="ck-pulse" aria-hidden="true" /> Books Check for Xero &amp; QuickBooks</p>
            <h1 className="ck-h1">
              <KineticLines lines={[<>Find out what&rsquo;s</>, <><Mark at={820}>really</Mark> going on</>, <>in your books.</>]} />
            </h1>
            <p className="ck-lede">Connect your ledger. Get a ranked report in about a minute.</p>
            <div className="ck-actions">
              <a className="hw-btn hw-btn--peach m-cta m-cta--on-navy m-magnetic" href={APP}>
                <SwapLabel text="Check my books" /> <span aria-hidden="true">→</span>
              </a>
              <p className="ck-offer">{OFFER}<br />Read-only access. <a href="/trust#ladder">How write access is earned</a></p>
            </div>
          </div>
          <SampleReport />
        </div>
      </section>

      {/* ── What every check looks for ── */}
      <PeachScroller phrases={CHECKS} />

      {/* ── How it runs ── */}
      <section className="ck-how" aria-labelledby="ck-how-h">
        <div className="hw-wrap">
          <div className="ck-how-head" data-reveal="">
            <p className="hw-eyebrow">How it works</p>
            <h2 id="ck-how-h">About a <em>minute</em>.</h2>
          </div>
          <CheckSteps />
        </div>
      </section>

      {/* ── The verdict: what the report gives you ── */}
      <section className="ck-verdict" aria-label="What you get">
        <div className="hw-wrap">
          <p className="hw-eyebrow">What you get</p>
          <ScrollWords className="ck-verdict-words" lines={["Your business in a minute.", "What needs attention first.", "The evidence behind every finding.", "And what we could not check."]} />
        </div>
      </section>

      {/* ── Oversized numerals: the promises ── */}
      <section className="ck-facts" aria-label="Your data">
        <div className="hw-wrap ck-facts-grid" data-play="">
          <div><strong><DigitRoll value="0" /></strong><span className="ck-fact-l">Entries written to your books</span></div>
          <div><strong><DigitRoll value="30" delay={120} /></strong><span className="ck-fact-l">Days, then your report is deleted</span></div>
          <div><strong><DigitRoll value="2" delay={240} /></strong><span className="ck-fact-l">Systems today: Xero and QuickBooks</span></div>
        </div>
      </section>

      {/* ── Found something? ── */}
      <section className="ck-fix" aria-labelledby="ck-fix-h">
        <div className="hw-wrap ck-fix-grid">
          <div data-reveal="">
            <p className="hw-eyebrow">Found something?</p>
            <h2 id="ck-fix-h">We&rsquo;ll help <em>fix</em> it.</h2>
            <p className="ck-pair"><strong>Books Check reads. Hysaab Finance fixes.</strong> <a href="/accounting">See Hysaab Finance</a></p>
          </div>
          <ol className="ck-fix-steps" data-reveal="stagger-lg">
            <li><span>01</span>Tick the findings</li>
            <li><span>02</span>We dig into the records</li>
            <li><span>03</span>You approve every step</li>
          </ol>
        </div>
      </section>

      {/* ── Prefer a person ── */}
      <section id="conversation" className="ck-person">
        <div className="hw-wrap ck-person-grid">
          <div data-reveal="">
            <p className="hw-eyebrow">Zoho Books, Wafeq, or prefer a person?</p>
            <h2>We&rsquo;ll run the check <em>with you</em>.</h2>
            <p>A person replies within one working day.</p>
          </div>
          <EnquiryForm source="Books Check" />
        </div>
      </section>

      {/* ── Closing: one giant link ── */}
      <section className="ck-end" aria-label="Start a Books Check">
        <div className="hw-wrap">
          <p className="ck-end-offer">{OFFER}</p>
          <a className="ck-end-link m-magnetic" href={APP}>
            <SwapLabel text="Check my books" /> <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </PageShell>
  );
}
