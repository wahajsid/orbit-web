import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { DesignatedZoneCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "فاحص ضريبة المناطق المحددة — Orbit",
  description:
    "أداة مجانية لقرار ضريبة القيمة المضافة في المناطق المحددة الإماراتية: سلع أم خدمات، حركة أم استهلاك — خارج النطاق أو خاضع أو ضريبة استيراد، لكل معاملة.",
  alternates: langAlternates("/tools/uae-designated-zone-vat-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-designated-zone-vat-checker"
      kicker="ضريبة القيمة المضافة · المناطق المحددة"
      locale="ar"
      lede="عنوان الرخصة لا يحسم المعاملة — نوع التوريد والحركة الفعلية يحسمانها. أجب عن سؤالين واحصل على الجواب لكل معاملة."
    >
      <DesignatedZoneCalculator ar />
    </ToolPage>
  );
}
