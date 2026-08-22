import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { VatPenaltyCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE VAT penalty estimator — Orbit",
  description:
    "Free UAE VAT penalty calculator: late filing (AED 1,000/2,000) plus late payment at 2% immediately and 4% monthly on unpaid tax, capped at 300% — computed from days late.",
  alternates: langAlternates("/tools/uae-vat-penalty-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-vat-penalty-calculator"
      kicker="VAT · UAE"
      lede="Penalties compound on a clock: 2% of unpaid tax the day the deadline passes, another 4% every month after the first, and fixed fines for the late return itself. Enter the days and see the bill."
    >
      <VatPenaltyCalculator />
    </ToolPage>
  );
}
