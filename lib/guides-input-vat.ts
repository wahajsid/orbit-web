import type { Guide } from "./guides";

/* ── Input VAT paperwork: the questions people actually type ─────────
   Four guides on the documents behind an input VAT claim: the new
   supplier checks under FTA Decision No. 13 of 2026, invoices with a
   missing TRN or the wrong name, simplified versus full tax invoices,
   and foreign-currency invoices. Sources checked on 20 October 2026
   are listed at the end of the file; re-check them when the FTA
   publishes e-invoicing guidance or amends Article 59. */

const supplierChecks: Guide = {
  slug: "uae-fta-decision-13-supplier-verification",
  title: "FTA Decision 13: supplier checks before input VAT",
  description:
    "From 1 October 2026, UAE businesses must check suppliers and supplies before deducting input VAT. The checks, the AED 10,000, 100,000 and 375,000 tests, an example.",
  updated: "2026-10-20",
  minutes: 8,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "From 1 October 2026, a valid tax invoice is no longer the only thing standing behind an input VAT claim. FTA Decision No. 13 of 2026 lists checks a business must run on each supplier and each supply before it deducts the VAT. If you skip them and the supply later turns out to be part of a chain connected to tax evasion, the FTA can deny the input tax under Article 54(bis) of the VAT Decree-Law.",
        "Small purchases are excused: a supply under AED 10,000 excluding VAT needs no checks, unless your total purchases from that supplier exceed AED 100,000 over the previous 12 months or are expected to over the next 12. Suppliers above AED 375,000 a year need two extra checks: a bank account confirmation and a review of public reviews and media coverage.",
      ],
    },
    {
      h: "Where the rule comes from",
      ps: [
        "Article 54(bis) was added to the VAT Decree-Law by Federal Decree-Law No. 16 of 2025. It lets the FTA refuse input tax on a supply connected to tax evasion where the buyer knew, or should have known, of the connection. Decision No. 13 of 2026, issued on 22 July 2026 and in force from 1 October 2026, is the FTA's list of what a careful buyer is expected to do. Advisers including EY read the two together: a buyer who did not carry out the checks will struggle to argue it could not have known.",
        "The checks do not replace the invoice rules. You still need a [valid tax invoice](/guides/uae-tax-invoice-checklist), and the [cash payment block](/guides/uae-vat-cash-payments-petty-cash-2026) from Cabinet Decision No. 149 of 2026 still applies on top.",
      ],
    },
    {
      h: "Checks on the supplier (Article 3)",
      ps: [
        "Run these the first time you deal with a supplier, and again whenever you have not verified that supplier in the previous 12 months (Article 5(1)).",
      ],
      list: [
        "Identity, company supplier: confirm the incorporation through an official database or a copy of the certificate of incorporation, and check the name and address match. Take a copy of the Emirates ID or passport of the person who represents the supplier.",
        "Identity, individual supplier: take a copy of a valid Emirates ID or passport, and meet the supplier, in person or by video call, before the supply.",
        "Place of business: confirm the supplier has a real place of business, by electronic means or a site visit, and that it fits what the supplier says it does.",
        "Risk indicators: note whether the supplier has changed its address more than twice, or its key people more than twice, in the last 12 months, or is trading in volumes or values out of line with its size and history. If any applies, write down a clear explanation and keep it for the FTA.",
        "Above AED 375,000 a year (previous 12 months, or expected next 12): obtain a written confirmation from a UAE bank that the supplier holds an account, with no reservations, and review public reviews and media coverage for signs of evasion. The bank letter does not have to be addressed to you.",
      ],
    },
    {
      h: "Checks on each supply (Article 4)",
      list: [
        "The transaction has a genuine commercial reason, and so does the supplier's part in it.",
        "Payment is made by electronic means. Cash needs a documented commercial reason, must stay within the thresholds set in tax law and must be easy to verify. Paying a third party, or a bank account outside the supplier's country of incorporation, needs a reasonable commercial explanation.",
        "The price or margin is not far from market without a clear reason.",
        "The goods or services fall within the supplier's ordinary activity and its trade licence.",
        "For goods, you have checked their authenticity and origin, and that the supplier owns them or may sell them.",
        "Where the supplier is only an intermediary, its role has a clear commercial explanation.",
      ],
    },
    {
      h: "What you must keep (Article 5)",
      ps: [
        "Document every check and keep the supporting papers so the FTA can see what was done. You also need a written policy naming who runs, reviews and supervises the checks, and what each person is responsible for. A one-page policy, a supplier onboarding form and a per-supplier evidence folder cover most businesses.",
      ],
    },
    {
      h: "Worked example: three suppliers",
      ps: [
        "A trading company buys from three suppliers. Supplier A, a cleaning company, invoices AED 8,000 a month excluding VAT. Twelve months come to AED 96,000, which does not exceed AED 100,000, and each invoice is under AED 10,000, so the Article 6 exception applies and no checks are required. Keep the 12-month total on file in case the FTA asks how you reached that view.",
        "Supplier B invoices AED 9,000 a month. Each invoice is still under AED 10,000, but 12 × 9,000 = AED 108,000, which exceeds AED 100,000. The exception falls away, so the supplier checks and the per-supply checks apply. Supplier B stays below AED 375,000, so no bank letter is needed.",
        "Supplier C, a steel stockist, invoices AED 35,000 a month: 12 × 35,000 = AED 420,000 a year. Every check applies, including the UAE bank confirmation and the review of public coverage, because AED 420,000 exceeds AED 375,000.",
        "Use the [supplier verification checker](/tools/uae-supplier-verification-checker) to run the same tests on your own suppliers.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab's supplier portal collects the trade licence, tax certificate and bank letter when a supplier is onboarded, compares them with what the supplier typed and flags signs of tampering before an admin approves the supplier. Every invoice is then tested on arrival, including a supplier TRN that differs from the one seen on earlier invoices, so the evidence for a claim sits next to the claim.",
      ],
    },
  ],
  faqs: [
    {
      q: "When did FTA Decision No. 13 of 2026 take effect?",
      a: "On 1 October 2026. It was issued on 22 July 2026 and applies to input tax deducted from that date, for the purposes of Article 54(bis) of the VAT Decree-Law.",
    },
    {
      q: "Do I need to verify suppliers for small purchases?",
      a: "Not where the supply is under AED 10,000 excluding VAT, unless your total purchases from that supplier exceed AED 100,000 over the previous 12 months or are expected to over the next 12. Above that total, every supply from that supplier is checked, whatever its size.",
    },
    {
      q: "Is the AED 10,000 in Decision 13 the same as the simplified invoice limit?",
      a: "No. Decision 13 uses supplies of less than AED 10,000 excluding VAT. The [simplified tax invoice](/guides/uae-simplified-tax-invoice-aed-10000) rule in Article 59(5)(b) uses consideration that does not exceed AED 10,000. They are separate tests with different wording.",
    },
    {
      q: "How often do I need to re-verify a supplier?",
      a: "At the first dealing, and again for a recurring supplier you have not verified in the previous 12 months. In practice, an annual refresh of each active supplier's file meets this.",
    },
    {
      q: "What happens if I skip the checks?",
      a: "Nothing, as long as the supply is genuine. The risk arises if the supply turns out to be connected to tax evasion: the FTA can then deny the input tax under Article 54(bis), and the missing checks make it hard to show you could not have known.",
    },
  ],
  related: ["uae-tax-invoice-without-trn", "uae-vat-cash-payments-petty-cash-2026", "uae-tax-invoice-checklist", "uae-fta-vat-audit-preparation"],
};

const noTrn: Guide = {
  slug: "uae-tax-invoice-without-trn",
  title: "Invoice without a TRN: can you still claim the VAT?",
  description:
    "A UAE invoice with no supplier TRN, an invalid TRN or the wrong company name is not a valid tax invoice. When you can claim the VAT, and how to get it fixed.",
  updated: "2026-10-20",
  minutes: 6,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "No, not on that document. Article 59 of the VAT Executive Regulation requires every tax invoice, full or simplified, to show the supplier's name, address and Tax Registration Number (TRN). An invoice without the supplier's TRN is not a tax invoice, and input VAT is only recoverable against a tax invoice you hold. Hold the VAT, ask the supplier for a corrected invoice, and claim in the return for the period in which you hold a valid one.",
        "The same applies when the invoice is addressed to someone else. A full tax invoice must show the recipient's name, address and TRN where the recipient is registered, so an invoice in the owner's personal name or a sister company's name supports a claim by that person, not by you.",
      ],
    },
    {
      h: "Three different problems behind a missing TRN",
      list: [
        "The supplier is registered but left the TRN off. This is a paperwork error. Ask for a corrected invoice, or a tax credit note cancelling the original and a new invoice. Claim once you have it.",
        "The supplier is not registered at all. A business that is not registered cannot issue a tax invoice or charge VAT, so what it labels VAT is not recoverable input tax. The fix is commercial: ask for a refund of the VAT charged, or an invoice without it.",
        "A TRN is printed but does not check out. Search it on the FTA's TRN verification service at tax.gov.ae and confirm the name matches the supplier. A TRN that belongs to another business, or a supplier TRN that changes between invoices, is a warning sign under the new [supplier checks in FTA Decision No. 13 of 2026](/guides/uae-fta-decision-13-supplier-verification).",
      ],
    },
    {
      h: "Wrong name, wrong company, or no address",
      ps: [
        "The right to recover belongs to the business that received the supply and holds the invoice made out to it. If a supplier invoices the shareholder, an employee or another group company, ask for the invoice to be reissued to the entity that actually received and paid for the supply.",
        "Companies in the same VAT tax group are treated as one taxable person and file under one TRN, so an invoice addressed to another member and showing the group TRN generally sits inside the same return. Outside a tax group, each company needs invoices in its own name.",
        "A missing address, a missing date or no sequential number is a defect too. Each field in [the Article 59 checklist](/guides/uae-tax-invoice-checklist) is a condition of a valid tax invoice, not a formality.",
      ],
    },
    {
      h: "Can the FTA accept another document instead?",
      ps: [
        "Only where the FTA itself has decided so. Article 59(7) lets the FTA determine, for a supply or class of supplies, that certain particulars need not appear on an invoice or that no invoice is needed. That is a decision the FTA makes in advance, not a judgement you can make when an invoice turns out to be defective. For businesses issuing electronic invoices, Article 59(16) switches Clause 7 off altogether.",
        "Imported services under the [reverse charge](/guides/uae-vat-reverse-charge) are different: the FTA's public clarification VATP044 lets a combination of commercial documents support the claim when the overseas supplier issues no tax invoice. That route does not extend to a UAE supplier who simply left the TRN off.",
      ],
    },
    {
      h: "Worked example",
      ps: [
        "In March your company receives an invoice for office fit-out works: AED 40,000 plus VAT of AED 2,000, total AED 42,000. The supplier's TRN is missing. Your Q1 return is due on 28 April. You record the AED 42,000 cost and payable, but you do not include the AED 2,000 in Box 9 for Q1, because you do not hold a valid tax invoice.",
        "On 5 May the supplier sends a corrected invoice with its TRN, which you verify on the FTA's portal. You claim the AED 2,000 in the Q2 return, the period in which you hold the valid invoice. The VAT was delayed by one quarter, not lost. Had you claimed it in Q1, an audit would disallow it and could add a penalty for an incorrect return.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab tests every supplier invoice on arrival: a missing or malformed supplier TRN is a critical failure, the buyer TRN printed on the invoice is compared with your registered TRN, and a supplier TRN that differs from earlier invoices is flagged before anyone claims the VAT. The input VAT is held until the paper holds up, and the correction request to the supplier can be drafted for you.",
        "Try the free [tax invoice checker](/tools/uae-tax-invoice-checker) to see which fields an invoice is missing.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I claim input VAT on an invoice without a TRN in the UAE?",
      a: "No. Article 59 of the VAT Executive Regulation requires the supplier's TRN on both full and simplified tax invoices. Ask the supplier for a corrected invoice and claim in the return for the period in which you hold it.",
    },
    {
      q: "The supplier charged VAT but is not registered. What now?",
      a: "You cannot recover it, because a business that is not registered cannot issue a tax invoice. Ask the supplier to refund the VAT or reissue the invoice without it.",
    },
    {
      q: "How do I check a supplier's TRN?",
      a: "Use the TRN verification service on the FTA's website, tax.gov.ae. Check that the name returned matches the supplier on the invoice, and keep a screenshot with the invoice.",
    },
    {
      q: "The invoice is in the owner's name, not the company's. Can the company claim the VAT?",
      a: "Not on that invoice. A full tax invoice must show the recipient's name, address and TRN where the recipient is registered. Ask the supplier to reissue it to the company that received and paid for the supply.",
    },
    {
      q: "Is the VAT lost if the corrected invoice arrives late?",
      a: "Usually not. You claim it in the period in which you hold the valid invoice, provided you have paid or intend to pay the supplier. Note that since 1 January 2026 excess input tax can only be carried forward or refunded within five years, so do not leave corrections open for years.",
    },
  ],
  related: ["uae-tax-invoice-checklist", "uae-simplified-tax-invoice-aed-10000", "uae-fta-decision-13-supplier-verification", "uae-blocked-input-vat"],
};

const simplified: Guide = {
  slug: "uae-simplified-tax-invoice-aed-10000",
  title: "Simplified vs full tax invoice: the AED 10,000 rule",
  description:
    "When a UAE supplier may issue a simplified tax invoice under Article 59(5), the five fields it needs, the AED 10,000 test, and why e-invoicing removes the option.",
  updated: "2026-10-20",
  minutes: 6,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "A UAE VAT-registered supplier may issue a simplified tax invoice in two cases: the customer is not registered for VAT, or the customer is registered and the consideration does not exceed AED 10,000 (Article 59(5) of the VAT Executive Regulation). It is never allowed where the customer must account for the VAT under the reverse charge.",
        "A simplified invoice still supports an input VAT claim, but it needs five fields, all listed in Article 59(2). Once a business issues electronic invoices, Article 59(16) switches the simplified option off.",
      ],
    },
    {
      h: "The five fields on a simplified tax invoice",
      list: [
        "The words “Tax Invoice” clearly displayed",
        "The supplier's name, address and TRN",
        "The date of issue",
        "A description of the goods or services",
        "The total consideration and the VAT charged, in AED",
      ],
      ps: [
        "A [full tax invoice](/guides/uae-tax-invoice-checklist) adds the customer's details and TRN, a sequential number, the date of supply, line-by-line prices, quantities and rates, any discount, and the exchange rate on [foreign-currency invoices](/guides/uae-vat-foreign-currency-invoices).",
      ],
    },
    {
      h: "Reading the AED 10,000 test",
      ps: [
        "The text says the consideration for the supply must not exceed AED 10,000, so exactly AED 10,000 still qualifies. It does not say whether that figure includes VAT. If the total including VAT is AED 10,000 or less, you are inside on any reading. Between AED 9,523.81 and AED 10,000 before VAT (AED 10,000 ÷ 1.05), the total with VAT passes AED 10,000, and a full invoice is the safe choice.",
        "The test is per supply. Splitting one supply into several invoices to stay under the line does not change the supply, and Article 59(6) already lets a supplier put several supplies to the same customer on one summary invoice.",
      ],
    },
    {
      h: "Timing: simplified invoices are due on the day",
      ps: [
        "A full tax invoice is due within 14 days of the date of supply. A simplified tax invoice must be issued on the date of supply itself (Article 59(13)(a)). A till receipt issued at the counter meets this. A simplified invoice put together a week later does not.",
      ],
    },
    {
      h: "What e-invoicing changes",
      ps: [
        "Cabinet Decision No. 100 of 2025, in force from 29 September 2025, added Clause 16 to Article 59. Where a registrant must issue tax invoices as electronic invoices, or chooses to, Clauses 2, 3, 5, 7, 8 and 15 no longer apply. That removes the simplified invoice, the relief for wholly zero-rated supplies and the FTA's power to waive invoice particulars.",
        "Under Ministerial Decision No. 244 of 2025, as issued, voluntary e-invoicing opened on 1 July 2026. Businesses with revenue of AED 50 million or more must appoint an accredited service provider by 30 October 2026 (extended from 31 July 2026 by Ministerial Decision No. 66 of 2026) and go live by 1 January 2027. Businesses below AED 50 million appoint by 31 March 2027 and go live by 1 July 2027, and government entities by 1 October 2027. Business-to-consumer sales are outside the e-invoicing scope, so check the FTA's guidance before changing how retail receipts are issued. Check the FTA's e-invoicing page for later revisions to these dates.",
      ],
    },
    {
      h: "Worked example",
      ps: [
        "A registered printing company sells to three customers. Customer 1 is a registered business buying AED 6,000 of brochures: VAT AED 300, total AED 6,300. That is under AED 10,000 on any reading, so a simplified invoice is fine.",
        "Customer 2 is registered and buys AED 9,800 of signage: VAT AED 490, total AED 10,290. The price before VAT is under AED 10,000, but the total with VAT is over it. The printer issues a full invoice to avoid the argument.",
        "Customer 3 is a consumer buying AED 15,000 of wedding stationery: VAT AED 750, total AED 15,750. The customer is not registered, so a simplified invoice is permitted whatever the amount, unless the printer issues e-invoices, in which case the e-invoicing rules decide.",
        "The free [tax invoice checker](/tools/uae-tax-invoice-checker) runs this test and lists the fields each type needs.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab tests every supplier invoice against the Article 59 field lists on arrival, names the field that fails, and holds the input VAT until a corrected invoice arrives. Where the type is in doubt, it applies the full invoice list, because a full tax invoice is valid in every case.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the simplified tax invoice limit in the UAE?",
      a: "For a VAT-registered customer, the consideration must not exceed AED 10,000. For an unregistered customer there is no limit. Simplified invoices are never allowed where the reverse charge applies.",
    },
    {
      q: "Can I recover input VAT on a simplified tax invoice?",
      a: "Yes. A simplified tax invoice is a tax invoice, provided it shows all five fields in Article 59(2), including the supplier's TRN and the VAT in AED.",
    },
    {
      q: "Is the AED 10,000 including or excluding VAT?",
      a: "The text says consideration and does not settle it. If the total including VAT is AED 10,000 or less you are safe on any reading. Above that, issue or ask for a full invoice.",
    },
    {
      q: "Does e-invoicing remove simplified invoices?",
      a: "Yes, for registrants who must or choose to issue e-invoices: Article 59(16), added by Cabinet Decision No. 100 of 2025, disapplies Clauses 2 and 5. Business-to-consumer sales are outside the e-invoicing scope.",
    },
  ],
  related: ["uae-tax-invoice-checklist", "uae-tax-invoice-without-trn", "uae-vat-foreign-currency-invoices", "uae-vat-cash-payments-petty-cash-2026"],
};

const fx: Guide = {
  slug: "uae-vat-foreign-currency-invoices",
  title: "Foreign-currency invoices: which rate for UAE VAT?",
  description:
    "UAE VAT on invoices in USD, EUR or other currencies: the Central Bank rate on the date of supply, the AED figures Article 59 requires, and a worked example.",
  updated: "2026-10-20",
  minutes: 6,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "You may invoice in any currency, but the VAT is fixed in dirhams. Article 69 of the VAT Decree-Law converts foreign-currency amounts at the exchange rate approved by the UAE Central Bank on the date of supply. The tax invoice must show the line amounts, the gross amount and the VAT in AED, together with the exchange rate used (Article 59(1)(h), (j) and (k) of the Executive Regulation).",
        "The FTA's public clarification VATP004 adds two practical rules: use the Central Bank's published rate with all its decimal places, and do not round it.",
      ],
    },
    {
      h: "Which date, which rate",
      list: [
        "The date of supply, not the payment date. Under Article 25 of the Decree-Law it is usually the earliest of delivery or completion of the service, receipt of payment, and issue of the tax invoice.",
        "The Central Bank publishes its rates each business day at about 6 pm. VATP004 tells taxpayers to use the rate published on the Central Bank's website when the invoice is raised.",
        "Use the full rate as published, for example 3.6725 for the US dollar. Shortening it to 3.67 changes the VAT and is not permitted.",
        "Imported services under the [reverse charge](/guides/uae-vat-reverse-charge): use the Central Bank rate for the date of supply. VATP004 accepts the overseas supplier's invoice date as that date.",
        "Imported goods: Customs converts the value on the import declaration and pre-fills Box 6. If its rate differs from the Central Bank's, you may declare at the Customs rate without an adjustment.",
      ],
    },
    {
      h: "The AED figures the invoice must show",
      list: [
        "For each line: unit price, quantity, VAT rate and the amount payable in AED",
        "The gross amount payable in AED",
        "The VAT charged in AED, with the exchange rate applied",
        "On a simplified invoice: the total consideration and the VAT in AED",
      ],
      ps: [
        "A USD invoice that shows only USD figures fails Article 59 even if the arithmetic is right, and the customer cannot use it to [recover the VAT](/guides/uae-tax-invoice-without-trn).",
      ],
    },
    {
      h: "Worked example: a euro invoice and the exchange difference",
      ps: [
        "A Dubai consultancy invoices a registered UAE client EUR 8,000 plus 5% VAT of EUR 400, total EUR 8,400. The work is completed and invoiced on 14 September. Assume for illustration that the Central Bank rate for that date is 4.2850 AED per euro.",
        "Net in AED: 8,000 × 4.2850 = AED 34,280.00. VAT in AED: 400 × 4.2850 = AED 1,714.00, which is also 5% of AED 34,280.00. Gross: 8,400 × 4.2850 = AED 35,994.00. The invoice shows all three AED figures and the rate 4.2850. The consultancy declares AED 34,280.00 in Box 1 and AED 1,714.00 of output tax.",
        "The client pays EUR 8,400 on 14 October, when the euro is worth 4.3100. The consultancy receives AED 36,204.00 (8,400 × 4.3100), which is AED 210.00 more than it booked. That AED 210.00 is an exchange gain in the accounts. It does not change the VAT: the output tax stays AED 1,714.00, because VAT was fixed at the date of supply.",
      ],
    },
    {
      h: "Credit notes and the books",
      ps: [
        "Article 60 requires a tax credit note to show the VAT on the difference in AED, but it does not name a rate. The common approach is to reverse at the original invoice's rate, so the AED VAT on the credit note mirrors the AED VAT originally charged.",
        "Your accounts may use a different rate source under IAS 21. That is allowed, but the VAT return must follow the Central Bank rate, so expect a small reconciling difference between the VAT-reported revenue and the ledger. Explain it once a quarter rather than at the audit.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab converts foreign-currency invoices to AED at a rate it records with its source and date, keeps the dirham's 3.6725 peg exact rather than rounded, and flags any foreign-currency tax invoice that does not show both the AED tax amount and the exchange rate. The free [foreign-currency VAT converter](/tools/uae-vat-currency-converter) shows the same working for a single invoice.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can a UAE tax invoice be issued in US dollars?",
      a: "Yes, but it must also show the line amounts, the gross amount and the VAT in AED, together with the exchange rate applied, under Article 59(1) of the VAT Executive Regulation.",
    },
    {
      q: "Which exchange rate should I use for UAE VAT?",
      a: "The rate approved by the UAE Central Bank for the date of supply, under Article 69 of the VAT Decree-Law. Use the rate as published, with all its decimals, without rounding.",
    },
    {
      q: "Does a later exchange gain or loss change the VAT?",
      a: "No. The VAT is fixed in AED at the date of supply. A difference when the customer pays is an exchange gain or loss in the accounts, not a VAT adjustment.",
    },
    {
      q: "What rate applies to imported goods?",
      a: "The rate Customs uses on the import declaration. VATP004 allows you to declare import VAT at that rate even if it differs from the Central Bank's.",
    },
  ],
  related: ["uae-tax-invoice-checklist", "uae-vat-reverse-charge", "uae-simplified-tax-invoice-aed-10000", "uae-vat-saas-digital-services"],
};

export const INPUT_VAT_GUIDES: Guide[] = [supplierChecks, noTrn, simplified, fx];

/* ── Sources relied on (checked 20 October 2026) ─────────────────────

1. FTA, consolidated VAT Executive Regulation (Cabinet Decision No. 52 of 2017 and its
   amendments, unofficial translation), published 10 Sep 2026:
   https://tax.gov.ae/Datafolder/Files/Legislation/2026/Law-No-8-of-2017-and-its-amendments--09-2026.pdf
   - Article 59(1)(a)-(l) full invoice; 59(2)(a)-(e) simplified; 59(5) two situations,
     "does not exceed AED 10,000", reverse charge excluded; 59(6) summary invoice; 59(7) FTA
     discretion; 59(13) 14 days / simplified on the date of supply; 59(15); 59(16) e-invoice
     disapplies Clauses 2, 3, 5, 7, 8, 15 (footnote 44: amended by Cabinet Decision No. 100 of 2025).
   - Article 60(1)(e) credit note VAT in AED.
   - Article 54(2) six-month payment intention.

2. FTA Decision No. 13 of 2026 (unofficial translation):
   https://tax.gov.ae/Datafolder/Files/Legislation/2026/FTA%20Decision%20No.%2013%20of%202026%20on%20Measures%2018%2008%202026.pdf
   - Article 3(1)-(4) supplier checks, AED 375,000 bank confirmation; Article 4 supply checks;
     Article 5 procedures (first dealing / not verified in previous 12 months, documented
     policy); Article 6 exception (< AED 10,000 excl. VAT; lost above AED 100,000);
     Article 7 effective 1 October 2026.

3. Article 54(bis), Federal Decree-Law No. 16 of 2025; knew or should have known:
   Grant Thornton UAE, https://www.grantthornton.ae/insights/alerts/fta-decision-no.-13-of-2026--input-vat-verification
   EY, 26 Aug 2026, https://globaltaxnews.ey.com/news/2026-1832-uae-issues-decision-introducing-due-diligence-requirements-for-input-vat-recovery
   Khaleej Times, https://www.khaleejtimes.com/business/uae-introduces-mandatory-vat-supplier-and-supply-verification-checks

4. Cabinet Decision No. 100 of 2025, effective 29 September 2025:
   Grant Thornton UAE, https://www.grantthornton.ae/insights/articles2/tax-alert-executive-regulation-amendments/

5. E-invoicing timeline, Ministerial Decisions No. 243 and 244 of 2025 (29 Sep 2025):
   KPMG UAE, https://kpmg.com/ae/en/insights/tax-insights/implementation-of-the-electronic-invoicing-system-in-the-uae.html
   fiscal-requirements.com, https://www.fiscal-requirements.com/news/5357
   - One secondary source mentions a later Ministerial Decision No. 66 of 2026 moving the
     AED 50m appointment date to 30 Oct 2026; not confirmed against official text, hence
     the "as issued" wording in the guide.

6. Exchange rates: Article 69 VAT Decree-Law; FTA public clarification VATP004 via EY,
   https://globaltaxnews.ey.com/news/2018-5894-uae-publishes-public-clarification-on-use-of-exchange-rates-for-vat-purposes
   - Central Bank rate at date of supply, published daily from 6 pm, no rounding;
     reverse charge invoice date may be date of supply; imports at the Customs rate.

7. Five-year limit on excess input tax from 1 January 2026 (Article 74(3) as amended by
   Federal Decree-Law No. 16 of 2025): PwC, https://www.pwc.com/m1/en/services/tax/me-tax-legal-news/2025/uae-significant-legislative-updates-tax-procedures-vat-excise-tax-laws.html

8. VATP044 (imported services, alternative documents): Baker McKenzie,
   https://insightplus.bakermckenzie.com/bm/tax/united-arab-emirates-vat-public-clarification-regarding-the-invoicing-requirements-related-to-concerned-services
*/
