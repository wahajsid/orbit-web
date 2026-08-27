import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { EmployeeCostCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة تكلفة الموظف في الإمارات — Orbit",
  description:
    "حاسبة مجانية لتكلفة التوظيف في الإمارات: الراتب الإجمالي زائد مخصص نهاية الخدمة الشهري على الأساسي، أو مساهمات المعاش للمواطنين — التكلفة الشهرية والسنوية.",
  alternates: langAlternates("/tools/uae-employee-cost-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-employee-cost-calculator"
      kicker="الرواتب · الإمارات"
      locale="ar"
      lede="الراتب ليس تكلفة التوظيف. المكافأة تتراكم من الشهر الأول، والمعاش يحل محلها للمواطنين، والرقم الصادق هو ما يجب أن تحمله دفاترك."
    >
      <EmployeeCostCalculator ar />
    </ToolPage>
  );
}
