import "../../advert.css";
import Image from "next/image";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Orbit — One system, six modules, every dirham accounted for.",
  description:
    "Payables, receivables, the ledger, the close, documents and tax — each run by agents, each answerable to you.",
  alternates: langAlternates("/product"),
};

/* ── /product — 1:1 port of orbit-product.dc.html ────────────────────
   Six module sections alternating copy and UI vignette in a 2-col ruled
   grid. Copy always precedes its vignette in the DOM so a phone stacks
   text-first; desktop alternation is done in CSS (mg-prod-row-flip). */

export default function Page() {
  return (
    <>
      <MgNav active="product" />

      <main>
        {/* ── Page header ─────────────────────────────────────────── */}
        <section className="mg-prod-hero">
          <div className="mg-kicker">THE PRODUCT</div>
          <h1 className="mg-prod-h">One system, six modules, every dirham accounted for.</h1>
          <p className="mg-prod-lede">Payables, receivables, the ledger, the close, documents and tax — each run by agents, each answerable to you.</p>
        </section>

        {/* ── 01 · PAYABLES — copy left, intake vignette right ────── */}
        <section className="mg-prod-row">
          <div className="mg-prod-copy">
            <div className="mg-kicker">01 · Payables</div>
            <h2 className="mg-prod-mh">Invoices arrive. Bills get paid. Nothing slips.</h2>
            <p className="mg-prod-mp">WhatsApp, email or Telegram a document and the intake line takes over: classified, extracted, coded from your history, tax-tested and checked for duplicates — usually before you&rsquo;ve put your phone down. Only the uncertain ones ask for you.</p>
            <div className="mg-prod-metrics">
              <span><b>≤ 3 min</b> intake to coded</span>
              <span><b>100%</b> duplicate-guarded</span>
            </div>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <Image src="/shots/adv-payables.png" alt="Orbit Payables — open payables with the tax layer embedded in every row" width={1600} height={1273} sizes="(max-width: 900px) 100vw, 620px" />
            </div>
          </div>
        </section>

        {/* ── 02 · RECEIVABLES — vignette left, copy right ────────── */}
        <section className="mg-prod-row mg-prod-row-flip">
          <div className="mg-prod-copy">
            <div className="mg-kicker">02 · Receivables</div>
            <h2 className="mg-prod-mh">Polite, persistent, and never forgets to chase.</h2>
            <p className="mg-prod-mp">Collection agents draft and dispatch reminders on a cadence you approve once. Incoming payments are matched to the bank automatically; write-off exposure is measured against your policy, not a guess.</p>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <Image src="/shots/adv-receivables.png" alt="Orbit Receivables — the collections queue, DSO and ageing posture" width={1600} height={1297} sizes="(max-width: 900px) 100vw, 620px" />
            </div>
          </div>
        </section>

        {/* ── 03 · LEDGER — copy left, journal vignette right ─────── */}
        <section className="mg-prod-row">
          <div className="mg-prod-copy">
            <div className="mg-kicker">03 · Ledger</div>
            <h2 className="mg-prod-mh">Every journal explains itself.</h2>
            <p className="mg-prod-mp">Each entry carries its agent&rsquo;s commentary and the full evidence bundle — the source document, the OCR corroboration, the confidence score. Open any number and see exactly why it&rsquo;s there.</p>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <Image src="/shots/adv-ledger.png" alt="Orbit general ledger — journal activity with agent commentary and evidence" width={1600} height={946} sizes="(max-width: 900px) 100vw, 620px" />
            </div>
          </div>
        </section>

        {/* ── 04 · THE CLOSE — vignette left, copy right ──────────── */}
        <section className="mg-prod-row mg-prod-row-flip">
          <div className="mg-prod-copy">
            <div className="mg-kicker">04 · The close</div>
            <h2 className="mg-prod-mh">Month-end runs itself down to a short list.</h2>
            <p className="mg-prod-mp">The cockpit shows what&rsquo;s done, what&rsquo;s posting and what needs a human. When every gate is green, you close and lock — and the lock is enforced everywhere, agents included.</p>
            <div className="mg-prod-metrics">
              <span><b>3 days</b> typical close</span>
              <span><b>2</b> decisions this month</span>
            </div>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <Image src="/shots/adv-close.png" alt="Orbit close cockpit — Orbit's side done, your ledger's side listed, the lock gated" width={1600} height={1169} sizes="(max-width: 900px) 100vw, 620px" />
            </div>
          </div>
        </section>

        {/* ── 05 · DOCUMENTS — copy left, vault screenshot right ──── */}
        <section className="mg-prod-row">
          <div className="mg-prod-copy">
            <div className="mg-kicker">05 · Documents</div>
            <h2 className="mg-prod-mh">A vault, not a shoebox.</h2>
            <p className="mg-prod-mp">Every document sha-deduped, org-scoped and linked to its journal. Search by supplier, amount or period — the evidence is one click from the number.</p>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <Image src="/shots/adv-documents.png" alt="Orbit Documents — the evidence vault, every file linked to its journal" width={1600} height={1080} sizes="(max-width: 900px) 100vw, 620px" />
            </div>
          </div>
        </section>

        {/* ── 06 · TAX — screenshot left, copy right ───────────────── */}
        <section className="mg-prod-row mg-prod-row-flip">
          <div className="mg-prod-copy">
            <div className="mg-kicker">06 · Tax &amp; compliance</div>
            <h2 className="mg-prod-mh">FTA-grade, before you file.</h2>
            <p className="mg-prod-mp">Article 59 tested on every invoice, input VAT held until documents qualify, e-invoicing ready ahead of the mandate. Your VAT return assembles itself as the month runs.</p>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <Image src="/shots/adv-tax.png" alt="Orbit tax — VAT–CT reconciliation, deadlines and clearance in one place" width={1600} height={1011} sizes="(max-width: 900px) 100vw, 620px" />
            </div>
          </div>
        </section>

        {/* ── Green CTA band ──────────────────────────────────────── */}
        <section className="mg-prod-cta">
          <h2 className="mg-prod-cta-h">See it run on your own books.</h2>
          <div className="mg-poster-cta">
            <a href="/#join" className="mg-cta mg-cta-on-green">Book a demo →</a>
            <a href="/" className="mg-ghost mg-ghost-on-green">Back to home</a>
          </div>
        </section>
      </main>

      <MgFooter />
    </>
  );
}
