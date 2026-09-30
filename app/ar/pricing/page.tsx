/* ── /ar/pricing ─────────────────────────────────────────────────────
   Arabic twin of app/(en)/pricing/page.tsx. Website change plan
   2026-09-23: three cards (self-serve from USD 199 a month, a managed
   service scoped to your books, and firms: a setup fee plus a monthly
   subscription); every card books a demo on the team's Calendly.
   Indicative volume bands (owner, 2026-09-30) under the cards:
   lib/pricing.ts, components/hysaab/PriceBands.tsx.
   AR-REVIEW: the strings marked below are new drafts. */

import { DigitRoll } from "@/components/motion/Kinetic";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { PriceBands } from "@/components/hysaab/PriceBands";

/* AR-REVIEW: title and description */
export const metadata = {
  title: "أسعار Hysaab: خدمة ذاتية من 199 دولارًا، ومُدارة، وللمكاتب",
  description:
    "فحص دفاتر مجاني للقراءة فقط، ثم الخدمة الذاتية من 199 دولارًا شهريًا لما يصل إلى 100 معاملة، مع شرائح استرشادية لما يزيد على ذلك. خدمة مُدارة تُسعَّر وفق نطاق دفاترك للفرق الأكبر. و Hysaab Practice و Hysaab Audit للمكاتب: رسوم إعداد واشتراك شهري.",
  alternates: langAlternates("/pricing"),
};

type Tier = { name: React.ReactNode; mode: string; price?: string; priceText?: string; who: string; feats: React.ReactNode[]; hero?: boolean };

const TIERS: Tier[] = [
  {
    name: "الخدمة الذاتية",
    mode: "فريقك يديرها",
    price: "199",
    who: "لشركة يمسك دفاترها فريقها. يجهّز Hysaab العمل، وفريقك يراجع ويعتمد ويقفل. تبدأ الرسوم حين يعمل Hysaab في نظامك المحاسبي بدوام كامل.",
    feats: [
      "حتى 100 معاملة شهريًا؛ والأحجام الأعلى تُسعَّر حسب الشريحة",
      "المستندات تصل عبر واتساب أو البريد أو الرفع، وتُقرأ وتُرمَّز من سجلك أنت",
      "كل فاتورة تُختبر وفق شروط الفاتورة الضريبية قبل المطالبة بضريبة القيمة المضافة",
      "قائمة القرارات، ولوحة الإقفال الشهري، وحزمة التقارير",
      "اسأل الفريق بكلمات عادية، مع السجلات وراء كل إجابة",
      "نظام محاسبي واحد متصل، وعدد غير محدود من الأشخاص",
    ],
  },
  /* AR-REVIEW: the managed card's mode, price line and description, and the whole firms card. */
  {
    name: "الخدمة المُدارة",
    mode: "ندير العمل معك",
    priceText: "تُسعَّر وفق نطاق دفاترك",
    hero: true,
    who: "للفرق الأكبر والشركات المتوسطة والمجموعات. يدير محاسبو Oblique قائمة العمل ويجهّزون الإقفال معك، مستخدمين Hysaab كل يوم.",
    feats: [
      "كل ما في الخدمة الذاتية",
      "محاسب مسمّى يراجع الاستثناءات ويصحح حيث يلزم",
      "الإقفال يُجهَّز ويُنفَّذ معك، مع تقارير لك ولمجلس إدارتك",
      "كيانات متعددة وحجم مستندات أكبر، يُحدَّد نطاقه مسبقًا",
      "مراجعة شهرية لما تغيّر ولماذا",
    ],
  },
  {
    name: <><bdi className="hw-nowrap">Hysaab Practice</bdi> و <bdi className="hw-nowrap">Hysaab Audit</bdi></>,
    mode: "للمكاتب المهنية",
    priceText: "رسوم إعداد واشتراك شهري",
    who: "لمكاتب الضرائب والاستشارات ومكاتب التدقيق المرخّصة. استخدم أيًّا من المنتجين وحده، أو كليهما معًا.",
    feats: [
      "Hysaab Practice: منصة العمل الضريبي، وارتباطات العملاء، والأعمال الإدارية للمكتب",
      "Hysaab Audit: ملف التدقيق وفق معايير ISA، من القبول إلى الأرشفة",
      "إعداد يُحدَّد نطاقه لمكتبك، ثم اشتراك شهري واحد",
      <>عملاؤك يبقون عملاءك: <a href="/ar/trust">اقرأ التزاماتنا</a></>,
    ],
  },
];

const SCOPED = [
  /* AR-REVIEW: transactions and overages rows (volume bands, 2026-09-30) */
  ["المعاملات", "المعاملة هي كل فاتورة مورّد، وكل فاتورة مبيعات، وكل سطر في كشف الحساب البنكي يعالجه Hysaab خلال الشهر. تبدأ الخدمة الذاتية من 199* دولارًا شهريًا لما يصل إلى 100 معاملة؛ ثم 399* دولارًا حتى 250، و649* دولارًا حتى 500، و999* دولارًا حتى 1,000. وما يزيد على 1,000، أو دفاتر المجموعات، فهو عمل الخدمة المُدارة ويُحدَّد نطاقه. *أسعار استرشادية، نؤكدها كتابةً قبل أن تبدأ."],
  ["فحص الدفاتر المجاني", "نظرة للقراءة فقط على دفاترك في Xero أو QuickBooks: ما يجده Hysaab، دون أن يُكتب شيء في دفتر الأستاذ. وهو مجاني. تبدأ الرسوم حين يعمل Hysaab في نظامك المحاسبي بدوام كامل."],
  ["الكيانات", "تغطي الخدمة الذاتية شركة واحدة على نظام محاسبي واحد متصل. أما المجموعات والكيانات المتعددة فهي من عمل الخدمة المُدارة وتُسعَّر بحسب النطاق."],
  ["الإعداد الأولي", "ربط الدفاتر والاتفاق على قواعد الاعتماد يتمّان قبل الشهر الأول. الإعداد مشمول؛ والوقت الذي يستغرقه يعتمد على حال الدفاتر، ونخبرك به مسبقًا."],
  ["الدعم", "كل عميل يستطيع مراسلة شخص. تضيف الخدمة المُدارة محاسبًا مسمّى ومراجعة شهرية؛ ودعم الخدمة الذاتية بالبريد في ساعات العمل."],
  ["التجاوزات", "إذا تجاوز شهرٌ شريحتك، يواصل Hysaab العمل: لا تتوقف الدفاتر في منتصف الشهر. وتُطبَّق الشريحة التالية من الشهر الذي يليه، ونخبرك قبل ذلك. لا رسوم تجاوز صامتة."],
  ["ضريبة القيمة المضافة على الرسوم", "تذكر عروض الأسعار الرسوم وما إذا كانت ضريبة القيمة المضافة تنطبق عليها، فيكون الرقم الذي توافق عليه هو الرقم الذي تدفعه."],
];

export default function PricingPage() {
  return (
    <PageShell locale="ar" band={{ title: "لست متأكدًا أي طريقة تناسبك؟", body: "أخبرنا عن دفاترك أو مكتبك: الأنظمة، والكيانات، والعمل الذي يستغرق وقتًا أطول مما ينبغي. نؤكد النطاق والرسوم كتابةً قبل أي التزام." }}>
      <PageHero
        locale="ar"
        eyebrow="الأسعار"
        title={<>بحجم العمل،<br /><span>لا بعدد المقاعد.</span></>}
        lede="خدمة ذاتية، أو مُدارة، أو للمكاتب المهنية. الرسوم تتبع العمل، لا عدد من يسجّلون الدخول."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>احجز عرضًا تجريبيًا <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB.ar}</span></a>
        <a className="hw-link hw-link--light" href="/ar/how-it-works"><span className="hw-play" aria-hidden="true">▷</span> شاهد كيف يعمل</a>
      </PageHero>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">ثلاث طرق للبدء</p>
              <h2>رسم شهري واحد.<br /><span>لا رسوم لكل مستخدم.</span></h2>
            </div>
            <p>الأسعار بالدولار الأمريكي. ابدأ <a href="/check">بفحص دفاتر</a> مجاني للقراءة فقط؛ وتبدأ الرسوم حين يعمل Hysaab في نظامك المحاسبي، وهي تتبع العمل لا عدد من يسجّلون الدخول.</p>
          </div>

          <div className="hw-plans" data-play="">
            {TIERS.map((t) => (
              <article key={t.mode} className={t.hero ? "is-featured" : undefined}>
                <p className="hw-eyebrow">{t.mode}</p>
                <h3>{t.name}</h3>
                {t.price
                  ? <p className="hw-plan-price"><small>من</small> <span dir="ltr">USD <DigitRoll value={t.price} delay={200} /><a className="tt-ast" href="#bands" aria-label="سعر استرشادي: انظر الملاحظة أسفل شرائح الحجم">*</a></span><small>شهريًا</small></p>
                  : <p className="hw-plan-price hw-plan-price--text">{t.priceText}</p>}
                <p>{t.who}</p>
                <ul className="hw-ticks">
                  {t.feats.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <a className={`hw-btn ${t.hero ? "hw-btn--peach" : "hw-btn--navy"}`} {...DEMO}>
                  احجز عرضًا تجريبيًا <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB.ar}</span>
                </a>
              </article>
            ))}
          </div>

          <PriceBands locale="ar" />

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
            <p>للفرق المالية، تختلف الخطتان في من يدير العمل وفي حجمه. أما الضوابط فواحدة في الخطتين.</p>
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
            <p>تعمل الخطتان مع نظام محاسبي واحد متصل. اطّلع على <a href="/ar/integrations">الأنظمة التي يتصل بها Hysaab</a>، و<a href="/ar/accounting">ما تغطيه مساحة العمل</a>، و<a href="/ar/faq">الأسئلة التي يطرحها الناس أولًا</a>.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
