import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { PartialExemptionCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE partial exemption calculator: today's method vs the 2028 turnover ratio — Hysaab",
  description:
    "Free UAE partial exemption calculator: split input VAT into taxable, exempt and residual pots, then compare today's recovery ratio with the 2028 turnover method under Cabinet Decision 149.",
  alternates: langAlternates("/tools/uae-partial-exemption-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-partial-exemption-calculator"
      kicker="VAT · PARTIAL EXEMPTION"
      lede="Make any exempt supplies and your input VAT stops being all-recoverable. Three pots, one ratio, an annual true-up — computed here."
    >
      <PartialExemptionCalculator />
    </ToolPage>
  );
}
