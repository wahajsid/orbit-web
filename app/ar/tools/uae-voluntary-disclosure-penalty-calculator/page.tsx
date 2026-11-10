import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { VdPenaltyCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة غرامات الإفصاح الطوعي — Hysaab",
  description:
    "حاسبة مجانية لغرامات النموذج 211 وفق قواعد أبريل 2026: 1% من فرق الضريبة عن كل شهر منذ استحقاق الإقرار، و15% إضافية بعد إشعار التدقيق — وكلفة انتظار ستة أشهر أخرى.",
  alternates: langAlternates("/tools/uae-voluntary-disclosure-penalty-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-voluntary-disclosure-penalty-calculator"
      kicker="ضريبة القيمة المضافة · الإفصاح"
      locale="ar"
      lede="منذ 14 أبريل 2026 يضيف كل شهر يبقى فيه الخطأ دون إفصاح 1% من فرق الضريبة، ويضيف إشعار التدقيق 15% فوق ذلك. أدخل الأرقام وشاهد لماذا الجواب دائمًا الآن."
    >
      <VdPenaltyCalculator ar />
    </ToolPage>
  );
}
