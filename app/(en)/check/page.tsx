/* ── /check ──────────────────────────────────────────────────────────
   The Books Check landing page (2026-09-23): the free front door to
   Hysaab. Short and bold by the owner's instruction: one hook, what it
   catches, one sample, the price, the button. The product lives in the
   app at app.hysaab.ai/check; the form at the foot is the human path.
   The sample report is illustrative and labelled as such. */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { EnquiryForm } from "@/components/home/EnquiryForm";

export const metadata = {
  title: "Books Check by Hysaab: connect your books, see what we catch",
  description:
    "Connect Xero or QuickBooks read-only. In a minute Hysaab reads every line of the year and tells you what to fix, ranked by the money at stake. UAE and KSA VAT and corporate tax checks. First check free.",
  alternates: { canonical: "./" },
};

const APP = "https://app.hysaab.ai/check";

const CATCHES: { k: string; h: string; p: string }[] = [
  { k: "Twice", h: "The same bill, paid twice.", p: "Same supplier, same amount, days apart. A journal posted three times by a sync." },
  { k: "Wrong home", h: "A laptop in office supplies.", p: "Capital items expensed, freight in stationery, the owner's shopping in the company's books." },
  { k: "Tax", h: "VAT that will not survive a return.", p: "5 % on an export, input VAT never claimed, tax that is not the rate. UAE and KSA rules." },
  { k: "Parked", h: "Money left in suspense.", p: "Holding accounts never cleared, bank lines never matched, balances the wrong way round." },
];

const SAMPLE: { money: string; what: string; fix: string }[] = [
  { money: "AED 48,300", what: "Suspense account has carried a balance since March.", fix: "Reclassify the six supplier payments to the bills they settled." },
  { money: "AED 12,600", what: "VAT charged at 5 % on an export sale that is zero-rated.", fix: "Credit note, reissue at 0 % with the export evidence." },
  { money: "AED 9,800", what: "The same Etisalat bill paid twice, four days apart.", fix: "Ask for the refund or apply it to the next bill." },
  { money: "AED 7,450", what: "A MacBook booked as office supplies.", fix: "Capitalise it and depreciate from the purchase month." },
];

export default function CheckPage() {
  return (
    <PageShell band={{ kicker: "Books Check", title: "Your first check is free.", body: "Connect Xero or QuickBooks read-only. The report is yours in about a minute. Nothing is written to your books." }}>
      <PageHero
        eyebrow="Books Check · free · read-only"
        title={<>Connect your books.<br /><span>See what Hysaab catches.</span></>}
        lede="One minute. Every line of the year read. What to fix, ranked by the money at stake, with the fix in one sentence."
      >
        <a className="hw-btn hw-btn--peach" href={APP}>Connect your books <span aria-hidden="true">→</span></a>
        <a className="hw-link hw-link--light" href="#sample">See a sample report</a>
      </PageHero>

      {/* ── What it catches ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">What it catches</p>
              <h2>Books look fine until someone reads every line.</h2>
            </div>
          </div>
          <div className="hw-cards hw-cards--4">
            {CATCHES.map((c) => (
              <article key={c.k}>
                <p className="hw-eyebrow">{c.k}</p>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample ── */}
      <section id="sample">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">What a report says</p>
              <h2>Ranked by the money at stake.</h2>
            </div>
          </div>
          <div className="hw-rows">
            {SAMPLE.map((s) => (
              <article key={s.money}>
                <span className="hw-mono">{s.money}</span>
                <h3>{s.what}</h3>
                <p><strong>Fix.</strong> {s.fix}</p>
              </article>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">Illustrative</span>
            <p>Sample findings. Your report is built from your ledger, with a confidence on every line.</p>
          </div>
        </div>
      </section>

      {/* ── Price ── */}
      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">The deal</p>
              <h2>Free the first time. AED 5 a check after.<br /><span>Read-only, always.</span></h2>
            </div>
          </div>
          <div className="hw-cards hw-cards--4">
            <article className="is-navy"><p className="hw-eyebrow">First check</p><h3>Free</h3><p>No card. No commitment.</p></article>
            <article className="is-navy"><p className="hw-eyebrow">Every check after</p><h3>AED 5</h3><p>Under a dollar, every time.</p></article>
            <article className="is-navy"><p className="hw-eyebrow">The watch</p><h3>AED 59 a month</h3><p>A check every week, emailed.</p></article>
            <article className="is-navy"><p className="hw-eyebrow">Your data</p><h3>Deleted after 30 days</h3><p>Nothing is ever written to your ledger.</p></article>
          </div>
          <div className="hw-actions" style={{ marginTop: 34 }}>
            <a className="hw-btn hw-btn--peach" href={APP}>Connect your books <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      {/* ── Prefer a person ── */}
      <section id="conversation">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Prefer a person?</p>
              <h2>Zoho Books, Wafeq, or a report you would rather read together.</h2>
            </div>
            <p>Leave your work email and which system you use. We reply within one working day.</p>
          </div>
          <EnquiryForm source="Books Check" />
        </div>
      </section>
    </PageShell>
  );
}
