/* ── NextStep: the free check, offered at the end of a guide or calculator ──
   Added 2026-11-10. Search Console showed readers arriving on guides and
   calculators (640 impressions, 13 clicks in 90 days) with nothing on the
   page that turned a reader into a lead: the closing buttons went to
   /accounting and /guides. This card offers the one thing a reader can
   try today, the free check (/check), in words matched to the page topic.
   Claims mirror /check only: the 13 tests listed there, read-only,
   free, no sign-up, no credit card. English only: there is no /ar/check. */

const VAT = /vat|invoice|reverse-charge|gift-card|voucher|designated-zone|ecommerce|e-invoicing|supplier|currency/;
const CT = /corporate-tax|freezone|free-zone|interest|participation|transfer-pricing|tax-loss|small-business|top-up|de-minimis|group|branch|holding|director|cash-vs-accrual|intercompany|zakat|withholding|rett/;

function copyFor(slug: string): { h: string; p: string } {
  if (VAT.test(slug))
    return {
      h: "Is VAT already wrong in your books?",
      p: "VAT at the wrong rate is one of 13 tests the free check runs on your ledger, alongside duplicate bills, invoice number gaps and unreconciled bank lines. You get a ranked list of what to fix first.",
    };
  if (CT.test(slug))
    return {
      h: "Check your books before the return does",
      p: "Corporate tax add-backs and related-party balances are two of 13 tests the free check runs on your ledger, alongside suspense balances, round-sum journals and missed months. You get a ranked list of what to fix first.",
    };
  return {
    h: "See what this looks like in your own books",
    p: "The free check runs 13 tests on your ledger: receivables over 60 days, suspense balances, unreconciled bank lines, re-posted journals and more. You get a ranked list of what to fix first, and your P&L reconciled.",
  };
}

export function NextStep({ slug }: { slug: string }) {
  const c = copyFor(slug);
  return (
    <aside className="hw-nextstep" aria-label="Free check">
      <span className="hw-mono">Free check</span>
      <h2>{c.h}</h2>
      <p>{c.p}</p>
      <p className="hw-nextstep-how">Connect Xero or QuickBooks read-only, or upload a UAE or Saudi bank statement.</p>
      <div className="hw-nextstep-actions">
        <a className="hw-btn hw-btn--peach" href="/check">Run the free check <span aria-hidden="true">→</span></a>
        <span className="hw-nextstep-fine">Free. No sign-up, no credit card.</span>
      </div>
    </aside>
  );
}
