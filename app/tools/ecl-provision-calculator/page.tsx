import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { EclCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "IFRS 9 ECL provision calculator — Orbit",
  description:
    "Free expected credit loss calculator for trade receivables: ageing buckets, editable loss rates, and a forward-looking scenario slider. Watch the provision reprice as you drag.",
};

export default function Page() {
  return (
    <ToolPage
      slug="ecl-provision-calculator"
      kicker="IFRS 9"
      lede="The simplified-approach provision matrix: your ageing balances, your loss rates, and one honest slider for the macro scenario. Drag it — the provision recalculates in front of you, exactly the way an ECL model should."
    >
      <EclCalculator />
    </ToolPage>
  );
}
