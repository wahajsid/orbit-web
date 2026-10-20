import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { AUTHOR, AUTHOR_LD, AUTHOR_URL, fmtDate } from "@/lib/authors";
import { GUIDES } from "@/lib/guides";
import { TOOLS } from "@/lib/tools";

/* The author page every guide and tool byline links to: who writes the
   material, in what role, and everything he has written on the site. */
export const metadata: Metadata = {
  title: "Wahaj Siddiqui, Managing Director, Oblique Consult — Hysaab",
  description:
    "Wahaj Siddiqui writes Hysaab's UAE and KSA tax and accounting guides and calculators. Managing Director of Oblique Consult, with over 18 years in corporate finance and tax advisory.",
  alternates: { canonical: "./" },
};

export default function AuthorPage() {
  const guides = [...GUIDES].sort((a, b) => (b.updated > a.updated ? 1 : -1));
  const PROFILE_LD = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: AUTHOR_URL,
    mainEntity: { ...AUTHOR_LD, description: AUTHOR.bio },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFILE_LD) }} />
      <PageShell motion="hero">
        <PageHero
          eyebrow="Author"
          title={<>{AUTHOR.name}</>}
          lede={`${AUTHOR.jobTitle}, ${AUTHOR.org}. ${AUTHOR.bio}`}
        />
        <section>
          <div className="hw-wrap hw-section">
            <div className="hw-prose">
              <p>
                Wahaj writes and maintains the guides and calculators on this site. Each one is written against the
                official text (the FTA, ZATCA and Ministry of Finance publications, and the IFRS standards) and updated
                when the rules move. More about his firm at{" "}
                <a href={AUTHOR.sameAs[0]} target="_blank" rel="noopener">{AUTHOR.org}</a>.
              </p>
              <h2>Guides</h2>
              <ul>
                {guides.map((g) => (
                  <li key={g.slug}><a href={`/guides/${g.slug}`}>{g.title}</a> <span className="hw-mono">· {fmtDate(g.updated)}</span></li>
                ))}
              </ul>
              <h2>Calculators and checkers</h2>
              <ul>
                {TOOLS.map((t) => (
                  <li key={t.slug}><a href={`/tools/${t.slug}`}>{t.title}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}
