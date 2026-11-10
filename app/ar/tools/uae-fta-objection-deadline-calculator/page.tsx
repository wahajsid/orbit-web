import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { DisputeDeadlineCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة مهلة الاعتراض لدى الهيئة (40 يوم عمل) — Hysaab",
  description:
    "آخر يوم لطلب المراجعة أو إعادة النظر أو الاعتراض أمام لجنة فض المنازعات الضريبية أو الطعن أمام المحكمة، محسوبًا بأيام العمل وفق المادة 49.",
  alternates: langAlternates("/tools/uae-fta-objection-deadline-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-fta-objection-deadline-calculator"
      kicker="الإجراءات الضريبية · المنازعات"
      locale="ar"
      lede="أدخل تاريخ إخطارك وما الذي تطعن فيه. تُحسب المهلة بأيام العمل كما يحسبها قانون الإجراءات الضريبية."
    >
      <DisputeDeadlineCalculator ar />
    </ToolPage>
  );
}
