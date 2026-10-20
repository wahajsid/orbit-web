import type { Guide } from "./guides";

/* ── Group tax: intercompany loans, VAT-to-CT reconciliation, audits ──
   Three guides for group finance teams. Primary texts checked on 20
   October 2026: Corporate Tax Law (Federal Decree-Law No. 47 of 2022,
   MoF unofficial translation) Articles 30, 31, 34, 55, 56; Tax
   Procedures Law (Federal Decree-Law No. 28 of 2022 as amended by
   Federal Decree-Law No. 17 of 2025) Articles 16, 21, 23, 28, 29, 32,
   33, 36, 46, 49. Sources listed at the end of the file. */

const loans: Guide = {
  slug: "uae-intercompany-loans-transfer-pricing",
  title: "Intercompany loans in the UAE: arm's length interest",
  description:
    "How UAE Corporate Tax treats intercompany loans: arm's length interest, interest-free balances, the Article 31 block, guarantees, cash pools and an example.",
  updated: "2026-10-20",
  minutes: 8,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "A loan between related companies must carry the interest that independent parties would agree in the same circumstances. That is the arm's length standard in Article 34 of the Corporate Tax Law. If the rate is too low, including zero, the FTA can increase the lender's taxable income. If it is too high, it can cut the borrower's deduction. When one UAE company is adjusted, Article 34(10) requires a matching adjustment for the UAE company on the other side.",
        "Between two mainland companies both taxed at 9%, those two adjustments largely cancel out. The money is at stake when the rates differ: a lender taxed at 9% lending interest-free to a free zone company taxed at 0%, a borrower with losses or Small Business Relief, or a foreign party on one side.",
      ],
    },
    {
      h: "First, is it really a loan?",
      ps: [
        "The FTA's Transfer Pricing Guide follows the OECD's approach to financial transactions. Before pricing a balance, establish what it is. A long-standing shareholder balance with no repayment date, no interest and no expectation of repayment may in substance be equity, and an equity contribution carries no interest. A balance that is repaid, has a term and behaves like debt should be priced as debt. Short, two-way balances in a treasury cash pool are priced as deposits and overdrafts, not as term loans.",
      ],
    },
    {
      h: "Setting an arm's length rate",
      list: [
        "Start from the borrower's credit standing: its own financial position, adjusted for any implicit support it gets from belonging to the group.",
        "Match the terms: currency, amount, tenor, fixed or floating, security, subordination and repayment profile.",
        "Benchmark: comparable loans between independent parties, bank quotes, or a base rate such as EIBOR or SOFR plus a credit spread justified by the credit analysis.",
        "Write it down before the money moves: a signed loan agreement with the rate, term and repayment schedule, and a short note on how the rate was set.",
        "Revisit it when the facts change, such as a refinancing, a large draw or a change in the borrower's position.",
      ],
    },
    {
      h: "Guarantees and cash pools",
      ps: [
        "When a UAE parent guarantees a subsidiary's bank loan, the subsidiary usually pays a lower rate than it could get alone. An arm's length guarantee fee is normally limited to the benefit the guarantee gives, not the whole interest saving that comes from simply being part of a group. In a cash pool, the pool leader that runs the pool is paid for its routine function, and each participant should earn or pay an arm's length rate on its deposits and borrowings. Where a pool balance becomes long-term, price it as a loan.",
      ],
    },
    {
      h: "The interest rules that sit on top",
      list: [
        "Article 31 denies the deduction for interest on a loan from a related party that funds a dividend or profit distribution to a related party, a share capital redemption or reduction, a capital contribution to a related party, or the purchase of shares in a company that is or becomes a related party. It does not apply where you can show the main purpose was not a Corporate Tax advantage, and no advantage is deemed to arise where the lender is taxed at 9% or more on the interest.",
        "Article 30 then caps net interest at the greater of 30% of adjusted EBITDA and AED 12 million (see [the interest cap](/guides/uae-interest-deduction-limitation)). Only arm's length interest counts toward the cap.",
        "Large groups also report loans in the related-party disclosure and, above the thresholds, in the local and master files. Under Article 55 the FTA can ask for them, or for any information supporting arm's length pricing, with 30 days to respond (see [transfer pricing documentation](/guides/uae-transfer-pricing-documentation)).",
      ],
    },
    {
      h: "Worked example",
      ps: [
        "A mainland parent taxed at 9% lends AED 50,000,000 interest-free to its free zone subsidiary, which earns qualifying income at 0%, for the whole year. Suppose the credit analysis supports EIBOR of 4.2% plus a 2.0% spread, so 6.2%. Arm's length interest: 50,000,000 × 6.2% = AED 3,100,000. The parent's taxable income rises by AED 3,100,000, which is AED 279,000 of tax at 9%. The subsidiary gets a matching deduction under Article 34(10), but at 0% it saves nothing. The group's net cost is AED 279,000 a year.",
        "The reverse case: a UAE subsidiary taxed at 9% borrows AED 20,000,000 from its foreign parent at 12%, when 7% is arm's length. It pays 20,000,000 × 12% = AED 2,400,000 against an arm's length AED 1,400,000. The excess AED 1,000,000 is not deductible, which costs AED 90,000 of tax at 9%. The [intercompany loan calculator](/tools/uae-intercompany-loan-interest-calculator) runs both cases with your figures.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab tags related-party flows as they post and keeps the agreement attached to each intercompany balance, so a loan that has drifted into an undocumented, interest-free balance is visible during the year, while it can still be fixed with a signed agreement and an interest charge, rather than at the audit.",
      ],
    },
  ],
  faqs: [
    {
      q: "Are interest-free intercompany loans allowed in the UAE?",
      a: "They are not prohibited, but for Corporate Tax the FTA can impute arm's length interest under Article 34. That increases the lender's taxable income, with a matching deduction for a UAE borrower. Where both are taxed at 9% the effect largely nets out; where the rates differ, it does not.",
    },
    {
      q: "How do I set an arm's length interest rate on an intercompany loan?",
      a: "Assess the borrower's credit standing, match the loan's terms, and benchmark against comparable independent loans or a base rate such as EIBOR or SOFR plus a justified credit spread. Document it in a signed agreement before the loan is drawn.",
    },
    {
      q: "When is interest on a related-party loan not deductible at all?",
      a: "Under Article 31, when the loan funds a dividend, a capital return, a capital contribution to a related party or the purchase of shares in a related party, unless you show the main purpose was not a tax advantage. No advantage is deemed where the lender is taxed at 9% or more on the interest.",
    },
    {
      q: "Does transfer pricing apply between two UAE companies?",
      a: "Yes. Article 34 applies to all related-party transactions, including domestic ones. If one side is adjusted, the FTA makes a corresponding adjustment for the other UAE party.",
    },
  ],
  related: ["uae-transfer-pricing-documentation", "uae-interest-deduction-limitation", "intercompany-management-fees-uae", "free-zone-corporate-tax-0-percent"],
};

const recon: Guide = {
  slug: "uae-vat-corporate-tax-reconciliation",
  title: "Reconciling VAT returns with Corporate Tax revenue",
  description:
    "Why turnover in your UAE VAT returns and revenue in your Corporate Tax return differ, the legitimate reconciling items, a year-end bridge, and a worked example.",
  updated: "2026-10-20",
  minutes: 7,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "The FTA holds both returns, and turnover declared for VAT and revenue reported for Corporate Tax are two views of the same business. They will rarely match exactly, and they do not have to. What you need is a bridge: a reconciliation, entity by entity and year by year, that starts from revenue in the financial statements and explains every difference to the supplies declared in the VAT returns for the same months.",
        "An unexplained gap is one of the first things a risk review or an [audit](/guides/uae-fta-group-tax-audit) will ask about. A bridge prepared at year-end turns that question into a two-minute answer.",
      ],
    },
    {
      h: "Which VAT figures to compare",
      ps: [
        "Use the net value of standard-rated supplies (Box 1), zero-rated supplies (Box 4) and exempt supplies (Box 5). Leave out Box 3, which reports purchases under the reverse charge, and the import boxes. Then line up the periods. VAT quarters are often staggered, for example ending in February, May, August and November, so they will not match a December financial year. Use monthly figures, or add up the returns covering the financial year and adjust the edges.",
      ],
    },
    {
      h: "The legitimate reconciling items",
      list: [
        "Advances: VAT is due when a payment is received, but under IFRS 15 an advance is a liability until the work is done. Advances received this year for next year's work add to VAT supplies; last year's advances recognised as revenue this year come off.",
        "Unbilled revenue: revenue recognised on work in progress or continuous services where no invoice has been issued and no payment received may not yet be a supply for VAT.",
        "Supplies that are not revenue: the sale of fixed assets is a supply at its full price for VAT, but the accounts show only a gain or loss. Deemed supplies, such as gifts or private use, have no revenue at all.",
        "Income that is not a supply: dividends, fair value gains and similar items appear in the accounts but are not consideration for a supply.",
        "Exchange rates: VAT uses the Central Bank rate on the date of supply, while the books may use another rate (see [foreign-currency invoices](/guides/uae-vat-foreign-currency-invoices)).",
        "Credit notes and corrections: a credit note issued in the next period, or a voluntary disclosure, moves VAT turnover between periods.",
        "Agent or principal: a business acting as an agent under IFRS 15 shows only its commission as revenue, while its VAT treatment may follow the gross supply.",
        "Different perimeters: a [VAT tax group](/guides/uae-vat-tax-group) files one return for several companies, while each company, or a Corporate Tax group under its own 95% rule, reports separately. Reconcile at the same perimeter on both sides.",
      ],
    },
    {
      h: "Building the bridge",
      list: [
        "Start with revenue per the audited financial statements for the financial year.",
        "Add and subtract each reconciling item above, with a schedule or ledger report behind each line.",
        "The result is expected VAT supplies. Compare it with Box 1 + Box 4 + Box 5 for the same months.",
        "Investigate any unexplained difference until it is either explained or corrected, and correct VAT errors through a [voluntary disclosure](/guides/uae-vat-voluntary-disclosure) where the rules require it.",
        "File the bridge with the Corporate Tax working papers and keep it for the seven years Article 56 of the Corporate Tax Law requires.",
      ],
    },
    {
      h: "Worked example",
      ps: [
        "A company's revenue for 2025 is AED 48,500,000. It received AED 1,200,000 of advances in 2025 for 2026 deliveries (add), recognised AED 900,000 of advances that were taxed for VAT in 2024 (subtract), and holds AED 600,000 of unbilled revenue with no tax point yet (subtract). It also sold vehicles for AED 350,000 (add). Expected VAT supplies: 48,500,000 + 1,200,000 − 900,000 − 600,000 + 350,000 = AED 48,550,000.",
        "Box 1 + Box 4 + Box 5 for January to December 2025 total AED 48,610,000. The unexplained difference is 48,610,000 − 48,550,000 = AED 60,000, about 0.12% of the expected figure. It turns out to be a December credit note issued in January. Once that is documented, the bridge closes. Try the [VAT to Corporate Tax reconciliation calculator](/tools/uae-vat-ct-reconciliation-calculator) with your own figures.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab compares VAT-declared turnover with book revenue for each entity, nets off the drivers it can attribute (timing, out-of-scope income, asset disposals and intercompany items) and flags any unexplained residual as a mismatch, so the bridge is built during the year rather than reconstructed when the Corporate Tax return is due.",
      ],
    },
  ],
  faqs: [
    {
      q: "Should VAT turnover match revenue in the Corporate Tax return?",
      a: "Not exactly, but every difference should be explained. Timing of advances, unbilled revenue, asset sales, income that is not a supply, exchange rates and credit notes all create legitimate differences.",
    },
    {
      q: "Which VAT return boxes should I compare with revenue?",
      a: "Box 1 (standard-rated supplies, net), Box 4 (zero-rated) and Box 5 (exempt) for the same months as the financial year. Leave out reverse charge purchases in Box 3 and imports.",
    },
    {
      q: "Does the FTA compare VAT and Corporate Tax returns?",
      a: "The FTA holds both returns for every registered business, and a turnover gap is a natural risk indicator. Prepare a documented bridge so any question can be answered quickly.",
    },
    {
      q: "How long should I keep the reconciliation?",
      a: "Keep it with the Corporate Tax working papers for seven years after the end of the tax period, as Article 56 of the Corporate Tax Law requires for records supporting the return.",
    },
  ],
  related: ["uae-tax-deadlines", "uae-fta-vat-audit-preparation", "uae-vat-foreign-currency-invoices", "uae-vat-voluntary-disclosure"],
};

const audit: Guide = {
  slug: "uae-fta-group-tax-audit",
  title: "FTA tax audits for groups: CT, VAT and the deadlines",
  description:
    "How an FTA audit works for a UAE group: the 10-business-day notice, records, the 5-year limit, and the 40-business-day deadlines to dispute an assessment.",
  updated: "2026-10-20",
  minutes: 8,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "The FTA must notify you at least 10 business days before a tax audit (Article 16 of the Tax Procedures Law). It can audit a tax period for five years after it ends, or longer in specific cases. When the audit ends with a tax assessment, you have 40 business days to ask for a review or a reconsideration. Each later step, the objection to the Tax Disputes Resolution Committee and the appeal to court, has its own 40-business-day deadline.",
        "For a group, the risk is less any single finding than inconsistency: one entity's VAT return, another's Corporate Tax return and the transfer pricing file telling different stories. Prepare as one group, with one coordinator.",
      ],
    },
    {
      h: "What the FTA can do",
      list: [
        "Audit at its own premises, at your place of business, or wherever you store goods or keep records.",
        "Take original records or copies, and samples of goods or assets.",
        "Enter without notice, and close the premises for up to 72 hours, only with the Director General's written approval and where there are serious grounds, such as suspected evasion or obstruction.",
        "Re-audit a period it has already audited if new information comes to light, within the time limits.",
      ],
      ps: [
        "You have the right to see the auditor's identification, receive a copy of the audit notice, attend an audit held outside the FTA, and get copies of documents taken (Article 21). You must cooperate (Article 20), and obstruction is itself penalised.",
      ],
    },
    {
      h: "Time limits and records",
      list: [
        "Five years from the end of the tax period, as the general limit for an audit or assessment (Article 46).",
        "Four more years to finish, if the audit was notified before the five years ran out.",
        "Fifteen years in cases of tax evasion, or from the date you should have registered if you failed to register.",
        "No voluntary disclosure can be made more than five years after the end of the tax period.",
        "Corporate Tax records: seven years after the end of the tax period (Article 56 of the Corporate Tax Law). VAT records: at least five years, and fifteen for real estate.",
        "Transfer pricing: the master file, local file or any arm's length evidence is due within 30 days of an FTA request (Article 55 of the Corporate Tax Law).",
      ],
    },
    {
      h: "After the audit: the dispute route and its deadlines",
      list: [
        "Tax assessment review (Article 28, added in 2025): ask the FTA to review an assessment and its penalties within 40 business days of notification. The FTA decides within 40 business days and notifies you within 5. You can then ask for reconsideration within 40 business days.",
        "Reconsideration (Article 29): ask the FTA to reconsider any decision within 40 business days of notification. It decides within 40 business days, with reasons, and notifies you within 5. You cannot request reconsideration of an assessment while a review of it is pending.",
        "Objection to the Tax Disputes Resolution Committee (Article 32): within 40 business days of the reconsideration decision. The tax must be paid in full first. The Committee decides within 20 business days, and its decision is final where tax and penalties together do not exceed AED 100,000.",
        "Appeal to court (Article 36): within 40 business days of the Committee's decision. The tax must be paid in full, and at least 50% of the penalties paid or covered by a bank guarantee.",
      ],
      ps: [
        "Under Article 49, the day of notification does not count, and a deadline falling on a non-business day moves to the next business day. Extensions are possible for reasons set out in the Executive Regulation, but a refusal is final, so do not plan on one. The [objection deadline calculator](/tools/uae-fta-objection-deadline-calculator) counts the business days for you.",
      ],
    },
    {
      h: "Preparing a group",
      list: [
        "Name one coordinator for all FTA contact, and keep one log of every request, deadline and document provided.",
        "Reconcile before you are asked: VAT turnover to Corporate Tax revenue for each entity ([the bridge](/guides/uae-vat-corporate-tax-reconciliation)), and intercompany balances on both sides.",
        "Check the transfer pricing file against the ledger: agreements, rates and charges as booked, especially [intercompany loans](/guides/uae-intercompany-loans-transfer-pricing) and management fees.",
        "Test a sample of input VAT invoices against the [Article 59 checklist](/guides/uae-tax-invoice-checklist) and the supplier checks now required.",
        "Fix what you find through a voluntary disclosure before the audit is notified. A disclosure made after notification usually carries higher penalties.",
        "Make sure the same answer is given for the same question in every entity. Inconsistency across a group is what widens an audit.",
      ],
      ps: [
        "The single-entity view of a VAT audit, including the documents the FTA asks for and the findings it raises most often, is in the [FTA VAT audit guide](/guides/uae-fta-vat-audit-preparation).",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab keeps each entity's invoices, ledger and VAT return working linked, tests invoices as they arrive, and compares VAT turnover with book revenue for each entity. When an audit notice arrives, the reconciliations the FTA will build already exist, by entity and by period.",
      ],
    },
  ],
  faqs: [
    {
      q: "How much notice does the FTA give before a tax audit?",
      a: "At least 10 business days under Article 16 of the Tax Procedures Law, except in specific cases such as suspected evasion, where the auditor may enter without notice with the Director General's approval.",
    },
    {
      q: "How far back can the FTA audit?",
      a: "Generally five years from the end of the tax period, with four more years to complete an audit notified within that time. In cases of tax evasion or failure to register, the limit is fifteen years.",
    },
    {
      q: "How long do I have to dispute an FTA tax assessment?",
      a: "40 business days from notification to request a tax assessment review or a reconsideration. After the reconsideration decision, 40 business days to object to the Tax Disputes Resolution Committee, and after its decision, 40 business days to appeal to court.",
    },
    {
      q: "Do I have to pay the tax before objecting?",
      a: "Yes, for an objection to the Tax Disputes Resolution Committee the disputed tax must be paid in full. For an appeal to court, the tax must be paid in full and at least 50% of the penalties paid or guaranteed.",
    },
    {
      q: "How long must Corporate Tax records be kept?",
      a: "Seven years after the end of the tax period they relate to, under Article 56 of the Corporate Tax Law.",
    },
  ],
  related: ["uae-fta-vat-audit-preparation", "uae-vat-voluntary-disclosure", "uae-corporate-tax-penalties", "uae-transfer-pricing-documentation"],
};

export const GROUP_TAX_GUIDES: Guide[] = [loans, recon, audit];

/* ── Sources relied on (checked 20 October 2026) ─────────────────────

1. Corporate Tax Law, Federal Decree-Law No. 47 of 2022 (MoF unofficial translation):
   https://mof.gov.ae/wp-content/uploads/2022/12/Federal-Decree-Law-No.-47-of-2022-EN.pdf
   - Art 31(1)-(3) specific interest limitation, main purpose test, 9% deemed no advantage.
   - Art 34(1)-(11) arm's length; methods; range; 34(10) corresponding adjustment.
   - Art 55(1)-(4) disclosure, master/local file, 30 days. Art 56 records 7 years.
   (Consolidated 2025 version at mof.gov.ae not downloadable from this environment;
   Articles 31, 34, 55, 56 are not among those reported as amended.)

2. Tax Procedures Law, Federal Decree-Law No. 28 of 2022 as amended by Federal Decree-Law
   No. 17 of 2025 (unofficial consolidated text): https://uae.shushin.io/taxlaw/taxprocedures/tax-procedures-law-28-2022
   - Art 16 (10 business days' notice, 72-hour closure), 17, 19, 20, 21, 23.
   - Art 28 tax assessment review (40/40/5/40), Art 29 reconsideration (40/40/5),
     Art 32 objection (40; tax paid), Art 33 committee (20/5; final <= AED 100,000),
     Art 35 extensions, Art 36 court (40; full tax, 50% penalties), Art 46 limitation,
     Art 49 calculation of time periods.
   - Amendments effective 1 January 2026: DLA Piper,
     https://www.dlapiper.com/en/insights/publications/gulf-tax-insights/2025/gulf-tax-insights-december-2025/uae-tax-procedures-law-changes-as-per-1-january-2026

3. FTA Transfer Pricing Guide (financial transactions, OECD Chapter X approach): KPMG
   highlights, https://assets.kpmg.com/content/dam/kpmgsites/ae/pdf/kpmg-tax-flash-highlights-of-the-uae-transfer-pricing-guide.pdf.coredownload.inline.pdf
   Specific interest limitation commentary: PwC,
   https://www.pwc.com/m1/en/services/tax/me-tax-legal-news/2025/uae-corporate-tax-interest-deduction-limitation-rules.html

4. VAT record retention (5 years; 15 years real estate): Tax Procedures Executive
   Regulation, as described in the existing FTA VAT audit guide on this site.
*/
