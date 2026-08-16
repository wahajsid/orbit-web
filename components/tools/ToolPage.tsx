import { MgNav, MgFooter } from "@/components/MgChrome";
import { getGuide } from "@/lib/guides";
import { getTool } from "@/lib/tools";

/* Shared scaffold for every calculator page: ruled header, the tool,
   the disclaimer, and a cross-link to the matching guide. */
export function ToolPage({ slug, kicker, lede, children }: {
  slug: string; kicker: string; lede: string; children: React.ReactNode;
}) {
  const tool = getTool(slug)!;
  const guide = tool.guide ? getGuide(tool.guide) : undefined;
  return (
    <>
      <MgNav />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">
            <a href="/tools" style={{ textDecoration: "none" }}>TOOLS</a> · {kicker}
          </div>
          <h1 className="mg-page-h">{tool.title}</h1>
          <p className="mg-page-lede">{lede}</p>
        </section>
        <section className="mg-page-body mg-guide-body">
          {children}
          <p className="mg-guide-disclaimer">
            Illustrative figures computed in your browser — nothing is uploaded, stored or sent
            anywhere. Not accounting or tax advice; verify treatment with your advisor.
          </p>
          <div className="mg-guide-cta">
            {guide && <a href={`/guides/${guide.slug}`} className="mg-cta">Read the guide: {guide.title.split(" — ")[0]} →</a>}
            <a href="/product" className="mg-ghost">See Orbit run it for real</a>
          </div>
        </section>
      </main>
      <MgFooter />
    </>
  );
}
