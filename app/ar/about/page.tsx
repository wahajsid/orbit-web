/* ── /ar/about ───────────────────────────────────────────────────────
   الترجمة العربية لصفحة /about الحالية (PageShell + عدة hw-* في
   app/hysaab-home.css). الصفحة الإنجليزية هي المرجع للبنية والادعاءات:
   مبني في دبي على يد محاسبين، أولًا لفريقهم الضريبي ثم للشركات من
   حولهم. المبادئ مقصورة على سلوك تملكه مساحة العمل فعلًا. الملكية
   مذكورة بوضوح: أحد منتجات Oblique Consult. */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "عن Hysaab: لماذا بنيناه",
  description:
    "Hysaab بُني في دبي على يد محاسبين عاشوا الإقفال الشهري بأنفسهم. أحد منتجات Oblique Consult، وهندسته من Simpla.",
  alternates: langAlternates("/about"),
};

const PRINCIPLES = [
  {
    n: "01",
    h: "كل رقم يعود إلى مستند.",
    p: "الأدلة ليست خيارًا. كل قيد يحتفظ بتعليقه وبالمستندات التي وراءه، فيمكن فتح أي رقم والتحقق منه.",
  },
  {
    n: "02",
    h: "لا شيء يُحذف.",
    p: "الأخطاء تُعكس في العلن، بقيود مرآتية لها سببها الخاص. ويبقى سجل ما حدث كاملًا.",
  },
  {
    n: "03",
    h: "Hysaab يُعدّ. والأشخاص يعتمدون.",
    p: "العمل يُعدّ ويُعرض عليك مع منطقه. الاستحقاقات ودفعات السداد وقفل الفترة تنتظر شخصًا، والتجاوز يحتاج إلى سبب مكتوب يُحفظ مع الدفاتر.",
  },
  {
    n: "04",
    h: "الامتثال هو الوضع الافتراضي.",
    p: "الفواتير تُختبر وفق قواعد الفاتورة الضريبية عند وصولها، وضريبة المدخلات تُحجز حتى يستوفي المستند الشروط. أنت تراجع وتقدّم الإقرار؛ Hysaab لا يقدّم الإقرارات عنك.",
  },
  {
    n: "05",
    h: "صريح فيما فعل.",
    p: "ينبغي للبرنامج أن يقول بوضوح ما فعله وما لا يستطيع فعله. البنود غير المؤكدة تصلك مع سببها، والتعليمات المشكوك فيها تُعترض، وبعضها يُرفض.",
  },
];

export default function AboutPage() {
  return (
    <PageShell locale="ar" band={{ title: "أخبرنا بما يستغرق وقتًا أطول مما ينبغي.", body: "أحضر عملية واحدة من إقفالك الشهري. سنريك أين يناسبك Hysaab، ثم نؤكد النطاق والرسوم قبل أي التزام." }}>
      <PageHero
        locale="ar"
        eyebrow="لماذا بنيناه"
        title={<>عشنا<br /><span>هذا الإقفال الشهري.</span></>}
        lede="Hysaab مبني في دبي على يد محاسبين عاشوا هذه العمليات بأنفسهم: الإقفال الشهري، وإقرارات ضريبة القيمة المضافة، واستفسارات الهيئة الاتحادية للضرائب. لم يُصمَّم بالتخمين."
      >
        <a className="hw-btn hw-btn--peach" href="/ar/contact">لنتحدث <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="/ar/product"><span className="hw-play" aria-hidden="true">▷</span> شاهد المنتج</a>
      </PageHero>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div className="hw-heading" style={{ display: "block", marginBottom: 0 }}>
              <div>
                <p className="hw-eyebrow">من أين جاء Hysaab</p>
                <h2>الطقس نفسه،<br /><span>في كل إقفال.</span></h2>
              </div>
            </div>
            <div className="hw-prose">
              <p>
                إيصالات تُلاحَق عبر واتساب. فواتير تُدقَّق في منتصف الليل. موعد نهائي لضريبة القيمة
                المضافة يقترب مع نهاية الربع. والأرقام التي تهم فعلًا، لم يمسّها أحد.
              </p>
              <p>
                رأينا فرقًا مالية قادرة تقضي لياليها في عمل إداري وتفوّت القيمة الحقيقية الماثلة
                أمامها: ما كانت البيانات تقوله.
              </p>
              <p>
                فبنينا الزميل الذي طالما أردناه. زميل يُعدّ العمل، ويُظهر الأدلة، ويترك الحكم لك.
                أولًا لفريقنا الضريبي، ثم للشركات من حولنا، والآن للخليج.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">ما نؤمن به</p>
              <h2>خمس قواعد.<br /><span>حاضرة في كل شاشة.</span></h2>
            </div>
            <p>هذه هي المعايير التي عملنا بها بصفتنا محاسبين. وHysaab مبني ليحافظ عليها.</p>
          </div>
          <div className="hw-rows">
            {PRINCIPLES.map((r) => (
              <article key={r.n}>
                <span className="hw-mono">{r.n}</span>
                <h3>{r.h}</h3>
                <p>{r.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">العائلة</p>
              <h2>مهمة واحدة.<br /><span>منتجات متكاملة.</span></h2>
            </div>
            <p>تغيير طريقة إنجاز الضرائب والمحاسبة والخدمات المحيطة بها في الخليج. لكل منتج مهمة واضحة.</p>
          </div>
          <div className="hw-cards hw-cards--4">
            <article className="is-navy">
              <p className="hw-eyebrow">المحاسبة والتقارير</p>
              <h3>Hysaab</h3>
              <p>محاسبتك وتقاريرك اليومية، مع حكم بشري حيث يهم.</p>
              <a className="hw-link hw-link--peach" href="/ar/product">استكشف المنتج <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">معالجة الفواتير</p>
              <h3>hysaab invoice</h3>
              <p>يختبر فواتير الموردين وفق قواعد الهيئة الاتحادية للضرائب وهيئة الزكاة والضريبة والجمارك (ZATCA)، مع ذكر السبب لكل ما يُحجز للمراجعة.</p>
              <a className="hw-link" href="/ar/invoice">استكشف Invoice <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">عمليات المكاتب</p>
              <h3>hysaab services OS</h3>
              <p>ارتباطات العملاء والمواعيد النهائية والإشراف لمكاتب الخدمات المهنية، معًا في مكان واحد.</p>
              <a className="hw-link" href="/ar/firms">استكشف Services OS <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">الكفاءات المالية</p>
              <h3>Ibtidah</h3>
              <p>اعثر على كفاءات مالية عبر تقييم قائم على العمل، مع محترفين ذوي خبرة يعدّون القائمة المختصرة.</p>
              <a className="hw-link" href="/hire">تعرّف على Ibtidah <span aria-hidden="true">↗</span></a>
            </article>
          </div>
        </div>
      </section>

      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div className="hw-heading" style={{ display: "block", marginBottom: 0 }}>
              <div>
                <p className="hw-eyebrow">من يقف وراءه</p>
                <h2>مبني في دبي.</h2>
              </div>
            </div>
            <div className="hw-prose">
              <p>
                Hysaab أحد منتجات{" "}
                <a href="https://obliqueconsult.com" target="_blank" rel="noopener">Oblique Consult</a>.
              </p>
              <p>
                نحن في دبي، الإمارات العربية المتحدة، ونعمل في أنحاء الإمارات والسعودية، بالإنجليزية
                والعربية. راسلنا على <a href="mailto:info@hysaab.ai">info@hysaab.ai</a>. شخص حقيقي
                يقرأ كل رسالة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
