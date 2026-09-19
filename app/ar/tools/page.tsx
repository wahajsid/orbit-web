import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { TOOLS } from "@/lib/tools";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "الأدوات — Hysaab",
  description:
    "حاسبات مجانية للضرائب والمحاسبة في الإمارات والسعودية تُريك طريقة الحساب: ضريبة القيمة المضافة، ضريبة الشركات، مكافأة نهاية الخدمة، IFRS 16 وغيرها.",
  alternates: langAlternates("/tools"),
};

export default function ToolsPage() {
  return (
    <PageShell locale="ar">
      <PageHero
        eyebrow="الأدوات"
        title={<>حاسبات تُريك<br /><span>طريقة الحساب.</span></>}
        lede="مجانية وسريعة وتُحسب بالكامل في متصفحك — الأرقام التي تمدّ إليها فرق المالية الخليجية يدها كل أسبوع، مع القاعدة وراء كل رقم مشروحة بوضوح. بعض الحاسبات متاح بالعربية والبقية بالإنجليزية حتى تكتمل الترجمة."
        locale="ar"
      />
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-index">
            {TOOLS.map((t) => (
              <a key={t.slug} href={t.arTitle ? `/ar/tools/${t.slug}` : `/tools/${t.slug}`}>
                <div>
                  <h3>{t.arTitle ?? t.title}</h3>
                  <p>{t.arDescription ?? t.description}</p>
                </div>
                <span className="hw-mono">{t.arTitle ? "مجاني" : "EN · مجاني"}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
