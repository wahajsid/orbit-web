/* ── Modernist-green shared chrome ───────────────────────────────────
   The sticky ruled nav, the framed mark and the flush footer — the one
   chrome every page uses. Locale-aware: pass locale="ar" from the /ar
   tree and every label, href and arrow flips; EN pages pass nothing. */

import { LangSwitch, LangSwitchFooter } from "./LangSwitch";

type Locale = "en" | "ar";

const NAV = {
  en: {
    product: "Product",
    agents: "Agents",
    compliance: "Compliance",
    pricing: "Pricing",
    more: "More products",
    signin: "Sign in",
    demo: "Book a demo →",
    home: "Orbit home",
  },
  ar: {
    product: "المنتج",
    agents: "الوكلاء",
    compliance: "الامتثال",
    pricing: "الأسعار",
    more: "منتجات أخرى",
    signin: "تسجيل الدخول",
    demo: "احجز عرضًا ←",
    home: "أوربت — الصفحة الرئيسية",
  },
} as const;

const FOOT = {
  en: {
    product: "Product", pricing: "Pricing", integrations: "Integrations",
    how: "How it works", guides: "Guides", tools: "Tools",
    faq: "FAQ", about: "About", contact: "Contact",
    loc: "Dubai, UAE",
  },
  ar: {
    product: "المنتج", pricing: "الأسعار", integrations: "التكاملات",
    how: "كيف يعمل", guides: "الأدلة", tools: "الأدوات",
    faq: "الأسئلة الشائعة", about: "من نحن", contact: "تواصل معنا",
    loc: "دبي، الإمارات",
  },
} as const;

export function Mark({ size = 30, framed = true, ringOnly = false, strokeWidth = 2 }: { size?: number; framed?: boolean; ringOnly?: boolean; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true" style={{ flexShrink: 0 }}>
      {framed && !ringOnly && <rect x="1" y="1" width="28" height="28" fill="none" stroke="var(--ink)" strokeWidth="2" />}
      <circle cx="15" cy="15" r="7" fill="none" stroke="var(--accent)" strokeWidth={strokeWidth} />
      <circle cx="24" cy="8" r={ringOnly ? 4 : 3} fill="var(--accent)" />
    </svg>
  );
}

export function MgNav({ active, locale = "en" }: { active?: "product"; locale?: Locale }) {
  const t = NAV[locale];
  const p = locale === "ar" ? "/ar" : "";
  const home = p || "/";
  return (
    <header className="mg-nav" role="banner">
      <div className="mg-nav-inner">
        <a href={home} className="mg-brand" aria-label={t.home}>
          <Mark size={30} />
          <span className="mg-wordmark">ORBIT</span>
        </a>
        <nav className="mg-nav-links" aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary"}>
          <a href={`${p}/product`} className={active === "product" ? "mg-nav-active" : undefined} aria-current={active === "product" ? "page" : undefined}>{t.product}</a>
          <a href={`${home}#agents`}>{t.agents}</a>
          <a href={`${home}#compliance`}>{t.compliance}</a>
          <a href={`${p}/pricing`}>{t.pricing}</a>
          <a href={`${home}#products`} className="mg-hidden-narrow">{t.more}</a>
        </nav>
        <div className="mg-nav-right">
          <LangSwitch />
          <a href="https://app.orbitgulf.com" className="mg-signin">{t.signin}</a>
          <a href={`${home}#join`} className="mg-cta">{t.demo}</a>
        </div>
      </div>
    </header>
  );
}

export function MgFooter({ locale = "en" }: { locale?: Locale }) {
  const t = FOOT[locale];
  const p = locale === "ar" ? "/ar" : "";
  return (
    <footer className="mg-footer">
      <Mark size={18} />
      <span className="mg-wordmark mg-wordmark-sm">ORBIT</span>
      <nav className="mg-footer-links" aria-label={locale === "ar" ? "روابط أسفل الصفحة" : "Footer"}>
        <a href={`${p}/product`}>{t.product}</a>
        <a href={`${p}/pricing`}>{t.pricing}</a>
        <a href={`${p}/integrations`}>{t.integrations}</a>
        <a href={`${p}/how-it-works`}>{t.how}</a>
        <a href={`${p}/guides`}>{t.guides}</a>
        <a href={`${p}/tools`}>{t.tools}</a>
        <a href={`${p}/faq`}>{t.faq}</a>
        <a href={`${p}/about`}>{t.about}</a>
        <a href={`${p}/contact`}>{t.contact}</a>
      </nav>
      <span className="mg-footer-loc">{t.loc} · <LangSwitchFooter /> · © 2026 Orbit</span>
    </footer>
  );
}
