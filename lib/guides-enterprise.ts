import type { Guide } from "./guides";

/* ── Guides for mid-size and large businesses ────────────────────────
   Topics a group finance team or tax manager searches for: the 15%
   top-up tax, the 2027 e-invoicing go-live, the capital assets scheme,
   VAT tax groups and tax credit notes. Sources checked on 20 October
   2026 are listed at the end of the file; e-invoicing in particular
   is moving fast, so re-check those dates before each update. */

const dmtt: Guide = {
  slug: "uae-domestic-minimum-top-up-tax",
  title: "UAE 15% top-up tax (DMTT): who pays and when",
  description:
    "The UAE Domestic Minimum Top-up Tax for EUR 750m+ groups: scope, the 30 November 2026 registration deadline, the 15% calculation, safe harbours, an example.",
  updated: "2026-10-20",
  minutes: 9,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "If your group has consolidated revenue of EUR 750 million or more in at least two of the four preceding fiscal years, its UAE entities pay a Domestic Minimum Top-up Tax (DMTT) for fiscal years starting on or after 1 January 2025. The tax lifts the group's effective tax rate in the UAE to 15%. It sits on top of the 9% Corporate Tax and is set out in Cabinet Decision No. 142 of 2024, made under Federal Decree-Law No. 60 of 2023.",
        "Three dates matter now. Registration is separate from Corporate Tax registration and is due within seven months of the end of the first in-scope fiscal year. For fiscal years ending before 30 April 2026, which includes a calendar 2025 year, the FTA has set a transitional deadline of 30 November 2026. The first top-up tax return and payment are due 18 months after the end of the first year (30 June 2027 for a calendar 2025 year), and 15 months after year-end in later years.",
      ],
    },
    {
      h: "Why UAE groups end up below 15%",
      list: [
        "The headline Corporate Tax rate is 9%, already six points below the minimum.",
        "The first AED 375,000 of taxable income is taxed at 0%.",
        "A [Qualifying Free Zone Person](/guides/free-zone-corporate-tax-0-percent) pays 0% on qualifying income. For a group in scope, that 0% is often exactly what the top-up tax collects.",
        "The calculation blends all UAE entities of the group together, so one low-taxed free zone company pulls down the rate for the whole UAE footprint.",
      ],
    },
    {
      h: "How the top-up is calculated, in outline",
      ps: [
        "The rules follow the OECD's Pillar Two (GloBE) model, and Ministerial Decision No. 96 of 2026 adopts the OECD Commentary for the UAE. In outline: add up the GloBE income of all the group's UAE entities, and the covered taxes they bear. The effective tax rate is covered taxes ÷ GloBE income. The top-up percentage is 15% minus that rate.",
        "The top-up percentage is applied to excess profit, not to all profit. Excess profit is GloBE income less the substance-based income exclusion: a percentage of eligible payroll costs plus a percentage of the carrying value of tangible assets. The transitional percentages are 9.6% of payroll and 7.6% of tangible assets for years starting in 2025, and 9.4% and 7.4% for 2026. GloBE income and covered taxes start from the accounts but carry many adjustments, so treat any estimate as a first view. The [top-up tax estimator](/tools/uae-top-up-tax-estimator) runs the outline calculation.",
      ],
    },
    {
      h: "Safe harbours that can bring the tax to zero",
      list: [
        "Transitional CbCR safe harbour: for fiscal years starting before 1 January 2027 (and ending by 30 June 2028), the UAE top-up tax is deemed zero if the group's qualified country-by-country report passes one of three tests: de minimis (UAE revenue under EUR 10 million and profit under EUR 1 million), simplified effective tax rate (at least 16% for 2025 and 17% for 2026), or routine profits (profit no more than the substance-based exclusion).",
        "Initial phase of international activity: zero for up to five years where the group operates in no more than six jurisdictions and holds no more than EUR 50 million of tangible assets outside its main jurisdiction, subject to conditions.",
        "Excluded entities: investment entities and qualifying governmental and sovereign entities are outside the charge.",
      ],
      ps: [
        "A safe harbour removes the tax, not the paperwork. The FTA's registration guide TTGREG1 says in-scope entities must register even when the top-up tax is zero.",
      ],
    },
    {
      h: "Registration, returns and penalties",
      list: [
        "Register on EmaraTax. A designated filing entity can register all the UAE entities it represents.",
        "Late registration costs AED 10,000 under Cabinet Decision No. 75 of 2023, and the FTA's guide applies it per entity.",
        "Top-up tax return and payment, in AED: 15 months after year-end, or 18 months for the first year in scope.",
        "Pillar Two information return: Ministerial Decision No. 133 of 2026 sets who files. A single designated local entity may file for all UAE entities. No UAE filing is needed where the parent files in a country with a qualifying exchange agreement with the UAE, but the UAE entities must notify the FTA of that filer.",
        "EY reads the Cabinet Decision as giving transitional relief from penalties on the returns for periods starting on or before 31 December 2026, where the group has taken reasonable measures.",
      ],
    },
    {
      h: "Worked example",
      ps: [
        "A European group with EUR 2 billion of revenue has three UAE entities: a mainland trading company, a free zone distribution hub and a services company. For 2025, their combined GloBE income is AED 400,000,000 and their covered taxes are AED 30,000,000. UAE effective tax rate: 30,000,000 ÷ 400,000,000 = 7.5%. Top-up percentage: 15% − 7.5% = 7.5%.",
        "The UAE entities have eligible payroll of AED 50,000,000 and tangible assets of AED 200,000,000. Exclusion for 2025: 9.6% × 50,000,000 = AED 4,800,000, plus 7.6% × 200,000,000 = AED 15,200,000, total AED 20,000,000. Excess profit: 400,000,000 − 20,000,000 = AED 380,000,000. DMTT: 7.5% × 380,000,000 = AED 28,500,000, payable with the first return by 30 June 2027. The entities must register by 30 November 2026, whatever the final number.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "The inputs that decide the exclusion, payroll by entity and the fixed asset register, are ledger data. Hysaab keeps each UAE entity's books, payroll and fixed assets in one place, so the figures your Pillar Two adviser or group tax team needs can be pulled by entity and by year, rather than rebuilt from spreadsheets.",
      ],
    },
  ],
  faqs: [
    {
      q: "Who has to pay the UAE Domestic Minimum Top-up Tax?",
      a: "UAE entities of multinational groups with consolidated revenue of EUR 750 million or more in at least two of the four preceding fiscal years, for fiscal years starting on or after 1 January 2025. Investment entities and qualifying governmental entities are excluded.",
    },
    {
      q: "When is the DMTT registration deadline?",
      a: "Within seven months of the end of the first in-scope fiscal year. For fiscal years ending before 30 April 2026, including calendar 2025, the FTA set a transitional deadline of 30 November 2026. Registration is needed even if the top-up tax is zero.",
    },
    {
      q: "When is the first DMTT return due?",
      a: "18 months after the end of the first fiscal year in scope, so 30 June 2027 for a calendar 2025 year. Later returns are due 15 months after year-end. Payment is due in AED with the return.",
    },
    {
      q: "Does a free zone company pay the top-up tax?",
      a: "It can. A Qualifying Free Zone Person pays 0% Corporate Tax on qualifying income, but if it belongs to an in-scope group its income and taxes are blended with the group's other UAE entities, and the 0% rate pulls the UAE effective rate down.",
    },
    {
      q: "What is the penalty for registering late?",
      a: "AED 10,000 under Cabinet Decision No. 75 of 2023, which the FTA's registration guide applies for each entity that should have been registered.",
    },
  ],
  related: ["free-zone-corporate-tax-0-percent", "uae-transfer-pricing-documentation", "uae-corporate-tax-penalties", "uae-qualifying-group-relief"],
};

const einvoicing: Guide = {
  slug: "uae-e-invoicing-large-businesses-2027",
  title: "E-invoicing for AED 50m+ firms: the 2027 go-live",
  description:
    "UAE e-invoicing for AED 50m+ businesses: the 30 October 2026 provider deadline, the 1 January 2027 go-live, the tax group exclusion, penalties and a checklist.",
  updated: "2026-10-20",
  minutes: 8,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "If your business has annual revenue of AED 50 million or more, you must appoint an Accredited Service Provider (ASP) by 30 October 2026 and issue your business-to-business and business-to-government invoices as e-invoices from 1 January 2027. The appointment date was moved from 31 July 2026 in May 2026, but the go-live date did not move. Businesses below AED 50 million appoint by 31 March 2027 and go live on 1 July 2027. Government entities appoint by 31 March 2027 and go live on 1 October 2027.",
        "On 19 October 2026 the Ministry of Finance announced further changes. Transactions between members of the same VAT tax group are excluded for 24 months from 1 January 2027. The requirement to store e-invoice data inside the UAE has been removed. So has the duty to notify the FTA of a system failure within two business days.",
      ],
    },
    {
      h: "What an e-invoice is, and what it is not",
      ps: [
        "An e-invoice is structured data exchanged between the supplier's ASP and the customer's ASP, in the Peppol PINT format adapted for the UAE, and reported to the FTA. The FTA is explicit that a PDF, a Word file, an image, a scan or an email is not an e-invoice. Both sides need an ASP: the supplier to send, and the customer to receive.",
        "The legal base is Ministerial Decisions No. 243 and 244 of 2025 (the system and the phased timeline), Ministerial Decision No. 64 of 2025 (ASP accreditation), Cabinet Decision No. 106 of 2025 (penalties) and Cabinet Decision No. 100 of 2025 (the changes to tax invoices and credit notes).",
      ],
    },
    {
      h: "What is in scope, and what is not",
      list: [
        "In scope: business-to-business and business-to-government supplies by VAT-registered and other in-scope businesses, including zero-rated supplies such as exports.",
        "Out of scope: business-to-consumer sales.",
        "Excluded by Ministerial Decision No. 243 of 2025: sovereign government activities that do not compete with the private sector; international passenger flights on e-tickets; international air cargo on an airway bill (for 24 months); and exempt or zero-rated financial services.",
        "Excluded for 24 months from 1 January 2027: transactions between members of the same VAT tax group (announced on 19 October 2026). Advisers are already asking how this works for group members that also sell to outside customers, so expect further guidance.",
      ],
    },
    {
      h: "What changes in your invoicing rules",
      ps: [
        "Once you issue e-invoices, Article 59(16) of the VAT Executive Regulation switches off the [simplified tax invoice](/guides/uae-simplified-tax-invoice-aed-10000), the relief from invoicing wholly zero-rated supplies, and the FTA's power to waive invoice particulars. Article 60(8) removes the requirement for an electronic [credit note](/guides/uae-vat-tax-credit-notes) to show the original value, the correct value and the difference. Since the VAT Law amendments of 2024, input tax recovery also depends on holding the tax invoice in line with the e-invoicing system where one is required.",
      ],
    },
    {
      h: "Penalties under Cabinet Decision No. 106 of 2025",
      list: [
        "Not implementing the system, or not appointing an ASP, by your deadline: AED 5,000 for each month of non-compliance.",
        "An e-invoice or e-credit note not issued or sent in the required form or time: AED 100 each, capped at AED 5,000 a month for each category.",
        "Registration or master data changes not reported to your ASP on time: AED 1,000 a day.",
        "System failure not notified to the FTA: AED 1,000 a day. The October 2026 amendment removed the two-business-day notification duty, so confirm how this penalty applies once the amended text is published.",
      ],
      ps: [
        "Example: a company goes live three months late and issues 400 invoices a month outside the system. That is 3 × AED 5,000 = AED 15,000 for implementation, plus AED 100 × 400 = AED 40,000 a month for the invoices, capped at AED 5,000 a month, so 3 × AED 5,000 = AED 15,000. Total: AED 30,000. The bigger cost is commercial: customers who cannot recover input VAT on a non-compliant invoice will hold payment until it is reissued.",
      ],
    },
    {
      h: "Readiness list for the next ten weeks",
      list: [
        "Sign the ASP contract before 30 October 2026, and get its onboarding and testing slots in writing.",
        "Clean the customer and supplier master data: legal names, TRNs and Peppol identifiers. Bad master data is the first thing an ASP will reject.",
        "Map your ERP invoice and credit note fields to the Ministry's mandatory e-invoice fields, published in February 2026.",
        "Decide the process for credit notes, self-billing, and invoices issued by agents on behalf of principals.",
        "List which entities are in your VAT tax group, which flows are intra-group (excluded until the end of 2028) and which are not.",
        "Plan the inbound side: your suppliers' e-invoices will arrive through your ASP, so accounts payable intake must read them from there.",
        "Run a parallel month before go-live, and reconcile e-invoices reported against the VAT return.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab is not an Accredited Service Provider. It works upstream of one: it tests every invoice and credit note against the Article 59 and 60 fields, checks the buyer and supplier TRNs against your records, and flags a TRN that changes between invoices. That is the master data an ASP will reject if it is wrong. Use the [e-invoicing deadline checker](/tools/uae-e-invoicing-deadline-checker) to confirm your own dates.",
      ],
    },
  ],
  faqs: [
    {
      q: "When does UAE e-invoicing become mandatory?",
      a: "From 1 January 2027 for businesses with revenue of AED 50 million or more, 1 July 2027 for businesses below AED 50 million, and 1 October 2027 for government entities. Voluntary use opened on 1 July 2026.",
    },
    {
      q: "What is the deadline to appoint an Accredited Service Provider?",
      a: "30 October 2026 for businesses with revenue of AED 50 million or more (moved from 31 July 2026), and 31 March 2027 for businesses below AED 50 million and for government entities.",
    },
    {
      q: "Are transactions within a VAT tax group covered by e-invoicing?",
      a: "Not at first. The Ministry of Finance announced on 19 October 2026 that transactions between members of the same tax group are excluded for 24 months from 1 January 2027.",
    },
    {
      q: "Is a PDF invoice an e-invoice?",
      a: "No. The FTA states that PDF, Word, image, scanned and emailed invoices are not e-invoices. An e-invoice is structured data exchanged through Accredited Service Providers.",
    },
    {
      q: "What is the penalty for missing the e-invoicing deadline?",
      a: "AED 5,000 for each month of non-compliance under Cabinet Decision No. 106 of 2025, plus AED 100 per invoice not issued in the required form, capped at AED 5,000 a month for each category.",
    },
  ],
  related: ["uae-simplified-tax-invoice-aed-10000", "uae-tax-invoice-checklist", "uae-vat-tax-credit-notes", "uae-vat-tax-group"],
};

const capitalAssets: Guide = {
  slug: "uae-vat-capital-assets-scheme",
  title: "VAT capital assets scheme: the 10-year adjustment",
  description:
    "How the UAE VAT capital assets scheme works for assets of AED 5m or more: the W, X, Q and R − Z formula, the 10- and 5-year periods, disposals and an example.",
  updated: "2026-10-20",
  minutes: 8,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "If you buy or build an asset costing AED 5 million or more, excluding VAT, the input VAT you recover in the first year is not final. Under Articles 57 and 58 of the VAT Executive Regulation, you monitor it for 10 years for a building and 5 years for other assets. Each year in which the share of taxable use differs from Year 1, you adjust one-tenth (or one-fifth) of the original VAT up or down.",
        "The scheme matters for property owners, mixed-use developments, hospitals, banks and any business that makes exempt supplies, because a change in use can claw back VAT years after the purchase.",
      ],
    },
    {
      h: "What counts as a capital asset",
      list: [
        "A business asset with a cost of AED 5,000,000 or more, excluding VAT, on which VAT is payable.",
        "An estimated useful life of at least 10 years for a building or part of a building, or 5 years for other assets.",
        "Stock held for resale is never a capital asset.",
        "Staged payments add up: purchases or construction of a building, fit-out and refurbishment works (unless there is a distinct break between them), and goods assembled from separately supplied components are treated as one item once they reach AED 5 million.",
      ],
      ps: [
        "Cabinet Decision No. 149 of 2026 reworded the definition to refer to a business asset with a cost of AED 5 million or more, rather than a single item of expenditure. The [Cabinet Decision 149 guide](/guides/uae-vat-cabinet-decision-149-2026-input-tax) covers what that means for large expensed projects.",
      ],
    },
    {
      h: "The formula, step by step",
      list: [
        "W: the input VAT incurred on the asset in Year 1. Year 1 is the tax year in which you acquire it, or for an asset you build yourself, the year you start using it.",
        "X: the percentage of W you recovered in Year 1.",
        "Q: each later year's recovery percentage for that asset, worked out under the normal [partial exemption](/guides/uae-partial-exemption-input-vat) rules.",
        "R = W ÷ 10 × Q for a building, or W ÷ 5 × Q for other assets. Z = W ÷ 10 × X (or W ÷ 5 × X).",
        "If R is more than Z, increase your input tax by the difference. If R is less than Z, reduce it.",
        "Make the adjustment in the first tax period of the following tax year, the same period as the annual partial exemption wash-up. Record W, X and every adjustment in a capital asset register.",
      ],
    },
    {
      h: "Selling the asset, or joining a tax group",
      ps: [
        "If you sell or dispose of the asset before the period ends, the scheme stops in the year of disposal. Each remaining year is treated as if the asset were used wholly for the kind of supply the disposal is: fully taxable if the sale is taxable, fully exempt if the sale is exempt, and outside the business if it is not a supply in the course of business. All the remaining years' adjustments go into the return for the period of the disposal, so a taxable sale can release VAT that was blocked years earlier.",
        "Transferring the asset as part of a business transfer, joining a [VAT tax group](/guides/uae-vat-tax-group) or leaving one ends the tax year on that day, and a new tax year starts the next day with the asset's owner.",
      ],
    },
    {
      h: "Worked example: a mixed-use building",
      ps: [
        "A developer completes a building costing AED 50,000,000 plus VAT of AED 2,500,000 (W). In Year 1, 80% of the floor area is commercial (taxable) and 20% residential (exempt), so it recovers 80% (X), which is AED 2,000,000. One-tenth of W is AED 250,000, and Z = 250,000 × 80% = AED 200,000 every year.",
        "Year 2: Q is 80%, so R equals Z and nothing changes. Year 3: two commercial floors convert to residential and Q falls to 60%. R = 250,000 × 60% = AED 150,000, so input tax is reduced by 200,000 − 150,000 = AED 50,000. Year 4: Q rises to 90%. R = AED 225,000, so input tax increases by 225,000 − 200,000 = AED 25,000.",
        "Year 6: the developer sells the whole building as a taxable commercial supply. On the usual reading, Years 7 to 10 are treated as 100% taxable: 4 × 250,000 × (100% − 80%) = AED 200,000 of extra input tax, claimed in the return for the period of the sale. The [capital assets scheme calculator](/tools/uae-capital-assets-scheme-calculator) builds this table for your own figures.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab flags a purchase that reads like a capital asset before it is expensed, and keeps the fixed asset register beside the ledger. Recording W and X for every asset of AED 5 million or more on the day it is acquired is what makes the annual Q test a ten-minute job rather than an archive search.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is a capital asset for UAE VAT?",
      a: "A business asset costing AED 5 million or more, excluding VAT, on which VAT is payable, with an estimated useful life of at least 10 years for a building or 5 years for other assets. Stock for resale is excluded.",
    },
    {
      q: "How long is the capital assets scheme adjustment period?",
      a: "10 consecutive years for buildings or parts of buildings, and 5 years for other capital assets, starting with the tax year in which the asset is acquired.",
    },
    {
      q: "When is the capital asset adjustment made?",
      a: "In the first tax period of the following tax year, alongside the annual partial exemption adjustment. Disposal adjustments for the remaining years go in the return for the period of the disposal.",
    },
    {
      q: "Do I need a capital asset register?",
      a: "Yes. Article 58(4) requires a register recording the Year 1 input tax (W), the Year 1 recovery percentage (X) and every adjustment made.",
    },
  ],
  related: ["uae-partial-exemption-input-vat", "uae-real-estate-vat", "uae-vat-cabinet-decision-149-2026-input-tax", "uae-vat-tax-group"],
};

const taxGroup: Guide = {
  slug: "uae-vat-tax-group",
  title: "VAT tax groups in the UAE: when grouping pays",
  description:
    "Who can form a UAE VAT tax group, what changes (one TRN, no VAT between members, joint liability), the hidden cost of an exempt member, and a worked example.",
  updated: "2026-10-20",
  minutes: 7,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "Two or more UAE companies under common control can register as one VAT tax group. The group files one return under one TRN, and supplies between its members are disregarded, so management fees, cost recharges and intra-group sales carry no VAT. The price is that every member is jointly liable for the whole group's VAT. And because the group is one taxable person, an exempt member can reduce the input tax recovery of all the others.",
        "Grouping usually pays where a fully taxable member charges a member that cannot recover VAT in full, such as a residential landlord or a financial services company. It rarely pays where every member is fully taxable, apart from saving paperwork.",
      ],
    },
    {
      h: "Who can join",
      list: [
        "Each member must be a legal person with a place of establishment or a fixed establishment in the UAE. Individuals cannot join.",
        "The members must be related parties. One or more persons acting together must hold 50% or more of the votes or of the market value in each, or control each by other means (Article 9 of the Executive Regulation). The FTA can also treat businesses as related where they are linked economically, financially and through common management, staff or shareholders.",
        "One or more of the persons in that partnership must control the others.",
        "A government entity or charity cannot group with ordinary businesses.",
      ],
    },
    {
      h: "What changes once you are grouped",
      list: [
        "One representative member files the return and deals with the FTA. Any FTA notice served on it counts as served on every member.",
        "Supplies between members may be disregarded: no tax invoices and no VAT on intra-group charges.",
        "Supplies to and from outsiders, and imports, are treated as made or received by the representative member.",
        "All members are personally and jointly liable for the group's VAT (Article 12(2)).",
        "Group registration takes effect from the first day of the tax period after the application, or a date the FTA sets. The FTA decides within 20 business days and can refuse where grouping would enable evasion, significantly reduce tax revenue or add significant administrative burden.",
        "From 1 January 2027, transactions between members of the same tax group are excluded from [e-invoicing](/guides/uae-e-invoicing-large-businesses-2027) for 24 months.",
      ],
    },
    {
      h: "The costs people miss",
      list: [
        "One partial exemption ratio. The group recovers residual input tax on one ratio, so a member with exempt income dilutes recovery on shared overheads for everyone.",
        "Joint liability. An acquired company with VAT history brings that history to the whole group. Due diligence before adding a member matters.",
        "Capital assets. Joining or leaving the group ends the tax year for the [capital assets scheme](/guides/uae-vat-capital-assets-scheme) on that day.",
        "Data. One return means one consolidated set of VAT data on time, from every member's ledger.",
        "It is not the Corporate Tax group. A Corporate Tax tax group needs 95% ownership and has its own rules, covered in [qualifying group relief](/guides/uae-qualifying-group-relief).",
      ],
    },
    {
      h: "Worked example",
      ps: [
        "OpCo, a fully taxable services company, charges PropCo, a residential landlord making exempt supplies, a management fee of AED 12,000,000 a year. Ungrouped, OpCo charges VAT of 12,000,000 × 5% = AED 600,000, and PropCo cannot recover it. That is a real cost of AED 600,000 a year.",
        "Grouped, the fee is disregarded, so the AED 600,000 disappears. But OpCo's residual input tax on shared overheads, AED 1,000,000 a year and fully recovered until now, is apportioned on the group's ratio, say 85%. That loses 1,000,000 × 15% = AED 150,000. Net saving: 600,000 − 150,000 = AED 450,000 a year, in exchange for joint liability. Run the numbers for your own group before applying.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab tests every invoice on arrival in each company's books, so the figures that feed one group return come from ledgers that already reconcile. Keep intra-group recharges on their own accounts, so they drop out of the group return without disappearing from each member's accounts.",
      ],
    },
  ],
  faqs: [
    {
      q: "Who can form a VAT tax group in the UAE?",
      a: "Two or more legal persons, each with a place of establishment or fixed establishment in the UAE, that are related parties under common control. Individuals cannot join, and government entities or charities cannot group with ordinary businesses.",
    },
    {
      q: "Is VAT charged between members of a tax group?",
      a: "No. Supplies between members may be disregarded, so intra-group charges carry no VAT and need no tax invoice.",
    },
    {
      q: "Are tax group members liable for each other's VAT?",
      a: "Yes. All members are personally and jointly liable for the VAT payable by the representative member.",
    },
    {
      q: "When does a new tax group take effect?",
      a: "From the first day of the tax period after the FTA receives the application, or another date the FTA sets. The FTA aims to decide within 20 business days.",
    },
  ],
  related: ["uae-partial-exemption-input-vat", "uae-qualifying-group-relief", "intercompany-management-fees-uae", "uae-vat-capital-assets-scheme"],
};

const creditNotes: Guide = {
  slug: "uae-vat-tax-credit-notes",
  title: "UAE tax credit notes: when, what and which return",
  description:
    "When a UAE supplier must issue a tax credit note, the 14-day rule, the Article 60 fields, which VAT return each side adjusts, and a worked example.",
  updated: "2026-10-20",
  minutes: 6,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "When the VAT on an invoice turns out to be too high, the supplier corrects it with a tax credit note, not by editing the invoice. This happens when a supply is cancelled, the price is reduced, goods are returned or VAT was charged in error. The credit note must be issued within 14 days of the event that caused it. It must carry the fields in Article 60 of the Executive Regulation. The supplier reduces its output tax, and a registered customer reduces its input tax by the same amount.",
        "If the VAT was too low, the supplier issues a new tax invoice for the difference instead.",
      ],
    },
    {
      h: "When a credit note is needed",
      list: [
        "The supply was cancelled.",
        "The VAT treatment changed because the nature of the supply changed.",
        "The agreed price changed: a discount, a rebate or a settled claim.",
        "Goods were returned, or services not performed, and the money refunded in whole or part.",
        "VAT was charged in error, such as at 5% on a zero-rated export.",
      ],
      ps: [
        "A customer who simply does not pay is not a credit note case. That is [bad debt relief](/guides/uae-vat-bad-debt-relief) under Article 64, with its own conditions and a six-month wait.",
      ],
    },
    {
      h: "What a tax credit note must show (Article 60)",
      list: [
        "The words “Tax Credit Note” clearly displayed",
        "The supplier's name, address and TRN",
        "The customer's name, address and TRN, where the customer is registered",
        "The date of issue",
        "The value shown on the original invoice, the correct value, the difference, and the VAT on the difference, in AED. For a second credit note on the same invoice, the starting value is the value after the first one.",
        "A brief explanation of why it was issued",
        "Enough information to identify the original supply, in practice the invoice number and date",
      ],
      ps: [
        "Once you issue e-invoices, Article 60(8) removes the requirement for the original value, the correct value and the difference. A customer can issue the credit note for the supplier (“Tax Credit Note created by buyer”) only where both are registered and have agreed in advance that the supplier will not issue one.",
      ],
    },
    {
      h: "Which return, and when a voluntary disclosure is needed",
      ps: [
        "The supplier reduces its output tax in the return for the period in which it issues the credit note, and the registered customer reduces its input tax in the period in which it receives it. For a genuine change after the supply, such as a rebate, a return or a cancellation, that is the end of it.",
        "Errors are different. KPMG reports that, under FTA private clarifications, a supply wrongly treated as zero-rated must be corrected through a [voluntary disclosure](/guides/uae-vat-voluntary-disclosure) for the original period where the error exceeds AED 10,000, even though the corrective documents are issued now. Treat any error-driven correction above AED 10,000 as a disclosure question first and a credit note question second.",
      ],
    },
    {
      h: "Worked example",
      ps: [
        "On 5 March a supplier invoices a registered customer AED 200,000 plus VAT of AED 10,000. On 25 April they agree a 10% price reduction for late delivery. The supplier must issue the credit note within 14 days, by 9 May. It shows the original value AED 200,000, the correct value AED 180,000, the difference AED 20,000 and VAT on the difference of 20,000 × 5% = AED 1,000.",
        "The supplier reduces output tax by AED 1,000 in its April to June return, and the customer reduces input tax by AED 1,000 in the same quarter. If a further AED 5,000 credit follows in August, the second note starts from AED 180,000 and shows a correct value of AED 175,000, a difference of AED 5,000 and VAT of AED 250.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "Hysaab tests every inbound credit note against Article 60: the supplier TRN, the reference to the original invoice, the original and corrected values and the VAT on the difference. It holds any credit note that does not identify the invoice it corrects, so the input tax reversal lands against the right supply.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long does a UAE supplier have to issue a tax credit note?",
      a: "14 days from the date of the event that requires the adjustment, such as the agreed price reduction or the return of the goods.",
    },
    {
      q: "What must a UAE tax credit note include?",
      a: "The words Tax Credit Note, the supplier's and registered customer's names, addresses and TRNs, the date, the original value, the correct value, the difference and the VAT on it in AED, a brief reason, and information identifying the original supply.",
    },
    {
      q: "In which VAT return does the customer reverse the input tax?",
      a: "In the return for the period in which it receives the tax credit note, reducing input tax by the VAT shown on the note.",
    },
    {
      q: "Can I use a credit note to correct VAT charged in error?",
      a: "Yes, but where the error exceeds AED 10,000, check whether a voluntary disclosure for the original period is also required. The FTA has required one for supplies wrongly treated as zero-rated.",
    },
    {
      q: "Is a credit note needed when a customer does not pay?",
      a: "No. Non-payment is handled through bad debt relief under Article 64, not a credit note.",
    },
  ],
  related: ["uae-tax-invoice-checklist", "uae-vat-voluntary-disclosure", "uae-vat-bad-debt-relief", "uae-e-invoicing-large-businesses-2027"],
};

export const ENTERPRISE_GUIDES: Guide[] = [dmtt, einvoicing, capitalAssets, taxGroup, creditNotes];

/* ── Sources relied on (checked 20 October 2026) ─────────────────────

1. FTA consolidated VAT Executive Regulation (Sep 2026):
   https://tax.gov.ae/Datafolder/Files/Legislation/2026/Law-No-8-of-2017-and-its-amendments--09-2026.pdf
   - Art 9 related parties; Art 10 tax group registration (20 business days, effective date,
     refusal grounds, legal persons, government/charity); Art 12 effects, 12(2) joint liability.
   - Art 55(1)-(10) tax year and annual adjustment in first period of next tax year.
   - Art 57 capital asset definition (fn 41: amended by CD 149 of 2026), 57(3) staged payments.
   - Art 58 W, X, Q, R, Z; disposal 58(12), transfers/tax group 58(13), timing 58(15)-(16).
   - Art 59(16); Art 60(1) credit note fields, 60(4) buyer-created, 60(8) e-credit notes.

2. E-invoicing:
   - MoF changes of 19 Oct 2026 (tax group exclusion 24 months from 1 Jan 2027, Article 11
     storage, failure notice): The National, https://www.thenationalnews.com/business/2026/10/19/uae-amends-e-invoicing-regulations-as-implementation-deadline-draws-closer/
   - ASP deadline 30 Oct 2026 (from 31 Jul): Khaleej Times, 10 May 2026,
     https://www.khaleejtimes.com/business/uae-extends-e-invoicing-service-provider-deadline-to-october-2026
   - Phases and exclusions: KPMG, https://kpmg.com/ae/en/insights/tax-insights/implementation-of-the-electronic-invoicing-system-in-the-uae.html
   - FTA page (PDFs etc. are not e-invoices; MD 243, 244, 64 of 2025): https://tax.gov.ae/en/content/uae.einvoicing.aspx
   - Penalties CD 106 of 2025: EY, https://globaltaxnews.ey.com/news/2025-2433-uae-ministry-of-finance-publishes-cabinet-decision-on-penalties-for-noncompliance-with-e-invoicing
     and https://www.cleartax.com/ae/uae-e-invoicing-penalties-cabinet-decision
   - FDL 16 of 2024 input tax retention condition: KPMG, https://kpmg.com/ae/en/insights/tax-insights/updated-uae-vat-law-no-16-of-2024.html

3. DMTT:
   - EY, 18 Feb 2025, https://www.ey.com/en_gl/technical/tax-alerts/uae-issues-domestic-minimum-top-up-tax-legislation
     (CD 142 of 2024; scope; 15/18 months; safe harbours; penalty relief; currency).
   - Simmons & Simmons on TTGREG1 and MD 96/133 of 2026, https://www.simmons-simmons.com/en/publications/cmubfnyc4008uui18ubwb3gcs/uae-issues-new-top-up-tax-guides-and-filing-decision
     (registration within 7 months; 30 Nov 2026 transitional; AED 10,000 per entity).
   - SBIE transitional rates (OECD Model Rules Art 9.2): 2025 9.6%/7.6%, 2026 9.4%/7.4%.
   - Transitional CbCR safe harbour simplified ETR 15% (2023-24), 16% (2025), 17% (2026),
     de minimis EUR 10m / EUR 1m (OECD Safe Harbours, Dec 2022).

4. Credit notes: Art 61 triggers and 14-day rule (Art 62 as amended 2022): PwC,
   https://pwc.com/m1/en/tax/documents/2022/uae-vat-decree-law-amendment-oct-2022.pdf ;
   KPMG, https://kpmg.com/ae/en/insights/tax-insights/correcting-vat-errors-in-the-uae.html
   (zero-rated error corrected via voluntary disclosure above AED 10,000).
*/
