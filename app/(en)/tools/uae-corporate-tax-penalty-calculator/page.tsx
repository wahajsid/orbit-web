import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { CtPenaltyCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE Corporate Tax penalty calculator — Orbit",
  description:
    "Free UAE Corporate Tax penalty calculator: AED 10,000 late registration, AED 500–1,000 monthly filing penalties, and 14% p.a. on unpaid tax — computed from months late.",
  alternates: langAlternates("/tools/uae-corporate-tax-penalty-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-corporate-tax-penalty-calculator"
      kicker="CORPORATE TAX · UAE"
      lede="Three meters run at once: a fixed registration fine, a filing penalty that ticks monthly even with zero tax due, and 14% a year on whatever stays unpaid. Enter the months and read the bill."
    >
      <CtPenaltyCalculator />
    </ToolPage>
  );
}
