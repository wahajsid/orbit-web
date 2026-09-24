/* ── /audit ──────────────────────────────────────────────────────────
   Rebuilt 2026-09 in the V4 design (PageShell + hw-* kit). Preserves
   all ISA walkthrough content and screenshots. Every figure in the
   screenshots was produced by the audit engines on a seeded engagement
   (Helio Trading LLC), never by hand.
   2026-09-23 (website change plan): the product is Hysaab Audit, sold on
   its own or with Hysaab Practice; the CTAs book a demo. */

import Image from "next/image";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { Wordmark } from "@/components/Wordmark";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

export const metadata = {
  title: "Hysaab Audit: an AI-native ISA Audit File for Gulf Audit Firms",
  description:
    "Hysaab Audit runs an ISA audit file on a hashed snapshot of the books: journals scored, samples designed, schedules tied out. A licensed person concludes.",
  alternates: { canonical: "./" },
};

const STEPS: {
  n: string; h: string; p: React.ReactNode; facts: [string, React.ReactNode][];
  shot: { src: string; w: number; h: number; alt: string }; bar: string; cap: string;
}[] = [
  {
    n: "01 · The population",
    h: "It refuses to start on books that do not add up.",
    p: <>Nothing is tested against the live ledger. Hysaab takes a snapshot, hashes it, and runs seven completeness checks before a single procedure is planned. A general ledger that does not roll forward to the trial balance it was handed is a STOP, not a note in the file.</>,
    facts: [
      ["Roll-forward", <>Opening plus movement must equal closing, on every account. A balancing figure is refused.</>],
      ["Sequence", <>Missing journal numbers are listed as gaps for the client to explain.</>],
      ["Hashed", <>SHA-256 on the snapshot. Every later figure cites the hash it came from.</>],
    ],
    shot: { src: "/shots/audit-data.png", w: 2560, h: 1256, alt: "Hysaab Audit snapshots: the first pull marked STOP for a broken general-ledger roll-forward, the corrected pull marked complete, both with their SHA-256 hashes" },
    bar: "Data · snapshots and integrity",
    cap: "The first snapshot stopped the file: the client's trial balance predated a journal in the ledger.",
  },
  {
    n: "02 · Planning",
    h: "Risk assessed line by line, assertion by assertion.",
    p: <>The engines read the entity from its own numbers: ratios, monthly trends, differences above precision, the fraud triangle, related parties. Out comes a risk register per financial statement line and assertion, with the presumed significant risks of ISA 240 already on it and the factor that raised each one written beside it.</>,
    facts: [
      ["Approved by a person", <>The register is a proposal until a partner approves it, and the phase gate will not open before that.</>],
      ["Materiality", <>Computed from this year's figures, with every candidate benchmark shown and the choice explained.</>],
      ["The programme", <>Only the procedures that fit the chart are instantiated. No tax recompute where there is no tax account.</>],
    ],
    shot: { src: "/shots/audit-planning.png", w: 2540, h: 2360, alt: "Hysaab Audit planning: phase strip, the B6 risk register with nine significant risks by line and assertion, and the planning procedures with their last run" },
    bar: "Planning · risk register and procedures",
    cap: "Nine significant risks, each with the factor that raised it. The gate stays shut until the partner approves.",
  },
  {
    n: "03 · Journal-entry testing",
    h: "Every journal is scored. Not twenty-five of them.",
    p: <>ISA 240 asks you to test journal entries. Most files test a handful chosen by eye. Hysaab scores all of them against thirty criteria, weights the hits, and strata the population into entries above performance materiality, entries the score picked up, and a random sample for the rest. You vouch what it selected and record what you found.</>,
    facts: [
      ["743 of 743", <>Scored on this engagement. 175 selected: 146 above performance materiality, 7 on score, 22 at random.</>],
      ["Thirty criteria", <>Post-close postings, round numbers, weekends and holidays, blank narratives, seldom-used accounts, keyword hits, duplicates, reversals, segregation conflicts, entries just below an approval threshold.</>],
      ["Auditable", <>Each row carries the criteria that flagged it. The selection is seeded, so it reproduces.</>],
    ],
    shot: { src: "/shots/audit-jet.png", w: 2540, h: 2360, alt: "Hysaab Audit journal-entry testing: every journal scored against thirty criteria, stratified above performance materiality, scored and random, with the criteria hits and vouching result on each row" },
    bar: "JET explorer · ISA 240 journal testing",
    cap: "The top rows are the planted ones: revenue booked after year-end, a suspense plug, a duplicate payment, a capitalised expense, a related-party fee.",
  },
  {
    n: "04 · Sampling",
    h: "Monetary-unit sampling, designed and evaluated in the open.",
    p: <>Sample size from the risk and the tolerable misstatement, selection at a fixed interval with the top stratum taken in full, then the evaluation: factual, projected, basic precision, incremental allowance and the upper misstatement limit, against performance materiality. The narrative says what the number means and whether the balance can be accepted.</>,
    facts: [
      ["Reproducible", <>Seeded selection. The same population and seed give the same sample, every time.</>],
      ["Attribute too", <>Control testing at ninety-five percent confidence with its own sample table.</>],
      ["Honest answer", <>An upper limit above performance materiality is reported as not accepted, not explained away.</>],
    ],
    shot: { src: "/shots/audit-sampling.png", w: 2540, h: 2360, alt: "Hysaab Audit sampling workbench: monetary-unit sample design, the selection with top stratum and sampled items, audited values entered, and the evaluation with the upper misstatement limit" },
    bar: "Sampling · monetary-unit sample",
    cap: "Upper limit 563,355 against performance materiality 231,800. The engine calls it: not accepted.",
  },
  {
    n: "05 · Fieldwork",
    h: "Confirmations and the request list chase themselves.",
    p: <>Confirmees are selected from the snapshot: every bank, the sampled receivables, the top payables without statements, lenders, counsel, related parties. Letters are drafted per kind with unique references. Reminders fall due on schedule, two unanswered reminders escalate to named alternative procedures, and a reply that came through the client is marked less reliable than one that came direct.</>,
    facts: [
      ["The request list", <>Derived from the procedures actually planned, not typed from memory, with an owner and a due date per item.</>],
      ["Reliability", <>Scored by route and sender domain. A forwarded reply is evidence of a different grade.</>],
      ["Sent by people", <>Letters leave the firm's own mailbox. The software drafts them and tracks them.</>],
    ],
    shot: { src: "/shots/audit-fieldwork.png", w: 2540, h: 2360, alt: "Hysaab Audit fieldwork: the confirmation tracker with book and confirmed balances, reliability and status, and the information request list with owners, due dates and received status" },
    bar: "Fieldwork · confirmations and requests",
    cap: "One exception of 42,750, one reply routed through the client, one escalated to alternative procedures.",
  },
  {
    n: "06 · Completion",
    h: "Misstatements aggregated against materiality, both bases.",
    p: <>Every procedure that finds a difference posts it to one register. At completion it is evaluated on the rollover and iron-curtain bases, gross and net by line, with the qualitative factors attached. Below clearly trivial stays on the list and leaves the aggregate. The conclusion names the standard that applies if the client does not correct.</>,
    facts: [
      ["The arithmetic", <>703,500 uncorrected against overall materiality 386,400. Material, with an ISA 705 citation on the conclusion.</>],
      ["Subsequent events", <>Post-period journals and minutes are scanned and classified adjusting or non-adjusting, with the IAS 10 reference.</>],
      ["File completion", <>Nine checks on the file itself. Two are still open on this engagement, and it says so.</>],
    ],
    shot: { src: "/shots/audit-completion.png", w: 2540, h: 2460, alt: "Hysaab Audit completion: the misstatement register evaluated against materiality on both bases, going concern with stress headroom, file completion checks, and the subsequent events classified under IAS 10" },
    bar: "Completion · the misstatement register",
    cap: "Five findings, four above clearly trivial, one aggregate the partner has to act on.",
  },
  {
    n: "07 · The file",
    h: "Workpapers written as the work happens, signed by people.",
    p: <>Each procedure writes its own workpaper: purpose, source, procedure, results, conclusion, cross-referenced to the others. Preparer, reviewer and partner sign in order. A partner signature locks the version, and a change after that is a new version with a reason, never an edit over the top.</>,
    facts: [
      ["Tick marks", <>Set by the engine that performed the agreement, not typed. A failed tie-out shows as a cross.</>],
      ["Versions", <>Immutable. The reason for every new version is on the paper.</>],
      ["Conclusions", <>A reviewer cannot sign a judgement workpaper without recording a conclusion in their own words.</>],
    ],
    shot: { src: "/shots/audit-workpapers.png", w: 2540, h: 2460, alt: "Hysaab Audit workpaper file: twenty-one workpapers with their review state, and the trade receivables lead schedule open with tick marks, the sub-ledger difference and an inconclusive conclusion" },
    bar: "Workpapers · the audit file",
    cap: "The receivables lead is inconclusive because the sub-ledger is 15,000 short. It stays inconclusive until someone explains it.",
  },
];

const PHASES: [string, string, string][] = [
  ["0", "Acceptance", "Threats and safeguards, fee dependency, independence declarations, the ISA 210 letter and preconditions."],
  ["1", "Planning", "The entity from its own numbers, analytics, fraud factors, the risk register, materiality, the strategy memo."],
  ["2", "Controls", "Walkthroughs by cycle, design and implementation, and the reliance decision that follows from them."],
  ["3", "Substantive", "Journal testing, samples, tie-outs, cut-off, unrecorded liabilities, estimates, confirmations, the lead schedules."],
  ["4", "Completion", "Misstatements against materiality, subsequent events, going concern under stress, representations, file completion."],
  ["5", "Reporting", "Statements assembled from the audited trial balance, the disclosure review, the opinion decision tree, the report."],
  ["6", "Archive", "The file sealed with its manifest and a retention date the firm sets."],
];

export default function AuditPage() {
  return (
    <PageShell band={{ kicker: "For licensed audit firms", title: "Bring us a file and we will run it.", body: "Hysaab Audit opens to a small group of licensed audit firms first. Tell us about your practice and a real person will walk you through an engagement within one working day." }}>
      <PageHero
        eyebrow="For licensed audit firms"
        title={<>Hysaab Audit.<br /><span>The ISA file, run by engines, concluded by your partners.</span></>}
        lede="An ISA audit file that tests every journal. A licensed human concludes and signs; Hysaab never signs an opinion. Buy it on its own, or with Hysaab Practice."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>Book a demo <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB.en}</span></a>
        <a className="hw-link hw-link--light" href="#walkthrough">See the file, screen by screen</a>
      </PageHero>

      {/* ── What changes ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">The file today</p>
              <h2>An audit is mostly evidence handling.<br /><span>Almost none of it needs a human.</span></h2>
            </div>
            <p>Sampling by eye, tick marks in a spreadsheet, materiality carried over from last year&apos;s file, confirmations chased from memory, the file assembled in the week before the deadline. The judgement your licence is for gets whatever hours are left.</p>
          </div>
          <div className="hw-cards hw-cards--2">
            {[
              ["25 journals picked by eye", "Every journal scored"],
              ["Tick marks typed in", "Tick marks set by the engine"],
              ["Last year's materiality", "Computed on this year's numbers"],
              ["Sample size from a table", "Designed and evaluated"],
              ["Confirmations in a mailbox", "Tracked, chased, escalated"],
              ["Findings on a whiteboard", "One evaluated register"],
              ["The file built at the end", "Written as work concludes"],
              ["Review notes in email", "Sign-offs on the paper"],
            ].map(([old, now]) => (
              <article key={old}>
                <p className="hw-eyebrow" style={{ textDecoration: "line-through" }}>{old}</p>
                <h3>{now}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Phases ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">How it is organised</p>
              <h2>Seven phases, and a gate you cannot talk your way through.</h2>
            </div>
            <p>Each phase instantiates its own procedures from the programme, runs them on a dispatcher, and refuses to exit until its conditions are met. Phase 3 will not close with selected journals unvouched. Phase 4 will not close without the partner signatures.</p>
          </div>
          <div className="hw-rows">
            {PHASES.map(([n, h, p]) => (
              <article key={n}>
                <span className="hw-mono">Phase {n}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── The walkthrough ── */}
      <section className="hw-block--rule" id="walkthrough">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Screen by screen</p>
              <h2>One engagement, from the snapshot to the signature.</h2>
            </div>
            <p>These are the real screens on a seeded engagement: a fictional UAE trading company with misstatements of known type planted in its books, so you can watch the engines find them.</p>
          </div>
          {STEPS.map((s) => (
            <div className="hw-feature" key={s.n}>
              <div className="hw-feature-copy">
                <p className="hw-eyebrow">{s.n}</p>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <ul className="hw-ticks">
                  {s.facts.map(([k, v]) => <li key={k}><strong>{k}.</strong> {v}</li>)}
                </ul>
              </div>
              <div className="hw-shot">
                <Image src={s.shot.src} width={s.shot.w} height={s.shot.h} sizes="(max-width: 760px) 100vw, 55vw" alt={s.shot.alt} style={{ width: "100%", height: "auto", borderRadius: 4, border: "1px solid var(--hw-hairline)" }} />
                <p className="hw-shot-cap">{s.cap}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The rules ── */}
      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">What the software is not allowed to do</p>
              <h2>Engines compute. Models draft words.<br /><span>A licensed human concludes.</span></h2>
            </div>
          </div>
          <div className="hw-cards">
            <article className="is-navy">
              <p className="hw-eyebrow">The opinion</p>
              <h3>Hysaab never signs</h3>
              <p>The opinion is a decision tree a partner walks and records. The report is drafted for the firm to review, and the signed PDF is held as evidence, never produced by the software.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Independence</p>
              <h3>A firewall, not a policy</h3>
              <p>Audit records belong to the firm. The client grants read access for a fixed window and can revoke it. A team member who holds a seat in the client organisation is refused by the database itself.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">The snapshot</p>
              <h3>Testing never touches live books</h3>
              <p>Every procedure runs on an immutable, hashed copy. Figures on screen cite the hash. Nothing in the audit module can write to a ledger.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Judgement</p>
              <h3>Some things are human only</h3>
              <p>Inventory counts, inspections and other physical procedures are recorded by the person who performed them. Risk approval, conclusions and the phase gates need a named signature.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Arithmetic</p>
              <h3>Code computes, not the model</h3>
              <p>Materiality, sample sizes, projections, tie-outs and the misstatement aggregate are computed deterministically and reproduce exactly. The model writes around the numbers, never the numbers.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Citations</p>
              <h3>Flagged until verified</h3>
              <p>Standards references are marked unverified until the firm&apos;s licensed texts are loaded. We would rather show you the gap than let a confident citation into a file you sign.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Where it sits ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Where it sits</p>
              <h2>Part of the professional services stack.</h2>
            </div>
            <p>Hysaab Audit can be bought on its own, or with <a href="/firms">Hysaab Practice</a>, our product for tax and advisory firms. Together they share the same clients, the same file room and the same rule that the AI proposes and a person decides.</p>
          </div>
          <div className="hw-cards">
            <article>
              <p className="hw-eyebrow">For the firm</p>
              <h3>Hysaab Practice</h3>
              <p>The practice around the audit: clients, engagement letters, the filing workbench, time, billing, capacity and people. A signed letter creates the obligations, and the obligations create the work.</p>
              <a className="hw-link" href="/firms">See Hysaab Practice <span aria-hidden="true">→</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">For the client&apos;s books</p>
              <h3>Hysaab Finance</h3>
              <p>When the client keeps its books on Hysaab Finance the snapshot is one click and already complete. Pulling the population from a connected ledger or a file upload is the next stage of the build.</p>
              <a className="hw-link" href="/accounting">See Hysaab Finance <span aria-hidden="true">→</span></a>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">For an SME, not an audit</p>
              <h3>Readiness review</h3>
              <p>The same engines over your own books, before the auditor arrives: completeness, journal testing, tie-outs and the differences you will be asked about. It is never called an audit, because it is not one.</p>
              <a className="hw-link" href="/contact">Ask for a readiness review <span aria-hidden="true">→</span></a>
            </article>
          </div>
        </div>
      </section>

      {/* ── Honest state ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">Where it has got to</p>
              <h2>Built against a working methodology, in the open.</h2>
            </div>
            <div className="hw-prose">
              <p>Hysaab Audit was written from a clean-sheet ISA methodology rather than a template pack: acceptance through to archive, with the engines proved against a seeded engagement whose misstatements are known in advance. Every release re-runs it and scores what was found, what was missed and what was flagged in error.</p>
              <p>We are opening it to a small group of licensed firms in the UAE and KSA first.</p>
            </div>
          </div>
          <div className="hw-note">
            <span className="hw-mono">Our promise</span>
            <p>We will show you what runs today, label what does not, and never let software make a call your licence is on the line for.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
