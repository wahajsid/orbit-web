/* ── /ar/accounting: Hysaab Finance ──────────────────────────────────
   Arabic twin of app/(en)/accounting/page.tsx, rebuilt 2026-09-23
   (website change plan): /ar/product is merged in and redirects here
   (301). Six questions, six sections. The six modules reuse the
   translations from the old /ar/product page; everything else is new.
   AR-REVIEW: strings marked below are new drafts for the native
   reviewer (brand/AR-REVIEW.md). */

import Image from "next/image";
import { PageShell, PageHero, Shot } from "@/components/home/PageShell";
import { Terminal } from "@/components/Terminal";
import { TrustLadder } from "@/components/home/TrustLadder";
import { AgentsAct } from "@/components/home/AgentsAct";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

export const revalidate = 60;

/* AR-REVIEW */
export const metadata = {
  title: "Hysaab Finance: وكلاء ذكاء اصطناعي للمحاسبة في الإمارات والسعودية",
  description:
    "وكلاء ذكاء اصطناعي للمحاسبة والتقارير: الذمم الدائنة والمدينة ودفتر الأستاذ والإقفال والمستندات والضرائب، يُعدّها الوكلاء ويعتمدها فريقك المالي.",
  alternates: langAlternates("/accounting"),
};

/* The six modules: the translations from the old /ar/product page. */
const MODULES = [
  {
    n: "01", name: "الذمم الدائنة",
    h: "تصلك الفواتير مرمّزة ومدقَّقة وجاهزة.",
    p: "أرسل المستند عبر واتساب أو البريد الإلكتروني أو الرفع المباشر. يُقرأ المستند، ويُرمَّز من سجلّك أنت، ويُختبر وفق قواعد الفاتورة الضريبية قبل المطالبة بأي ضريبة قيمة مضافة. تُحتجز النسخ المكررة ولا تُسجَّل مرتين، وكل ما هو غير مؤكد يأتيك مع سببه.",
    ticks: ["الترميز مقترح مع درجة ثقته والسجل الذي بُني عليه", "ضريبة المدخلات تُحتجز حتى تستوفي الفاتورة الشروط", "دفعات السداد تُعدّ لك ولا تُنفَّذ نيابة عنك"],
    file: "p-payables.png", title: "الذمم الدائنة",
    alt: "شاشة الذمم الدائنة في Hysaab: تنزيل التقارير، ولوحة دفعة السداد، وجدول الذمم الدائنة المفتوحة مع الترميز ونتيجة الفاتورة الضريبية واسترداد ضريبة القيمة المضافة لكل فاتورة، والإجماليات المستحقة لكل مورد. بيانات تجريبية.",
    caption: "الذمم الدائنة، بيانات تجريبية: كل فاتورة مفتوحة مع ترميزها ونتيجة الفاتورة الضريبية وموقف الاسترداد.",
  },
  {
    n: "02", name: "الذمم المدينة",
    h: "تذكير مهذّب ومثابر، على وتيرة توافق عليها.",
    p: "تُصاغ رسائل التذكير ضمن وتيرة تحصيل تحددها مرة واحدة، ولا يُرسل شيء قبل موافقتك. أعمار الديون ووعود السداد والتعرض للمخصصات على شاشة واحدة، مقيسة وفق سياستك أنت.",
    ticks: ["أعمار الديون والخطوة التالية لكل فاتورة مفتوحة", "المخصصات تتبع السلّم الذي حددته", "كشوف حساب العملاء تُطابَق مع دفاترك"],
    file: "p-receivables.png", title: "الذمم المدينة",
    alt: "شاشة الذمم المدينة في Hysaab: بطاقات للذمم المفتوحة والمستحقة والمتأخرة والمعرّضة للخطر، ورسم لأعمار الديون، ومخاطر الشطب والمخصصات، وجدول بالفواتير مع أعمارها وحالتها والخطوة التالية. بيانات تجريبية.",
    caption: "الذمم المدينة، بيانات تجريبية: أعمار الديون والمخصصات وخطوة التحصيل التالية لكل فاتورة.",
  },
  {
    n: "03", name: "دفتر الأستاذ",
    h: "كل قيد يشرح نفسه.",
    p: "يحتفظ كل قيد بمن سجّله ومن أكّده، وبالتعليق والمستندات التي تقف خلفه. افتح أي رقم لترى سبب وجوده. الأخطاء تُعكس علنًا، ولا يُحذف شيء.",
    ticks: ["التعليق والأدلة مرفقة بالقيد", "العكوس قيود مرآتية لها سببها الخاص", "الترحيل إلى النظام المحاسبي الذي تستخدمه بالفعل"],
    file: "04-app-journal-why.png", title: "دفتر الأستاذ",
    alt: "نشاط القيود في Hysaab: قيود مرحّلة مع من سجّل كلًا منها أو أكّده، وقيد واحد مفتوح يعرض تعليقه ومطابقته والمستندات المرفقة به. بيانات تجريبية.",
    caption: "نشاط القيود، بيانات تجريبية: قيد واحد مفتوح على تعليقه ومطابقته ومستنداته.",
  },
  {
    n: "04", name: "الإقفال",
    h: "نهاية الشهر، مختصرة في قائمة قصيرة.",
    p: "تعرض لوحة الإقفال ما أنجزه Hysaab، وما لا يزال مفتوحًا، وما يحتاج إلى شخص. تُقترح الاستحقاقات مع أساسها لتوافق عليها. وحين تكون البوابات خالية تقفل الفترة أنت، ويسري القفل على الجميع، بما في ذلك Hysaab.",
    ticks: ["الاستحقاقات تُقترح مع أساسها، وتوافق عليها أنت", "قائمة تحقق لجانب Hysaab وأخرى لجانب دفترك", "قفل الفترة زرٌّ تضغطه أنت"],
    file: "p-close.png", title: "لوحة الإقفال",
    alt: "لوحة الإقفال في Hysaab: استحقاقات متكررة مقترحة مع أساسها ومبلغها، وقائمة تحقق بما يشغّله Hysaab، وقائمة تحقق لجانب دفتر الأستاذ، وزر إقفال الفترة وقفلها. بيانات تجريبية.",
    caption: "لوحة الإقفال، بيانات تجريبية: الاستحقاقات المقترحة وقائمتا التحقق والقفل المشروط.",
  },
  {
    n: "05", name: "المستندات",
    h: "سجل بكل ما وصل.",
    p: "يُحفظ كل مستند مع القناة التي وصل عبرها وما آل إليه: رُمِّز، أو طُوبق، أو سُوّي، أو احتُجز مع السبب. ويبقى الدليل على بُعد نقرة واحدة من الرقم الذي يدعمه.",
    ticks: ["الفواتير والإيصالات وكشوف الحساب وأوامر الشراء والموافقات", "النسخ المكررة تُكتشف عبر القنوات المختلفة", "عروض الأسعار والأوراق المؤيدة تُرفق بمعاملتها"],
    file: "01-app-intake.png", title: "المستندات",
    alt: "سجل الاستقبال في Hysaab: مستندات وصلت عبر واتساب والبريد الإلكتروني والتغذية البنكية، لكل منها فئة ونتيجة. عنوان بريد إلكتروني واحد محجوب. بيانات تجريبية.",
    caption: "سجل الاستقبال، بيانات تجريبية: كل مستند مع فئته وقناته ونتيجته.",
  },
  {
    n: "06", name: "الضرائب",
    h: "مدقَّقة قبل أن تقدّم إقرارك.",
    p: "تُختبر الفواتير وفق معايير الفاتورة الضريبية في الإمارات فور وصولها، وتُحتجز ضريبة المدخلات حتى يستوفي المستند الشروط. يُطابَق إيراد ضريبة القيمة المضافة مع إيراد ضريبة الشركات كل شهر، مع شرح الفرق، وتُتابَع مواعيد تقديم الإقرارات.",
    ticks: ["مطابقة ضريبة القيمة المضافة مع ضريبة الشركات، مع شرح الفرق", "مواعيد التقديم متابَعة لكل نظام ضريبي", "أنت تراجع وتقدّم؛ Hysaab لا يقدّم الإقرارات نيابة عنك"],
    file: "p-tax.png", title: "الضرائب",
    alt: "شاشة الضرائب في Hysaab: بطاقات لإقرار ضريبة القيمة المضافة، وضريبة الشركات، ومطابقة ضريبة القيمة المضافة مع ضريبة الشركات، والفواتير الإلكترونية، والمطابقة مع الفرق مشروحًا، وجدول بمواعيد التقديم. بيانات تجريبية.",
    caption: "الضرائب، بيانات تجريبية: مطابقة ضريبة القيمة المضافة مع ضريبة الشركات وتقويم التقديم.",
  },
];

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.ar}</span>;

export default function AccountingPage() {
  return (
    /* AR-REVIEW: the band, the hero and every section heading and body below
       the modules are new drafts. */
    <PageShell locale="ar" band={{ title: "شاهده على دفاترك أنت.", body: "أحضر عملية واحدة تستغرق وقتًا أطول مما ينبغي. سنمرّرها معك عبر مساحة العمل، ثم نؤكد النطاق والأتعاب قبل أي التزام." }}>
      <PageHero
        locale="ar"
        eyebrow="Hysaab Finance · للفرق المالية"
        title={<>Hysaab Finance.<br /><span>وكلاء ذكاء اصطناعي للمحاسبة والتقارير.</span></>}
        lede="يُعدّ الوكلاء الذمم الدائنة والمطابقات والإقفال وحزمة التقارير داخل النظام المحاسبي الذي تستخدمه بالفعل. وفريقك يراجع ويعتمد."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>احجز عرضًا تجريبيًا <span aria-hidden="true">↗</span>{newTab}</a>
        <a className="hw-link hw-link--light" href="/check">افحص دفاترك مجانًا (بالإنجليزية) <span aria-hidden="true">←</span></a>
      </PageHero>

      <section id="modules">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">01 · ماذا يفعل؟</p>
              <h2>ستة أجزاء، ومجموعة دفاتر واحدة.<br /><span>يُعدّ لك، وتقرره أنت.</span></h2>
            </div>
            <p>كل شاشة أدناه لقطة من مساحة عمل Hysaab وهي تعمل على بياناتها التجريبية. اختر أيًا منها لعرضها كاملة.</p>
          </div>

          {MODULES.map((m, i) => (
            <div className={`hw-feature${i % 2 ? " hw-feature--flip" : ""}`} key={m.n}>
              <div className="hw-feature-copy">
                <p className="hw-eyebrow">{m.n} / {m.name}</p>
                <h3>{m.h}</h3>
                <p>{m.p}</p>
                <ul className="hw-ticks">{m.ticks.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
              <Shot file={m.file} title={m.title} alt={m.alt} caption={m.caption} priority={i === 0} locale="ar" />
            </div>
          ))}
        </div>
      </section>

      <section id="groups" className="hw-block--family">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">02 · لمن هو؟</p>
              <h2>للفرق المالية التي تدير أكثر من مجموعة دفاتر.</h2>
            </div>
            <p>من شركة واحدة إلى مجموعة كيانات في الإمارات والسعودية، يديرها فريقك أو يعمل معه محاسبو Oblique.</p>
          </div>
          <div className="hw-cards hw-cards--2">
            <article>
              <p className="hw-eyebrow">إقفال متعدد الكيانات</p>
              <h3>كل كيان يُقفل على قائمته الخاصة.</h3>
              <p>تنقّل بين الكيانات في مساحة عمل واحدة. لكل كيان دفاتره وقائمة إقفاله وقفل فترته، وقواعد الاعتماد نفسها تسري عليها جميعًا.</p>
            </article>
            <article>
              <p className="hw-eyebrow">تقارير المجموعة</p>
              <h3>حزمة واحدة للمجموعة، متتبَّعة إلى كل كيان.</h3>
              <p>وحّد الكيانات وأعد بناء حزمة الإدارة من دفاتر مقفلة. كل حركة مشروحة في جملة ومتتبَّعة إلى قيدها ومستندها.</p>
            </article>
          </div>
          <div className="hw-feature">
            <div className="hw-feature-copy">
              <p className="hw-eyebrow">مساحة عمل واحدة، بأي شكل</p>
              <h3>شركة واحدة أو خمس. عملة واحدة أو خمس. لغة واحدة أو لغتان.</h3>
              <p>تنقّل بين الكيانات، ووحّدها، وحوّل مساحة العمل كلها إلى العربية، من اليمين إلى اليسار.</p>
            </div>
            <div className="hw-shot">
              <Image src="/shots/adv-arabic.png" width={1600} height={1360} sizes="(max-width: 760px) 100vw, 55vw" alt="مساحة عمل Hysaab بالعربية، من اليمين إلى اليسار. بيانات تجريبية." style={{ width: "100%", height: "auto", border: "1px solid var(--hw-hairline)" }} />
              <p className="hw-shot-cap">مساحة العمل نفسها بالعربية، من اليمين إلى اليسار. بيانات تجريبية.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="invoice-checks">
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">03 · كيف تُفحص فواتير الموردين؟</p>
              <h2>فحص الفواتير، قبل أن تطالب بالضريبة.</h2>
            </div>
            <div className="hw-prose">
              <p>تُقرأ كل فاتورة مورد، ويُعاد حسابها بالشيفرة، وتُختبر وفق قواعد الفاتورة الضريبية في الإمارات والسعودية. رقم تسجيل ضريبي مفقود، أو نسبة خاطئة، أو فاتورة مكررة، أو مورد تغيّر رقمه الضريبي: كلها تُحجز مع السبب والمادة التي لم تستوفها.</p>
              <p>فحص الفواتير جزء من Hysaab Finance. <a href="/ar/invoice">تابع فاتورة واحدة من البريد إلى مطالبة يمكنك الدفاع عنها</a>.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="live" className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">04 · كيف يعمل؟</p>
              <h2>المستندات تصل. والعمل يُعدّ.<br /><span>والقرار معك.</span></h2>
            </div>
            <p>سبعون ثانية من عمل الوكلاء، أدناه. و<a href="/ar/how-it-works">الجولة الكاملة</a> تمتد من وصول المستند إلى فترة مقفلة.</p>
          </div>
          <div dir="ltr">
            <Terminal />
          </div>
          {/* AR-REVIEW: what the agents send, and the trust ladder (2026-09-24);
              strings in components/home/AgentsAct.tsx and TrustLadder.tsx */}
          <AgentsAct locale="ar" />
        </div>
      </section>

      <TrustLadder locale="ar" />

      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">05 · ما الذي يبقى معك؟</p>
              <h2>حكمك أنت.<br /><span>وحدودك أنت.</span></h2>
            </div>
            <p>القواعد الثلاث نفسها تسري على كل شاشة. و<a href="/ar/trust">التزاماتنا بشأن البيانات والتحكم</a> تبيّن الباقي.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>كل إجابة يمكن تتبعها.</h3><p>افحص القيود والمستندات التي تقف خلف أي رقم. تفسير يمكنك التحقق منه أثمن من تفسير يُطلب منك تصديقه.</p></article>
            <article><span className="hw-mono">02</span><h3>يعرف أين يتوقف.</h3><p>بوابات الموافقة وأقفال الفترات وحسابات المراقبة تبقى في مكانها. التعليمة المشكوك فيها تُواجَه بالسبب، وبعضها يُرفض رفضًا صريحًا.</p></article>
            <article><span className="hw-mono">03</span><h3>يترك سجلًا واضحًا.</h3><p>التوصية، والقرار المتخذ، والمنطق الذي وراءه، تُحفظ مع الدفاتر لا في محادثة منفصلة.</p></article>
          </div>
        </div>
      </section>

      <section id="cost">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">06 · كم يكلّف؟</p>
              <h2>بحجم العمل،<br /><span>لا بعدد المقاعد.</span></h2>
            </div>
            <p>لا رسوم لكل مستخدم. نؤكد النطاق والرسوم كتابةً قبل أن تبدأ.</p>
          </div>
          <div className="hw-cards hw-cards--2">
            <article>
              <p className="hw-eyebrow">الخدمة الذاتية · فريقك يديرها</p>
              <h3>من USD 199 شهريًا</h3>
              <p>يُعدّ الوكلاء العمل، وفريقك يراجع ويعتمد ويقفل. نظام محاسبي واحد متصل، وعدد غير محدود من الأشخاص.</p>
              <a className="hw-link" href="/ar/pricing">شاهد الأسعار <span aria-hidden="true">←</span></a>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">الخدمة المُدارة · ندير العمل معك</p>
              <h3>تُسعَّر وفق نطاق دفاترك</h3>
              <p>يدير محاسبو Oblique قائمة العمل ويجهّزون الإقفال معك، مستخدمين Hysaab كل يوم. للشركات المتوسطة والكبيرة.</p>
              <a className="hw-link hw-link--peach" {...DEMO}>احجز عرضًا تجريبيًا <span aria-hidden="true">↗</span>{newTab}</a>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
