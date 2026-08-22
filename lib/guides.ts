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

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
