import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { WhtCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة ضريبة الاستقطاع السعودية — Orbit",
  description:
    "حاسبة مجانية لضريبة الاستقطاع السعودية: النسب المحلية حسب فئة الدفعة — أتعاب الإدارة 20% والإتاوات 15% ومعظم الباقي 5% — مع معالجة عقود الصافي من الضريبة.",
  alternates: langAlternates("/tools/ksa-withholding-tax-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="ksa-withholding-tax-calculator"
      kicker="الاستقطاع · السعودية"
      locale="ar"
      lede="الدفع لغير مقيم من السعودية يعني الاستقطاع بالنسبة المحلية لنوع الدفعة — وإذا كان العقد صافيًا من الضريبة فالإجمالي التصاعدي يجعل الضريبة تكلفتك. كلاهما محسوب هنا."
    >
      <WhtCalculator ar />
    </ToolPage>
  );
}
