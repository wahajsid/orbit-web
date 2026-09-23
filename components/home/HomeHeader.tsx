"use client";

/* ── Site header ─────────────────────────────────────────────────────
   One header for every page in either language, with ONE global nav
   (review 2026-09-18). Website change plan 2026-09-23: Products and
   Resources are dropdowns, the audiences get their own links (For
   finance teams, For firms), Trust joins the bar, and "Book a demo"
   replaces "Let's talk" as the main button. It opens the team's
   Calendly in a new tab (lib/demo.ts).

   Dropdowns are disclosure buttons (aria-expanded + aria-controls):
   click or tap toggles, Enter and Space work because it is a real
   button, Escape closes and returns focus, moving focus or clicking
   outside closes. A fine pointer's hover opens them too. `.hw-chrome`
   lets the header sit inside pages still built on older styles. */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "../Wordmark";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

type Link = readonly [string, string];
/* A dropdown row: href, label and an optional small tag ("Free"). */
type MenuLink = readonly [string, string, string?];
type Locale = "en" | "ar";
type Item = { href: string; label: string } | { menu: string; label: string; links: readonly MenuLink[] };

const NAV: Record<Locale, readonly Item[]> = {
  en: [
    { menu: "products", label: "Products", links: [["/accounting", "Hysaab Finance"], ["/firms", "Hysaab Practice"], ["/audit", "Hysaab Audit"], ["/hire", "Ibtidah"], ["/check", "Books Check", "Free"]] },
    { href: "/accounting", label: "For finance teams" },
    { href: "/firms", label: "For firms" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/trust", label: "Trust" },
    { menu: "resources", label: "Resources", links: [["/guides", "Guides"], ["/tools", "Calculators"], ["/faq", "FAQ"]] },
  ],
  /* AR-REVIEW: new Arabic nav labels (المنتجات، للفرق المالية،
     للمكاتب المهنية، الثقة، الموارد، فحص الدفاتر، مجاني). Product names
     stay Latin. Books Check has no Arabic page: the row links to the
     English /check. */
  ar: [
    { menu: "products", label: "المنتجات", links: [["/ar/accounting", "Hysaab Finance"], ["/ar/firms", "Hysaab Practice"], ["/audit", "Hysaab Audit"], ["/hire", "Ibtidah"], ["/check", "فحص الدفاتر", "مجاني"]] },
    { href: "/ar/accounting", label: "للفرق المالية" },
    { href: "/ar/firms", label: "للمكاتب المهنية" },
    { href: "/ar/how-it-works", label: "كيف يعمل" },
    { href: "/ar/pricing", label: "الأسعار" },
    { href: "/ar/trust", label: "الثقة" },
    { menu: "resources", label: "الموارد", links: [["/ar/guides", "الأدلة"], ["/ar/tools", "الحاسبات"], ["/ar/faq", "الأسئلة الشائعة"]] },
  ],
};
/* Extra links at the foot of the phone menu. */
const MORE: Record<Locale, readonly Link[]> = {
  en: [["/invoice", "Invoice checks"], ["/integrations", "Integrations"], ["/compliance", "Compliance"], ["/about", "Why we built it"], ["/contact", "Contact"]],
  /* AR-REVIEW: "فحص الفواتير" (Invoice checks). */
  ar: [["/ar/invoice", "فحص الفواتير"], ["/ar/integrations", "التكاملات"], ["/ar/compliance", "الامتثال"], ["/ar/about", "لماذا بنيناه"], ["/ar/contact", "تواصل معنا"]],
};
const T = {
  en: { brand: "Hysaab home", nav: "Main navigation", signin: "Sign in", demo: "Book a demo", menu: "Menu", close: "Close", mobile: "Mobile navigation", home: "/" },
  /* AR-REVIEW: "احجز عرضًا تجريبيًا" (Book a demo). */
  ar: { brand: "Hysaab، الصفحة الرئيسية", nav: "التنقل الرئيسي", signin: "تسجيل الدخول", demo: "احجز عرضًا تجريبيًا", menu: "القائمة", close: "إغلاق", mobile: "قائمة الهاتف", home: "/ar" },
};

/* The other language's twin of the current path. Pages without a twin
   fall back to that language's homepage. */
const AR_PAGES = new Set(["/about", "/accounting", "/compliance", "/contact", "/faq", "/firms", "/guides", "/how-it-works", "/integrations", "/invoice", "/pricing", "/tools", "/trust"]);
function twinOf(path: string, locale: Locale): string {
  if (locale === "ar") return path === "/ar" ? "/" : path.startsWith("/ar/") ? path.slice(3) : "/";
  let p = path;
  if (p.startsWith("/guides/")) p = "/guides";
  if (p.startsWith("/tools/")) p = "/tools";
  return AR_PAGES.has(p) ? `/ar${p}` : "/ar";
}

const finePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function Dropdown({ id, label, links, current, open, setOpen }: { id: string; label: string; links: readonly MenuLink[]; current: (h: string) => "page" | undefined; open: boolean; setOpen: (v: string | null) => void }) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const btn = useRef<HTMLButtonElement | null>(null);
  /* Opened by hover: the click that follows must not close it again. */
  const hovered = useRef(false);
  const active = links.some(([h]) => current(h));
  return (
    <div
      ref={wrap}
      className="hw-drop"
      data-open={open}
      onMouseEnter={() => { if (finePointer() && !open) { hovered.current = true; setOpen(id); } }}
      onMouseLeave={() => { hovered.current = false; if (finePointer() && open) setOpen(null); }}
      onBlur={(e) => { if (!wrap.current?.contains(e.relatedTarget as Node | null)) setOpen(null); }}
      onKeyDown={(e) => { if (e.key === "Escape" && open) { e.stopPropagation(); setOpen(null); btn.current?.focus(); } }}
    >
      <button ref={btn} type="button" className="hw-drop-btn" aria-expanded={open} aria-controls={`hw-drop-${id}`} data-current={active || undefined} onClick={() => { if (hovered.current) { hovered.current = false; return; } setOpen(open ? null : id); }}>
        {label}<span className="hw-drop-caret" aria-hidden="true" />
      </button>
      <ul className="hw-drop-panel" id={`hw-drop-${id}`}>
        {links.map(([href, text, tag]) => (
          <li key={href}><a href={href} aria-current={current(href)} onClick={() => setOpen(null)}>{text}{tag && <span className="hw-drop-tag">{tag}</span>}</a></li>
        ))}
      </ul>
    </div>
  );
}

export function SiteHeader({ home = false, locale = "en" }: { home?: boolean; locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  /* Until hydration, CSS opens the dropdowns on hover and focus. */
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const btn = useRef<HTMLButtonElement | null>(null);
  const path = usePathname() || "/";
  const isAr = locale === "ar";
  const t = T[locale];
  const twin = twinOf(path, locale);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* A tap or click anywhere outside an open dropdown closes it. */
  useEffect(() => {
    if (!drop) return;
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element | null)?.closest?.(".hw-drop")) setDrop(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [drop]);

  const close = () => setOpen(false);
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? ("page" as const) : undefined);

  return (
    <header className={`hw-header hw-chrome${home ? "" : " hw-header--inner"}`} role="banner" data-open={open} data-ready={ready || undefined}>
      <div className="hw-header-in">
        <a href={t.home} className="hw-brand" aria-label={t.brand} onClick={close}>
          <Wordmark size={36} ground="light" />
        </a>
        <nav className="hw-nav" aria-label={t.nav}>
          {NAV[locale].map((item) =>
            "menu" in item
              ? <Dropdown key={item.menu} id={item.menu} label={item.label} links={item.links} current={current} open={drop === item.menu} setOpen={setDrop} />
              : <a key={item.label} href={item.href} aria-current={current(item.href)}>{item.label}</a>,
          )}
        </nav>
        <div className="hw-header-right">
          <span className="hw-lang">
            {isAr ? <a href={twin} lang="en" aria-label="English">EN</a> : <span aria-current="true">EN</span>}
            <span aria-hidden="true">·</span>
            {isAr ? <span className="hy-ar" aria-current="true" lang="ar">ع</span> : <a href={twin} className="hy-ar" lang="ar" aria-label="العربية">ع</a>}
          </span>
          <a href="https://app.hysaab.ai" className="hw-signin">{t.signin}</a>
          <a {...DEMO} className="hw-nav-cta m-magnetic" onClick={close}>{t.demo} <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB[locale]}</span></a>
          <button ref={btn} type="button" className="hw-menu-btn" aria-expanded={open} aria-controls="hw-menu" onClick={() => setOpen((o) => !o)}>
            {open ? t.close : t.menu}
          </button>
        </div>
      </div>
      <nav className="hw-menu" id="hw-menu" aria-label={t.mobile} hidden={!open}>
        {NAV[locale].map((item) =>
          "menu" in item
            ? (
              <div className="hw-menu-group" key={item.menu}>
                <span className="hw-menu-head">{item.label}</span>
                {item.links.map(([href, label, tag]) => <a key={href} href={href} onClick={close} aria-current={current(href)}>{label}{tag && <span className="hw-drop-tag">{tag}</span>}</a>)}
              </div>
            )
            : <a key={item.label} href={item.href} onClick={close} aria-current={current(item.href)}>{item.label}</a>,
        )}
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
