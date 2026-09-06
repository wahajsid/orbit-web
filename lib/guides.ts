/* ── The answers hub ─────────────────────────────────────────────────
   Practical Gulf finance guides — the citable, answer-shaped content
   the site ranks and gets quoted on. Each guide is data, rendered by
   app/guides/[slug]. Tax-law guides carry the disclaimer and should be
   reviewed against the official text when regulations move. */

export type GuideSection = { h: string; ps?: string[]; list?: string[] };
export type Guide = {
  slug: string;
  title: string;
  description: string;
  updated: string; // ISO date
  minutes: number;
  tax: boolean; // true → render the not-tax-advice disclaimer
  sections: GuideSection[];
};

export const GUIDES: Guide[] = [
  {
    slug: "uae-tax-invoice-checklist",
    title: "What makes a valid UAE tax invoice — the Article 59 checklist",
    description:
      "The exact fields the FTA requires on a full and a simplified tax invoice under Article 59 of the UAE VAT Executive Regulations, and what an invalid invoice costs you.",
    updated: "2026-08-16",
    minutes: 4,
    tax: true,
    sections: [
      {
        h: "Why it matters",
        ps: [
          "Input VAT can only be recovered against a valid tax invoice. If a supplier's invoice fails the requirements of Article 59 of the UAE VAT Executive Regulations, the 5% you paid is not recoverable until the invoice is corrected — and claiming it anyway is exactly the kind of finding a Federal Tax Authority audit exists to catch.",
        ],
      },
      {
        h: "A full tax invoice must show",
        list: [
          "The words “Tax Invoice” clearly displayed on the document",
          "The supplier's name, address and Tax Registration Number (TRN)",
          "The recipient's name, address and TRN, where the recipient is registered",
          "A sequential invoice number, or a unique number that identifies the document",
          "The date of issue — and the date of supply, if it differs",
          "A description of the goods or services supplied",
          "For each line: the unit price, quantity or volume, the rate of tax and the amount payable, in AED",
          "Any discount offered",
          "The gross amount payable in AED",
          "The tax amount payable in AED — with the exchange rate applied, if the invoice was issued in another currency",
          "Where the recipient accounts for the tax (reverse charge), a statement saying so and a reference to the relevant provision",
        ],
      },
      {
        h: "When a simplified tax invoice is enough",
        ps: [
          "For supplies under AED 10,000, or where the recipient is not registered for VAT, a simplified tax invoice is permitted. It still must show: the words “Tax Invoice”, the supplier's name, address and TRN, the date of issue, a description of the goods or services, and the total consideration with the tax amount charged.",
        ],
      },
      {
        h: "The failures we see most",
        list: [
          "No TRN, or a TRN that doesn't validate — the single most common failure",
          "The words “Tax Invoice” missing (a quotation or delivery note dressed as an invoice)",
          "VAT charged at the wrong rate, or arithmetic that doesn't reconcile line-by-line",
          "Foreign-currency invoices with no AED tax amount or exchange rate",
          "The same invoice arriving twice through two channels and being claimed twice",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit tests every inbound invoice against this checklist on arrival, holds the input VAT on failures instead of claiming it, names the exact failing field, and can draft the correction request to the supplier. The claim happens when the paper holds up — not before.",
        ],
      },
    ],
  },
  {
    slug: "uae-tax-deadlines",
    title: "UAE VAT and Corporate Tax deadlines, in one place",
    description:
      "When UAE VAT returns and payments fall due, how Corporate Tax filing works after the 9-month rule, and the KSA VAT cadence — with the penalties for missing them.",
    updated: "2026-08-16",
    minutes: 3,
    tax: true,
    sections: [
      {
        h: "VAT: 28 days after the tax period ends",
        ps: [
          "UAE VAT returns are filed, and the tax paid, within 28 days of the end of the tax period the FTA assigned you — quarterly for most businesses, monthly for larger ones. When the deadline lands on a weekend or public holiday it moves to the next business day.",
          "Missing a filing carries a fixed penalty for the first offence and a larger one on repetition within 24 months; late payment adds percentage-based penalties that grow the longer the tax stays unpaid.",
        ],
      },
      {
        h: "Corporate Tax: nine months after year-end",
        ps: [
          "The UAE Corporate Tax return is filed, and the 9% tax paid, within nine months of the end of the relevant financial year. A December year-end means the following 30 September. There is no monthly CT filing — but a business that only thinks about CT in month eight has usually already told the FTA a different story through its VAT returns.",
          "That is why reconciling VAT-declared revenue against the CT position monthly matters: the two returns must tell one story, and the time to explain a gap is when it appears, not at filing.",
        ],
      },
      {
        h: "KSA, briefly",
        ps: [
          "KSA VAT (15%) is filed monthly for businesses with annual taxable supplies above SAR 40 million and quarterly otherwise, with returns and payment due by the last day of the month following the period. ZATCA's e-invoicing regime additionally requires cleared or reported e-invoices depending on your integration wave.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "A deadline watchdog tracks every registration's filing calendar, escalates as dates approach (green → amber at 14 days → red at 3), assembles the VAT return from the ledger as the month runs, and reconciles VAT against CT continuously so the filings never diverge silently.",
        ],
      },
    ],
  },
  {
    slug: "month-end-close-checklist",
    title: "A month-end close checklist for UAE SMEs",
    description:
      "The eight steps of a defensible month-end close — bank to lock — in the order that avoids rework, and where the time actually goes.",
    updated: "2026-08-16",
    minutes: 5,
    tax: false,
    sections: [
      {
        h: "The order matters",
        ps: [
          "Most close pain is sequencing pain: accruals proposed before the AP cutoff, VAT drafted before the bank is matched, a lock that has to be reopened. The list below is ordered so each step's inputs are already settled when you reach it.",
        ],
      },
      {
        h: "The eight steps",
        list: [
          "1 · Documents in — chase the stragglers: every invoice, receipt and statement for the month filed and readable, duplicates eliminated",
          "2 · AP cutoff — post everything received; list what's expected but missing (that list feeds the accruals)",
          "3 · Bank reconciliation — every bank line matched to a document or explicitly explained; unmatched lines are findings, not filler",
          "4 · Accruals & prepayments — accrue the missing regulars (rent, utilities, subscriptions), release the prepayment schedules due this month",
          "5 · Depreciation & payroll — post depreciation across classes; post the payroll run with EOSB gratuity provision movements",
          "6 · VAT draft — build the return from the posted ledger, with input VAT held on any invoice that fails the tax-invoice test",
          "7 · Variance review — explain the month's significant movements line-by-line; what can't be explained gets flagged, not smoothed",
          "8 · Lock — when every gate is green, close and lock the period, in Orbit and in the connected ledger, so it cannot quietly change",
        ],
      },
      {
        h: "What a good close looks like",
        ps: [
          "Two to three days, not two to three weeks. The measure isn't speed for its own sake — it's that steps 1–6 are mechanical and should run themselves, leaving human time for step 7, the only step that actually requires judgement.",
          "A defensible close also leaves a trail: every posting carries its evidence, every adjustment its reason, every lock its timestamp. If handing the month to an auditor makes you nervous, the close isn't done — it's just stopped.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit runs steps 1–6 as agents with confidence gates, presents step 7 as plain-language decisions with the evidence attached, and enforces step 8 as a hard lock that agents cannot cross. The close cockpit shows the whole checklist live — what's done, what's posting, what needs you.",
        ],
      },
    ],
  },
  {
    slug: "keep-your-ledger",
    title: "Why Orbit sits on top of your ledger instead of replacing it",
    description:
      "Switching accounting systems is a migration project with an auditor problem. The case for AI that posts into the ledger you already have — Zoho, Xero, QuickBooks, Odoo, Wafeq or ERPNext.",
    updated: "2026-08-16",
    minutes: 4,
    tax: false,
    sections: [
      {
        h: "The switching tax",
        ps: [
          "Every 'switch to our platform' pitch hides the same bill: re-keying or migrating history, retraining the team, re-teaching your accountant and auditor a system they don't know, and a cutover month where two systems disagree. For a working SME the migration usually costs more than the software.",
        ],
      },
      {
        h: "What sitting on top means, concretely",
        list: [
          "Your chart of accounts is discovered and mapped — with your review — not replaced",
          "Approved journals post into the ledger two ways; anything touching an unmapped account is held with the reason stated, never half-pushed",
          "The ledger stays the system of record your auditor already trusts; Orbit carries the evidence trail behind every number",
          "Payables can land as proper bills where the ledger requires it — ledgers reserve their control accounts for their own documents, and Orbit respects that",
          "One connected ledger at a time, so there is always a single source of truth",
          "Disconnect any time, from either side — your books remain yours, in your ledger",
        ],
      },
      {
        h: "When replacing is right anyway",
        ps: [
          "If you run no accounting system at all, there is nothing to preserve: Orbit keeps the books itself from day one — chart of accounts, journals and evidence included. The point isn't that ledgers are sacred; it's that a business already invested in one shouldn't have to abandon it to get an AI finance team.",
        ],
      },
    ],
  },
];

GUIDES.push(
  {
    slug: "uae-eosb-gratuity",
    title: "How UAE end-of-service gratuity (EOSB) is calculated",
    description:
      "The 21-day and 30-day rule, what counts as basic wage, the two-year cap — and why the provision belongs in your books every month, not as a year-end surprise.",
    updated: "2026-08-16",
    minutes: 4,
    tax: true,
    sections: [
      {
        h: "The core rule",
        ps: [
          "A full-time foreign employee who completes at least one year of continuous service is entitled to an end-of-service benefit calculated on their basic wage: 21 days of basic wage for each of the first five years of service, and 30 days for each year beyond five. The total benefit is capped at two years' wage.",
          "Two details do most of the damage in practice: the calculation runs on the basic wage — allowances for housing, transport and the like are excluded — and unpaid days of absence don't count toward the service period.",
        ],
      },
      {
        h: "A worked example",
        ps: [
          "An employee on a basic wage of AED 10,000/month leaves after 7 years. Daily basic wage: 10,000 × 12 ÷ 365 ≈ AED 328.77. First five years: 5 × 21 days = 105 days. Years six and seven: 2 × 30 = 60 days. Total 165 days ≈ AED 54,247.",
        ],
      },
      {
        h: "Why it belongs in your monthly books",
        ps: [
          "The gratuity is a liability that grows with every month of service. A business that only computes it when someone resigns is carrying an understated liability all year — and discovering the true cost at the worst moment. The clean pattern: accrue the provision monthly per employee, and settle against the provision on exit, so the P&L feels the cost in the periods that earned it.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit's payroll engine computes the EOSB provision per employee as part of the monthly run, posts the provision movements with the register as evidence, and keeps the salary history append-only — so the balance sheet always carries what you actually owe.",
        ],
      },
    ],
  },
  {
    slug: "uae-blocked-input-vat",
    title: "Input VAT you cannot recover in the UAE",
    description:
      "The blocked categories — entertainment, personal-use vehicles, employee benefits — where the 5% is a cost, not a claim, and how to keep them out of your VAT return.",
    updated: "2026-08-16",
    minutes: 3,
    tax: true,
    sections: [
      {
        h: "Not all input VAT comes back",
        ps: [
          "The default is generous: VAT you pay on costs used to make taxable supplies is recoverable. But the Executive Regulations block recovery on specific categories regardless of how business-related the spend feels — and claiming blocked VAT is one of the easiest findings an FTA audit can make, because it sits in plain sight on the return.",
        ],
      },
      {
        h: "The blocked categories",
        list: [
          "Entertainment provided to anyone who is not an employee — client dinners, hospitality, events for customers and partners",
          "Motor vehicles that are available for personal use — the purchase, lease, fuel and maintenance VAT is blocked unless the vehicle qualifies (taxi, driving school, genuine pool car with no personal use)",
          "Goods or services purchased for employees' personal benefit free of charge, unless there is a legal or contractual obligation to provide them",
        ],
      },
      {
        h: "The grey zones worth respecting",
        ps: [
          "Staff entertainment has narrow allowances (modest hospitality incidental to business meetings is treated differently from a gala dinner), and 'available for personal use' on vehicles is judged on facts, not on what the logbook says. When a cost sits in a grey zone, the defensible position is to hold the claim until the facts are documented — not to claim first and explain later.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit classifies input VAT per line as recoverable, blocked or conditional, keeps blocked VAT out of the return automatically, and shows the blocked total on its own report — so the cost is visible, but never claimed.",
        ],
      },
    ],
  },
);

/* Batch of 2026-08-22 — the weekly cadence: niche topics people search for
   and find little good material on (loyalty, vouchers) plus the high-volume
   CT questions (Small Business Relief, free zone 0%, intercompany fees). */
GUIDES.push(
  {
    slug: "loyalty-points-accounting-uae",
    title: "Loyalty points and rewards: how to account for them under IFRS 15 — and what UAE VAT expects",
    description:
      "Points are deferred revenue, not a marketing footnote: allocating the sale price, estimating breakage, releasing on redemption — and how VAT treats the free redemption.",
    updated: "2026-08-22",
    minutes: 6,
    tax: true,
    sections: [
      {
        h: "The mistake almost everyone makes",
        ps: [
          "Most businesses book the full sale as revenue and treat the loyalty points as a future marketing cost. IFRS 15 says the opposite: points a customer earns in a sale are a material right — a separate performance obligation — and part of today's sale price belongs to them. Until the points are redeemed or expire, that slice is a contract liability, not revenue.",
          "The difference is not cosmetic. A retailer with an active programme can be carrying months of deferred revenue; recognising it all upfront overstates today's profit and understates a real obligation — the kind of adjustment an auditor makes late, painfully, and with a restated comparative.",
        ],
      },
      {
        h: "The mechanics, step by step",
        list: [
          "Split the transaction price between the goods sold today and the points granted, in proportion to their relative standalone selling prices",
          "The standalone selling price of a point is not its face value — it is the redemption value weighted by the likelihood of redemption. Points you expect to expire are worth less",
          "Park the points' share as a contract liability (deferred revenue) on the balance sheet",
          "Release it to revenue as points are redeemed — in proportion to the pattern of expected total redemptions, so breakage income emerges as the programme runs, not in one lump at expiry",
          "Re-estimate the redemption rate at each close; the adjustment flows through revenue, not equity",
        ],
      },
      {
        h: "A worked example",
        ps: [
          "A customer spends AED 1,000 and earns points worth AED 50 of future goods, of which you expect 80% to be redeemed. The points' standalone value is AED 40. Allocate: 1,000 × 1,000/1,040 ≈ AED 962 to today's sale, AED 38 deferred for the points. When half the expected redemptions have happened, half the AED 38 has been released — whether or not the calendar says the points are old.",
        ],
      },
      {
        h: "What UAE VAT expects",
        ps: [
          "VAT follows the consideration actually charged, not the IFRS allocation. On the original sale, output VAT is due on the full amount the customer pays — issuing points does not reduce the taxable value. When points are later redeemed as a price reduction on a new purchase, VAT is due on the net amount the customer actually pays for that supply.",
          "The sharp edge is redemptions where the customer pays nothing: goods handed over wholly against points can fall into the deemed-supply rules if input VAT was recovered on them. The regulations carve out small amounts — but the thresholds are per-recipient and per-year, and a busy programme crosses them without noticing. The defensible pattern is to decide the treatment when the programme is designed, document it, and apply it mechanically — not to hope the redemptions stay small.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit carries the points liability as its own ledger account, posts the allocation on each qualifying sale, releases it on redemption evidence, and keeps the redemption-rate estimate as a monthly close decision with the movement history attached — so the liability is always current and the auditor sees the model, not a plug.",
        ],
      },
    ],
  },
  {
    slug: "gift-cards-vouchers-vat-uae",
    title: "Gift cards and vouchers in the UAE: VAT at issue, VAT at redemption, and the breakage question",
    description:
      "Selling a voucher is not a supply — redemption is. Where Article 40 draws the line, what happens when a voucher sells above face value, and how unredeemed balances are treated.",
    updated: "2026-08-22",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "The rule in one sentence",
        ps: [
          "Under Article 40 of the UAE VAT Decree-Law, selling or issuing a voucher is not itself a supply — VAT happens when the voucher is redeemed, on the goods or services it buys. The one exception: if a voucher is sold for more than its advertised monetary value, VAT is due on the excess at the time of sale.",
          "This is a genuinely different regime from Europe's single-purpose/multi-purpose split — importing that logic into a UAE VAT position is one of the most common errors in advice found online. In the UAE the treatment does not depend on whether the redemption VAT rate is known upfront.",
        ],
      },
      {
        h: "What counts as a voucher",
        ps: [
          "The instrument must give the right to receive goods or services up to a stated monetary value, or a stated discount — a AED 500 gift card, a prepaid dining voucher. Instruments without a face value entitlement, and postage stamps, sit outside the definition. So do points in a loyalty programme, which follow their own analysis.",
        ],
      },
      {
        h: "The three moments that matter",
        list: [
          "Issue — no VAT on the sale of the card at or below face value; the cash received is a liability (unearned), not revenue",
          "Redemption — a normal taxable supply of whatever is bought, at that supply's rate, with the voucher as consideration; the tax invoice is issued for this supply",
          "Expiry / breakage — no supply ever happened, so no output VAT is due on the unredeemed balance; for accounting, IFRS 15 lets expected breakage be recognised as revenue in proportion to actual redemptions rather than in one lump at expiry",
        ],
      },
      {
        h: "The operational traps",
        list: [
          "Booking card sales as revenue at the till — overstates revenue and desynchronises the VAT return from the ledger",
          "Charging VAT at issue and again at redemption — double tax that a customer or an audit will eventually surface",
          "Selling vouchers through resellers at a margin without deciding whose supply the margin is",
          "No voucher liability register — without one, breakage income and the VAT position are both guesses",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit posts voucher sales to a voucher liability account, matches redemptions to the liability with the sale document as evidence, tracks the unredeemed balance by expiry cohort, and releases breakage on the documented pattern — so the VAT return and the balance sheet tell the same story.",
        ],
      },
    ],
  },
  {
    slug: "uae-small-business-relief",
    title: "UAE Corporate Tax Small Business Relief: who qualifies, what it actually does, and the catches",
    description:
      "Revenue at or under AED 3 million can mean no taxable income at all — but the relief is an election with conditions, an expiry date, and consequences for losses.",
    updated: "2026-08-22",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "What the relief does",
        ps: [
          "Small Business Relief lets a UAE-resident taxable person be treated as having no taxable income for a tax period — no 9% to pay — if revenue is AED 3,000,000 or less in that period and in every previous tax period ending on or before 31 December 2026. It is an election made in the tax return, period by period, not an automatic exemption.",
          "Two things it does not do: it does not remove the obligation to register for Corporate Tax and file a return, and it does not last forever — it is available only for tax periods ending on or before 31 December 2026.",
        ],
      },
      {
        h: "Who cannot use it",
        list: [
          "Qualifying Free Zone Persons — the free zone 0% regime and Small Business Relief are mutually exclusive",
          "Members of multinational groups with consolidated revenue above the country-by-country reporting threshold (AED 3.15 billion)",
          "Businesses artificially split into pieces to stay under AED 3 million each — the anti-abuse rule treats the arrangement as one business and unwinds the advantage, with penalties",
        ],
      },
      {
        h: "The catches worth reading twice",
        list: [
          "Revenue means revenue — gross income, not profit. A low-margin trader crosses AED 3m long before it earns AED 375,000 of profit",
          "One breach ends it — cross the threshold in any period and the relief is gone for that period and cannot be claimed again, because the test requires all previous periods to have stayed under",
          "Losses in a relief period cannot be carried forward, and interest deductions in the period are similarly parked — electing in a loss-making year gives up something real",
          "The election still requires clean books: the FTA can ask how the revenue figure was built, and the simplified return is simplified, not unaudited",
        ],
      },
      {
        h: "Should a small business elect?",
        ps: [
          "Usually yes if profitable and comfortably under the threshold. The genuine judgement call is a growing business near AED 3m, or one making a loss it could otherwise carry forward against future 9% profits. That is a modelling exercise — a year of relief today against a deduction tomorrow — and the answer depends on the trajectory, not a rule of thumb.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit tracks rolling revenue against the AED 3m line as the year runs — not at filing time — flags the approach while there is still time to plan, and keeps the revenue build traceable to documents so the election survives a question from the FTA.",
        ],
      },
    ],
  },
  {
    slug: "free-zone-corporate-tax-0-percent",
    title: "Free zone 0% Corporate Tax: what a Qualifying Free Zone Person actually is",
    description:
      "The 0% rate is a conditional regime, not a postcode benefit: qualifying income, the de minimis test, substance, audited accounts — and the five-year penalty for slipping.",
    updated: "2026-08-22",
    minutes: 6,
    tax: true,
    sections: [
      {
        h: "The headline, corrected",
        ps: [
          "Being registered in a free zone does not give you 0% Corporate Tax. The 0% rate applies only to the qualifying income of a Qualifying Free Zone Person (QFZP) — a status you earn by meeting every condition, every period. Everything that is not qualifying income is taxed at 9%, and a QFZP does not get the AED 375,000 0% band that mainland businesses enjoy on that non-qualifying slice.",
        ],
      },
      {
        h: "The conditions — all of them, every period",
        list: [
          "Maintain adequate substance in the free zone — people, premises and expenditure proportionate to the income booked there",
          "Derive qualifying income: broadly, transactions with other free zone persons, and income from a defined list of qualifying activities (manufacturing, processing, trading of qualifying commodities, fund and wealth management, treasury and financing of related parties, distribution from a designated zone, logistics, and others)",
          "Stay out of excluded activities — dealings with natural persons (with narrow exceptions), regulated banking and insurance, and most immovable-property and intellectual-property income do not qualify regardless of the counterparty",
          "Keep non-qualifying revenue inside the de minimis: the lower of AED 5 million or 5% of total revenue",
          "Prepare audited financial statements, comply with transfer pricing rules and documentation, and not have elected into the standard 9% regime",
        ],
      },
      {
        h: "The cliff",
        ps: [
          "Fail any condition — blow the de minimis, let substance thin out, miss the audit — and QFZP status is lost not just for that period but for the four that follow: five years of 9% on everything. The regime is generous precisely because the exit is punitive; it is designed to be planned for, not stumbled into.",
        ],
      },
      {
        h: "What this means for structuring",
        ps: [
          "The real work is classification discipline: knowing, customer by customer and revenue stream by revenue stream, what is qualifying, what is excluded, and how close the non-qualifying tail is to the de minimis line — continuously, because the test is annual but the drift is monthly. A free zone entity selling to mainland consumers through the year and checking the mix in month twelve has already made its decision by accident.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit tags revenue by counterparty type and activity as invoices post, keeps a running qualifying / non-qualifying split with the de minimis headroom visible, and raises the flag when the tail approaches the line — while the mix can still be managed, not after the period has decided itself.",
        ],
      },
    ],
  },
  {
    slug: "intercompany-management-fees-uae",
    title: "Intercompany management fees between UAE group entities: pricing, paper and VAT",
    description:
      "The three tests a management charge must pass — arm's length under Corporate Tax, proper VAT treatment between entities, and evidence the service actually happened.",
    updated: "2026-08-22",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "Why this suddenly matters",
        ps: [
          "Before Corporate Tax, a management fee between two UAE group companies moved profit but not tax, and nobody looked hard. At 9% — and with free zone entities at 0% sitting next to mainland entities at 9% — the same charge now moves real tax, and it is precisely the transaction the transfer pricing rules were written for. Charges that shift profit toward the 0% entity draw the most attention of all.",
        ],
      },
      {
        h: "Test one: arm's length",
        ps: [
          "Related-party transactions must be priced as independent parties would price them. For routine management and back-office services that usually means cost plus a modest margin, supported by a method you can name. Payments that reach owners or directors face a second hurdle: deductible only to the extent they reflect market value of a genuine service. Above the ministerial thresholds, the charges are disclosed with the tax return — and larger groups also maintain transfer pricing documentation, so the number must be born defensible, not defended later.",
        ],
      },
      {
        h: "Test two: VAT does not care that it's family",
        list: [
          "A management fee between two legal entities is a taxable supply at 5% — being in the same group changes nothing by default",
          "The paying entity needs a valid tax invoice from the charging entity to recover the input VAT, subject to its own recovery position",
          "A registered VAT tax group removes intra-group supplies from VAT entirely — but the group registration has its own conditions, and CT and VAT grouping are separate regimes with separate rules; being grouped for one does not group you for the other",
        ],
      },
      {
        h: "Test three: the service must be real",
        ps: [
          "The cleanest pricing fails if there is nothing behind it. An intercompany agreement signed before the charges start, a description of the services actually delivered, a cost base that reconciles to the charging entity's ledger, and invoices raised on a regular cadence — that is the evidence file. A single year-end journal labelled 'management fee' with no agreement, no invoice and a suspiciously round number is not a transaction; it is a finding waiting to be written.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit posts intercompany charges only against the agreement and invoice as evidence, keeps both sides' entries mirrored so the charge never exists in one ledger only, applies the VAT treatment consistently, and shows related-party flows on their own report — the same view a reviewer would build, available before they ask.",
        ],
      },
    ],
  },
);

/* Batch of 2026-08-23 — one niche (bad-debt relief, thin coverage
   everywhere) + two search magnets (CT penalties, ZATCA Phase 2). */
GUIDES.push(
  {
    slug: "uae-vat-bad-debt-relief",
    title: "VAT bad-debt relief in the UAE: reclaiming the 5% on invoices that will never be paid",
    description:
      "Article 64 lets a supplier take back output VAT on written-off receivables — but only when four conditions are all met, and your customer has an obligation too.",
    updated: "2026-08-23",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "The problem it solves",
        ps: [
          "When you issue a tax invoice, you account for the 5% output VAT in that period — whether or not the customer ever pays. A receivable that goes bad therefore costs you twice: the revenue you'll never collect, and VAT you already paid to the FTA on money that never arrived. Bad-debt relief is the mechanism that returns the second loss.",
        ],
      },
      {
        h: "The four conditions — all of them",
        list: [
          "The goods or services were supplied and the output tax was charged and paid to the FTA",
          "The consideration has been written off, in full or in part, in your accounts — a real accounting write-off, not just an ageing report entry",
          "More than six months have passed since the date of the supply",
          "You have notified the customer of the amount written off",
        ],
      },
      {
        h: "How the adjustment works",
        ps: [
          "Once every condition is met, you reduce your output tax in the VAT return for the period in which the conditions were satisfied — by the VAT fraction of the amount written off (for a 5% supply, 5/105 of the gross unpaid amount). The relief is proportional: write off half the invoice, adjust half the VAT.",
          "The mirror matters: a registered customer who received your write-off notice must reduce the input VAT they claimed on that invoice. The FTA can see both sides — a supplier claiming relief against a customer still holding the input credit is a mismatch that surfaces in audit.",
        ],
      },
      {
        h: "The traps",
        list: [
          "Counting six months from the invoice date when the supply date differs — the clock runs from the date of supply",
          "Claiming relief on debts that were never written off in the books — the accounting entry is a condition, not a formality",
          "Skipping the customer notification, the condition most often missed and the easiest for an auditor to test",
          "Forgetting the reverse: if the customer later pays, the VAT comes back — output tax is re-accounted on the amount recovered",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit watches receivables ageing cross the six-month line, checks the write-off posting and the notification evidence, computes the 5/105 adjustment into the VAT return draft, and re-accounts automatically if a recovery lands later — so relief is claimed exactly when it becomes claimable, and unwound exactly when it must be.",
        ],
      },
    ],
  },
  {
    slug: "uae-corporate-tax-penalties",
    title: "UAE Corporate Tax penalties: what late registration, filing and payment actually cost",
    description:
      "AED 10,000 for late registration, a filing meter that runs monthly, and 14% a year on unpaid tax — the Corporate Tax penalty schedule in plain numbers.",
    updated: "2026-08-23",
    minutes: 4,
    tax: true,
    sections: [
      {
        h: "The three penalties that matter",
        list: [
          "Late registration: a fixed AED 10,000 for failing to submit the registration application within the FTA's deadline for your licence",
          "Late filing: AED 500 for each month (or part of one) the return is late during the first twelve months, rising to AED 1,000 per month from the thirteenth month onward",
          "Late payment: 14% per annum on the unpaid tax, applied monthly from the day after the payment deadline",
        ],
      },
      {
        h: "What that looks like in dirhams",
        ps: [
          "A company that files its return nine months late owes AED 4,500 in filing penalties before any tax is counted. If it also owes AED 100,000 of tax for those nine months, the late-payment charge adds roughly AED 10,500 more — about AED 15,000 of pure penalty on a position that a calendar reminder would have avoided entirely.",
          "The filing penalty runs even when no tax is due: a loss-making company that ignores its return obligation accumulates the same monthly charges as a profitable one.",
        ],
      },
      {
        h: "The ones people forget",
        list: [
          "Failing to keep the required records and information carries its own fixed penalties, repeated on re-offence",
          "An incorrect return can be penalised — voluntary disclosure before the FTA notices is what keeps corrections cheap",
          "Registered but dormant? The filing obligation doesn't sleep: nil-activity companies file too",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit's deadline watchdog tracks each entity's registration and filing calendar, escalates well before the nine-month line, and drafts the return from the ledger as the year runs — so the penalty schedule above stays a reference page, not a bill.",
        ],
      },
    ],
  },
  {
    slug: "zatca-e-invoicing-phase-2",
    title: "ZATCA e-invoicing Phase 2: integration, waves, and what your invoices must carry",
    description:
      "Saudi Arabia's Fatoora integration phase in practice — clearance for standard invoices, 24-hour reporting for simplified ones, the wave system by revenue, and the technical fields that trip businesses up.",
    updated: "2026-08-23",
    minutes: 6,
    tax: true,
    sections: [
      {
        h: "The two phases, briefly",
        ps: [
          "Phase 1 (generation, live since December 2021) required all VAT-registered businesses in KSA to issue e-invoices from a compliant system — no handwritten or plain-PDF invoices. Phase 2 (integration) is the real shift: your invoicing system connects to ZATCA's Fatoora platform, and invoices flow to the authority in near-real time.",
        ],
      },
      {
        h: "What integration means day to day",
        list: [
          "Standard (B2B) tax invoices are cleared: sent to ZATCA first, cryptographically stamped, and only then delivered to your customer — an uncleared invoice is not a valid tax invoice",
          "Simplified (B2C) invoices are reported: issued to the customer immediately, transmitted to ZATCA within 24 hours",
          "Every invoice carries the Phase 2 technical envelope: XML (or PDF/A-3 with embedded XML), UUID, cryptographic stamp, hash chain, and QR code",
          "Your system must be onboarded onto Fatoora with a production certificate per device/unit",
        ],
      },
      {
        h: "The wave system",
        ps: [
          "ZATCA phases businesses in by taxable revenue, in numbered waves with individually announced deadlines. Integration began in January 2023 with the largest taxpayers (above SAR 3 billion) and the threshold has stepped down wave by wave since — reaching businesses with revenue in the low millions of riyals through 2025 and continuing downward in 2026. Each wave gets formal notice from ZATCA at least six months before its deadline.",
          "The operational takeaway: if you are VAT-registered in KSA and not yet integrated, your wave is a matter of when, not if. The revenue test uses your VAT-taxable revenue, and ZATCA's notification arrives against the year they measured — a business that grew recently should assume it is closer to the front of the queue than it feels.",
        ],
      },
      {
        h: "Where implementations go wrong",
        list: [
          "Treating it as a tax project instead of a systems project — the hard part is the ERP/POS integration and certificate management, not the VAT logic",
          "Invoice fields that pass Phase 1 but fail Phase 2 validation: missing buyer details on standard invoices, wrong invoice type codes, broken hash chains after system restores",
          "Credit notes issued outside the platform flow — corrections must travel the same cleared/reported path as the invoices they amend",
          "Waiting for the notification letter to start — six months is short for an ERP integration with certification testing",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit validates KSA invoices against the Phase 2 field requirements as they arrive, flags documents that would fail clearance, and reconciles what your system issued against what the ledger holds — so integration day is a switch-flip, not an archaeology project.",
        ],
      },
    ],
  },
);

/* Batch of 2026-08-24 — two niche (director remuneration, construction
   retentions) + three search magnets (designated zones, e-commerce VAT,
   WPS payroll). */
GUIDES.push(
  {
    slug: "uae-designated-zone-vat",
    title: "Designated zone VAT in the UAE: when goods are outside the scope and when they aren't",
    description:
      "A designated zone is not a VAT-free zone. Where the outside-scope treatment actually applies — goods, not services; movement, not consumption — and the import moment everyone forgets.",
    updated: "2026-08-24",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "The misconception to clear first",
        ps: [
          "A designated zone is a specific fenced, customs-controlled area named in a Cabinet Decision — not every free zone qualifies, and being in one does not switch VAT off. Companies in designated zones register for VAT under the normal thresholds, charge VAT on their services, and file returns like everyone else. The special treatment is narrow: it applies to certain movements and supplies of goods.",
        ],
      },
      {
        h: "What is actually outside the scope",
        list: [
          "A supply of goods within a designated zone, where the goods are incorporated into another product, resold, or otherwise not consumed in the zone — outside the scope of UAE VAT",
          "Goods moved between two designated zones — outside the scope, provided the goods aren't released into circulation or used in transit, and the customs controls hold",
          "Goods supplied from a designated zone directly abroad — outside the scope of UAE VAT (customs export procedures still apply)",
        ],
      },
      {
        h: "What is taxed exactly as on the mainland",
        list: [
          "Services — all of them. Place of supply of services in a designated zone is treated as the mainland: rent, logistics fees, consultancy, everything at the normal rate",
          "Goods consumed inside the zone — a supply of goods bought to be used or consumed there (not resold or incorporated) is taxed normally",
          "Goods moving from the zone to the mainland — this is an import: import VAT is due on entry, accounted via the importer's TRN or at customs",
          "Water, energy and real estate in the zone follow their own specific rules",
        ],
      },
      {
        h: "Where businesses get hurt",
        ps: [
          "The pattern in audits is consistent: a designated-zone trader treats everything it does as outside scope — including its service income and its mainland deliveries — and the FTA reconstructs years of output tax and import VAT at once. The clean discipline is per-transaction: what is being supplied, where the goods physically move, and whether they are consumed. Those three questions decide the treatment; the licence address does not.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit classifies designated-zone transactions by supply type and movement — within-zone, zone-to-zone, zone-to-mainland, zone-to-abroad — applies the matching treatment on each invoice, and accrues the import VAT the moment goods cross into the mainland, so the return reflects the movements rather than the misconception.",
        ],
      },
    ],
  },
  {
    slug: "uae-director-owner-remuneration",
    title: "Paying yourself from your UAE company: salaries, dividends and Article 36",
    description:
      "Owner salaries are deductible, dividends are not, and connected-person payments must survive a market-value test — the Corporate Tax mechanics of taking money out of your own company.",
    updated: "2026-08-24",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "The question every owner now has",
        ps: [
          "Before Corporate Tax, how you took money out of your own company was a cash-flow preference. At 9%, it is a tax computation: a salary is a deductible expense that reduces taxable profit; a dividend is a distribution of profit that has already been taxed. On AED 500,000 taken out, the difference between the two routes is up to AED 45,000 of tax — every year.",
        ],
      },
      {
        h: "The catch: Article 36",
        ps: [
          "Payments to connected persons — owners, directors, and their related parties — are deductible only to the extent they correspond to the market value of the service actually provided, and are incurred wholly and exclusively for the business. An owner genuinely running the company can pay themselves what the market would pay a manager doing that job. An owner paying themselves AED 2 million for a role the market fills at AED 400,000 has AED 1.6 million of non-deductible distribution wearing a salary costume — and it is exactly the number an FTA reviewer prices first.",
        ],
      },
      {
        h: "Making the salary defensible",
        list: [
          "A real employment contract, registered where required, with the role described",
          "A salary a recruiter would recognise for that role, that seniority, that market — benchmark it once a year and keep the evidence",
          "Paid regularly through payroll (and WPS where applicable), not as ad-hoc round-number transfers",
          "Board/management fees documented separately from salary, each at their own market value",
          "The mirror check: free-zone owners at 0% have the opposite incentive (suppress salary, inflate zone profit) — the market-value test cuts both ways",
        ],
      },
      {
        h: "What never deducts",
        list: [
          "Dividends and profit distributions, however labelled",
          "Owner personal spending run through the company — non-deductible, and it contaminates the books an auditor must sign",
          "Interest on owner loans beyond arm's-length terms",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit tags connected-person payments as their own category, keeps the payroll evidence attached, and shows owner remuneration on its own line in the CT working — so the market-value conversation happens with your advisor before filing, not with the FTA after.",
        ],
      },
    ],
  },
  {
    slug: "construction-retention-accounting-vat",
    title: "Retention money in construction: the accounting and the VAT date of supply",
    description:
      "Retentions are earned but not yet billable — which splits the accounting (contract asset, not receivable) and delays the VAT tax point. Getting either wrong distorts revenue or prepays tax.",
    updated: "2026-08-24",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "What retention actually is",
        ps: [
          "A construction contract typically lets the employer hold back 5–10% of each certified payment until practical completion or the end of the defects period. The contractor has done the work — the revenue is earned under IFRS 15 — but has no unconditional right to the cash until the conditions clear. That gap drives both treatments below.",
        ],
      },
      {
        h: "The accounting: contract asset, not trade receivable",
        ps: [
          "Certified work you can invoice now is a receivable. Retention is a contract asset: earned consideration whose right to payment is still conditional on something other than the passage of time. Reclassify it to receivables only when the conditions clear (completion certificate, defects period end). The distinction is not cosmetic — receivables age and drive ECL provisioning on one pattern; retentions on a project running three more years age on another, and lumping them together makes both the ageing report and the provision wrong.",
        ],
      },
      {
        h: "The VAT: the tax point usually waits",
        ps: [
          "For continuous supplies with periodic certification, the date of supply is generally the earliest of: the tax invoice being issued, the payment falling due, or the payment being received. Retention, by design, is neither invoiced nor due at certification — so its tax point normally arrives when the retention is finally invoiced or received, not when the original work was certified.",
          "The practical consequences: don't account for output VAT on retention years before you can bill it — that is prepaying tax on cash you don't hold; and when the retention does release, remember it carries VAT at that point — releasing AED 500,000 of retention means invoicing AED 525,000, a step contractors' cash-flow forecasts routinely miss.",
        ],
      },
      {
        h: "The traps",
        list: [
          "Invoicing the full certified amount including retention — that accelerates the entire VAT and defeats the deferral",
          "Forgetting retentions in the ECL assessment — long-dated, condition-heavy balances deserve their own loss-rate thinking",
          "Losing track of defects-period end dates, so releasable retention sits unbilled for months",
          "Contract clauses that make retention 'due' on certification with only payment delayed — wording can move the tax point; read yours",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit carries retention per contract as a contract asset with its release conditions and dates, keeps it out of the VAT return until the tax point actually arrives, raises the invoice (VAT included) when release conditions clear, and ages it separately in the ECL working.",
        ],
      },
    ],
  },
  {
    slug: "uae-ecommerce-vat",
    title: "VAT for e-commerce in the UAE: place of supply, exports and electronic services",
    description:
      "Selling online doesn't change the 5% — it changes where the questions are: who the customer is, where the goods go, and what counts as an electronically supplied service.",
    updated: "2026-08-24",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "Goods sold online, delivered in the UAE",
        ps: [
          "Domestic e-commerce is plain VAT: 5% on the price, a tax invoice (simplified is usually enough for consumers), and output tax in the period of supply. The platform doesn't change the analysis — a sale through your own site, a marketplace, or Instagram DM is the same supply. What online sellers actually get wrong is registration timing: the AED 375,000 mandatory threshold creeps up on a growing store month by month, and it tests rolling revenue, not the calendar year.",
        ],
      },
      {
        h: "Goods shipped abroad",
        ps: [
          "An export of goods is zero-rated — 0% VAT, with full input-tax recovery — but the rate is earned by evidence: official customs exit documents and commercial evidence of the shipment, retained per order. An online seller shipping GCC and international orders without an evidence file is sitting on supplies the FTA can re-rate to 5% wholesale. Zero-rated is a documentation standard, not a default.",
        ],
      },
      {
        h: "Electronic services follow use, not the seller",
        ps: [
          "For electronically supplied services — apps, SaaS, streaming, e-learning, digital downloads — the place of supply follows where the service is actually used and enjoyed. Sold to users in the UAE, they carry UAE VAT; genuinely used abroad, they can fall outside UAE VAT or zero-rate, evidence again deciding. The rule cuts the other way too: a foreign platform selling electronic services to UAE consumers must register for UAE VAT with no threshold — the first dirham counts.",
        ],
      },
      {
        h: "The operational checklist",
        list: [
          "Track the rolling-12-month revenue against AED 375,000 monthly, not annually",
          "Keep customs exit evidence per exported order, linked to the order number",
          "Classify each revenue stream: goods vs electronic services vs facilitation/commission — each has its own analysis",
          "Marketplace sellers: agree in writing who invoices the customer and who accounts for the VAT — the platform's terms decide whose supply it is",
          "COD and gateway settlements: reconcile collected VAT to the gateway payouts, where double-counting and gaps both hide",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit ingests order and gateway data, classifies each line by destination and stream, holds zero-rating where the export evidence is missing, watches the rolling threshold, and reconciles collected VAT against settlements — the whole checklist above, running continuously.",
        ],
      },
    ],
  },
  {
    slug: "uae-wps-payroll-compliance",
    title: "WPS payroll compliance in the UAE: how the Wages Protection System actually works",
    description:
      "Salaries in the UAE are paid through a monitored channel with deadlines and consequences — the SIF file, the 15-day rule, and what non-compliance blocks.",
    updated: "2026-08-24",
    minutes: 4,
    tax: true,
    sections: [
      {
        h: "What WPS is",
        ps: [
          "The Wages Protection System is MOHRE's electronic salary-monitoring channel: employers registered with the ministry pay wages through approved banks and exchange houses, and each payroll run generates a Salary Information File (SIF) that tells the ministry who was paid, how much, and when — matched against the registered contracts. It is how the state knows salaries were actually paid, in full, on time.",
        ],
      },
      {
        h: "The rules that bite",
        list: [
          "Wages must be paid through WPS-approved channels — cash and personal transfers don't count as paid, however real the money was",
          "Payment is due within 15 days of the due date under current rules; later than that and the employer starts accruing non-compliance status",
          "Compliance is measured on coverage too: paying most staff but skipping some, or paying materially less than the registered wage, flags the file",
          "Consequences escalate: reminders, then blocks on new work permits, then fines and referral — and the block is the one that operationally hurts, because hiring stops",
        ],
      },
      {
        h: "Where payroll runs go wrong",
        list: [
          "The SIF says one thing, the bank transfer another — rejected records that nobody reconciles",
          "Registered contract salaries drifting from actual salaries after raises, so every month quietly mismatches",
          "Unpaid-leave and EOSB settlements processed outside WPS without the paper trail",
          "Free-zone employers assuming WPS doesn't apply — several free zones run their own equivalent regimes with the same logic",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit's payroll run produces the register and the SIF-shaped output from the same numbers, reconciles the bank confirmation against it, flags rejected or short-paid records the day they bounce, and keeps contract-vs-paid drift visible — so WPS status is something you know, not something you discover.",
        ],
      },
    ],
  },
);

/* Batch of 2026-08-28 — two niche (holding structures, branch vs
   subsidiary) + three search magnets (reverse charge, audit rules,
   cash vs accrual). */
GUIDES.push(
  {
    slug: "uae-holding-company-participation-exemption",
    title: "Holding companies under UAE Corporate Tax: the participation exemption, explained",
    description:
      "Dividends and capital gains through a UAE holding company can be fully exempt — if the participation clears the ownership, holding-period and subject-to-tax tests. The conditions, the traps, and the tax-group alternative.",
    updated: "2026-08-28",
    minutes: 6,
    tax: true,
    sections: [
      {
        h: "Why holding structures suddenly matter",
        ps: [
          "At 0% corporate tax, a UAE holding company was an administrative convenience. At 9%, it is the difference between investment returns flowing through untaxed and every dividend and exit gain taking a 9% haircut on the way up. The law is actually generous here — but the generosity is conditional, and the conditions are tested participation by participation.",
        ],
      },
      {
        h: "The easy case: UAE-to-UAE dividends",
        ps: [
          "Dividends and other profit distributions received from a UAE-resident company are exempt from Corporate Tax in the recipient's hands — no ownership threshold, no holding period. Domestic profits are taxed once, at the operating company, and flow up clean.",
        ],
      },
      {
        h: "The conditional case: the participation exemption",
        list: [
          "Ownership: at least 5% of the shares — or, alternatively, an acquisition cost of at least AED 4 million",
          "Holding period: held, or intended to be held, for at least 12 months",
          "Subject-to-tax: the participation is taxed in its home jurisdiction at a rate of at least 9%, or meets the equivalent-test conditions",
          "Asset test: the participation is not, in substance, a wrapper for assets that would fail these tests if held directly",
        ],
      },
      {
        h: "The traps",
        list: [
          "Selling at month eleven — the gain on a participation that never reaches 12 months is fully taxable, and 'intended to hold' needs contemporaneous evidence if you lean on it",
          "Zero-tax subsidiaries: a participation in a jurisdiction with no corporate income tax generally fails the subject-to-tax test — the exemption is not a route to double non-taxation",
          "Mixed holdings: each participation is tested on its own; one qualifying subsidiary does not bless the portfolio",
          "Expenses: costs of acquiring or disposing of exempt participations are correspondingly non-deductible — the exemption cuts both ways",
        ],
      },
      {
        h: "The tax-group alternative",
        ps: [
          "Where a UAE parent holds at least 95% of a UAE subsidiary (shares, voting rights and profit entitlement), with the same financial year and accounting standards, the two can form a Corporate Tax group and file as one taxable person: intra-group transactions disappear, losses offset automatically. The trade-offs are joint liability and the compliance work of consolidation — and neither exempt persons nor Qualifying Free Zone Persons can join. Most owner-managed groups end up with the simpler answer: keep the companies separate and let the dividend exemption do the work.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit tags investment income by participation, keeps each participation's ownership %, acquisition cost, acquisition date and jurisdiction on file, and shows the exemption position per holding in the CT working — so the 12-month clock and the subject-to-tax evidence exist before the return needs them.",
        ],
      },
    ],
  },
  {
    slug: "uae-branch-vs-subsidiary",
    title: "Branch or subsidiary in the UAE: the tax and legal mechanics of each route",
    description:
      "A branch is the same legal person taxed on attributable profits; a subsidiary is a new one with exempt dividends on the way up. How the 9% applies to each, and the foreign-PE mirror for UAE companies expanding abroad.",
    updated: "2026-08-28",
    minutes: 6,
    tax: true,
    sections: [
      {
        h: "The choice, stripped to its frame",
        ps: [
          "A foreign company entering the UAE picks between registering a branch — the same legal entity, operating through a permanent establishment — and incorporating a subsidiary, a separate UAE company it owns. Both pay 9% on UAE profits above the threshold. The differences live in liability, attribution and what happens to the money afterwards.",
        ],
      },
      {
        h: "The branch route",
        list: [
          "Same legal person: the parent is directly liable for everything the branch does — no liability shield",
          "Taxed on profits attributable to the UAE permanent establishment, determined on arm's-length principles as if the branch were independent — the attribution analysis IS the tax computation, so document it",
          "No dividend mechanics: remitting branch profits home is an internal transfer, and the UAE currently imposes no withholding tax on outbound payments anyway",
          "Licensing is real: a branch needs its own commercial licence, a local presence, and typically audited branch accounts",
        ],
      },
      {
        h: "The subsidiary route",
        list: [
          "Separate legal person: liability contained, contracts in its own name, bankable locally",
          "Taxed as any UAE company — 0% to AED 375,000, 9% above; free-zone regimes can apply where conditions are met (a branch of a foreign company cannot elect Small Business Relief; a UAE-incorporated subsidiary may, if it qualifies)",
          "Dividends up to the foreign parent leave the UAE with no withholding tax; whether they are taxed on arrival is the parent jurisdiction's affair — often sheltered by its own participation regime",
          "Transfer pricing applies to everything it does with the group: management fees, licences, funding — the intercompany disciplines apply from day one",
        ],
      },
      {
        h: "The mirror: UAE companies expanding abroad",
        ps: [
          "The same choice runs outbound. A UAE company operating abroad through a foreign permanent establishment can elect to exempt that PE's profits (and losses) from UAE Corporate Tax, provided the PE is taxed at at least 9% locally — the foreign-PE election. Without the election, foreign branch profits are taxed in the UAE with credit for foreign tax paid. A foreign subsidiary, by contrast, sits behind the participation exemption. The modelling question is always the same: where are losses expected, and which regime lets them land usefully?",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit keeps branch books attributable — separate cost centres, arm's-length intercompany charges, the PE computation maintained monthly — and for groups it keeps each entity's CT position distinct, so the branch-vs-subsidiary decision stays visible in the numbers instead of dissolving into one blended ledger.",
        ],
      },
    ],
  },
  {
    slug: "uae-vat-reverse-charge",
    title: "The reverse charge in UAE VAT: when you are your own supplier",
    description:
      "Imported services, imported goods, and the domestic reverse charge for gold and hydrocarbons — how the mechanism works, why it is usually cash-neutral, and the return boxes people miss.",
    updated: "2026-08-28",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "The mechanism in one paragraph",
        ps: [
          "Normally the supplier charges VAT. Under the reverse charge, the registered recipient accounts for the output VAT as if it had made the supply to itself — and, in the same return, recovers that VAT as input tax to the extent it is entitled. For a fully taxable business the two entries cancel: no cash moves, but both boxes must be filled. The mechanism exists so that buying from abroad carries the same VAT weight as buying locally.",
        ],
      },
      {
        h: "Where it applies",
        list: [
          "Imported services: anything received from a non-resident supplier with no UAE presence — software licences, consultancy, advertising platforms, SaaS subscriptions. This is the one every business has and many miss",
          "Imported goods: import VAT accounted through the VAT return via your TRN linked at customs, rather than paid at the border",
          "Domestic reverse charge: supplies of gold and diamonds between registrants for resale or manufacture, and crude or refined hydrocarbons supplied between registrants for resale or energy production — the buyer accounts, not the seller",
        ],
      },
      {
        h: "Why cash-neutral is not effort-neutral",
        ps: [
          "Because no money moves, reverse-charge supplies feel invisible — and that is exactly how they go wrong. The FTA sees the gap: a business paying Google, AWS and foreign consultants shows those costs in its accounts, and a VAT return with an empty reverse-charge box contradicts its own ledger. The exposure compounds for partially exempt businesses, where the output side is due in full but the input side is only partly recoverable — there the reverse charge is a real cost, not a wash.",
        ],
      },
      {
        h: "The compliance checklist",
        list: [
          "Sweep the expense ledger monthly for non-resident suppliers — the reverse-charge population is a query, not a memory exercise",
          "Convert foreign-currency invoices at the applicable rate and account output tax in the correct period",
          "Recover input tax only to your actual entitlement — full recovery is the common case, not the automatic one",
          "Keep the supplier invoices: the reverse charge replaces the supplier's tax invoice as your evidence",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit flags non-resident suppliers as documents arrive, computes the output and input entries per line, applies the recovery position, and fills both sides of the return — so the reverse charge happens because a supplier is foreign, not because someone remembered.",
        ],
      },
    ],
  },
  {
    slug: "uae-audit-requirements",
    title: "Who actually needs an audit in the UAE — and what Corporate Tax changed",
    description:
      "Audited financial statements are mandatory above AED 50m revenue and for every Qualifying Free Zone Person — on top of the company-law and free-zone rules that already applied. The full map.",
    updated: "2026-08-28",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "Three overlapping regimes",
        ps: [
          "Whether you 'need an audit' in the UAE has three separate answers that stack: what the Corporate Tax law demands, what the Commercial Companies Law demands, and what your licensing authority demands. Businesses that only checked one list are usually the ones surprised in licence-renewal week.",
        ],
      },
      {
        h: "The Corporate Tax rule",
        list: [
          "Revenue above AED 50,000,000 in a tax period → audited financial statements must be prepared and maintained",
          "Every Qualifying Free Zone Person → audited financial statements, regardless of size — the audit is a condition of the 0% regime itself, and failing it risks the five-year QFZP cliff",
          "Everyone else → financial statements per the law and ministerial decisions, but not necessarily audited for CT purposes",
        ],
      },
      {
        h: "The rules that existed before CT",
        list: [
          "The Commercial Companies Law requires mainland companies (LLCs included) to appoint a licensed auditor and keep accounts — enforcement historically varied, but the obligation is statutory",
          "Most free zones require annual audited financial statements for licence renewal — DMCC, JAFZA, DIFC and peers, each with their own filing windows",
          "Banks, investors and major customers impose audits contractually regardless of what the law requires",
        ],
      },
      {
        h: "What this means in practice",
        ps: [
          "The operative question is no longer 'is an audit required' but 'is there any credible configuration where it isn't' — for a free-zone entity claiming 0%, or anything with real revenue, the answer is usually no. The businesses that suffer are the ones that treat the audit as a year-end event: an auditor walking into books with unreconciled banks, undocumented journals and missing evidence charges for the archaeology, in fees and in time. Books kept audit-ready make the audit a formality.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit keeps the books audit-ready by construction — every posting carries its evidence, every adjustment its reason, every period its lock — and produces the schedules an auditor asks for first: bank reconciliations, ageing, fixed assets, provisions, related-party flows. The audit becomes a review of work already done.",
        ],
      },
    ],
  },
  {
    slug: "uae-cash-vs-accrual-corporate-tax",
    title: "Cash basis or accrual basis for UAE Corporate Tax: who gets the choice and who shouldn't take it",
    description:
      "Businesses with revenue up to AED 3 million may prepare financial statements on the cash basis — but eligible is not the same as advisable. The rule, the mechanics of switching, and the judgement.",
    updated: "2026-08-28",
    minutes: 4,
    tax: true,
    sections: [
      {
        h: "The rule",
        ps: [
          "Taxable income starts from accounting income, and the default accounting basis is accrual. The concession: a business whose revenue does not exceed AED 3,000,000 in the tax period may prepare its financial statements on the cash basis instead — income when received, expenses when paid. Above the threshold, accrual is mandatory, with cash basis available only in exceptional circumstances approved by the FTA.",
        ],
      },
      {
        h: "Why small businesses take it",
        list: [
          "It matches the bank account — no accruals, no prepayments, no revenue recognised before cash arrives",
          "It defers tax where customers pay slowly: income lands in the period the cash does",
          "It pairs naturally with Small Business Relief — the same AED 3m revenue line governs both",
        ],
      },
      {
        h: "Why eligible is not the same as advisable",
        list: [
          "VAT does not follow: tax invoices drive VAT timing regardless of your accounting basis, so cash-basis books and the VAT return tell structurally different stories that must still reconcile",
          "Growth forces a conversion: cross AED 3m and the switch to accrual is a real exercise — opening balances, unbilled work, accrued expenses — done under time pressure",
          "Lenders and buyers think in accrual: cash-basis statements understate a growing business and complicate any financing or exit conversation",
          "Prepaid-heavy or inventory-heavy models distort badly on cash basis — a year's rent paid in month twelve makes a profitable year look like a loss",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit keeps the underlying records accrual-complete either way — documents, dues and payments all dated — so a cash-basis business still sees its real receivables and payables, and the day it crosses AED 3m the accrual conversion is a report, not a reconstruction.",
        ],
      },
    ],
  },
);

/* Batch of 2026-09 — two niche (TP documentation, partial exemption) +
   three search magnets (loss carry-forward, real estate VAT, free zone
   vs mainland). */
GUIDES.push(
  {
    slug: "uae-transfer-pricing-documentation",
    title: "Transfer pricing documentation in the UAE: who files what, and when",
    description:
      "The disclosure form with the return, the master and local file thresholds, and the arm's-length evidence every related-party transaction needs — sized to what the FTA actually asks for.",
    updated: "2026-09-01",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "The three layers",
        ps: [
          "UAE transfer pricing compliance stacks in three layers, and most businesses only owe the first. Layer one: every taxable person with related-party or connected-person dealings must be able to show they were priced at arm's length — that is the substantive rule, and it has no size threshold. Layer two: a disclosure form filed with the Corporate Tax return, summarising related-party and connected-person transactions, required once those transactions cross the ministerial materiality thresholds. Layer three: formal documentation — a master file and local file — required only for the largest taxpayers: broadly, members of multinational groups above the country-by-country threshold (AED 3.15 billion consolidated revenue) or standalone businesses with revenue of AED 200 million or more.",
        ],
      },
      {
        h: "What the disclosure form wants",
        list: [
          "Related-party transactions by category — goods, services, IP, financing — with values and the pricing method used",
          "Connected-person payments: remuneration and benefits to owners, directors and their relatives",
          "Consistency: the numbers must reconcile to the financial statements the return is built on — a form that disagrees with the ledger is an invitation",
        ],
      },
      {
        h: "What arm's length means in practice",
        ps: [
          "Every intercompany price needs a method you can name — comparable uncontrolled price, cost plus, resale minus, transactional net margin — and evidence that the method's inputs are real: agreements signed before the charges ran, cost bases that reconcile, benchmarks for the margin. The documentation burden scales with size, but the analysis burden doesn't: a two-entity group with one management fee needs the same defensible logic as a multinational, just fewer binders.",
        ],
      },
      {
        h: "The failures that get priced first",
        list: [
          "Year-end round-number journals labelled 'management fee' with no agreement behind them",
          "Free-zone entities at 0% receiving charges that strip mainland profit — the single most examined pattern",
          "Interest-free intercompany balances left to drift for years — loans need terms, and terms need rates",
          "Disclosure thresholds tracked nowhere, so nobody knows the form was due until the return is being finalised",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit tags related-party and connected-person flows as they post, keeps the agreement and invoice attached to each, accumulates the disclosure-form categories through the year, and shows the totals against the thresholds — so the form is a report at filing time, not a reconstruction.",
        ],
      },
    ],
  },
  {
    slug: "uae-tax-loss-carry-forward",
    title: "Tax losses under UAE Corporate Tax: carry-forward, the 75% cap, and the continuity tests",
    description:
      "Losses carry forward indefinitely but offset only 75% of a year's taxable income — and survive an ownership change only if the ownership or the business stays continuous. The mechanics, with numbers.",
    updated: "2026-09-01",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "The core mechanics",
        ps: [
          "A tax loss arises when the Corporate Tax computation goes negative. It carries forward indefinitely — no expiry — but with a throttle: in any later period, brought-forward losses can offset at most 75% of that period's taxable income. A company with AED 1,000,000 of taxable income and ample losses still pays 9% on AED 250,000. The design guarantees the FTA a minimum current-year take while still letting the losses work.",
        ],
      },
      {
        h: "A worked example",
        ps: [
          "Year 1: loss of AED 800,000. Year 2: taxable income AED 600,000. Offset is capped at 75% × 600,000 = AED 450,000 — taxable income becomes AED 150,000 (tax AED 0 under the 375k band), and AED 350,000 of losses carry on. The cap and the 0% band interact: small profits often pay nothing anyway, and the losses live to shelter bigger years.",
        ],
      },
      {
        h: "What kills a carried loss",
        list: [
          "Ownership discontinuity: if more than 50% of ownership changes hands, the losses survive only if the business continues the same or a similar activity — sell a loss-making company for its tax losses and pivot it, and the losses die",
          "Small Business Relief: losses arising in a period where the relief is claimed cannot be carried forward — electing in a loss year burns the loss",
          "Pre-regime history: losses from periods before Corporate Tax applied to you never enter the system",
          "Exempt income doesn't create them: exempt-participation write-downs and other exempt-stream costs don't manufacture usable losses",
        ],
      },
      {
        h: "Sharing losses in a group",
        ps: [
          "Outside a full tax group, one UAE company can transfer its current-year tax loss to another where common ownership is at least 75%, both are UAE juridical residents, and neither is exempt or a Qualifying Free Zone Person — the receiving company applies the same 75% offset cap. Inside a registered tax group, losses net automatically in the consolidated computation. The practical planning question is sequencing: which entity's losses to use, transfer or bank, decided before year-end while the choices are still open.",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit maintains the loss register per entity — vintage, amount, what has been used — applies the 75% cap in the CT working automatically, and flags the continuity tests when ownership changes touch the cap table, so a decade of carried losses doesn't evaporate through a transaction nobody checked.",
        ],
      },
    ],
  },
  {
    slug: "uae-real-estate-vat",
    title: "VAT on UAE real estate: zero-rated, exempt and standard — and why the difference decides your input VAT",
    description:
      "First supply of new residential within three years is 0%, later residential supplies are exempt, commercial is 5%, bare land is exempt — four treatments, and your input-VAT recovery hangs on which one you make.",
    updated: "2026-09-01",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "The map",
        list: [
          "New residential, first supply within three years of completion — zero-rated: no VAT charged, full input-VAT recovery for the developer",
          "Residential thereafter — exempt: no VAT charged, and no input-VAT recovery on costs attributable to it",
          "Commercial property, sale or lease — standard-rated 5%",
          "Bare land — exempt; land with civil-engineering works or partially completed buildings is a facts question, not a label question",
          "Hotel apartments and serviced accommodation — standard-rated: the supply is closer to hospitality than housing",
        ],
      },
      {
        h: "Why the treatment matters more than the rate",
        ps: [
          "Zero-rated and exempt both mean the tenant or buyer pays no VAT — but they are opposites for the supplier. Zero-rating keeps the door to input-VAT recovery open; exemption closes it. A residential landlord's agency fees, maintenance and management costs carry 5% that is simply lost. A developer selling first supplies at 0% recovers construction VAT in full — which is why the three-year window and the completion date are worth documenting to the day.",
        ],
      },
      {
        h: "Mixed portfolios and mixed buildings",
        ps: [
          "A building with retail below and apartments above makes both taxable and exempt supplies, which drags the owner into input-VAT apportionment: directly attributable costs follow their supply, shared costs split by a fair method, and the recovery position needs an annual true-up. The same logic hits any landlord holding commercial and residential side by side — the portfolio's VAT is managed at the cost-allocation level, not the invoice level.",
        ],
      },
      {
        h: "The traps",
        list: [
          "Charging 5% on residential rent because the tenant is a company — the supply's nature, not the tenant's, decides",
          "Missing the first-supply window: completing in year one and first-supplying in year four turns 0% into exempt and strands the construction VAT",
          "Commercial buyers forgetting the special payment mechanics on commercial property sales — the VAT is paid to the FTA directly before transfer",
          "Treating a serviced-apartment operation as exempt residential when its substance is hospitality",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit classifies property income streams per unit and treatment, attributes costs to taxable and exempt pools as invoices arrive, computes the recovery ratio with the annual adjustment, and keeps completion and first-supply dates on the asset record — the facts the treatment turns on.",
        ],
      },
    ],
  },
  {
    slug: "uae-partial-exemption-input-vat",
    title: "Partial exemption in UAE VAT: apportioning input tax when you make exempt supplies",
    description:
      "Make any exempt supplies — residential rent, local passenger transport, certain financial services — and your input VAT splits three ways: recoverable, blocked, and the residual pot that needs a ratio.",
    updated: "2026-09-01",
    minutes: 5,
    tax: true,
    sections: [
      {
        h: "Who this catches",
        ps: [
          "Partial exemption is not a niche bank problem. A landlord with one residential unit, a trading company doing a little margin-based FX, a school with a bus service — any business making both taxable and exempt supplies recovers input VAT only in part, and needs a method for the split. Most discover this at their first audit rather than their first return.",
        ],
      },
      {
        h: "The three pots",
        list: [
          "Directly attributable to taxable supplies — fully recoverable (subject to the usual blocked categories)",
          "Directly attributable to exempt supplies — not recoverable at all",
          "Residual — overheads, rent, audit fees, software: everything serving the whole business, recoverable only in proportion",
        ],
      },
      {
        h: "The ratio and the true-up",
        ps: [
          "The standard method computes the recoverable share of the residual pot from the ratio your attributed input tax already implies — recoverable attributed input tax over total attributed input tax — rounded per the regulations, applied return by return. Then once a year comes the wash-up: recompute the year as a whole, compare with what was actually recovered, and adjust the difference in the prescribed period. Businesses whose mix moves through the year routinely find the annual adjustment larger than any single quarter's residual claim.",
          "Where the standard method produces a result that doesn't fairly reflect actual use, the regulations allow a special method with FTA approval — sector-specific approaches exist, but the default assumption should be the standard method until the FTA agrees otherwise in writing.",
        ],
      },
      {
        h: "The traps",
        list: [
          "Recovering everything because exempt supplies feel incidental — the test is making exempt supplies, not majoring in them",
          "No cost-attribution discipline, so the residual pot swallows costs that were directly attributable — in either direction",
          "Skipping the annual adjustment entirely — it is a required calculation, not an optional refinement",
          "Forgetting the de minimis-style relief does not exist here the way it does in other regimes — small exempt streams still trigger the mechanics",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit attributes each cost line to taxable, exempt or residual as documents post, computes the period ratio and the recoverable residual automatically, and runs the annual wash-up from the same records — so partial exemption becomes arithmetic on clean attributions instead of a year-end estimate.",
        ],
      },
    ],
  },
  {
    slug: "uae-freezone-vs-mainland-tax",
    title: "Free zone vs mainland in the UAE: the tax comparison founders actually need",
    description:
      "The 0% headline is conditional, the 9% baseline is simpler than it looks, and VAT mostly doesn't care — how the two setups compare on tax, and the questions that decide it.",
    updated: "2026-09-01",
    minutes: 6,
    tax: true,
    sections: [
      {
        h: "Corporate tax: conditional 0% vs simple 9%",
        ps: [
          "Mainland is straightforward: 0% to AED 375,000 of taxable income, 9% above, Small Business Relief available under AED 3m revenue until the 2026 sunset. Free zone offers the famous 0% — but only as a Qualifying Free Zone Person, only on qualifying income, with substance, audited accounts, transfer pricing compliance and the de minimis test all holding, every period. A free-zone company selling mainly to mainland consumers usually ends up at 9% on that income anyway, without the AED 375,000 band, plus the audit cost the regime demands.",
          "The honest sorting question: who are your customers? Mostly other free-zone businesses or foreign markets in a qualifying activity → the 0% regime is real. Mostly mainland UAE consumers → the free-zone tax advantage largely evaporates, and the decision should be made on licensing, premises and ownership factors instead.",
        ],
      },
      {
        h: "VAT: mostly indifferent",
        ps: [
          "VAT registration, rates and filing are the same in both setups. The exception is the small list of designated zones, where certain movements of goods sit outside the scope — a real benefit for goods traders structured around them, and irrelevant to services businesses, whose supplies are taxed as mainland wherever the desk sits.",
        ],
      },
      {
        h: "The rest of the ledger",
        list: [
          "Audit: free zones typically require audited statements for licence renewal, and QFZP status requires them by law; a small mainland LLC often carries lighter practical audit pressure",
          "Substance: the free-zone 0% needs demonstrable people, premises and spend in the zone — a flexi-desk and a licence does not survive review",
          "Banking and customers: some mainland counterparties and government work still prefer or require mainland licences",
          "Switching later: moving an established business between regimes is a real migration — licences, visas, contracts, sometimes the bank — so the choice deserves modelling, not defaults",
        ],
      },
      {
        h: "How Orbit applies this",
        ps: [
          "Orbit runs the same books either way — and for free-zone entities it tracks the qualifying/non-qualifying revenue split, the de minimis headroom and the audit readiness that keep the 0% alive, so the structure you chose stays the structure you have.",
        ],
      },
    ],
  },
);

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
