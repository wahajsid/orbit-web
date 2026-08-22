import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { DeMinimisCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Free zone de minimis calculator (QFZP) — Orbit",
  description:
    "Free UAE free zone de minimis test: check non-qualifying revenue against the lower of AED 5m and 5% of total revenue, see your headroom, and understand the five-year cliff.",
};

export default function Page() {
  return (
    <ToolPage
      slug="freezone-de-minimis-calculator"
      kicker="CORPORATE TAX · FREE ZONE"
      lede="The 0% rate survives only while non-qualifying revenue stays under the lower of AED 5 million and 5% of total revenue — this is that test, with the headroom in plain sight."
    >
      <DeMinimisCalculator />
    </ToolPage>
  );
}
