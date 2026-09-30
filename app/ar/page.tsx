/* ── الصفحة الرئيسية العربية — Tick & Tie ───────────────────────────
   Arabic twin of app/(en)/page.tsx (brand/tick-and-tie/BRAND.md): the
   same audited working paper, right to left. Each section opens with a
   W/P reference (H-1 … H-13, in page order), the key claim is on the
   highlighter, figures carry red review marks from one legend (✓ T B P),
   and the header counts September's open review points down from 43 to
   0 at ALL SQUARE (sections carry data-open). Same components as the
   English page (components/home/tt/*, the Demo with marks), fed Arabic
   strings. Brand and system names stay Latin; digits stay Western and
   left to right; WhatsApp is واتساب in prose. Caveat is kept for the
   Latin review marks only; Arabic sign-offs use the Arabic faces.
   Styles: app/tick-tie.css, with the Arabic residue in
   app/tick-tie-ar.css.
   AR-REVIEW: strings marked below are new drafts for the native
   reviewer (brand/AR-REVIEW.md). Strings carried over unchanged from
   the previous Arabic homepage are not marked. */

import { HomeHeader } from "@/components/home/HomeHeader";
import { Capture } from "@/components/home/Capture";
import { Shot } from "@/components/home/PageShell";
import { EnquiryForm, InterestLink } from "@/components/home/EnquiryForm";
import { loadMoments } from "@/lib/home-moments";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { Demo } from "@/components/hysaab/Demo";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TEAM } from "@/lib/team";
import { KineticLines, Mark, SwapLabel } from "@/components/motion/Kinetic";
import { Wp, Tm } from "@/components/home/tt/Wp";
import { TickLegend } from "@/components/home/tt/TickLegend";
import { TickStrip } from "@/components/home/tt/TickStrip";
import { AuditTrail, type TrailRow } from "@/components/home/tt/AuditTrail";
import { ReviewNote } from "@/components/home/tt/ReviewNote";

/* AR-REVIEW: title and description */
export const metadata = {
  title: "وكلاء ذكاء اصطناعي للفرق المالية والمكاتب المهنية | Hysaab",
  description:
    "وكلاء الذكاء الاصطناعي يؤدون العمل المالي وفريقك يراجع ويعتمد. Hysaab Finance للفرق المالية، و Hysaab Practice و Hysaab Audit للمكاتب المهنية.",
  alternates: langAlternates("/"),
};

/* ── ليلة واحدة على دفاتر مجموعة (توضيحية): الصفوف نفسها التي في الصفحة الإنجليزية ── */
const TRAIL: TrailRow[] = [
  { t: "21:00", who: "وكيل الاستلام", mark: "T", msg: "استلم صورة عبر واتساب من راشد، كيان دبي. Gulf Technical Supplies، INV-4471." },
  { t: "21:01", who: "وكيل الضرائب", mark: "✓", msg: "معايير الفاتورة الضريبية مستوفاة · رقم التسجيل الضريبي صحيح · ضريبة 199.50 قابلة للاسترداد." },
  { t: "21:02", who: "وكيل الترميز", mark: "T", msg: "معدات تقنية · مكتب دبي، بثقة 96% من 31 قيدًا مشابهًا. رُحّل القيد J-2291 إلى Zoho Books." },
  { t: "21:40", who: "مراقبة التكرار", mark: "T", msg: "وصلت INV-4471 مرة أخرى بالبريد. دُمجت ولم تُرحَّل مرتين." },
  { t: "23:15", who: "وكيل التحصيل", mark: "✓", msg: "أُرسل التذكير 2 من 3 إلى ELC Group. الفاتورة SI-1187 متأخرة 12 يومًا." },
  { t: "06:05", who: "وكيل مطابقة البنك", mark: "B", msg: "طُوبق 312 من 314 سطرًا مع مستنداتها خلال الليل." },
  { t: "06:06", who: "قرار لليلى", msg: "الشيك 100421 · 250 درهمًا صُرف بلا مستند. نسألك.", ask: true },
  { t: "06:30", who: "وكيل الإقفال", mark: "✓", msg: "حُرّر إيجار Knight Frank · الشهر 3 من 12. قائمة الإقفال 68%." },
  { t: "06:45", who: "وكيل التقارير", mark: "T", msg: "أُعيد بناء حزمة سبتمبر. هامش الربح الإجمالي انخفض 2.1 نقطة، والتفسير مرفق." },
];

/* ── شريط الإثبات: وقائع قابلة للإثبات فقط (AR-REVIEW: every phrase) ── */
const STATEMENTS = [
  "نقل أجهزة محمولة بقيمة 14,200 درهم من التسويق إلى الأصول الرأسمالية",
  "*بإدارة بشرية",
  "استفسر عن القيد JE-0098: لا مستند داعم مرفق",
  "طابق 212 سطرًا بنكيًا مع الفواتير خلال الليل",
  "*الذكاء الاصطناعي يُسرّع اتخاذ القرار",
  "أوقف فاتورة تحتسب ضريبة 5% على تصدير خاضع لنسبة الصفر",
  "نبّه إلى فاتورة المورّد نفسها مُدخلة مرتين في مارس",
  "*نظامك المحاسبي يحفظ السجلات",
  "لاحق ثلاث فواتير تجاوزت 60 يومًا، مع كشوف الحساب مرفقة",
  "أعاد ترميز فاتورة الكهرباء من اللوازم المكتبية إلى المرافق",
  "طلب عقد الإيجار وراء استحقاق إيجار",
  "*الوكلاء يُعدّون · والناس يقررون",
  "رواتب فاتت في يناير وتضاعفت في فبراير: نُبّه إليها",
  "عكس استحقاقًا من ديسمبر لم يُعكس قط",
  "أخضع إقرار ضريبة القيمة المضافة لعميل لكل فحص قبل مراجعة الشريك",
  "*الدليل أولًا · والحكم المهني دائمًا",
  "صاغ بنود الإضافة لضريبة الشركات من سوابق المكتب نفسه",
  "قيّم كل قيد في المجتمع لملف التدقيق",
  "صمّم العينة وأدرج البنود المطلوب فحص مستنداتها",
  "*بإدارة بشرية",
  "طابق ميزان المراجعة مع مسودة القوائم المالية",
  "وجد رصيدًا لطرف ذي علاقة بلا اتفاقية في الملف",
  "*صُنع في دبي للخليج",
];

/* AR-REVIEW: the three product cards */
const PRODUCTS: { who: string; status: string; name: string; desc: string; line: string; href: string; cta: string; en?: boolean }[] = [
  {
    who: "للفرق المالية", status: "وصول مبكر", name: "Hysaab Finance", desc: "وكلاء ذكاء اصطناعي للمحاسبة والتقارير.",
    line: "الذمم الدائنة والمطابقات والإقفال وحزمة التقارير، تُعدّ داخل النظام المحاسبي الذي تستخدمه بالفعل. وفريقك يراجع ويعتمد.",
    href: "/ar/accounting", cta: "استكشف Hysaab Finance",
  },
  {
    who: "لمكاتب الضرائب والاستشارات", status: "قريبًا", name: "Hysaab Practice", desc: "وكلاء ذكاء اصطناعي لمكاتب الضرائب والاستشارات.",
    line: "مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات في كل إقرار، ومعالجات مستمدة من سوابقك، والأعمال الإدارية للمكتب تدير نفسها من حول العمل.",
    href: "/ar/firms", cta: "استكشف Hysaab Practice",
  },
  {
    who: "لمكاتب التدقيق المرخّصة", status: "قريبًا", name: "Hysaab Audit", desc: "ملف التدقيق وفق معايير ISA، تديره المحركات ويستنتجه شركاؤك.",
    line: "كل قيد مُقيَّم، والعينات مصممة ومُقيَّمة، والجداول مطابَقة. يستنتج شريك مرخّص ويوقّع؛ ولا يوقّع Hysaab أبدًا.",
    href: "/audit", cta: "استكشف Hysaab Audit", en: true,
  },
];

const AR_NOTICE: Record<string, string> = {
  intake: "لاحظ عمود القناة، واتساب والبريد جنبًا إلى جنب، ونتيجة كل مستند، ومنها فاتورة أُوقفت لأنها لم تجتز اختبار الفاتورة الضريبية.",
  coded: "لاحظ الحساب المقترح لكل فاتورة مع درجة الثقة والسجل، ونتيجة اختبار الفاتورة الضريبية بجانبه.",
  challenge: "لاحظ أن كل قرار يحمل الوكيل الذي أثاره ودرجة ثقته، وأن القرار المفتوح يوقف ضريبة المدخلات حتى تُصحَّح الفاتورة.",
  record: "لاحظ قيدًا مفتوحًا على تعليقه، والمطابقة مع إجمالي الفاتورة، والمستندات المرفقة.",
  position: "لاحظ البطاقات الثلاث: النقد، وما ينتظرك، وما يستحق الدفع، ولكل منها سطر سياق.",
};
const AR_TITLE: Record<string, string> = {
  intake: "أرسله.",
  coded: "مرمَّز ومفحوص عند الوصول.",
  challenge: "توقّع رأيًا ثانيًا.",
  record: "اتخذ القرار. واحتفظ بالسبب.",
  position: "اعرف أين تقف.",
};

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.ar}</span>;
const inEnglish = <span className="hw-sr"> (بالإنجليزية)</span>;

/* Marks for the five workspace captures, in capture order. */
const CAPTURE_MARKS = ["T", "✓", "?", "P", "B"];

/* A hand-drawn review circle, drawn on when it scrolls into view. */
function Circle({ className }: { className?: string }) {
  return (
    <svg className={`tt-circle${className ? ` ${className}` : ""}`} viewBox="0 0 200 200" aria-hidden="true" preserveAspectRatio="none">
      <path d="M110 18 C 50 10, 12 60, 22 118 C 30 168, 90 190, 140 172 C 186 154, 194 92, 170 52 C 152 22, 112 6, 76 22" />
    </svg>
  );
}

export default function Page() {
  const moments = loadMoments();
  const pendingCount = moments.filter((m) => !m.ready).length;

  return (
    <div className="hw-page tt-page" id="top">
      <a href="#main" className="hw-skip">تخطَّ إلى المحتوى</a>
      <span data-motion-page="full" hidden />
      <HomeHeader locale="ar" />

      <main id="main">
        {/* ── H-1 البطل: وعد واحد، وبابان، ودليل العلامات (AR-REVIEW: the strip and the note) ── */}
        <section className="tt-sec tt-grid tt-hero" data-open="43">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-1" right={<>أعدّه <b>الوكلاء</b> · وراجعته <b>أنت</b></>}>وكلاء ذكاء اصطناعي للفرق المالية وللمكاتب التي تخدمها</Wp>
            <div className="tt-hero-g">
              <div className="m-enter">
                <h1><KineticLines delay={120} lines={[<>وكلاء الذكاء الاصطناعي يؤدون العمل المالي.</>, <>وفريقك <Mark at={1000}>يراجع ويعتمد</Mark>.</>]} /></h1>
                <p className="tt-note" aria-hidden="true">↑ الوكلاء يُعدّون · والناس يقررون</p>
                <p className="tt-hero-sub">بناه محاسبون أدّوا العمل بأنفسهم أولًا. للإمارات والسعودية.</p>
              </div>
              <TickLegend locale="ar" />
            </div>
            <div className="tt-doors m-enter-block">
              <article aria-labelledby="door-finance">
                <p className="tt-who">أدير فريقًا ماليًا</p>
                <h2 id="door-finance">Hysaab Finance</h2>
                <p>يتولى الوكلاء الذمم الدائنة والمطابقات والإقفال والتقارير داخل النظام المحاسبي الذي تستخدمه بالفعل.</p>
                <div className="tt-acts">
                  <a {...DEMO} className="hw-btn hw-btn--navy m-cta m-magnetic"><SwapLabel text="احجز عرضًا تجريبيًا" whole /> <span aria-hidden="true">↗</span>{newTab}</a>
                  <a className="tt-link" href="/check">افحص دفاترك مجانًا <span aria-hidden="true">←</span>{inEnglish}</a>
                </div>
              </article>
              <article aria-labelledby="door-firm">
                <p className="tt-who">أدير مكتبًا مهنيًا</p>
                <h2 id="door-firm"><bdi className="hw-nowrap">Hysaab Practice</bdi> و <bdi className="hw-nowrap">Hysaab Audit</bdi></h2>
                <p>يتولى الوكلاء الفحوص الضريبية وارتباطات العملاء وملف التدقيق وفق معايير ISA. والقرار لشركائك.</p>
                <div className="tt-acts">
                  <a {...DEMO} className="hw-btn hw-btn--navy m-cta m-magnetic"><SwapLabel text="احجز عرضًا تجريبيًا" whole /> <span aria-hidden="true">↗</span>{newTab}</a>
                  <a className="tt-link" href="/ar/firms">شاهد كيف تستخدمه المكاتب <span aria-hidden="true">←</span></a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── شريط الإثبات ── */}
        <TickStrip phrases={STATEMENTS} locale="ar" />

        {/* ── H-2 المنتجات الثلاثة ── */}
        <section id="products" className="tt-sec tt-grid" data-open="40">
          <span id="family" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp locale="ar" r="H-2" right="الوكلاء يُعدّون · والناس يقررون">المنتجات</Wp>
            <h2 className="tt-h2" data-reveal="">ثلاثة منتجات. <span className="tt-hl" data-play="">وطريقة عمل واحدة.</span></h2>
            <p className="tt-lead">كل منتج يعمل وحده. والثلاثة تلتزم القاعدة نفسها: الوكلاء يُعدّون العمل، وشخص يتخذ القرار.</p>
            <div className="tt-prods" data-reveal="stagger-lg">
              {PRODUCTS.map((p) => (
                <article key={p.name}>
                  <p className="tt-prod-st"><span>{p.who}</span><b>{p.status}</b></p>
                  <h3 lang="en" dir="ltr">{p.name}</h3>
                  <p className="tt-prod-tag">{p.desc}</p>
                  <p>{p.line}</p>
                  <a className="tt-link" href={p.href}>{p.cta} <span aria-hidden="true">←</span>{p.en && inEnglish}</a>
                </article>
              ))}
            </div>
            <p className="tt-more">توظّف في المالية؟ <a className="tt-link" href="/hire">تعرّف على Ibtidah <span aria-hidden="true">←</span>{inEnglish}</a></p>
          </div>
        </section>

        {/* ── H-3 كيف يعمل (AR-REVIEW: heading, intro, step 2 and the chat) ── */}
        <section className="tt-sec" id="how-it-works" data-open="36">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-3" right="محادثة توضيحية">كيف يعمل</Wp>
            <div className="tt-how">
              <div>
                <h2 className="tt-h2" data-reveal="">فقط تحدّث. <span className="tt-hl" data-play="">والوكلاء يباشرون العمل.</span></h2>
                <p className="tt-lead">يقرأ دفاترك، ويكتب القيود، ويلاحق ما ينقص. وأنت توافق. أرسل إيصالًا أو فاتورة أو سؤالًا، ويتولى كل وكيل جزءه.</p>
                <ol className="tt-steps" data-reveal="stagger-lg">
                  <li><span className="tt-step-n">01</span><div><h3>المستندات والبيانات تصل.</h3><p>فواتير وإيصالات وأسطر بنكية وأسئلة، عبر واتساب أو البريد أو الرفع. لا حاجة لتعلّم أداة تقارير.</p></div></li>
                  <li><span className="tt-step-n">02</span><div><h3>الوكلاء يُعدّون العمل.</h3><p>الترميز والفحوص الضريبية ومطابقة البنك. تُصاغ القيود، وتُلاحَق الفواتير المتأخرة والإيصالات الناقصة، وتعود الاستثناءات إليك مع تفسيرها.</p></div></li>
                  <li><span className="tt-step-n">03</span><div><h3>أنت تتخذ القرارات.</h3><p>تجيب عن سؤال أو تراجع اعتمادًا. حدودك تبقى سارية، والتعليل يبقى مع الدفاتر.</p></div></li>
                </ol>
              </div>
              <div className="tt-chat" aria-label="مثال على محادثة واتساب، توضيحي" data-reveal="">
                <div className="tt-chat-h"><span>واتساب · Hysaab</span><span>21:00</span></div>
                <div className="tt-chat-b">
                  <div className="tt-bub tt-bub--me"><img className="tt-photo" src="/home/inv-4471-photo.jpg" width={880} height={660} alt="صورة الفاتورة الضريبية INV-4471 من Gulf Technical Supplies بتاريخ 12 سبتمبر 2026: 3,990.00 درهم وضريبة 199.50، والإجمالي 4,189.50 درهم. مستند تجريبي." loading="lazy" />فاتورة Gulf Technical لمكتب دبي<span className="tt-meta">راشد · 21:00</span></div>
                  <div className="tt-bub tt-bub--hy">وصلت. أقرؤها الآن.
                    <span className="tt-bub-r"><Tm m="✓" />فاتورة ضريبية · رقم التسجيل الضريبي صحيح</span>
                    <span className="tt-bub-r"><Tm m="T" />معدات تقنية · مكتب دبي · 96%</span>
                    <span className="tt-bub-r"><Tm m="✓" />رُحّل القيد J-2291 إلى Zoho Books</span>
                    <span className="tt-meta">Hysaab · 21:02</span></div>
                  <div className="tt-bub tt-bub--me">شكرًا. هل تحتاج شيئًا مني؟<span className="tt-meta">راشد · 21:03</span></div>
                  <div className="tt-bub tt-bub--hy">لا شيء. الصورة مرفقة بالقيد.<span className="tt-meta">Hysaab · 21:03</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── H-4 Hysaab Finance: ليلة واحدة على دفاتر مجموعة ── */}
        <section className="tt-sec tt-grid" aria-labelledby="tt-night-h" data-open="28">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-4" right="بيانات توضيحية"><bdi>Hysaab Finance</bdi> · سجل التدقيق، ليلة واحدة</Wp>
            <h2 className="tt-h2" id="tt-night-h" data-reveal="">ليلة واحدة على <span className="tt-hl" data-play="">دفاتر مجموعة.</span></h2>
            <p className="tt-lead">ما فعله الوكلاء بين التاسعة مساءً والسابعة إلا ربعًا صباحًا، والسؤال الوحيد الذي تركوه لليلى. بيانات توضيحية.</p>
            <AuditTrail rows={TRAIL} locale="ar" />
            {/* AR-REVIEW */}
            <p className="tt-trail-foot"><span>مباشرةً من الوكلاء · 9 قيود · 8 علّمها الوكلاء، و1 تُرك لشخص</span></p>
          </div>
        </section>

        {/* ── H-5 خمس طرق يساعد بها Hysaab (AR-REVIEW: heading and intro) ── */}
        <section id="experience" className="tt-sec hw-experience tt-experience" data-open="12">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-5" right="سيناريو توضيحي · بيانات تجريبية">خمس طرق يساعد بها Hysaab</Wp>
            <h2 className="tt-h2" data-reveal="">من «أين ذلك الإيصال؟» إلى <span className="tt-hl" data-play="">«إليك تقريرك.»</span></h2>
            <p className="tt-lead">فاتورة واحدة، من صورة في التاسعة مساءً إلى فترة مقفلة. اضغط أي لحظة لتتولى التحكم.</p>
            <Demo locale="ar" marks />
            <p className="hw-disclosure">سيناريو توضيحي. تدير مجموعة النور أربعة كيانات بين دبي والرياض. ليلى المديرة المالية للمجموعة، ويُقفل فريقها المكوّن من اثني عشر شخصًا الدفاتر كل شهر. السيناريو والأرقام أمثلة، لا نتائج.</p>
          </div>
        </section>

        {/* ── H-6 داخل مساحة العمل الحقيقية ── */}
        <section className="tt-sec tt-grid" id="workspace" data-open="6">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-6" right="لقطات · بيانات تجريبية">داخل مساحة العمل الحقيقية</Wp>
            <h2 className="tt-h2" data-reveal="">داخل مساحة العمل <span className="tt-hl" data-play="">الحقيقية.</span></h2>
            <div className="tt-caps" data-reveal="stagger-lg">
              {moments.map((m, i) => (
                <article key={m.key}>
                  <Capture moment={m} focus locale="ar" />
                  <p className="tt-cap-n"><span>{m.num}</span><Tm m={CAPTURE_MARKS[i] ?? "✓"} /></p>
                  <h3>{AR_TITLE[m.key] ?? m.tabTitle}</h3>
                  <p>{m.ready ? <><strong>ما الذي تلاحظه.</strong> {AR_NOTICE[m.key] ?? m.caption}</> : "لقطة مساحة العمل قيد الإعداد."}</p>
                </article>
              ))}
            </div>
            <div className="tt-about">
              <p><strong>عن هذه الشاشات.</strong> {pendingCount > 0 ? `${pendingCount} من ${moments.length} لقطات ما زالت قيد الإعداد ومُعلَّمة كذلك. البقية لقطات` : "لقطات"} من مساحة عمل Hysaab وهي تعمل على بيانات تجريبية. كل صورة مصغرة هي الجزء من الشاشة الذي يخص الفكرة؛ اخترها لرؤية الشاشة كاملة.</p>
              <a className="hw-btn hw-btn--navy" {...DEMO}>تجوّل فيها معنا <span aria-hidden="true">↗</span>{newTab}</a>
            </div>
          </div>
        </section>

        {/* ── H-7 التحقق من الإقفال: كل شيء مُسوّى ── */}
        <section className="tt-sec" aria-labelledby="tt-zero-h" data-open="0">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-7" right="إقفال مكتمل توضيحي · بيانات تجريبية">إقفال سبتمبر / البنود المعلّقة</Wp>
            <div className="tt-square">
              <div className="tt-zero-wrap" data-play="">
                <span className="tt-zero" aria-hidden="true" data-count="" data-count-from="43">0</span>
                <Circle />
              </div>
              <div>
                <p className="tt-lab">إقفال سبتمبر / البنود المعلّقة</p>
                <h2 id="tt-zero-h">مناسبة نادرة يكون فيها الصفر هو الرقم الذي تريده.</h2>
                <p className="tt-square-p">الإيصالات وصلت. والبنك مطابَق. وكل بند في قائمة إقفال سبتمبر مكتمل.</p>
                <p className="tt-verdict">كل شيء مُسوّى.</p>
                <div className="tt-square-foot">
                  <div>
                    <p className="tt-ticks" aria-hidden="true">{"✓".repeat(43)}</p>
                    <p className="tt-count"><bdi><span data-count="">43</span> / 43</bdi> فحصًا مكتملًا</p>
                  </div>
                  <a className="hw-btn hw-btn--blush" href="#experience">أرني الدليل <span aria-hidden="true">↗</span></a>
                </div>
                {/* AR-REVIEW: the sign-off */}
                <p className="tt-signoff" aria-hidden="true"><span className="tt-signoff-m">P</span> · راجعته ل.ح. <bdi>09:40</bdi></p>
                <p className="tt-small">إقفال مكتمل توضيحي · بيانات تجريبية</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── H-8 تحكّمك (AR-REVIEW: heading, intro and the three points) ── */}
        <section className="tt-sec tt-grid" id="control" data-open="0">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-8" right="ملاحظات المراجعة تبقى في السجل">تحكّمك</Wp>
            <div className="tt-ctl">
              <div data-reveal="">
                <h2 className="tt-h2">الزميل الجيد لا يكتفي <span className="tt-hl" data-play="">بقول نعم.</span></h2>
                <p className="tt-lead">حين تبدو تعليمة ما خاطئة، يشرح Hysaab السبب. تحصل على مصدر القلق والتوصية والدليل لتتخذ القرار.</p>
              </div>
              <ReviewNote locale="ar" />
            </div>
            <div className="tt-pts" data-reveal="stagger-lg">
              <article><h3><Tm m="T" />لكل إجابة أثر.</h3><p>افتح القيود والمستندات وراءها. العمل متاح للفحص.</p></article>
              <article><h3><Tm m="✓" />حدودك تبقى في مكانها.</h3><p>حدود الاعتماد وأقفال الفترات والضوابط غير القابلة للتفاوض تبقى سارية.</p></article>
              <article><h3><Tm m="P" />السبب يبقى مع القرار.</h3><p>أي تجاوز مسموح يحتاج إلى سبب. والتوصية وقرارك يبقيان في السجل.</p></article>
            </div>
            <p className="tt-more"><a className="tt-link" href="/ar/trust">اقرأ التزاماتنا بشأن البيانات والتحكم <span aria-hidden="true">←</span></a></p>
          </div>
        </section>

        {/* ── H-9 للمكاتب المهنية ── */}
        <section id="firms" className="tt-sec" data-open="0">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-9" right="الضرائب والاستشارات والتدقيق المرخّص">للمكاتب المهنية</Wp>
            <h2 className="tt-h2" data-reveal="">مكتبك يبيع الحكم المهني. <span className="tt-hl" data-play="">والوكلاء يحملون الملف.</span></h2>
            <p className="tt-lead">لمكاتب الضرائب والاستشارات، ولمكاتب التدقيق المرخّصة. استخدم أيًّا من المنتجين وحده، أو كليهما معًا.</p>
            <div className="tt-firms" data-reveal="stagger-lg">
              <article>
                <p className="tt-who">لمكاتب الضرائب والاستشارات</p>
                <h3 lang="en" dir="ltr">Hysaab Practice</h3>
                <Shot file="p-practice.png" title="نظرة عامة على المكتب في Hysaab Practice" alt="نظرة عامة على المكتب في Hysaab Practice: الأتعاب والإقرارات المنجزة والعمل المفتوح والمخاطر في لمحة واحدة. بيانات تجريبية." caption="نظرة عامة على المكتب في Hysaab Practice، بيانات تجريبية." pending="لقطة منصة الإقرارات في Hysaab Practice قيد الإعداد." locale="ar" />
                <ul className="tt-list">
                  <li><Tm m="✓" />مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات في كل إقرار</li>
                  <li><Tm m="T" />معالجات مقترحة من سوابق مكتبك</li>
                  <li><Tm m="P" />مراجعة نقدية قبل أن يعتمد الشريك</li>
                </ul>
                <a className="tt-link" href="/ar/firms">شاهد Hysaab Practice <span aria-hidden="true">←</span></a>
              </article>
              <article>
                <p className="tt-who">لمكاتب التدقيق المرخّصة</p>
                <h3 lang="en" dir="ltr">Hysaab Audit</h3>
                <Shot file="p-audit-jet.png" title="اختبار قيود اليومية في Hysaab Audit" alt="اختبار قيود اليومية في Hysaab Audit: كل قيد مُقيَّم وفق ثلاثين معيارًا، مع المعايير التي انطبقت على كل قيد. بيانات تجريبية." caption="اختبار قيود اليومية على ارتباط تجريبي، بيانات تجريبية." locale="ar" />
                <ul className="tt-list">
                  <li><Tm m="✓" />كل قيد مُقيَّم، لا عينة تُختار بالنظر</li>
                  <li><Tm m="✓" />العينات تُصمَّم وتُختار وتُقيَّم بالشيفرة</li>
                  <li><Tm m="P" />يستنتج شريك مرخّص ويوقّع. ولا يوقّع Hysaab أبدًا.</li>
                </ul>
                <a className="tt-link" href="/audit">شاهد Hysaab Audit <span aria-hidden="true">←</span>{inEnglish}</a>
              </article>
            </div>
            <p className="tt-clients"><span>عملاؤك يبقون عملاءك.</span> <a className="tt-link" href="/ar/trust">اقرأ التزاماتنا تجاه المكاتب <span aria-hidden="true">←</span></a></p>
          </div>
        </section>

        {/* ── H-10 طرق العمل (AR-REVIEW: heading, intro and the first card) ── */}
        <section id="ways" className="tt-sec tt-grid" data-open="0">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-10" right="النطاق يُتفق عليه قبل أن نبدأ">طرق العمل</Wp>
            <h2 className="tt-h2" data-reveal="">فريقك. <span className="tt-hl" data-play="">أو فريقنا إلى جانبه.</span></h2>
            <p className="tt-lead">ابدأ بالعمل الذي يحتاج إلى اهتمام. وسنتفق على النطاق قبل أن نبدأ.</p>
            <div className="tt-ways" data-reveal="stagger-lg">
              <article>
                <p className="tt-who">لفريقك المالي</p>
                <h3>امنح فريقك سبقًا.</h3>
                <p>يُعدّ Hysaab العمل. ويحقق فريقك في الاستثناءات، ويراجع الأرقام، ويُبقي القرارات داخل الشركة.</p>
                <InterestLink interest="Own team">ناقش سير عمل فريقك <span aria-hidden="true">↗</span></InterestLink>
              </article>
              <p className="tt-or" aria-hidden="true">أو</p>
              <article>
                <p className="tt-who">لدعم عملي أكبر</p>
                <h3>ندير العمل معك.</h3>
                <p>يدير محاسبو Oblique قائمة العمل ويجهّزون الإقفال معك، مستخدمين Hysaab كل يوم. للشركات المتوسطة والكبيرة.</p>
                <InterestLink interest="Managed support">ناقش الدعم المُدار <span aria-hidden="true">↗</span></InterestLink>
              </article>
            </div>
          </div>
        </section>

        {/* ── H-11 من أين جاء Hysaab ── */}
        <section id="team" className="tt-sec" data-open="0">
          <span id="origin" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp locale="ar" r="H-11" right="أعدّه من أدّوا العمل بأنفسهم">من أين جاء Hysaab</Wp>
            <div className="tt-origin">
              <div data-reveal="">
                <h2 className="tt-h2">أدّينا العمل <span className="tt-hl" data-play="">قبل أن نبني المنتج.</span></h2>
                <p className="tt-lead">نشأ Hysaab من أعمال الضرائب والمحاسبة التي تؤديها Oblique Consult لشركات الخليج، وهندسته Simpla. بنينا الوكلاء للعمل الذي كنا نؤديه بأيدينا.</p>
              </div>
              <div>
                <div className="tt-orgs">
                  <a href="https://obliqueconsult.com" target="_blank" rel="noopener">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/brand/partners/oblique-consult.svg" alt="Oblique Consult" width={1011} height={386} loading="lazy" />
                    <span><strong>Oblique Consult</strong>ضرائب ومحاسبة واستشارات. دبي. محاسبوها يديرون الخدمة المُدارة.<span className="hw-sr"> (يفتح في تبويب جديد)</span></span>
                  </a>
                  <a href="https://www.simpla.ai" target="_blank" rel="noopener">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/brand/partners/simpla.png" alt="Simpla" width={1024} height={304} loading="lazy" />
                    <span><strong>Simpla</strong>ذكاء اصطناعي للضرائب والمحاسبة. دبي. المهندسون وراء Hysaab.<span className="hw-sr"> (يفتح في تبويب جديد)</span></span>
                  </a>
                </div>
                <div className="tt-people" data-reveal="stagger">
                  {TEAM.map((p) => (
                    <article key={p.name}>
                      <span className="tt-init" aria-hidden="true">{p.initials}<Circle /></span>
                      <div>
                        <h3 lang="en">{p.name}</h3>
                        <p className="tt-role">{p.ar.role} · {p.ar.org}</p>
                        {p.ar.bio && <p>{p.ar.bio}</p>}
                      </div>
                    </article>
                  ))}
                </div>
                <p className="tt-more"><a className="tt-link" href="/ar/about">اقرأ القصة كاملة <span aria-hidden="true">←</span></a></p>
              </div>
            </div>
          </div>
        </section>

        {/* ── H-12 فحص الدفاتر (AR-REVIEW: the sample tape) ── */}
        <section className="tt-sec tt-books" aria-labelledby="tt-books-h" data-open="0">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-12" right="للقراءة فقط">لست مستعدًا لعرض تجريبي؟</Wp>
            <div className="tt-books-g">
              <div data-reveal="">
                <h2 id="tt-books-h">افحص دفاترك <span className="tt-circ" data-play="">مجانًا.<Circle /></span></h2>
                <p className="tt-books-p">اربط Xero أو QuickBooks، وشاهد ما يجده Hysaab في دقيقة تقريبًا. للقراءة فقط. الأداة بالإنجليزية.</p>
                <a className="hw-btn hw-btn--navy m-cta m-magnetic" href="/check"><SwapLabel text="افحص دفاتري" whole /> <span aria-hidden="true">←</span>{inEnglish}</a>
              </div>
              <div className="tt-tape" aria-label="أمثلة على نتائج فحص الدفاتر، بيانات تجريبية">
                <p className="tt-tape-hd">فحص الدفاتر · عينة<br />للقراءة فقط · <bdi>00:58</bdi></p>
                <p><span>فاتورة المورّد نفسها مرتين</span><span>مارس</span><Tm m="T" /></p>
                <p><span>ضريبة 5% على تصدير بنسبة الصفر</span><span>أُوقفت</span><Tm m="✓" /></p>
                <p><span>رواتب فاتت ثم تضاعفت</span><span>يناير–فبراير</span><Tm m="B" /></p>
                <p><span>استحقاق لم يُعكس</span><span>ديسمبر</span><Tm m="T" /></p>
                <p><span>قيد بلا مستند داعم</span><span><bdi>JE-0098</bdi></span><Tm m="?" /></p>
                <p className="tt-tape-ft">النتائج مأخوذة من أمثلة الوكلاء في هذه الصفحة. بيانات تجريبية.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── H-13 احجز عرضًا تجريبيًا ── */}
        <section className="tt-sec tt-grid hw-conversation tt-conversation" id="conversation" data-open="0">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <span id="ledger" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp locale="ar" r="H-13" right="يرد عليك شخص">حوار، لا عرض مبيعات</Wp>
            <div className="hw-conversation-grid" data-reveal="stagger-lg">
              <div>
                <h2 className="tt-h2">احجز <span className="tt-hl" data-play="">عرضًا تجريبيًا.</span></h2>
                <p className="tt-lead">أخبرنا من أنت وما الذي يستغرق وقتًا أطول مما ينبغي.<br />وسنريك أين يناسبك Hysaab.</p>
                <p className="hw-demo-direct">تفضّل أن تختار الموعد بنفسك؟ <a className="tt-link" {...DEMO}>اختر موعدًا في تقويمنا <span aria-hidden="true">↗</span>{newTab}</a></p>
                <div className="hw-agenda">
                  <span className="hw-mono">محادثتك الأولى</span>
                  <ol>
                    <li><span className="hw-mono">01</span> سير عملك الحالي</li>
                    <li><span className="hw-mono">02</span> جولة مركزة في المنتج</li>
                    <li><span className="hw-mono">03</span> الملاءمة والنطاق والخطوات التالية</li>
                  </ol>
                </div>
              </div>
              <EnquiryForm source="Arabic homepage" locale="ar" demo />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter home locale="ar" />
    </div>
  );
}
