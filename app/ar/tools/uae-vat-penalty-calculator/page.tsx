import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { VatPenaltyCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة غرامات ضريبة القيمة المضافة الإماراتية — Hysaab",
  description:
    "حاسبة مجانية لغرامات ضريبة القيمة المضافة في الإمارات وفق قواعد أبريل 2026: التأخر في التقديم (1,000/2,000 درهم) زائد التأخر في السداد بنسبة 14% سنويًا تُحتسب شهريًا — محسوبة من أيام التأخر.",
  alternates: langAlternates("/tools/uae-vat-penalty-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-vat-penalty-calculator"
      kicker="ضريبة القيمة المضافة · الإمارات"
      locale="ar"
      lede="منذ 14 أبريل 2026 تكلّف ضريبة القيمة المضافة غير المدفوعة 14% سنويًا تُحتسب شهرًا بشهر، فوق الغرامة الثابتة عن الإقرار المتأخر نفسه. أدخل الأيام وشاهد الفاتورة."
    >
      <VatPenaltyCalculator ar />
    </ToolPage>
  );
}
