import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { GUIDES } from "@/lib/guides";
import { getArGuide } from "@/lib/guides-ar";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "الأدلة — Hysaab",
  description:
    "أدلة عملية قصيرة عن ضريبة القيمة المضافة وضريبة الشركات والمحاسبة في الإمارات والسعودية، كتبها المحاسبون الذين بنوا Hysaab. بلا تسجيل.",
  alternates: langAlternates("/guides"),
};

export default function GuidesPage() {
  return (
    <PageShell locale="ar">
      <PageHero
        eyebrow="الأدلة"
        title={<>العمل الروتيني،<br /><span>مشروحًا ببساطة.</span></>}
        lede="إجابات قصيرة وعملية عن الأسئلة التي تتعامل معها فرق المالية في الخليج فعلًا — كتبها المحاسبون الذين بنوا Hysaab. بعض الأدلة متاح بالعربية والبقية بالإنجليزية حتى تكتمل الترجمة. لا بوابات، ولا جدار بريد إلكتروني."
        locale="ar"
      />
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-index">
            {GUIDES.map((g) => {
              const ar = getArGuide(g.slug);
              return (
                <a key={g.slug} href={ar ? `/ar/guides/${g.slug}` : `/guides/${g.slug}`}>
                  <div>
                    <h3>{(ar ?? g).title}</h3>
                    <p>{(ar ?? g).description}</p>
                  </div>
                  <span className="hw-mono">{ar ? "" : "EN · "}‏{g.minutes} دقائق</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
