import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { AR_GUIDES, getArGuide } from "@/lib/guides-ar";
import { langAlternates } from "@/lib/site-meta";

/* Arabic guide pages exist only for translated slugs (lib/guides-ar);
   everything else 404s and the AR index links to the English page. */

export function generateStaticParams() {
  return AR_GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getArGuide(params.slug);
  if (!g) return {};
  return {
    title: `${g.title} — Orbit`,
    description: g.description,
    alternates: langAlternates(`/guides/${g.slug}`),
  };
}

export default function ArGuidePage({ params }: { params: { slug: string } }) {
  const g = getArGuide(params.slug);
  if (!g) notFound();

  const ARTICLE_LD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    dateModified: g.updated,
    inLanguage: "ar",
    author: { "@type": "Organization", name: "Orbit", url: "https://www.orbitgulf.com" },
    publisher: { "@type": "Organization", name: "Orbit", url: "https://www.orbitgulf.com" },
    mainEntityOfPage: `https://www.orbitgulf.com/ar/guides/${g.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }} />
      <MgNav locale="ar" />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">
            <a href="/ar/guides" style={{ textDecoration: "none" }}>الأدلة</a> · {g.minutes} دقائق
          </div>
          <h1 className="mg-page-h">{g.title}</h1>
          <p className="mg-page-lede">{g.description}</p>
        </section>
        <section className="mg-page-body mg-guide-body">
          {g.sections.map((s) => (
            <div key={s.h} className="mg-guide-sec">
              <h2 className="mg-guide-h">{s.h}</h2>
              {s.ps?.map((p, i) => <p key={i} className="mg-guide-p">{p}</p>)}
              {s.list && (
                <ul className="mg-guide-list">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
            </div>
          ))}
          {g.tax && (
            <p className="mg-guide-disclaimer">
              معلومات عامة لشركات الخليج، وليست استشارة ضريبية. اللوائح تتغير — تحقق من النص
              الرسمي للهيئة الاتحادية للضرائب أو زاتكا أو من مستشارك قبل التصرف.
            </p>
          )}
          <div className="mg-guide-cta">
            <a href="/ar/product" className="mg-cta">شاهد كيف يدير Orbit ذلك ←</a>
            <a href="/ar/guides" className="mg-ghost">كل الأدلة</a>
          </div>
        </section>
      </main>
      <MgFooter locale="ar" />
    </>
  );
}
