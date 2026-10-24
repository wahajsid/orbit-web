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
   Hysaab Finance ("Books Check reads. Hysaab Finance fixes.").
   2026-10-25 (owner): the free bank statement check is merged in. One
   free check, two ways in: connect Xero or QuickBooks, or upload a bank
   statement (app.hysaab.ai/tools/bank-statement, orbit-app HANDOFF §122
   and §140). /bank-statement now redirects to #statement here. */

import "../../check.css";
import { PageShell } from "@/components/home/PageShell";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { SampleReport } from "@/components/check/SampleReport";
import { CheckSteps } from "@/components/check/CheckSteps";
import { KineticLines, Mark, SwapLabel, DigitRoll, ScrollWords } from "@/components/motion/Kinetic";
import { PeachScroller } from "@/components/home/PeachScroller";

export const metadata = {
  title: "Free check: your books or a bank statement | Hysaab",
  description:
    "Connect Xero or QuickBooks read-only, or upload a UAE or Saudi bank statement. Hysaab finds the mistakes, the money at risk and what to fix first. Free, no sign-up, no credit card.",
  alternates: { canonical: "./" },
};

const APP = "https://app.hysaab.ai/check";
const STATEMENT = "https://app.hysaab.ai/tools/bank-statement";
const BARS: [string, number, string][] = [
  ["Salaries and WPS", 61_200, "36.8%"], ["Rent", 45_000, "27.1%"], ["VAT, corporate tax and Zakat", 18_450, "11.1%"], ["Suppliers", 17_199, "10.4%"],
];
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
            <p className="ck-eyebrow"><span className="ck-pulse" aria-hidden="true" /> Free check · your books or a bank statement</p>
            <h1 className="ck-h1">
              <KineticLines lines={[<>Find out what&rsquo;s</>, <><Mark at={820}>really</Mark> going on</>, <>in your books.</>]} />
            </h1>
            <p className="ck-lede">Connect Xero or QuickBooks for a ranked report in about a minute. No ledger to connect? Upload a bank statement instead.</p>
            <div className="ck-actions">
              <a className="hw-btn hw-btn--peach m-cta m-cta--on-navy m-magnetic" href={APP}>
                <SwapLabel text="Check my books" /> <span aria-hidden="true">→</span>
              </a>
              <a className="ck-alt" href="#statement">Or upload a bank statement <span aria-hidden="true">↓</span></a>
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

      {/* ── The second way in: a bank statement ── */}
      <section className="ck-stmt" id="statement" aria-labelledby="ck-stmt-h">
        <div className="hw-wrap ck-stmt-grid">
          <div data-reveal="">
            <p className="hw-eyebrow">No Xero or QuickBooks? Start with a bank statement</p>
            <h2 id="ck-stmt-h">See what your statement says about your <em>business</em>.</h2>
            <p className="ck-stmt-p">Upload a PDF or CSV from any UAE or Saudi bank. Hysaab checks that every line adds up to the closing balance, then sorts up to 100 transactions: where the money went, who pays you, what repeats, and what to look at.</p>
            <ul className="ck-stmt-list">
              <li>Every line tied to the balance, to the fil</li>
              <li>Sorted by Claude, the uncertain lines checked by Jev</li>
              <li>Possible double payments, cash, owner drawings, large one-offs</li>
              <li>A report to save as PDF, and a checked Excel by email</li>
            </ul>
            <div className="ck-actions ck-actions--plain">
              <a className="hw-btn hw-btn--navy m-cta m-magnetic" href={STATEMENT}><SwapLabel text="Upload a statement" /> <span aria-hidden="true">→</span></a>
              <p className="ck-offer ck-offer--dark">{OFFER}<br />Read in memory, never stored.</p>
            </div>
          </div>
          <figure className="tt-bsr" aria-label="Sample statement report, fictional company">
            <p className="tt-bsr-h"><span>Statement insights · sample</span><span>22 transactions · Jul to Sep</span></p>
            <div className="tt-bsr-tiles">
              <div><span>Money in</span><b>AED 162,500.00</b></div>
              <div><span>Money out</span><b>AED 166,094.50</b></div>
            </div>
            <ul className="tt-bsr-bars">
              {BARS.map(([l, v, s]) => <li key={l}><span>{l}<small>{s} of money out</small></span><i style={{ width: `${(v / 61_200) * 100}%` }} /><b>{v.toLocaleString("en-US", { minimumFractionDigits: 2 })}</b></li>)}
            </ul>
            <p className="tt-bsr-flag"><span aria-hidden="true">?</span> Possible double payment: Gulf Technical Supplies, AED 4,189.50 on 12 and 13 Sep.</p>
            <figcaption>Sample report · fictional company and figures</figcaption>
          </figure>
        </div>
        <div className="hw-wrap ck-stmt-why" data-reveal="">
          <p><strong>Any AI can read a bank statement. Hysaab remembers your company.</strong> Connect your books and it learns how you code each supplier, unlearns a pattern the moment you correct it, and relearns every month on your say-so. <a href="/#memory">How the memory works</a></p>
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
          <p className="ck-end-alt"><a href={STATEMENT}>Or upload a bank statement <span aria-hidden="true">→</span></a></p>
        </div>
      </section>
    </PageShell>
  );
}
