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

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
