/* ── Inner-page shell and hero ───────────────────────────────────────
   Every rebuilt inner page is: PageShell > PageHero + sections built
   from the hw-* kit in app/hysaab-home.css ("inner pages"). The shell
   supplies the skip link, the navy header, the closing "Let's talk"
   band, the footer and the launch countdown. */

import { SiteHeader } from "./HomeHeader";
import { SiteFooter } from "./SiteFooter";
import { CtaBand } from "../hysaab/CtaBand";
import { Capture } from "./Capture";
import { capture } from "@/lib/home-moments";

export function PageShell({ children, band }: { children: React.ReactNode; band?: { kicker?: string; title?: string; body?: string } | false }) {
  return (
    <div className="hw-page hw-inner" id="top">
      <a href="#main" className="hw-skip">Skip to the content</a>
      <SiteHeader />
      <main id="main">{children}</main>
      {band !== false && <CtaBand {...(band ?? {})} />}
      <SiteFooter />
    </div>
  );
}

export function PageHero({ eyebrow, title, lede, children }: { eyebrow: string; title: React.ReactNode; lede?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="hw-phero">
      <div className="hw-wrap hw-phero-in">
        <p className="hw-eyebrow hw-eyebrow--dot"><span className="hw-dot" aria-hidden="true" /> {eyebrow}</p>
        <h1>{title}</h1>
        {lede && <p className="hw-phero-lede">{lede}</p>}
        {children && <div className="hw-actions">{children}</div>}
      </div>
    </section>
  );
}

/** A genuine workspace capture from public/home/screens, enlargeable. */
export function Shot({ file, title, alt, caption, priority }: { file: string; title: string; alt: string; caption: string; priority?: boolean }) {
  const m = capture(file, title, alt, caption);
  return (
    <div className="hw-shot">
      <Capture moment={m} priority={priority} />
      {m.ready && <p className="hw-shot-cap">{caption}</p>}
    </div>
  );
}
