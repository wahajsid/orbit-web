import Image from "next/image";
import "../advert.css";
import { ProductNav } from "@/components/ProductNav";
import { HireTerminal } from "@/components/HireTerminal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteFooter } from "@/components/SiteChrome";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { NpEnhance } from "@/components/NpEnhance";

export const metadata = {
  title: "Orbit Hire — you interview three, not thirty",
  description:
    "The sister product to Orbit. AI hiring for the Gulf: reads every application, interviews every candidate by voice, and hands you a ranked shortlist — fair by design.",
};

const HEADLINES: [string, string][] = [
  ["You didn't post a role", "to read three hundred CVs."],
  ["You didn't want a résumé.", "You wanted the person."],
  ["You didn't set out", "to hire on a gut feeling."],
];

export default function HirePage() {
  return (
    <>
      <SmoothScroll />

      {/* ── HERO (ink) ──────────────────────────────────────────── */}
      <header className="hero-band on-ink np-hero" id="top">
        <div className="wrap">
          <ProductNav active="hire" cta={{ label: "EARLY ACCESS", href: "#access" }} />

          <div style={{ paddingTop: 40 }}>
            <div className="microlabel hero-kicker">ORBIT HIRE · THE SISTER PRODUCT TO ORBIT</div>
            <RotatingHeadline items={HEADLINES} />
            <p className="hero-sub" style={{ maxWidth: 580 }}>
              Orbit Hire reads every application, interviews every candidate by voice, and hands
              you a ranked shortlist you can defend — fair by design, from the first CV.
            </p>
            <a className="np-scrollcue" href="#live" aria-label="See how it works">
              <span className="tri">▶</span>
              <span className="lab">How Orbit Hire works</span>
              <span className="chev" aria-hidden="true">↓</span>
            </a>
            <div className="hero-actions">
              <a className="cta" href="#access">Request early access</a>
              <a className="np-backlink" href="/">← part of the Orbit family</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ── LIVE: the hiring pipeline terminal ──────────────────── */}
        <section className="section wrap np-after-hero" id="live" style={{ paddingTop: 96 }}>
          <HireTerminal />
        </section>

        {/* ── ACT · The pile ──────────────────────────────────────── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE PILE</div>
            <h2 className="np-head np-rise d1">You don&rsquo;t have a hiring problem. <span className="np-accent">You have a reading problem.</span></h2>
            <div className="np-statrow np-rise d1">
              <span className="np-stat"><span className="n">52</span><span className="l">applications, from four sources</span></span>
              <span className="np-arrow">→</span>
              <span className="np-stat"><span className="n">8</span><span className="l">ranked on the evidence</span></span>
              <span className="np-arrow">→</span>
              <span className="np-stat"><span className="n">3</span><span className="l">you actually interview</span></span>
            </div>
            <p className="np-say np-rise d2">
              Every application read the morning it lands — parsed for skills and evidence, scored
              against your scorecard, and ranked. The busywork that used to eat a week is done
              before your coffee&rsquo;s cold.
            </p>
            <div className="np-shot np-rise d1">
              <Image src="/shots/hire-dashboard.jpg" alt="Orbit Hire — open positions with screening funnels and shortlist counts" width={1600} height={782} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">Positions — every role&rsquo;s funnel and shortlist, at a glance.</div>
          </div>
        </section>

        {/* ── ACT · Fairness by design ────────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">FAIRNESS BY DESIGN</div>
            <h2 className="np-head np-rise d1">It weighs the work. <span className="np-accent">It never sees the name.</span></h2>
            <p className="np-say np-rise d1">
              Protected characteristics are sealed before a single candidate is scored — the model
              can&rsquo;t weigh what it can&rsquo;t see. You unseal a CV only when you choose to, and every
              score stays traceable. Defensible hiring, built in, not bolted on.
            </p>
            <div className="np-fair np-rise d2">
              <div className="np-fair-col see">
                <h4>What Orbit weighs</h4>
                <p className="cap2">the evidence that predicts the job</p>
                <div className="np-fair-row"><span className="ic">✓</span> Skills matched to the scorecard</div>
                <div className="np-fair-row"><span className="ic">✓</span> Evidence in the work itself</div>
                <div className="np-fair-row"><span className="ic">✓</span> Role competencies, scored to a rubric</div>
                <div className="np-fair-row"><span className="ic">✓</span> Answers given in the interview</div>
              </div>
              <div className="np-fair-col seal">
                <h4>What Orbit seals</h4>
                <p className="cap2">stored as categories, never weighed</p>
                <div className="np-fair-row sealed"><span className="ic">✕</span> Name&nbsp;&nbsp;<span className="val">Aisha Al-Farsi</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> Age&nbsp;&nbsp;<span className="val">31 years</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> Nationality&nbsp;&nbsp;<span className="val">Emirati</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> Photo&nbsp;&nbsp;<span className="val">portrait.jpg</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ACT · The interview ─────────────────────────────────── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE INTERVIEW</div>
            <h2 className="np-head np-rise d1">Every candidate gets a <span className="np-accent">real first interview.</span></h2>
            <p className="np-say np-rise d1">
              A warm, structured voice conversation in your competencies — it greets, asks,
              follows up, and never tires at candidate forty. It transcribes itself and scores
              against the rubric, so the evidence is on the table, not in someone&rsquo;s memory.
            </p>
            <div className="np-script np-rise d2" aria-label="Interview excerpt">
              <div><span className="meta">10:21</span> <span className="who">ORBIT</span> &ldquo;Walk me through a month-end you owned end to end.&rdquo;</div>
              <div><span className="meta">10:21</span> <span className="you">CANDIDATE</span> &ldquo;Sure — I ran the close for three entities…&rdquo;</div>
              <div><span className="meta">10:22</span> <span className="who">ORBIT</span> follow-up · &ldquo;How did you handle the intercompany eliminations?&rdquo;</div>
              <div><span className="meta">10:23</span> <span className="who">SCORE</span> <span className="you">ownership 4/5 · technical 5/5 · communication 4/5</span></div>
            </div>
            <div className="np-shot np-rise d1">
              <Image src="/shots/hire-analysis.jpg" alt="Orbit Hire interview analysis — aptitude and interpersonal scoring across a radar, scorecard and assessor panel" width={1600} height={1826} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">Interview analysis — aptitude and interpersonal scoring, each with the evidence behind it.</div>
          </div>
        </section>

        {/* ── ACT · The shortlist ─────────────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE SHORTLIST</div>
            <h2 className="np-head np-rise d1">You interview three, <span className="np-accent">not thirty.</span></h2>
            <p className="np-say np-rise d1">
              Three finalists, each with a one-page brief: what they&rsquo;re strong at, where the risk
              is, and the exact questions to ask next. The reasoning is on the table — and so is
              the audit trail behind every score.
            </p>
            <div className="np-chips np-rise d2">
              <span className="np-chip"><span className="k">Finalist 1</span><span className="b">deep technical · scale gap · probe leadership</span></span>
              <span className="np-chip"><span className="k">Finalist 2</span><span className="b">strong ownership · newer to GCC tax · probe VAT</span></span>
              <span className="np-chip"><span className="k">Finalist 3</span><span className="b">fast learner · thin evidence · ask for samples</span></span>
            </div>
            <div className="np-shot np-rise d1">
              <Image src="/shots/hire-scoring.jpg" alt="Orbit Hire ranked candidates — per-criterion scores, confidence, red flags and the trust & fairness block" width={1600} height={1550} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">Ranked candidates — every score explained, protected characteristics sealed.</div>
            <div className="np-shot np-rise d1">
              <Image src="/shots/hire-radar.jpg" alt="Orbit Hire candidate comparison — an overlaid radar and scorecard matrix across finalists" width={1600} height={1681} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">Compare finalists side by side — a shared radar and scorecard, best-in-row highlighted.</div>
          </div>
        </section>

        {/* ── WHY WE BUILT THIS (ink band) ────────────────────────── */}
        <section className="why-band on-ink" style={{ marginTop: 0 }}>
          <div className="wrap">
            <div className="microlabel hero-kicker np-rise">WHY WE BUILT THIS</div>
            <h2 className="why-head np-rise d1">We were tired of hiring<br />by whoever shouted loudest.</h2>
            <div className="why-cols np-rise d1">
              <p>
                Great people get lost in the pile because no one has time to read three hundred
                CVs fairly — so hiring drifts to the familiar name, the confident talker, the gut
                call. Good candidates never get the conversation, and the bias no one meant to
                have quietly does the choosing.
              </p>
              <p>
                So we built the screener we always wanted: one that reads <strong>every</strong>
                application on the evidence, gives <strong>every</strong> candidate a real first
                interview, and seals the details that shouldn&rsquo;t sway a hire — then hands the
                judgement, and the audit trail, back to you.
              </p>
            </div>
            <div className="why-sig np-rise">&mdash; SRW</div>
          </div>
        </section>

        {/* ── EARLY ACCESS ────────────────────────────────────────── */}
        <section className="section wrap" id="access">
          <h2 className="section-head">Be first to hire with Orbit.</h2>
          <p className="section-sub">
            Orbit Hire is opening to a small first cohort of Gulf teams. Tell us what you&rsquo;re
            hiring for and we&rsquo;ll get you in early.
          </p>
          <div className="hero-actions" style={{ marginTop: 26 }}>
            <a className="cta" href="/contact">Request early access</a>
            <a className="textlink" href="/" style={{ fontSize: 13.5 }}>Looking for the finance OS? Orbit is here →</a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <NpEnhance />
    </>
  );
}
