import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { ActuarialEosbCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "IAS 19 actuarial EOSB valuation — Orbit",
  description:
    "Free IAS 19 projected unit credit calculator for UAE end-of-service benefits: discount rate, salary growth, attrition — the actuarial estimate auditors expect, computed in your browser.",
};

export default function Page() {
  return (
    <ToolPage
      slug="ias19-actuarial-eosb-calculator"
      kicker="IAS 19"
      lede="The simple labour-law gratuity is what you owe today. The IAS 19 number is what you should be carrying on your balance sheet — a projected unit credit estimate that accounts for future salary growth, attrition and the time value of money. This calculator shows the difference."
    >
      <ActuarialEosbCalculator />
    </ToolPage>
  );
}
