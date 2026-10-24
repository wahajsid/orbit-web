/* ── /ar/firms: Hysaab Practice ──────────────────────────────────────
   Arabic twin of app/(en)/firms/page.tsx, rebuilt 2026-10-25 in the
   homepage's Tick & Tie language: W/P strips, the highlighter headline, a
   work film in the hero (WorkFilm, locale="ar") and the demo form at the
   end. Same order as the English page: the tax work first, a day in the
   firm (ServicesDay), the nine areas, the savings calculator (SavingsCalc),
   the rules for the AI, the five questions firms ask (lib/trust.ts) with
   Hysaab Audit, and why we built it. Every Arabic string carried over from
   the September page is unchanged; brand and system names stay Latin and
   digits Western.
   AR-REVIEW: every Arabic string on this page is a draft for the native
   reviewer (brand/AR-REVIEW.md); the strings new on 2026-10-25 are the
   hero, the film and the section strips. */

import { SiteHeader } from "@/components/home/HomeHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { Wp, Tm } from "@/components/home/tt/Wp";
import { WorkFilm } from "@/components/home/WorkFilm";
import { ServicesDay } from "@/components/hysaab/ServicesDay";
import { SavingsCalc } from "@/components/hysaab/SavingsCalc";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { FIRM_QUESTIONS } from "@/lib/trust";

/* AR-REVIEW */
export const metadata = {
  title: "Hysaab Practice: وكلاء ذكاء اصطناعي لمكاتب الضرائب والاستشارات",
  description:
    "Hysaab Practice يدير العمل الضريبي لمكاتب الضرائب والاستشارات: مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات، ومعالجات من سوابق مكتبك، ومراجعة قبل التقديم.",
  alternates: langAlternates("/firms"),
};

/* AR-REVIEW: the nine areas, three items each. */
const AREAS: { k: string; h: string; items: React.ReactNode[] }[] = [
  { k: "الإقرارات", h: "منصة عمل لكل إقرار", items: [
    <><strong>مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات</strong> عبر الاكتمال والمعالجة والفحص.</>,
    <><strong>معالجات ضريبية مقترحة</strong> من سوابق المكتب نفسه أولًا.</>,
    <><strong>مراجعة نقدية</strong> قبل الاعتماد؛ والنسخ المقدَّمة دائمة.</>,
  ] },
  { k: "المعرفة", h: "ذاكرة المكتب", items: [
    <><strong>اسأل</strong> فتأتيك الإجابة من مكتبتك ومواقفك، مع مصادرها.</>,
    <><strong>مواقف المكتب</strong> تُصاغ وتُنشر وتُسحب بموافقة.</>,
    <><strong>أكاديمية</strong> باختبارات وحاسبات محددة لضريبة القيمة المضافة وضريبة الشركات والغرامات والاستقطاع.</>,
  ] },
  { k: "العملاء", h: "كل عميل في ملف واحد", items: [
    <><strong>التسجيل واعرف عميلك</strong> مع قراءة الرخص التجارية وشهادات ضريبة القيمة المضافة في الملف.</>,
    <><strong>غرفة بيانات وبوابة للعميل</strong> بروابط رفع آمنة تنتهي صلاحيتها.</>,
    <><strong>مؤشر صحة</strong> من جودة الإقرارات والاستجابة والتفاعل والمخاطر.</>,
  ] },
  { k: "اليوم", h: "يومي والبريد والمهام", items: [
    <><strong>يومي</strong> لا يعرض إلا ما يحتاج إليك: المهام المتأخرة والاعتمادات والمواعيد.</>,
    <><strong>بريد ذكي</strong> يربط كل رسالة بعميل، ويحفظ المرفقات، ويصوغ الرد.</>,
    <><strong>إشعارات الهيئات الضريبية</strong> من الهيئة الاتحادية للضرائب أو ZATCA أو وزارة المالية تتحول إلى مهمة عاجلة.</>,
  ] },
  { k: "الاجتماعات", h: "قبلها وأثناءها وبعدها", items: [
    <><strong>موجز تحضيري</strong>: صفحة واحدة عن العميل والعمل المفتوح والمراسلات الأخيرة.</>,
    <><strong>من الملاحظات إلى الإجراءات</strong>: القرارات وبنود العمل مع أصحابها وتواريخها.</>,
    <><strong>مهام مقترحة</strong> تدخل القائمة؛ ولا يُنشأ شيء حتى تؤكده.</>,
  ] },
  { k: "النمو", h: "من الفرصة إلى الخطاب الموقَّع", items: [
    <><strong>مسار الفرص</strong> من العميل المحتمل إلى الفوز، مع فرص البيع الإضافي عبر عملائك.</>,
    <><strong>العروض وخطابات الارتباط</strong> تُصاغ من النطاق الذي تختاره.</>,
    <><strong>توقيع إلكتروني مدمج</strong> مختوم بشهادة تدقيق SHA-256.</>,
  ] },
  { k: "الوقت والفوترة", h: "ساعات تتحول إلى فواتير", items: [
    <><strong>سجلات وقت يصوغها الذكاء الاصطناعي</strong> من عمل اليوم؛ قد يخفض التقدير ولا يرفعه أبدًا.</>,
    <><strong>الأعمال قيد التنفيذ والفواتير والدفعات المقدمة</strong> باعتماد من معدّ ومراجع.</>,
    <><strong>المصروفات</strong> مع قراءة الإيصالات تلقائيًا.</>,
  ] },
  { k: "المكتب", h: "أدر المكتب بالأرقام", items: [
    <><strong>التحصيل والسعر الفعلي والاستغلال</strong> لكل شخص ولكل عميل.</>,
    <><strong>الطاقة الاستيعابية</strong> لثمانية أسابيع مقبلة: من المتاح، ومن المثقل.</>,
    <><strong>موجز المكتب</strong> وملخص أسبوعي للشركاء.</>,
  ] },
  { k: "الأشخاص", h: "الموارد البشرية بلا جداول", items: [
    <><strong>الإجازات والخطابات والمستندات</strong> بخدمة ذاتية.</>,
    <><strong>تقييمات الأداء</strong> حيث لا يمنح التقدير إلا شخص.</>,
    <><strong>الرواتب</strong> باعتماد، ولا يراها إلا المالكون.</>,
  ] },
];

/* AR-REVIEW: the rules for the AI */
const RULES: [string, string, string][] = [
  ["مقترحات لا أفعال", "كل اقتراح بطاقة", "المهام وبنود سجلات الوقت والالتزامات والمعالجات الضريبية تصل مقترحات. ولا يُنشأ شيء حتى يقبله أحد."],
  ["الأشخاص يرسلون", "لا بريد يخرج من تلقاء نفسه", "الردود تُصاغ ولا تُرسل تلقائيًا. والإرسال التلقائي إلى العميل معطّل افتراضيًا، وحين يُفعَّل ينتظر 24 ساعة."],
  ["المال محسوب بدقة", "الشيفرة تتولى الحساب", "الأتعاب والأعمال قيد التنفيذ والتحصيل وكل رقم ضريبي تُحسب بالشيفرة. والذكاء الاصطناعي يكتب الكلمات حول الأرقام، لا الأرقام."],
  ["مساءلة بالتصميم", "سجل لقرارات الذكاء الاصطناعي", "كل قرار يتخذه الذكاء الاصطناعي يُسجَّل مع موافقة الشخص أو عدمها، وتقارير الحوكمة تُظهر للعملاء والجهات الرقابية كيف يُستخدم."],
  ["الحكم يبقى بشريًا", "أشياء لا يلمسها الذكاء الاصطناعي", "تقييمات الأداء بشرية فقط. وقواعد الأتمتة معطّلة عند التسليم. والإقرارات والفواتير والرواتب تحتاج إلى معدّ ومراجع."],
  ["مبني ليُوثق به", "الأمان من أول جدول", "أمان على مستوى الصفوف في كل جدول، ووصول بحسب فريق الارتباط، وتسجيل دخول ثنائي إلزامي، وروابط تنتهي صلاحيتها، وفحص المرفقات من البرمجيات الخبيثة، ونسخ احتياطية يومية."],
];

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.ar}</span>;
const inEnglish = <span className="hw-sr"> (بالإنجليزية)</span>;

export default function PracticePage() {
  return (
    <div className="hw-page tt-page" id="top">
      <a href="#main" className="hw-skip">تخطَّ إلى المحتوى</a>
      <span data-motion-page="full" hidden />
      <SiteHeader locale="ar" />
      <main id="main">
        {/* ── P-1 الوعد، وإقرار يُفحص (AR-REVIEW: the strip, headline and the film) ── */}
        <section className="tt-sec tt-grid tt-hero tt-hero3">
          <div className="hw-wrap">
            <Wp locale="ar" r="P-1" right={<>أعدّه <b>الوكلاء</b> · وقرره <b>شركاؤك</b></>}>Hysaab Practice · لمكاتب الضرائب والاستشارات</Wp>
            <div className="tt-hero2-g tt-hero3-g">
              <div className="tt-hero2-copy">
                <h1>كل إقرار مفحوص <span className="tt-hl">قبل أن يوقّعه الشريك.</span></h1>
                <p className="tt-hero-sub">يتولى الوكلاء العمل الضريبي: مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات، ومعالجات مستمدة من سوابق مكتبك، ومراجعة نقدية قبل تقديم أي شيء. والقرار لشركائك، ويدير المكتب نفسه من حول العمل.</p>
                <div className="tt-acts tt-hero2-acts">
                  <a className="hw-btn hw-btn--navy m-cta" {...DEMO}>احجز عرضًا تجريبيًا <span aria-hidden="true">↗</span>{newTab}</a>
                  <a className="tt-link" href="#day">شاهد يومًا في المكتب <span aria-hidden="true">↓</span></a>
                </div>
              </div>
              <WorkFilm
                locale="ar"
                bar="مكتبك · إقرار ضريبة القيمة المضافة للربع الثالث · Al Noor Trading" tag="توضيحي" title="إقرار الربع الثالث"
                sr="رسم توضيحي لإقرار ضريبة القيمة المضافة في Hysaab Practice: تُقرأ كشوف العميل، وتُجرى 144 فحصًا، وتُقترح معالجة من سابقة المكتب، وتتحدى مراجعة نقدية الإقرار، ويُصاغ الشرح، فيصبح جاهزًا لاعتماد الشريك."
                cap="عميل وأرقام توضيحية · الفحوص هي فحوص المنتج نفسه"
                rows={[
                  { label: "البيانات", task: "قراءة كشوف المبيعات والمشتريات", done: "1,284 سطرًا · مطابقة للدفاتر" },
                  { label: "الفحوص", task: "144 فحصًا لضريبة القيمة المضافة", done: "141 ناجحة · 3 ملاحظات، لكل منها قاعدتها" },
                  { label: "المعالجة", task: "معالجة مقترحة من سابقة", done: "موقف المكتب FP-12 · ضريبة مدخلات الضيافة محجوبة" },
                  { label: "المراجعة", task: "مراجعة نقدية للإقرار", done: "أجاب المعدّ عن اعتراضين" },
                  { label: "الصياغة", task: "الشرح وخطاب الإحالة", done: "صيغا للمراجع" },
                ]}
                final={{ k: "جاهز للاعتماد", h: "فُحص الإقرار", s: "حُسمت الملاحظات · والنسخة المقدَّمة ستكون دائمة", sign: "مطلوب اعتماد الشريك" }}
              />
            </div>
          </div>
        </section>

        {/* ── P-2 العمل الضريبي أولًا ── */}
        <section className="tt-sec" id="tax-work" aria-labelledby="pr-tax-h">
          <div className="hw-wrap">
            <Wp locale="ar" r="P-2" right="العمل الذي يدفع العملاء مقابله">العمل الضريبي أولًا</Wp>
            <h2 className="tt-h2" id="pr-tax-h" data-reveal="">ليصرف فريقك ساعاته <span className="tt-hl" data-play="">على القرارات.</span></h2>
            <p className="tt-lead">ما يدفع العملاء لمكتبك مقابله هو الحكم المهني على ضرائبهم. يُعدّ Hysaab Practice هذا العمل ويختبره أولًا.</p>
            <ol className="tt-steps tt-steps3" data-reveal="stagger-lg">
              <li><span className="tt-step-n">01</span><div><h3>مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات.</h3><p>يمر كل إقرار بمئات الفحوص عبر الاكتمال والمعالجة والفحص قبل أن يُطلب من أحد مراجعته. وكل ملاحظة تسمّي القاعدة والرقم المعنيين.</p></div></li>
              <li><span className="tt-step-n">02</span><div><h3>معالجات من سوابق مكتبك.</h3><p>تُقترح المعالجات الضريبية من سوابق المكتب نفسه أولًا، مع إظهار المصدر، فتكون الإجابة هي التي كان مكتبك سيقدّمها.</p></div></li>
              <li><span className="tt-step-n">03</span><div><h3>مراجعة نقدية قبل الاعتماد.</h3><p>تتحدى مراجعة نقدية الإقرار قبل أن يعتمده الشريك، وتُصاغ شروح الفروقات وخطابات الإحالة للمراجع. والنسخ المقدَّمة دائمة: التصحيحات تحل محلها ولا تكتب فوقها.</p></div></li>
            </ol>
          </div>
        </section>

        {/* ── P-3 يوم في المكتب ── */}
        <section className="tt-sec tt-grid" id="day" aria-labelledby="pr-day-h">
          <div className="hw-wrap">
            <Wp locale="ar" r="P-3" right="مكتب وعملاء توضيحيون">يوم في المكتب</Wp>
            <h2 className="tt-h2" id="pr-day-h" data-reveal="">يوم ثلاثاء واحد. <span className="tt-hl" data-play="">ست لحظات كانت الأعمال الإدارية تلتهمها.</span></h2>
            <p className="tt-lead">اضغط الأزرار في النافذة: لا يُحتسب شيء يقترحه الذكاء الاصطناعي حتى يؤكده شخص.</p>
            <div className="tt-embed"><ServicesDay locale="ar" /></div>
          </div>
        </section>

        {/* ── P-4 ويدير المكتب نفسه من حوله ── */}
        <section className="tt-sec" aria-labelledby="pr-areas-h">
          <div className="hw-wrap">
            <Wp locale="ar" r="P-4" right="سجل واحد تحتها">ويدير المكتب نفسه من حوله</Wp>
            <h2 className="tt-h2" id="pr-areas-h" data-reveal="">تسعة مجالات في المكتب. <span className="tt-hl" data-play="">ونظام واحد تحتها.</span></h2>
            <p className="tt-lead">العملاء والإقرارات والوقت والفوترة والأشخاص يتشاركون سجلًا واحدًا: خطاب الارتباط الموقَّع ينشئ الالتزامات، والالتزامات تنشئ العمل، والعمل يصبح سجل الوقت والفاتورة.</p>
            <div className="tt-areas" data-reveal="stagger-lg">
              {AREAS.map((a) => (
                <article key={a.k}>
                  <p className="tt-who">{a.k}</p>
                  <h3>{a.h}</h3>
                  <ul>{a.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
                </article>
              ))}
            </div>
            <p className="tt-promise"><Tm m="T" /> ما يحل محله: أداة إدارة المكتب، والبريد المشترك، وجداول المواعيد، وبوابة المستندات، ونظام إدارة العملاء، وتطبيق التوقيع الإلكتروني، وتطبيق سجلات الوقت، وملف الموارد البشرية.</p>
          </div>
        </section>

        {/* ── P-5 الوقت والتكلفة ── */}
        <section className="tt-sec tt-grid" aria-labelledby="pr-calc-h">
          <div className="hw-wrap">
            <Wp locale="ar" r="P-5" right="كل افتراض معروض">الوقت والتكلفة</Wp>
            <h2 className="tt-h2" id="pr-calc-h" data-reveal="">كم تكلّف الأعمال الإدارية <span className="tt-hl" data-play="">مكتبك.</span></h2>
            <p className="tt-lead">أدخل فريقك وتكلفة الساعة لديك. كل افتراض معروض على الصفحة، فالرقم رقمك لتناقشه.</p>
            <div className="tt-embed"><SavingsCalc locale="ar" /></div>
          </div>
        </section>

        {/* ── P-6 قواعد الذكاء الاصطناعي ── */}
        <section className="tt-sec tt-memory" aria-labelledby="pr-rules-h">
          <div className="hw-wrap">
            <Wp locale="ar" r="P-6" right="كيف يُسمح للذكاء الاصطناعي بالعمل">القواعد</Wp>
            <h2 className="tt-h2" id="pr-rules-h" data-reveal="">النموذج يقترح. والشيفرة تحسب. <span className="tt-hl" data-play="">وشخص مسمّى يؤكد.</span></h2>
            <div className="tt-rules" data-reveal="stagger-lg">
              {RULES.map(([k, h, p]) => <article key={k}><p className="tt-who">{k}</p><h3>{h}</h3><p>{p}</p></article>)}
            </div>
          </div>
        </section>

        {/* ── P-7 خمسة أسئلة، و Hysaab Audit ── */}
        <section className="tt-sec" id="questions" aria-labelledby="pr-q-h">
          <div className="hw-wrap">
            <Wp locale="ar" r="P-7" right="إجابات مباشرة">خمسة أسئلة تطرحها المكاتب</Wp>
            <h2 className="tt-h2" id="pr-q-h" data-reveal="">عملاؤك يبقون عملاءك. <span className="tt-hl" data-play="">وهنا نرسم الحد.</span></h2>
            <div className="hw-faq tt-faq">
              {FIRM_QUESTIONS.ar.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="hw-faq-a"><p>{f.a}</p></div>
                </details>
              ))}
            </div>
            <div className="tt-firmrow tt-firmrow--2">
              <a href="/audit"><span className="tt-prod-st"><span>إن كنت توقّع آراء التدقيق</span><b>Hysaab Audit</b></span><strong>فالملف يعمل هنا أيضًا</strong><span>يقيّم اختبار قيود اليومية المجتمع كله وفق ثلاثين معيارًا من معيار ISA 240، وتُصمَّم العينات وتُقيَّم، وتُكتب أوراق العمل مع انتهاء العمل. ولا يوقّع Hysaab أي رأي أبدًا.{inEnglish}</span></a>
              <a href="/ar/trust"><span className="tt-prod-st"><span>للمزيد</span><b>الثقة</b></span><strong>التزاماتنا تجاه المكاتب المهنية</strong><span>كيف نرعى بياناتك، والحدود التجارية التي نلتزم بها.</span></a>
            </div>
          </div>
        </section>

        {/* ── P-8 لماذا بنيناه، والدعوة ── */}
        <section className="tt-sec tt-grid hw-conversation tt-conversation" id="conversation">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp locale="ar" r="P-8" right="يرد عليك شخص">بُني داخل مكتب ضرائب خليجي عامل</Wp>
            <div className="hw-conversation-grid" data-reveal="stagger-lg">
              <div>
                <h2 className="tt-h2">أعد إلى فريقك <span className="tt-hl" data-play="">وقته للحكم المهني.</span></h2>
                <p className="tt-lead">بدأ Hysaab Practice نظامًا يعمل عليه مكتبنا الاستشاري نفسه. كل شاشة فيه وُجدت لأن شريكًا أو مديرًا أو موظفًا مبتدئًا احتاج إليها في موعد حقيقي، لعملاء حقيقيين والهيئة الاتحادية للضرائب في الطرف الآخر. نفتحه لمجموعة صغيرة من المكاتب المؤسِّسة في الإمارات والسعودية.</p>
                <p className="tt-promise"><Tm m="P" /> سنريك ما يعمل اليوم، ونسمّي ما لا يعمل، ولن ندع الذكاء الاصطناعي يتخذ قرارًا هو من حق فريقك.</p>
                <p className="hw-demo-direct">تفضّل أن تختار الموعد بنفسك؟ <a className="tt-link" {...DEMO}>اختر موعدًا في تقويمنا <span aria-hidden="true">↗</span>{newTab}</a></p>
              </div>
              <EnquiryForm source="Arabic Practice page" locale="ar" demo />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale="ar" />
    </div>
  );
}
