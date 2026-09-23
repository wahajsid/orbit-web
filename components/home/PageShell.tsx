/* ── Inner-page shell and hero ───────────────────────────────────────
   Every rebuilt inner page is: PageShell > PageHero + sections built
   from the hw-* kit in app/hysaab-home.css ("inner pages"). The shell
   supplies the skip link, the navy header, the closing "Let's talk"
   band, the footer and the launch countdown.
   Motion (brand/MOTION.md): every shell page carries the motion marker,
   so its hero enters as kinetic lines and the kit reveals on scroll.
   motion="hero" keeps long reading pages (guides) calm below the hero. */

import { SiteHeader } from "./HomeHeader";
import { SiteFooter } from "./SiteFooter";
import { CtaBand } from "../hysaab/CtaBand";
import { Capture } from "./Capture";
import { capture } from "@/lib/home-moments";
import { LaunchNotice } from "./LaunchNotice";
import { Children, cloneElement, isValidElement } from "react";
import { KineticTitle } from "../motion/Kinetic";

export function PageShell({ children, band, locale = "en", motion = "full" }: { children: React.ReactNode; band?: { kicker?: string; title?: React.ReactNode; body?: string } | false; locale?: "en" | "ar"; motion?: "full" | "hero" }) {
  return (
    <div className="hw-page hw-inner" id="top">
      <span data-motion-page={motion} hidden />
      <a href="#main" className="hw-skip">{locale === "ar" ? "تخطَّ إلى المحتوى" : "Skip to the content"}</a>
      <SiteHeader locale={locale} />
      <main id="main">{children}</main>
      {band !== false && <CtaBand {...(band ?? {})} locale={locale} />}
      <SiteFooter locale={locale} />
    </div>
  );
}

export function PageHero({ eyebrow, title, lede, children, locale = "en", notice = false }: { eyebrow: string; title: React.ReactNode; lede?: React.ReactNode; children?: React.ReactNode; locale?: "en" | "ar"; notice?: boolean }) {
  return (
    <section className="hw-phero">
      <div className="hw-wrap hw-phero-in">
        <p className="hw-eyebrow hw-eyebrow--dot"><span className="hw-dot" aria-hidden="true" /> {eyebrow}</p>
        <h1><KineticTitle title={title} maxMark={locale === "ar" ? 12 : 16} /></h1>
        {lede && <p className="hw-phero-lede">{lede}</p>}
        {children && <div className="hw-actions">{ctaMotion(children)}</div>}
        {notice && <LaunchNotice locale={locale} />}
      </div>
    </section>
  );
}

/* The hero's buttons become magnetic fill CTAs (brand/MOTION.md). Done
   on the server so no class arrives late and nothing shifts. */
function ctaMotion(children: React.ReactNode) {
  return Children.map(children, (c) => {
    if (!isValidElement<{ className?: string }>(c)) return c;
    const cls = c.props.className ?? "";
    return /hw-btn/.test(cls) ? cloneElement(c, { className: `${cls} m-cta m-cta--on-navy m-magnetic` }) : c;
  });
}

/** A genuine workspace capture from public/home/screens, enlargeable. */
export function Shot({ file, title, alt, caption, priority, locale = "en" }: { file: string; title: string; alt: string; caption: string; priority?: boolean; locale?: "en" | "ar" }) {
  const m = capture(file, title, alt, caption);
  return (
    <div className="hw-shot">
      <Capture moment={m} priority={priority} locale={locale} />
      {m.ready && <p className="hw-shot-cap">{caption}</p>}
    </div>
  );
}
