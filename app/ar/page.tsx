/* ── الصفحة الرئيسية العربية — Tick & Tie ───────────────────────────
   Arabic twin of app/(en)/page.tsx, the finance-first homepage
   (2026-10-25): the promise beside the close film, the October sample
   workspace, everyday outcomes, the binder, the memory story, your
   accounting system, your control, ways to work, and the invitation.
   Same components as the English page, fed Arabic strings (CloseFilm and
   SampleWorkspace take locale="ar"). Brand and system names stay Latin;
   digits stay Western and left to right; WhatsApp is واتساب in prose.
   Styles: app/tick-tie.css, with the Arabic residue in
   app/tick-tie-ar.css.
   AR-REVIEW: strings marked below are new drafts for the native reviewer
   (brand/AR-REVIEW.md). Strings carried over unchanged from the previous
   Arabic homepage (control, ways to work, the form) are not marked. */

import { HomeHeader } from "@/components/home/HomeHeader";
import { EnquiryForm, InterestLink } from "@/components/home/EnquiryForm";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { ACCESS_HREF, ACCESS_LABEL, KEY_LINE } from "@/lib/access";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TEAM } from "@/lib/team";
import { Wp, Tm } from "@/components/home/tt/Wp";
import { ReviewNote } from "@/components/home/tt/ReviewNote";
import { CloseFilm } from "@/components/home/CloseFilm";
import { SampleWorkspace } from "@/components/home/SampleWorkspace";

/* AR-REVIEW: title and description */
export const metadata = {
  title: "وكلاء ذكاء اصطناعي للفرق المالية والمكاتب المهنية | Hysaab",
  description:
    "فريقك المالي، دون تغيير نظامك المحاسبي. يتصل Hysaab بـ Xero أو Zoho Books أو QuickBooks، ويتحقق من الفروقات، ويُعدّ العمل لمراجعتك، من المطابقات إلى الإقفال الشهري. للإمارات والسعودية.",
  alternates: langAlternates("/"),
};

/* ملف الإقفال، كما يحفظه التطبيق (AR-REVIEW: the workpaper names) */
const BINDER = [
  "الفهرس والتوقيع", "ميزان المراجعة والجداول الرئيسية", "النقد والبنوك", "الذمم المدينة", "المصروفات المدفوعة مقدمًا",
  "ذمم مدينة أخرى وودائع", "المخزون", "الأصول الثابتة", "عقود الإيجار (IFRS 16)", "الأصول غير الملموسة", "المعاملات بين الشركات",
  "الذمم الدائنة", "المستحقات", "الإيرادات المؤجلة والتزامات العقود", "الرواتب والتزامات الموظفين", "ضريبة القيمة المضافة",
  "ضريبة الشركات والزكاة", "القروض والاقتراض", "ذمم دائنة أخرى ومخصصات", "حقوق الملكية", "الحسابات المعلّقة والوسيطة",
  "إعادة تقييم العملات", "فصل الفترات", "سجل قيود اليومية", "تحليل تغيّرات الميزانية", "تحليل تغيّرات قائمة الدخل", "ورقة عمل التدفقات النقدية",
  "القوائم المالية", "البنود المفتوحة والاستثناءات", "أدلة قائمة الإقفال", "توحيد المجموعة",
];

/* AR-REVIEW: everyday outcomes */
const OUTCOMES: { m: string; h: string; p: string; ex: string }[] = [
  { m: "B", h: "افهم نقدك", p: "كل سطر بنكي مطابق مع الفاتورة أو الدفعة التي وراءه، والرصيد مطابق للبنك.", ex: "طُوبق 212 سطرًا خلال الليل؛ وبقي سطران لك، لكل منهما سببه." },
  { m: "T", h: "اكتشف الفروقات", p: "التكرار والترميز الخاطئ والفواتير الناقصة تُكتشف قبل أن تصل إلى الحسابات.", ex: "فاتورة المورّد نفسها مُدخلة مرتين في مارس: أُوقفت ولم تُدفع مرتين." },
  { m: "✓", h: "جهّز الإقفال", p: "تقويم إقفال مؤرخ بأصحاب المهام، ومطابقات يوقّعها شخص ثانٍ، وملف محفوظ.", ex: "31 ورقة عمل لأكتوبر حُفظت في يوم العمل الرابع." },
  { m: "?", h: "أجب عن الأسئلة الضريبية", p: "ضريبة القيمة المضافة وضريبة الشركات في الإمارات والسعودية تُفحص أثناء العمل، لا عند الإقرار.", ex: "فاتورة تحتسب 5% على تصدير خاضع لنسبة الصفر: أُوقفت مع ذكر القاعدة." },
];

/* AR-REVIEW: the systems table */
const SYSTEMS: { name: string; how: string; does: string }[] = [
  { name: "Xero", how: "شاشة موافقة Xero نفسها", does: "يقرأ الدفاتر، أو يعمل بجانبها للقراءة فقط؛ ويُرحّل القيود المعتمدة حين تسمح" },
  { name: "Zoho Books", how: "شاشة موافقة Zoho نفسها", does: "يطابق دليل حساباتك؛ ويُرحّل القيود المعتمدة" },
  { name: "QuickBooks", how: "شاشة موافقة Intuit نفسها", does: "يُرحّل القيود المعتمدة بعد مطابقة الحسابات" },
  { name: "Odoo", how: "مفتاح API، بخطوات موجّهة", does: "مستضاف ذاتيًا أو Odoo.sh؛ استيراد السجل؛ ويُرحّل القيود المعتمدة" },
  { name: "Wafeq", how: "مفتاح API، بخطوات موجّهة", does: "بالدرهم والريال أصلًا؛ ويُرحّل القيود المعتمدة" },
  { name: "ERPNext", how: "زوج مفاتيح API، بخطوات موجّهة", does: "استيراد السجل؛ ويُرحّل القيود المعتمدة" },
];
const PLANNED = ["NetSuite", "Microsoft Dynamics 365"];

/* AR-REVIEW: the firms row */
const FIRMS: { who: string; status: string; name: string; line: string; href: string; en?: boolean }[] = [
  { who: "لمكاتب الضرائب والاستشارات", status: "قريبًا", name: "Hysaab Practice", line: "مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات في كل إقرار، ومعالجات من سوابق مكتبك.", href: "/ar/firms" },
  { who: "لمكاتب التدقيق المرخّصة", status: "قريبًا", name: "Hysaab Audit", line: "كل قيد مُقيَّم والعينات مصممة بالشيفرة. يستنتج شريك مرخّص ويوقّع.", href: "/audit", en: true },
];

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.ar}</span>;
const inEnglish = <span className="hw-sr"> (بالإنجليزية)</span>;

export default function Page() {
  return (
    <div className="hw-page tt-page" id="top">
      <a href="#main" className="hw-skip">تخطَّ إلى المحتوى</a>
      <span data-motion-page="full" hidden />
      <HomeHeader locale="ar" />

      <main id="main">
        {/* ── H-1 الوعد، والعمل نفسه (AR-REVIEW: the strip, headline and lede) ── */}
        <section className="tt-sec tt-grid tt-hero tt-hero3">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-1" right={<>أعدّه <b>Hysaab</b> · وقررته <b>أنت</b></>}>ذكاء اصطناعي للمحاسبة والإقفال والمالية</Wp>
            <div className="tt-hero2-g tt-hero3-g">
              <div className="tt-hero2-copy">
                <h1>فريقك المالي. <span className="tt-hl">دون تغيير نظامك المحاسبي.</span></h1>
                <p className="tt-hero-sub">يتصل Hysaab بدفاترك، ويتحقق من الفروقات، ويُعدّ العمل لمراجعتك، من المطابقات إلى الإقفال الشهري. ترى ما أُنجز، وما ينقص، وما يحتاج إلى قرارك.</p>
                <div className="tt-acts tt-hero2-acts">
                  <a className="hw-btn hw-btn--navy m-cta" href="#sample">شاهد Hysaab يعمل <span aria-hidden="true">↓</span></a>
                  <a className="tt-link" {...DEMO}>احجز عرضًا حيًّا <span aria-hidden="true">↗</span>{newTab}</a>
                </div>
              </div>
              <CloseFilm locale="ar" />
            </div>
            <SampleWorkspace locale="ar" />
          </div>
        </section>

        {/* ── H-2 ما يفعله كل يوم (AR-REVIEW) ── */}
        <section className="tt-sec" id="outcomes" aria-labelledby="tt-out-h">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-2" right="أمثلة · بيانات تجريبية">ما يفعله كل يوم</Wp>
            <h2 className="tt-h2" id="tt-out-h" data-reveal="">العمل الذي يؤديه فريقك اليوم، <span className="tt-hl" data-play="">مُعدٌّ قبل أن يصلوا إليه.</span></h2>
            <div className="tt-outs" data-reveal="stagger-lg">
              {OUTCOMES.map((o) => (
                <article key={o.h}>
                  <h3><Tm m={o.m} />{o.h}</h3>
                  <p>{o.p}</p>
                  <p className="tt-ex">{o.ex}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── H-3 الإقفال المكتمل: الملف (AR-REVIEW) ── */}
        <section className="tt-sec tt-grid" id="binder" aria-labelledby="tt-binder-h">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-3" right="أرقام المنتج نفسه">ما تحصل عليه في نهاية كل إقفال</Wp>
            <h2 className="tt-h2" id="tt-binder-h" data-reveal="">شهر مُقفل، <span className="tt-hl" data-play="">والملف الذي يثبته.</span></h2>
            <div className="tt-facts" data-reveal="stagger-lg">
              <article><b>31</b><p>ورقة عمل Excel في كل ملف إقفال، ولكل منها من أعدّها ومن راجعها، ومسودة أو نهائية.</p></article>
              <article><b><bdi>T+1–T+5</bdi></b><p>كل مهمة إقفال مؤرخة بيوم العمل ولها صاحب. والمهام المعرّضة للتأخر تظهر قبل موعدها.</p></article>
              <article><b>0</b><p>استحقاقات تُقيَّد قبل أن يؤكدها شخص. والمطابقات تحتاج إلى توقيع ثانٍ.</p></article>
              <article><b>أيام</b><p>أيام الإقفال تُقاس كل شهر، فيُقارن كل إقفال بما قبله.</p></article>
            </div>
            <div className="tt-binder" aria-label="أوراق العمل في ملف إقفال Hysaab">
              <p className="tt-binder-h"><span>ملف الإقفال · مجلد لكل شهر</span><span><bdi>{BINDER.length}</bdi> ورقة عمل</span></p>
              <ol>
                {BINDER.map((w, i) => <li key={w}><span><bdi>{String(i).padStart(2, "0")}</bdi></span>{w}</li>)}
              </ol>
            </div>
          </div>
        </section>

        {/* ── H-4 الذاكرة (AR-REVIEW) ── */}
        <section className="tt-sec tt-memory" id="memory" aria-labelledby="tt-mem-h">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-4" right="لماذا يتحسّن كل شهر">الذاكرة</Wp>
            <h2 className="tt-h2" id="tt-mem-h" data-reveal="">أي ذكاء اصطناعي يقرأ كشف حساب بنكي. <span className="tt-hl" data-play="">Hysaab يتذكّر شركتك.</span></h2>
            <p className="tt-lead">نافذة المحادثة تبدأ من الصفر في كل مرة. أما Hysaab فمتصل بدفاترك ومستنداتك وفريقك وكل قرار اتخذته، ويحتفظ بما يتعلمه. إنه الجزء من المالية الذي لا ينسى كيف تعمل شركتك.</p>
            <ol className="tt-lur" data-reveal="stagger-lg">
              <li>
                <span className="tt-lur-k">يتعلّم</span>
                <h3>من دفاترك أنت.</h3>
                <p>يقرأ سجل دفاترك ليتعلّم كيف ترمّز شركتك كل مورّد، وأي الفواتير تتكرر كل شهر.</p>
                <p className="tt-ex">«Hygeia تصدر فواتيرها متأخرة. استحقّها في نهاية الشهر.»</p>
              </li>
              <li>
                <span className="tt-lur-k">يتخلّى</span>
                <h3>حين تصحّحه.</h3>
                <p>صحّح ترميزًا فيرجح تصحيحك على النمط القديم الذي يتلاشى. ولا تتجاوز ثقته الدليل الذي وراءها.</p>
                <p className="tt-ex">«ليست لوازم مكتبية. رفاه الموظفين، من الآن.»</p>
              </li>
              <li>
                <span className="tt-lur-k">يعيد التعلّم</span>
                <h3>كل شهر، وبموافقتك.</h3>
                <p>لا تُنشأ قاعدة جديدة إلا حين تؤكدها، وكل إقفال يضيف ما أكده أصحاب المهام وما وقّعه المراجعون.</p>
                <p className="tt-ex">«نعم، اجعلها قاعدة دائمة.»</p>
              </li>
            </ol>
            <p className="tt-more tt-more--dark"><a className="tt-link" href="/bank-statement">جرّبه على كشف حساب بنكي، مجانًا <span aria-hidden="true">←</span>{inEnglish}</a></p>
          </div>
        </section>

        {/* ── H-5 نظامك المحاسبي (AR-REVIEW) ── */}
        <section className="tt-sec tt-grid" id="systems" aria-labelledby="tt-sys-h">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-5" right="دفاترك تبقى السجل">نظامك المحاسبي</Wp>
            <h2 className="tt-h2" id="tt-sys-h" data-reveal="">احتفظ بالنظام <span className="tt-hl" data-play="">الذي تثق به.</span></h2>
            <p className="tt-lead">يعمل Hysaab مع نظامك المحاسبي، لا بدلًا منه. ولا يُرحَّل شيء قبل أن تسمح قواعد الاعتماد لديك.</p>
            <div className="tt-sys">
              <table>
                <thead><tr><th scope="col">النظام</th><th scope="col">طريقة الاتصال</th><th scope="col">ما يفعله Hysaab فيه</th><th scope="col">الحالة</th></tr></thead>
                <tbody>
                  {SYSTEMS.map((s) => (
                    <tr key={s.name}><th scope="row" lang="en" dir="ltr">{s.name}</th><td>{s.how}</td><td>{s.does}</td><td><span className="tt-st tt-st--ok">متاح</span></td></tr>
                  ))}
                  {PLANNED.map((n) => (
                    <tr key={n}><th scope="row" lang="en" dir="ltr">{n}</th><td>—</td><td>ضمن خطة العمل</td><td><span className="tt-st">مخطط له</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="tt-more"><a className="tt-link" href="/ar/integrations">كيف يعمل كل اتصال <span aria-hidden="true">←</span></a>تستخدم نظامًا آخر؟ نحدد الاتصال معك كتابةً أولًا.</p>
          </div>
        </section>

        {/* ── H-6 تحكّمك ── */}
        <section className="tt-sec" id="control" aria-labelledby="tt-ctl-h">
          <div className="hw-wrap">
            <Wp locale="ar" r="H-6" right="ملاحظات المراجعة تبقى في السجل">تحكّمك</Wp>
            <div className="tt-ctl">
              <div data-reveal="">
                <h2 className="tt-h2" id="tt-ctl-h">الزميل الجيد لا يكتفي <span className="tt-hl" data-play="">بقول نعم.</span></h2>
                {/* AR-REVIEW: the first sentence */}
                <p className="tt-lead">كل تغيير يصل مقترحًا مع دليله. وحين تبدو تعليمة ما خاطئة، يشرح Hysaab السبب، ويبقى القرار وسببه في السجل.</p>
              </div>
              <ReviewNote locale="ar" />
            </div>
            <div className="tt-pts" data-reveal="stagger-lg">
              <article><h3><Tm m="T" />لكل إجابة أثر.</h3><p>افتح القيود والمستندات وراءها. العمل متاح للفحص.</p></article>
              <article><h3><Tm m="✓" />حدودك تبقى في مكانها.</h3><p>حدود الاعتماد وأقفال الفترات والضوابط التي تضعها تبقى سارية.</p></article>
              <article><h3><Tm m="P" />السبب يبقى مع القرار.</h3><p>أي تجاوز مسموح يحتاج إلى سبب. والمقترح وقرارك والسجل محفوظة معًا.</p></article>
            </div>
            <p className="tt-more"><a className="tt-link" href="/ar/trust">اقرأ التزاماتنا بشأن البيانات والتحكم <span aria-hidden="true">←</span></a></p>
          </div>
        </section>

        {/* ── H-7 طرق العمل، والمكاتب، ومن وراء Hysaab ── */}
        <section id="ways" className="tt-sec tt-grid" aria-labelledby="tt-ways-h">
          <span id="products" className="hw-anchor" aria-hidden="true" />
          <span id="family" className="hw-anchor" aria-hidden="true" />
          <span id="firms" className="hw-anchor" aria-hidden="true" />
          <span id="team" className="hw-anchor" aria-hidden="true" />
          <span id="origin" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp locale="ar" r="H-7" right="النطاق يُتفق عليه قبل أن نبدأ">طرق العمل</Wp>
            <h2 className="tt-h2" id="tt-ways-h" data-reveal="">فريقك. <span className="tt-hl" data-play="">أو فريقنا إلى جانبه.</span></h2>
            <div className="tt-ways" data-reveal="stagger-lg">
              <article>
                <p className="tt-who">لفريقك المالي</p>
                {/* AR-REVIEW: heading and link */}
                <h3>فريقك يدير الإقفال.</h3>
                <p>يُعدّ Hysaab العمل. ويراجع فريقك الاستثناءات، ويوقّع أوراق العمل، ويُبقي القرارات داخل الشركة.</p>
                <InterestLink interest="Own team">ناقش إقفال فريقك <span aria-hidden="true">↗</span></InterestLink>
              </article>
              <p className="tt-or" aria-hidden="true">أو</p>
              <article>
                <p className="tt-who">لدعم عملي أكبر</p>
                <h3>ندير العمل معك.</h3>
                <p>يدير محاسبو Oblique قائمة العمل ويجهّزون الإقفال معك، مستخدمين Hysaab كل يوم. للشركات المتوسطة والكبيرة.</p>
                <InterestLink interest="Managed support">ناقش الدعم المُدار <span aria-hidden="true">↗</span></InterestLink>
              </article>
            </div>
            <div className="tt-firmrow">
              <p className="tt-who">تدير مكتبًا مهنيًا؟</p>
              {FIRMS.map((f) => (
                <a key={f.name} href={f.href}>
                  <span className="tt-prod-st"><span>{f.who}</span><b>{f.status}</b></span>
                  <strong lang="en" dir="ltr">{f.name}</strong>
                  <span>{f.line}{f.en && inEnglish}</span>
                </a>
              ))}
              <a href="/hire"><span className="tt-prod-st"><span>التوظيف في المالية</span><b>Ibtidah</b></span><strong>تعرّف إلى Ibtidah</strong><span>فرز ومقابلات لوظائف المالية.{inEnglish}</span></a>
            </div>
            <div className="tt-origin2">
              {/* AR-REVIEW */}
              <p><Tm m="P" /> بناه محاسبون أدّوا العمل بأنفسهم أولًا. نشأ Hysaab من أعمال الضرائب والمحاسبة التي تؤديها Oblique Consult لشركات الخليج، وهندسته Simpla.</p>
              <div className="tt-orgs">
                <a href="https://obliqueconsult.com" target="_blank" rel="noopener">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/partners/oblique-consult.svg" alt="Oblique Consult" width={1011} height={386} loading="lazy" />
                  <span><strong lang="en">{TEAM[0]?.name}</strong>{TEAM[0]?.ar.role}، {TEAM[0]?.ar.org}<span className="hw-sr"> (يفتح في تبويب جديد)</span></span>
                </a>
                <a href="https://www.simpla.ai" target="_blank" rel="noopener">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/partners/simpla.png" alt="Simpla" width={1024} height={304} loading="lazy" />
                  <span><strong lang="en">{TEAM[1]?.name}</strong>{TEAM[1]?.ar.role}، {TEAM[1]?.ar.org}<span className="hw-sr"> (يفتح في تبويب جديد)</span></span>
                </a>
              </div>
              <p className="tt-more"><a className="tt-link" href="/ar/about">اقرأ القصة كاملة <span aria-hidden="true">←</span></a></p>
            </div>
          </div>
        </section>

        {/* ── H-8 الدعوة (AR-REVIEW: heading, lede and the demo steps) ── */}
        <section className="tt-sec tt-grid hw-conversation tt-conversation" id="conversation">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <span id="ledger" className="hw-anchor" aria-hidden="true" />
          <span id="cohort" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp locale="ar" r="H-8" right="يرد عليك شخص">شاهده على دفاترك</Wp>
            <div className="hw-conversation-grid" data-reveal="stagger-lg">
              <div>
                <h2 className="tt-h2">شاهد Hysaab يعمل <span className="tt-hl" data-play="">على دفاترك.</span></h2>
                <p className="tt-lead">أخبرنا بنظامك المحاسبي وما الذي يستغرق وقتًا أطول مما ينبغي. في العرض نتصل للقراءة فقط، فلا يتغير شيء في دفاترك.</p>
                <div className="hw-agenda">
                  <span className="hw-mono">ما يحدث في العرض</span>
                  <ol>
                    <li><span className="hw-mono">01</span> نتصل بدفاترك للقراءة فقط</li>
                    <li><span className="hw-mono">02</span> يفحص Hysaab شهرًا حديثًا ويعرض ما يجده</li>
                    <li><span className="hw-mono">03</span> نمرّ على إقفال وملفه وما ستعتمده</li>
                  </ol>
                </div>
                <p className="hw-demo-direct">تفضّل أن تختار الموعد بنفسك؟ <a className="tt-link" {...DEMO}>اختر موعدًا في تقويمنا <span aria-hidden="true">↗</span>{newTab}</a></p>
                <p className="tt-invite">{KEY_LINE.ar} <a className="hw-link hw-link--ruled" href={ACCESS_HREF.ar}>{ACCESS_LABEL.ar} <span aria-hidden="true">←</span></a> <a className="hw-link hw-link--ruled" href="/check">أو افحص دفاترك مجانًا <span aria-hidden="true">←</span>{inEnglish}</a></p>
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
