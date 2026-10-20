import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { VdPenaltyCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "VAT voluntary disclosure penalty calculator — Hysaab",
  description:
    "Free UAE Form 211 penalty calculator under the April 2026 rules: 1% of the tax difference for each month since the return was due, plus 15% after an audit notice — and the cost of waiting six more months.",
  alternates: langAlternates("/tools/uae-voluntary-disclosure-penalty-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-voluntary-disclosure-penalty-calculator"
      kicker="VAT · DISCLOSURE"
      lede="Since 14 April 2026, every month an error sits undisclosed adds 1% of the tax difference, and an audit notice adds 15% on top. Enter the numbers and see why the answer is always now."
    >
      <VdPenaltyCalculator />
    </ToolPage>
  );
}
