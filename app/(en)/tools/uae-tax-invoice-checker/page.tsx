import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { InvoiceCheckerCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE tax invoice checker (Article 59) — Hysaab",
  description:
    "Free UAE tax invoice checker: is a simplified invoice allowed under the AED 10,000 rule, and does the invoice show every Article 59 field needed to claim the VAT?",
  alternates: { canonical: "./" },
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-tax-invoice-checker"
      kicker="VAT · INVOICES"
      lede="Tell it who you are and what the supplier sent. It decides which invoice type is allowed and names any field that stops you claiming the VAT."
    >
      <InvoiceCheckerCalculator />
    </ToolPage>
  );
}
