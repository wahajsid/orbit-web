/* ── Footer data shared by every footer ──────────────────────────────
   The link columns, legal copy and the Oblique Consult ownership line.
   A plain module (no "use client") so the server-rendered homepage and
   the client MgFooter read the same source. */

type Link = readonly [string, string];
type FootCol = readonly [string, readonly Link[]];

export const FOOT = {
  en: {
    tag: <>AI agents for finance teams and firms<br />Built in Dubai for the Gulf</>,
    cols: [
      ["Hysaab Finance", [["/accounting", "Overview"], ["/invoice", "Invoice checks"], ["/how-it-works", "How it works"], ["/integrations", "Integrations"], ["/pricing", "Pricing"], ["/check", "Books Check, free"]]],
      ["Resources", [["/guides", "Guides"], ["/tools", "Tools"], ["/faq", "FAQ"], ["/#ways", "Self-serve or managed"]]],
      ["For firms", [["/firms", "Hysaab Practice"], ["/audit", "Hysaab Audit"]]],
      ["Company", [["/about", "Why we built it"], ["/hire", "Ibtidah, finance hiring"], ["/trust", "Trust"], ["/compliance", "Compliance"], ["/contact", "Contact"], ["/privacy", "Privacy notice"], ["/terms", "Website terms"], ["https://app.hysaab.ai", "Sign in"]]],
    ] as readonly FootCol[],
    kicker: "Get in touch",
    contactH: "Have a question? Ask a person.",
    contactP: "Tell us about your books and what you would like to know. A real person from the Hysaab team replies within one working day.",
    legal: "© 2026 Hysaab · hysaab.ai · Dubai, UAE",
    disclaimer: "Screens and scenarios are illustrative. Figures are examples, not results.",
    lang: <>EN / <a href="/ar"><bdi>العربية</bdi></a></>,
    owner: "Built by the team behind Oblique Consult.",
    ownerLink: "Visit Oblique Consult",
  },
  ar: {
    /* AR-REVIEW: the tag line, the column heads and the new links below. */
    tag: <>وكلاء ذكاء اصطناعي للفرق المالية والمكاتب المهنية<br />صُنع في دبي للخليج</>,
    cols: [
      ["Hysaab Finance", [["/ar/accounting", "نظرة عامة"], ["/ar/invoice", "فحص الفواتير"], ["/ar/how-it-works", "كيف يعمل"], ["/ar/integrations", "التكاملات"], ["/ar/pricing", "الأسعار"], ["/check", "فحص الدفاتر مجانًا (بالإنجليزية)"]]],
      ["الموارد", [["/ar/guides", "الأدلة"], ["/ar/tools", "الأدوات"], ["/ar/faq", "الأسئلة الشائعة"]]],
      ["للمكاتب المهنية", [["/ar/firms", "Hysaab Practice"], ["/audit", "Hysaab Audit (بالإنجليزية)"]]],
      ["الشركة", [["/ar/about", "لماذا بنيناه"], ["/hire", "Ibtidah، التوظيف في المالية (بالإنجليزية)"], ["/ar/trust", "الثقة"], ["/ar/compliance", "الامتثال"], ["/ar/contact", "تواصل معنا"], ["/privacy", "إشعار الخصوصية (بالإنجليزية)"], ["/terms", "شروط الموقع (بالإنجليزية)"], ["https://app.hysaab.ai", "تسجيل الدخول"]]],
    ] as readonly FootCol[],
    kicker: "تواصل معنا",
    contactH: "لديك سؤال؟ اسأل شخصًا حقيقيًا.",
    contactP: "أخبرنا عن دفاترك وما تود معرفته. يرد عليك شخص حقيقي من فريق Hysaab خلال يوم عمل واحد.",
    legal: "© 2026 Hysaab · hysaab.ai · دبي، الإمارات",
    disclaimer: "الشاشات والسيناريوهات توضيحية. الأرقام أمثلة وليست نتائج.",
    lang: <><a href="/">EN</a> / <bdi>العربية</bdi></>,
    owner: "بناه الفريق الذي يقف وراء Oblique Consult.",
    ownerLink: "زيارة Oblique Consult",
  },
};

/* Built by the team behind Oblique Consult. A plain crawlable anchor, opened
   the way the site opens every external link. */
export function OwnerLine({ owner, link, className = "hy-footer-owner" }: { owner: string; link: string; className?: string }) {
  return (
    <div className={className}>
      <span>{owner}</span>
      <a href="https://obliqueconsult.com" target="_blank" rel="noopener">{link} <span aria-hidden="true">↗</span></a>
    </div>
  );
}
