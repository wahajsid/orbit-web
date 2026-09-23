/* ── الصفحة الرئيسية العربية ──────────────────────────────────────────
   Arabic twin of app/(en)/page.tsx in the same design (2026-09-18): the
   same sections in the same order, translated, sharing the components,
   the captures (lib/home-moments.ts, with Arabic captions here) and the
   team data (lib/team.ts). Brand and system names stay Latin; digits
   stay Latin; WhatsApp is واتساب in prose. */

import { Wordmark } from "@/components/Wordmark";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Capture } from "@/components/home/Capture";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { loadMoments } from "@/lib/home-moments";
import { langAlternates } from "@/lib/site-meta";
import { Demo } from "@/components/hysaab/Demo";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TEAM } from "@/lib/team";
import { KineticLines, Mark, SwapLabel } from "@/components/motion/Kinetic";
import { ActivityFeed } from "@/components/home/ActivityFeed";
import { PeachScroller } from "@/components/home/PeachScroller";

export const metadata = {
  title: "برنامج محاسبة بالذكاء الاصطناعي للإمارات والسعودية | Hysaab",
  description:
    "فريق محاسبة وتقارير لشركات الخليج: فواتير مرمّزة ومختبرة ضريبيًا، إقفال شهري مُعدّ، وقرارات تبقى بيدك. صُنع في دبي.",
  alternates: langAlternates("/"),
};

/* الشريط الحي: الصفوف نفسها التي في الصفحة الإنجليزية */
const TICKER: { t: string; who: string; msg: string; ask?: boolean }[] = [
  { t: "21:00", who: "وكيل الاستلام", msg: "استلم صورة عبر واتساب من راشد. Gulf Technical Supplies، INV-4471." },
  { t: "21:01", who: "وكيل الضرائب", msg: "معايير الفاتورة الضريبية مستوفاة · رقم التسجيل الضريبي صحيح · ضريبة 199.50 قابلة للاسترداد." },
  { t: "21:02", who: "وكيل الترميز", msg: "معدات تقنية · مكتب دبي، بثقة 96% من 31 قيدًا مشابهًا. رُحّل القيد J-2291 إلى Zoho Books." },
  { t: "21:40", who: "مراقبة التكرار", msg: "وصلت INV-4471 مرة أخرى بالبريد. دُمجت ولم تُرحَّل مرتين." },
  { t: "23:15", who: "وكيل التحصيل", msg: "أُرسل التذكير 2 من 3 إلى ELC Group. الفاتورة SI-1187 متأخرة 12 يومًا." },
  { t: "06:05", who: "وكيل مطابقة البنك", msg: "طُوبق 312 من 314 سطرًا مع مستنداتها خلال الليل." },
  { t: "06:06", who: "قرار لليلى", msg: "الشيك 100421 · 250 درهمًا صُرف بلا مستند. نسألك.", ask: true },
  { t: "06:30", who: "وكيل الإقفال", msg: "حُرّر إيجار Knight Frank · الشهر 3 من 12. قائمة الإقفال 68%." },
  { t: "06:45", who: "وكيل التقارير", msg: "أُعيد بناء حزمة سبتمبر. هامش الربح الإجمالي انخفض 2.1 نقطة، والتفسير مرفق." },
];

/* شريط العبارات: the old band's own lines, now on the peach scroller */
const STATEMENTS = [
  "نظامك المحاسبي يحفظ السجلات.",
  "وHysaab يستخلص معناها.",
  "المستندات تصل.",
  "والإجابات تتبعها.",
  "وأنت تبقى في موقع التحكم.",
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

export default function Page() {
  const moments = loadMoments();
  const pendingCount = moments.filter((m) => !m.ready).length;

  return (
    <div className="hw-page" id="top">
      <a href="#main" className="hw-skip">تخطَّ إلى المحتوى</a>
      <span data-motion-page="full" hidden />
      <HomeHeader locale="ar" />

      <main id="main">
        {/* ── البطل: same structure as the English homepage ── */}
        <section className="hw-hero">
          <div className="hw-wrap hw-hero-grid">
            <div className="hw-hero-copy m-enter">
              <p className="hw-eyebrow"><span className="hw-dot" aria-hidden="true" /> عناية هادئة، كل صباح</p>
              <h1><KineticLines delay={120} lines={[<>دفاترك</>, <>في نصابها.</>, <><Mark at={900}>وذهنك</Mark></>, <>فيما هو آت.</>]} /></h1>
              <p className="hw-hero-desc">الدفاتر مُعدّة. والقرارات لك.</p>
              <div className="hw-actions">
                <a className="hw-btn hw-btn--blush m-cta m-magnetic" href="#conversation"><SwapLabel text="احجز جولة تعريفية" whole /> <span aria-hidden="true">↗</span></a>
                <a className="hw-link hw-link--ruled" href="#experience">شاهد كيف يعمل <span aria-hidden="true">←</span></a>
              </div>
              <p className="hw-origin"><span aria-hidden="true">✳</span> صُنع في دبي. يفهم يوم عملك.</p>
            </div>
            <ActivityFeed rows={TICKER} locale="ar" />
          </div>
        </section>

        {/* ── في هذه الصفحة ── */}
        <nav className="hw-subnav" aria-label="في هذه الصفحة">
          <div className="hw-wrap hw-subnav-in">
            <a href="#experience"><span className="hw-mono">01</span><span>التجربة</span></a>
            <a href="#control"><span className="hw-mono">02</span><span>تحكّمك</span></a>
            <a href="#ways"><span className="hw-mono">03</span><span>طرق العمل</span></a>
            <a href="#team"><span className="hw-mono">04</span><span>الفريق</span></a>
            <a href="#products"><span className="hw-mono">05</span><span>منتجاتنا</span></a>
          </div>
        </nav>

        {/* ── شريط العبارة ── */}
        <PeachScroller phrases={STATEMENTS} />

        {/* ── كيف يعمل ── */}
        <section className="hw-work" id="how-it-works">
          <div className="hw-wrap hw-section">
            <div className="hw-work-grid">
              <div className="hw-heading" data-reveal="">
                <p className="hw-eyebrow">كيف يعمل</p>
                <h2>فقط تحدّث.<br />وHysaab يباشر العمل.</h2>
                <p>نساعدك على ربط دفاترك والاتفاق على قواعد الاعتماد.</p>
              </div>
              <div className="hw-workflow" data-reveal="stagger-lg">
                <article>
                  <span className="hw-workflow-num" aria-hidden="true">01</span>
                  <h3>ترسل رسالة.</h3>
                  <p>إيصال أو فاتورة أو سؤال عن أرقامك. لا حاجة لتعلّم أداة تقارير.</p>
                </article>
                <article>
                  <span className="hw-workflow-num" aria-hidden="true">02</span>
                  <h3>Hysaab يُعدّ العمل.</h3>
                  <p>تُفحص المستندات، وتُعدّ القيود، وتُعاد الاستثناءات إليك مع تفسير واضح.</p>
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

        {/* ── خمس لحظات: العرض التفاعلي ── */}
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
            <p className="hw-disclosure">سيناريو توضيحي. راشد يدير شركة تجارية؛ ليلى مديرته المالية؛ نور تمسك الدفاتر. الأرقام أمثلة، لا نتائج.</p>

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
                  <a className="hw-link hw-link--ruled" href="#conversation">تجوّل فيها معنا <span aria-hidden="true">↗</span></a>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* ── تحكّمك (navy) ── */}
        <section className="hw-control" id="control">
          <div className="hw-wrap hw-control-grid">
            <div data-reveal="">
              <p className="hw-eyebrow">تحكّمك</p>
              <h2>حكمك.<br />حدودك.<br />دائمًا.</h2>
              <p>الأدوات الجيدة تجعل الإشراف على المالية أسهل، لا تفسيرها أصعب.</p>
              <a className="hw-textlink" href="#conversation">ناقش ضوابطك معنا <span aria-hidden="true">↗</span></a>
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
            </div>
          </div>
        </section>

        {/* ── طرق العمل ── */}
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
                <h3>استعن بفريقنا.</h3>
                <p>اعمل جنبًا إلى جنب مع محاسبين مؤهلين يديرون سير العمل ويراجعون الاستثناءات ويُعدّون كل إقفال معك.</p>
                <a href="#conversation" className="hw-link hw-link--ruled">ناقش الدعم المُدار <span aria-hidden="true">↗</span></a>
              </article>
            </div>
          </div>
        </section>

        {/* ── الفريق ── */}
        <section id="team" className="hw-team">
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">الفريق</p>
                <h2>الفريق وراء Hysaab.</h2>
              </div>
              <p>Hysaab يبنيه ويديره فريقان: محاسبو Oblique Consult ومهندسو Simpla.</p>
            </div>
            <div className="hw-team-grid" data-reveal="stagger">
              {TEAM.map((p) => (
                <article key={p.name}>
                  <h3 lang="en">{p.name}</h3>
                  <p className="hw-team-role">{p.ar.role} · {p.ar.org}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── عائلة Hysaab ── */}
        <section id="products" className="hw-products">
          <span id="family" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">عائلة Hysaab</p>
                <h2>أفضل معًا.<br /><span>ونافعة كلٌّ على حدة.</span></h2>
              </div>
              <p>المحاسبة، وفحص الفواتير، وتشغيل المكاتب المهنية، والتدقيق، والكفاءات المالية. منتجات متكاملة من الفريق نفسه، ولكل منها مهمة واضحة.</p>
            </div>
            <div className="hw-family" data-reveal="stagger">
              <article className="hw-family-primary m-sweep">
                <p className="hw-eyebrow">المحاسبة والتقارير · وصول مبكر</p>
                <h3><Wordmark size={50} ground="light" /></h3>
                <p>محاسبتك وتقاريرك اليومية، مع الحكم البشري حيث يهم.</p>
                <a className="hw-link hw-link--peach" href="#experience">استكشف Hysaab <span aria-hidden="true">↗</span></a>
              </article>
              <article className="m-sweep">
                <p className="hw-eyebrow">معالجة الفواتير · متاح</p>
                <h3>hysaab invoice</h3>
                <p>يقرأ فواتير الموردين ويفحصها، مع كشف التكرار وذكر سبب إيقاف أي بند للمراجعة.</p>
                <a className="hw-link" href="/ar/invoice">استكشف Invoice <span aria-hidden="true">↗</span></a>
              </article>
              <article className="m-sweep">
                <p className="hw-eyebrow">تشغيل المكاتب المهنية · قريبًا</p>
                <h3>hysaab services OS</h3>
                <p>ارتباطات العملاء والمواعيد النهائية والإشراف لمكاتب الخدمات المهنية، في مكان واحد.</p>
                <a className="hw-link" href="/ar/firms">استكشف Services OS <span aria-hidden="true">↗</span></a>
              </article>
              <article className="m-sweep">
                <p className="hw-eyebrow">التدقيق · قريبًا</p>
                <h3>hysaab audit</h3>
                <p>إعداد التدقيق وأدلته داخل Services OS. المهنيون المرخصون يحتفظون بالاستنتاجات والرأي.</p>
                <a className="hw-link" href="/audit">استكشف Audit <span aria-hidden="true">↗</span><span className="hw-sr"> (بالإنجليزية)</span></a>
              </article>
              <article className="m-sweep">
                <p className="hw-eyebrow">الكفاءات المالية · متاح</p>
                <h3>Ibtidah</h3>
                <p>اعثر على كفاءات مالية عبر تقييم قائم على العمل، ويتولى مهنيون ذوو خبرة إعداد القائمة المختصرة.</p>
                <a className="hw-link" href="https://ibtidah.ae" target="_blank" rel="noopener">تعرّف على Ibtidah <span aria-hidden="true">↗</span><span className="hw-sr"> (يفتح في تبويب جديد)</span></a>
              </article>
            </div>
          </div>
        </section>

        {/* ── التواصل ── */}
        <section className="hw-conversation" id="conversation">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <span id="ledger" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-conversation-grid" data-reveal="stagger-lg">
            <div>
              <p className="hw-eyebrow">حوار، لا عرض مبيعات</p>
              <h2>لنبدأ<br />بدفاترك.</h2>
              <p>أخبرنا بما يستغرق وقتًا أطول مما ينبغي.<br />وسنريك أين يناسبك Hysaab.</p>
              <div className="hw-agenda">
                <span className="hw-mono">محادثتك الأولى</span>
                <ol>
                  <li><span className="hw-mono">01</span> سير عملك الحالي</li>
                  <li><span className="hw-mono">02</span> جولة مركزة في المنتج</li>
                  <li><span className="hw-mono">03</span> الملاءمة والنطاق والخطوات التالية</li>
                </ol>
              </div>
            </div>
            <EnquiryForm source="Arabic homepage" locale="ar" />
          </div>
        </section>
      </main>

      <SiteFooter home locale="ar" />
    </div>
  );
}
