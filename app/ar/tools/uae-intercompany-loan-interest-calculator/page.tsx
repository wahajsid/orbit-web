import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { LoanInterestCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة فائدة القروض بين الشركات المرتبطة — Hysaab",
  description:
    "الفائدة بالسعر المحايد على قرض بين شركات مرتبطة مقارنةً بالسعر المحتسب، وتعديل المادة 34 لدى الطرفين، وصافي الضريبة على المجموعة في الدولة.",
  alternates: langAlternates("/tools/uae-intercompany-loan-interest-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-intercompany-loan-interest-calculator"
      kicker="ضريبة الشركات · تسعير المعاملات"
      locale="ar"
      lede="أدخل القرض والسعر المحتسب وسعرًا محايدًا، لترى التعديل لدى كل طرف، بما في ذلك حين تكون إحدى الشركتين في منطقة حرة أو خارج الدولة."
    >
      <LoanInterestCalculator ar />
    </ToolPage>
  );
}
