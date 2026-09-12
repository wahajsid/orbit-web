import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { VdPenaltyCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة غرامات الإفصاح الطوعي — Orbit",
  description:
    "حاسبة مجانية لغرامات النموذج 211: الثابتة 1,000/2,000 درهم زائد سلّم الـ 5%-40% على فرق الضريبة بحسب السنوات — وكلفة انتظار سنة أخرى.",
  alternates: langAlternates("/tools/uae-voluntary-disclosure-penalty-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-voluntary-disclosure-penalty-calculator"
      kicker="ضريبة القيمة المضافة · الإفصاح"
      locale="ar"
      lede="الخطأ نفسه يكلّف 5% اعترافًا في السنة الأولى و40% في الخامسة — وكل شيء يتغير يوم يصل إشعار التدقيق. أدخل الأرقام وشاهد لماذا الجواب دائمًا الآن."
    >
      <VdPenaltyCalculator ar />
    </ToolPage>
  );
}
