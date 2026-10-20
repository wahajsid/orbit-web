import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { TopUpTaxCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "مقدّر ضريبة الحد الأدنى الإضافية 15% في الإمارات — Hysaab",
  description:
    "تقدير أولي لضريبة الحد الأدنى المحلية الإضافية: معدل الضريبة الفعلي، واستبعاد الرواتب والأصول الملموسة، والربح الزائد، والضريبة الإضافية حتى 15%.",
  alternates: langAlternates("/tools/uae-top-up-tax-estimator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-top-up-tax-estimator"
      kicker="ضريبة الشركات · الركيزة الثانية"
      locale="ar"
      lede="المجموعات التي تبلغ إيراداتها 750 مليون يورو أو أكثر تدفع حتى 15% في الإمارات منذ 2025. أدخل إجماليات الدولة لترى المعدل الفعلي والاستبعادات والضريبة الإضافية."
    >
      <TopUpTaxCalculator ar />
    </ToolPage>
  );
}
