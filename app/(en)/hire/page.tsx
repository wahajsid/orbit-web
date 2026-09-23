/* ── /hire ───────────────────────────────────────────────────────────
   Rebuilt 2026-09 in the V4 design (PageShell + hw-* kit). Points to
   ibtidah.ae as the main product site. Content preserved. */

import Image from "next/image";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Ibtidah, finance recruitment with humans in the loop",
  description:
    "Ibtidah finds finance people through work-based assessment: AI reads and questions every candidate, and finance professionals decide the shortlist.",
  alternates: { canonical: "./" },
};

const STAGES: { n: string; h: string; p: string; who: string }[] = [
  { n: "01", h: "The role, written by finance people", p: "We start from what the job actually requires: the close, the systems, the tax regime, the reporting. Not a template of keywords.", who: "Human" },
  { n: "02", h: "Every application read in full", p: "AI reads each CV, cover note and portfolio the same careful way, and maps the claimed experience against the role. Nothing is filtered on a keyword or a school name.", who: "AI" },
  { n: "03", h: "A working test, not a phone call", p: "Candidates work through real finance scenarios: reconcile a statement, spot the input VAT that would not survive an audit, explain what moved in a management pack. The AI probes the answers with follow-up questions.", who: "AI" },
  { n: "04", h: "A finance professional reviews the evidence", p: "Someone who has run a close reads the transcripts and the work, checks the judgement behind the answers, and decides who moves forward. Experience is verified, not assumed.", who: "Human" },
  { n: "05", h: "A shortlist you can defend", p: "Three to five people, each with the evidence of what they did in the test and why our reviewer believes them. You interview the people, not the pile.", who: "Human" },
];

export default function HirePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Hiring · from the Hysaab family"
        title={<>We knew what good finance people look like. So we built the way to find them.</>}
        lede="When agents do the work, you need fewer, stronger reviewers. Ibtidah finds them: finance recruitment that tests whether a candidate truly knows the work, with experienced finance people making every call."
      >
        <a className="hw-btn hw-btn--peach" href="https://ibtidah.ae" target="_blank" rel="noopener">Visit ibtidah.ae <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="#how">How it works</a>
      </PageHero>

      {/* ── Why ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Why we went into recruitment</p>
              <h2>A CV can be written. A phone call can be rehearsed.<br /><span>The work cannot be faked.</span></h2>
            </div>
            <p>Ibtidah is operated by Oblique, the team behind Hysaab. Separate product, separate subscription, same standard of evidence.</p>
          </div>
          <div className="hw-cards hw-cards--2">
            <article>
              <p className="hw-eyebrow">The ordinary way</p>
              <h3>A resume and a call.</h3>
              <p>Most recruiters judge finance experience from a CV and a short phone screen. Both can be shaped: a title inflated, a system name dropped in, a close described that someone else ran. The hiring manager finds out in month three.</p>
              <ul className="hw-ticks">
                <li><strong>Evidence</strong> — claimed, not shown</li>
                <li><strong>Judgement</strong> — a generalist recruiter, on volume</li>
                <li><strong>Outcome</strong> — thirty interviews to find one</li>
              </ul>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">The Ibtidah way</p>
              <h3>The work, then a person who knows it.</h3>
              <p>Every candidate works through real finance scenarios and is questioned on their answers by AI that does not tire or skim. Then a finance professional reads the evidence and decides.</p>
              <ul className="hw-ticks">
                <li><strong>Evidence</strong> — demonstrated in a test, transcripts attached</li>
                <li><strong>Judgement</strong> — a finance professional who has run the close</li>
                <li><strong>Outcome</strong> — three to five people worth your hour</li>
              </ul>
              <a className="hw-link" href="https://ibtidah.ae" target="_blank" rel="noopener">Start a search at ibtidah.ae <span aria-hidden="true">↗</span></a>
            </article>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">How a search runs</p>
              <h2>Five stages. AI does the reading; people make the calls.</h2>
            </div>
            <p>Every stage is logged, so you can see why each person was advanced or not.</p>
          </div>
          <div className="hw-rows">
            {STAGES.map((s) => (
              <article key={s.n}>
                <span className="hw-mono">{s.n}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Who Ibtidah places</p>
              <h2>Finance roles, mid to senior,<br /><span>across the Gulf.</span></h2>
            </div>
            <p>Every search is scoped and reviewed by a finance professional, and every candidate is tested on the work the role actually contains.</p>
          </div>
          <div className="hw-cards">
            {[
              ["Chief financial officers", "Strategy, capital, board reporting and the discipline to keep the numbers honest under pressure."],
              ["Finance directors and controllers", "The close, controls, consolidation and a team that can run without heroics."],
              ["Heads of tax", "UAE corporate tax, VAT and transfer pricing, tested on real cases rather than recited rules."],
              ["Accountants and senior accountants", "Coding, reconciliations, accruals and the judgement to ask when something does not fit."],
              ["FP&A and reporting", "Management packs that explain what moved and why, traced to the ledger."],
              ["Audit and internal audit", "People who read evidence for a living and can defend a finding."],
            ].map(([h, p]) => (
              <article key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ibtidah card ── */}
      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-split" style={{ alignItems: "center" }}>
            <div>
              <p className="hw-eyebrow">Ibtidah by Oblique</p>
              <h2>Hiring lives at ibtidah.ae.</h2>
              <p style={{ color: "var(--hw-dark-supporting)", marginTop: 16, lineHeight: 1.75 }}>Ibtidah has its own site, its own team and its own subscription. Hysaab customers are welcome, and nothing from your books is shared with the recruitment side. If you are hiring into finance, start there.</p>
              <div style={{ display: "flex", gap: 16, marginTop: 28 }}>
                <a className="hw-btn hw-btn--peach" href="https://ibtidah.ae" target="_blank" rel="noopener">Go to ibtidah.ae <span aria-hidden="true">↗</span></a>
                <a className="hw-link" href="/contact" style={{ color: "var(--hw-dark-supporting)" }}>Ask us first <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
              <a href="https://ibtidah.ae" target="_blank" rel="noopener" aria-label="ibtidah.ae" style={{ display: "block", width: "min(320px, 80%)" }}>
                <Image src="/brand/partners/ibtidah-by-oblique-dark.png" alt="ibtidah by oblique" width={1391} height={725} style={{ width: "100%", height: "auto" }} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
