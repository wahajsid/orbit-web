/* ── /ar/pricing ─────────────────────────────────────────────────────
   النسخة العربية من صفحة الأسعار الإنجليزية الحالية (المصدر:
   app/(en)/pricing/page.tsx). طريقتان لتشغيل Hysaab (قرار المالك
   2026-09-18): الخدمة الذاتية بـ USD 199 شهريًا، والخدمة المُدارة من
   USD 899 شهريًا. مبنية على عدّة الصفحة الرئيسية. الأرقام الموجودة
   تُذكر كما هي، وما يُحدَّد نطاقه لكل عميل يُسمّى كذلك لا يُخترع. */

import { DigitRoll } from "@/components/motion/Kinetic";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "أسعار Hysaab: 199 دولارًا ذاتيًا، ومن 899 دولارًا للخدمة المُدارة",
  description:
    "الخدمة الذاتية بـ199 دولارًا شهريًا، أو خدمة محاسبة مُدارة من 899 دولارًا شهريًا مع محاسب مسمّى. الأتعاب تتبع دفاترك لا عدد المقاعد.",
  alternates: langAlternates("/pricing"),
};

const TIERS: { name: string; mode: string; price: string; from?: boolean; who: string; feats: string[]; hero?: boolean }[] = [
  {
    name: "الخدمة الذاتية",
    mode: "فريقك يديرها",
    price: "USD 199",
    who: "لشركة يمسك دفاترها فريقها. يجهّز Hysaab العمل، وفريقك يراجع ويعتمد ويقفل.",
    feats: [
      "المستندات تصل عبر واتساب أو البريد أو الرفع، وتُقرأ وتُرمَّز من سجلك أنت",
      "كل فاتورة تُختبر وفق شروط الفاتورة الضريبية قبل المطالبة بضريبة القيمة المضافة",
      "قائمة القرارات، ولوحة الإقفال الشهري، وحزمة التقارير",
      "اسأل الفريق بكلمات عادية، مع السجلات وراء كل إجابة",
      "نظام محاسبي واحد متصل، وعدد غير محدود من الأشخاص",
    ],
  },
  {
    name: "الخدمة المُدارة",
    mode: "محاسبونا يديرونها معك",
    price: "USD 899",
    from: true,
    hero: true,
    who: "للمديرين الماليين والمجموعات والدفاتر المزدحمة. محاسب مسمّى من Hysaab يعمل على القائمة معك ويجهّز كل إقفال.",
    feats: [
      "كل ما في الخدمة الذاتية",
      "محاسب مسمّى يراجع الاستثناءات ويصحح حيث يلزم",
      "الإقفال يُجهَّز ويُنفَّذ معك، مع تقارير لك ولمجلس إدارتك",
      "كيانات متعددة وحجم مستندات أكبر، يُحدَّد نطاقه مسبقًا",
      "مراجعة شهرية لما تغيّر ولماذا",
    ],
  },
];

const SCOPED = [
  ["حجم المستندات", "كم فاتورة وإيصالًا وكشفًا يصل في شهر اعتيادي. رسوم الخدمة الذاتية تغطي حجم شركة صغيرة؛ والحجم الأكبر يُدرج ضمن نطاق رسوم الخدمة المُدارة."],
  ["الكيانات", "تغطي الخدمة الذاتية شركة واحدة على نظام محاسبي واحد متصل. أما المجموعات والكيانات المتعددة فهي من عمل الخدمة المُدارة وتُسعَّر بحسب النطاق."],
  ["الإعداد الأولي", "ربط الدفاتر والاتفاق على قواعد الاعتماد يتمّان قبل الشهر الأول. الإعداد مشمول؛ والوقت الذي يستغرقه يعتمد على حال الدفاتر، ونخبرك به مسبقًا."],
  ["الدعم", "كل عميل يستطيع مراسلة شخص. تضيف الخدمة المُدارة محاسبًا مسمّى ومراجعة شهرية؛ ودعم الخدمة الذاتية بالبريد في ساعات العمل."],
  ["التجاوزات", "إذا نما حجم عملك إلى ما يتجاوز ما حُدِّدت الرسوم على أساسه، نخبرك قبل أن يتغير أي شيء. لا رسوم تجاوز صامتة."],
  ["ضريبة القيمة المضافة على الرسوم", "تذكر عروض الأسعار الرسوم وما إذا كانت ضريبة القيمة المضافة تنطبق عليها، فيكون الرقم الذي توافق عليه هو الرقم الذي تدفعه."],
];

export default function PricingPage() {
  return (
    <PageShell locale="ar" band={{ title: "لست متأكدًا أي طريقة تناسبك؟", body: "أخبرنا عن دفاترك: النظام المحاسبي، والكيانات، والعملية التي تستغرق وقتًا أطول مما ينبغي. نؤكد النطاق والرسوم كتابةً قبل أي التزام." }}>
      <PageHero
        locale="ar"
        eyebrow="الأسعار"
        title={<>بحجم العمل،<br /><span>لا بعدد المقاعد.</span></>}
        lede="طريقتان لتشغيل Hysaab. الخدمة الذاتية: فريقك يشغّل مساحة العمل، ويأتيك Hysaab بالأسئلة القليلة التي لا يستطيع حسمها. الخدمة المُدارة: محاسبونا يديرون العمل معك، ويبقى شخص على كل قرار يحتاج إلى تقدير. الرسوم تتبع تعقيد دفاترك، لا عدد من يسجّلون الدخول."
      >
        <a className="hw-btn hw-btn--peach" href="/ar/contact">احجز جولة تعريفية <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="/ar/how-it-works"><span className="hw-play" aria-hidden="true">▷</span> شاهد كيف يعمل</a>
      </PageHero>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">خطتان</p>
              <h2>رسم شهري واحد.<br /><span>لا رسوم لكل مستخدم.</span></h2>
            </div>
            <p>الأسعار بالدولار الأمريكي، شهريًا. الرسوم تتبع العمل على دفاترك، لا عدد من يسجّلون الدخول.</p>
          </div>

          <div className="hw-plans hw-plans--2" data-play="">
            {TIERS.map((t) => (
              <article key={t.name} className={t.hero ? "is-featured" : undefined}>
                <p className="hw-eyebrow">{t.mode}</p>
                <h3>{t.name}</h3>
                <p className="hw-plan-price">
                  {t.from && <small>من</small>} {t.price.split(" ")[0]} <DigitRoll value={t.price.split(" ")[1]} delay={200} /><small>/شهريًا</small>
                </p>
                <p>{t.who}</p>
                <ul className="hw-ticks">
                  {t.feats.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <a className={`hw-btn ${t.hero ? "hw-btn--peach" : "hw-btn--navy"}`} href="/ar/contact">
                  {t.hero ? "ناقش الدعم المُدار" : "احجز جولة تعريفية"} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>

          <div className="hw-note">
            <span className="hw-mono">قبل أن نبدأ</span>
            <p>نؤكد نظامك المحاسبي والكيانات والنطاق والرسوم كتابةً مسبقًا. الملاءمة الواضحة تسبق أي التزام.</p>
          </div>
        </div>
      </section>

      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">ما تغطيه الرسوم</p>
              <h2>ما تدفع مقابله.<br /><span>وما يُحدَّد نطاقه معك.</span></h2>
            </div>
            <p>تختلف الخطتان في من يدير العمل وفي حجمه. أما الضوابط فواحدة في الخطتين.</p>
          </div>
          <div className="hw-rows">
            {SCOPED.map(([h, p], i) => (
              <article key={h}>
                <span className="hw-mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">دفترك</span>
            <p>تعمل الخطتان مع نظام محاسبي واحد متصل. اطّلع على <a href="/ar/integrations">الأنظمة التي يتصل بها Hysaab</a>، و<a href="/ar/product">ما تغطيه مساحة العمل</a>، و<a href="/ar/faq">الأسئلة التي يطرحها الناس أولًا</a>.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
