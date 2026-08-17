/* The tools registry — drives the /tools index, the sitemap and llms.txt. */

export type Tool = { slug: string; title: string; description: string; guide?: string };

export const TOOLS: Tool[] = [
  {
    slug: "ecl-provision-calculator",
    title: "IFRS 9 ECL provision calculator",
    description:
      "A provision-matrix calculator for trade receivables: your ageing balances, your loss rates, and a forward-looking scenario slider — watch the provision reprice as you drag.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "eosb-gratuity-calculator",
    title: "UAE gratuity (EOSB) calculator",
    description:
      "End-of-service gratuity under the 21/30-day rule: basic wage, years of service, the two-year cap — with the working shown.",
    guide: "uae-eosb-gratuity",
  },
  {
    slug: "uae-vat-calculator",
    title: "VAT calculator — UAE 5% & KSA 15%",
    description: "Add VAT to a net amount or extract it from a gross one, at the UAE or KSA rate.",
    guide: "uae-blocked-input-vat",
  },
  {
    slug: "uae-corporate-tax-calculator",
    title: "UAE Corporate Tax estimator",
    description:
      "0% to AED 375,000, 9% above — with the Small Business Relief election handled.",
    guide: "uae-tax-deadlines",
  },
  {
    slug: "ifrs16-lease-calculator",
    title: "IFRS 16 lease liability & ROU asset calculator",
    description:
      "Compute the day-1 lease liability and right-of-use asset, then generate the full amortisation schedule — interest unwinding and straight-line depreciation, period by period.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "ias19-actuarial-eosb-calculator",
    title: "IAS 19 actuarial EOSB valuation",
    description:
      "A simplified projected unit credit estimate for UAE end-of-service benefits: discount rate, salary escalation, attrition — the inputs an actuary uses, in your browser.",
    guide: "uae-eosb-gratuity",
  },
  {
    slug: "ias36-impairment-calculator",
    title: "IAS 36 impairment test — value-in-use DCF",
    description:
      "Five-year cash-flow projection, WACC discount, terminal value — determine whether a CGU is impaired and by how much.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "ias12-deferred-tax-calculator",
    title: "IAS 12 deferred tax schedule",
    description:
      "Add your balance-sheet items, their carrying amounts and tax bases — get the temporary differences and the resulting DTL/DTA positions at any tax rate.",
    guide: "uae-tax-deadlines",
  },
  {
    slug: "ifrs9-eir-calculator",
    title: "IFRS 9 effective interest rate (EIR) calculator",
    description:
      "Solve for the EIR on a financial instrument with origination fees or a premium/discount, and produce the full amortised-cost schedule.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "ksa-zakat-calculator",
    title: "KSA Zakat estimator (ZATCA)",
    description:
      "Build the zakat base the way ZATCA does — equity, provisions and long-term borrowing in, fixed assets and long-term investments out, floored at the year's adjusted profit — at the Hijri 2.5% or Gregorian 2.5777% rate, with mixed Saudi/GCC ownership handled.",
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
