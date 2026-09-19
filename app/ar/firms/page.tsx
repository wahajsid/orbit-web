import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "hysaab services OS — نظام التشغيل لمكاتب الخدمات المهنية",
  description:
    "hysaab services OS: نظام تشغيل مكاتب الخدمات المهنية، ارتباطات العملاء والمواعيد النهائية والإشراف في مكان واحد ليقضي الشركاء وقتهم في الحكم المهني.",
  alternates: langAlternates("/firms"),
};

const FEATURES: { k: string; h: string; p: string }[] = [
  { k: "العملاء", h: "العملاء والمجموعات والمذكرات", p: "كل عميل ومجموعة وجهة اتصال في مكان واحد — مع مذكرات قابلة للبحث موسومة بضريبة القيمة المضافة أو ضريبة الشركات أو عام، فلا يغادر السياقُ المكتبَ مع الشخص الذي كان يحمله." },
  { k: "الارتباطات", h: "الارتباطات وقائمة طلبات المعلومات", p: "ضريبة القيمة المضافة الشهرية، وضريبة الشركات السنوية، والاستشارات — كل ارتباط يحمل أوراق عمله وقائمة طلبات المعلومات الخاصة به، من العرض إلى خطاب الارتباط إلى التنفيذ." },
  { k: "سجلات الوقت", h: "الوقت، مسجل على العمل نفسه", p: "سجّل ساعة على عميل أو ارتباط بنقرة واحدة — دون تطبيق منفصل لسجلات الوقت. وشاهد نسبة التحقق لكل ارتباط ولكل شخص، دون بناء جدول بيانات." },
  { k: "المشاريع", h: "المصروفات وتكاليف المشاريع", p: "تتبّع النثريات والمصروفات وتكلفة الخدمة على العميل والارتباط الصحيحين — فلا تبقى التكلفة الفعلية لأي مهمة لغزًا في نهايتها." },
  { k: "الإقرارات", h: "إقرارات لا تفوت أبدًا", p: "كل موعد نهائي مُتتبَّع ويُصعَّد مع اقترابه. الرقيب الذي يعني أن موعد الإقرار لن يفاجئك مرة أخرى — مع أوراق العمل مرتبطة به." },
  { k: "المساعد الذكي", h: "اسأل عن أي عميل", p: "وكلاء منسوجون في كل مكان: ملخصات للعملاء عند الطلب، وقراءة ضوئية لما ترفعه، والمسائل التي تحتاج نظرة شريك تُرفع إليك مبكرًا." },
];

const TREE: { indent: number; tag: string; name: string; meta: string }[] = [
  { indent: 0, tag: "المجموعة", name: "ELC Group", meta: "· 4 كيانات" },
  { indent: 1, tag: "العميل", name: "Richemont Middle East FZE", meta: "· نشط · ضريبة القيمة المضافة + ضريبة الشركات" },
  { indent: 2, tag: "الارتباط", name: "ضريبة القيمة المضافة — شهري", meta: "· أوراق العمل · قائمة طلبات المعلومات · 12 إقرارًا" },
  { indent: 2, tag: "الارتباط", name: "ضريبة الشركات — السنة المالية 2025", meta: "· عرض ← خطاب ارتباط" },
  { indent: 1, tag: "العميل", name: "Corniche Capital Ltd", meta: "· استكشاف ← عرض" },
  { indent: 2, tag: "الإقرار", name: "ضريبة القيمة المضافة — الربع الثاني 2026 · تُستحق 28 يوليو", meta: "· ‏T-14 · أوراق العمل مرتبطة" },
];

export default function FirmsPage() {
  return (
    <PageShell locale="ar" band={{ kicker: "قريبًا", title: "كن أول من يدخل.", body: "يفتح hysaab services OS أبوابه لدفعة أولى صغيرة من مكاتب الخليج. حدّثنا عن مكتبك وسندخلك مبكرًا — بشروط المؤسسين." }}>
      <PageHero
        eyebrow="hysaab services OS · لمكاتب الضرائب والمحاسبة"
        title={<>لم تبنِ مكتبك<br /><span>لتلاحق خطابات الارتباط.</span></>}
        lede="hysaab services OS هو نظام التشغيل لمكاتب الضرائب والمحاسبة — العملاء، والارتباطات، وسجلات الوقت، والإقرارات، والمصروفات، وفريقك، تُدار كوحدة واحدة، والوكلاء يتولون العمل الروتيني. بناه مكتب خليجي عاش الفوضى بنفسه."
        locale="ar"
      >
        <a className="hw-btn hw-btn--peach" href="/ar/contact">احصل على وصول مبكر <span aria-hidden="true">←</span></a>
        <a className="hw-link hw-link--light" href="#what">ماذا يفعل hysaab services OS</a>
      </PageHero>

      <section className="hw-block--rule" id="what">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">المكتب اليوم</p>
              <h2>المكتب يقوم على الحُكم المهني.<br /><span>ويغرق في الأعمال الإدارية.</span></h2>
            </div>
            <p>عملاء مبعثرون بين البريد والمجلدات. خطابات ارتباط تُلاحق يدويًا. أوراق عمل على مساحة مشتركة لا يثق بها أحد. تقويم إقرارات في ثلاثة أماكن. والمشورة التي يدفع عملاؤك مقابلها هي آخر ما يجد أحدٌ وقتًا له.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">مكان واحد للمكتب كله</p>
              <h2>كل عميل، وكل ارتباط،<br /><span>وكل إقرار.</span></h2>
            </div>
            <p>العملاء، والارتباطات، وسجلات الوقت، والإقرارات، وأوراق العمل، والمصروفات، وفريقك — منظمة في هيكل واحد نظيف، فلا يبقى شيء يتيمًا أبدًا، وتاريخ العميل كله على بُعد نقرة من العمل الذي أمامك.</p>
          </div>
          <div className="hw-cards">
            {FEATURES.map((f) => (
              <article key={f.k}>
                <p className="hw-eyebrow">{f.k}</p>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">الهيكل</p>
              <h2>من المجموعة نزولًا إلى<br /><span>الإقرار.</span></h2>
            </div>
            <p>كل شيء معلّق على تسلسل هرمي نظيف — فلا يبقى شيء يتيمًا أبدًا، وتاريخ العميل كله على بُعد نقرة واحدة من العمل الذي أمامك.</p>
          </div>
          <div className="hw-rows">
            {TREE.map((r) => (
              <article key={r.name} style={{ paddingInlineStart: r.indent * 28 }}>
                <span className="hw-mono">{r.tag}</span>
                <h3>{r.name}</h3>
                <p>{r.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">الصورة الأكبر</p>
              <h2>ثلاثة منتجات.<br /><span>مهمة واحدة.</span></h2>
            </div>
            <div className="hw-prose">
              <p>نحن نغيّر الطريقة التي تُنجز بها الضرائب والمحاسبة والخدمات المحيطة بهما في الخليج — على يد محاسبين عاشوا كل ليلة متأخرة منها، لا مهندسين يخمّنون. Hysaab يدير الدفاتر. Ibtidah يدير التوظيف. hysaab services OS يدير المكتب نفسه.</p>
              <p>عائلة واحدة، وتصميم واحد، ومعيار واحد: البرنامج يؤدي العمل الروتيني ويُظهر أدلته — ويبقى الحُكم المهني، وعلاقة العميل، لك أنت.</p>
            </div>
          </div>
          <div className="hw-note">
            <span className="hw-mono">منتجاتنا</span>
            <p><a href="/ar">Hysaab — نظام التشغيل المالي <span aria-hidden="true">←</span></a></p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
