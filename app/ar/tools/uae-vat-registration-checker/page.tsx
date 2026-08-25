import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { VatRegistrationCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "فاحص التسجيل في ضريبة القيمة المضافة الإماراتية — Orbit",
  description:
    "فاحص مجاني لعتبات التسجيل في ضريبة القيمة المضافة الإماراتية: اختبار الإلزامي عند 375,000 درهم والاختياري عند 187,500 درهم على 12 شهرًا متحركة وقاعدة الثلاثين يومًا.",
  alternates: langAlternates("/tools/uae-vat-registration-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-vat-registration-checker"
      kicker="ضريبة القيمة المضافة · الإمارات"
      locale="ar"
      lede="الاختبار متحرك — أي 12 شهرًا متتالية، زائد ما تتوقعه في الثلاثين يومًا القادمة. فوّت العبور وسيكلّفك التسجيل المتأخر 10,000 درهم. افحص موقعك."
    >
      <VatRegistrationCalculator ar />
    </ToolPage>
  );
}
