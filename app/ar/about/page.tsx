/* ── /ar/about ───────────────────────────────────────────────────────
   Arabic twin of app/(en)/about/page.tsx, rebuilt 2026-09-23 (website
   change plan): the origin story, Hysaab as a separate company, Oblique's
   accountants on the managed service, Simpla on the engineering, and the
   two founders. The five principles keep their existing translation.
   AR-REVIEW: strings marked below are new drafts for the native
   reviewer (brand/AR-REVIEW.md). */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { TEAM } from "@/lib/team";

/* AR-REVIEW */
export const metadata = {
  title: "عن Hysaab: أدّينا العمل قبل أن نبني المنتج",
  description:
    "Hysaab شركة مستقلة، بناها في دبي الفريق الذي يقف وراء Oblique Consult، وهندستها Simpla. ومحاسبو Oblique يديرون الخدمة المُدارة.",
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

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.ar}</span>;

export default function AboutPage() {
  return (
    /* AR-REVIEW: the band, hero, story, organisation, founders, products
       and closing strings below are new drafts. */
    <PageShell locale="ar" band={{ title: "أخبرنا بما يستغرق وقتًا أطول مما ينبغي.", body: "أحضر عملية واحدة من إقفالك الشهري، أو إقرارًا واحدًا من مكتبك. سنريك أين يناسبك Hysaab، ثم نؤكد النطاق والرسوم قبل أي التزام." }}>
      <PageHero
        locale="ar"
        eyebrow="لماذا بنيناه"
        title={<>أدّينا العمل<br /><span>قبل أن نبني المنتج.</span></>}
        lede="بُني Hysaab في دبي على يد محاسبين أدّوا بأنفسهم الإقفال الشهري وإقرارات ضريبة القيمة المضافة واستفسارات الهيئة الاتحادية للضرائب، لعملائهم، قبل أن يصبح أي من ذلك برنامجًا."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>احجز عرضًا تجريبيًا <span aria-hidden="true">↗</span>{newTab}</a>
        <a className="hw-link hw-link--light" href="/ar/accounting"><span className="hw-play" aria-hidden="true">▷</span> شاهد Hysaab Finance</a>
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
              <p>إيصالات تُلاحَق على واتساب. فواتير تُدقَّق في منتصف الليل. موعد ضريبة القيمة المضافة يقترب مع نهاية الربع. والأرقام المهمة فعلًا لا يلمسها أحد.</p>
              <p>تؤدي Oblique Consult أعمال الضرائب والمحاسبة لشركات الخليج. رأينا فرقًا مالية قديرة، ومنها فريقنا، تقضي لياليها في العمل الإداري وتفوّت ما تقوله البيانات.</p>
              <p>فدوّنّا طريقة عملنا الفعلية: الفحوص التي نجريها على كل فاتورة، وطريقة إقفالنا للشهر، والأسئلة التي يطرحها المراجع قبل التوقيع. ثم بنينا وكلاء يؤدون ذلك العمل، ويعرضون أدلتهم، ويتركون الحكم لشخص. أولًا لفريقنا الضريبي، ثم للشركات من حولنا، والآن للفرق المالية والمكاتب المهنية في أنحاء الخليج.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="hw-block--family">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">كيف ننتظم</p>
              <h2>شركة مستقلة.<br /><span>والأشخاص أنفسهم.</span></h2>
            </div>
            <p>من يبني Hysaab، ومن يبيعه، ومن يؤدي العمل حين تطلب منا إدارته معك.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>Hysaab شركة قائمة بذاتها.</h3><p>Hysaab شركة مستقلة عن Oblique Consult. تبني البرنامج وتبيعه: Hysaab Finance للفرق المالية، وHysaab Practice وHysaab Audit للمكاتب المهنية.</p></article>
            <article><span className="hw-mono">02</span><h3>محاسبو Oblique يديرون الخدمة المُدارة.</h3><p>حين تختار شركة الخدمة المُدارة، يدير محاسبو Oblique Consult قائمة العمل ويجهّزون الإقفال مع فريقها، مستخدمين Hysaab كل يوم.</p></article>
            <article><span className="hw-mono">03</span><h3>Simpla تتولى هندسة المنتج.</h3><p>الهندسة من Simpla، فريق في دبي يبني الذكاء الاصطناعي للضرائب والمحاسبة، ويعمل على الطاولة نفسها مع المحاسبين.</p></article>
            <article><span className="hw-mono">04</span><h3>مساحة عملك تبقى لك.</h3><p>لا ترى Oblique Consult مساحة عمل أي عميل إلا إذا اختار الخدمة المُدارة أو منح إذنًا كتابيًا. <a href="/ar/trust">اقرأ التزاماتنا</a>.</p></article>
          </div>
        </div>
      </section>

      <section className="hw-team">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">المؤسسون</p>
              <h2>محاسبون ومهندسون.<br /><span>على الطاولة نفسها.</span></h2>
            </div>
            <p>خبرة مالية وهندسة منتجات، تعملان معًا في دبي.</p>
          </div>
          <div className="hw-team-orgs">
            <a href="https://obliqueconsult.com" target="_blank" rel="noopener">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/partners/oblique-consult.svg" alt="Oblique Consult" width={1011} height={386} loading="lazy" />
              <span><strong>Oblique Consult</strong>ضرائب ومحاسبة واستشارات. دبي. محاسبوها يديرون الخدمة المُدارة.<span className="hw-sr"> (يفتح في تبويب جديد)</span></span>
            </a>
            <a href="https://www.simpla.ai" target="_blank" rel="noopener">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/partners/simpla.png" alt="Simpla" width={1024} height={304} loading="lazy" />
              <span><strong>Simpla</strong>ذكاء اصطناعي للضرائب والمحاسبة. دبي. المهندسون وراء Hysaab.<span className="hw-sr"> (يفتح في تبويب جديد)</span></span>
            </a>
          </div>
          <div className="hw-team-grid hw-team-grid--founders">
            {TEAM.map((p) => (
              <article key={p.name}>
                <span className="hw-team-initials" aria-hidden="true">{p.initials}</span>
                <h3 lang="en">{p.name}</h3>
                <p className="hw-team-role">{p.ar.role} · {p.ar.org}</p>
                {p.ar.bio && <p>{p.ar.bio}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">ما نؤمن به</p>
              <h2>خمس قواعد.<br /><span>ثابتة على كل شاشة.</span></h2>
            </div>
            <p>هذه هي المعايير التي عملنا بها كمحاسبين. وHysaab مبني ليحافظ عليها.</p>
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
              <p className="hw-eyebrow">المنتجات</p>
              <h2>طريقة عمل واحدة.<br /><span>ثلاثة منتجات ومنتج شقيق.</span></h2>
            </div>
            <p>نغيّر طريقة إنجاز الضرائب والمحاسبة والتدقيق في الخليج. لكل منتج مهمة واضحة.</p>
          </div>
          <div className="hw-cards hw-cards--4">
            <article className="is-navy">
              <p className="hw-eyebrow">للفرق المالية</p>
              <h3>Hysaab Finance</h3>
              <p>وكلاء ذكاء اصطناعي للمحاسبة والتقارير، وفريقك يعتمد القرارات المهمة.</p>
              <a className="hw-link hw-link--peach" href="/ar/accounting">استكشف Hysaab Finance <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">لمكاتب الضرائب والاستشارات</p>
              <h3>Hysaab Practice</h3>
              <p>وكلاء ذكاء اصطناعي للعمل الضريبي، والأعمال الإدارية للمكتب تدير نفسها من حوله.</p>
              <a className="hw-link" href="/ar/firms">استكشف Hysaab Practice <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">لمكاتب التدقيق المرخّصة</p>
              <h3>Hysaab Audit</h3>
              <p>ملف التدقيق وفق معايير ISA، تديره المحركات ويستنتجه شركاؤك.</p>
              <a className="hw-link" href="/audit">استكشف Hysaab Audit (بالإنجليزية) <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">التوظيف في المالية</p>
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
                <p className="hw-eyebrow">أين تجدنا</p>
                <h2>مبني في دبي.</h2>
              </div>
            </div>
            <div className="hw-prose">
              <p>
                بناه الفريق الذي يقف وراء{" "}
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
