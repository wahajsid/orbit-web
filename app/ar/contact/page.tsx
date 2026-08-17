import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "تواصل معنا — Orbit",
  description: "الدعم والحلول المخصصة والشراكات — شخص حقيقي يقرأ كل رسالة.",
  alternates: langAlternates("/contact"),
};

const CARDS: { kicker: string; title: string; detail: string; cta: string; mailto: string }[] = [
  {
    kicker: "الدعم",
    title: "شيء يحتاج إلى إنسان",
    detail: "أسئلة عن المنتج، أو مساعدة في الحساب، أو مستند قرأه أوربت خطأً — راسلنا ويتولاه شخص حقيقي (في منطقتك الزمنية). أعضاء الدفعة المؤسسة لهم الأولوية.",
    cta: "راسل الدعم ←",
    mailto: "mailto:info@orbitgulf.com?subject=Support",
  },
  {
    kicker: "حلول مخصصة",
    title: "منظومتك المالية، بقواعدك أنت",
    detail: "مجموعات متعددة الكيانات، أو مسارات عمل غير مألوفة، أو موصّل لا نملكه بعد، أو ترحيل من نظام قديم — أخبرنا كيف يبدو إقفالك الشهري فعلًا ونحدد نطاق الحل معك.",
    cta: "ناقش حلًا مخصصًا ←",
    mailto: "mailto:info@orbitgulf.com?subject=Bespoke%20solution",
  },
  {
    kicker: "الشراكات",
    title: "محاسبون ومستشارون ومنصات",
    detail: "تدير مكتبًا وتريد أوربت تحت دفاتر عملائك؟ تبني منتجًا ينبغي أن يتحدث إلى منتجنا؟ نحن نبني سكك المالية في الخليج مع الشركاء، لا من حولهم.",
    cta: "ابدأ شراكة ←",
    mailto: "mailto:info@orbitgulf.com?subject=Partnership",
  },
];

export default function ContactPage() {
  return (
    <>
      <MgNav locale="ar" />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">تواصل معنا</div>
          <h1 className="mg-page-h">شخص حقيقي يقرأ كل رسالة.</h1>
          <p className="mg-page-lede">
            لا تحويل للتذاكر، ولا متاهة روبوتات محادثة. اختر المسار المناسب واكتب كما
            تكتب لزميل — لأن من يجيبك زميل فعلًا.
          </p>
        </section>
        <section className="mg-page-body">
          <div className="mg-contact-grid">
            {CARDS.map((c) => (
              <div key={c.kicker} className="mg-contact-card">
                <div className="mg-kicker">{c.kicker}</div>
                <div className="mg-contact-title">{c.title}</div>
                <p className="mg-contact-p">{c.detail}</p>
                <a className="mg-cta" href={c.mailto}>{c.cta}</a>
              </div>
            ))}
          </div>
          <p className="mg-page-lede" style={{ marginTop: 36 }}>
            الخط المباشر: <a className="textlink" href="mailto:info@orbitgulf.com">info@orbitgulf.com</a> · دبي والرياض
          </p>
        </section>
      </main>
      <MgFooter locale="ar" />
    </>
  );
}
