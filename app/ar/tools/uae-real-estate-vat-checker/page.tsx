import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { RealEstateVatCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "فاحص ضريبة العقارات الإماراتية — Orbit",
  description:
    "أداة مجانية لضريبة العقارات في الإمارات: توريدات أولى صفرية، وسكني معفى، وتجاري خاضع، وأرض فضاء وشقق مخدومة — المعاملة والضريبة والاسترداد لكل صفقة.",
  alternates: langAlternates("/tools/uae-real-estate-vat-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-real-estate-vat-checker"
      kicker="ضريبة القيمة المضافة · العقارات"
      locale="ar"
      lede="الصفرية والإعفاء متطابقان في عين المستأجر ومتضادان في عينك — أحدهما يبقي الاسترداد حيًا والآخر يقتله. اختر التوريد وشاهد الإجابات الثلاث."
    >
      <RealEstateVatCalculator ar />
    </ToolPage>
  );
}
