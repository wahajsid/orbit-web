/* ── Footer data shared by every footer ──────────────────────────────
   The link columns, legal copy and the Oblique Consult ownership line.
   A plain module (no "use client") so the server-rendered homepage and
   the client MgFooter read the same source. */

type Link = readonly [string, string];
type FootCol = readonly [string, readonly Link[]];

export const FOOT = {
  en: {
    tag: <>AI accounting &amp; reporting<br />Built in Dubai for the Gulf</>,
    cols: [
      ["Product", [["/product", "Product"], ["/how-it-works", "How it works"], ["/pricing", "Pricing"], ["/integrations", "Integrations"], ["/compliance", "Compliance"]]],
      ["Resources", [["/guides", "Guides"], ["/tools", "Tools"], ["/faq", "FAQ"], ["/#ways", "Self-serve or managed"]]],
      ["Our products", [["/invoice", "hysaab invoice, invoice processing"], ["/hire", "Ibtidah, hiring"], ["/firms", "hysaab services OS, professional services"], ["/audit", "hysaab audit, ISA audits"]]],
      ["Company", [["/about", "Why we built it"], ["/contact", "Contact"], ["https://app.hysaab.ai", "Sign in"]]],
    ] as readonly FootCol[],
    kicker: "Get in touch",
    contactH: "Have a question? Ask a person.",
    contactP: "Tell us about your books and what you would like to know. A real person from the Hysaab team replies within one working day.",
    legal: "© 2026 Hysaab · hysaab.ai · Dubai, UAE",
    disclaimer: "Screens and scenarios are illustrative. Figures are examples, not results.",
    lang: <>EN / <a href="/ar"><bdi>العربية</bdi></a></>,
    owner: "A product of Oblique Consult.",
    ownerLink: "Built by Oblique Consult",
  },
  ar: {
    tag: <>محاسبة وتقارير بالذكاء الاصطناعي<br />صُنع في دبي للخليج</>,
    cols: [
      ["المنتج", [["/ar/product", "المنتج"], ["/ar/how-it-works", "كيف يعمل"], ["/ar/pricing", "الأسعار"], ["/ar/integrations", "التكاملات"], ["/ar/compliance", "الامتثال"]]],
      ["الموارد", [["/ar/guides", "الأدلة"], ["/ar/tools", "الأدوات"], ["/ar/faq", "الأسئلة الشائعة"]]],
      ["منتجاتنا", [["/ar/invoice", "hysaab invoice، معالجة الفواتير"], ["/hire", "Ibtidah، التوظيف"], ["/ar/firms", "hysaab services OS، الخدمات المهنية"], ["/audit", "hysaab audit، تدقيق الحسابات"]]],
      ["الشركة", [["/ar/about", "لماذا بنيناه"], ["/ar/contact", "تواصل معنا"]]],
    ] as readonly FootCol[],
    kicker: "تواصل معنا",
    contactH: "لديك سؤال؟ اسأل شخصًا حقيقيًا.",
    contactP: "أخبرنا عن دفاترك وما تود معرفته. يرد عليك شخص حقيقي من فريق Hysaab خلال يوم عمل واحد.",
    legal: "© 2026 Hysaab · hysaab.ai · دبي، الإمارات",
    disclaimer: "الشاشات والسيناريوهات توضيحية. الأرقام أمثلة وليست نتائج.",
    lang: <><a href="/">EN</a> / <bdi>العربية</bdi></>,
    owner: "أحد منتجات Oblique Consult.",
    ownerLink: "من تطوير Oblique Consult",
  },
};

/* Hysaab is an Oblique Consult product. A plain crawlable anchor, opened
   the way the site opens every external link. */
export function OwnerLine({ owner, link, className = "hy-footer-owner" }: { owner: string; link: string; className?: string }) {
  return (
    <div className={className}>
      <span>{owner}</span>
      <a href="https://obliqueconsult.com" target="_blank" rel="noopener">{link} <span aria-hidden="true">↗</span></a>
    </div>
  );
}
