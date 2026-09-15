"use client";

/* ── Hysaab shared chrome ────────────────────────────────────────────
   The sticky 60px cream header with the 2px navy rule, and the cream
   footer with four link columns, the enquiry form and the legal row.
   One chrome for every page (EN and AR). The homepage passes home so
   the nav becomes the design's section anchors; inner pages get the
   site map. Styles live in app/home.css (hy-*). */

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";
import { ContactForm } from "./hysaab/ContactForm";

type Locale = "en" | "ar";
type Link = readonly [string, string];

const NAV = {
  en: {
    home: [
      ["#story", "Story"], ["#demo", "Product"], ["#agents", "Agents"], ["#voices", "Who it's for"], ["#ways", "Plans"], ["#why", "Why"], ["#family", "Products"],
    ] as readonly Link[],
    inner: [
      ["/product", "Product"], ["/pricing", "Pricing"], ["/compliance", "Compliance"], ["/guides", "Guides"], ["/tools", "Tools"], ["/#family", "Products"],
    ] as readonly Link[],
    signin: "Sign in", demo: "Book a demo", join: "Join the waitlist →", menu: "Menu", close: "Close", brand: "hysaab.ai, home",
  },
  ar: {
    home: [
      ["/ar/product", "المنتج"], ["/ar/pricing", "الأسعار"], ["/ar/compliance", "الامتثال"], ["/ar/guides", "الأدلة"], ["/ar/tools", "الأدوات"],
    ] as readonly Link[],
    inner: [
      ["/ar/product", "المنتج"], ["/ar/pricing", "الأسعار"], ["/ar/compliance", "الامتثال"], ["/ar/guides", "الأدلة"], ["/ar/tools", "الأدوات"],
    ] as readonly Link[],
    signin: "تسجيل الدخول", demo: "احجز عرضًا", join: "انضم إلى قائمة الانتظار ←", menu: "القائمة", close: "إغلاق", brand: "hysaab.ai، الصفحة الرئيسية",
  },
};

type FootCol = readonly [string, readonly Link[]];

const FOOT = {
  en: {
    tag: <>AI accounting &amp; reporting<br />Built in Dubai for the Gulf</>,
    cols: [
      ["Product", [["/product", "Product"], ["/how-it-works", "How it works"], ["/pricing", "Pricing"], ["/integrations", "Integrations"], ["/compliance", "Compliance"]]],
      ["Resources", [["/guides", "Guides"], ["/tools", "Tools"], ["/faq", "FAQ"], ["/#ways", "Self-serve or managed"]]],
      ["Our products", [["/invoice", "Hysaab Invoice, invoice processing"], ["https://ibtidah.ae", "Ibtidah, hiring"], ["/firms", "Oblique OS, professional services"]]],
      ["Company", [["/about", "Why we built it"], ["/#contact", "Contact"], ["/#cohort", "Join the waitlist"]]],
    ] as readonly FootCol[],
    kicker: "Get in touch",
    contactH: "Have a question? Ask a person.",
    contactP: "Tell us about your books and what you would like to know. A real person from the Hysaab team replies within one working day.",
    legal: "© 2026 Hysaab · hysaab.ai · Dubai, UAE",
    disclaimer: "Screens and scenarios are illustrative. Figures are examples, not results.",
    lang: <>EN / <a href="/ar"><bdi>العربية</bdi></a></>,
  },
  ar: {
    tag: <>محاسبة وتقارير بالذكاء الاصطناعي<br />صُنع في دبي للخليج</>,
    cols: [
      ["المنتج", [["/ar/product", "المنتج"], ["/ar/how-it-works", "كيف يعمل"], ["/ar/pricing", "الأسعار"], ["/ar/integrations", "التكاملات"], ["/ar/compliance", "الامتثال"]]],
      ["الموارد", [["/ar/guides", "الأدلة"], ["/ar/tools", "الأدوات"], ["/ar/faq", "الأسئلة الشائعة"]]],
      ["منتجاتنا", [["/ar/invoice", "Hysaab Invoice، معالجة الفواتير"], ["https://ibtidah.ae", "Ibtidah، التوظيف"], ["/ar/firms", "Oblique OS، الخدمات المهنية"]]],
      ["الشركة", [["/ar/about", "لماذا بنيناه"], ["/ar/contact", "تواصل معنا"]]],
    ] as readonly FootCol[],
    kicker: "تواصل معنا",
    contactH: "لديك سؤال؟ اسأل شخصًا حقيقيًا.",
    contactP: "أخبرنا عن دفاترك وما تود معرفته. يرد عليك شخص حقيقي من فريق Hysaab خلال يوم عمل واحد.",
    legal: "© 2026 Hysaab · hysaab.ai · دبي، الإمارات",
    disclaimer: "الشاشات والسيناريوهات توضيحية. الأرقام أمثلة وليست نتائج.",
    lang: <><a href="/">EN</a> / <bdi>العربية</bdi></>,
  },
};

/* Kept for callers that still import the old framed mark: the favicon
   mark at a given size. */
export function Mark({ size = 30 }: { size?: number; framed?: boolean; ringOnly?: boolean; strokeWidth?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/favicon.svg" width={size} height={size} alt="" aria-hidden="true" style={{ flexShrink: 0 }} />;
}

function twinOf(path: string): { isAr: boolean; target: string } {
  const isAr = path === "/ar" || path.startsWith("/ar/");
  if (isAr) return { isAr, target: path === "/ar" ? "/" : path.slice(3) || "/" };
  let p = path;
  if (p.startsWith("/guides/")) p = "/guides";
  if (p.startsWith("/tools/")) p = "/tools";
  return { isAr, target: p === "/" ? "/ar" : `/ar${p}` };
}

export function MgNav({ locale = "en", home = false }: { active?: string; locale?: Locale; home?: boolean }) {
  const t = NAV[locale];
  const [open, setOpen] = useState(false);
  const path = usePathname() || "/";
  const { isAr, target } = twinOf(path);
  const root = locale === "ar" ? "/ar" : "/";
  const links = home ? t.home : t.inner;
  const cohort = locale === "ar" ? "/ar#ledger" : home ? "#cohort" : "/#cohort";
  const contact = locale === "ar" ? "/ar/contact" : home ? "#contact" : "/#contact";

  return (
    <header className="hy-header" role="banner" data-open={open}>
      <a href={root} className="hy-header-brand" aria-label={t.brand} onClick={() => setOpen(false)}>
        <Wordmark size={26} ground="light" />
      </a>
      <nav className="hy-nav" aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary"}>
        {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="hy-header-right">
        <span className="hy-lang">
          {isAr ? <a href={target}>EN</a> : <span aria-current="true">EN</span>}
          <span aria-hidden="true">·</span>
          {isAr ? <span className="hy-ar" aria-current="true" lang="ar">ع</span> : <a href={target} className="hy-ar" lang="ar" aria-label="العربية">ع</a>}
        </span>
        <a href="https://app.hysaab.ai" className="hy-lang" style={{ fontWeight: 500 }}>{t.signin}</a>
        <a href={contact} className="hy-btn hy-btn--outline hy-btn--sm">{t.demo}</a>
        <a href={cohort} className="hy-btn hy-btn--navy hy-btn--sm">{t.join}</a>
        <button type="button" className="hy-menu-btn" aria-expanded={open} aria-controls="hy-menu" onClick={() => setOpen((o) => !o)}>
          {open ? t.close : t.menu}
        </button>
      </div>
      <nav className="hy-menu" id="hy-menu" aria-label={locale === "ar" ? "قائمة الهاتف" : "Mobile"}>
        {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a href={contact} onClick={() => setOpen(false)}>{t.demo}</a>
        <a href={target} onClick={() => setOpen(false)}>{isAr ? "English" : <span className="hy-ar" lang="ar">العربية</span>}</a>
      </nav>
    </header>
  );
}

export function MgFooter({ locale = "en" }: { locale?: Locale }) {
  const t = FOOT[locale];
  return (
    <footer className="hy-footer" id="contact">
      <div className="hy-wrap">
        <div className="hy-footer-top">
          <div className="hy-footer-brand">
            <Wordmark size={24} ground="light" />
            <span className="hy-footer-tag">{t.tag}</span>
          </div>
          {t.cols.map(([head, links]) => (
            <div className="hy-footer-col" key={head}>
              <span className="hy-label">{head}</span>
              {links.map(([href, label]) => (
                <a key={href} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="hy-footer-contact">
          <div className="hy-footer-contact-copy">
            <span className="hy-label">{t.kicker}</span>
            <h2 className="hy-footer-contact-h">{t.contactH}</h2>
            <p className="hy-footer-contact-p">{t.contactP}</p>
            <a href="mailto:info@hysaab.ai" className="hy-ulink">info@hysaab.ai</a>
          </div>
          <ContactForm />
        </div>
        <div className="hy-footer-legal">
          <span>{t.legal} · {t.lang}</span>
          <span>{t.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
