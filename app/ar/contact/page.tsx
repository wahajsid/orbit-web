/* ── /ar/contact ─────────────────────────────────────────────────────
   النسخة العربية من صفحة التواصل الإنجليزية الحالية (المصدر:
   app/(en)/contact/page.tsx)، مبنية على PageShell وعدّة hw-* في
   app/hysaab-home.css. الاستفسار هو استفسار الصفحة الرئيسية نفسه:
   العمود نفسه ونموذج EnquiryForm نفسه، الذي يرسل إلى /api/contact.
   مسارات البريد الثلاثة التي تذكرها الصفحة دائمًا تأتي تحته. شريط
   "لنتحدث" الختامي موقوف: هذه الصفحة هي الاستفسار. */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "تواصل مع Hysaab: احجز جولة تعريفية",
  description:
    "اطلب محادثة عن دفاترك، أو راسلنا بشأن الدعم أو نطاق مخصص أو شراكة. شخص حقيقي يقرأ كل رسالة. Hysaab، فريق المحاسبة والتقارير لشركات الإمارات والسعودية.",
  alternates: langAlternates("/contact"),
};

const ROUTES: { eyebrow: string; title: string; detail: string; cta: string; mailto: string }[] = [
  {
    eyebrow: "الدعم",
    title: "شيء يحتاج إلى شخص.",
    detail: "أسئلة عن المنتج، أو مساعدة في الحساب، أو مستند قرأه Hysaab خطأً. راسلنا ويتولاه شخص حقيقي.",
    cta: "راسل الدعم",
    mailto: "mailto:info@hysaab.ai?subject=Support",
  },
  {
    eyebrow: "حلول مخصصة",
    title: "منظومتك المالية، بقواعدك أنت.",
    detail: "مجموعات متعددة الكيانات، أو مسارات عمل غير مألوفة، أو موصّل لا نملكه بعد، أو انتقال من نظام قديم. أخبرنا كيف يبدو إقفالك الشهري فعلًا ونحدد نطاقه معك.",
    cta: "ناقش نطاقًا مخصصًا",
    mailto: "mailto:info@hysaab.ai?subject=Bespoke%20solution",
  },
  {
    eyebrow: "الشراكات",
    title: "محاسبون ومستشارون ومنصات.",
    detail: "تدير مكتبًا وتريد Hysaab تحت دفاتر عملائك، أو تبني منتجًا ينبغي أن يتحدث إلى منتجنا. نفضّل العمل مع الشركاء لا من حولهم.",
    cta: "ابدأ شراكة",
    mailto: "mailto:info@hysaab.ai?subject=Partnership",
  },
];

export default function ContactPage() {
  return (
    <PageShell locale="ar" band={false}>
      <PageHero
        locale="ar"
        eyebrow="تواصل معنا"
        title={<>شخص حقيقي يقرأ<br /><span>كل رسالة.</span></>}
        lede="لا تحويل للتذاكر ولا متاهة روبوتات محادثة. اكتب كما تكتب لزميل، لأن هذا من يجيبك."
      />

      <section className="hw-conversation" id="conversation">
        <div className="hw-wrap hw-conversation-grid">
          <div>
            <p className="hw-eyebrow">محادثة، لا عرض مبيعات</p>
            <h2>لنبدأ<br />بدفاترك.</h2>
            <p>أخبرنا بما يستغرق وقتًا أطول مما ينبغي.<br />ونريك أين يناسبك Hysaab.</p>
            <div className="hw-agenda">
              <span className="hw-mono">محادثتك الأولى</span>
              <ol>
                <li><span className="hw-mono">01</span> مسار عملك الحالي</li>
                <li><span className="hw-mono">02</span> جولة تعريفية مركّزة في المنتج</li>
                <li><span className="hw-mono">03</span> الملاءمة والنطاق والخطوات التالية</li>
              </ol>
            </div>
          </div>
          <EnquiryForm source="Arabic contact page" locale="ar" demo />
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">طرق أخرى للوصول إلينا</p>
              <h2>اختر المسار<br /><span>الذي يناسبك.</span></h2>
            </div>
            <p>تفضّل البريد؟ كل مسار أدناه يفتح رسالة إلى صندوق البريد نفسه، يقرؤها شخص. وسطر الموضوع يساعدها على الوصول إلى الشخص المناسب.</p>
          </div>
          <div className="hw-cards">
            {ROUTES.map((r) => (
              <article key={r.eyebrow}>
                <p className="hw-eyebrow">{r.eyebrow}</p>
                <h3>{r.title}</h3>
                <p>{r.detail}</p>
                <a className="hw-link" href={r.mailto}>{r.cta} <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">خط مباشر</span>
            <p>
              <a href="mailto:info@hysaab.ai" dir="ltr" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>info@hysaab.ai</a>. نحن في دبي، ونعمل في الإمارات والسعودية، بالإنجليزية والعربية.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
