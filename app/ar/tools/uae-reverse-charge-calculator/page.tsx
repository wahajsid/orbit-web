import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { ReverseChargeCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة الاحتساب العكسي (الإمارات) — Orbit",
  description:
    "حاسبة مجانية للاحتساب العكسي في الإمارات: ضريبة المخرجات على الخدمات والسلع المستوردة، واسترداد المدخلات بقدر استحقاقك، والأثر النقدي الصافي.",
  alternates: langAlternates("/tools/uae-reverse-charge-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-reverse-charge-calculator"
      kicker="ضريبة القيمة المضافة · الاحتساب العكسي"
      locale="ar"
      lede="الشراء من الخارج يجعلك مورّد نفسك: تحتسب المخرجات وتسترد المدخلات في الإقرار نفسه. محايد نقديًا غالبًا — وليس محايد قيود أبدًا."
    >
      <ReverseChargeCalculator ar />
    </ToolPage>
  );
}
