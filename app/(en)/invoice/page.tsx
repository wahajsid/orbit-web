import "../../advert.css";
import Image from "next/image";
import { InvoiceTerminal } from "@/components/InvoiceTerminal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { NpEnhance } from "@/components/NpEnhance";

import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Orbit Invoice — every supplier invoice, tax-tested before you claim",
  description:
    "The tax compliance and e-invoice validator for the Gulf. Orbit Invoice reads every supplier invoice, re-checks the arithmetic, tests it against UAE FTA and KSA ZATCA rules, and risk-ranks the VAT you're about to claim.",
  alternates: langAlternates("/invoice"),
};

const HEADLINES: [string, string][] = [
  ["Every invoice says it's", "a tax invoice. Not every one is."],
  ["The FTA will test your invoices.", "Test them first."],
  ["You didn't train for a decade", "to re-add someone else's VAT."],
];

export default function InvoicePage() {
  return (
    <>
      <SmoothScroll />

      <MgNav />

      {/* ── HERO (ink) ──────────────────────────────────────────── */}
      <header className="hero-band on-ink np-hero" id="top">
        <div className="wrap">
          <div style={{ paddingTop: 40 }}>
            <div className="microlabel hero-kicker">ORBIT INVOICE · TAX COMPLIANCE &amp; E-INVOICE VALIDATION</div>
            <RotatingHeadline items={HEADLINES} />
            <p className="hero-sub" style={{ maxWidth: 600 }}>
              Drop a folder of supplier invoices — or email them in. Orbit Invoice reads every
              line, re-checks the arithmetic itself, tests each invoice against the FTA&rsquo;s and
              ZATCA&rsquo;s rules, and risk-ranks the VAT you&rsquo;re about to claim — before the
              return is filed, not after the audit.
            </p>
            <a className="np-scrollcue" href="#live" aria-label="See how it works">
              <span className="tri">▶</span>
              <span className="lab">How Orbit Invoice works</span>
              <span className="chev" aria-hidden="true">↓</span>
            </a>
            <div className="hero-actions">
              <a className="cta" href="#access">Request access</a>
              <a className="np-backlink" href="/">← part of the Orbit family</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ── LIVE: the validation terminal ───────────────────────── */}
        <section className="section wrap np-after-hero" id="live" style={{ paddingTop: 96 }}>
          <InvoiceTerminal />
        </section>

        {/* ── ACT · The exposure ──────────────────────────────────── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE EXPOSURE</div>
            <h2 className="np-head np-rise d1">Input VAT isn&rsquo;t yours <span className="np-accent">until the invoice holds up.</span></h2>
            <div className="np-statrow np-rise d1">
              <span className="np-stat"><span className="n">214</span><span className="l">invoices, dropped or emailed in</span></span>
              <span className="np-arrow">→</span>
              <span className="np-stat"><span className="n">100%</span><span className="l">read, re-added and tax-tested</span></span>
              <span className="np-arrow">→</span>
              <span className="np-stat"><span className="n">9</span><span className="l">flagged before the return went out</span></span>
            </div>
            <p className="np-say np-rise d2">
              A claim is only as strong as the paper behind it. A missing TRN, a supplier who
              charged the wrong rate, a duplicate that slipped through twice — each one is your
              money at risk in an audit. Orbit reads every invoice the day it lands and names
              exactly which field fails, so the problem is a correction request in July, not a
              disallowance in a tax audit.
            </p>
          </div>
        </section>

        {/* ── ACT · The law, as code ──────────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE LAW, AS CODE</div>
            <h2 className="np-head np-rise d1">The rules the FTA enforces, <span className="np-accent">run on every invoice.</span></h2>
            <p className="np-say np-rise d1">
              UAE tax-invoice requirements (Art. 59/60) and KSA&rsquo;s ZATCA e-invoicing rules,
              applied invoice by invoice — and the arithmetic re-checked independently in code,
              so a beautifully formatted invoice that doesn&rsquo;t add up still gets caught.
            </p>
            <div className="np-fair np-rise d2">
              <div className="np-fair-col see">
                <h4>What a valid invoice shows</h4>
                <p className="cap2">tested field by field</p>
                <div className="np-fair-row"><span className="ic">✓</span> The words &ldquo;Tax Invoice&rdquo;, stated</div>
                <div className="np-fair-row"><span className="ic">✓</span> A real, valid supplier TRN</div>
                <div className="np-fair-row"><span className="ic">✓</span> VAT shown properly, at the right rate</div>
                <div className="np-fair-row"><span className="ic">✓</span> Dates, sequence and totals that reconcile</div>
              </div>
              <div className="np-fair-col seal">
                <h4>What Orbit catches</h4>
                <p className="cap2">named, never waved through</p>
                <div className="np-fair-row sealed"><span className="ic">✕</span> TRN missing&nbsp;&nbsp;<span className="val">not a valid tax invoice</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> VAT ≠ 5%&nbsp;&nbsp;<span className="val">arithmetic fails</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> Duplicate&nbsp;&nbsp;<span className="val">same invoice, twice</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> Risky claim&nbsp;&nbsp;<span className="val">held for correction</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ACT · The verdict ───────────────────────────────────── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE VERDICT</div>
            <h2 className="np-head np-rise d1">Every failure named. <span className="np-accent">Every claim defensible.</span></h2>
            <p className="np-say np-rise d1">
              No traffic-light hand-waving. Each invoice gets a verdict with the exact field
              behind it, and the risky VAT is held — with a correction request drafted for the
              supplier — instead of quietly claimed.
            </p>
            <div className="np-script np-rise d2" aria-label="Validation excerpt">
              <div><span className="meta">09:12</span> <span className="who">READ</span> INV-2107 · Al Madar Trading · AED 12,600</div>
              <div><span className="meta">09:12</span> <span className="who">MATH</span> lines Σ 12,000 + VAT 600 = 12,600 ✓</div>
              <div><span className="meta">09:12</span> <span className="who">RULES</span> Art. 59 · supplier TRN <span className="you">missing</span> → not a valid tax invoice</div>
              <div><span className="meta">09:13</span> <span className="who">VERDICT</span> <span className="you">hold AED 600 input VAT · correction requested</span></div>
            </div>
            <div className="np-chips np-rise d1">
              <span className="np-chip"><span className="k">Met</span><span className="b">claim with confidence</span></span>
              <span className="np-chip"><span className="k">Partial</span><span className="b">correction requested first</span></span>
              <span className="np-chip"><span className="k">Failed</span><span className="b">don&rsquo;t claim — reason named</span></span>
              <span className="np-chip"><span className="k">Duplicate</span><span className="b">blocked, second copy traced</span></span>
            </div>
            <div className="np-shot np-rise d1">
              <Image src="/shots/adv-ocr-review.png" alt="Orbit Invoice review — the OCR read, the arithmetic re-check and the Article 59 test with the failing field named" width={1600} height={651} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">The review — what the OCR read on the left, the nine Article 59 criteria on the right, the verdict on top.</div>
          </div>
        </section>

        {/* ── ACT · The register ──────────────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE REGISTER</div>
            <h2 className="np-head np-rise d1">The register your auditor <span className="np-accent">actually wants to see.</span></h2>
            <p className="np-say np-rise d1">
              Every invoice, verdict and claim lands in one register — organised by VAT filing
              period, with what was claimed and what was held. One click exports the whole thing
              to Excel, formatted for the tax file. Your historical tracking sheets import in,
              so the register starts complete, not from zero.
            </p>
            <div className="np-chips np-rise d2">
              <span className="np-chip"><span className="k">Periods</span><span className="b">every VAT quarter tracked</span></span>
              <span className="np-chip"><span className="k">Claims</span><span className="b">claimed vs held, per invoice</span></span>
              <span className="np-chip"><span className="k">Excel</span><span className="b">audit-ready export, one click</span></span>
              <span className="np-chip"><span className="k">History</span><span className="b">your old sheets, imported</span></span>
            </div>
            <div className="np-shot np-rise d1">
              <Image src="/shots/adv-ocr-register.png" alt="Orbit Invoice risk register — every invoice read and risk-ranked, verdicts and claim status on the row" width={1600} height={875} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">The risk register — sorted by audit risk, with what&rsquo;s held, chased and ready to claim.</div>
          </div>
        </section>

        {/* ── WHY WE BUILT THIS (ink band) ────────────────────────── */}
        <section className="why-band on-ink" style={{ marginTop: 0 }}>
          <div className="wrap">
            <div className="microlabel hero-kicker np-rise">WHY WE BUILT THIS</div>
            <h2 className="why-head np-rise d1">We built it for<br />our own tax team first.</h2>
            <div className="why-cols np-rise d1">
              <p>
                A working Gulf tax practice runs on supplier invoices — hundreds a month, every
                one a small bet that the paper holds up. Checking them properly meant late nights
                with a calculator; not checking them meant carrying the risk silently.
              </p>
              <p>
                So we built the checker our own team now runs daily: it reads <strong>every</strong>
                invoice, re-does <strong>every</strong> sum, tests <strong>every</strong> rule the law
                actually enforces — and puts its working on the table, so the judgment call, and the
                client relationship, stay yours.
              </p>
            </div>
            <div className="why-sig np-rise">&mdash; SRW</div>
          </div>
        </section>

        {/* ── ACCESS ──────────────────────────────────────────────── */}
        <section className="section wrap" id="access">
          <h2 className="section-head">Put your invoices to the test.</h2>
          <p className="section-sub">
            Orbit Invoice runs today inside working tax teams, and we&rsquo;re opening it to more.
            Tell us about your invoice volume and jurisdiction — UAE, KSA or both — and we&rsquo;ll
            set you up.
          </p>
          <div className="hero-actions" style={{ marginTop: 26 }}>
            <a className="cta" href="/contact">Request access</a>
            <a className="textlink" href="/" style={{ fontSize: 13.5 }}>Looking for the finance OS? Orbit is here →</a>
          </div>
        </section>
      </main>

      <MgFooter />
      <NpEnhance />
    </>
  );
}
