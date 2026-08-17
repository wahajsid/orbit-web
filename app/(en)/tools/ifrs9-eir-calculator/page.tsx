import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { EirCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "IFRS 9 effective interest rate (EIR) calculator — Orbit",
  description:
    "Free EIR calculator: enter the face value, coupon, term and origination fees — solve for the effective interest rate and generate the full amortised-cost schedule under IFRS 9.",
};

export default function Page() {
  return (
    <ToolPage
      slug="ifrs9-eir-calculator"
      kicker="IFRS 9"
      lede="A loan with origination fees or a premium isn't carried at face value on day one — it's carried at net proceeds, and the difference unwinds through P&L at the effective interest rate. Enter the terms, and this calculator solves for the EIR and lays out the amortised-cost schedule."
    >
      <EirCalculator />
    </ToolPage>
  );
}
