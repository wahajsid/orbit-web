import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { CtaBand } from "@/components/hysaab/CtaBand";
import { GUIDES, getGuide, relatedGuides, stripLinks, linkParts } from "@/lib/guides";
import { getArGuide } from "@/lib/guides-ar";
import { TOOLS } from "@/lib/tools";
import { langAlternates } from "@/lib/site-meta";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug);
  if (!g) return {};
  return {
    title: `${g.title} — Hysaab`,
    description: g.description,
    // hreflang pair only once an Arabic twin exists
    ...(getArGuide(g.slug) ? { alternates: langAlternates(`/guides/${g.slug}`) } : {}),
  };
}

function Rich({ text }: { text: string }) {
  return (
    <>
      {linkParts(text).map((p, i) =>
        typeof p === "string" ? p : <a key={i} className="textlink" href={p.href}>{p.label}</a>,
      )}
    </>
  );
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) notFound();

  const url = `https://hysaab.ai/guides/${g.slug}`;
  const tools = TOOLS.filter((t) => t.guide === g.slug);
  const related = relatedGuides(g.slug);

  const FAQ_LD = g.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: g.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: stripLinks(f.a) },
        })),
      }
    : null;

  const ARTICLE_LD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    dateModified: g.updated,
    author: { "@type": "Organization", name: "Hysaab", url: "https://hysaab.ai" },
    publisher: { "@type": "Organization", name: "Hysaab", url: "https://hysaab.ai" },
    mainEntityOfPage: url,
  };

  const BREADCRUMB_LD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hysaab", item: "https://hysaab.ai/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://hysaab.ai/guides" },
      { "@type": "ListItem", position: 3, name: g.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      {FAQ_LD && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />}
      <MgNav />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">
            <a href="/guides" style={{ textDecoration: "none" }}>GUIDES</a> · {g.minutes} MIN · UPDATED{" "}
            <time dateTime={g.updated}>
              {(() => {
                const [y, m, d] = g.updated.split("-");
                const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                return `${Number(d)} ${MON[Number(m) - 1]} ${y}`;
              })()}
            </time>
          </div>
          <h1 className="mg-page-h">{g.title}</h1>
          <p className="mg-page-lede">{g.description}</p>
        </section>
        <section className="mg-page-body mg-guide-body">
          {g.sections.map((s) => (
            <div key={s.h} className="mg-guide-sec">
              <h2 className="mg-guide-h">{s.h}</h2>
              {s.ps?.map((p, i) => <p key={i} className="mg-guide-p"><Rich text={p} /></p>)}
              {s.list && (
                <ul className="mg-guide-list">
                  {s.list.map((li) => <li key={li}><Rich text={li} /></li>)}
                </ul>
              )}
            </div>
          ))}
          {g.faqs && g.faqs.length > 0 && (
            <div className="mg-guide-sec">
              <h2 className="mg-guide-h">Questions people actually ask</h2>
              {g.faqs.map((f) => (
                <div key={f.q}>
                  <p className="mg-guide-p"><strong>{f.q}</strong></p>
                  <p className="mg-guide-p"><Rich text={f.a} /></p>
                </div>
              ))}
            </div>
          )}
          {(tools.length > 0 || related.length > 0) && (
            <div className="mg-guide-sec">
              <h2 className="mg-guide-h">Keep reading</h2>
              <ul className="mg-guide-list">
                {tools.map((t) => (
                  <li key={t.slug}><strong>Tool:</strong> <a className="textlink" href={`/tools/${t.slug}`}>{t.title}</a></li>
                ))}
                {related.map((r) => (
                  <li key={r.slug}><strong>Guide:</strong> <a className="textlink" href={`/guides/${r.slug}`}>{r.title}</a></li>
                ))}
              </ul>
            </div>
          )}
          {g.tax && (
            <p className="mg-guide-disclaimer">
              General information for Gulf businesses, not tax advice. Regulations move — verify
              against the official FTA/ZATCA text or your advisor before acting.
            </p>
          )}
          <div className="mg-guide-cta">
            <a href={g.cta?.href ?? "/product"} className="mg-cta">{g.cta?.label ?? "See how Hysaab runs this"} →</a>
            <a href="/guides" className="mg-ghost">All guides</a>
          </div>
        </section>
      </main>
      <CtaBand />
      <MgFooter />
    </>
  );
}
