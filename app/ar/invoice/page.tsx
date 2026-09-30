/* ── /ar/invoice ─────────────────────────────────────────────────────
   Arabic twin of app/(en)/invoice/page.tsx (Tick & Tie): the same
   walkthrough of INV-2107 (InvoiceFlow, Arabic strings), the nine ways
   a VAT claim fails, the register as a table, where the people stay and
   why we built it. Like the English page it shows no screenshots: the
   old ORBIT captures (public/shots/adv-ocr-*.png) are retired.
   2026-09-23: invoice checks are part of Hysaab Finance ("hysaab invoice"
   is retired as a name); the CTA books a demo.
   AR-REVIEW: the strings rebuilt from the English page (hero, the flow
   heading, the nine findings, the register, where the people stay). */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { InvoiceFlow } from "@/components/hysaab/InvoiceFlow";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

export const metadata = {
  title: "فحص فواتير الموردين قبل المطالبة بالضريبة | Hysaab Finance",
  description:
    "يقرأ Hysaab Finance كل فاتورة مورد، ويفحصها وفق قواعد الفاتورة الضريبية في الإمارات والسعودية، ويكشف التكرار، ويخبرك بما يمكنك المطالبة به بأمان.",
  alternates: langAlternates("/invoice"),
};

type Sev = "إيقاف" | "مراجعة" | "تنبيه";

const FINDINGS: { ref: string; sev: Sev; h: string; p: string }[] = [
  { ref: "الإمارات المادة 59 · السعودية زاتكا", sev: "إيقاف", h: "ليست فاتورة ضريبية صحيحة", p: "عبارات ناقصة، أو رقم تسجيل ضريبي مفقود أو غير سليم، أو لا مبلغ ضريبة بالدرهم، أو لا سعر صرف على فاتورة بعملة أجنبية. يُسمّى الحقل الراسب مع مادته." },
  { ref: "المطابقة", sev: "إيقاف", h: "أرقام لا يستقيم حسابها", p: "الأسطر، والضريبة بالنسبة المذكورة، والإجمالي تُعاد احتسابها بالشيفرة. النسبة الخاطئة أو الإجمالي الذي يختلف بأكثر من هامشك يُكشف في السطر الذي يقع فيه." },
  { ref: "السجل", sev: "إيقاف", h: "التكرار وإعادة الإصدار", p: "كل فاتورة مفهرسة بالمورّد والرقم، مع بصمة لمبالغها وتاريخها. إعادة الإرسال المطابقة تُمنع؛ وإعادة الإصدار المصحّحة تحل محل النسخة القديمة." },
  { ref: "الإمارات المادة 53 · السعودية المادة 50", sev: "تنبيه", h: "ضريبة مدخلات محظورة", p: "الترفيه والضيافة وسيارات الاستخدام الشخصي ومزايا الموظفين تُعلَّم كضريبة قد تكون محظورة، حتى على فاتورة سليمة تمامًا. تنبيه، لا حظر صامت." },
  { ref: "الاحتساب العكسي", sev: "مراجعة", h: "الواردات تُصنَّف، لا تُرسَب", p: "مورّد أجنبي أو عبارة احتساب عكسي تنقل الفاتورة إلى الاحتساب العكسي. تبقى الملاحظات، لكنها تخرج من قائمة الملاحقة بدل أن تبدو إخفاقًا." },
  { ref: "مهلة المطالبة", sev: "تنبيه", h: "مطالبات متأخرة", p: "في الإمارات، تُطالَب ضريبة المدخلات في فترة الفاتورة أو التي تليها. الفواتير الأقدم تُعلَّم ليُحفظ دليل تاريخ الاستلام. وفي السعودية يُعرض عمر الفاتورة للعلم." },
  { ref: "المستلم", sev: "مراجعة", h: "غير موجّهة إلى كيانك", p: "يُطابَق المستلم مع مجموعتك برقم التسجيل الضريبي، ثم بالاسم والأسماء البديلة. الفاتورة الموجهة إلى جهة أخرى تُوقف، ويبقى امتثالها مُقيَّمًا." },
  { ref: "ذاكرة الموردين", sev: "مراجعة", h: "رقم تسجيل ضريبي تغيّر", p: "يُتعلَّم رقم التسجيل الضريبي الثابت لكل مورّد من فواتيره السابقة. والفاتورة الجديدة التي تُظهر رقمًا مختلفًا توضع أمام شخص، لأن ذلك غالبًا خطأ في القراءة." },
  { ref: "قرار مجلس الوزراء 149", sev: "تنبيه", h: "قواعد الاسترداد في أكتوبر 2026", p: "التوريدات المسددة نقدًا فوق الحد الوزاري، وسكن الموظفين دون تفويض من وزارة الموارد البشرية والتوطين، والحزم المسعّرة بشكل منفصل، تُضاف كفحوص قبل 1 أكتوبر 2026." },
];

const REGISTER: { sup: string; no: string; date: string; vat: string; band: string; status: string }[] = [
  { sup: "Gulf Technical Supplies", no: "INV-4471", date: "12 سبتمبر", vat: "199.50", band: "منخفضة", status: "مطالبة" },
  { sup: "Al Madar Hospitality", no: "INV-2107", date: "14 سبتمبر", vat: "600.00", band: "عالية", status: "إيقاف" },
  { sup: "Almara Catering", no: "INV-8512", date: "09 سبتمبر", vat: "1,036.00", band: "عالية", status: "ملاحقة" },
  { sup: "Amazon Web Services EMEA", no: "EUINAE-2231", date: "01 سبتمبر", vat: "2,184.00", band: "منخفضة", status: "احتساب عكسي" },
  { sup: "Knight Frank", no: "KF-0917", date: "01 سبتمبر", vat: "3,750.00", band: "منخفضة", status: "مطالبة" },
  { sup: "Marina Yacht Club", no: "MYC-3310", date: "05 سبتمبر", vat: "420.00", band: "متوسطة", status: "محظورة" },
];

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.ar}</span>;

export default function InvoicePage() {
  return (
    <PageShell locale="ar" band={{ kicker: "Hysaab Finance · فحص الفواتير", title: "ضع فواتيرك على المحك.", body: "يعمل فحص الفواتير اليوم داخل فرق ضريبية عاملة في الإمارات والسعودية. أخبرنا عن حجم فواتيرك ونطاقك، الإمارات أو السعودية أو كليهما، وسيجهّز لك شخص حقيقي كل شيء خلال يوم عمل واحد." }}>
      <PageHero
        locale="ar"
        eyebrow="Hysaab Finance · فحص الفواتير"
        title={<>كل فاتورة مورّد، مختبرة قبل أن تطالب بالضريبة.</>}
        lede="كل حقل مقروء، وكل مجموع مُعاد، وكل قاعدة مختبرة. وشخص يقرر ما يُطالَب به."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>احجز عرضًا تجريبيًا <span aria-hidden="true">↗</span>{newTab}</a>
        <a className="hw-link hw-link--light" href="#flow">تابع فاتورة</a>
      </PageHero>

      {/* ── المسار ── */}
      <section id="flow">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">فاتورة واحدة، من البداية إلى النهاية</p>
              <h2>تابع <bdi>INV-2107</bdi> من صندوق الوارد إلى مطالبة يمكنك الدفاع عنها.</h2>
            </div>
            <p>فاتورة توضيحية. نسيت Al Madar رقم تسجيلها الضريبي وأدرجت عشاء عميل في الصفحة نفسها. وكلاهما يُكشف، لسببين مختلفين.</p>
          </div>
          <InvoiceFlow locale="ar" />
        </div>
      </section>

      {/* ── ما الذي يكشفه ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">ما الذي يكشفه</p>
              <h2>تسع طرق تسقط بها مطالبة ضريبية في التدقيق.<br /><span>وكل واحدة مختبرة.</span></h2>
            </div>
            <p>كل ملاحظة تحمل درجة خطورة ومرجعًا قانونيًا، فيشرح سجل التدقيق نفسه. «إيقاف» يعني أن الضريبة تنتظر تصحيحًا. «مراجعة» تضعها أمام شخص. «تنبيه» يسجّل الخطر دون إيقاف المطالبة.</p>
          </div>
          <div className="hw-cards">
            {FINDINGS.map((f) => (
              <article key={f.h}>
                <p className="hw-eyebrow">{f.ref} · {f.sev}</p>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </article>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">الإعدادات</span>
            <p>حدّد عتبة للأهمية النسبية فتخرج الضريبة غير الجوهرية من القائمة. أدرج الموردين الموثوقين في قائمة بيضاء. اختر فترات شهرية أو ربعية، مع الأرباع المتدرجة للهيئة الاتحادية للضرائب، لكل كيان. واستورد جداول المتابعة القديمة فيُعاد فحصها من اليوم الأول.</p>
          </div>
        </div>
      </section>

      {/* ── السجل والتقرير ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">السجل والتقرير</p>
              <h2>الملف الذي يطلبه مدققك، والصفحة التي يقرؤها عميلك.</h2>
            </div>
            <p>كل فاتورة وحكم ومطالبة في سجل واحد حسب فترة الإقرار. والتقرير الشهري يُبنى من الأرقام نفسها، فلا يختلفان أبدًا.</p>
          </div>
          <div className="hw-table-wrap">
            <table className="hw-table">
              <thead><tr><th>المورّد</th><th>الفاتورة</th><th>التاريخ</th><th style={{ textAlign: "end" }}>الضريبة بالدرهم</th><th>الفئة</th><th>الحالة</th></tr></thead>
              <tbody>
                {REGISTER.map((r) => (
                  <tr key={r.no}>
                    <td><bdi>{r.sup}</bdi></td>
                    <td className="hw-table-id"><bdi>{r.no}</bdi></td>
                    <td>{r.date}</td>
                    <td className="hw-table-num" style={{ textAlign: "end" }}><bdi>{r.vat}</bdi></td>
                    <td>{r.band}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="hw-note">
            <span className="hw-mono">التصدير</span>
            <p>السجل يُصدَّر إلى Excel بأربع ورقات مع تمييز الخلايا منخفضة الثقة. وتقرير الامتثال للعميل يُبنى من الأرقام نفسها.</p>
          </div>
        </div>
      </section>

      {/* ── أين يبقى الناس ── */}
      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">أين يبقى الناس</p>
              <h2>الذكاء الاصطناعي يقرأ.<br /><span>وفريقك يقرر.</span></h2>
            </div>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>الخلافات تذهب إلى شخص</h3><p>حين يقرأ نموذجان حقلًا بشكل مختلف، تُعرض القيمتان ويختار المراجع. وكل تصحيح يُسجَّل مع من أجراه ولماذا.</p></article>
            <article><span className="hw-mono">02</span><h3>الملاحظة المشكوك فيها تحتفظ بفئتها</h3><p>يمكن لوكيل التحقق أن يؤكد ملاحظة أو يشكك فيها، لكنه لا يستطيع حذفها. وتذهب ملاحظته إلى المراجع مع الدليل.</p></article>
            <article><span className="hw-mono">03</span><h3>يُلاحَق الموردون حين تقرر ذلك</h3><p>طلبات التصحيح تُصاغ بالعيوب والمواد الدقيقة، قابلة للتعديل، ولا تُرسل إلا حين يضغط أحدهم زر الإرسال.</p></article>
            <article><span className="hw-mono">04</span><h3>بريد العميل له بوابتان</h3><p>يفحص وكيل مراجعة كل بريد مُعدّ للعميل أولًا، ثم يُطلقه اعتماد بشري على خطوتين.</p></article>
          </div>
        </div>
      </section>

      {/* ── لماذا بنيناه ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">لماذا بنيناه</p>
              <h2>بنيناه لفريقنا الضريبي أولًا.</h2>
            </div>
            <div className="hw-prose">
              <p>مكتب الضرائب العامل في الخليج يقوم على فواتير الموردين: مئات كل شهر، وكل واحدة رهان صغير على أن الورق سيصمد. فحصها كما يجب كان يعني ليالي متأخرة مع آلة حاسبة. وتركها دون فحص كان يعني حمل الخطر بصمت إلى التدقيق التالي.</p>
              <p>فبنينا المدقق الذي يشغّله فريقنا كل يوم. يقرأ <strong>كل</strong> فاتورة، ويعيد <strong>كل</strong> عملية جمع، ويختبر <strong>كل</strong> قاعدة يطبّقها القانون، ويضع طريقة عمله على الطاولة، ليبقى الحكم وعلاقة العميل مع الناس.</p>
            </div>
          </div>
          <div className="hw-note">
            <span className="hw-mono">وعدنا</span>
            <p>لن نقول عن مطالبة إنها آمنة والورق لا يسندها، وسنخبرك دائمًا لماذا.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
