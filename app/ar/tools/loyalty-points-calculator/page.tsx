import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { LoyaltyCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة الإيراد المؤجل لنقاط الولاء (IFRS 15) — Orbit",
  description:
    "حاسبة مجانية لبرامج الولاء وفق IFRS 15: وزّع سعر البيع بين البضاعة والنقاط بالقيمة المستقلة المرجّحة بالاسترداد، وتتبّع التزام العقد مع ورود الاستردادات.",
  alternates: langAlternates("/tools/loyalty-points-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="loyalty-points-calculator"
      kicker="الإيرادات · IFRS 15"
      locale="ar"
      lede="النقاط المكتسبة في البيع حق جوهري — جزء من سعر اليوم يخصّها. قسّم البيع، وأجّل حصة النقاط، وأطلقها مع استرداد العملاء فعلًا."
    >
      <LoyaltyCalculator ar />
    </ToolPage>
  );
}
