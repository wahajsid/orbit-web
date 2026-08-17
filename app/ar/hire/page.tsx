import Image from "next/image";
import "../../advert.css";
import { HireTerminal } from "@/components/HireTerminal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { NpEnhance } from "@/components/NpEnhance";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Orbit Hire — تقابل ثلاثة، لا ثلاثين",
  description:
    "المنتج الشقيق لـ Orbit. توظيف بالذكاء الاصطناعي للخليج: يقرأ كل طلب، ويجري مقابلة صوتية مع كل مرشح، ويسلّمك قائمة مختصرة مرتّبة يمكنك الدفاع عنها — إنصاف بالتصميم.",
  alternates: langAlternates("/hire"),
};

const HEADLINES: [string, string][] = [
  ["لم تنشر وظيفة", "لتقرأ ثلاثمئة سيرة ذاتية."],
  ["لم تكن تريد سيرة ذاتية.", "كنت تريد الإنسان."],
  ["لم يكن هدفك يومًا", "أن توظّف على الحدس."],
];

export default function HirePage() {
  return (
    <>
      <SmoothScroll />

      <MgNav locale="ar" />

      {/* ── البطل (الحبر) ──────────────────────────────────────── */}
      <header className="hero-band on-ink np-hero" id="top">
        <div className="wrap">
          <div style={{ paddingTop: 40 }}>
            <div className="microlabel hero-kicker">‏ORBIT HIRE · المنتج الشقيق لـ Orbit</div>
            <RotatingHeadline items={HEADLINES} />
            <p className="hero-sub" style={{ maxWidth: 580 }}>
              ‏Orbit Hire يقرأ كل طلب، ويجري مقابلة صوتية مع كل مرشح، ويسلّمك قائمة
              مختصرة مرتّبة يمكنك الدفاع عنها — إنصاف بالتصميم، من أول سيرة ذاتية.
            </p>
            <a className="np-scrollcue" href="#live" aria-label="شاهد كيف يعمل">
              <span className="tri">▶</span>
              <span className="lab">كيف يعمل Orbit Hire</span>
              <span className="chev" aria-hidden="true">↓</span>
            </a>
            <div className="hero-actions">
              <a className="cta" href="#access">اطلب وصولًا مبكرًا</a>
              <a className="np-backlink" href="/ar">→ جزء من عائلة Orbit</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ── مباشر: طرفية خط أنابيب التوظيف ──────────────────── */}
        <section className="section wrap np-after-hero" id="live" style={{ paddingTop: 96 }}>
          <div dir="ltr" className="ltr-embed">
            <HireTerminal />
          </div>
        </section>

        {/* ── فصل · الكومة ──────────────────────────────────────── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">الكومة</div>
            <h2 className="np-head np-rise d1">ليست لديك مشكلة توظيف. <span className="np-accent">لديك مشكلة قراءة.</span></h2>
            <div className="np-statrow np-rise d1">
              <span className="np-stat"><span className="n">52</span><span className="l">طلبًا، من أربع قنوات</span></span>
              <span className="np-arrow">←</span>
              <span className="np-stat"><span className="n">8</span><span className="l">مرتّبون على الأدلة</span></span>
              <span className="np-arrow">←</span>
              <span className="np-stat"><span className="n">3</span><span className="l">تقابلهم فعلًا</span></span>
            </div>
            <p className="np-say np-rise d2">
              كل طلب يُقرأ صباح وصوله — تُستخرج مهاراته وأدلته، ويُقيَّم وفق بطاقة
              التقييم الخاصة بك، ثم يُرتَّب. العمل الروتيني الذي كان يلتهم أسبوعًا كاملًا
              ينتهي قبل أن تبرد قهوتك.
            </p>
            <div className="np-shot np-rise d1">
              <Image src="/shots/hire-dashboard.jpg" alt="Orbit Hire — الوظائف المفتوحة مع قنوات الفرز وأعداد القوائم المختصرة" width={1600} height={782} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">الوظائف — قناة كل دور وقائمته المختصرة، بنظرة واحدة.</div>
          </div>
        </section>

        {/* ── فصل · الإنصاف بالتصميم ────────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">الإنصاف بالتصميم</div>
            <h2 className="np-head np-rise d1">يزن العمل. <span className="np-accent">ولا يرى الاسم أبدًا.</span></h2>
            <p className="np-say np-rise d1">
              الخصائص المحمية تُختم قبل تقييم أي مرشح — فالنموذج لا يستطيع أن يزن ما لا
              يراه. لا تفتح ختم السيرة الذاتية إلا حين تختار ذلك، وكل درجة تبقى قابلة
              للتتبع. توظيف يمكنك الدفاع عنه، مبني في الأساس، لا مُلحق لاحقًا.
            </p>
            <div className="np-fair np-rise d2">
              <div className="np-fair-col see">
                <h4>ما يزنه أوربت</h4>
                <p className="cap2">الأدلة التي تتنبأ بالأداء في الوظيفة</p>
                <div className="np-fair-row"><span className="ic">✓</span> مهارات مطابقة لبطاقة التقييم</div>
                <div className="np-fair-row"><span className="ic">✓</span> أدلة في العمل نفسه</div>
                <div className="np-fair-row"><span className="ic">✓</span> كفايات الدور، مقيَّمة وفق معاييرك</div>
                <div className="np-fair-row"><span className="ic">✓</span> الإجابات المقدَّمة في المقابلة</div>
              </div>
              <div className="np-fair-col seal">
                <h4>ما يختمه أوربت</h4>
                <p className="cap2">تُخزَّن كفئات، ولا توزن أبدًا</p>
                <div className="np-fair-row sealed"><span className="ic">✕</span> الاسم&nbsp;&nbsp;<span className="val">Aisha Al-Farsi</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> العمر&nbsp;&nbsp;<span className="val">31 years</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> الجنسية&nbsp;&nbsp;<span className="val">Emirati</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> الصورة&nbsp;&nbsp;<span className="val">portrait.jpg</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── فصل · المقابلة ─────────────────────────────────────── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">المقابلة</div>
            <h2 className="np-head np-rise d1">كل مرشح يحصل على <span className="np-accent">مقابلة أولى حقيقية.</span></h2>
            <p className="np-say np-rise d1">
              محادثة صوتية ودودة ومنظمة في كفاياتك أنت — يرحّب، ويسأل، ويتابع، ولا
              يتعب عند المرشح الأربعين. يفرّغ نصه بنفسه ويقيّم وفق معاييرك، فتكون
              الأدلة على الطاولة، لا في ذاكرة أحد.
            </p>
            <div className="np-script np-rise d2" aria-label="مقتطف من المقابلة">
              <div><span className="meta">‏10:21</span> <span className="who">أوربت</span> «حدّثني عن إقفال شهري توليته من أوله إلى آخره.»</div>
              <div><span className="meta">‏10:21</span> <span className="you">المرشح</span> «بالتأكيد — أدرت الإقفال لثلاث شركات…»</div>
              <div><span className="meta">‏10:22</span> <span className="who">أوربت</span> متابعة · «كيف تعاملت مع استبعادات المعاملات البينية؟»</div>
              <div><span className="meta">‏10:23</span> <span className="who">التقييم</span> <span className="you">تحمّل المسؤولية 4/5 · الجانب التقني 5/5 · التواصل 4/5</span></div>
            </div>
            <div className="np-shot np-rise d1">
              <Image src="/shots/hire-analysis.jpg" alt="تحليل مقابلة Orbit Hire — تقييم القدرات والمهارات الشخصية عبر مخطط راداري وبطاقة تقييم ولوحة المقيّم" width={1600} height={1826} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">تحليل المقابلة — تقييم القدرات والمهارات الشخصية، ولكل درجة دليلها.</div>
          </div>
        </section>

        {/* ── فصل · القائمة المختصرة ─────────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">القائمة المختصرة</div>
            <h2 className="np-head np-rise d1">تقابل ثلاثة، <span className="np-accent">لا ثلاثين.</span></h2>
            <p className="np-say np-rise d1">
              ثلاثة مرشحين نهائيين، لكل منهم موجز من صفحة واحدة: مواطن قوته، وأين
              يكمن الخطر، والأسئلة التي عليك طرحها تاليًا بالضبط. المنطق كله على
              الطاولة — ومعه سجل التدقيق خلف كل درجة.
            </p>
            <div className="np-chips np-rise d2">
              <span className="np-chip"><span className="k">المرشح النهائي 1</span><span className="b">عمق تقني · فجوة في النطاق · اختبر القيادة</span></span>
              <span className="np-chip"><span className="k">المرشح النهائي 2</span><span className="b">تحمّل مسؤولية قوي · حديث عهد بضرائب الخليج · اختبر ضريبة القيمة المضافة</span></span>
              <span className="np-chip"><span className="k">المرشح النهائي 3</span><span className="b">سريع التعلم · أدلة ضئيلة · اطلب نماذج عمل</span></span>
            </div>
            <div className="np-shot np-rise d1">
              <Image src="/shots/hire-scoring.jpg" alt="المرشحون المرتّبون في Orbit Hire — درجات لكل معيار، ومستوى الثقة، والإشارات الحمراء، وكتلة الثقة والإنصاف" width={1600} height={1444} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">المرشحون المرتّبون — كل درجة مفسَّرة، والخصائص المحمية مختومة.</div>
            <div className="np-shot np-rise d1">
              <Image src="/shots/hire-radar.jpg" alt="مقارنة المرشحين في Orbit Hire — مخطط راداري متراكب ومصفوفة بطاقات تقييم عبر المرشحين النهائيين" width={1600} height={1681} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">قارن المرشحين النهائيين جنبًا إلى جنب — رادار وبطاقة تقييم مشتركان، والأفضل في كل صف مُبرز.</div>
          </div>
        </section>

        {/* ── لماذا بنينا هذا (شريط الحبر) ────────────────────────── */}
        <section className="why-band on-ink" style={{ marginTop: 0 }}>
          <div className="wrap">
            <div className="microlabel hero-kicker np-rise">لماذا بنينا هذا</div>
            <h2 className="why-head np-rise d1">سئمنا توظيفًا يفوز فيه<br />من يرفع صوته أعلى.</h2>
            <div className="why-cols np-rise d1">
              <p>
                يضيع الأكفاء في الكومة لأن لا أحد يملك الوقت ليقرأ ثلاثمئة سيرة ذاتية
                بإنصاف — فينجرف التوظيف نحو الاسم المألوف، والمتحدث الواثق، وحكم
                الحدس. مرشحون جيدون لا يحصلون على المحادثة أصلًا، والانحياز الذي لم
                يقصده أحد يتولى الاختيار في صمت.
              </p>
              <p>
                لذلك بنينا أداة الفرز التي طالما تمنيناها: أداة تقرأ <strong>كل</strong> طلب
                على الأدلة، وتمنح <strong>كل</strong> مرشح مقابلة أولى حقيقية، وتختم
                التفاصيل التي لا ينبغي أن ترجّح قرار توظيف — ثم تعيد الحكم، وسجل
                التدقيق، إليك أنت.
              </p>
            </div>
            <div className="why-sig np-rise">&mdash; SRW</div>
          </div>
        </section>

        {/* ── الوصول المبكر ────────────────────────────────────────── */}
        <section className="section wrap" id="access">
          <h2 className="section-head">كن أول من يوظّف مع Orbit.</h2>
          <p className="section-sub">
            ‏Orbit Hire يفتح أبوابه لدفعة أولى صغيرة من الفرق الخليجية. أخبرنا عمّن
            توظّف وسندخلك مبكرًا.
          </p>
          <div className="hero-actions" style={{ marginTop: 26 }}>
            <a className="cta" href="/ar/contact">اطلب وصولًا مبكرًا</a>
            <a className="textlink" href="/ar" style={{ fontSize: 13.5 }}>تبحث عن نظام التشغيل المالي؟ Orbit هنا ←</a>
          </div>
        </section>
      </main>

      <MgFooter locale="ar" />
      <NpEnhance />
    </>
  );
}
