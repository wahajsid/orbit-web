import Image from "next/image";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { CtaBand } from "@/components/hysaab/CtaBand";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Ibtidah, finance recruitment with humans in the loop",
  description:
    "Ibtidah is where Hysaab's expertise went next: finance recruitment that tests whether a CFO, controller or accountant truly knows the work. AI reads and questions every candidate; experienced finance people make the call. ibtidah.ae.",
  alternates: langAlternates("/hire"),
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
    <div className="hy-page">
      <MgNav />
      <main>
        {/* ── Hero (navy) ── */}
        <section className="hy-hero" id="top">
          <div className="hy-wrap hy-hero-grid">
            <div className="hy-hero-copy">
              <span className="hy-kicker hy-kicker--blush">Hiring · from the Hysaab family</span>
              <h1 className="hy-hero-h1">We knew what good finance people look like. So we built the way to find them.</h1>
              <p className="hy-hero-p">Ibtidah is where our expertise went next: finance recruitment that tests whether a candidate truly knows the work, with AI doing the reading and the questioning, and experienced finance people making every call.</p>
              <div className="hy-hero-cta">
                <a href="https://ibtidah.ae" target="_blank" rel="noopener" className="hy-btn hy-btn--blush hy-btn--lg">Visit ibtidah.ae →</a>
                <a href="#how" className="hy-btn hy-btn--outline-cream hy-btn--lg">How it works</a>
              </div>
              <div className="hy-stats">
                <div className="hy-stat"><span className="hy-stat-n hy-num">100%</span><span className="hy-stat-l">of applications read in full, not keyword-filtered</span></div>
                <div className="hy-stat"><span className="hy-stat-n hy-num">1 test</span><span className="hy-stat-l">of real finance work before any interview</span></div>
                <div className="hy-stat"><span className="hy-stat-n hy-num">3 to 5</span><span className="hy-stat-l">verified people on the shortlist you receive</span></div>
              </div>
            </div>
            <div className="hy-ticker" style={{ justifyContent: "center", alignItems: "center", padding: 48 }}>
              <a href="https://ibtidah.ae" target="_blank" rel="noopener" aria-label="ibtidah.ae" style={{ display: "block", width: "min(360px, 80%)" }}>
                <Image src="/brand/partners/ibtidah-light.png" alt="ibtidah" width={1391} height={374} style={{ width: "100%", height: "auto" }} priority />
              </a>
              <span className="hy-ticker-kicker" style={{ marginTop: 28 }}>Executive finance recruitment</span>
              <span style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--hy-on-navy)", textAlign: "center", maxWidth: "36ch", marginTop: 10 }}>CFOs, finance directors, heads of tax, controllers and the accountants who keep the books honest. Placed by people who have done the job.</span>
            </div>
          </div>
        </section>

        {/* ── Why (white) ── */}
        <section className="hy-story hy-section hy-rule-b" id="why">
          <div className="hy-wrap">
            <div className="hy-story-head">
              <div className="hy-story-title">
                <span className="hy-kicker">Why we went into recruitment</span>
                <h2 className="hy-h2 hy-h2--wide">A CV can be written. A phone call can be rehearsed. The work cannot be faked.</h2>
              </div>
              <span className="hy-story-note">Ibtidah is operated by Oblique, the team behind Hysaab. Separate product, separate subscription, same standard of evidence.</span>
            </div>
            <div className="hy-ways-grid" style={{ marginTop: 36 }}>
              <div className="hy-way">
                <span className="hy-way-for">The ordinary way</span>
                <span className="hy-way-h">A resume and a call.</span>
                <p className="hy-way-p">Most recruiters judge finance experience from a CV and a short phone screen. Both can be shaped: a title inflated, a system name dropped in, a close described that someone else ran. The hiring manager finds out in month three.</p>
                <ul className="hy-way-list">
                  <li><strong>Evidence</strong><span>Claimed, not shown.</span></li>
                  <li><strong>Judgement</strong><span>A generalist recruiter, on volume.</span></li>
                  <li><strong>Outcome</strong><span>Thirty interviews to find one.</span></li>
                </ul>
              </div>
              <div className="hy-way hy-way--navy">
                <span className="hy-way-for">The Ibtidah way</span>
                <span className="hy-way-h">The work, then a person who knows it.</span>
                <p className="hy-way-p">Every candidate works through real finance scenarios and is questioned on their answers by AI that does not tire or skim. Then a finance professional reads the evidence and decides. Humans stay in the loop on every judgement, and the same rigour we put into a ledger goes into a hire.</p>
                <ul className="hy-way-list">
                  <li><strong>Evidence</strong><span>Demonstrated in a test, transcripts attached.</span></li>
                  <li><strong>Judgement</strong><span>A finance professional who has run the close.</span></li>
                  <li><strong>Outcome</strong><span>Three to five people worth your hour.</span></li>
                </ul>
                <a href="https://ibtidah.ae" target="_blank" rel="noopener" className="hy-btn hy-btn--blush hy-btn--lg hy-way-cta">Start a search at ibtidah.ae →</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works (cream) ── */}
        <section className="hy-voices hy-section hy-rule-b" id="how">
          <div className="hy-wrap">
            <div className="hy-voices-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span className="hy-kicker">How a search runs</span>
                <h2 className="hy-h2">Five stages. AI does the reading; people make the calls.</h2>
              </div>
              <span className="hy-note">Every stage is logged, so you can see why each person was advanced or not.</span>
            </div>
            <div className="hy-beats" style={{ marginTop: 32, borderTop: "2px solid var(--hy-ink)" }}>
              {STAGES.map((s) => (
                <div className="hy-beat" key={s.n} style={{ opacity: 1, cursor: "default" }}>
                  <span className="hy-beat-time"><span className="hy-beat-t">{s.n}</span><span className="hy-beat-bar" style={{ background: s.who === "Human" ? "var(--hy-navy)" : "var(--hy-blush)" }} /></span>
                  <span className="hy-beat-body">
                    <span className="hy-beat-h">{s.h} <span className="hy-way-chip" style={{ fontSize: 10.5, marginLeft: 8, verticalAlign: "middle", background: s.who === "Human" ? "var(--hy-navy)" : "transparent", color: s.who === "Human" ? "var(--hy-cream)" : "var(--hy-navy)" }}>{s.who}</span></span>
                    <span className="hy-beat-p">{s.p}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Roles (blush) ── */}
        <section className="hy-agents hy-section">
          <div className="hy-wrap">
            <div className="hy-agents-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="hy-kicker hy-kicker--navy">Who Ibtidah places</span>
                <h2 className="hy-h2">Finance roles, mid to senior, across the Gulf.</h2>
              </div>
              <p className="hy-agents-p">Every search is scoped and reviewed by a finance professional, and every candidate is tested on the work the role actually contains. The list below is where the method has been proven.</p>
            </div>
            <div className="hy-agents-grid">
              {[
                ["Chief financial officers", "Strategy, capital, board reporting and the discipline to keep the numbers honest under pressure."],
                ["Finance directors and controllers", "The close, controls, consolidation and a team that can run without heroics."],
                ["Heads of tax", "UAE corporate tax, VAT and transfer pricing, tested on real cases rather than recited rules."],
                ["Accountants and senior accountants", "Coding, reconciliations, accruals and the judgement to ask when something does not fit."],
                ["FP&A and reporting", "Management packs that explain what moved and why, traced to the ledger."],
                ["Audit and internal audit", "People who read evidence for a living and can defend a finding."],
              ].map(([h, p]) => (
                <div className="hy-agent" key={h}><span className="hy-agent-h">{h}</span><span className="hy-agent-p">{p}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ibtidah card (cream) ── */}
        <section className="hy-family hy-section hy-rule-b">
          <div className="hy-wrap hy-cohort-grid">
            <div className="hy-cohort-copy">
              <span className="hy-kicker">Ibtidah by Oblique</span>
              <h2 className="hy-h2">Hiring lives at ibtidah.ae.</h2>
              <p className="hy-cohort-p">Ibtidah has its own site, its own team and its own subscription. Hysaab customers are welcome, and nothing from your books is shared with the recruitment side. If you are hiring into finance, start there.</p>
              <div className="hy-hero-cta">
                <a href="https://ibtidah.ae" target="_blank" rel="noopener" className="hy-btn hy-btn--navy hy-btn--lg">Go to ibtidah.ae →</a>
                <a href="/contact" className="hy-btn hy-btn--outline hy-btn--lg">Ask us first</a>
              </div>
            </div>
            <div className="hy-ledger" style={{ alignItems: "center", justifyContent: "center", minHeight: 240 }}>
              <a href="https://ibtidah.ae" target="_blank" rel="noopener" aria-label="ibtidah.ae" style={{ display: "block", width: "min(320px, 80%)" }}>
                <Image src="/brand/partners/ibtidah-by-oblique-dark.png" alt="ibtidah by oblique" width={1391} height={725} style={{ width: "100%", height: "auto" }} />
              </a>
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <MgFooter />
    </div>
  );
}
