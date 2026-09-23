import Image from "next/image";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { InvoiceTerminal } from "@/components/InvoiceTerminal";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

/* 2026-09-23: invoice checks are part of Hysaab Finance ("hysaab invoice"
   is retired as a name); the CTA books a demo. AR-REVIEW: the title,
   description, band, eyebrow, button and alt texts changed here. */

export const metadata = {
  title: "فحص فواتير الموردين قبل المطالبة بالضريبة | Hysaab Finance",
  description:
    "يقرأ Hysaab Finance كل فاتورة مورد، ويفحصها وفق قواعد الفاتورة الضريبية في الإمارات والسعودية، ويكشف التكرار، ويخبرك بما يمكنك المطالبة به بأمان.",
  alternates: langAlternates("/invoice"),
};

export default function InvoicePage() {
  return (
    <PageShell locale="ar" band={{ kicker: "Hysaab Finance · فحص الفواتير", title: "ضع فواتيرك على المحك.", body: "يعمل فحص الفواتير اليوم داخل فرق ضريبية عاملة في الإمارات والسعودية. أخبرنا عن حجم فواتيرك ونطاقك، الإمارات أو السعودية أو كليهما، وسيجهّز لك شخص حقيقي كل شيء خلال يوم عمل واحد." }}>
      <PageHero
        eyebrow="Hysaab Finance · فحص الفواتير"
        title={<>كل فاتورة مورد،<br /><span>مختبرة قبل المطالبة.</span></>}
        lede="أسقط مجلدًا من فواتير الموردين — أو أرسلها بالبريد. يقرأ Hysaab Finance كل سطر، ويعيد فحص الحساب بنفسه، ويختبر كل فاتورة وفق قواعد الهيئة الاتحادية للضرائب وهيئة الزكاة والضريبة والجمارك «زاتكا»، ويرتّب ضريبة القيمة المضافة التي توشك على المطالبة بها حسب المخاطر — قبل تقديم الإقرار، لا بعد التدقيق."
        locale="ar"
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>احجز عرضًا تجريبيًا <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB.ar}</span></a>
        <a className="hw-link hw-link--light" href="#live">كيف يعمل فحص الفواتير</a>
      </PageHero>

      <section id="live">
        <div className="hw-wrap hw-section">
          <div dir="ltr">
            <InvoiceTerminal />
          </div>
        </div>
      </section>

      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">الانكشاف</p>
              <h2>ضريبة المدخلات ليست لك<br /><span>حتى تصمد الفاتورة.</span></h2>
            </div>
            <p>قوة المطالبة من قوة الورق الذي يسندها. رقم ضريبي مفقود، أو مورد احتسب النسبة الخطأ، أو فاتورة مكررة تسللت مرتين — كل واحدة منها مالُك المعرَّض للخطر عند التدقيق. يقرأ Hysaab كل فاتورة يوم وصولها ويسمّي الحقل الراسب بالضبط، فتصبح المشكلة طلب تصحيح في يوليو، لا مطالبة مرفوضة في تدقيق ضريبي.</p>
          </div>
          <div className="hw-cards" style={{ textAlign: "center" }}>
            <article className="is-navy">
              <p style={{ fontSize: 48, fontWeight: 700, fontFamily: "var(--hw-heading)", letterSpacing: "-0.03em", lineHeight: 1, margin: "0 0 8px" }}>214</p>
              <p>فاتورة، أُسقطت في مجلد أو وصلت بالبريد</p>
            </article>
            <article className="is-navy">
              <p style={{ fontSize: 48, fontWeight: 700, fontFamily: "var(--hw-heading)", letterSpacing: "-0.03em", lineHeight: 1, margin: "0 0 8px" }}>100%</p>
              <p>قُرئت وأُعيد جمعها واختُبرت ضريبيًا</p>
            </article>
            <article className="is-navy">
              <p style={{ fontSize: 48, fontWeight: 700, fontFamily: "var(--hw-heading)", letterSpacing: "-0.03em", lineHeight: 1, margin: "0 0 8px" }}>9</p>
              <p>عُلّمت قبل خروج الإقرار</p>
            </article>
          </div>
        </div>
      </section>

      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">القانون، كودًا</p>
              <h2>القواعد التي تطبّقها الهيئة الاتحادية للضرائب،<br /><span>تعمل على كل فاتورة.</span></h2>
            </div>
            <p>متطلبات الفاتورة الضريبية الإماراتية (المادة 59/60) وقواعد الفوترة الإلكترونية لدى هيئة الزكاة والضريبة والجمارك «زاتكا» في السعودية، مطبَّقة فاتورةً فاتورة — والحساب يُعاد فحصه برمجيًا بشكل مستقل.</p>
          </div>
          <div className="hw-cards hw-cards--2">
            <article>
              <p className="hw-eyebrow">ما تُظهره الفاتورة الصحيحة</p>
              <h3>تُختبر حقلًا حقلًا</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                <li>✓ عبارة «فاتورة ضريبية» مذكورة نصًا</li>
                <li>✓ رقم ضريبي فعلي وصحيح للمورد</li>
                <li>✓ ضريبة القيمة المضافة مبيّنة كما يجب، وبالنسبة الصحيحة</li>
                <li>✓ تواريخ وتسلسل وإجماليات تتطابق</li>
              </ul>
            </article>
            <article>
              <p className="hw-eyebrow">ما يلتقطه Hysaab</p>
              <h3>يُسمّى بالاسم، ولا يُمرَّر أبدًا</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                <li>✕ الرقم الضريبي مفقود — ليست فاتورة ضريبية صحيحة</li>
                <li>✕ الضريبة ≠ 5% — الحساب لا يستقيم</li>
                <li>✕ مكررة — الفاتورة نفسها، مرتين</li>
                <li>✕ مطالبة خطرة — موقوفة حتى التصحيح</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">الحكم</p>
              <h2>كل إخفاق مُسمّى.<br /><span>وكل مطالبة يمكن الدفاع عنها.</span></h2>
            </div>
            <p>لا تلويح بإشارات المرور. كل فاتورة تحصل على حكم ومعه الحقل الدقيق الذي بُني عليه، والضريبة الخطرة تُوقف — مع طلب تصحيح مُصاغ جاهز للمورد — بدلًا من المطالبة بها بصمت.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">09:12</span><h3>قراءة INV-2107 · Al Madar Trading · 12,600 درهم</h3></article>
            <article><span className="hw-mono">09:12</span><h3>الأسطر Σ 12,000 + الضريبة 600 = 12,600 ✓</h3></article>
            <article><span className="hw-mono">09:12</span><h3>المادة 59 · الرقم الضريبي للمورد مفقود ← ليست فاتورة ضريبية صحيحة</h3></article>
            <article><span className="hw-mono">09:13</span><h3>إيقاف 600 درهم ضريبة مدخلات · طُلب التصحيح</h3></article>
          </div>
          <div dir="ltr" style={{ marginTop: 40 }}>
            <Image src="/shots/adv-ocr-review.png" alt="مراجعة فحص الفواتير في Hysaab Finance: قراءة OCR، وإعادة فحص الحساب، واختبار المادة 59" width={1600} height={651} sizes="(max-width: 760px) 100vw, 100vw" style={{ width: "100%", height: "auto", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)" }} />
          </div>
          <p className="hw-shot-cap" style={{ color: "var(--hw-cream)" }}>المراجعة — ما قرأه OCR في جهة، ومعايير المادة 59 التسعة في الجهة الأخرى، والحكم في الأعلى.</p>
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">السجل</p>
              <h2>السجل الذي يريد مدققك<br /><span>أن يراه فعلًا.</span></h2>
            </div>
            <p>كل فاتورة وحكم ومطالبة تستقر في سجل واحد — منظم حسب فترة الإقرار الضريبي، مع ما طُولب به وما أُوقف. نقرة واحدة تصدّر السجل كاملًا إلى Excel بتنسيق جاهز للملف الضريبي.</p>
          </div>
          <div dir="ltr" style={{ marginTop: 24 }}>
            <Image src="/shots/adv-ocr-register.png" alt="سجل المخاطر في Hysaab Finance: كل فاتورة مقروءة ومرتبة حسب المخاطر" width={1600} height={875} sizes="(max-width: 760px) 100vw, 100vw" style={{ width: "100%", height: "auto", borderRadius: 4, border: "1px solid var(--hw-hairline)" }} />
          </div>
          <p className="hw-shot-cap">سجل المخاطر — مرتّب حسب مخاطر التدقيق، مع الموقوف والمُلاحَق والجاهز للمطالبة.</p>
          <div className="hw-note" style={{ marginTop: 32 }}>
            <span className="hw-mono">التصدير</span>
            <p>السجل يُصدَّر إلى Excel بأربع ورقات مع تمييز الخلايا منخفضة الثقة. وتقرير الامتثال للعميل يُبنى من الأرقام نفسها.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">لماذا بنينا هذا</p>
              <h2>بنيناه لفريقنا الضريبي<br />قبل أي أحد.</h2>
            </div>
            <div className="hw-prose">
              <p>مكتب الضرائب العامل في الخليج يقوم على فواتير الموردين — مئات كل شهر، وكل واحدة رهان صغير على أن الورق سيصمد. فحصها كما يجب كان يعني ليالي متأخرة مع آلة حاسبة؛ وتركها دون فحص كان يعني حمل الخطر بصمت.</p>
              <p>فبنينا المدقق الذي يشغّله فريقنا يوميًا اليوم: يقرأ <strong>كل</strong> فاتورة، ويعيد <strong>كل</strong> عملية جمع، ويختبر <strong>كل</strong> قاعدة يطبّقها القانون فعلًا — ويضع طريقة عمله على الطاولة، ليبقى قرار الحكم، وعلاقة العميل، لك أنت.</p>
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
