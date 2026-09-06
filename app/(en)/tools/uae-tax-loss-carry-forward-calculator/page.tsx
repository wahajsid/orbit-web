import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { LossCarryCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Tax loss carry-forward calculator (UAE CT) — Orbit",
  description:
    "Free UAE tax loss calculator: apply brought-forward losses against taxable income with the 75% cap, see the tax payable and the losses that carry onward.",
  alternates: langAlternates("/tools/uae-tax-loss-carry-forward-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-tax-loss-carry-forward-calculator"
      kicker="CORPORATE TAX · LOSSES"
      lede="Losses carry forward forever, but each year they may only absorb three-quarters of the income in front of them. Enter both numbers and watch the cap work."
    >
      <LossCarryCalculator />
    </ToolPage>
  );
}
