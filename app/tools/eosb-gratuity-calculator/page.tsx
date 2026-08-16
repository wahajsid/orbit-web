import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { EosbCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE gratuity (EOSB) calculator — Orbit",
  description:
    "Free UAE end-of-service gratuity calculator: 21 days of basic wage per year for the first five years, 30 after, capped at two years' wage — with the working shown.",
};

export default function Page() {
  return (
    <ToolPage
      slug="eosb-gratuity-calculator"
      kicker="Payroll"
      lede="Basic wage and service period in, gratuity out — computed on the 21/30-day rule with the two-year cap, and the working spelled out underneath."
    >
      <EosbCalculator />
    </ToolPage>
  );
}
