/* ── /ar/firms: Hysaab Practice ──────────────────────────────────────
   Arabic twin of app/(en)/firms/page.tsx, rebuilt 2026-09-23 (website
   change plan). Same order: the tax work first, the nine areas of three,
   Hysaab Audit, how the AI is allowed to work, the five questions firms
   ask (DRAFT: owner review, lib/trust.ts) and why we built it. The two
   English-only interactive pieces (the day in the firm and the savings
   calculator) stay on the English page.
   AR-REVIEW: every Arabic string on this page is a new draft for the
   native reviewer (brand/AR-REVIEW.md). */

import { PageShell, PageHero } from "@/components/home/PageShell";
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

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.ar}</span>;

export default function PracticePage() {
  return (
    /* AR-REVIEW: every string below */
    <PageShell locale="ar" band={{ kicker: "احجز عرضًا تجريبيًا", title: "أعد إلى فريقك وقته للحكم المهني.", body: "يفتح Hysaab Practice أبوابه أولًا لمجموعة صغيرة من مكاتب الضرائب والاستشارات. احجز عرضًا تجريبيًا وسيأخذك شخص حقيقي في جولة على إقرار من نوع عملك." }}>
      <PageHero
        locale="ar"
        eyebrow="لمكاتب الضرائب والاستشارات"
        title={<>Hysaab Practice.<br /><span>وكلاء ذكاء اصطناعي لمكاتب الضرائب والاستشارات.</span></>}
        lede={<>يتولى الوكلاء العمل الضريبي: مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات، ومعالجات مستمدة من سوابق مكتبك، ومراجعة نقدية قبل تقديم أي شيء. والقرار لشركائك. ويعمل <a href="/audit" style={{ color: "var(--hw-blush)" }}>Hysaab Audit</a> على ملف التدقيق بجانبه.</>}
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>احجز عرضًا تجريبيًا <span aria-hidden="true">↗</span>{newTab}</a>
        <a className="hw-link hw-link--light" href="#tax-work">ابدأ بالعمل الضريبي</a>
      </PageHero>

      <section id="tax-work">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">العمل الضريبي أولًا</p>
              <h2>كل إقرار مفحوص<br /><span>قبل أن يوقّعه الشريك.</span></h2>
            </div>
            <p>ما يدفع العملاء لمكتبك مقابله هو الحكم المهني على ضرائبهم. يُعدّ Hysaab Practice هذا العمل ويختبره، ليصرف فريقك ساعاته على القرارات.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات.</h3><p>يمر كل إقرار بمئات الفحوص عبر الاكتمال والمعالجة والفحص قبل أن يُطلب من أحد مراجعته. وكل ملاحظة تسمّي القاعدة والرقم المعنيين.</p></article>
            <article><span className="hw-mono">02</span><h3>معالجات من سوابق مكتبك.</h3><p>تُقترح المعالجات الضريبية من سوابق المكتب نفسه أولًا، مع إظهار المصدر، فتكون الإجابة هي التي كان مكتبك سيقدّمها.</p></article>
            <article><span className="hw-mono">03</span><h3>مراجعة نقدية قبل الاعتماد.</h3><p>تتحدى مراجعة نقدية الإقرار قبل أن يعتمده الشريك، وتُصاغ شروح الفروقات وخطابات الإحالة للمراجع. والنسخ المقدَّمة دائمة: التصحيحات تحل محلها ولا تكتب فوقها.</p></article>
          </div>
        </div>
      </section>

      <section className="hw-block--family">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">ويدير المكتب نفسه من حوله</p>
              <h2>تسعة مجالات في المكتب.<br /><span>ونظام واحد تحتها.</span></h2>
            </div>
            <p>العملاء والإقرارات والوقت والفوترة والأشخاص يتشاركون سجلًا واحدًا: خطاب الارتباط الموقَّع ينشئ الالتزامات، والالتزامات تنشئ العمل، والعمل يصبح سجل الوقت والفاتورة.</p>
          </div>
          <div className="hw-cards">
            {AREAS.map((m) => (
              <article key={m.k}>
                <p className="hw-eyebrow">{m.k}</p>
                <h3>{m.h}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>{m.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">ما يحل محله</span>
            <p>أداة إدارة المكتب، والبريد المشترك، وجداول المواعيد، وبوابة المستندات، ونظام إدارة العملاء، وتطبيق التوقيع الإلكتروني، وتطبيق سجلات الوقت، وملف الموارد البشرية.</p>
          </div>
        </div>
      </section>

      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Hysaab Audit</p>
              <h2>إن كنت توقّع آراء التدقيق،<br /><span>فالملف يعمل هنا أيضًا.</span></h2>
            </div>
            <p>بُني Hysaab Audit على العملاء أنفسهم وغرفة الملفات نفسها والقاعدة نفسها: المحركات تحسب، وشخص مرخّص يستنتج. اشترِه وحده أو مع Hysaab Practice.</p>
          </div>
          <div className="hw-cards">
            <article>
              <p className="hw-eyebrow">الاختبار</p>
              <h3>كل قيد، لا خمسة وعشرون</h3>
              <p>يقيّم اختبار قيود اليومية المجتمع كله وفق ثلاثين معيارًا من معيار ISA 240. وتُصمَّم عينات الوحدة النقدية وتُختار وتُقيَّم حتى الحد الأعلى للأخطاء.</p>
            </article>
            <article>
              <p className="hw-eyebrow">الملف</p>
              <h3>يُكتب مع انتهاء العمل</h3>
              <p>أوراق عمل بالغرض والمصدر والإجراء والنتائج والاستنتاج، مع إحالات متبادلة. يوقّع المعدّ ثم المراجع ثم الشريك بالترتيب، وتوقيع الشريك يقفل النسخة.</p>
            </article>
            <article>
              <p className="hw-eyebrow">الاستقلالية</p>
              <h3>جدار فاصل، لا مجرد سياسة</h3>
              <p>سجلات التدقيق ملك للمكتب؛ ويمنح العميل صلاحية قراءة لفترة محددة قابلة للإلغاء. والاختبار يجري على نسخة ثابتة مجزّأة، لا على الدفتر الحي. ولا يوقّع Hysaab أي رأي أبدًا.</p>
            </article>
          </div>
          <div className="hw-note" style={{ borderColor: "#3e6356" }}>
            <span className="hw-mono">للمزيد</span>
            <p><a href="/audit">شاهد Hysaab Audit شاشةً بشاشة (بالإنجليزية) <span aria-hidden="true">←</span></a></p>
          </div>
        </div>
      </section>

      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">كيف يُسمح للذكاء الاصطناعي بالعمل</p>
              <h2>النموذج يقترح. والشيفرة تحسب.<br /><span>وشخص مسمّى يؤكد.</span></h2>
            </div>
          </div>
          <div className="hw-cards">
            <article className="is-navy">
              <p className="hw-eyebrow">مقترحات لا أفعال</p>
              <h3>كل اقتراح بطاقة</h3>
              <p>المهام وبنود سجلات الوقت والالتزامات والمعالجات الضريبية تصل مقترحات. ولا يُنشأ شيء حتى يقبله أحد.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">الأشخاص يرسلون</p>
              <h3>لا بريد يخرج من تلقاء نفسه</h3>
              <p>الردود تُصاغ ولا تُرسل تلقائيًا. والإرسال التلقائي إلى العميل معطّل افتراضيًا، وحين يُفعَّل ينتظر 24 ساعة.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">المال محسوب بدقة</p>
              <h3>الشيفرة تتولى الحساب</h3>
              <p>الأتعاب والأعمال قيد التنفيذ والتحصيل وكل رقم ضريبي تُحسب بالشيفرة. والذكاء الاصطناعي يكتب الكلمات حول الأرقام، لا الأرقام.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">مساءلة بالتصميم</p>
              <h3>سجل لقرارات الذكاء الاصطناعي</h3>
              <p>كل قرار يتخذه الذكاء الاصطناعي يُسجَّل مع موافقة الشخص أو عدمها، وتقارير الحوكمة تُظهر للعملاء والجهات الرقابية كيف يُستخدم.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">الحكم يبقى بشريًا</p>
              <h3>أشياء لا يلمسها الذكاء الاصطناعي</h3>
              <p>تقييمات الأداء بشرية فقط. وقواعد الأتمتة معطّلة عند التسليم. والإقرارات والفواتير والرواتب تحتاج إلى معدّ ومراجع.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">مبني ليُوثق به</p>
              <h3>الأمان من أول جدول</h3>
              <p>أمان على مستوى الصفوف في كل جدول، ووصول بحسب فريق الارتباط، وتسجيل دخول ثنائي إلزامي، وروابط تنتهي صلاحيتها، وفحص المرفقات من البرمجيات الخبيثة، ونسخ احتياطية يومية.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="questions">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">خمسة أسئلة تطرحها المكاتب</p>
              <h2>عملاؤك يبقون عملاءك.<br /><span>وهنا نرسم الحد.</span></h2>
            </div>
            <p>إجابات مباشرة عن الحدود التجارية. والالتزامات كاملة، ومنها كيف نرعى بياناتك، في <a href="/ar/trust">صفحة الثقة</a>.</p>
          </div>
          <div className="hw-faq">
            {FIRM_QUESTIONS.ar.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="hw-faq-a"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">للمزيد</span>
            <p><a href="/ar/trust">التزاماتنا تجاه المكاتب المهنية والفرق المالية</a></p>
          </div>
        </div>
      </section>

      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">لماذا بنيناه</p>
              <h2>بُني داخل مكتب ضرائب خليجي عامل.</h2>
            </div>
            <div className="hw-prose">
              <p>بدأ Hysaab Practice نظامًا يعمل عليه مكتبنا الاستشاري نفسه. كل شاشة فيه وُجدت لأن شريكًا أو مديرًا أو موظفًا مبتدئًا احتاج إليها في موعد حقيقي، لعملاء حقيقيين والهيئة الاتحادية للضرائب في الطرف الآخر.</p>
              <p>نفتحه لمجموعة صغيرة من المكاتب المؤسِّسة في الإمارات والسعودية. تشارك المكاتب المؤسِّسة في تشكيل ما يأتي بعد ذلك، وتحتفظ بأسعار المؤسسين ما دامت معنا.</p>
            </div>
          </div>
          <div className="hw-note">
            <span className="hw-mono">وعدنا</span>
            <p>سنريك ما يعمل اليوم، ونسمّي ما لا يعمل، ولن ندع الذكاء الاصطناعي يتخذ قرارًا هو من حق فريقك.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
