import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { EmployeeCostCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE employee cost calculator — Orbit",
  description:
    "Free UAE cost-of-hire calculator: gross salary plus the monthly EOSB gratuity provision on basic wage, or pension contributions for nationals — monthly and annual employer cost.",
  alternates: langAlternates("/tools/uae-employee-cost-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-employee-cost-calculator"
      kicker="PAYROLL · UAE"
      lede="A salary is not the cost of a hire. The gratuity accrues from month one, pension replaces it for nationals, and the honest number is the one your books should carry."
    >
      <EmployeeCostCalculator />
    </ToolPage>
  );
}
