import type { Guide } from "./guides";

/* ── Depreciation rates in the UAE (and KSA) ──────────────────────────
   Written for the GSC queries "depreciation rate uae", "fixed asset
   depreciation rate in uae" and "depreciation percentage on fixed
   assets in uae". Primary texts checked on 10 November 2026:
   - Corporate Tax Law, Federal Decree-Law No. 47 of 2022 (MoF unofficial
     translation): Art 20(1)-(4), 28(1)-(3), 33, 61.
   - Ministerial Decision No. 114 of 2023, Art 2 (cash basis up to AED 3m)
     and Art 4(2) (IFRS for SMEs up to AED 50m revenue).
   - Ministerial Decision No. 134 of 2023, Art 2(1), 2(3)(a), 2(4)(a),
     Art 4, Art 7(2)-(4).
   - Ministerial Decision No. 120 of 2023, Art 2 and 3 (pre-CT gains on
     immovable property and intangibles held at historical cost).
   - Ministerial Decision No. 173 of 2025, Art 1 (Opening Value), Art 2
     (lower of 4% of Original Cost and TWDV; realisation basis required;
     all investment property at fair value), Art 4 (add-back).
   - KSA Income Tax Law, Royal Decree M/1 of 15/1/1425H, ZATCA Arabic
     consolidated text: Art 17(a)-(l) and Art 18 (repairs, 4%).
     Implementing Regulations (Ministerial Decision 1535 of 1425H),
     Art 9(4) conditions for the depreciation deduction.
   - IAS 16, IAS 38, IAS 40 (IFRS Foundation). Paragraph references are
     to the standards as issued; the full text sits behind the IFRS
     Foundation's free registration.
   Useful-life ranges in the practice table are typical of UAE IFRS
   financial statements and are labelled as practice, not law. */

const rates: Guide = {
  slug: "uae-depreciation-rates",
  title: "Depreciation rates in the UAE and Saudi Arabia (2026)",
  description:
    "The UAE sets no depreciation rates: Corporate Tax follows your IFRS useful lives. Typical rates by asset class, the tax adjustments and KSA's tax groups.",
  updated: "2026-11-10",
  published: "2026-11-10",
  minutes: 11,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "There is no official table of depreciation rates in the UAE. Neither the Corporate Tax Law nor any Ministerial Decision sets a percentage for buildings, vehicles, computers or furniture. Corporate Tax starts from the profit in your financial statements, prepared under IFRS, so the depreciation you charge in the accounts is, with a few specific exceptions, the depreciation you deduct for tax.",
        "That puts the decision with you. Under IAS 16 each business estimates the useful life of its own assets, and the straight-line rate is simply 100% divided by that life: a five-year life is 20% a year, a 25-year life is 4%. The life has to be reasonable, written into an accounting policy, applied consistently and reviewed every year. Your auditor tests it, and the FTA can question a life that does not reflect how the asset is actually used.",
        "Saudi Arabia is different. For income tax, Article 17 of the Income Tax Law fixes five depreciation groups with statutory rates from 5% to 25%, applied on a declining balance to a pool of assets. Both regimes are set out below, with the rates commonly used in UAE practice and a worked example. The free [depreciation calculator](/tools/uae-depreciation-calculator) builds the schedule for either.",
      ],
    },
    {
      h: "Why the UAE has no tax depreciation table",
      ps: [
        "Article 20(1) of the Corporate Tax Law requires taxable income to be worked out from standalone financial statements prepared under accounting standards accepted in the State, and Article 20(2) starts the calculation from accounting income. Ministerial Decision No. 114 of 2023 names those standards: IFRS, or IFRS for SMEs where revenue does not exceed AED 50 million. A business with revenue up to AED 3 million may use the cash basis instead.",
        "Article 28(1) allows a deduction for expenditure incurred wholly and exclusively for the business that is not capital in nature. Capital spending is therefore not deducted when it is paid. It reaches the tax computation through depreciation in the income statement. Article 7(4) of Ministerial Decision No. 134 of 2023 confirms that what counts as capital in nature is decided by the accounting standards you apply, and Article 7(3) lets any capital cost that was never deducted be set against the gain or loss when the asset is sold. There is no separate capital allowances regime, no first-year allowance and no option to claim faster depreciation for tax than in the accounts.",
        "VAT is a separate question. Depreciation has no effect on VAT, except that a single asset costing AED 5 million or more falls under the [capital assets scheme](/guides/uae-vat-capital-assets-scheme), which adjusts input tax over five or ten years whatever useful life the accounts use.",
      ],
    },
    {
      h: "Typical useful lives and rates in UAE practice",
      ps: [
        "The ranges below are what UAE companies commonly disclose in IFRS financial statements. They are practice, not law, and no authority publishes them. Use them as a sense check, then set lives that fit your own assets, usage and replacement cycle. The rate is the straight-line rate on the depreciable amount.",
      ],
      list: [
        "Land: not depreciated. IAS 16 treats land as having an unlimited useful life, so split the purchase price of a property between land and building on day one.",
        "Buildings, owned and permanent: 20 to 50 years, so 2% to 5% a year.",
        "Movable or prefabricated buildings, site cabins: 5 to 10 years, 10% to 20%.",
        "Leasehold improvements and office fit-out: the shorter of the remaining lease term and the life of the work, commonly 5 to 10 years, 10% to 20%.",
        "Plant and machinery: 5 to 15 years, about 6.67% to 20%, depending on the industry and shift pattern.",
        "Motor vehicles: 3 to 5 years, 20% to 33.33%, usually with a residual value for resale.",
        "Computers and IT hardware: 3 to 5 years, 20% to 33.33%.",
        "Software and other finite-life intangible assets (IAS 38): 3 to 5 years for most business software, 20% to 33.33%; licences over their contract term.",
        "Office equipment: 3 to 5 years, 20% to 33.33%.",
        "Furniture and fixtures: 4 to 10 years, 10% to 25%.",
        "Aircraft and ships: 15 to 25 years for the hull or airframe, with engines and major overhauls depreciated as separate components over shorter lives.",
      ],
    },
    {
      h: "Setting a useful life you can defend",
      ps: [
        "IAS 16 asks you to consider the expected usage of the asset, its physical wear and tear given the shifts it runs and the maintenance programme, technical or commercial obsolescence, and any legal or contractual limit such as the lease on the premises a fit-out sits in. The life is the period over which the asset is expected to be available for use by your business, which can be shorter than its economic life if you replace assets early.",
        "Write the lives into a fixed asset policy, by class, and have it approved. Under IAS 16.51 the residual value and useful life are reviewed at least at each financial year-end, and a change is accounted for prospectively as a change in accounting estimate under IAS 8, not by restating prior years. IFRS for SMEs (Section 17) requires a review only when there is an indication that the life or residual value has changed. A policy that sets every asset to the same life, or lives that have not been looked at since the company was formed, is a common audit finding.",
      ],
    },
    {
      h: "Residual value, components and when depreciation starts",
      list: [
        "Residual value: the amount you would get today for the asset if it were already at the age and condition expected at the end of its useful life, less disposal costs. Depreciation is charged on cost less residual value. For most office assets it is close to nil; for vehicles and aircraft it can be material.",
        "Components: each part of an item with a cost that is significant in relation to the total is depreciated separately (IAS 16.43). A building's structure, lifts, HVAC plant and roof, or an aircraft's airframe and engines, usually have different lives.",
        "Start and stop: depreciation starts when the asset is available for use, meaning in the location and condition intended by management (IAS 16.55), not when the invoice is paid. It continues while the asset is idle and stops when the asset is classified as held for sale or derecognised.",
        "Method: straight-line, reducing (diminishing) balance and units of production are all allowed (IAS 16.62), provided the method reflects how the asset's benefits are consumed. A method based on revenue is not allowed for property, plant and equipment (IAS 16.62A), and for intangible assets it is presumed inappropriate (IAS 38.98A).",
        "Intangibles: finite-life intangible assets are amortised over their useful life; indefinite-life intangible assets and goodwill are not amortised under full IFRS but are tested for impairment.",
      ],
    },
    {
      h: "Capitalisation thresholds",
      ps: [
        "IFRS sets no minimum value for capitalising an asset. IAS 16 leaves the unit of measure to judgement and allows small items to be aggregated, so most businesses set a threshold below which purchases are expensed, for example AED 5,000 per item, with a note on how bulk purchases such as a batch of laptops are treated. The threshold should be immaterial for the size of the business, written into the policy and applied consistently. For Corporate Tax this matters only for timing: an expensed item is deducted at once, a capitalised one over its life. It has nothing to do with the AED 5 million VAT capital asset threshold.",
      ],
    },
    {
      h: "Where UAE Corporate Tax does adjust depreciation",
      ps: [
        "The deduction follows the accounts except in the following cases, each of which comes from a specific provision rather than from a rate table.",
      ],
      list: [
        "Non-business or mixed use: under Article 28(2) and (3), only the business proportion of a cost is deductible, and Article 7(2) of Ministerial Decision No. 134 of 2023 denies depreciation on any capitalised cost that would not have been deductible had it been expensed. An asset used partly for private purposes or to earn exempt income gets depreciation only on the deductible share.",
        "Revalued assets: Article 2(1) of Ministerial Decision No. 134 of 2023 brings into taxable income gains reported outside profit or loss that will never pass through it, which includes an IAS 16 revaluation surplus. A business that elects the realisation basis under Article 20(3) instead leaves the uplift out, and under Article 2(3)(a) and 2(4)(a) of that Decision also excludes the depreciation on the part of the carrying amount above original cost until the asset is realised.",
        "Investment property at fair value: an IAS 40 property on the fair value model has no depreciation in the accounts. Ministerial Decision No. 173 of 2025 lets a company that has elected the realisation basis claim the lower of 4% of the building's original cost and its tax written-down value each year, excluding land. The election is irrevocable, covers all its investment property at fair value, and the total claimed is added back when the property is sold. The full rules are in our guide to [investment property tax depreciation](/guides/uae-investment-property-tax-depreciation), with a [calculator](/tools/uae-investment-property-depreciation-calculator).",
        "Transfers within a group: where an asset moves between members of a Qualifying Group under Article 26 or under business restructuring relief in Article 27 without a taxable gain, Articles 4 and 5 of Ministerial Decision No. 134 of 2023 exclude the transferee's depreciation on the untaxed uplift. See [qualifying group relief](/guides/uae-qualifying-group-relief).",
        "Assets held before Corporate Tax: under Article 61 the opening tax balance sheet is the closing balance sheet of the last financial year before the first tax period, so depreciation carries on from book values. Ministerial Decision No. 120 of 2023 lets a business exclude the pre-Corporate Tax part of a later gain on immovable property and intangible assets held at historical cost, but the election is made in the first tax return and does not change the depreciation.",
        "Interest cap: depreciation and amortisation are added back in the adjusted EBITDA used for the [interest deduction limitation](/guides/uae-interest-deduction-limitation), so a capital-heavy business has a larger cap.",
      ],
    },
    {
      h: "Saudi Arabia: statutory tax depreciation groups and rates",
      ps: [
        "In Saudi Arabia, income tax depreciation is set by law. It applies to income tax payers, such as the share of a Saudi company owned by non-Saudi shareholders and non-residents with a permanent establishment. Zakat has its own rules, which this guide does not cover. Article 17(a) of the Income Tax Law allows depreciation on tangible and intangible assets, other than land, that lose value through use, wear or obsolescence, are used wholly or partly to earn taxable income, and keep a value beyond the tax year. Article 17(b) sets the groups:",
      ],
      list: [
        "Group 1, fixed buildings: 5%.",
        "Group 2, movable industrial and agricultural buildings: 10%.",
        "Group 3, factories, plant, machinery, equipment and apparatus, computer software, and passenger cars and goods vehicles: 25%.",
        "Group 4, geological survey, drilling, exploration and other preliminary work to extract natural resources and develop their fields: 20%.",
        "Group 5, all other depreciable tangible and intangible assets not in groups 1 to 4, such as furniture, aircraft, ships, trains and goodwill: 10%.",
      ],
    },
    {
      h: "How the KSA pool works",
      ps: [
        "Assets are not depreciated one by one. Under Article 17(d) and (e), each group is a pool, and the year's depreciation is the group rate applied to the pool's remaining value at the end of the tax year. That remaining value is last year's closing value after depreciation, plus 50% of the cost of assets placed in service in the current year and 50% of those placed in service in the previous year, less 50% of the proceeds from disposals in the current and previous years. In effect half of each addition enters the pool in its first year and half in its second, and there is no residual value and no monthly pro-rata.",
      ],
      list: [
        "If 50% of the disposal proceeds is more than the pool, the pool is reduced to nil and the excess is added to taxable income (Article 17(g)).",
        "A pool of less than SAR 1,000 at year-end may be deducted in full (Article 17(h)), and if every asset in a group is disposed of, the remaining balance is deductible (Article 17(i)).",
        "Land and buildings bought or sold together are split on a reasonable basis (Article 17(j)); assets used only partly to earn taxable income are depreciated on that part (Article 17(k)); assets under build-operate-transfer and build-own-operate-transfer contracts may be depreciated over the contract term (Article 17(l)).",
        "Repairs and improvements are deductible up to 4% of the group's remaining value at year-end; the excess is added to the pool (Article 18).",
        "Article 9(4) of the Implementing Regulations adds that the asset must not be held for resale, must be owned under supporting documents such as a title deed or purchase contract and invoice, and is still depreciated if it stands idle during the year.",
      ],
    },
    {
      h: "Worked example",
      ps: [
        "A machine costing 500,000 enters service on 1 April 2026, with a residual value of 50,000 and a ten-year useful life. The financial year ends in December. In a UAE company the straight-line charge is (500,000 − 50,000) ÷ 120 months = AED 3,750 a month: AED 33,750 for the nine months of 2026, AED 45,000 a year from 2027 to 2035, and AED 11,250 for the last three months in 2036, a total of AED 450,000. That is 10% of the depreciable amount, or 9% of cost, and for a machine used wholly in the business the Corporate Tax deduction is the same figure.",
        "In a Saudi company subject to income tax, the same machine at SAR 500,000 falls in group 3 at 25%. For 2026 the pool is SAR 250,000 and the deduction SAR 62,500, leaving SAR 187,500. For 2027 the second half joins, so the pool is SAR 437,500 and the deduction SAR 109,375, leaving SAR 328,125. For 2028 the deduction is SAR 82,031.25. Over the three years tax depreciation is SAR 253,906.25 against SAR 123,750 of straight-line book depreciation. The difference of SAR 130,156.25 is a taxable temporary difference: at the 20% income tax rate, a deferred tax liability of about SAR 26,031 under IAS 12 for a company wholly subject to income tax. The [deferred tax calculator](/tools/ias12-deferred-tax-calculator) works through the entry.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab's fixed asset register keeps each asset's cost, in-service date and history beside the ledger it posts to, and depreciation is posted by asset class as part of the [month-end close](/guides/month-end-close-checklist). The free [depreciation calculator](/tools/uae-depreciation-calculator) builds the book schedule, or the KSA tax pool, for a single asset.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the depreciation rate for fixed assets in the UAE?",
      a: "There is no statutory rate. Each business sets useful lives under IAS 16 and the straight-line rate is 100% divided by the life. Common practice is 2% to 5% for buildings, 20% to 33% for vehicles, computers and office equipment, 10% to 25% for furniture and around 7% to 20% for plant and machinery.",
    },
    {
      q: "Does the FTA publish depreciation rates for Corporate Tax?",
      a: "No. UAE Corporate Tax starts from accounting income under IFRS, so the depreciation in your financial statements is generally deductible as it stands. The FTA can challenge a useful life that is not reasonable or not supported, and specific adjustments apply to revalued assets, mixed-use assets and group transfers.",
    },
    {
      q: "Can I use faster depreciation for tax than in my UAE accounts?",
      a: "No. There are no capital allowances or accelerated tax depreciation in the UAE. The one tax-only depreciation deduction is the 4% election under Ministerial Decision No. 173 of 2025 for investment property held at fair value, which the accounts do not depreciate.",
    },
    {
      q: "What is the depreciation rate for buildings in the UAE?",
      a: "Most UAE companies use useful lives of 20 to 50 years for buildings they own, which is 2% to 5% a year straight-line, often with separate lives for lifts, HVAC and fit-out. Land is not depreciated. In Saudi Arabia, fixed buildings are in tax group 1 at 5%.",
    },
    {
      q: "What is the depreciation rate for vehicles in the UAE?",
      a: "Typically three to five years, 20% to 33.33% a year, with a residual value where vehicles are sold on. In Saudi Arabia, passenger cars and goods vehicles are in tax group 3 at 25% on the declining-balance pool.",
    },
    {
      q: "What are the tax depreciation rates in Saudi Arabia?",
      a: "Under Article 17 of the Income Tax Law: fixed buildings 5%; movable industrial and agricultural buildings 10%; factories, machinery, equipment, software and vehicles 25%; natural resource survey and exploration 20%; all other depreciable assets, including furniture, aircraft, ships and goodwill, 10%. Each rate applies to the group's remaining value at year-end.",
    },
    {
      q: "When does depreciation start?",
      a: "When the asset is available for use, meaning installed and in the condition management intends, under IAS 16.55. Most businesses prorate the first year by months. In Saudi Arabia's tax pool there is no pro-rata: half the cost enters the pool in the year of service and half the next year.",
    },
  ],
  sources: [
    { label: "Federal Decree-Law No. 47 of 2022 on the Taxation of Corporations and Businesses (MoF), Articles 20, 28, 33, 61", href: "https://mof.gov.ae/wp-content/uploads/2022/12/Federal-Decree-Law-No.-47-of-2022-EN.pdf" },
    { label: "Ministerial Decision No. 114 of 2023 on Accounting Standards and Methods for Corporate Tax (MoF)", href: "https://mof.gov.ae/wp-content/uploads/2023/05/Ministerial-Decision-No.-114-of-2023-on-the-Accounting-Standards-and-Methods-for-Corporate-Tax-Purposes.pdf" },
    { label: "Ministerial Decision No. 134 of 2023 on the General Rules for Determining Taxable Income (MoF), Articles 2, 4, 5, 7", href: "https://mof.gov.ae/wp-content/uploads/2023/05/Ministerial-Decision-No.-134-of-2023-on-the-on-the-General-Rules-for-Determining-Taxable-Income-for-Corporate-Tax-Purposes.pdf" },
    { label: "Ministerial Decision No. 120 of 2023 on Adjustments under the Transitional Rules (MoF)", href: "https://mof.gov.ae/wp-content/uploads/2023/05/Ministerial-Decision-No.-120-of-2023-on-the-Adjustments-Under-the-Transitional-Rules-for-the-Purposes-of-Federal-Decree-Law-No.-47-of-2022.pdf" },
    { label: "Ministerial Decision No. 173 of 2025 on Depreciation Adjustments for Investment Properties held at Fair Value (MoF)", href: "https://mof.gov.ae/wp-content/uploads/2026/01/Ministerial-Decision-No.-173-of-2025-on-Depreciation-Adjustments-for-Investment-Properties-held-at-Fair-Value-for-the-Purposes-of-Federal-Decree-Law-No.-47-of-2022-en-v12.1.26.pdf" },
    { label: "KSA Income Tax Law, Royal Decree M/1 of 15/1/1425H, Articles 17 and 18 (ZATCA, Arabic)", href: "https://zatca.gov.sa/ar/HelpCenter/guidelines/Documents/%D9%86%D8%B8%D8%A7%D9%85%20%D8%B6%D8%B1%D9%8A%D8%A8%D8%A9%20%D8%A7%D9%84%D8%AF%D8%AE%D9%84.pdf" },
    { label: "Implementing Regulations of the KSA Income Tax Law, Article 9(4) (ZATCA)", href: "https://zatca.gov.sa/en/RulesRegulations/Taxes/Documents/Regulations_of_Income_Tax.pdf" },
    { label: "IAS 16 Property, Plant and Equipment (IFRS Foundation)", href: "https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/" },
    { label: "IAS 38 Intangible Assets (IFRS Foundation)", href: "https://www.ifrs.org/issued-standards/list-of-standards/ias-38-intangible-assets/" },
    { label: "IAS 40 Investment Property (IFRS Foundation)", href: "https://www.ifrs.org/issued-standards/list-of-standards/ias-40-investment-property/" },
  ],
  related: [
    "uae-investment-property-tax-depreciation",
    "uae-vat-capital-assets-scheme",
    "month-end-close-checklist",
    "uae-cash-vs-accrual-corporate-tax",
  ],
  cta: { href: "/accounting", label: "See how Hysaab Finance runs the close" },
};

export const DEPRECIATION_GUIDES: Guide[] = [rates];
