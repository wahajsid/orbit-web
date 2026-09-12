import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { InterestCapCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Interest deduction cap calculator (30% EBITDA) — Orbit",
  description:
    "Free UAE interest limitation calculator: net interest vs the greater of 30% of adjusted EBITDA and AED 12m — deductible, disallowed, and the ten-period carry-forward.",
  alternates: langAlternates("/tools/uae-interest-cap-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-interest-cap-calculator"
      kicker="CORPORATE TAX · FINANCING"
      lede="Two prongs, one cap: 30% of tax-EBITDA or twelve million dirhams, whichever is greater. Enter both numbers and see which one binds — and what carries forward."
    >
      <InterestCapCalculator />
    </ToolPage>
  );
}
