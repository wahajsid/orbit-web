import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { DisputeDeadlineCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "FTA objection deadline calculator (40 business days) — Hysaab",
  description:
    "Free UAE tax dispute calculator: the 40-business-day deadline for a review, reconsideration, objection to the Committee or court appeal, counted under Article 49.",
  alternates: { canonical: "./" },
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-fta-objection-deadline-calculator"
      kicker="TAX PROCEDURES · DISPUTES"
      lede="Enter the date you were notified and what you are challenging. The deadline is counted in business days, the way the Tax Procedures Law counts it."
    >
      <DisputeDeadlineCalculator />
    </ToolPage>
  );
}
