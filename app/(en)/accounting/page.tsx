/* ── /accounting ─────────────────────────────────────────────────────
   Rebuilt 2026-09 in the V4 design (PageShell + hw-* kit). Preserves
   all compliance claims and workspace screenshots. The old page used
   np-* classes from advert.css; this version uses the hw-* inner-page
   kit from hysaab-home.css. Interactive Terminal kept as-is. */

import Image from "next/image";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { Terminal } from "@/components/Terminal";
import { langAlternates } from "@/lib/site-meta";

export const revalidate = 60;

export const metadata = {
  title: "Automated Bookkeeping & Accounting for UAE and KSA | Hysaab",
  description:
    "AI agents for UAE and Saudi accounting: a coding agent, tax agent, collections agent and reporting agent that plug into your books and run the busywork overnight.",
  alternates: langAlternates("/accounting"),
};

type Shot = { src: string; w: number; h: number; alt: string };

function Feature({ eyebrow, title, body, shot, cap, dark }: { eyebrow: string; title: React.ReactNode; body: React.ReactNode; shot: Shot; cap: string; dark?: boolean }) {
  return (
    <section className={dark ? "hw-block--dark" : "hw-block--rule"}>
      <div className="hw-wrap hw-section">
        <div className="hw-feature">
          <div className="hw-feature-copy">
            <p className="hw-eyebrow">{eyebrow}</p>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
          <div className="hw-shot">
            <Image src={shot.src} width={shot.w} height={shot.h} sizes="(max-width: 760px) 100vw, 55vw" alt={shot.alt} style={{ width: "100%", height: "auto", borderRadius: 4, border: "1px solid var(--hw-hairline)" }} />
            <p className="hw-shot-cap">{cap}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AccountingPage() {
  return (
    <PageShell band={{ title: "We lived the month-end we're deleting.", body: "Every close, the same ritual: receipts chased over WhatsApp, invoices vouched at midnight, a VAT deadline breathing down the quarter. We built the team of agents we always wanted: one for payables, one for tax, one for the close — each doing the busywork, showing its evidence, and leaving the judgement to you." }}>
      <PageHero
        eyebrow="AI agents for accounting, tax and reporting"
        title={<>A team of agents for your books.<br /><span>Built on evidence.</span></>}
        lede="Agents for accounting, tax, collections and reporting. The busywork runs overnight; the judgement stays with you."
      >
        <a className="hw-btn hw-btn--peach" href="/contact">Let&rsquo;s talk <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="#live">Seventy seconds of what it looks like</a>
      </PageHero>

      {/* ── Terminal ── */}
      <section id="live">
        <div className="hw-wrap hw-section">
          <Terminal />
        </div>
      </section>

      <Feature
        dark
        eyebrow="Money out"
        title={<>Every invoice hides two questions: is it coded right, and is the tax deductible?</>}
        body={<>Hysaab codes it on arrival from your own ledger&rsquo;s memory, then tax-tests it against UAE law. This one <strong>fails Article 59</strong> — the supplier TRN is missing — so the input VAT is held, not claimed. And a duplicate is stopped before it ever posts.</>}
        shot={{ src: "/shots/adv-payables.png", w: 1600, h: 1256, alt: "Hysaab Payables — the tax test embedded in the invoice row" }}
        cap="Payables — the tax layer embedded in every row, with its evidence attached."
      />

      <Feature
        eyebrow="The regional layer"
        title={<>Your global tools don&rsquo;t know what the FTA or ZATCA want. This one was built here.</>}
        body={<>VAT and Corporate Tax reconciled every month, each deadline tracked by a watchdog, e-invoices cleared and stored with proof. The AED 200,000 gap? Explained, and cited to the journal.</>}
        shot={{ src: "/shots/adv-tax.png", w: 1600, h: 1011, alt: "Hysaab tax intelligence: VAT and CT reconciliation, filing watchdog, and the Cabinet Decision 149 of 2026 recovery checks" }}
        cap="Tax — the reconciliation, the deadlines and the clearance, in one place."
      />

      <Feature
        dark
        eyebrow="The permanent record"
        title={<>Nothing is ever deleted. Mistakes are reversed in the open.</>}
        body={<>Every journal carries who made it, why, and the document behind it — each posted by a named agent with a confidence score. A close you could hand to an auditor without flinching.</>}
        shot={{ src: "/shots/adv-ledger.png", w: 1600, h: 990, alt: "Hysaab general ledger — journal activity with agent commentary and evidence" }}
        cap="Ledger — every entry explained, its evidence one click away."
      />

      <Feature
        eyebrow="Money in"
        title={<>Who owes you — and what to do about it, already chased.</>}
        body={<>Collection reminders write themselves on a cadence you approve once; nothing sends without you. Write-off exposure is provisioned against your policy, automatically.</>}
        shot={{ src: "/shots/adv-receivables.png", w: 1600, h: 1297, alt: "Hysaab Receivables — collections queue, DSO and the ageing posture" }}
        cap="Receivables — the collections runbook, drafted, chased and reconciled."
      />

      {/* ── The close ── */}
      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">The close</p>
              <h2>Month-end used to be a few weeks.</h2>
            </div>
            <p>Accruals proposed, variances flagged, bank reconciled, VAT drafted — Hysaab&rsquo;s side is done before you open it. What&rsquo;s left is your call. Then you seal the month in one tap, and it can never quietly change again.</p>
          </div>
          <div className="hw-feature">
            <div className="hw-feature-copy">
              <h3>78% done before you woke up.</h3>
              <p>The illustrative close checklist, run on sample data.</p>
            </div>
            <div className="hw-shot">
              <Image src="/shots/adv-close.png" alt="Hysaab close cockpit — the month-end checklist with engine-proposed accruals" width={1600} height={1170} sizes="(max-width: 760px) 100vw, 55vw" style={{ width: "100%", height: "auto", borderRadius: 4, border: "1px solid #3e6356" }} />
              <p className="hw-shot-cap" style={{ color: "var(--hw-cream)" }}>Close cockpit — &ldquo;Hysaab runs this&rdquo; on the left, your ledger&rsquo;s tasks on the right.</p>
            </div>
          </div>
        </div>
      </section>

      <Feature
        eyebrow="One OS, any shape"
        title={<>One business or five. One currency or five. One language or two.</>}
        body={<>Switch entities, consolidate, and flip the whole workspace into Arabic — right-to-left, down to the numerals. The product bends. You don&rsquo;t.</>}
        shot={{ src: "/shots/adv-arabic.png", w: 1600, h: 1360, alt: "Hysaab in Arabic — the full workspace, right to left" }}
        cap="نفس النظام — the same Hysaab, in Arabic, right-to-left."
      />
    </PageShell>
  );
}
