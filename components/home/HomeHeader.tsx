"use client";

/* ── Site header (navy) ──────────────────────────────────────────────
   One header for every page in either language, with ONE global nav
   (review 2026-09-18: the homepage used to swap in section anchors, so
   visitors lost their bearings). The homepage renders its own secondary
   row of section links under the hero. "Let's talk" jumps to the
   enquiry form on the homepage and to the contact page elsewhere.
   `.hw-chrome` lets it sit inside pages still built on older styles. */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "../Wordmark";

type Link = readonly [string, string];
type Locale = "en" | "ar";

const NAV: Record<Locale, readonly Link[]> = {
  en: [["/product", "Product"], ["/how-it-works", "How it works"], ["/pricing", "Pricing"], ["/compliance", "Compliance"], ["/guides", "Guides"], ["/tools", "Calculators"]],
  ar: [["/ar/product", "المنتج"], ["/ar/how-it-works", "كيف يعمل"], ["/ar/pricing", "الأسعار"], ["/ar/compliance", "الامتثال"], ["/ar/guides", "الأدلة"], ["/ar/tools", "الحاسبات"]],
};
const MORE: Record<Locale, readonly Link[]> = {
  en: [["/#products", "Our products"], ["/integrations", "Integrations"], ["/faq", "FAQ"], ["/about", "Why we built it"]],
  ar: [["/ar#products", "منتجاتنا"], ["/ar/integrations", "التكاملات"], ["/ar/faq", "الأسئلة الشائعة"], ["/ar/about", "لماذا بنيناه"]],
};
const T = {
  en: { brand: "Hysaab home", nav: "Main navigation", signin: "Sign in", talk: "Let’s talk", menu: "Menu", close: "Close", mobile: "Mobile navigation", home: "/", contact: "/contact" },
  ar: { brand: "Hysaab، الصفحة الرئيسية", nav: "التنقل الرئيسي", signin: "تسجيل الدخول", talk: "لنتحدث", menu: "القائمة", close: "إغلاق", mobile: "قائمة الهاتف", home: "/ar", contact: "/ar/contact" },
};

/* The other language's twin of the current path. Pages without a twin
   fall back to that language's homepage. */
const AR_PAGES = new Set(["/about", "/accounting", "/compliance", "/contact", "/faq", "/firms", "/guides", "/how-it-works", "/integrations", "/invoice", "/pricing", "/product", "/tools"]);
function twinOf(path: string, locale: Locale): string {
  if (locale === "ar") return path === "/ar" ? "/" : path.startsWith("/ar/") ? path.slice(3) : "/";
  let p = path;
  if (p.startsWith("/guides/")) p = "/guides";
  if (p.startsWith("/tools/")) p = "/tools";
  return AR_PAGES.has(p) ? `/ar${p}` : "/ar";
}

export function SiteHeader({ home = false, locale = "en" }: { home?: boolean; locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement | null>(null);
  const path = usePathname() || "/";
  const isAr = locale === "ar";
  const t = T[locale];
  const talk = home ? "#conversation" : t.contact;
  const twin = twinOf(path, locale);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? ("page" as const) : undefined);

  return (
    <header className={`hw-header hw-chrome${home ? "" : " hw-header--inner"}`} role="banner" data-open={open}>
      <div className="hw-header-in">
        <a href={t.home} className="hw-brand" aria-label={t.brand} onClick={close}>
          <Wordmark size={36} ground="navy" />
        </a>
        <nav className="hw-nav" aria-label={t.nav}>
          {NAV[locale].map(([href, label]) => <a key={href} href={href} aria-current={current(href)}>{label}</a>)}
        </nav>
        <div className="hw-header-right">
          <span className="hw-lang">
            {isAr ? <a href={twin} lang="en" aria-label="English">EN</a> : <span aria-current="true">EN</span>}
            <span aria-hidden="true">·</span>
            {isAr ? <span className="hy-ar" aria-current="true" lang="ar">ع</span> : <a href={twin} className="hy-ar" lang="ar" aria-label="العربية">ع</a>}
          </span>
          <a href="https://app.hysaab.ai" className="hw-signin">{t.signin}</a>
          <a href={talk} className="hw-nav-cta" onClick={close}>{t.talk} <span aria-hidden="true">↗</span></a>
          <button ref={btn} type="button" className="hw-menu-btn" aria-expanded={open} aria-controls="hw-menu" onClick={() => setOpen((o) => !o)}>
            {open ? t.close : t.menu}
          </button>
        </div>
      </div>
      <nav className="hw-menu" id="hw-menu" aria-label={t.mobile} hidden={!open}>
        {NAV[locale].map(([href, label]) => <a key={href} href={href} onClick={close} aria-current={current(href)}>{label}</a>)}
        <span className="hw-menu-rule" aria-hidden="true" />
        {MORE[locale].map(([href, label]) => <a key={href} href={href} onClick={close}>{label}</a>)}
        <a href="https://app.hysaab.ai" onClick={close}>{t.signin}</a>
        <a href={twin} onClick={close}>{isAr ? <span lang="en">English</span> : <span className="hy-ar" lang="ar">العربية</span>}</a>
      </nav>
    </header>
  );
}

/* The homepage's original import name. */
export function HomeHeader({ locale = "en" }: { locale?: Locale }) {
  return <SiteHeader home locale={locale} />;
}
