import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { LossCarryCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة ترحيل الخسائر الضريبية — Orbit",
  description:
    "حاسبة مجانية للخسائر الضريبية الإماراتية: طبّق الخسائر المرحّلة على الدخل الخاضع بسقف الـ 75%، وشاهد الضريبة المستحقة والخسائر المستمرة بالترحيل.",
  alternates: langAlternates("/tools/uae-tax-loss-carry-forward-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-tax-loss-carry-forward-calculator"
      kicker="ضريبة الشركات · الخسائر"
      locale="ar"
      lede="الخسائر تُرحَّل إلى الأبد، لكن كل سنة لا تمتص إلا ثلاثة أرباع الدخل الذي أمامها. أدخل الرقمين وشاهد السقف يعمل."
    >
      <LossCarryCalculator ar />
    </ToolPage>
  );
}
