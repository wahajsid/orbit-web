import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { CapitalAssetCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة نظام الأصول الرأسمالية لضريبة القيمة المضافة — Hysaab",
  description:
    "تسوية المادة 58 سنة بسنة للمباني (10 سنوات) والأصول الأخرى بقيمة 5 ملايين درهم فأكثر (5 سنوات): W وX وQ وR وZ، مع تسوية السنوات المتبقية عند البيع.",
  alternates: langAlternates("/tools/uae-capital-assets-scheme-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-capital-assets-scheme-calculator"
      kicker="ضريبة القيمة المضافة · الأصول الرأسمالية"
      locale="ar"
      lede="ضريبة المدخلات على مبنى أو أصل كبير تبقى مفتوحة 10 أو 5 سنوات. أدخل ضريبة السنة الأولى ونسبة الاسترداد لكل سنة لترى كل تسوية."
    >
      <CapitalAssetCalculator ar />
    </ToolPage>
  );
}
