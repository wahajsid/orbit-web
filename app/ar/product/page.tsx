import "../../advert.css";
import Image from "next/image";
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
            <div className="mg-vig-card" dir="ltr">
              <Image src="/shots/adv-payables.png" alt="الذمم الدائنة في Orbit — المستحقات المفتوحة وطبقة الضريبة مدمجة في كل سطر" width={1600} height={1273} sizes="(max-width: 900px) 100vw, 620px" />
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
            <div className="mg-vig-card" dir="ltr">
              <Image src="/shots/adv-receivables.png" alt="الذمم المدينة في Orbit — طابور التحصيل وفترة التحصيل وأعمار الذمم" width={1600} height={1297} sizes="(max-width: 900px) 100vw, 620px" />
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
            <div className="mg-vig-card" dir="ltr">
              <Image src="/shots/adv-ledger.png" alt="دفتر الأستاذ العام في Orbit — حركة القيود مع تعليقات الوكلاء والأدلة" width={1600} height={946} sizes="(max-width: 900px) 100vw, 620px" />
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
            <div className="mg-vig-card" dir="ltr">
              <Image src="/shots/adv-close.png" alt="قمرة الإقفال في Orbit — جانب Orbit منجز، ومهام دفترك مرتّبة، والقفل خلف بوابة" width={1600} height={1169} sizes="(max-width: 900px) 100vw, 620px" />
            </div>
          </div>
        </section>

        {/* ── 05 · المستندات — النص أولًا، ثم لقطة الخزنة ───────────── */}
        <section className="mg-prod-row">
          <div className="mg-prod-copy">
            <div className="mg-kicker">05 · المستندات</div>
            <h2 className="mg-prod-mh">خزنة، لا صندوق أوراق.</h2>
            <p className="mg-prod-mp">كل مستند مُزال تكراره ببصمة SHA، ومحصور في نطاق منشأتك، ومربوط بقيده. ابحث بالمورد أو المبلغ أو الفترة — الدليل على بُعد نقرة من الرقم.</p>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card" dir="ltr">
              <Image src="/shots/adv-documents.png" alt="مستندات Orbit — خزنة الأدلة، كل ملف مربوط بقيده" width={1600} height={1080} sizes="(max-width: 900px) 100vw, 620px" />
            </div>
          </div>
        </section>

        {/* ── 06 · الضرائب — اللقطة أولًا على الشاشات الكبيرة ───────── */}
        <section className="mg-prod-row mg-prod-row-flip">
          <div className="mg-prod-copy">
            <div className="mg-kicker">06 · الضرائب والامتثال</div>
            <h2 className="mg-prod-mh">بمستوى الهيئة الاتحادية للضرائب، قبل أن تقدّم الإقرار.</h2>
            <p className="mg-prod-mp">اختبار المادة 59 على كل فاتورة، وضريبة المدخلات موقوفة حتى تكتمل مستنداتها، وجاهزية للفوترة الإلكترونية قبل موعد الإلزام. وإقرار ضريبة القيمة المضافة يجمع نفسه مع جريان الشهر.</p>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card" dir="ltr">
              <Image src="/shots/adv-tax.png" alt="ضرائب Orbit — تسوية القيمة المضافة مع ضريبة الشركات، والمواعيد، والتخليص في مكان واحد" width={1600} height={1011} sizes="(max-width: 900px) 100vw, 620px" />
            </div>
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
