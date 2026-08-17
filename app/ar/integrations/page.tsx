import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "التكاملات — Orbit",
  description: "كيف يتصل Orbit بـ Zoho Books وXero وQuickBooks وOdoo وWafeq وERPNext — ويستقبل المستندات من واتساب وتيليغرام والبريد الإلكتروني.",
  alternates: langAlternates("/integrations"),
};

const LEDGERS: { name: string; how: string; detail: string; extras: string[] }[] = [
  {
    name: "Zoho Books", how: "‏OAUTH · نقرتان",
    detail: "فوّض مرة واحدة عبر شاشة الموافقة الخاصة بـ Zoho نفسها — لا مفاتيح تنسخها. يكتشف Orbit مؤسستك، ويطابق شجرة حساباتك، ويرحّل القيود المعتمدة إليه.",
    extras: ["مزامنة ثنائية الاتجاه للقيود", "مطابقة شجرة الحسابات مع المراجعة", "يراعي مركز البيانات (يعمل مع أي منطقة Zoho)"],
  },
  {
    name: "Xero", how: "‏OAUTH · نقرتان",
    detail: "تدفق موافقة Xero القياسي. يقرأ Orbit دفتر الأستاذ لأغراض المطابقة، ويمكنه استيراد سجلّك التاريخي لتأتي التقارير بسياقها من اليوم الأول.",
    extras: ["مزامنة ثنائية الاتجاه للقيود", "استيراد السجل القديم (مُعلَّم بوضوح، ولا يُعاد تصديره أبدًا)", "مزامنة المرفقات كأدلة"],
  },
  {
    name: "QuickBooks", how: "‏OAUTH · تدفق INTUIT",
    detail: "اتصل عبر التفويض الرسمي من Intuit. يرحّل Orbit القيود المعتمدة إلى شركتك في QuickBooks ويُبقي مطابقة الحسابات تحت مراجعتك.",
    extras: ["مزامنة ثنائية الاتجاه للقيود", "اتصال يراعي نطاق الشركة (Realm)", "بوابة الحسابات المطابَقة — لا يُرحَّل شيء نصف مُطابَق"],
  },
  {
    name: "Odoo", how: "‏API KEY · موجَّه",
    detail: "لوحة إرشادية خطوة بخطوة تريك بالضبط أين تُنشئ مفتاح API داخل نسختك من Odoo. يتحقق Orbit من الاتصال قبل حفظ أي شيء — فالمفتاح المكتوب خطأً لا يتحول إلى اتصال أبدًا.",
    extras: ["يعمل مع الاستضافة الذاتية وOdoo.sh", "استيراد السجل القديم", "مزامنة المرفقات"],
  },
  {
    name: "Wafeq", how: "‏API KEY · موجَّه",
    detail: "دفتر أستاذ خليجي المنشأ، بدعم من الدرجة الأولى. أنشئ مفتاحًا في Wafeq والصقه مرة واحدة — يتحقق Orbit منه مباشرة، ثم يرحّل القيود المعتمدة.",
    extras: ["ترحيل القيود", "بالدرهم والريال أصلًا", "ألغِ الوصول في أي وقت من جهة Wafeq"],
  },
  {
    name: "ERPNext", how: "‏API KEY + SECRET · موجَّه",
    detail: "وجّه Orbit إلى نسختك من ERPNext بزوج مفاتيح API. يُختبر الاتصال قبل حفظه، ويمكن لسجل دفترك العام أن يدخل كبيانات قديمة مُعلَّمة بوضوح.",
    extras: ["مزامنة ثنائية الاتجاه للقيود", "استيراد السجل القديم", "صديق للاستضافة الذاتية"],
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <MgNav locale="ar" />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">التكاملات</div>
          <h1 className="mg-page-h">دفتر الأستاذ يبقى دفتر الأستاذ.</h1>
          <p className="mg-page-lede">
            ‏Orbit لا يستبدل نظامك المحاسبي — بل ينجز العمل داخله. اربط دفتر أستاذ
            واحدًا (واحدًا في كل مرة، ليبقى نظام السجل الرسمي واحدًا)، أو لا تربط شيئًا ودَع
            Orbit يمسك الدفاتر بنفسه.
          </p>
        </section>
        <section className="mg-page-body">
          <div className="mg-int-grid">
            {LEDGERS.map((l) => (
              <div key={l.name} className="mg-int-cell">
                <div className="mg-kicker">{l.how}</div>
                <h2 className="mg-int-name">{l.name}</h2>
                <p className="mg-int-p">{l.detail}</p>
                <div className="mg-int-chips">
                  {l.extras.map((x) => <span key={x} className="mg-chip">{x}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 56 }}>
            <div className="mg-kicker">المستندات الواردة</div>
            <h2 className="mg-h2" style={{ fontSize: 30 }}>لا حاجة لدفتر أستاذ كي تبدأ.</h2>
            <p className="mg-page-lede" style={{ marginTop: 0 }}>
              أرسل صورة عبر واتساب، أو أعد توجيه بريد، أو ألقِ ملف PDF على تيليغرام — قناة
              موثَّقة هي كل ما يحتاجه Orbit. كل مستند يُقرأ ويُرمَّز ويُختبر ضريبيًا ويُؤرشف
              مع أدلته، سواء رُبط دفتر أستاذ أم لا.
            </p>
            <p className="mg-page-lede" style={{ marginTop: 12 }}>
              نظامك غير موجود هنا؟{" "}
              <a className="textlink" href="mailto:info@orbitgulf.com?subject=Integration%20request">اطلب تكاملًا ←</a>
            </p>
          </div>
        </section>
      </main>
      <MgFooter locale="ar" />
    </>
  );
}
