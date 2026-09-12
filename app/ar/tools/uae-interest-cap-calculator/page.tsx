import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { InterestCapCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة سقف خصم الفائدة — Orbit",
  description:
    "حاسبة مجانية لتحديد خصم الفائدة في الإمارات: صافي الفائدة مقابل الأعلى من 30% من الأرباح المعدلة و12 مليون درهم — المخصوم والممنوع وترحيل الفترات العشر.",
  alternates: langAlternates("/tools/uae-interest-cap-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-interest-cap-calculator"
      kicker="ضريبة الشركات · التمويل"
      locale="ar"
      lede="شقّان وسقف واحد: 30% من الأرباح الضريبية أو اثنا عشر مليون درهم، أيهما أعلى. أدخل الرقمين وشاهد أيهما يلزِم — وما الذي يُرحَّل."
    >
      <InterestCapCalculator ar />
    </ToolPage>
  );
}
