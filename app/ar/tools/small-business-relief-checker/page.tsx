import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { SbrCheckerCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "فاحص أهلية تخفيف الأعمال الصغيرة — Orbit",
  description:
    "فاحص مجاني لتخفيف الأعمال الصغيرة في ضريبة الشركات الإماراتية: اختبار إيرادات الـ 3 ملايين درهم، وشرط الفترات السابقة، واستثناءات المناطق الحرة والمجموعات الكبرى — والـ 9% التي سيوفرها الاختيار.",
  alternates: langAlternates("/tools/small-business-relief-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="small-business-relief-checker"
      kicker="ضريبة الشركات · الإمارات"
      locale="ar"
      lede="أربعة شروط تحسم الاختيار: إيرادات هذه الفترة، وإيرادات كل فترة سابقة، ووضع المنطقة الحرة، وحجم المجموعة. أجب عنها واحصل على نعم أو لا صريحة — مع الضريبة على المحك."
    >
      <SbrCheckerCalculator ar />
    </ToolPage>
  );
}
