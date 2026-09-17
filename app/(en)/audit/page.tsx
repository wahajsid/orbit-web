import Image from "next/image";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { CtaBand } from "@/components/hysaab/CtaBand";
import { Wordmark } from "@/components/Wordmark";

export const metadata = {
  title: "hysaab audit, an AI-native ISA audit file for Gulf audit firms",
  description:
    "hysaab audit runs an ISA audit of IFRS statements on a hashed snapshot of the client's books: every journal scored, materiality computed, samples designed and evaluated, schedules tied out, confirmations chased, misstatements aggregated against materiality. Engines compute, a licensed human concludes. Hysaab never signs an opinion.",
  alternates: { canonical: "./" },
};

/* The walkthrough. Every figure in these screenshots was produced by the
   audit engines on a seeded engagement (Helio Trading LLC, a fictional UAE
   trading company with misstatements of known type planted in its books),
   never by hand for the picture. */
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
    shot: { src: "/shots/audit-data.png", w: 2560, h: 1256, alt: "hysaab audit snapshots: the first pull marked STOP for a broken general-ledger roll-forward, the corrected pull marked complete, both with their SHA-256 hashes" },
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
    shot: { src: "/shots/audit-planning.png", w: 2540, h: 2360, alt: "hysaab audit planning: phase strip, the B6 risk register with nine significant risks by line and assertion, and the planning procedures with their last run" },
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
    shot: { src: "/shots/audit-jet.png", w: 2540, h: 2360, alt: "hysaab audit journal-entry testing: every journal scored against thirty criteria, stratified above performance materiality, scored and random, with the criteria hits and vouching result on each row" },
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
    shot: { src: "/shots/audit-sampling.png", w: 2540, h: 2360, alt: "hysaab audit sampling workbench: monetary-unit sample design, the selection with top stratum and sampled items, audited values entered, and the evaluation with the upper misstatement limit" },
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
    shot: { src: "/shots/audit-fieldwork.png", w: 2540, h: 2360, alt: "hysaab audit fieldwork: the confirmation tracker with book and confirmed balances, reliability and status, and the information request list with owners, due dates and received status" },
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
    shot: { src: "/shots/audit-completion.png", w: 2540, h: 2460, alt: "hysaab audit completion: the misstatement register evaluated against materiality on both bases, going concern with stress headroom, file completion checks, and the subsequent events classified under IAS 10" },
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
    shot: { src: "/shots/audit-workpapers.png", w: 2540, h: 2460, alt: "hysaab audit workpaper file: twenty-one workpapers with their review state, and the trade receivables lead schedule open with tick marks, the sub-ledger difference and an inconclusive conclusion" },
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
    <div className="hy-page">
      <MgNav />
      <main>
        {/* ── Hero ── */}
        <section className="hy-hero" id="top">
          <div className="hy-wrap hy-hero-grid">
            <div className="hy-hero-copy">
              <span className="hy-soon-chip"><i aria-hidden="true" /> Coming soon · founding firms</span>
              <span className="hy-kicker hy-kicker--blush">hysaab audit · part of hysaab services OS</span>
              <h1 className="hy-hero-h1">The audit file does the testing. You still sign it.</h1>
              <p className="hy-hero-p">An ISA audit of IFRS statements, run end to end on a hashed snapshot of the client&apos;s books. Engines test every journal, compute materiality, design and evaluate the samples, tie the schedules out, chase the confirmations and aggregate the misstatements. A licensed human concludes and signs. Hysaab never signs an opinion.</p>
              <div className="hy-hero-cta">
                <a href="/contact" className="hy-btn hy-btn--blush hy-btn--lg">Join the founding firms →</a>
                <a href="#walkthrough" className="hy-btn hy-btn--outline-cream hy-btn--lg">See the file, screen by screen</a>
              </div>
              <div className="hy-stats">
                <div className="hy-stat"><span className="hy-stat-n hy-num">743 / 743</span><span className="hy-stat-l">journals scored on a seeded engagement, not a sample of them</span></div>
                <div className="hy-stat"><span className="hy-stat-n hy-num">30</span><span className="hy-stat-l">journal-entry criteria, weighted and cited on every row</span></div>
                <div className="hy-stat"><span className="hy-stat-n hy-num">0</span><span className="hy-stat-l">opinions a machine is allowed to sign</span></div>
              </div>
            </div>
            <div className="hy-hero-win">
              <figure className="hy-shot hy-shot--hero">
                <figcaption className="hy-shot-bar">
                  <Wordmark size={15} ground="navy" suffix={false} />
                  <span className="hy-shot-t">audit · materiality</span>
                </figcaption>
                <Image src="/shots/audit-materiality-card.png" width={1925} height={1231} sizes="(max-width: 1120px) 100vw, 780px" priority alt="hysaab audit materiality: overall 386,400, performance 231,800 and clearly trivial 19,300, with every candidate benchmark and the engine’s written rationale for the one chosen" />
                <figcaption className="hy-shot-cap">Illustrative engagement. Helio Trading LLC is a fictional UAE trading company; every figure was computed by the audit engines on its seeded books.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── What changes ── */}
        <section className="hy-story hy-section hy-rule-b" id="changes">
          <div className="hy-wrap">
            <div className="hy-story-head">
              <div className="hy-story-title">
                <span className="hy-kicker">The file today</span>
                <h2 className="hy-h2 hy-h2--wide">An audit is mostly evidence handling. Almost none of it needs a human.</h2>
              </div>
              <span className="hy-story-note">Sampling by eye, tick marks in a spreadsheet, materiality carried over from last year&apos;s file, confirmations chased from memory, the file assembled in the week before the deadline. The judgement your licence is for gets whatever hours are left.</span>
            </div>
            <div className="hy-replace">
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
                <div key={old}><s>{old}</s><span>→ {now}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Phases ── */}
        <section className="hy-voices hy-section hy-rule-b" id="phases">
          <div className="hy-wrap">
            <div className="hy-story-head">
              <div className="hy-story-title">
                <span className="hy-kicker">How it is organised</span>
                <h2 className="hy-h2 hy-h2--wide">Seven phases, and a gate you cannot talk your way through.</h2>
              </div>
              <span className="hy-story-note">Each phase instantiates its own procedures from the programme, runs them on a dispatcher, and refuses to exit until its conditions are met. Phase 3 will not close with selected journals unvouched. Phase 4 will not close without the partner signatures.</span>
            </div>
            <div className="hy-phases">
              {PHASES.map(([n, h, p]) => (
                <div className="hy-phase" key={n}>
                  <span className="hy-phase-n">Phase {n}</span>
                  <span className="hy-phase-h">{h}</span>
                  <span className="hy-phase-p">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The walkthrough ── */}
        <section className="hy-cohort hy-section hy-rule-b" id="walkthrough">
          <div className="hy-wrap">
            <div className="hy-voices-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span className="hy-kicker">Screen by screen</span>
                <h2 className="hy-h2">One engagement, from the snapshot to the signature.</h2>
              </div>
              <span className="hy-note" style={{ maxWidth: 400 }}>These are the real screens on a seeded engagement: a fictional UAE trading company with misstatements of known type planted in its books, so you can watch the engines find them.</span>
            </div>
            <div className="hy-walk">
              {STEPS.map((s) => (
                <div className="hy-walk-item" key={s.n}>
                  <div className="hy-walk-head">
                    <div className="hy-walk-copy">
                      <span className="hy-walk-n">{s.n}</span>
                      <h3 className="hy-walk-h">{s.h}</h3>
                    </div>
                    <div className="hy-walk-body">
                      <p className="hy-walk-p">{s.p}</p>
                      <ul className="hy-walk-facts">
                        {s.facts.map(([k, v]) => <li key={k}><strong>{k}</strong><span>{v}</span></li>)}
                      </ul>
                    </div>
                  </div>
                  <figure className="hy-shot">
                    <figcaption className="hy-shot-bar">
                      <Wordmark size={14} ground="navy" suffix={false} />
                      <span className="hy-shot-t">{s.bar}</span>
                    </figcaption>
                    <Image src={s.shot.src} width={s.shot.w} height={s.shot.h} sizes="(max-width: 1320px) 100vw, 1256px" alt={s.shot.alt} />
                    <figcaption className="hy-shot-cap">{s.cap}</figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The rules ── */}
        <section className="hy-whysec" id="control">
          <div className="hy-wrap">
            <span className="hy-kicker hy-kicker--blush">What the software is not allowed to do</span>
            <h2 className="hy-h2 hy-h2--why" style={{ marginTop: 18, maxWidth: "26ch" }}>Engines compute. Models draft words. A licensed human concludes.</h2>
            <div className="hy-guard hy-grid-3">
              <div><span className="k">The opinion</span><h3>Hysaab never signs</h3><p>The opinion is a decision tree a partner walks and records. The report is drafted for the firm to review, and the signed PDF is held as evidence, never produced by the software.</p></div>
              <div><span className="k">Independence</span><h3>A firewall, not a policy</h3><p>Audit records belong to the firm. The client grants read access for a fixed window and can revoke it. A team member who holds a seat in the client organisation is refused by the database itself.</p></div>
              <div><span className="k">The snapshot</span><h3>Testing never touches live books</h3><p>Every procedure runs on an immutable, hashed copy. Figures on screen cite the hash. Nothing in the audit module can write to a ledger.</p></div>
              <div><span className="k">Judgement</span><h3>Some things are human only</h3><p>Inventory counts, inspections and other physical procedures are recorded by the person who performed them. Risk approval, conclusions and the phase gates need a named signature.</p></div>
              <div><span className="k">Arithmetic</span><h3>Code computes, not the model</h3><p>Materiality, sample sizes, projections, tie-outs and the misstatement aggregate are computed deterministically and reproduce exactly. The model writes around the numbers, never the numbers.</p></div>
              <div><span className="k">Citations</span><h3>Flagged until verified</h3><p>Standards references are marked unverified until the firm&apos;s licensed texts are loaded. We would rather show you the gap than let a confident citation into a file you sign.</p></div>
            </div>
          </div>
        </section>

        {/* ── Where it sits ── */}
        <section className="hy-family hy-section hy-rule-b" id="fit">
          <div className="hy-wrap">
            <div className="hy-agents-head" style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="hy-kicker hy-kicker--navy">Where it sits</span>
                <h2 className="hy-h2">Part of the professional services stack.</h2>
              </div>
              <p className="hy-agents-p">hysaab audit is the audit module of <a href="/firms" className="hy-ulink" style={{ display: "inline", borderBottomWidth: 2 }}>hysaab services OS</a>, the operating system we build for tax and advisory firms. Same clients, same file room, same rule that the AI proposes and a person decides. Take it on its own or with the rest of the practice.</p>
            </div>
            <div className="hy-family-grid">
              <div className="hy-product">
                <span className="hy-product-l">For the firm</span>
                <span className="hy-product-title"><a href="/firms" className="hy-product-h">hysaab services OS</a></span>
                <span className="hy-product-p">The practice around the audit: <strong>clients, engagement letters, the filing workbench, time, billing, capacity and people</strong>. A signed letter creates the obligations, and the obligations create the work.</span>
                <a href="/firms" className="hy-ulink">See hysaab services OS →</a>
              </div>
              <div className="hy-product">
                <span className="hy-product-l">For the client&apos;s books</span>
                <span className="hy-product-title"><a href="/accounting" className="hy-product-h">Hysaab</a></span>
                <span className="hy-product-p">When the client keeps its books on Hysaab the snapshot is <strong>one click and already complete</strong>. Pulling the population from a connected ledger or a file upload is the next stage of the build, so today the file starts from a Hysaab snapshot.</span>
                <a href="/accounting" className="hy-ulink">See the accounting product →</a>
              </div>
              <div className="hy-product hy-product--navy">
                <span className="hy-product-l">For an SME, not an audit</span>
                <span className="hy-product-title"><span className="hy-product-h" style={{ color: "var(--hy-cream)" }}>Readiness review</span></span>
                <span className="hy-product-p">The same engines over your own books, before the auditor arrives: <strong>completeness, journal testing, tie-outs and the differences you will be asked about</strong>. It is never called an audit, because it is not one.</span>
                <a href="/contact" className="hy-ulink hy-ulink--cream">Ask for a readiness review →</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Honest state ── */}
        <section className="hy-story hy-section" id="state">
          <div className="hy-wrap hy-why-grid">
            <div className="hy-why-copy">
              <span className="hy-kicker">Where it has got to</span>
              <h2 className="hy-h2">Built against a working methodology, in the open.</h2>
              <p style={{ color: "var(--hy-body)" }}>hysaab audit was written from a clean-sheet ISA methodology rather than a template pack: acceptance through to archive, with the engines proved against a seeded engagement whose misstatements are known in advance. Every release re-runs it and scores what was found, what was missed and what was flagged in error.</p>
              <p style={{ color: "var(--hy-body)" }}>We are opening it to a small group of licensed firms in the UAE and KSA. Founding firms shape the methodology and keep founder pricing for as long as they stay.</p>
            </div>
            <div className="hy-beliefs">
              <div className="hy-belief"><span className="hy-belief-l">Not yet built</span><span className="hy-belief-p">Standards texts under licence, so citations carry a verified reference; the narrative layer that drafts the memos; Arabic labels across the audit screens.</span></div>
              <div className="hy-belief"><span className="hy-belief-p">Comparatives must come from signed prior-year statements. Where they are missing, the file says so rather than inferring them.</span></div>
              <div className="hy-belief hy-belief--promise"><span className="hy-belief-l">Our promise</span><span className="hy-belief-p">We will show you what runs today, label what does not, and never let software make a call your licence is on the line for.</span></div>
            </div>
          </div>
        </section>

        <CtaBand kicker="Founding firms" title="Bring us a file and we will run it." body="hysaab audit opens to a small group of licensed audit firms first. Tell us about your practice and a real person will walk you through an engagement within one working day." />
      </main>
      <MgFooter />
    </div>
  );
}
