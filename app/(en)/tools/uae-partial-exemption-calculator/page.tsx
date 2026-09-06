import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { PartialExemptionCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Partial exemption calculator (input VAT apportionment) — Orbit",
  description:
    "Free UAE partial exemption calculator: attribute input VAT to taxable, exempt and residual pots, compute the standard-method recovery ratio, and see the VAT actually lost.",
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
