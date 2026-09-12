import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { VdPenaltyCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "VAT voluntary disclosure penalty calculator — Orbit",
  description:
    "Free UAE Form 211 penalty calculator: the fixed AED 1,000/2,000 plus the 5%-40% ladder on the tax difference by years elapsed — and the cost of waiting another year.",
  alternates: langAlternates("/tools/uae-voluntary-disclosure-penalty-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-voluntary-disclosure-penalty-calculator"
      kicker="VAT · DISCLOSURE"
      lede="The same error costs 5% to confess in year one and 40% in year five — plus everything changes the day an audit notice lands. Enter the numbers and see why the answer is always now."
    >
      <VdPenaltyCalculator />
    </ToolPage>
  );
}
