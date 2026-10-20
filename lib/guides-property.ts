import type { Guide } from "./guides";

/* ── Investment property under UAE Corporate Tax ─────────────────────
   Ministerial Decision No. 173 of 2025: the 4% deduction for buildings
   held at fair value. Primary text checked on 20 October 2026; source
   listed at the end of the file. */

const ipDepreciation: Guide = {
  slug: "uae-investment-property-tax-depreciation",
  title: "Investment property tax depreciation: the 4% rule",
  description:
    "Ministerial Decision 173 of 2025 gives UAE companies a 4% yearly deduction on fair-valued investment property. Who qualifies, the deadline, the clawback, an example.",
  updated: "2026-10-20",
  minutes: 8,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "A company that holds investment property at fair value under IAS 40 records no depreciation in its accounts, so before 2025 it had no tax deduction for the building wearing out. Ministerial Decision No. 173 of 2025 changes that. A qualifying company can elect to deduct the lower of 4% of the building's original cost and its remaining tax written-down value each year, which spreads the cost over 25 years. Land is excluded.",
        "The deduction applies to tax periods starting on or after 1 January 2025. It is available only to companies that use accrual accounting and have elected the realisation basis under Article 20(3) of the Corporate Tax Law. The election is irrevocable, covers all fair-valued investment property, and is lost if it is not made in the right tax return.",
      ],
    },
    {
      h: "Who qualifies",
      list: [
        "You prepare financial statements on the accrual basis. Cash-basis businesses are outside (see [cash versus accrual for Corporate Tax](/guides/uae-cash-vs-accrual-corporate-tax)).",
        "You have elected under Article 20(3) to tax gains and losses on the realisation basis, so fair value movements are not taxed until the property is sold. Article 2(5) of the Decision lets you make that election in the same return as the depreciation election, even if you missed it in your first tax period.",
        "The asset is investment property under IAS 40: a building, or part of one, held to earn rent or for capital appreciation, including a right-of-use asset held by a lessee. Land is excluded, as is anything IAS 40 itself excludes, such as owner-occupied property.",
        "The property is held at fair value. Property on the cost model is depreciated in the accounts already and is outside this Decision.",
      ],
    },
    {
      h: "How the deduction is calculated",
      ps: [
        "Each 12-month tax period, deduct the lower of (a) 4% of the original cost and (b) the tax written-down value at the start of the period. Prorate for a longer or shorter period, or for a property held for only part of it. Original cost is cost under IAS 40, plus later capitalised costs, at arm's length.",
        "The years before the Decision count. The Opening Value is the original cost less 4% for every calendar year, or part year, the company held the property before its first tax period under the Decision. Those earlier years are never deducted. They only shorten the 25 years left to claim. Use the free [investment property depreciation calculator](/tools/uae-investment-property-depreciation-calculator) to build the schedule.",
      ],
    },
    {
      h: "The election deadline",
      list: [
        "Holding investment property in the first tax period the Decision applies to (the first period starting on or after 1 January 2025): elect in the tax return for that period.",
        "First property acquired later: elect in the return for the period in which you first hold one.",
        "Coming out of [Small Business Relief](/guides/uae-small-business-relief): elect in the return for the first period in which the relief no longer applies.",
        "Miss the window and the right is forfeited (Article 3(4)).",
      ],
      ps: [
        "For a December year-end, the first period is the 2025 calendar year, and its return was due on 30 September 2026. With a 31 March year-end, the first period runs from 1 April 2025 to 31 March 2026 and the return is due by 31 December 2026. With a 30 June year-end, it is 1 July 2025 to 30 June 2026, due by 31 March 2027. Those companies still have time to decide.",
      ],
    },
    {
      h: "The clawback on sale",
      ps: [
        "The deduction is a timing benefit, not a permanent one. When the property is realised, the total depreciation claimed under the Decision is added back to taxable income in that period, on top of the realised gain itself. Realisation includes a sale or other derecognition, a switch from the fair value model to the cost model, and the business ceasing. Becoming an exempt person or electing Small Business Relief also counts, with the add-back in the last period before the change.",
        "Transfers within a Tax Group, or covered by [Article 26 qualifying group relief](/guides/uae-qualifying-group-relief) or Article 27 business restructuring relief, do not trigger the clawback. The transferee takes over the history instead. Under Article 6, the FTA may also refuse the deduction on a related-party transfer that lacks a valid commercial reason.",
      ],
    },
    {
      h: "Worked example",
      ps: [
        "A company with a December year-end bought an office building on 1 January 2022 for AED 20,000,000. A valuer allocates AED 6,000,000 to the land, so the building's original cost is AED 14,000,000. The company is on the accrual basis, holds the building at fair value and elected the realisation basis in its 2025 return, together with the Decision 173 election.",
        "Opening Value: the company held the building for three full calendar years (2022, 2023, 2024) before its first period under the Decision. 4% × 3 = 12%, and 12% of AED 14,000,000 is AED 1,680,000. Opening Value = AED 14,000,000 − AED 1,680,000 = AED 12,320,000.",
        "Annual deduction: 4% × AED 14,000,000 = AED 560,000, which is lower than the AED 12,320,000 written-down value, so AED 560,000 is deducted in 2025. At 9%, that saves AED 50,400 of tax a year. AED 12,320,000 ÷ AED 560,000 = 22 full years, so the deductions run from 2025 to 2046. With the three earlier years, that is 25 years in total.",
        "Sale: if the company sells the building on 31 December 2030, it has claimed six years, 2025 to 2030: 6 × AED 560,000 = AED 3,360,000. That amount is added back to 2030 taxable income, about AED 302,400 of tax at 9%, alongside the tax on the realised gain. The deemed AED 1,680,000 for 2022 to 2024 was never deducted and is not added back.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Split land from building on the day you buy, and keep the valuer's allocation with the fixed asset register. Record each year's tax deduction as a separate line in your Corporate Tax working papers, so the add-back on sale is a lookup, not a reconstruction. Hysaab's fixed asset register keeps each asset's cost and history beside the ledger it posts to, and the free [calculator](/tools/uae-investment-property-depreciation-calculator) builds the tax schedule to file with it.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I claim tax depreciation on investment property in the UAE?",
      a: "Yes, if you hold it at fair value, use accrual accounting and have elected the realisation basis under Article 20(3). Ministerial Decision No. 173 of 2025 then lets you elect to deduct the lower of 4% of original cost and the remaining tax written-down value each year, from tax periods starting on or after 1 January 2025.",
    },
    {
      q: "Is land included in the 4% deduction?",
      a: "No. The Decision defines investment property as a building or part of a building and excludes land, so split the purchase price between land and building.",
    },
    {
      q: "When must the election be made?",
      a: "In the tax return for the first tax period the Decision applies to, if you hold investment property then. If you acquire your first property later, elect in the return for that period. If you miss the window, the right is forfeited.",
    },
    {
      q: "What happens to the deduction when the property is sold?",
      a: "The total depreciation claimed is added back to taxable income in the period of sale. Transfers within a Tax Group or under Articles 26 and 27 do not trigger the add-back.",
    },
    {
      q: "Do the years before 2025 count?",
      a: "Yes, but only to reduce what is left to claim. The Opening Value is cost less 4% for each calendar year the property was held before the first period under the Decision. Those years are not deducted.",
    },
  ],
  related: ["uae-cash-vs-accrual-corporate-tax", "uae-qualifying-group-relief", "uae-small-business-relief", "uae-real-estate-vat"],
};

export const PROPERTY_GUIDES: Guide[] = [ipDepreciation];

/* ── Sources relied on (checked 20 October 2026) ─────────────────────

1. Ministerial Decision No. 173 of 2025 (issued 23 June 2025), MoF English text v12.1.26:
   https://mof.gov.ae/wp-content/uploads/2026/01/Ministerial-Decision-No.-173-of-2025-on-Depreciation-Adjustments-for-Investment-Properties-held-at-Fair-Value-for-the-Purposes-of-Federal-Decree-Law-No.-47-of-2022-en-v12.1.26.pdf
   - Article 1: Investment Property excludes land; Opening Value = cost less 4% per calendar
     year (prorated) held before the first period; Original Cost per IAS 40 at arm's length.
   - Article 2(1): lower of 4% of Original Cost per 12-month period (prorated) and TWDV;
     accrual basis + Article 20(3) realisation election; 2(4) all fair-valued IP;
     2(5) realisation election allowed in the same return.
   - Article 3: election timeline; 3(4) forfeiture.
   - Article 4: realisation events and add-back; 4(4) timing.
   - Article 6: related-party anti-abuse. Article 7: periods starting on or after 1 Jan 2025.
2. Secondary summaries consistent with the text: PwC, Deloitte, Andersen UAE (2025).
*/
