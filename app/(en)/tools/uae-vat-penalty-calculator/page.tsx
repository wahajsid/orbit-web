import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { VatPenaltyCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE VAT penalty estimator — Hysaab",
  description:
    "Free UAE VAT penalty calculator under the April 2026 rules: late filing (AED 1,000/2,000) plus late payment at 14% a year on unpaid tax, charged monthly — computed from days late.",
  alternates: langAlternates("/tools/uae-vat-penalty-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-vat-penalty-calculator"
      kicker="VAT · UAE"
      lede="Since 14 April 2026, unpaid VAT costs 14% a year, charged month by month, on top of the fixed fine for the late return itself. Enter the days and see the bill."
    >
      <VatPenaltyCalculator />
    </ToolPage>
  );
}
