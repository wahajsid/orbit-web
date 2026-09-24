/* ── /ar/integrations ────────────────────────────────────────────────
   الترجمة العربية لصفحة /integrations الحالية (PageShell + عدة hw-* في
   app/hysaab-home.css). الأنظمة المحاسبية الستة وطريقة اتصال كل منها
   وما يتبادله منقولة من الصفحة الإنجليزية نظامًا بنظام: لم يُضف شيء
   ولم تُوسَّع أي قدرة. الصفحة الإنجليزية لا تعطي حالة (متاح / قيد
   العمل / مخطط) لأي نظام، فلا تظهر هنا. أسماء الأنظمة بالحروف
   اللاتينية. */

import type { Metadata } from "next";
import { PageShell, PageHero, Shot } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

export const metadata: Metadata = {
  title: "تكاملات Hysaab: Zoho Books وXero وQuickBooks وOdoo",
  description:
    "اربط Zoho Books أو Xero أو QuickBooks أو Odoo أو Wafeq أو ERPNext مرة واحدة. Hysaab يرحّل القيود المعتمدة إلى دفترك، ويبقى دفترك هو السجل.",
  alternates: langAlternates("/integrations"),
};

const LEDGERS: { name: string; how: string; detail: string; extras: string[] }[] = [
  {
    name: "Zoho Books", how: "موافقة OAuth",
    detail: "فوّض مرة واحدة على شاشة موافقة Zoho نفسها، بلا مفاتيح تنسخها. يكتشف Hysaab مؤسستك، ويربط دليل حساباتك، ويرحّل القيود المعتمدة إليه.",
    extras: ["مزامنة القيود في الاتجاهين", "ربط دليل الحسابات مع المراجعة", "مراعٍ لمركز البيانات: يعمل مع كل منطقة من مناطق Zoho"],
  },
  {
    name: "Xero", how: "موافقة OAuth",
    detail: "تدفق موافقة Xero القياسي. يقرأ Hysaab دفتر الأستاذ لأغراض المطابقة ويمكنه استيراد سجلك التاريخي ليكون للتقارير سياق من البداية.",
    extras: ["مزامنة القيود في الاتجاهين", "استيراد السجل التاريخي، معلَّمًا بوضوح ولا يُعاد تصديره", "مزامنة المرفقات بوصفها أدلة"],
  },
  {
    name: "QuickBooks", how: "OAuth · تدفق Intuit",
    detail: "اتصل عبر تفويض Intuit الرسمي. يرحّل Hysaab القيود المعتمدة إلى شركتك في QuickBooks ويبقي ربط الحسابات تحت مراجعتك.",
    extras: ["مزامنة القيود في الاتجاهين", "اتصال مراعٍ لنطاق الشركة (realm)", "بوابة الحسابات المربوطة: تنتظر القيود حتى تُربط الحسابات"],
  },
  {
    name: "Odoo", how: "مفتاح API · بإرشاد",
    detail: "لوحة خطوة بخطوة تريك أين تنشئ مفتاح API داخل نسخة Odoo الخاصة بك. يصادق Hysaab بالمفتاح قبل تخزين أي شيء، فلا يتحول مفتاح مكتوب خطأً إلى اتصال.",
    extras: ["يعمل مع Odoo المستضاف ذاتيًا ومع Odoo.sh", "استيراد السجل التاريخي", "مزامنة المرفقات"],
  },
  {
    name: "Wafeq", how: "مفتاح API · بإرشاد",
    detail: "دفتر أستاذ مبني للخليج. أنشئ مفتاحًا في Wafeq والصقه مرة واحدة. يتحقق Hysaab منه، ثم يرحّل القيود المعتمدة.",
    extras: ["ترحيل القيود", "الدرهم والريال مدعومان أصلًا", "الإلغاء في أي وقت من جهة Wafeq"],
  },
  {
    name: "ERPNext", how: "مفتاح API وسر · بإرشاد",
    detail: "وجّه Hysaab إلى نسخة ERPNext الخاصة بك بزوج مفاتيح API. يُختبر الاتصال قبل حفظه، ويمكن أن يدخل سجل دفتر أستاذك العام بوصفه بيانات تاريخية معلَّمة بوضوح.",
    extras: ["مزامنة القيود في الاتجاهين", "استيراد السجل التاريخي", "يناسب النسخ المستضافة ذاتيًا"],
  },
];

export default function IntegrationsPage() {
  return (
    <PageShell locale="ar" band={{ title: "أخبرنا بما تستخدمه اليوم.", body: "أحضر النظام المحاسبي الذي تستخدمه وعملية واحدة تستغرق وقتًا أطول مما ينبغي. سنمرّ بها معك داخل مساحة العمل، ثم نؤكد النطاق والرسوم قبل أي التزام." }}>
      <PageHero
        locale="ar"
        eyebrow="التكاملات"
        title={<>دفتر أستاذك<br /><span>يبقى دفتر الأستاذ.</span></>}
        lede="Hysaab لا يحل محل نظامك المحاسبي، بل ينجز العمل داخله. اربط دفتر أستاذ واحدًا، واحدًا في كل مرة ليكون هناك مصدر واحد للحقيقة، أو لا تربط شيئًا ودع Hysaab يمسك الدفاتر بنفسه."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>احجز عرضًا تجريبيًا <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB.ar}</span></a>
        <a className="hw-link hw-link--light" href="/ar/how-it-works"><span className="hw-play" aria-hidden="true">▷</span> شاهد كيف يعمل</a>
      </PageHero>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">الأنظمة المحاسبية</p>
              <h2>ستة دفاتر أستاذ.<br /><span>واحد متصل في كل مرة.</span></h2>
            </div>
            <p>تبيّن كل بطاقة كيف يُنشأ الاتصال وما الذي يمر عبره. وما هو مذكور لنظام لا يُفهم ضمنًا للأنظمة الأخرى.</p>
          </div>
          <div className="hw-cards">
            {LEDGERS.map((l) => (
              <article key={l.name}>
                <p className="hw-eyebrow">{l.how}</p>
                <h3>{l.name}</h3>
                <p>{l.detail}</p>
                <ul className="hw-ticks">{l.extras.map((x) => <li key={x}>{x}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">كيف يعمل الاتصال</p>
              <h2>اتصل مرة واحدة.<br /><span>واعتمد ما يُرحَّل.</span></h2>
            </div>
            <p>يمنح الاتصال Hysaab مكانًا يرحّل إليه العمل المُعدّ. أما ما يُرحَّل فعلًا فتقرره قواعد الاعتماد لديك.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>اتصل مرة واحدة.</h3><p>فوّض على شاشة موافقة دفتر أستاذك نفسها، أو أنشئ مفتاح API بالخطوات المرشدة. يُتحقق من الاتصال قبل تخزين أي شيء.</p></article>
            <article><span className="hw-mono">02</span><h3>اتفق على قواعد الاعتماد.</h3><p>أنت تحدد الحدود. كل ما يتجاوز حد قيمة القيد الذي حددته، وكل ترميز منخفض الثقة، وكل تكرار مشتبه به ينتظر شخصًا. ويبقى ربط الحسابات تحت مراجعتك.</p></article>
            <article><span className="hw-mono">03</span><h3>يرحّل Hysaab إلى دفتر أستاذك.</h3><p>تُرحَّل القيود المعتمدة إلى النظام المحاسبي الذي تستخدمه أصلًا، مع بقاء تعليقاتها وأدلتها في Hysaab. ويبقى دفتر أستاذك نظام السجل.</p></article>
          </div>
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">المستندات الواردة</p>
              <h2>لا حاجة إلى دفتر أستاذ<br /><span>للبدء.</span></h2>
            </div>
            <p>الشاشة أدناه لقطة من مساحة عمل Hysaab وهي تعمل على مجموعة بياناتها التجريبية. اخترها لعرضها كاملة.</p>
          </div>
          <div className="hw-feature">
            <div className="hw-feature-copy">
              <p className="hw-eyebrow">واتساب وتيليغرام والبريد الإلكتروني</p>
              <h3>قناة موثّقة هي كل ما يحتاجه Hysaab.</h3>
              <p>أرسل صورة عبر واتساب، أو أعد توجيه بريد إلكتروني، أو ضع ملف PDF على تيليغرام. كل مستند يُقرأ ويُرمَّز ويُختبر ضريبيًا ويُحفظ مع أدلته، سواء كان هناك دفتر أستاذ متصل أم لا.</p>
              <ul className="hw-ticks">
                <li>كل مستند محفوظ مع القناة التي وصل عبرها</li>
                <li>التكرارات تُحجز، ولا تُقيَّد مرتين</li>
                <li>كل ما هو غير مؤكد يصل إلى شخص مع سببه</li>
              </ul>
            </div>
            <Shot
              file="01-app-intake.png"
              title="المستندات"
              alt="سجل الاستقبال في Hysaab: مستندات وصلت عبر واتساب والبريد الإلكتروني والتغذية البنكية، لكل منها فئة ونتيجة. عنوان بريد إلكتروني واحد محجوب."
              caption="سجل الاستقبال، بيانات تجريبية: كل مستند مع فئته وقناته ونتيجته."
              locale="ar"
            />
          </div>
          <div className="hw-note">
            <span className="hw-mono">نظامك غير موجود؟</span>
            <p>
              إن لم يكن نظامك المحاسبي ضمن الستة أعلاه،{" "}
              <a href="mailto:info@hysaab.ai?subject=Integration%20request" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>اطلب تكاملًا</a>{" "}
              وأخبرنا بما تستخدمه. لا نعد بموعد قبل تحديد نطاق العمل.
            </p>
          </div>
        </div>
      </section>

      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">حدود الاتصال</p>
              <h2>نظامك.<br /><span>ومفتاحك.</span></h2>
            </div>
            <p>الاتصال شيء تمنحه ويمكنك سحبه. ولا ينقل دفاترك خارج النظام الذي اخترته.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>دفتر أستاذ واحد في كل مرة.</h3><p>يتصل Hysaab بنظام محاسبي واحد لكل مجموعة دفاتر، فيكون هناك مصدر واحد للحقيقة لا مصدران يتباعدان.</p></article>
            <article><span className="hw-mono">02</span><h3>بيانات الاعتماد تبقى على الخادم.</h3><p>بيانات اعتماد دفتر الأستاذ تُخزَّن على الخادم، مشفّرة، ولا تُرسل إلى المتصفح.</p></article>
            <article><span className="hw-mono">03</span><h3>ألغِ عندما تشاء.</h3><p>يمكن إلغاء اتصال دفتر أستاذك في أي وقت، من Hysaab أو من جهة دفتر الأستاذ.</p></article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
