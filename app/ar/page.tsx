import "../advert.css";
import { LedgerForm } from "@/components/LedgerForm";
import { SmoothScroll } from "@/components/SmoothScroll";
import { NpEnhance } from "@/components/NpEnhance";
import { AgentFeed } from "@/components/AgentFeed";
import { Countdown } from "@/components/Countdown";
import { Mark, MgNav, MgFooter } from "@/components/MgChrome";
import { getNextSeat, FOUNDING_SEATS } from "@/lib/launch";
import { langAlternates } from "@/lib/site-meta";

export const revalidate = 60;

export const metadata = {
  title: "Orbit — وكلاء ذكاء اصطناعي يديرون ماليتك. وأنت توافق على القرارات.",
  description:
    "ستة عشر وكيلًا يقرؤون فواتيرك، ويرمّزون دفتر الأستاذ، ويراقبون ضريبة القيمة المضافة، ويقودون الإقفال الشهري — ويتوقفون ليسألوك عندما يلزم الأمر. بُني في الخليج، على يد محاسبين عاشوا كل ليلة متأخرة منه.",
  alternates: langAlternates("/"),
};

/* ── الخطوات الأربع ("كيف يعمل أوربت") ─────────────────────────────── */
const STEPS: { n: string; h: string; p: string }[] = [
  { n: "01", h: "أرسل أي شيء، بأي طريقة", p: "صورة عبر واتساب، بريد مُعاد توجيهه، ملف PDF. أوربت يؤرشفه، ويزيل التكرار، ويبدأ القراءة." },
  { n: "02", h: "الوكلاء يقرؤون ويرمّزون", p: "استخراج البيانات، وترميز الحسابات من سجلّك أنت، وفحوص ضريبة القيمة المضافة، وكشف التكرار — في دقائق، لا في نهاية الشهر." },
  { n: "03", h: "أنت تتخذ القرارات القليلة", p: "كل ما هو دون عتبة الثقة يصلك كقرار بلغة واضحة مع الأدلة مرفقة." },
  { n: "04", h: "الفترة تُقفل نفسها", p: "الاستحقاقات والإهلاك والجداول تُرحَّل في موعدها. عندما تخضرّ القائمة، تُقفل الفترة وتُقيَّد — خلال أيام." },
];

/* ── فريق الوكلاء ──────────────────────────────────────────────────── */
const AGENTS: { h: string; p: string; green?: boolean }[] = [
  { h: "وكيل الترميز", p: "يرمّز كل سطر من سجل ترحيلاتك أنت. ويسأل عندما لا يكون متأكدًا." },
  { h: "وكيل الضرائب", p: "يختبر كل فاتورة وفق المادة 59 الإماراتية قبل المطالبة بضريبة المدخلات." },
  { h: "محرك الاستحقاقات", p: "يتعلم إيقاع فوترة كل مورد؛ ويقترح الاستحقاقات عندما تغيب الفواتير." },
  { h: "وكيل الشذوذ", p: "يراقب أسعار الوحدات ووتيرتها؛ ويرصد الزيادات قبل مواعيد التجديد." },
  { h: "وكيل مطابقة البنك", p: "يقيّم ويطابق كل سطر بنكي مع مستنده، حتى الكسور العشرية." },
  { h: "وكيل الجداول", p: "يحرّر المدفوعات المسبقة والقيود الدورية في مواعيدها، مع التعليقات." },
  { h: "وكيل التحصيل", p: "يصيغ التذكيرات ويرسلها بوتيرة توافق عليها مرة واحدة." },
  { h: "…وتسعة آخرون", p: "التكرارات، والإهلاك، والانحرافات، والاستقبال، والإرسال.", green: true },
];

const COMPLIANCE: { h: string; p: string }[] = [
  { h: "اختبار الفاتورة الضريبية وفق المادة 59", p: "على كل فاتورة واردة — الرقم الضريبي والنسب والتقريب." },
  { h: "جاهز للفوترة الإلكترونية", p: "قبل موعد الإلزام في الإمارات." },
  { h: "أقفال الفترات", p: "لا يستطيع الوكلاء تجاوزها — المقفل يبقى مقفلًا." },
  { h: "سجل تدقيق كامل", p: "كل إجراء، بشريًا كان أم آليًا، مسجل مع أدلته." },
];

export default async function Page() {
  const seat = await getNextSeat();

  return (
    <>
      <SmoothScroll />

      <MgNav locale="ar" />

      <main>
        {/* ══ البطل المنقسم — العنوان والإحصاءات على الورق؛ نموذج قمرة
            الإقفال بظله الأخضر المزاح على الأرضية المخططة ══ */}
        <section className="mg-hero">
          <div className="mg-hero-copy">
            <div className="mg-kicker">نظام التشغيل المالي · الإمارات والخليج</div>
            <h1 className="mg-hero-h">وكلاء ذكاء اصطناعي يديرون ماليتك. وأنت توافق على القرارات.</h1>
            <p className="mg-hero-p">ستة عشر وكيلًا يقرؤون فواتيرك، ويرمّزون دفتر الأستاذ، ويراقبون ضريبة القيمة المضافة، ويقودون الإقفال — ويتوقفون ليسألوك عندما يهم الأمر. إجابات واضحة، وأدلة كاملة، في كل مرة.</p>
            <div className="mg-hero-cta">
              <a href="#join" className="mg-cta">احجز عرضًا ←</a>
              <a href="#how" className="mg-ghost">شاهد كيف يعمل</a>
            </div>
            <div className="mg-stats">
              <div><div className="mg-stat-n">16</div><div className="mg-stat-l">وكيلًا على دفاترك</div></div>
              <div><div className="mg-stat-n">93%</div><div className="mg-stat-l">من القيود تُرحَّل دون تدخل</div></div>
              <div><div className="mg-stat-n">3 أيام</div><div className="mg-stat-l">حتى فترة مقفلة</div></div>
            </div>
          </div>
          <div className="mg-hero-mock-slot">
            <div className="mg-mock">
              <div className="mg-mock-head">
                <Mark size={16} framed={false} strokeWidth={3} ringOnly />
                <span className="mg-mock-title">قمرة الإقفال — يونيو 2026</span>
                <span className="mg-mock-pct">اكتمل 68%</span>
              </div>
              <div className="mg-mock-body">
                <div className="mg-mock-bar"><div /></div>
                <div className="mg-mock-meta">
                  <span>الاستحقاقات · 2 بانتظارك</span>
                  <span>ضريبة القيمة المضافة 118 ألف درهم — تُستحق 28 يوليو</span>
                </div>
                <div className="mg-mock-row">
                  <span className="mg-mock-tag mg-mock-tag-crit">حرج</span>
                  <div><b>فترتان مفقودتان — ألياف اتصالات.</b> اقتُرح استحقاقان موسميان، 2,150 درهم لكل منهما. <span className="mg-mock-cta">تأكيد ←</span></div>
                </div>
                <div className="mg-mock-row">
                  <span className="mg-mock-tag mg-mock-tag-crit">حرج</span>
                  <div><b>فاتورة ضريبية بلا رقم تسجيل — المراعي.</b> ‏1,036 درهم ضريبة مدخلات موقوفة حتى التصحيح. <span className="mg-mock-cta">مراجعة ←</span></div>
                </div>
                <div className="mg-mock-row mg-mock-row-done">
                  <span className="mg-mock-tag mg-mock-tag-done">تم</span>
                  <div>تم ترحيل الإهلاك — جميع الفئات، 21,408 درهم · وكيل الأصول الثابتة</div>
                </div>
                <button type="button" className="mg-mock-lock">أقفل الفترة</button>
              </div>
            </div>
          </div>
        </section>

        {/* ══ مباشر من الوكلاء — الشريط المتحرك ══ */}
        <AgentFeed locale="ar" />

        {/* ══ كيف يعمل أوربت ══ */}
        <section id="how" className="mg-section">
          <div className="mg-kicker">كيف يعمل أوربت</div>
          <h2 className="mg-h2">من صورة فاتورة إلى فترة مقفلة.</h2>
          <div className="mg-steps">
            {STEPS.map((s) => (
              <div key={s.n} className="mg-step">
                <div className="mg-step-n">{s.n}</div>
                <div className="mg-step-h">{s.h}</div>
                <div className="mg-step-p">{s.p}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ الفريق ══ */}
        <section id="agents" className="mg-section">
          <div className="mg-roster-head">
            <div>
              <div className="mg-kicker">الفريق</div>
              <h2 className="mg-h2">ستة عشر متخصصًا. صفر موظفين إضافيين.</h2>
            </div>
            <p className="mg-roster-lede">كل وكيل يؤدي مهمة واحدة، ويشرح نفسه، ويحيل إليك كل ما هو غير مؤكد. عيّنة من الفريق:</p>
          </div>
          <div className="mg-roster">
            {AGENTS.map((a) => (
              <div key={a.h} className={a.green ? "mg-agent mg-agent-green" : "mg-agent"}>
                <div className="mg-agent-h">{a.h}</div>
                <div className="mg-agent-p">
                  {a.p}{a.green && <> <a href="/ar/accounting" className="mg-agent-cta">تعرّف على الفريق كاملًا ←</a></>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ شريط الامتثال ══ */}
        <section id="compliance" className="mg-compliance">
          <div className="mg-compliance-copy">
            <div className="mg-kicker mg-kicker-on-ink">مصمم لهيئة الضرائب</div>
            <h2 className="mg-h2 mg-h2-on-ink">الامتثال ليس ميزة. إنه الوضع الافتراضي.</h2>
            <p className="mg-compliance-p">كل مستند يُختبر وفق قواعد ضريبة القيمة المضافة الإماراتية قبل أن يتحرك درهم واحد. كل قيد يحمل تعليق وكيله والدليل المصدر. وعندما يسأل المدقق، تسلّمه السجل الكامل — لا صندوق أوراق.</p>
          </div>
          <ul className="mg-compliance-list">
            {COMPLIANCE.map((c) => (
              <li key={c.h}><span className="mg-check">✓</span><div><b>{c.h}</b> {c.p}</div></li>
            ))}
          </ul>
        </section>

        {/* ══ الملصق ══ */}
        <section className="mg-poster">
          <h2 className="mg-poster-h">الإقفال ينتهي في أيام. وأمسياتك تعود إليك.</h2>
          <div className="mg-poster-cta">
            <a href="#join" className="mg-cta mg-cta-on-green">احجز عرضًا ←</a>
            <a href="/ar/product" className="mg-ghost mg-ghost-on-green">استكشف المنتج</a>
          </div>
        </section>

        {/* ══ عائلة أوربت ══ */}
        <section id="products" className="mg-section">
          <div className="mg-kicker">عائلة أوربت</div>
          <h2 className="mg-h2">أربعة عوالم. كون واحد.</h2>
          <div className="mg-worlds">
            <a href="/ar/accounting" className="mg-world">
              <div className="mg-kicker mg-kicker-tight">المحاسبة</div>
              <div className="mg-world-h">Orbit</div>
              <p>تعيد عائشة توجيه فاتورة مورد من واتساب في التاسعة مساءً. ومع شروق الشمس تكون الفاتورة مرمّزة من سجلها هي، ومختبرة وفق قواعد الهيئة الاتحادية للضرائب، ومطابقة مع السطر البنكي، ومرحّلة إلى Zoho — دون أن تلمسها.</p>
              <p className="mg-world-met">إقفال الشهر في يومين بدل 9 · 100% من السطور مُختبرة ضريبيًا · نحو 4,200 درهم من الضريبة المخفية تُكتشف شهريًا.</p>
              <span className="mg-world-go">شاهد Orbit ←</span>
            </a>
            <a href="/ar/hire" className="mg-world">
              <div className="mg-kicker mg-kicker-tight">التوظيف</div>
              <div className="mg-world-h">Orbit Hire</div>
              <p>‏52 سيرة ذاتية تصل صباح الثلاثاء. بحلول الغداء يكون أوربت قد قرأها جميعًا، وقيّمها وفق معاييرك، وأخفى الأسماء والصور، ووضع ثلاثة أشخاص على مكتبك للمقابلة — ليلى وعمر وبريا.</p>
              <p className="mg-world-met">‏50 سيرة تُقرأ في دقائق لا في أسبوع · لكل مرشح مقابلة أولى حقيقية · تقييم يمكنك الدفاع عنه.</p>
              <span className="mg-world-go">شاهد Orbit Hire ←</span>
            </a>
            <a href="/ar/invoice" className="mg-world">
              <div className="mg-kicker mg-kicker-tight">الفواتير · الامتثال الضريبي</div>
              <div className="mg-world-h">Orbit Invoice</div>
              <p>مجلد فيه 214 فاتورة مورد يصل في التاسعة صباحًا. وبحلول 9:20 تكون كل واحدة قد قُرئت، وأُعيد فحص حسابها برمجيًا، واختُبرت وفق قواعد الهيئة وهيئة الزكاة «زاتكا»، ورُتبت حسب المخاطر — والفواتير التسع التي سترسب في التدقيق مُعلَّمة قبل تقديم الإقرار.</p>
              <p className="mg-world-met">كل فاتورة مختبرة ضريبيًا · قواعد الإمارات والسعودية · الضريبة الخطرة تُحجز قبل المطالبة بها.</p>
              <span className="mg-world-go">شاهد Orbit Invoice ←</span>
            </a>
            <a href="/ar/firms" className="mg-world">
              <div className="mg-kicker mg-kicker-tight">للمكاتب · قريبًا</div>
              <div className="mg-world-h">Orbit for Firms</div>
              <p>كل عميل وارتباط وإقرار في مكان واحد. يسجل راشد ساعة على ارتباط ضريبة ELC Group بنقرة واحدة؛ والمصروف يقع على العميل الصحيح؛ ونسبة التحقق لكل ارتباط — بلا جداول بيانات.</p>
              <p className="mg-world-met">سجلات الوقت، وتتبع المشاريع والمصروفات، والمكتب كله — منظم.</p>
              <span className="mg-world-go">شاهد Orbit for Firms ←</span>
            </a>
          </div>
        </section>

        {/* ══ الانضمام — نموذج الدفعة المؤسسة ══ */}
        <section id="join" className="mg-section">
          <div className="mg-kicker">انضم إلى الدفعة المؤسسة</div>
          <h2 className="mg-h2">تعال ابنِ هذا الكون معنا.</h2>
          <p className="mg-lede">
            هذا أكبر من برنامج — إنه رهان على ما يفعله الناس بوقتهم حين يختفي العمل الروتيني. أول {FOUNDING_SEATS} شركة تحصل على اثني عشر شهرًا مجانًا، مع تثبيت سعر المؤسسين بعد ذلك. بريد العمل فقط — شخص حقيقي يقرأ كل قيد.
          </p>
          <div className="mg-join">
            <LedgerForm seat={seat} locale="ar" />
          </div>
        </section>

        {/* ══ الساعة — العد التنازلي ══ */}
        <Countdown locale="ar" />
      </main>

      <MgFooter locale="ar" />

      <NpEnhance />
    </>
  );
}
