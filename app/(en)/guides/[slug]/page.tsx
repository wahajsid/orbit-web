import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { GUIDES, getGuide } from "@/lib/guides";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug);
  if (!g) return {};
  return { title: `${g.title} — Orbit`, description: g.description };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) notFound();

  const ARTICLE_LD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    dateModified: g.updated,
    author: { "@type": "Organization", name: "Orbit", url: "https://www.orbitgulf.com" },
    publisher: { "@type": "Organization", name: "Orbit", url: "https://www.orbitgulf.com" },
    mainEntityOfPage: `https://www.orbitgulf.com/guides/${g.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }} />
      <MgNav />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">
            <a href="/guides" style={{ textDecoration: "none" }}>GUIDES</a> · {g.minutes} MIN
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
              General information for Gulf businesses, not tax advice. Regulations move — verify
              against the official FTA/ZATCA text or your advisor before acting.
            </p>
          )}
          <div className="mg-guide-cta">
            <a href="/product" className="mg-cta">See how Orbit runs this →</a>
            <a href="/guides" className="mg-ghost">All guides</a>
          </div>
        </section>
      </main>
      <MgFooter />
    </>
  );
}
