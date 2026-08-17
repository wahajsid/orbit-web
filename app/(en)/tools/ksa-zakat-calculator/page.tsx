import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { ZakatCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "KSA Zakat estimator (ZATCA) — Orbit",
  description:
    "Free Saudi zakat calculator: build the zakat base from equity, provisions and long-term borrowing less fixed assets and long-term investments, floored at adjusted profit — Hijri 2.5% or Gregorian 2.5777%, with mixed Saudi/GCC ownership handled.",
};

export default function Page() {
  return (
    <ToolPage
      slug="ksa-zakat-calculator"
      kicker="ZAKAT · KSA"
      lede="The base builds up from what finances the business and comes down by what's locked up long-term — then 2.5% (or the Gregorian gross-up) on the Saudi/GCC share, floored at the year's adjusted profit."
    >
      <ZakatCalculator />
    </ToolPage>
  );
}
