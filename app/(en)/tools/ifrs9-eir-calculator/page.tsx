import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { EirCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  /* Search title front-loads "EIR" (2026-11-10): page 1 for "eir ifrs 9"
     and "eir ifrs" with 37 impressions and no clicks in 90 days. */
  title: "EIR calculator: IFRS 9 effective interest rate, free",
  description:
    "Free IFRS 9 EIR calculator: enter face value, coupon, term and fees, solve for the effective interest rate and get the full amortised-cost schedule.",
  alternates: { canonical: "./" },
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
