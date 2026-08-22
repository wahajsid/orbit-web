import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { VatPenaltyCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة غرامات ضريبة القيمة المضافة الإماراتية — Orbit",
  description:
    "حاسبة مجانية لغرامات ضريبة القيمة المضافة في الإمارات: التأخر في التقديم (1,000/2,000 درهم) زائد التأخر في السداد بواقع 2% فورًا و4% شهريًا بسقف 300% — محسوبة من أيام التأخر.",
  alternates: langAlternates("/tools/uae-vat-penalty-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-vat-penalty-calculator"
      kicker="ضريبة القيمة المضافة · الإمارات"
      locale="ar"
      lede="الغرامات تتراكم على ساعة تدق: 2% من الضريبة غير المدفوعة يوم انقضاء الموعد، و4% إضافية كل شهر بعد الأول، وغرامات ثابتة عن الإقرار المتأخر نفسه. أدخل الأيام وشاهد الفاتورة."
    >
      <VatPenaltyCalculator ar />
    </ToolPage>
  );
}
