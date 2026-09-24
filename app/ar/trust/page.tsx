/* ── /ar/trust ───────────────────────────────────────────────────────
   Arabic twin of app/(en)/trust/page.tsx (2026-09-23). Same two parts
   from lib/trust.ts. AR-REVIEW: every Arabic string on this page is a
   new draft for the native reviewer (brand/AR-REVIEW.md). The firm
   questions are also DRAFT: owner review. */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { FIRM_QUESTIONS, DATA_CONTROLS } from "@/lib/trust";
import { TrustLadder } from "@/components/home/TrustLadder";

/* AR-REVIEW */
export const metadata = {
  title: "الثقة: التزامات Hysaab تجاه المكاتب المهنية والفرق المالية",
  description:
    "أين يرسم Hysaab حدوده التجارية مع المكاتب المهنية، وكيف يتعامل مع بياناتك: مساحات منفصلة، وسجل لكل إجراء يتخذه الوكلاء، ولا تدريب على بياناتك.",
  alternates: langAlternates("/trust"),
};

export default function TrustPage() {
  return (
    /* AR-REVIEW: every string below */
    <PageShell locale="ar" band={{ title: "اسألنا الأسئلة الصعبة.", body: "أحضر شركاءك أو مسؤول تقنية المعلومات أو مسؤول الامتثال لديك. سنمرّ معكم على كل التزام في هذه الصفحة ونريكم أين يوجد في المنتج." }}>
      <PageHero
        locale="ar"
        eyebrow="الثقة"
        title={<>التزاماتنا تجاه المكاتب المهنية<br /><span>والفرق المالية.</span></>}
        lede="ما الذي سنفعله وما لن نفعله مع عملائك، وكيف نرعى بياناتك. مكتوبة التزاماتٍ يمكنك محاسبتنا عليها."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>احجز عرضًا تجريبيًا <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB.ar}</span></a>
        <a className="hw-link hw-link--light" href="#controls">كيف نرعى بياناتك</a>
      </PageHero>

      <section id="boundaries">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">الجزء الأول · الحدود التجارية</p>
              <h2>عملاؤك يبقون عملاءك.<br /><span>خمسة أسئلة تطرحها المكاتب.</span></h2>
            </div>
            <p>المكاتب التي تفكر في Hysaab Practice أو Hysaab Audit تسألنا هذه الأسئلة أولًا. وهذه إجاباتنا.</p>
          </div>
          <div className="hw-faq">
            {FIRM_QUESTIONS.ar.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <div className="hw-faq-a"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* AR-REVIEW: the trust ladder (2026-09-24), strings in components/home/TrustLadder.tsx */}
      <TrustLadder locale="ar" />

      <section id="controls" className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">الجزء الثاني · ضوابط البيانات</p>
              <h2>كيف نرعى بياناتك.<br /><span>للمكاتب والفرق المالية على السواء.</span></h2>
            </div>
            <p>الالتزامات الخمسة نفسها تسري في Hysaab Finance وHysaab Practice وHysaab Audit.</p>
          </div>
          <div className="hw-rows">
            {DATA_CONTROLS.ar.map((c, i) => (
              <article key={c.h}>
                <span className="hw-mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </article>
            ))}
          </div>
          <div className="hw-note" style={{ borderColor: "#536477" }}>
            <span className="hw-mono">ما هذه الالتزامات</span>
            <p>هذه التزامات نقطعها لكل عميل، وليست شهادة من طرف ثالث. اسألنا عن التفاصيل وراء أيٍّ منها.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">للمزيد</p>
              <h2>بقية القواعد.</h2>
            </div>
            <p>كيف تعمل الفحوص الضريبية والاعتمادات وأقفال الفترات، وما الذي يفعله هذا الموقع ببياناتك.</p>
          </div>
          <div className="hw-cards">
            <article>
              <p className="hw-eyebrow">الضرائب والضوابط</p>
              <h3>الامتثال</h3>
              <p>قواعد ضريبة القيمة المضافة وضريبة الشركات في الإمارات وقواعد ZATCA تُختبر قبل أي ترحيل، مع الاعتمادات وأقفال الفترات.</p>
              <a className="hw-link" href="/ar/compliance">اقرأ صفحة الامتثال <span aria-hidden="true">←</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">إجابات مباشرة</p>
              <h3>الأسئلة الشائعة</h3>
              <p>ما يفعله Hysaab من تلقاء نفسه، وما لا يفعله أبدًا، وكم يكلّف.</p>
              <a className="hw-link" href="/ar/faq">اقرأ الأسئلة الشائعة <span aria-hidden="true">←</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">هذا الموقع</p>
              <h3>إشعار الخصوصية</h3>
              <p>ما يجمعه هذا الموقع حين تراسلنا أو تحجز عرضًا تجريبيًا، وما لا يجمعه. الإشعار بالإنجليزية.</p>
              <a className="hw-link" href="/privacy">اقرأ إشعار الخصوصية <span aria-hidden="true">←</span></a>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
