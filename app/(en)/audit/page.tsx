/* ── /audit: Hysaab Audit ─────────────────────────────────────────────
   Rebuilt 2026-10-25 in the homepage's Tick & Tie language (W/P strips,
   the highlighter, a work film in the hero, the demo form at the end).
   Every fact and screenshot of the September page is kept. Every figure in
   the screenshots and the film was produced by the audit engines on a
   seeded engagement (Helio Trading LLC), never by hand.
   The product is Hysaab Audit, sold on its own or with Hysaab Practice. */

import Image from "next/image";
import { SiteHeader } from "@/components/home/HomeHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { Wp, Tm } from "@/components/home/tt/Wp";
import { WorkFilm } from "@/components/home/WorkFilm";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

export const metadata = {
  title: "Hysaab Audit: an AI-native ISA Audit File for Gulf Audit Firms",
  description:
    "Hysaab Audit runs an ISA audit file on a hashed snapshot of the books: journals scored, samples designed, schedules tied out. A licensed person concludes.",
  alternates: { canonical: "./" },
};

const STEPS: {
  n: string; h: string; p: React.ReactNode; facts: [string, React.ReactNode][];
  shot: { src: string; w: number; h: number; alt: string }; cap: string;
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
    shot: { src: "/shots/audit-data.png", w: 2940, h: 1256, alt: "Hysaab Audit snapshots: the first pull marked STOP for a broken general-ledger roll-forward, the corrected pull marked complete, both with their SHA-256 hashes" },
    cap: "The first snapshot stopped the file: the client's trial balance predated a journal in the ledger.",
  },
  {
    n: "02 · Planning",
    h: "Risk assessed line by line, assertion by assertion.",
    p: <>The engines read the entity from its own numbers: ratios, monthly trends, differences above precision, the fraud triangle, related parties. Out comes a risk register per financial statement line and assertion, with the presumed significant risks of ISA 240 already on it and the factor that raised each one written beside it.</>,
    facts: [
      ["Approved by a person", <>The register is a proposal until a partner approves it, and the phase gate will not open before that.</>],
      ["Materiality", <>Computed from this year&apos;s figures, with every candidate benchmark shown and the choice explained.</>],
      ["The programme", <>Only the procedures that fit the chart are instantiated. No tax recompute where there is no tax account.</>],
    ],
    shot: { src: "/shots/audit-planning.png", w: 2920, h: 2360, alt: "Hysaab Audit planning: phase strip, the B6 risk register with nine significant risks by line and assertion, and the planning procedures with their last run" },
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
    shot: { src: "/shots/audit-jet.png", w: 2920, h: 2360, alt: "Hysaab Audit journal-entry testing: every journal scored against thirty criteria, stratified above performance materiality, scored and random, with the criteria hits and vouching result on each row" },
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
    shot: { src: "/shots/audit-sampling.png", w: 2920, h: 2360, alt: "Hysaab Audit sampling workbench: monetary-unit sample design, the selection with top stratum and sampled items, audited values entered, and the evaluation with the upper misstatement limit" },
    cap: "Upper limit 563,355 against performance materiality 231,800. The engine calls it: not accepted.",
  },
  {
    n: "05 · Fieldwork",
    h: "Confirmations and the request list chase themselves.",
    p: <>Confirmees are selected from the snapshot: every bank, the sampled receivables, the top payables without statements, lenders, counsel, related parties. Letters are drafted per kind with unique references. Reminders fall due on schedule, two unanswered reminders escalate to named alternative procedures, and a reply that came through the client is marked less reliable than one that came direct.</>,
    facts: [
      ["The request list", <>Derived from the procedures actually planned, not typed from memory, with an owner and a due date per item.</>],
      ["Reliability", <>Scored by route and sender domain. A forwarded reply is evidence of a different grade.</>],
      ["Sent by people", <>Letters leave the firm&apos;s own mailbox. The software drafts them and tracks them.</>],
    ],
    shot: { src: "/shots/audit-fieldwork.png", w: 3120, h: 2360, alt: "Hysaab Audit fieldwork: the confirmation tracker with book and confirmed balances, reliability and status, and the information request list with owners, due dates and received status" },
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
    shot: { src: "/shots/audit-completion.png", w: 3120, h: 2460, alt: "Hysaab Audit completion: the misstatement register evaluated against materiality on both bases, going concern with stress headroom, file completion checks, and the subsequent events classified under IAS 10" },
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
    shot: { src: "/shots/audit-workpapers.png", w: 2920, h: 2460, alt: "Hysaab Audit workpaper file: twenty-one workpapers with their review state, and the trade receivables lead schedule open with tick marks, the sub-ledger difference and an inconclusive conclusion" },
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

const OLD_NEW: [string, string][] = [
  ["25 journals picked by eye", "Every journal scored"],
  ["Tick marks typed in", "Tick marks set by the engine"],
  ["Last year's materiality", "Computed on this year's numbers"],
  ["Sample size from a table", "Designed and evaluated"],
  ["Confirmations in a mailbox", "Tracked, chased, escalated"],
  ["Findings on a whiteboard", "One evaluated register"],
  ["The file built at the end", "Written as work concludes"],
  ["Review notes in email", "Sign-offs on the paper"],
];

const RULES: [string, string, string][] = [
  ["The opinion", "Hysaab never signs", "The opinion is a decision tree a partner walks and records. The report is drafted for the firm to review, and the signed PDF is held as evidence, never produced by the software."],
  ["Independence", "A firewall, not a policy", "Audit records belong to the firm. The client grants read access for a fixed window and can revoke it. A team member who holds a seat in the client organisation is refused by the database itself."],
  ["The snapshot", "Testing never touches live books", "Every procedure runs on an immutable, hashed copy. Figures on screen cite the hash. Nothing in the audit module can write to a ledger."],
  ["Judgement", "Some things are human only", "Inventory counts, inspections and other physical procedures are recorded by the person who performed them. Risk approval, conclusions and the phase gates need a named signature."],
  ["Arithmetic", "Code computes, not the model", "Materiality, sample sizes, projections, tie-outs and the misstatement aggregate are computed deterministically and reproduce exactly. The model writes around the numbers, never the numbers."],
  ["Citations", "Flagged until verified", "Standards references are marked unverified until the firm's licensed texts are loaded. We would rather show you the gap than let a confident citation into a file you sign."],
];

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.en}</span>;

export default function AuditPage() {
  return (
    <div className="hw-page tt-page" id="top">
      <a href="#main" className="hw-skip">Skip to the content</a>
      <span data-motion-page="full" hidden />
      <SiteHeader />
      <main id="main">
        {/* ── A-1 The promise and the file running ── */}
        <section className="tt-sec tt-grid tt-hero tt-hero3">
          <div className="hw-wrap">
            <Wp r="A-1" right={<>Run by <b>engines</b> · Concluded by <b>your partners</b></>}>Hysaab Audit · for licensed audit firms</Wp>
            <div className="tt-hero2-g tt-hero3-g">
              <div className="tt-hero2-copy">
                <h1>The ISA file, run by engines. <span className="tt-hl">Concluded by your partners.</span></h1>
                <p className="tt-hero-sub">An ISA audit file that tests every journal. A licensed person concludes and signs; Hysaab never signs an opinion. Buy it on its own, or with Hysaab Practice.</p>
                <div className="tt-acts tt-hero2-acts">
                  <a className="hw-btn hw-btn--navy m-cta" {...DEMO}>Book a demo <span aria-hidden="true">↗</span>{newTab}</a>
                  <a className="tt-link" href="#walkthrough">See the file, screen by screen <span aria-hidden="true">↓</span></a>
                </div>
              </div>
              <WorkFilm
                bar="Helio Trading LLC · FY2025 audit · seeded engagement" tag="Illustrative" title="The engagement"
                sr="Illustration of a seeded audit engagement in Hysaab Audit: the snapshot is hashed and checked, the risk register approved, all 743 journals scored, the sample evaluated, confirmations tracked and the misstatements aggregated, leaving the file ready for the partner, who signs."
                cap="Seeded engagement · fictional company · figures from the engines"
                rows={[
                  { label: "Data", task: "Snapshot hashed and checked", done: "SHA-256 · roll-forward ties" },
                  { label: "Plan", task: "Risk register approved", done: "9 significant risks · partner signed" },
                  { label: "JET", task: "Every journal scored", done: "743 of 743 · 175 selected" },
                  { label: "MUS", task: "Sample evaluated", done: "Upper limit 563,355 > PM 231,800 · not accepted" },
                  { label: "Field", task: "Confirmations tracked", done: "1 exception of 42,750 · 1 escalated" },
                  { label: "Close", task: "Misstatements aggregated", done: "703,500 against 386,400 · material" },
                ]}
                final={{ k: "Ready for the partner", h: "The file is written", s: "Workpapers cross-referenced · two file checks still open", sign: "Partner signature required" }}
              />
            </div>
          </div>
        </section>

        {/* ── A-2 What changes ── */}
        <section className="tt-sec" aria-labelledby="au-why-h">
          <div className="hw-wrap">
            <Wp r="A-2" right="The file today">What changes</Wp>
            <h2 className="tt-h2" id="au-why-h" data-reveal="">An audit is mostly evidence handling. <span className="tt-hl" data-play="">Almost none of it needs a human.</span></h2>
            <p className="tt-lead">Sampling by eye, tick marks in a spreadsheet, materiality carried over from last year&apos;s file, confirmations chased from memory, the file assembled in the week before the deadline. The judgement your licence is for gets whatever hours are left.</p>
            <ul className="tt-oldnew" data-reveal="stagger-lg">
              {OLD_NEW.map(([o, n]) => <li key={o}><s>{o}</s><span><Tm m="✓" />{n}</span></li>)}
            </ul>
          </div>
        </section>

        {/* ── A-3 Seven phases ── */}
        <section className="tt-sec tt-grid" aria-labelledby="au-ph-h">
          <div className="hw-wrap">
            <Wp r="A-3" right="Gates, not reminders">How it is organised</Wp>
            <h2 className="tt-h2" id="au-ph-h" data-reveal="">Seven phases, and a gate <span className="tt-hl" data-play="">you cannot talk your way through.</span></h2>
            <p className="tt-lead">Each phase instantiates its own procedures from the programme, runs them, and refuses to exit until its conditions are met. Phase 3 will not close with selected journals unvouched. Phase 4 will not close without the partner signatures.</p>
            <ol className="tt-steps tt-phases" data-reveal="stagger-lg">
              {PHASES.map(([n, h, p]) => <li key={n}><span className="tt-step-n">Phase {n}</span><div><h3>{h}</h3><p>{p}</p></div></li>)}
            </ol>
          </div>
        </section>

        {/* ── A-4 Screen by screen ── */}
        <section className="tt-sec" id="walkthrough" aria-labelledby="au-walk-h">
          <div className="hw-wrap">
            <Wp r="A-4" right="Real screens · seeded engagement">Screen by screen</Wp>
            <h2 className="tt-h2" id="au-walk-h" data-reveal="">One engagement, <span className="tt-hl" data-play="">from the snapshot to the signature.</span></h2>
            <p className="tt-lead">These are the real screens on a seeded engagement: a fictional UAE trading company with misstatements of known type planted in its books, so you can watch the engines find them.</p>
            <div className="tt-walk">
              {STEPS.map((s) => (
                <article key={s.n}>
                  <div className="tt-walk-copy">
                    <p className="tt-who">{s.n}</p>
                    <h3>{s.h}</h3>
                    <p>{s.p}</p>
                    <ul className="tt-list">{s.facts.map(([k, v]) => <li key={k}><Tm m="✓" /><span><strong>{k}.</strong> {v}</span></li>)}</ul>
                  </div>
                  <figure className="tt-walk-shot">
                    <Image src={s.shot.src} width={s.shot.w} height={s.shot.h} sizes="(max-width: 960px) 100vw, 55vw" alt={s.shot.alt} />
                    <figcaption>{s.cap}</figcaption>
                  </figure>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── A-5 The rules ── */}
        <section className="tt-sec tt-memory" aria-labelledby="au-rules-h">
          <div className="hw-wrap">
            <Wp r="A-5" right="What the software is not allowed to do">The rules</Wp>
            <h2 className="tt-h2" id="au-rules-h" data-reveal="">Engines compute. Models draft words. <span className="tt-hl" data-play="">A licensed human concludes.</span></h2>
            <div className="tt-rules" data-reveal="stagger-lg">
              {RULES.map(([k, h, p]) => <article key={k}><p className="tt-who">{k}</p><h3>{h}</h3><p>{p}</p></article>)}
            </div>
          </div>
        </section>

        {/* ── A-6 Where it sits ── */}
        <section className="tt-sec tt-grid" aria-labelledby="au-sits-h">
          <div className="hw-wrap">
            <Wp r="A-6" right="Bought on its own or together">Where it sits</Wp>
            <h2 className="tt-h2" id="au-sits-h" data-reveal="">Part of the <span className="tt-hl" data-play="">professional services stack.</span></h2>
            <p className="tt-lead">Hysaab Audit can be bought on its own, or with Hysaab Practice. Both follow the same rule: the AI proposes and a person decides. Each keeps its own client records, so your independence rules decide who works on which client.</p>
            <div className="tt-firmrow tt-firmrow--3">
              <a href="/firms"><span className="tt-prod-st"><span>For the firm</span><b>Hysaab Practice</b></span><strong>The practice around the audit</strong><span>Clients, engagement letters, the filing workbench, time, billing, capacity and people.</span></a>
              <a href="/accounting"><span className="tt-prod-st"><span>For the client&apos;s books</span><b>Hysaab Finance</b></span><strong>The snapshot in one click</strong><span>When the client keeps its books on Hysaab Finance the snapshot is already complete. Pulling it from a connected ledger or a file is the next stage of the build.</span></a>
              <a href="/contact"><span className="tt-prod-st"><span>For an SME, not an audit</span><b>Readiness review</b></span><strong>Before the auditor arrives</strong><span>The same engines over your own books: completeness, journal testing, tie-outs. Never called an audit, because it is not one.</span></a>
            </div>
          </div>
        </section>

        {/* ── A-7 Where it has got to, and the invitation ── */}
        <section className="tt-sec hw-conversation tt-conversation" id="conversation">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp r="A-7" right="A person replies within a working day">Bring us a file</Wp>
            <div className="hw-conversation-grid" data-reveal="stagger-lg">
              <div>
                <h2 className="tt-h2">Bring us a file <span className="tt-hl" data-play="">and we will run it.</span></h2>
                <p className="tt-lead">Hysaab Audit was written from a clean-sheet ISA methodology rather than a template pack, with the engines proved against a seeded engagement whose misstatements are known in advance. Every release re-runs it and scores what was found, what was missed and what was flagged in error. We are opening it to a small group of licensed firms in the UAE and KSA first.</p>
                <p className="tt-promise"><Tm m="P" /> We will show you what runs today, label what does not, and never let software make a call your licence is on the line for.</p>
                <p className="hw-demo-direct">Prefer to pick a time yourself? <a className="tt-link" {...DEMO}>Choose a slot in our calendar <span aria-hidden="true">↗</span>{newTab}</a></p>
              </div>
              <EnquiryForm source="Audit page" demo />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
