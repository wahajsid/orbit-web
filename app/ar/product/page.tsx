import "../../advert.css";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Orbit — نظام واحد، ست وحدات، وكل درهم في حسابه.",
  description:
    "الذمم الدائنة والمدينة، ودفتر الأستاذ، والإقفال الشهري، والمستندات والضرائب — كل وحدة يديرها الوكلاء، وكلها مسؤولة أمامك.",
  alternates: langAlternates("/product"),
};

/* ── /product — النسخة العربية المطابقة لصفحة المنتج الإنجليزية ──────
   ست وحدات تتناوب بين النص ولقطة واجهة المنتج في شبكة مسطّرة من
   عمودين. النص يسبق لقطته دائمًا في DOM ليتصدر على الهاتف؛ والتناوب
   على الشاشات الكبيرة يتم في CSS (mg-prod-row-flip). */

export default function Page() {
  return (
    <>
      <MgNav locale="ar" active="product" />

      <main>
        {/* ── ترويسة الصفحة ───────────────────────────────────────── */}
        <section className="mg-prod-hero">
          <div className="mg-kicker">المنتج</div>
          <h1 className="mg-prod-h">نظام واحد، ست وحدات، وكل درهم في حسابه.</h1>
          <p className="mg-prod-lede">الذمم الدائنة والمدينة، ودفتر الأستاذ، والإقفال الشهري، والمستندات والضرائب — كل وحدة يديرها الوكلاء، وكلها مسؤولة أمامك.</p>
        </section>

        {/* ── 01 · الذمم الدائنة — النص أولًا، ثم لقطة الاستقبال ───── */}
        <section className="mg-prod-row">
          <div className="mg-prod-copy">
            <div className="mg-kicker">01 · الذمم الدائنة</div>
            <h2 className="mg-prod-mh">الفواتير تصل. والمستحقات تُدفع. ولا شيء يفلت.</h2>
            <p className="mg-prod-mp">أرسل المستند عبر واتساب أو البريد أو تيليغرام، ويتولى خط الاستقبال الباقي: تصنيف، واستخراج، وترميز من سجلك أنت، واختبار ضريبي، وفحص للتكرار — غالبًا قبل أن تضع هاتفك جانبًا. ولا يسألك إلا غير المؤكد منها.</p>
            <div className="mg-prod-metrics">
              <span><b>≤ 3 دقائق</b> من الاستقبال إلى الترميز</span>
              <span><b>100%</b> محمية من التكرار</span>
            </div>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <div className="mg-vig-head">الاستقبال — صباح اليوم</div>
              <div className="mg-vig-body">
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-ok">مُرمَّز</span><span>Gray Mackenzie — ‏14,720 درهم ← مستهلكات مكتبية</span><span className="mg-vig-meta">واتساب · 07:41</span></div>
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-bad">موقوف</span><span>المراعي INV-5512 — الرقم الضريبي مفقود، ضريبة المدخلات موقوفة</span><span className="mg-vig-meta">بريد · 08:02</span></div>
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-ok">مُرمَّز</span><span>Knight Frank — إيجار، الشهر 3 من جدول 12</span><span className="mg-vig-meta">بريد · 08:15</span></div>
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-mute">مكرر</span><span className="mg-vig-strike">اتصالات 4402 — مؤرشفة سابقًا في 4 يونيو</span><span className="mg-vig-meta">واتساب · 08:31</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 · الذمم المدينة — اللقطة أولًا على الشاشات الكبيرة ── */}
        <section className="mg-prod-row mg-prod-row-flip">
          <div className="mg-prod-copy">
            <div className="mg-kicker">02 · الذمم المدينة</div>
            <h2 className="mg-prod-mh">مهذّب، مثابر، ولا ينسى المتابعة أبدًا.</h2>
            <p className="mg-prod-mp">وكلاء التحصيل يصيغون التذكيرات ويرسلونها بوتيرة توافق عليها مرة واحدة. المدفوعات الواردة تُطابَق مع البنك تلقائيًا؛ ومخاطر الشطب تُقاس وفق سياستك، لا بالتخمين.</p>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <div className="mg-vig-head">الذمم المدينة — الوتيرة</div>
              <div className="mg-vig-body">
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-ok mg-vig-tag-w">أُرسل</span><span>التذكير 2 من 3 — Helio Retail، ‏42,300 درهم متأخرة 12 يومًا</span></div>
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-ok mg-vig-tag-w">سُدّد</span><span>Nimbus FZ LLC سدّدت — طوبقت مع السطر البنكي حتى آخر فلس</span></div>
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-bad mg-vig-tag-w">سؤال</span><span>مخاطر الشطب مقابل السياسة لدى Delta Trading — القرار لك</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 · دفتر الأستاذ — النص أولًا، ثم لقطة القيد ─────────── */}
        <section className="mg-prod-row">
          <div className="mg-prod-copy">
            <div className="mg-kicker">03 · دفتر الأستاذ</div>
            <h2 className="mg-prod-mh">كل قيد يشرح نفسه.</h2>
            <p className="mg-prod-mp">كل قيد يحمل تعليق وكيله وحزمة الأدلة الكاملة — المستند المصدر، وتأكيد OCR، ودرجة الثقة. افتح أي رقم وسترى بالضبط لماذا هو هناك.</p>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <div className="mg-vig-head"><span>JE-2040 — تحرير مدفوعات مسبقة</span><span className="mg-vig-head-right">الثقة 99</span></div>
              <div className="mg-vig-body">
                <div className="mg-vig-je"><span className="mg-vig-je-side">مدين</span><span>الإيجار — المكتب</span><span className="mg-vig-je-amt">36,750</span></div>
                <div className="mg-vig-je"><span className="mg-vig-je-side">دائن</span><span>المدفوعات المسبقة</span><span className="mg-vig-je-amt">36,750</span></div>
                <div className="mg-vig-note"><b>تعليق الوكيل</b> — إيجار Knight Frank السنوي، الشهر 3 من 12. الجدول محفوظ؛ والمبلغ مؤكد بمطابقة OCR مع عقد الإيجار.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04 · الإقفال الشهري — اللقطة أولًا على الشاشات الكبيرة ── */}
        <section className="mg-prod-row mg-prod-row-flip">
          <div className="mg-prod-copy">
            <div className="mg-kicker">04 · الإقفال الشهري</div>
            <h2 className="mg-prod-mh">نهاية الشهر تدير نفسها حتى لا تبقى إلا قائمة قصيرة.</h2>
            <p className="mg-prod-mp">قمرة الإقفال تعرض ما أُنجز، وما يُرحَّل الآن، وما يحتاج إنسانًا. عندما تخضرّ كل البوابات، تُقفل الفترة وتُقيَّد — والقفل نافذ في كل مكان، على الوكلاء أيضًا.</p>
            <div className="mg-prod-metrics">
              <span><b>3 أيام</b> مدة الإقفال المعتادة</span>
              <span><b>قراران</b> فقط هذا الشهر</span>
            </div>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <div className="mg-vig-head"><span>قائمة الإقفال — يونيو</span><span className="mg-vig-head-right">68%</span></div>
              <div className="mg-vig-body">
                <div className="mg-vig-check"><span className="mg-vig-check-mark" style={{ color: "var(--accent)" }}>✓</span><span>مطابقة البنك — جميع الحسابات مطابقة</span></div>
                <div className="mg-vig-check"><span className="mg-vig-check-mark" style={{ color: "var(--accent)" }}>✓</span><span>تم ترحيل الإهلاك — جميع الفئات</span></div>
                <div className="mg-vig-check"><span className="mg-vig-check-mark" style={{ color: "var(--bad)" }}>●</span><span>الاستحقاقات — مقترحان بانتظار موافقتك</span></div>
                <div className="mg-vig-check"><span className="mg-vig-check-mark" style={{ color: "var(--text-muted)" }}>○</span><span>‏Zoho Books: قفل الفترة 1–30 يونيو — بعد بوابة إقفال أوربت</span></div>
                <button type="button" className="mg-vig-lock">أقفل الفترة وثبّت القفل</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 05 + 06 — ثنائي نصي يفصله خط شعري ──────────────────── */}
        <section className="mg-prod-duo">
          <div>
            <div className="mg-kicker">05 · المستندات</div>
            <h2 className="mg-prod-dh">خزنة، لا صندوق أوراق.</h2>
            <p className="mg-prod-dp">كل مستند مُزال تكراره ببصمة SHA، ومحصور في نطاق منشأتك، ومربوط بقيده. ابحث بالمورد أو المبلغ أو الفترة — الدليل على بُعد نقرة من الرقم.</p>
          </div>
          <div>
            <div className="mg-kicker">06 · الضرائب والامتثال</div>
            <h2 className="mg-prod-dh">بمستوى الهيئة الاتحادية للضرائب، قبل أن تقدّم الإقرار.</h2>
            <p className="mg-prod-dp">اختبار المادة 59 على كل فاتورة، وضريبة المدخلات موقوفة حتى تكتمل مستنداتها، وجاهزية للفوترة الإلكترونية قبل موعد الإلزام. وإقرار ضريبة القيمة المضافة يجمع نفسه مع جريان الشهر.</p>
          </div>
        </section>

        {/* ── شريط الدعوة الأخضر ──────────────────────────────────── */}
        <section className="mg-prod-cta">
          <h2 className="mg-prod-cta-h">شاهده يعمل على دفاترك أنت.</h2>
          <div className="mg-poster-cta">
            <a href="/ar#join" className="mg-cta mg-cta-on-green">احجز عرضًا ←</a>
            <a href="/ar" className="mg-ghost mg-ghost-on-green">العودة إلى الرئيسية</a>
          </div>
        </section>
      </main>

      <MgFooter locale="ar" />
    </>
  );
}
