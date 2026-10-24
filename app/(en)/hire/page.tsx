/* ── /hire: Ibtidah ───────────────────────────────────────────────────
   Rebuilt 2026-10-25 in the homepage's Tick & Tie language (W/P strips,
   the highlighter, a work film in the hero). Points to ibtidah.ae as the
   product's own site. Everything on the September page is kept: why we
   went into recruitment, the five stages, the roles, and the Ibtidah card.
   The film is an illustrative search, its counts invented for the sample
   and labelled so. */

import Image from "next/image";
import { SiteHeader } from "@/components/home/HomeHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Wp, Tm } from "@/components/home/tt/Wp";
import { WorkFilm } from "@/components/home/WorkFilm";

export const metadata = {
  title: "Ibtidah, finance recruitment with humans in the loop",
  description:
    "Ibtidah finds finance people through work-based assessment: AI reads and questions every candidate, and finance professionals decide the shortlist.",
  alternates: { canonical: "./" },
};

const STAGES: { n: string; h: string; p: string; who: "AI" | "Human" }[] = [
  { n: "01", h: "The role, written by finance people", p: "We start from what the job actually requires: the close, the systems, the tax regime, the reporting. Not a template of keywords.", who: "Human" },
  { n: "02", h: "Every application read in full", p: "AI reads each CV, cover note and portfolio the same careful way, and maps the claimed experience against the role. Nothing is filtered on a keyword or a school name.", who: "AI" },
  { n: "03", h: "A working test, not a phone call", p: "Candidates work through real finance scenarios: reconcile a statement, spot the input VAT that would not survive an audit, explain what moved in a management pack. The AI probes the answers with follow-up questions.", who: "AI" },
  { n: "04", h: "A finance professional reviews the evidence", p: "Someone who has run a close reads the transcripts and the work, checks the judgement behind the answers, and decides who moves forward. Experience is verified, not assumed.", who: "Human" },
  { n: "05", h: "A shortlist you can defend", p: "Three to five people, each with the evidence of what they did in the test and why our reviewer believes them. You interview the people, not the pile.", who: "Human" },
];

const ROLES: [string, string][] = [
  ["Chief financial officers", "Strategy, capital, board reporting and the discipline to keep the numbers honest under pressure."],
  ["Finance directors and controllers", "The close, controls, consolidation and a team that can run without heroics."],
  ["Heads of tax", "UAE corporate tax, VAT and transfer pricing, tested on real cases rather than recited rules."],
  ["Accountants and senior accountants", "Coding, reconciliations, accruals and the judgement to ask when something does not fit."],
  ["FP&A and reporting", "Management packs that explain what moved and why, traced to the ledger."],
  ["Audit and internal audit", "People who read evidence for a living and can defend a finding."],
];

export default function HirePage() {
  return (
    <div className="hw-page tt-page" id="top">
      <a href="#main" className="hw-skip">Skip to the content</a>
      <span data-motion-page="full" hidden />
      <SiteHeader />
      <main id="main">
        {/* ── I-1 The promise and a search running ── */}
        <section className="tt-sec tt-grid tt-hero tt-hero3">
          <div className="hw-wrap">
            <Wp r="I-1" right={<>Read by <b>AI</b> · Decided by <b>finance people</b></>}>Ibtidah · hiring, from the Hysaab family</Wp>
            <div className="tt-hero2-g tt-hero3-g">
              <div className="tt-hero2-copy">
                <h1>A CV can be written. <span className="tt-hl">The work cannot be faked.</span></h1>
                <p className="tt-hero-sub">When agents do the work, you need fewer, stronger reviewers. Ibtidah finds them: finance recruitment that tests whether a candidate truly knows the work, with experienced finance people making every call.</p>
                <div className="tt-acts tt-hero2-acts">
                  <a className="hw-btn hw-btn--navy m-cta" href="https://ibtidah.ae" target="_blank" rel="noopener">Start a search at ibtidah.ae <span aria-hidden="true">↗</span><span className="hw-sr"> (opens in a new tab)</span></a>
                  <a className="tt-link" href="#how">How a search runs <span aria-hidden="true">↓</span></a>
                </div>
              </div>
              <WorkFilm
                bar="Ibtidah · Financial controller · Dubai" tag="Illustrative" title="One search"
                sr="Illustration of an Ibtidah search: the role is written by finance people, every application is read, candidates take a working test with AI follow-up questions, a finance professional reviews the evidence, and a shortlist of four goes to the hiring manager with the evidence attached."
                cap="Illustrative search · counts invented for the sample"
                rows={[
                  { label: "Role", task: "The role, written by finance people", done: "Close, IFRS 16, Xero, UAE CT" },
                  { label: "Read", task: "Every application read in full", done: "212 read · 38 mapped to the role" },
                  { label: "Test", task: "A working test, not a phone call", done: "21 completed · AI follow-ups on every answer" },
                  { label: "Review", task: "A finance professional reads the evidence", done: "9 reviewed · judgement checked" },
                  { label: "List", task: "A shortlist you can defend", done: "4 people · transcripts attached" },
                ]}
                final={{ k: "Shortlist ready", h: "4 people worth your hour", s: "Each with the work they did and why our reviewer believes them", sign: "Your interview decides" }}
              />
            </div>
          </div>
        </section>

        {/* ── I-2 Why we went into recruitment ── */}
        <section className="tt-sec" aria-labelledby="ib-why-h">
          <div className="hw-wrap">
            <Wp r="I-2" right="Separate product · same standard of evidence">Why we went into recruitment</Wp>
            <h2 className="tt-h2" id="ib-why-h" data-reveal="">A phone call can be rehearsed. <span className="tt-hl" data-play="">The work cannot.</span></h2>
            <p className="tt-lead">Ibtidah is operated by Oblique, the team behind Hysaab. Separate product, separate subscription, same standard of evidence.</p>
            <div className="tt-ways" data-reveal="stagger-lg">
              <article>
                <p className="tt-who">The ordinary way</p>
                <h3>A resume and a call.</h3>
                <p>Most recruiters judge finance experience from a CV and a short phone screen. Both can be shaped: a title inflated, a system name dropped in, a close described that someone else ran. The hiring manager finds out in month three.</p>
                <ul className="tt-list tt-list--old"><li><s>Evidence</s><span>claimed, not shown</span></li><li><s>Judgement</s><span>a generalist recruiter, on volume</span></li><li><s>Outcome</s><span>thirty interviews to find one</span></li></ul>
              </article>
              <p className="tt-or" aria-hidden="true">vs</p>
              <article>
                <p className="tt-who">The Ibtidah way</p>
                <h3>The work, then a person who knows it.</h3>
                <p>Every candidate works through real finance scenarios and is questioned on their answers by AI that does not tire or skim. Then a finance professional reads the evidence and decides.</p>
                <ul className="tt-list"><li><Tm m="✓" /><span><strong>Evidence:</strong> demonstrated in a test, transcripts attached</span></li><li><Tm m="✓" /><span><strong>Judgement:</strong> a finance professional who has run the close</span></li><li><Tm m="✓" /><span><strong>Outcome:</strong> three to five people worth your hour</span></li></ul>
              </article>
            </div>
          </div>
        </section>

        {/* ── I-3 How a search runs ── */}
        <section className="tt-sec tt-grid" id="how" aria-labelledby="ib-how-h">
          <div className="hw-wrap">
            <Wp r="I-3" right="Every stage logged">How a search runs</Wp>
            <h2 className="tt-h2" id="ib-how-h" data-reveal="">Five stages. AI does the reading; <span className="tt-hl" data-play="">people make the calls.</span></h2>
            <p className="tt-lead">Every stage is logged, so you can see why each person was advanced or not.</p>
            <ol className="tt-steps tt-phases" data-reveal="stagger-lg">
              {STAGES.map((s) => <li key={s.n}><span className="tt-step-n">{s.n}</span><div><h3>{s.h} <span className={`tt-st${s.who === "Human" ? " tt-st--ok" : ""}`}>{s.who}</span></h3><p>{s.p}</p></div></li>)}
            </ol>
          </div>
        </section>

        {/* ── I-4 Who Ibtidah places ── */}
        <section className="tt-sec" aria-labelledby="ib-roles-h">
          <div className="hw-wrap">
            <Wp r="I-4" right="Scoped and reviewed by a finance professional">Who Ibtidah places</Wp>
            <h2 className="tt-h2" id="ib-roles-h" data-reveal="">Finance roles, mid to senior, <span className="tt-hl" data-play="">across the Gulf.</span></h2>
            <p className="tt-lead">Every candidate is tested on the work the role actually contains.</p>
            <div className="tt-areas" data-reveal="stagger-lg">
              {ROLES.map(([h, p]) => <article key={h}><h3>{h}</h3><p>{p}</p></article>)}
            </div>
          </div>
        </section>

        {/* ── I-5 Hiring lives at ibtidah.ae ── */}
        <section className="tt-sec tt-memory" aria-labelledby="ib-go-h">
          <div className="hw-wrap">
            <Wp r="I-5" right="Its own site, team and subscription">Ibtidah by Oblique</Wp>
            <div className="tt-ib">
              <div>
                <h2 className="tt-h2" id="ib-go-h">Hiring lives <span className="tt-hl">at ibtidah.ae.</span></h2>
                <p className="tt-lead">Ibtidah has its own site, its own team and its own subscription. Hysaab customers are welcome, and nothing from your books is shared with the recruitment side. If you are hiring into finance, start there.</p>
                <div className="tt-acts" style={{ marginTop: 28 }}>
                  <a className="hw-btn hw-btn--blush" href="https://ibtidah.ae" target="_blank" rel="noopener">Go to ibtidah.ae <span aria-hidden="true">↗</span><span className="hw-sr"> (opens in a new tab)</span></a>
                  <a className="tt-link" href="/contact">Ask us first <span aria-hidden="true">→</span></a>
                </div>
              </div>
              <a className="tt-ib-logo" href="https://ibtidah.ae" target="_blank" rel="noopener" aria-label="ibtidah.ae (opens in a new tab)">
                <Image src="/brand/partners/ibtidah-by-oblique-light.png" alt="ibtidah by oblique" width={1391} height={725} style={{ width: "100%", height: "auto" }} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
