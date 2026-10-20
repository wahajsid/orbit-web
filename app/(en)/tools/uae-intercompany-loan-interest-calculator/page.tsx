import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { LoanInterestCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Intercompany loan interest calculator (UAE TP) — Hysaab",
  description:
    "Free calculator for UAE intercompany loans: arm's length interest, the Article 34 adjustment for lender and borrower, and the net Corporate Tax cost for the group.",
  alternates: langAlternates("/tools/uae-intercompany-loan-interest-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-intercompany-loan-interest-calculator"
      kicker="CORPORATE TAX · TRANSFER PRICING"
      lede="Enter the loan, the rate charged and an arm's length rate. See the adjustment on each side, including when one company sits in a free zone or abroad."
    >
      <LoanInterestCalculator />
    </ToolPage>
  );
}
