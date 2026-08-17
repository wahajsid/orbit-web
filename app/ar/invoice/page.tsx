import "../../advert.css";
import { InvoiceTerminal } from "@/components/InvoiceTerminal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { NpEnhance } from "@/components/NpEnhance";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Orbit Invoice — كل فاتورة مورد، مختبرة ضريبيًا قبل المطالبة",
  description:
    "أداة الامتثال الضريبي والتحقق من الفوترة الإلكترونية للخليج. يقرأ Orbit Invoice كل فاتورة مورد، ويعيد فحص الحساب، ويختبرها وفق قواعد الهيئة الاتحادية للضرائب في الإمارات وهيئة الزكاة والضريبة والجمارك «زاتكا» في السعودية، ويرتّب ضريبة القيمة المضافة التي توشك على المطالبة بها حسب المخاطر.",
  alternates: langAlternates("/invoice"),
};

const HEADLINES: [string, string][] = [
  ["كل فاتورة تدّعي أنها", "فاتورة ضريبية. وليست كلها كذلك."],
  ["الهيئة الاتحادية للضرائب ستختبر فواتيرك.", "اختبرها أنت أولًا."],
  ["لم تتدرب عقدًا من الزمن", "لتعيد جمع ضريبة حسبها غيرك."],
];

export default function InvoicePage() {
  return (
    <>
      <SmoothScroll />

      <MgNav locale="ar" />

      {/* ── البطل (على الحبر) ──────────────────────────────────── */}
      <header className="hero-band on-ink np-hero" id="top">
        <div className="wrap">
          <div style={{ paddingTop: 40 }}>
            <div className="microlabel hero-kicker">‏ORBIT INVOICE · الامتثال الضريبي والتحقق من الفوترة الإلكترونية</div>
            <RotatingHeadline items={HEADLINES} />
            <p className="hero-sub" style={{ maxWidth: 600 }}>
              أسقط مجلدًا من فواتير الموردين — أو أرسلها بالبريد. يقرأ Orbit Invoice كل
              سطر، ويعيد فحص الحساب بنفسه، ويختبر كل فاتورة وفق قواعد الهيئة الاتحادية
              للضرائب وهيئة الزكاة والضريبة والجمارك «زاتكا»، ويرتّب ضريبة القيمة المضافة
              التي توشك على المطالبة بها حسب المخاطر — قبل تقديم الإقرار، لا بعد التدقيق.
            </p>
            <a className="np-scrollcue" href="#live" aria-label="شاهد كيف يعمل">
              <span className="tri">▶</span>
              <span className="lab">كيف يعمل Orbit Invoice</span>
              <span className="chev" aria-hidden="true">↓</span>
            </a>
            <div className="hero-actions">
              <a className="cta" href="#access">اطلب الوصول</a>
              <a className="np-backlink" href="/ar">→ جزء من عائلة Orbit</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ── مباشر: طرفية التحقق ─────────────────────────────────── */}
        <section className="section wrap np-after-hero" id="live" style={{ paddingTop: 96 }}>
          <div dir="ltr" className="ltr-embed">
            <InvoiceTerminal />
          </div>
        </section>

        {/* ── الفصل · الانكشاف ────────────────────────────────────── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">الانكشاف</div>
            <h2 className="np-head np-rise d1">ضريبة المدخلات ليست لك <span className="np-accent">حتى تصمد الفاتورة.</span></h2>
            <div className="np-statrow np-rise d1">
              <span className="np-stat"><span className="n">214</span><span className="l">فاتورة، أُسقطت في مجلد أو وصلت بالبريد</span></span>
              <span className="np-arrow">←</span>
              <span className="np-stat"><span className="n">100%</span><span className="l">قُرئت وأُعيد جمعها واختُبرت ضريبيًا</span></span>
              <span className="np-arrow">←</span>
              <span className="np-stat"><span className="n">9</span><span className="l">عُلّمت قبل خروج الإقرار</span></span>
            </div>
            <p className="np-say np-rise d2">
              قوة المطالبة من قوة الورق الذي يسندها. رقم ضريبي مفقود، أو مورد احتسب
              النسبة الخطأ، أو فاتورة مكررة تسللت مرتين — كل واحدة منها مالُك المعرَّض
              للخطر عند التدقيق. يقرأ Orbit كل فاتورة يوم وصولها ويسمّي الحقل الراسب
              بالضبط، فتصبح المشكلة طلب تصحيح في يوليو، لا مطالبة مرفوضة في تدقيق ضريبي.
            </p>
          </div>
        </section>

        {/* ── الفصل · القانون، كودًا ──────────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">القانون، كودًا</div>
            <h2 className="np-head np-rise d1">القواعد التي تطبّقها الهيئة الاتحادية للضرائب، <span className="np-accent">تعمل على كل فاتورة.</span></h2>
            <p className="np-say np-rise d1">
              متطلبات الفاتورة الضريبية الإماراتية (المادة 59/60) وقواعد الفوترة
              الإلكترونية لدى هيئة الزكاة والضريبة والجمارك «زاتكا» في السعودية، مطبَّقة
              فاتورةً فاتورة — والحساب يُعاد فحصه برمجيًا بشكل مستقل، فحتى فاتورة أنيقة
              التنسيق لا يستقيم جمعها تُلتقط أيضًا.
            </p>
            <div className="np-fair np-rise d2">
              <div className="np-fair-col see">
                <h4>ما تُظهره الفاتورة الصحيحة</h4>
                <p className="cap2">تُختبر حقلًا حقلًا</p>
                <div className="np-fair-row"><span className="ic">✓</span> عبارة «فاتورة ضريبية» مذكورة نصًا</div>
                <div className="np-fair-row"><span className="ic">✓</span> رقم ضريبي فعلي وصحيح للمورد</div>
                <div className="np-fair-row"><span className="ic">✓</span> ضريبة القيمة المضافة مبيّنة كما يجب، وبالنسبة الصحيحة</div>
                <div className="np-fair-row"><span className="ic">✓</span> تواريخ وتسلسل وإجماليات تتطابق</div>
              </div>
              <div className="np-fair-col seal">
                <h4>ما يلتقطه Orbit</h4>
                <p className="cap2">يُسمّى بالاسم، ولا يُمرَّر أبدًا</p>
                <div className="np-fair-row sealed"><span className="ic">✕</span> الرقم الضريبي مفقود&nbsp;&nbsp;<span className="val">ليست فاتورة ضريبية صحيحة</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> الضريبة ≠ 5%&nbsp;&nbsp;<span className="val">الحساب لا يستقيم</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> مكررة&nbsp;&nbsp;<span className="val">الفاتورة نفسها، مرتين</span></div>
                <div className="np-fair-row sealed"><span className="ic">✕</span> مطالبة خطرة&nbsp;&nbsp;<span className="val">موقوفة حتى التصحيح</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── الفصل · الحكم ───────────────────────────────────────── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">الحكم</div>
            <h2 className="np-head np-rise d1">كل إخفاق مُسمّى. <span className="np-accent">وكل مطالبة يمكن الدفاع عنها.</span></h2>
            <p className="np-say np-rise d1">
              لا تلويح بإشارات المرور. كل فاتورة تحصل على حكم ومعه الحقل الدقيق الذي
              بُني عليه، والضريبة الخطرة تُوقف — مع طلب تصحيح مُصاغ جاهز للمورد — بدلًا
              من المطالبة بها بصمت.
            </p>
            <div className="np-script np-rise d2" aria-label="مقتطف من التحقق">
              <div>‏<span className="meta">09:12</span> <span className="who">قراءة</span> INV-2107 · Al Madar Trading · 12,600 درهم</div>
              <div>‏<span className="meta">09:12</span> <span className="who">حساب</span> الأسطر Σ 12,000 + الضريبة 600 = 12,600 ✓</div>
              <div>‏<span className="meta">09:12</span> <span className="who">قواعد</span> المادة 59 · الرقم الضريبي للمورد <span className="you">مفقود</span> ← ليست فاتورة ضريبية صحيحة</div>
              <div>‏<span className="meta">09:13</span> <span className="who">الحكم</span> <span className="you">إيقاف 600 درهم ضريبة مدخلات · طُلب التصحيح</span></div>
            </div>
            <div className="np-chips np-rise d1">
              <span className="np-chip"><span className="k">مستوفاة</span><span className="b">طالِب بثقة</span></span>
              <span className="np-chip"><span className="k">جزئية</span><span className="b">طُلب التصحيح أولًا</span></span>
              <span className="np-chip"><span className="k">راسبة</span><span className="b">لا تُطالِب — والسبب مُسمّى</span></span>
              <span className="np-chip"><span className="k">مكررة</span><span className="b">حُظرت، والنسخة الثانية متعقَّبة</span></span>
            </div>
          </div>
        </section>

        {/* ── الفصل · السجل ───────────────────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">السجل</div>
            <h2 className="np-head np-rise d1">السجل الذي يريد مدققك <span className="np-accent">أن يراه فعلًا.</span></h2>
            <p className="np-say np-rise d1">
              كل فاتورة وحكم ومطالبة تستقر في سجل واحد — منظم حسب فترة الإقرار الضريبي،
              مع ما طُولب به وما أُوقف. نقرة واحدة تصدّر السجل كاملًا إلى Excel بتنسيق
              جاهز للملف الضريبي. وجداول التتبع التاريخية لديك تُستورد إليه، فيبدأ
              السجل مكتملًا، لا من الصفر.
            </p>
            <div className="np-chips np-rise d2">
              <span className="np-chip"><span className="k">الفترات</span><span className="b">كل ربع ضريبي متتبَّع</span></span>
              <span className="np-chip"><span className="k">المطالبات</span><span className="b">المُطالَب به مقابل الموقوف، لكل فاتورة</span></span>
              <span className="np-chip"><span className="k">Excel</span><span className="b">تصدير جاهز للتدقيق، بنقرة واحدة</span></span>
              <span className="np-chip"><span className="k">السجل التاريخي</span><span className="b">جداولك القديمة، مستوردة</span></span>
            </div>
          </div>
        </section>

        {/* ── لماذا بنينا هذا (شريط الحبر) ────────────────────────── */}
        <section className="why-band on-ink" style={{ marginTop: 0 }}>
          <div className="wrap">
            <div className="microlabel hero-kicker np-rise">لماذا بنينا هذا</div>
            <h2 className="why-head np-rise d1">بنيناه لفريقنا الضريبي<br />قبل أي أحد.</h2>
            <div className="why-cols np-rise d1">
              <p>
                مكتب الضرائب العامل في الخليج يقوم على فواتير الموردين — مئات كل شهر،
                وكل واحدة رهان صغير على أن الورق سيصمد. فحصها كما يجب كان يعني ليالي
                متأخرة مع آلة حاسبة؛ وتركها دون فحص كان يعني حمل الخطر بصمت.
              </p>
              <p>
                فبنينا المدقق الذي يشغّله فريقنا يوميًا اليوم: يقرأ <strong>كل</strong>
                فاتورة، ويعيد <strong>كل</strong> عملية جمع، ويختبر <strong>كل</strong> قاعدة
                يطبّقها القانون فعلًا — ويضع طريقة عمله على الطاولة، ليبقى قرار الحكم،
                وعلاقة العميل، لك أنت.
              </p>
            </div>
            <div className="why-sig np-rise">‏&mdash; SRW</div>
          </div>
        </section>

        {/* ── الوصول ──────────────────────────────────────────────── */}
        <section className="section wrap" id="access">
          <h2 className="section-head">ضع فواتيرك على المحك.</h2>
          <p className="section-sub">
            يعمل Orbit Invoice اليوم داخل فرق ضريبية عاملة، ونحن نفتحه لمزيد منها.
            أخبرنا عن حجم فواتيرك ونطاقك — الإمارات أو السعودية أو كليهما — وسنجهّز
            لك كل شيء.
          </p>
          <div className="hero-actions" style={{ marginTop: 26 }}>
            <a className="cta" href="/ar/contact">اطلب الوصول</a>
            <a className="textlink" href="/ar" style={{ fontSize: 13.5 }}>تبحث عن نظام التشغيل المالي؟ Orbit هنا ←</a>
          </div>
        </section>
      </main>

      <MgFooter locale="ar" />
      <NpEnhance />
    </>
  );
}
