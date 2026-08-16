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
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
