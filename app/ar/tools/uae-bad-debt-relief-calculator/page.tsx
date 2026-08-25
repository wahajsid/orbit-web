import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { BadDebtCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة إعفاء الديون المعدومة (المادة 64) — Orbit",
  description:
    "حاسبة مجانية لإعفاء الديون المعدومة في ضريبة القيمة المضافة الإماراتية: اختبر شروط المادة 64 الأربعة واحسب تسوية ضريبة المخرجات 5/105 على الذمم المشطوبة.",
  alternates: langAlternates("/tools/uae-bad-debt-relief-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-bad-debt-relief-calculator"
      kicker="ضريبة القيمة المضافة · الإمارات"
      locale="ar"
      lede="الضريبة التي دفعتها عن فواتير لم تُدفع لك يمكن أن تعود — متى اجتمعت أربعة شروط ومضت ستة أشهر. علّم ما هو صحيح وشاهد التسوية."
    >
      <BadDebtCalculator ar />
    </ToolPage>
  );
}
