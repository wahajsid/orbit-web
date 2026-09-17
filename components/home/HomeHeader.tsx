"use client";

/* ── Site header (navy) ──────────────────────────────────────────────
   One header for every English page. On the homepage (`home`) the nav
   is the four section anchors and "Let's talk" jumps to the enquiry
   form; on inner pages the nav is the site map and "Let's talk" goes to
   /contact. Sign-in and the language switch are always kept. At phone
   widths everything moves into a menu. `.hw-chrome` lets it sit inside
   pages still built on the older styles. */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "../Wordmark";

type Link = readonly [string, string];

const HOME_NAV: readonly Link[] = [
  ["#experience", "The experience"],
  ["#control", "Your control"],
  ["#ways", "Ways to work"],
  ["#products", "Our products"],
];
const HOME_MORE: readonly Link[] = [
  ["/product", "Product"],
  ["/pricing", "Pricing"],
  ["/guides", "Guides"],
  ["/tools", "Calculators"],
];
const INNER_NAV: readonly Link[] = [
  ["/product", "Product"],
  ["/how-it-works", "How it works"],
  ["/pricing", "Pricing"],
  ["/compliance", "Compliance"],
  ["/guides", "Guides"],
  ["/tools", "Calculators"],
];
const INNER_MORE: readonly Link[] = [
  ["/#products", "Our products"],
  ["/integrations", "Integrations"],
  ["/faq", "FAQ"],
  ["/about", "Why we built it"],
];

/* The Arabic twin of an English path (guide and tool deep links map to
   their Arabic index; pages with no Arabic version fall back to /ar). */
const AR_PAGES = new Set(["/about", "/accounting", "/compliance", "/contact", "/faq", "/firms", "/guides", "/how-it-works", "/integrations", "/invoice", "/pricing", "/product", "/tools"]);
function arabicTwin(path: string): string {
  let p = path;
  if (p.startsWith("/guides/")) p = "/guides";
  if (p.startsWith("/tools/")) p = "/tools";
  return AR_PAGES.has(p) ? `/ar${p}` : "/ar";
}

export function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement | null>(null);
  const path = usePathname() || "/";
  const nav = home ? HOME_NAV : INNER_NAV;
  const more = home ? HOME_MORE : INNER_MORE;
  const talk = home ? "#conversation" : "/contact";
  const ar = arabicTwin(path);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const current = (href: string) => (!home && (path === href || path.startsWith(`${href}/`)) ? ("page" as const) : undefined);

  return (
    <header className={`hw-header hw-chrome${home ? "" : " hw-header--inner"}`} role="banner" data-open={open}>
      <div className="hw-header-in">
        <a href="/" className="hw-brand" aria-label="Hysaab home" onClick={close}>
          <Wordmark size={36} ground="navy" />
        </a>
        <nav className="hw-nav" aria-label="Main navigation">
          {nav.map(([href, label]) => <a key={href} href={href} aria-current={current(href)}>{label}</a>)}
        </nav>
        <div className="hw-header-right">
          <span className="hw-lang">
            <span aria-current="true">EN</span>
            <span aria-hidden="true">·</span>
            <a href={ar} className="hy-ar" lang="ar" aria-label="العربية">ع</a>
          </span>
          <a href="https://app.hysaab.ai" className="hw-signin">Sign in</a>
          <a href={talk} className="hw-nav-cta" onClick={close}>Let’s talk <span aria-hidden="true">↗</span></a>
          <button ref={btn} type="button" className="hw-menu-btn" aria-expanded={open} aria-controls="hw-menu" onClick={() => setOpen((o) => !o)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <nav className="hw-menu" id="hw-menu" aria-label="Mobile navigation" hidden={!open}>
        {nav.map(([href, label]) => <a key={href} href={href} onClick={close} aria-current={current(href)}>{label}</a>)}
        <span className="hw-menu-rule" aria-hidden="true" />
        {more.map(([href, label]) => <a key={href} href={href} onClick={close}>{label}</a>)}
        <a href="https://app.hysaab.ai" onClick={close}>Sign in</a>
        <a href={ar} onClick={close}><span className="hy-ar" lang="ar">العربية</span></a>
      </nav>
    </header>
  );
}

/* The homepage's original import name. */
export function HomeHeader() {
  return <SiteHeader home />;
}
