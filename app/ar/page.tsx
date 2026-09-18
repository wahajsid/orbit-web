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
import { loadMoments, loadHeroCapture } from "@/lib/home-moments";
import { langAlternates } from "@/lib/site-meta";
import { Demo } from "@/components/hysaab/Demo";
import { SiteFooter } from "@/components/home/SiteFooter";
import { LaunchNotice } from "@/components/home/LaunchNotice";
import { TEAM } from "@/lib/team";

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
  const hero = loadHeroCapture();
  const pendingCount = moments.filter((m) => !m.ready).length;

  return (
    <div className="hw-page" id="top">
      <a href="#main" className="hw-skip">تخطَّ إلى المحتوى</a>
      <HomeHeader locale="ar" />

      <main id="main">
        {/* ── البطل ── */}
        <section className="hw-hero">
          <div className="hw-wrap hw-hero-grid">
            <div className="hw-hero-copy">
              <p className="hw-eyebrow hw-eyebrow--dot"><span className="hw-dot" aria-hidden="true" /> عناية هادئة، كل صباح</p>
              <h1>دفاترك<br />في نصابها.<br /><span>وذهنك<br />فيما هو آت.</span></h1>
              <p className="hw-intro">الدفاتر مُعدّة.<br />والقرارات لك.</p>
              <p className="hw-hero-desc">تعرّف على Hysaab: فريق محاسبة وتقارير لشركات الخليج، مبني على الأدلة والحكم المهني والإشراف البشري الذي تستحقه دفاترك. أرسل مستندًا أو اطرح سؤالًا عبر واتساب، ويتولى Hysaab الباقي.</p>
              <div className="hw-actions">
                <a className="hw-btn hw-btn--peach" href="#conversation">احجز جولة تعريفية <span aria-hidden="true">↗</span></a>
                <a className="hw-link hw-link--light" href="#experience"><span className="hw-play" aria-hidden="true">▷</span> شاهد كيف يعمل</a>
              </div>
              <LaunchNotice locale="ar" />
              <p className="hw-origin"><span aria-hidden="true">✳</span> صُنع في دبي. يفهم يوم عملك.</p>
            </div>
            <div className="hw-proof">
              <p className="hw-eyebrow">فريقك المالي. على بُعد محادثة واحدة.</p>
              <h2>يبدأ الأمر<br />برسالة واتساب.</h2>
              <p className="hw-proof-p">أرسل الفاتورة. اطرح السؤال.<br />وواصل يومك.</p>
              <Capture moment={hero} priority locale="ar" />
              {hero.ready && <p className="hw-proof-note">استلام المستندات في مساحة العمل، بيانات تجريبية: ما وصل، والقناة التي وصل منها.</p>}
            </div>
          </div>
        </section>

        {/* ── في هذه الصفحة ── */}
        <nav className="hw-subnav" aria-label="في هذه الصفحة">
          <div className="hw-wrap hw-subnav-in">
            <a href="#experience"><span className="hw-mono">01</span>التجربة</a>
            <a href="#control"><span className="hw-mono">02</span>تحكّمك</a>
            <a href="#ways"><span className="hw-mono">03</span>طرق العمل</a>
            <a href="#team"><span className="hw-mono">04</span>الفريق</a>
            <a href="#products"><span className="hw-mono">05</span>منتجاتنا</a>
          </div>
        </nav>

        {/* ── شريط العبارة ── */}
        <div className="hw-band">
          <div className="hw-wrap hw-band-in">
            <p>نظامك المحاسبي يحفظ السجلات.<br /><strong>وHysaab يستخلص معناها.</strong></p>
            <p className="hw-band-note">المستندات تصل.<br />والإجابات تتبعها.<br /><span>وأنت تبقى في موقع التحكم.</span></p>
            <span className="hw-band-symbol" aria-hidden="true">↗</span>
          </div>
        </div>

        {/* ── الشريط الحي ── */}
        <section className="hw-live" id="live">
          <div className="hw-wrap hw-live-grid">
            <div className="hw-live-copy">
              <p className="hw-eyebrow">بينما كنت بعيدًا</p>
              <h2>ليلة واحدة<br />على مجموعة دفاتر.</h2>
              <p>كل مستند قُرئ، وكل سطر طُوبق، وكل تذكير أُرسل. والقرار الوحيد الذي يخصك ينتظرك في الصباح.</p>
              <p className="hw-live-note">ليلة توضيحية. الأسماء والأرقام أمثلة، لا نتائج.</p>
            </div>
            <div className="hy-ticker hw-live-ticker" aria-label="مباشرة من الوكلاء">
              <div className="hy-ticker-head">
                <span className="hy-ticker-dot" aria-hidden="true" />
                <span className="hy-ticker-kicker">مباشرة من الوكلاء</span>
                <span className="hy-ticker-when">الليلة · دبي</span>
              </div>
              <div className="hy-ticker-body">
                <div className="hy-ticker-scroll">
                  {[false, true].map((dup) => (
                    <ul className="hy-ticker-list" key={String(dup)} aria-hidden={dup || undefined}>
                      {TICKER.map((r) => (
                        <li className={`hy-ticker-row${r.ask ? " hy-ticker-row--ask" : ""}`} key={r.t + r.who}>
                          <span className="hy-ticker-t hy-num">{r.t}</span>
                          <span className="hy-ticker-msg"><strong>{r.who}</strong> {r.msg}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
                <div className="hy-ticker-fade" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* ── كيف يعمل ── */}
        <section className="hw-work" id="how-it-works">
          <div className="hw-wrap hw-section">
            <div className="hw-heading">
              <div>
                <p className="hw-eyebrow">كيف يعمل</p>
                <h2>فقط تحدّث.<br />وHysaab يباشر العمل.</h2>
              </div>
              <p>نساعدك على ربط دفاترك والاتفاق على قواعد الاعتماد. بعدها تصبح نقطة انطلاقك اليومية واتساب، ومساحة العمل حاضرة متى أردت النظر عن قرب.</p>
            </div>
            <div className="hw-workflow">
              <article>
                <div className="hw-workflow-top"><span className="hw-icon" aria-hidden="true">↳</span><span className="hw-mono">01</span></div>
                <h3>ترسل رسالة.</h3>
                <p>إيصال أو فاتورة أو سؤال عن أرقامك. لا حاجة لتعلّم أداة تقارير.</p>
                <span className="hw-workflow-foot">واتساب ← Hysaab</span>
              </article>
              <article>
                <div className="hw-workflow-top"><span className="hw-icon" aria-hidden="true">≋</span><span className="hw-mono">02</span></div>
                <h3>Hysaab يُعدّ العمل.</h3>
                <p>تُفحص المستندات، وتُعدّ القيود، وتُعاد الاستثناءات إليك مع تفسير واضح.</p>
                <span className="hw-workflow-foot">الإعداد ← المراجعة</span>
              </article>
              <article>
                <div className="hw-workflow-top"><span className="hw-icon" aria-hidden="true">↗</span><span className="hw-mono">03</span></div>
                <h3>أنت تتخذ القرارات.</h3>
                <p>تجيب عن سؤال أو تراجع اعتمادًا. حدودك تبقى سارية، والتعليل يبقى مع الدفاتر.</p>
                <span className="hw-workflow-foot">قرارك ← سجل واضح</span>
              </article>
            </div>
          </div>
        </section>

        {/* ── خمس لحظات: العرض التفاعلي ── */}
        <section id="experience" className="hw-experience">
          <div className="hw-wrap hw-section">
            <div className="hw-heading">
              <div>
                <p className="hw-eyebrow">خمس لحظات في يوم عملك</p>
                <h2>محادثة واحدة.<br /><span>من الإيصال إلى التقرير.</span></h2>
              </div>
              <p>تابع فاتورة واحدة عبر خمس لحظات، من صورة في التاسعة مساءً إلى فترة مقفلة. يُعاد العرض تلقائيًا؛ انقر أي لحظة أو تبويب لتتولى التحكم.</p>
            </div>
            <Demo locale="ar" />
            <p className="hw-disclosure">سيناريو توضيحي. راشد يدير شركة تجارية؛ ليلى مديرته المالية؛ نور تمسك الدفاتر. الأرقام أمثلة، لا نتائج.</p>

            <div className="hw-shots">
              <h3>داخل مساحة العمل الحقيقية.</h3>
              <div className="hw-shots-grid">
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

        {/* ── تحكّمك ── */}
        <section className="hw-control" id="control">
          <div className="hw-wrap hw-section hw-control-grid">
            <div>
              <p className="hw-eyebrow">تحكّمك</p>
              <h2>حكمك.<br />حدودك.<br /><span>دائمًا.</span></h2>
              <p>الأدوات الجيدة تجعل الإشراف على المالية أسهل.<br />لا تفسيرها أصعب.</p>
              <a className="hw-link hw-link--peach" href="#conversation">ناقش ضوابطك معنا <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hw-principles">
              <article>
                <span className="hw-mono">01</span>
                <div><h3>كل إجابة قابلة للتتبع.</h3><p>افحص القيود والمستندات وراء كل إجابة. التفسير الذي يمكنك التحقق منه أثمن من تفسير يُطلب منك تصديقه.</p></div>
              </article>
              <article>
                <span className="hw-mono">02</span>
                <div><h3>اعرف أين تتوقف.</h3><p>بوابات الاعتماد وأقفال الفترات والضوابط غير القابلة للتفاوض تبقى في مكانها. الراحة ليست سببًا لتجاوز ضمانة.</p></div>
              </article>
              <article>
                <span className="hw-mono">03</span>
                <div><h3>اترك سجلًا واضحًا.</h3><p>التوصية، والقرار المتخذ، والتعليل وراءه: كلها ظاهرة ومحفوظة. السياق مكانه مع الدفاتر، لا في محادثة منفصلة.</p></div>
              </article>
            </div>
          </div>
        </section>

        {/* ── طرق العمل ── */}
        <section id="ways" className="hw-ways">
          <div className="hw-wrap hw-section">
            <div className="hw-heading">
              <div>
                <p className="hw-eyebrow">طرق العمل</p>
                <h2>فريقك، موسَّعًا.</h2>
              </div>
              <p>أبقِ العمل داخل شركتك، أو استعن بفريقنا. ابدأ بالعملية التي تحتاج إلى أكبر قدر من الاهتمام.</p>
            </div>
            <div className="hw-ways-grid">
              <article>
                <p className="hw-eyebrow">لفريقك المالي الحالي</p>
                <h3>شغّله مع فريقك.</h3>
                <p>يستخدم فريقك المالي Hysaab لإعداد الدفاتر والتحقيق في الاستثناءات والبقاء قريبًا من الأرقام.</p>
                <ul>
                  <li>فريقك يراجع ويعتمد</li>
                  <li>ابدأ بسير عمل محاسبي محدد</li>
                  <li>أبقِ الحكم المهني داخل فريقك</li>
                </ul>
                <a href="#conversation" className="hw-link hw-link--ruled">ناقش سير عمل فريقك <span aria-hidden="true">↗</span></a>
              </article>
              <article>
                <p className="hw-eyebrow">للشركات التي تريد دعمًا أكبر</p>
                <h3>استعن بفريقنا.</h3>
                <p>اعمل جنبًا إلى جنب مع محاسبين مؤهلين يديرون سير العمل ويراجعون الاستثناءات ويُعدّون كل إقفال معك.</p>
                <ul>
                  <li>جهة اتصال بشرية مسمّاة</li>
                  <li>نتفق على النطاق والمسؤوليات معًا</li>
                  <li>تحتفظ بالقرارات التي تخصك</li>
                </ul>
                <a href="#conversation" className="hw-link hw-link--ruled">ناقش الدعم المُدار <span aria-hidden="true">↗</span></a>
              </article>
            </div>
            <div className="hw-fit">
              <span className="hw-mono">قبل أن نبدأ</span>
              <p>نؤكد نظامك المحاسبي ومنشآتك والنطاق والأتعاب مسبقًا. الملاءمة الواضحة تسبق أي التزام.</p>
            </div>
          </div>
        </section>

        {/* ── الفريق ── */}
        <section id="team" className="hw-team">
          <div className="hw-wrap hw-section">
            <div className="hw-heading">
              <div>
                <p className="hw-eyebrow">الفريق</p>
                <h2>الفريق وراء Hysaab.</h2>
              </div>
              <p>Hysaab يبنيه ويديره فريقان: محاسبو Oblique Consult ومهندسو Simpla. هؤلاء هم الأشخاص الذين يديرونه؛ وفرقهم تتولى العمل اليومي على دفاترك.</p>
            </div>
            <div className="hw-team-orgs">
              <a href="https://obliqueconsult.com" target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/partners/oblique-consult.svg" alt="Oblique Consult" width={1011} height={386} loading="lazy" />
                <span><strong>Oblique Consult</strong>استشارات ضريبية ومحاسبية. دبي، منذ 2018. المحاسبون وراء Hysaab.</span>
              </a>
              <a href="https://www.simpla.ai" target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/partners/simpla.png" alt="Simpla" width={1024} height={304} loading="lazy" />
                <span><strong>Simpla</strong>ذكاء اصطناعي للضرائب والمحاسبة. دبي. المهندسون وراء Hysaab.</span>
              </a>
            </div>
            <div className="hw-team-grid">
              {TEAM.map((p) => (
                <article key={p.name}>
                  <span className="hw-team-initials" aria-hidden="true">{p.initials}</span>
                  <h3 lang="en">{p.name}</h3>
                  <p className="hw-team-role">{p.ar.role} · {p.ar.org}</p>
                  {p.ar.bio && <p>{p.ar.bio}</p>}
                  <a href={p.href} target="_blank" rel="noopener">{p.linkLabel} <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
            <div className="hw-note">
              <span className="hw-mono">كيف يُنجز العمل</span>
              <p>Hysaab يُعدّ القيود والاستحقاقات والتقارير. في الخدمة المُدارة يراجع محاسبون من فريق Oblique Consult الاستثناءات ويصححون عند الحاجة ويُعدّون الإقفال معك، مع محاسب مسمّى كجهة اتصالك، وتبقى الاعتمادات التي تخصك بيدك. الأدوار والخبرات أعلاه كما نشرتها <a href="https://obliqueconsult.com/about-us" target="_blank" rel="noopener">Oblique Consult</a> وكما تظهر في الملفات المهنية العامة للأفراد.</p>
            </div>
          </div>
        </section>

        {/* ── عائلة Hysaab ── */}
        <section id="products" className="hw-products">
          <span id="family" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-section">
            <div className="hw-heading">
              <div>
                <p className="hw-eyebrow">عائلة Hysaab</p>
                <h2>أفضل معًا.<br /><span>ونافعة كلٌّ على حدة.</span></h2>
              </div>
              <p>المحاسبة، وفحص الفواتير، وتشغيل المكاتب المهنية، والتدقيق، والكفاءات المالية. منتجات متكاملة من الفريق نفسه، ولكل منها مهمة واضحة.</p>
            </div>
            <div className="hw-family">
              <article className="hw-family-primary">
                <p className="hw-eyebrow">المحاسبة والتقارير · وصول مبكر</p>
                <h3><Wordmark size={50} ground="navy" /></h3>
                <p>محاسبتك وتقاريرك اليومية، مع الحكم البشري حيث يهم.</p>
                <a className="hw-link hw-link--peach" href="#experience">استكشف Hysaab <span aria-hidden="true">↗</span></a>
              </article>
              <article>
                <p className="hw-eyebrow">معالجة الفواتير · متاح</p>
                <h3>hysaab invoice</h3>
                <p>يقرأ فواتير الموردين ويفحصها، مع كشف التكرار وذكر سبب إيقاف أي بند للمراجعة.</p>
                <a className="hw-link" href="/ar/invoice">استكشف Invoice <span aria-hidden="true">↗</span></a>
              </article>
              <article>
                <p className="hw-eyebrow">تشغيل المكاتب المهنية · قريبًا</p>
                <h3>hysaab services OS</h3>
                <p>ارتباطات العملاء والمواعيد النهائية والإشراف لمكاتب الخدمات المهنية، في مكان واحد.</p>
                <a className="hw-link" href="/ar/firms">استكشف Services OS <span aria-hidden="true">↗</span></a>
              </article>
              <article>
                <p className="hw-eyebrow">التدقيق · قريبًا</p>
                <h3>hysaab audit</h3>
                <p>إعداد التدقيق وأدلته داخل Services OS. المهنيون المرخصون يحتفظون بالاستنتاجات والرأي.</p>
                <a className="hw-link" href="/audit">استكشف Audit <span aria-hidden="true">↗</span><span className="hw-sr"> (بالإنجليزية)</span></a>
              </article>
              <article>
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
          <div className="hw-wrap hw-conversation-grid">
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
