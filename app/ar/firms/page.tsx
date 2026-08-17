import "../../advert.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { NpEnhance } from "@/components/NpEnhance";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Orbit for Firms — نظام التشغيل لمكاتب الخدمات المهنية",
  description:
    "قريبًا. نظام التشغيل لمكاتب الضرائب والمحاسبة — العملاء، والارتباطات، وأوراق العمل، والإقرارات، والمهام، وفريقك، تُدار كوحدة واحدة، والذكاء الاصطناعي منسوج في كل جزء.",
  alternates: langAlternates("/firms"),
};

const HEADLINES: [string, string][] = [
  ["لم تبنِ مكتبك", "لتلاحق خطابات الارتباط."],
  ["لم تتدرب سنوات", "لتعيش في المجلدات المشتركة."],
  ["لم تؤسس مكتبًا", "ليفوتك موعد تقديم إقرار."],
];

const FEATURES: { k: string; h: string; p: string }[] = [
  { k: "العملاء", h: "العملاء والمجموعات والمذكرات", p: "كل عميل ومجموعة وجهة اتصال في مكان واحد — مع مذكرات قابلة للبحث موسومة بضريبة القيمة المضافة أو ضريبة الشركات أو عام، فلا يغادر السياقُ المكتبَ مع الشخص الذي كان يحمله." },
  { k: "الارتباطات", h: "الارتباطات وقائمة طلبات المعلومات", p: "ضريبة القيمة المضافة الشهرية، وضريبة الشركات السنوية، والاستشارات — كل ارتباط يحمل أوراق عمله وقائمة طلبات المعلومات الخاصة به، من العرض إلى خطاب الارتباط إلى التنفيذ." },
  { k: "سجلات الوقت", h: "الوقت، مسجل على العمل نفسه", p: "سجّل ساعة على عميل أو ارتباط بنقرة واحدة — دون تطبيق منفصل لسجلات الوقت. وشاهد نسبة التحقق لكل ارتباط ولكل شخص، دون بناء جدول بيانات." },
  { k: "المشاريع", h: "المصروفات وتكاليف المشاريع", p: "تتبّع النثريات والمصروفات وتكلفة الخدمة على العميل والارتباط الصحيحين — فلا تبقى التكلفة الفعلية لأي مهمة لغزًا في نهايتها." },
  { k: "الإقرارات", h: "إقرارات لا تفوت أبدًا", p: "كل موعد نهائي مُتتبَّع ويُصعَّد مع اقترابه. الرقيب الذي يعني أن موعد الإقرار لن يفاجئك مرة أخرى — مع أوراق العمل مرتبطة به." },
  { k: "المساعد الذكي", h: "اسأل عن أي عميل", p: "وكلاء منسوجون في كل مكان: ملخصات للعملاء عند الطلب، وقراءة ضوئية لما ترفعه، والمسائل التي تحتاج نظرة شريك تُرفع إليك مبكرًا." },
];

export default function FirmsPage() {
  return (
    <div className="prod-firms">
      <SmoothScroll />

      <MgNav locale="ar" />

      {/* ── البطل (على الحبر) ─────────────────────────────────────── */}
      <header className="hero-band on-ink np-hero" id="top">
        <div className="wrap">
          <div style={{ paddingTop: 40 }}>
            <div className="np-soon"><span className="dot" /> ‏Orbit for Firms · قريبًا</div>
            <RotatingHeadline items={HEADLINES} />
            <p className="hero-sub" style={{ maxWidth: 600 }}>
              ‏Orbit for Firms هو نظام التشغيل لمكاتب الضرائب والمحاسبة — العملاء،
              والارتباطات، وسجلات الوقت، والإقرارات، والمصروفات، وفريقك، تُدار كوحدة واحدة،
              والوكلاء يتولون العمل الروتيني. بناه مكتب خليجي عاش الفوضى بنفسه.
            </p>
            <a className="np-scrollcue" href="#what" aria-label="شاهد ما يفعله">
              <span className="tri">▶</span>
              <span className="lab">ماذا يفعل Orbit for Firms</span>
              <span className="chev" aria-hidden="true">↓</span>
            </a>
            <div className="hero-actions">
              <a className="cta" href="#access">احصل على وصول مبكر</a>
              <span className="mono hero-seat">نفتح الأبواب لدفعة أولى صغيرة</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ── المشكلة ───────────────────────────────────────────────── */}
        <section className="np-act np-band-ink" style={{ paddingTop: 100 }} id="what">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">المكتب</div>
            <h2 className="np-head np-rise d1">المكتب يقوم على الحُكم المهني. <span className="np-accent">ويغرق في الأعمال الإدارية.</span></h2>
            <p className="np-say np-rise d1">
              عملاء مبعثرون بين البريد والمجلدات. خطابات ارتباط تُلاحق يدويًا.
              أوراق عمل على مساحة مشتركة لا يثق بها أحد. تقويم إقرارات في ثلاثة أماكن.
              والمشورة التي يدفع عملاؤك مقابلها هي آخر ما يجد أحدٌ وقتًا له. ‏Orbit for
              Firms يضع المكتب كله في مكان واحد — ليتوقف العمل الروتيني عن التهام العمل الحقيقي.
            </p>
          </div>
        </section>

        {/* ── ماذا يفعل (شبكة الميزات) ──────────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">مكان واحد للمكتب كله</div>
            <h2 className="np-head np-rise d1">كل عميل، وكل ارتباط، <span className="np-accent">وكل إقرار.</span></h2>
            <p className="np-say np-rise d1">
              العملاء، والارتباطات، وسجلات الوقت، والإقرارات، وأوراق العمل، والمصروفات، وفريقك —
              منظمة في هيكل واحد نظيف، فلا يبقى شيء يتيمًا أبدًا، وتاريخ العميل كله
              على بُعد نقرة من العمل الذي أمامك.
            </p>
            <div className="np-features np-rise d1">
              {FEATURES.map((f) => (
                <div key={f.k} className="np-feat">
                  <div className="k">{f.k}</div>
                  <h3>{f.h}</h3>
                  <p>{f.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── الهيكل (تسلسل هرمي بدل لقطة شاشة) ─────────────────────── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">الهيكل</div>
            <h2 className="np-head np-rise d1">من المجموعة نزولًا إلى <span className="np-accent">الإقرار.</span></h2>
            <p className="np-say np-rise d1">
              كل شيء معلّق على تسلسل هرمي نظيف — فلا يبقى شيء يتيمًا أبدًا، وتاريخ
              العميل كله على بُعد نقرة واحدة من العمل الذي أمامك.
            </p>
            <div className="np-tree np-rise d1">
              <div className="row"><span className="tag">المجموعة</span><span className="name">ELC Group</span><span className="meta">· 4 كيانات</span></div>
              <div className="row l1"><span className="tag">العميل</span><span className="name">Richemont Middle East FZE</span><span className="meta">· نشط · ضريبة القيمة المضافة + ضريبة الشركات</span></div>
              <div className="row l2"><span className="tag">الارتباط</span><span className="name">ضريبة القيمة المضافة — شهري</span><span className="meta">· أوراق العمل · قائمة طلبات المعلومات · 12 إقرارًا</span></div>
              <div className="row l2"><span className="tag">الارتباط</span><span className="name">ضريبة الشركات — السنة المالية 2025</span><span className="meta">· عرض ← خطاب ارتباط</span></div>
              <div className="row l1"><span className="tag">العميل</span><span className="name">Corniche Capital Ltd</span><span className="meta">· استكشاف ← عرض</span></div>
              <div className="row l2"><span className="tag">الإقرار</span><span className="name">ضريبة القيمة المضافة — الربع الثاني 2026 · تُستحق 28 يوليو</span><span className="meta">· ‏T-14 · أوراق العمل مرتبطة</span></div>
            </div>
          </div>
        </section>

        {/* ── الرؤية / المنتجات الثلاثة ─────────────────────────────── */}
        <section className="why-band on-ink" style={{ marginTop: 0 }}>
          <div className="wrap">
            <div className="microlabel hero-kicker np-rise">الصورة الأكبر</div>
            <h2 className="why-head np-rise d1">ثلاثة منتجات.<br />مهمة واحدة.</h2>
            <div className="why-cols np-rise d1">
              <p>
                نحن نغيّر الطريقة التي تُنجز بها الضرائب والمحاسبة والخدمات المحيطة بهما في
                الخليج — على يد محاسبين عاشوا كل ليلة متأخرة منها، لا مهندسين
                يخمّنون. ‏Orbit يدير الدفاتر. ‏Orbit&nbsp;Hire يدير التوظيف. ‏Orbit&nbsp;for&nbsp;Firms
                يدير المكتب نفسه.
              </p>
              <p>
                عائلة واحدة، وتصميم واحد، ومعيار واحد: البرنامج يؤدي العمل الروتيني ويُظهر
                أدلته — ويبقى الحُكم المهني، وعلاقة العميل، لك أنت. ‏Orbit for Firms
                هو الأحدث بين الثلاثة، وأبوابه تُفتح قريبًا.
              </p>
            </div>
            <div className="hero-actions np-rise" style={{ marginTop: 26 }}>
              <a className="textlink" href="/ar" style={{ fontSize: 13.5 }}>‏Orbit — نظام التشغيل المالي ←</a>
              <a className="textlink" href="/ar/hire" style={{ fontSize: 13.5 }}>‏Orbit Hire — نظام تشغيل التوظيف ←</a>
            </div>
          </div>
        </section>

        {/* ── الوصول المبكر ─────────────────────────────────────────── */}
        <section className="section wrap" id="access">
          <div className="np-soon" style={{ color: "var(--brass-deep)", borderColor: "var(--hairline)" }}><span className="dot" style={{ background: "var(--brass)", boxShadow: "none" }} /> قريبًا</div>
          <h2 className="section-head">كن أول من يدخل.</h2>
          <p className="section-sub">
            يفتح Orbit for Firms أبوابه لدفعة أولى صغيرة من مكاتب الخليج. حدّثنا عن مكتبك
            وسندخلك مبكرًا — بشروط المؤسسين.
          </p>
          <div className="hero-actions" style={{ marginTop: 26 }}>
            <a className="cta" href="/ar/contact">اطلب وصولًا مبكرًا</a>
            <a className="textlink" href="/ar" style={{ fontSize: 13.5 }}>تبحث عن نظام التشغيل المالي؟ Orbit هنا ←</a>
          </div>
        </section>
      </main>

      <MgFooter locale="ar" />
      <NpEnhance />
    </div>
  );
}
