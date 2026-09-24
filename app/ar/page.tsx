/* ── الصفحة الرئيسية العربية ──────────────────────────────────────────
   Arabic twin of app/(en)/page.tsx, rebuilt 2026-09-23 with the website
   change plan: one promise and two doors, the proof strip, the three
   products, how it works, one night on a group's books, five ways, the
   close verification, your control, for firms, ways to work, the origin
   story, Books Check and the demo form, in the English order. Shares
   the components, the captures (lib/home-moments.ts, Arabic captions
   here) and the founders (lib/team.ts). Brand and system names stay
   Latin; digits stay Latin; WhatsApp is واتساب in prose.
   AR-REVIEW: every string marked below is a new draft for the native
   reviewer (brand/AR-REVIEW.md). Strings carried over unchanged from
   the previous Arabic homepage are not marked. */

import { PeachScroller } from "@/components/home/PeachScroller";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Capture } from "@/components/home/Capture";
import { Shot } from "@/components/home/PageShell";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { loadMoments } from "@/lib/home-moments";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { Demo } from "@/components/hysaab/Demo";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TEAM } from "@/lib/team";
import { KineticLines, Mark, SwapLabel } from "@/components/motion/Kinetic";
import { ActivityFeed } from "@/components/home/ActivityFeed";

/* AR-REVIEW: title and description */
export const metadata = {
  title: "وكلاء ذكاء اصطناعي للفرق المالية والمكاتب المهنية | Hysaab",
  description:
    "وكلاء الذكاء الاصطناعي يؤدون العمل المالي وفريقك يراجع ويعتمد. Hysaab Finance للفرق المالية، وHysaab Practice وHysaab Audit للمكاتب المهنية.",
  alternates: langAlternates("/"),
};

/* الشريط الحي: الصفوف نفسها التي في الصفحة الإنجليزية
   (AR-REVIEW: the first row now names the Dubai entity). */
const TICKER: { t: string; who: string; msg: string; ask?: boolean }[] = [
  { t: "21:00", who: "وكيل الاستلام", msg: "استلم صورة عبر واتساب من راشد، كيان دبي. Gulf Technical Supplies، INV-4471." },
  { t: "21:01", who: "وكيل الضرائب", msg: "معايير الفاتورة الضريبية مستوفاة · رقم التسجيل الضريبي صحيح · ضريبة 199.50 قابلة للاسترداد." },
  { t: "21:02", who: "وكيل الترميز", msg: "معدات تقنية · مكتب دبي، بثقة 96% من 31 قيدًا مشابهًا. رُحّل القيد J-2291 إلى Zoho Books." },
  { t: "21:40", who: "مراقبة التكرار", msg: "وصلت INV-4471 مرة أخرى بالبريد. دُمجت ولم تُرحَّل مرتين." },
  { t: "23:15", who: "وكيل التحصيل", msg: "أُرسل التذكير 2 من 3 إلى ELC Group. الفاتورة SI-1187 متأخرة 12 يومًا." },
  { t: "06:05", who: "وكيل مطابقة البنك", msg: "طُوبق 312 من 314 سطرًا مع مستنداتها خلال الليل." },
  { t: "06:06", who: "قرار لليلى", msg: "الشيك 100421 · 250 درهمًا صُرف بلا مستند. نسألك.", ask: true },
  { t: "06:30", who: "وكيل الإقفال", msg: "حُرّر إيجار Knight Frank · الشهر 3 من 12. قائمة الإقفال 68%." },
  { t: "06:45", who: "وكيل التقارير", msg: "أُعيد بناء حزمة سبتمبر. هامش الربح الإجمالي انخفض 2.1 نقطة، والتفسير مرفق." },
];

/* AR-REVIEW: the proof strip */
const STATEMENTS = [
  "نظامك المحاسبي يحفظ السجلات.",
  "وHysaab يستخلص معناها.",
  "المستندات تصل.",
  "والإجابات تتبعها.",
  "وأنت تبقى في موقع التحكم.",
];

/* AR-REVIEW: the three product cards */
const PRODUCTS: { status: string; name: string; desc: string; line: string; href: string; cta: string }[] = [
  {
    status: "للفرق المالية · وصول مبكر", name: "Hysaab Finance", desc: "وكلاء ذكاء اصطناعي للمحاسبة والتقارير.",
    line: "الذمم الدائنة والمطابقات والإقفال وحزمة التقارير، تُعدّ داخل النظام المحاسبي الذي تستخدمه بالفعل. وفريقك يراجع ويعتمد.",
    href: "/ar/accounting", cta: "استكشف Hysaab Finance",
  },
  {
    status: "لمكاتب الضرائب والاستشارات · قريبًا", name: "Hysaab Practice", desc: "وكلاء ذكاء اصطناعي لمكاتب الضرائب والاستشارات.",
    line: "مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات في كل إقرار، ومعالجات مستمدة من سوابقك، والأعمال الإدارية للمكتب تدير نفسها من حول العمل.",
    href: "/ar/firms", cta: "استكشف Hysaab Practice",
  },
  {
    status: "لمكاتب التدقيق المرخّصة · قريبًا", name: "Hysaab Audit", desc: "ملف التدقيق وفق معايير ISA، تديره المحركات ويستنتجه شركاؤك.",
    line: "كل قيد مُقيَّم، والعينات مصممة ومُقيَّمة، والجداول مطابَقة. يستنتج شريك مرخّص ويوقّع؛ ولا يوقّع Hysaab أبدًا.",
    href: "/audit", cta: "استكشف Hysaab Audit (بالإنجليزية)",
  },
];

const AR_NOTICE: Record<string, string> = {
  intake: "لاحظ عمود القناة، واتساب والبريد جنبًا إلى جنب، ونتيجة كل مستند، ومنها فاتورة أُوقفت لأنها لم تجتز اختبار الفاتورة الضريبية.",
  coded: "لاحظ الحساب المقترح لكل فاتورة مع درجة الثقة والسجل، ونتيجة اختبار الفاتورة الضريبية بجانبه.",
  challenge: "لاحظ ترميزًا جرى التشكيك فيه استنادًا إلى سجل المورد نفسه، وضريبة مدخلات أُوقفت حتى تُصحَّح الفاتورة.",
  record: "لاحظ قيدًا مفتوحًا على تعليقه، والمطابقة مع إجمالي الفاتورة، والمستندات المرفقة.",
  position: "لاحظ بطاقات المركز المالي: النقد ورأس المال العامل والإيراد والذمم الدائنة المستحقة، ولكل منها سطر سياق.",
};
const AR_TITLE: Record<string, string> = {
  intake: "أرسله.",
  coded: "مرمَّز ومفحوص عند الوصول.",
  challenge: "توقّع رأيًا ثانيًا.",
  record: "اتخذ القرار. واحتفظ بالسبب.",
  position: "اعرف أين تقف.",
};

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.ar}</span>;

export default function Page() {
  const moments = loadMoments();
  const pendingCount = moments.filter((m) => !m.ready).length;

  return (
    <div className="hw-page" id="top">
      <a href="#main" className="hw-skip">تخطَّ إلى المحتوى</a>
      <span data-motion-page="full" hidden />
      <HomeHeader locale="ar" />

      <main id="main">
        {/* ── 1. البطل: وعد واحد وبابان (AR-REVIEW: all hero strings) ── */}
        <section className="hw-hero hw-hero--doors">
          <div className="hw-wrap hw-hero-v5">
            <div className="hw-hero-copy m-enter">
              <p className="hw-eyebrow"><span className="hw-dot" aria-hidden="true" /> وكلاء ذكاء اصطناعي للفرق المالية وللمكاتب التي تخدمها</p>
              <h1><KineticLines delay={120} lines={[<>وكلاء الذكاء الاصطناعي يؤدون العمل المالي.</>, <>وفريقك <Mark at={1000}>يراجع ويعتمد</Mark>.</>]} /></h1>
              <p className="hw-hero-desc">بناه محاسبون أدّوا العمل بأنفسهم أولًا. للإمارات والسعودية.</p>
            </div>

            <div className="hw-doors m-enter-block">
              <article className="hw-door hw-door--navy" aria-labelledby="door-finance">
                <p className="hw-eyebrow">أدير فريقًا ماليًا</p>
                <h2 id="door-finance">Hysaab Finance</h2>
                <p>يتولى الوكلاء الذمم الدائنة والمطابقات والإقفال والتقارير داخل النظام المحاسبي الذي تستخدمه بالفعل.</p>
                <div className="hw-door-actions">
                  <a {...DEMO} className="hw-btn hw-btn--blush m-cta m-cta--on-navy m-magnetic"><SwapLabel text="احجز عرضًا تجريبيًا" whole /> <span aria-hidden="true">↗</span>{newTab}</a>
                  <a className="hw-link hw-link--ruled" href="/check">افحص دفاترك مجانًا <span aria-hidden="true">←</span><span className="hw-sr"> (بالإنجليزية)</span></a>
                </div>
              </article>
              <article className="hw-door hw-door--blush" aria-labelledby="door-firm">
                <p className="hw-eyebrow">أدير مكتبًا مهنيًا</p>
                <h2 id="door-firm"><bdi className="hw-nowrap">Hysaab Practice</bdi> و<bdi className="hw-nowrap">Hysaab Audit</bdi></h2>
                <p>يتولى الوكلاء الفحوص الضريبية وارتباطات العملاء وملف التدقيق وفق معايير ISA. والقرار لشركائك.</p>
                <div className="hw-door-actions">
                  <a {...DEMO} className="hw-btn hw-btn--navy m-cta m-cta--on-blush m-magnetic"><SwapLabel text="احجز عرضًا تجريبيًا" whole /> <span aria-hidden="true">↗</span>{newTab}</a>
                  <a className="hw-link hw-link--ruled" href="/ar/firms">شاهد كيف تستخدمه المكاتب <span aria-hidden="true">←</span></a>
                </div>
              </article>
            </div>
            <p className="hw-origin hw-hero-trust"><span aria-hidden="true">✳</span> دليل على كل رقم. ولا يُرحَّل شيء خارج القواعد التي توافق عليها. صُنع في دبي.</p>{/* AR-REVIEW: 2026-09-24 approval line */}
          </div>
        </section>

        {/* ── 2. شريط الإثبات ── */}
        <PeachScroller phrases={STATEMENTS} />

        {/* ── في هذه الصفحة (AR-REVIEW: labels 01, 03 and 05) ── */}
        <nav className="hw-subnav" aria-label="في هذه الصفحة">
          <div className="hw-wrap hw-subnav-in">
            <a href="#products"><span className="hw-mono">01</span><span>المنتجات</span></a>
            <a href="#experience"><span className="hw-mono">02</span><span>التجربة</span></a>
            <a href="#firms"><span className="hw-mono">03</span><span>للمكاتب المهنية</span></a>
            <a href="#ways"><span className="hw-mono">04</span><span>طرق العمل</span></a>
            <a href="#team"><span className="hw-mono">05</span><span>قصتنا</span></a>
          </div>
        </nav>

        {/* ── 3. المنتجات الثلاثة (AR-REVIEW) ── */}
        <section id="products" className="hw-products hw-products--v5">
          <span id="family" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">المنتجات</p>
                <h2>ثلاثة منتجات.<br /><span>وطريقة عمل واحدة.</span></h2>
              </div>
              <p>كل منتج يعمل وحده. والثلاثة تلتزم القاعدة نفسها: الوكلاء يُعدّون العمل، وشخص يتخذ القرار.</p>
            </div>
            <div className="hw-pcards" data-reveal="stagger-lg">
              {PRODUCTS.map((p) => (
                <article key={p.name} className="m-sweep">
                  <p className="hw-eyebrow">{p.status}</p>
                  <h3 lang="en">{p.name}</h3>
                  <p className="hw-pcard-desc">{p.desc}</p>
                  <p>{p.line}</p>
                  <a className="hw-link hw-link--ruled" href={p.href}>{p.cta} <span aria-hidden="true">←</span></a>
                </article>
              ))}
            </div>
            <p className="hw-pcards-more" data-reveal="">توظّف في المالية؟ <a className="hw-link hw-link--ruled" href="/hire">تعرّف على Ibtidah <span aria-hidden="true">←</span><span className="hw-sr"> (بالإنجليزية)</span></a></p>
          </div>
        </section>

        {/* ── 4. كيف يعمل ── */}
        <section className="hw-work" id="how-it-works">
          <div className="hw-wrap hw-section">
            <div className="hw-work-grid">
              <div className="hw-heading" data-reveal="">
                <p className="hw-eyebrow">كيف يعمل</p>
                <h2>فقط تحدّث.<br />وHysaab يباشر العمل.</h2>
                {/* AR-REVIEW: 2026-09-24 intro and step 2 */}
                <p>يقرأ دفاترك، ويكتب القيود، ويلاحق ما ينقص. وأنت توافق.</p>
              </div>
              <div className="hw-workflow" data-reveal="stagger-lg">
                <article>
                  <span className="hw-workflow-num" aria-hidden="true">01</span>
                  {/* AR-REVIEW: step 1 */}
                  <h3>المستندات والبيانات تصل.</h3>
                  <p>فواتير وإيصالات وأسطر بنكية وأسئلة، عبر واتساب أو البريد أو الرفع. لا حاجة لتعلّم أداة تقارير.</p>
                </article>
                <article>
                  <span className="hw-workflow-num" aria-hidden="true">02</span>
                  <h3>Hysaab يُعدّ العمل.</h3>
                  <p>تُفحص المستندات، وتُعدّ القيود، وتُلاحَق الفواتير المتأخرة والإيصالات الناقصة، وتُعاد الاستثناءات إليك مع تفسير واضح.</p>
                </article>
                <article>
                  <span className="hw-workflow-num" aria-hidden="true">03</span>
                  <h3>أنت تتخذ القرارات.</h3>
                  <p>تجيب عن سؤال أو تراجع اعتمادًا. حدودك تبقى سارية، والتعليل يبقى مع الدفاتر.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. ليلة واحدة على دفاتر مجموعة (AR-REVIEW: heading and body) ── */}
        <section className="hw-night" aria-labelledby="hw-night-h">
          <div className="hw-wrap hw-section hw-night-grid">
            <div className="hw-heading" data-reveal="">
              <p className="hw-eyebrow">Hysaab Finance</p>
              <h2 id="hw-night-h">ليلة واحدة<br />على دفاتر مجموعة.</h2>
              <p>ما فعله الوكلاء بين التاسعة مساءً والسابعة إلا ربعًا صباحًا، والسؤال الوحيد الذي تركوه لليلى. بيانات توضيحية.</p>
            </div>
            <ActivityFeed rows={TICKER} locale="ar" title={null} />
          </div>
        </section>

        {/* ── 6. خمس لحظات: العرض التفاعلي ── */}
        <section id="experience" className="hw-experience">
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">خمس لحظات في يوم عملك</p>
                <h2>محادثة واحدة.<br /><span>من الإيصال إلى التقرير.</span></h2>
              </div>
              <p>تابع فاتورة واحدة عبر خمس لحظات، من صورة في التاسعة مساءً إلى فترة مقفلة.</p>
            </div>
            <Demo locale="ar" />
            {/* AR-REVIEW: the group scenario disclosure */}
            <p className="hw-disclosure">سيناريو توضيحي. تدير مجموعة النور أربعة كيانات بين دبي والرياض. ليلى المديرة المالية للمجموعة، ويُقفل فريقها المكوّن من اثني عشر شخصًا الدفاتر كل شهر. السيناريو والأرقام أمثلة، لا نتائج.</p>

            <div className="hw-shots">
              <h3 data-reveal="">داخل مساحة العمل الحقيقية.</h3>
              <div className="hw-shots-grid" data-reveal="stagger-lg" data-parallax="">
                {moments.map((m) => (
                  <article key={m.key}>
                    <Capture moment={m} focus locale="ar" />
                    <h4><span className="hw-mono">{m.num}</span> {AR_TITLE[m.key] ?? m.tabTitle}</h4>
                    <p>{m.ready ? <><strong>ما الذي تلاحظه.</strong> {AR_NOTICE[m.key] ?? m.caption}</> : "لقطة مساحة العمل قيد الإعداد."}</p>
                  </article>
                ))}
                <aside className="hw-shots-note">
                  <span className="hw-mono">عن هذه الشاشات</span>
                  <p>{pendingCount > 0 ? `${pendingCount} من ${moments.length} لقطات ما زالت قيد الإعداد ومُعلَّمة كذلك. البقية لقطات` : "لقطات"} من مساحة عمل Hysaab وهي تعمل على بيانات تجريبية. كل صورة مصغرة هي الجزء من الشاشة الذي يخص الفكرة؛ اخترها لرؤية الشاشة كاملة.</p>
                  <a className="hw-link hw-link--ruled" {...DEMO}>تجوّل فيها معنا <span aria-hidden="true">↗</span>{newTab}</a>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. الإقفال المكتمل (AR-REVIEW: new to the Arabic page) ── */}
        <section className="hw-zero-section" aria-labelledby="hw-zero-h">
          <div className="hw-wrap">
            <div className="hw-zero-layout" data-reveal="stagger-lg">
              <div>
                <div className="hw-zero" aria-hidden="true" data-count="" data-count-from="43">0</div>
                <p className="hw-zero-label">كل شيء مُسوّى.</p>
              </div>
              <div>
                <p className="hw-eyebrow">إقفال سبتمبر / البنود المعلّقة</p>
                <h2 id="hw-zero-h">مناسبة نادرة<br />يكون فيها الصفر<br />هو الرقم الذي تريده.</h2>
                <p>الإيصالات وصلت. والبنك مطابَق. وكل بند في قائمة إقفال سبتمبر مكتمل.</p>
                <div className="hw-zero-detail">
                  <a className="hw-btn" href="#experience">أرني الدليل <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </div>
            <div className="hw-zero-meta">
              <span><span data-count="">43</span> / 43 فحصًا مكتملًا</span>
              <span>إقفال مكتمل توضيحي · بيانات تجريبية</span>
            </div>
          </div>
        </section>

        {/* ── 8. تحكّمك (navy) ── */}
        <section className="hw-control" id="control">
          <div className="hw-wrap hw-control-grid">
            <div data-reveal="">
              <p className="hw-eyebrow">تحكّمك</p>
              <h2>حكمك.<br />حدودك.<br />دائمًا.</h2>
              <p>الأدوات الجيدة تجعل الإشراف على المالية أسهل، لا تفسيرها أصعب.</p>
            </div>
            <div className="hw-principles" data-reveal="stagger-lg">
              <article>
                <div><h3>كل إجابة قابلة للتتبع.</h3><p>افحص القيود والمستندات وراء كل إجابة.</p></div>
              </article>
              <article>
                <div><h3>اعرف أين تتوقف.</h3><p>بوابات الاعتماد وأقفال الفترات والضوابط غير القابلة للتفاوض تبقى في مكانها.</p></div>
              </article>
              <article>
                <div><h3>اترك سجلًا واضحًا.</h3><p>التوصية، والقرار المتخذ، والتعليل وراءه: كلها ظاهرة ومحفوظة.</p></div>
              </article>
              <p className="hw-control-more">{/* AR-REVIEW: link to the trust page */}
              <a className="hw-textlink" href="/ar/trust">اقرأ التزاماتنا بشأن البيانات والتحكم <span aria-hidden="true">←</span></a></p>
            </div>
          </div>
        </section>

        {/* ── 9. للمكاتب المهنية (AR-REVIEW) ── */}
        <section id="firms" className="hw-firms">
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">للمكاتب المهنية</p>
                <h2>مكتبك يبيع الحكم المهني.<br /><span>والوكلاء يحملون الملف.</span></h2>
              </div>
              <p>لمكاتب الضرائب والاستشارات، ولمكاتب التدقيق المرخّصة. استخدم أيًّا من المنتجين وحده، أو كليهما معًا.</p>
            </div>
            <div className="hw-firms-grid" data-reveal="stagger-lg">
              <article>
                <p className="hw-eyebrow">لمكاتب الضرائب والاستشارات</p>
                <h3 lang="en">Hysaab Practice</h3>
                <Shot file="p-practice.png" title="نظرة عامة على المكتب في Hysaab Practice" alt="نظرة عامة على المكتب في Hysaab Practice: الأتعاب والإقرارات المنجزة والعمل المفتوح والمخاطر في لمحة واحدة. بيانات تجريبية." caption="نظرة عامة على المكتب في Hysaab Practice، بيانات تجريبية." pending="لقطة منصة الإقرارات في Hysaab Practice قيد الإعداد." locale="ar" />
                <ul className="hw-ticks">
                  <li>مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات في كل إقرار</li>
                  <li>معالجات مقترحة من سوابق مكتبك</li>
                  <li>مراجعة نقدية قبل أن يعتمد الشريك</li>
                </ul>
                <a className="hw-link hw-link--ruled" href="/ar/firms">شاهد Hysaab Practice <span aria-hidden="true">←</span></a>
              </article>
              <article>
                <p className="hw-eyebrow">لمكاتب التدقيق المرخّصة</p>
                <h3 lang="en">Hysaab Audit</h3>
                <Shot file="p-audit-jet.png" title="اختبار قيود اليومية في Hysaab Audit" alt="اختبار قيود اليومية في Hysaab Audit: كل قيد مُقيَّم وفق ثلاثين معيارًا، مع المعايير التي انطبقت على كل قيد. بيانات تجريبية." caption="اختبار قيود اليومية على ارتباط تجريبي، بيانات تجريبية." locale="ar" />
                <ul className="hw-ticks">
                  <li>كل قيد مُقيَّم، لا عينة تُختار بالنظر</li>
                  <li>العينات تُصمَّم وتُختار وتُقيَّم بالشيفرة</li>
                  <li>يستنتج شريك مرخّص ويوقّع. ولا يوقّع Hysaab أبدًا.</li>
                </ul>
                <a className="hw-link hw-link--ruled" href="/audit">شاهد Hysaab Audit (بالإنجليزية) <span aria-hidden="true">←</span></a>
              </article>
            </div>
            <p className="hw-firms-trust" data-reveal="">عملاؤك يبقون عملاءك. <a className="hw-link hw-link--ruled" href="/ar/trust">اقرأ التزاماتنا تجاه المكاتب <span aria-hidden="true">←</span></a></p>
          </div>
        </section>

        {/* ── 10. طرق العمل ── */}
        <section id="ways" className="hw-ways">
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">طرق العمل</p>
                <h2>فريقك، موسَّعًا.</h2>
              </div>
              <p>أبقِ العمل داخل شركتك، أو استعن بفريقنا.</p>
            </div>
            <div className="hw-ways-grid" data-reveal="stagger-lg">
              <article>
                <p className="hw-eyebrow">لفريقك المالي الحالي</p>
                <h3>شغّله مع فريقك.</h3>
                <p>يستخدم فريقك المالي Hysaab لإعداد الدفاتر والتحقيق في الاستثناءات والبقاء قريبًا من الأرقام.</p>
                <a href="#conversation" className="hw-link hw-link--ruled">ناقش سير عمل فريقك <span aria-hidden="true">↗</span></a>
              </article>
              <article>
                <p className="hw-eyebrow">للشركات التي تريد دعمًا أكبر</p>
                {/* AR-REVIEW: "We run it with you" */}
                <h3>ندير العمل معك.</h3>
                <p>يدير محاسبو Oblique قائمة العمل ويجهّزون الإقفال معك، مستخدمين Hysaab كل يوم. للشركات المتوسطة والكبيرة.</p>
                <a href="#conversation" className="hw-link hw-link--ruled">ناقش الدعم المُدار <span aria-hidden="true">↗</span></a>
              </article>
            </div>
          </div>
        </section>

        {/* ── 11. قصتنا (AR-REVIEW: replaces the team section) ── */}
        <section id="team" className="hw-team hw-origin-story">
          <span id="origin" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">من أين جاء Hysaab</p>
                <h2>أدّينا العمل<br />قبل أن نبني المنتج.</h2>
              </div>
              <p>نشأ Hysaab من أعمال الضرائب والمحاسبة التي تؤديها Oblique Consult لشركات الخليج، وهندسته Simpla. بنينا الوكلاء للعمل الذي كنا نؤديه بأيدينا.</p>
            </div>
            <div className="hw-team-orgs">
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
            <div className="hw-team-grid hw-team-grid--founders" data-reveal="stagger">
              {TEAM.map((p) => (
                <article key={p.name}>
                  <span className="hw-team-initials" aria-hidden="true">{p.initials}</span>
                  <h3 lang="en">{p.name}</h3>
                  <p className="hw-team-role">{p.ar.role} · {p.ar.org}</p>
                  {p.ar.bio && <p>{p.ar.bio}</p>}
                </article>
              ))}
            </div>
            <p className="hw-origin-more" data-reveal=""><a className="hw-link hw-link--ruled" href="/ar/about">اقرأ القصة كاملة <span aria-hidden="true">←</span></a></p>
          </div>
        </section>

        {/* ── 12. فحص الدفاتر (AR-REVIEW) ── */}
        <section className="hw-trycheck" aria-labelledby="hw-trycheck-h">
          <div className="hw-wrap hw-trycheck-grid">
            <div data-reveal="">
              <p className="hw-eyebrow">لست مستعدًا لعرض تجريبي؟</p>
              <h2 id="hw-trycheck-h">افحص <em>دفاترك</em> مجانًا.</h2>
            </div>
            <div className="hw-trycheck-side" data-reveal="stagger-lg">
              <p>اربط Xero أو QuickBooks، وشاهد ما يجده Hysaab في دقيقة تقريبًا. للقراءة فقط. الأداة بالإنجليزية.</p>
              <a className="hw-btn hw-btn--navy m-cta m-cta--sage m-magnetic" href="/check"><SwapLabel text="افحص دفاتري" whole /> <span aria-hidden="true">←</span></a>
            </div>
          </div>
        </section>

        {/* ── 13. احجز عرضًا تجريبيًا (AR-REVIEW: heading, body, direct link) ── */}
        <section className="hw-conversation" id="conversation">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <span id="ledger" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-conversation-grid" data-reveal="stagger-lg">
            <div>
              <p className="hw-eyebrow">حوار، لا عرض مبيعات</p>
              <h2>احجز عرضًا<br />تجريبيًا.</h2>
              <p>أخبرنا من أنت وما الذي يستغرق وقتًا أطول مما ينبغي.<br />وسنريك أين يناسبك Hysaab.</p>
              <p className="hw-demo-direct">تفضّل أن تختار الموعد بنفسك؟ <a className="hw-link hw-link--ruled" {...DEMO}>اختر موعدًا في تقويمنا <span aria-hidden="true">↗</span>{newTab}</a></p>
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
        </section>
      </main>

      <SiteFooter home locale="ar" />
    </div>
  );
}
