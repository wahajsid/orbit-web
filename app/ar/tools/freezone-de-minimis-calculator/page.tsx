import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { DeMinimisCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة الحد الأدنى للمناطق الحرة (QFZP) — Orbit",
  description:
    "اختبار مجاني لحد الأدنى في المناطق الحرة الإماراتية: قارن الإيرادات غير المؤهلة بالأدنى من 5 ملايين درهم أو 5% من الإجمالي، وشاهد هامشك، وافهم هاوية السنوات الخمس.",
  alternates: langAlternates("/tools/freezone-de-minimis-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="freezone-de-minimis-calculator"
      kicker="ضريبة الشركات · المناطق الحرة"
      locale="ar"
      lede="نسبة الـ 0% لا تصمد إلا ما دامت الإيرادات غير المؤهلة تحت الأدنى من 5 ملايين درهم أو 5% من إجمالي الإيرادات — هذا هو الاختبار، والهامش أمام عينيك."
    >
      <DeMinimisCalculator ar />
    </ToolPage>
  );
}
