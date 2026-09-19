import Image from "next/image";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { Terminal } from "@/components/Terminal";
import { langAlternates } from "@/lib/site-meta";

export const revalidate = 60;

export const metadata = {
  title: "Hysaab — دفاترك، مُنجزة سلفًا",
  description:
    "نظام التشغيل المالي للخليج. الذمم الدائنة والمدينة ودفتر الأستاذ والضرائب والإقفال الشهري — يديرها فريق من الوكلاء، وتحت إشرافك أنت.",
  alternates: langAlternates("/accounting"),
};

type Shot = { src: string; w: number; h: number; alt: string };

function Feature({ eyebrow, title, body, shot, cap, dark }: { eyebrow: string; title: React.ReactNode; body: React.ReactNode; shot: Shot; cap: string; dark?: boolean }) {
  return (
    <section className={dark ? "hw-block--dark" : "hw-block--rule"}>
      <div className="hw-wrap hw-section">
        <div className="hw-feature">
          <div className="hw-feature-copy">
            <p className="hw-eyebrow">{eyebrow}</p>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
          <div className="hw-shot">
            <Image src={shot.src} width={shot.w} height={shot.h} sizes="(max-width: 760px) 100vw, 55vw" alt={shot.alt} style={{ width: "100%", height: "auto", borderRadius: 4, border: "1px solid var(--hw-hairline)" }} />
            <p className="hw-shot-cap">{cap}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AccountingPage() {
  return (
    <PageShell locale="ar" band={{ title: "عشنا الإقفال الشهري الذي نحذفه اليوم.", body: "في كل إقفال، الطقس نفسه: إيصالات تُلاحَق على واتساب، وفواتير تُدقَّق في منتصف الليل، وموعد ضريبة القيمة المضافة يلهث خلف الربع. بنينا الزميل الذي طالما تمنيناه: زميل يؤدي العمل الروتيني ويعرض أدلته ويترك القرار لك." }}>
      <PageHero
        eyebrow="فريق مالي بالذكاء الاصطناعي للإمارات والسعودية"
        title={<>دفاترك، مُنجزة سلفًا.<br /><span>والقرار لك.</span></>}
        lede="الذمم الدائنة والمدينة ودفتر الأستاذ والضرائب والإقفال الشهري — يديرها فريق من الوكلاء، ويترك القرار لك."
        locale="ar"
      >
        <a className="hw-btn hw-btn--peach" href="/ar/contact">لنتحدث <span aria-hidden="true">←</span></a>
        <a className="hw-link hw-link--light" href="#live">سبعون ثانية ترى فيها كيف يبدو</a>
      </PageHero>

      <section id="live">
        <div className="hw-wrap hw-section">
          <div dir="ltr">
            <Terminal />
          </div>
        </div>
      </section>

      <Feature
        dark
        eyebrow="الأموال الصادرة"
        title={<>كل فاتورة تخفي سؤالين: هل رُمِّزت صحيحًا، وهل الضريبة قابلة للخصم؟</>}
        body={<>يرمّزها Hysaab فور وصولها من ذاكرة دفتر أستاذك أنت، ثم يختبرها ضريبيًا وفق القانون الإماراتي. هذه الفاتورة <strong>ترسب في اختبار المادة 59</strong> — الرقم الضريبي للمورد مفقود — فتُحجز ضريبة المدخلات ولا تُطالَب. ونسخة مكررة أُوقفت قبل أن تُرحَّل أصلًا.</>}
        shot={{ src: "/shots/adv-payables.png", w: 1600, h: 1256, alt: "الذمم الدائنة في Hysaab — اختبار الضريبة مدمج في سطر الفاتورة" }}
        cap="الذمم الدائنة — طبقة الضريبة مدمجة في كل سطر، وأدلتها مرفقة."
      />

      <Feature
        eyebrow="الطبقة الإقليمية"
        title={<>أدواتك العالمية لا تعرف ما تطلبه الهيئة الاتحادية للضرائب أو «زاتكا». هذا النظام بُني هنا.</>}
        body={<>ضريبة القيمة المضافة وضريبة الشركات تُسوَّيان كل شهر، وكل موعد نهائي يتعقبه حارس، والفواتير الإلكترونية تُخلَّص وتُحفظ مع إثباتها. وفجوة الـ200,000 درهم؟ مُفسَّرة، ومُسندة إلى القيد.</>}
        shot={{ src: "/shots/adv-tax.png", w: 1600, h: 1011, alt: "ذكاء الضرائب الخليجي في Hysaab — تسوية القيمة المضافة مع ضريبة الشركات وحارس الإقرارات" }}
        cap="الضرائب — التسوية والمواعيد والتخليص، في مكان واحد."
      />

      <Feature
        dark
        eyebrow="السجل الدائم"
        title={<>لا شيء يُحذف أبدًا. والأخطاء تُعكس على المكشوف.</>}
        body={<>كل قيد يحمل مَن أنشأه، ولماذا، والمستند الذي خلفه — وكلٌّ منها يُرحِّله وكيل مُسمّى بدرجة ثقة معلنة. إقفالٌ تسلّمه للمدقق دون أن يرفّ لك جفن.</>}
        shot={{ src: "/shots/adv-ledger.png", w: 1600, h: 990, alt: "دفتر الأستاذ العام في Hysaab — حركة القيود مع تعليقات الوكلاء والأدلة" }}
        cap="دفتر الأستاذ — كل قيد مُفسَّر، ودليله على بعد نقرة."
      />

      <Feature
        eyebrow="الأموال الواردة"
        title={<>من يدين لك — وما العمل حياله، وقد لوحق بالفعل.</>}
        body={<>تذكيرات التحصيل تكتب نفسها بوتيرة توافق عليها مرة واحدة؛ لا شيء يُرسل من دونك. ومخاطر الشطب تُرصد لها مخصصات وفق سياستك، تلقائيًا.</>}
        shot={{ src: "/shots/adv-receivables.png", w: 1600, h: 1297, alt: "الذمم المدينة في Hysaab — طابور التحصيل وفترة التحصيل وأعمار الذمم" }}
        cap="الذمم المدينة — دليل التحصيل، مُصاغًا ومُلاحَقًا ومُسوًّى."
      />

      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">الإقفال الشهري</p>
              <h2>كان الإقفال الشهري يستغرق أسابيع.</h2>
            </div>
            <p>الاستحقاقات مقترحة، والانحرافات معلَّمة، والبنك مُطابَق، وإقرار ضريبة القيمة المضافة مُسوَّد — جانب Hysaab منجز قبل أن تفتح الشاشة. ما تبقى قرارك أنت. ثم تختم الشهر بلمسة واحدة، فلا يتغير بعدها في الخفاء أبدًا.</p>
          </div>
          <div className="hw-feature">
            <div className="hw-feature-copy">
              <h3>‏78% مُنجز قبل أن تستيقظ.</h3>
              <p>قائمة إقفال توضيحية أُنجزت على بيانات تجريبية.</p>
            </div>
            <div className="hw-shot">
              <Image src="/shots/adv-close.png" alt="قمرة الإقفال في Hysaab — قائمة نهاية الشهر مع استحقاقات مقترحة من المحرك" width={1600} height={1170} sizes="(max-width: 760px) 100vw, 55vw" style={{ width: "100%", height: "auto", borderRadius: 4, border: "1px solid #3e6356" }} />
              <p className="hw-shot-cap" style={{ color: "var(--hw-cream)" }}>قمرة الإقفال — «هذا يديره Hysaab» في جهة، ومهام دفترك أنت في الجهة الأخرى.</p>
            </div>
          </div>
        </div>
      </section>

      <Feature
        eyebrow="نظام واحد، بأي شكل"
        title={<>شركة واحدة أو خمس. عملة واحدة أو خمس. لغة واحدة أو اثنتان.</>}
        body={<>بدّل بين الكيانات، ووحّد القوائم، واعمل بالعربية كاملة — من اليمين إلى اليسار حتى الأرقام — وبالإنجليزية متى احتجتها. المنتج هو الذي ينحني لك، لا أنت.</>}
        shot={{ src: "/shots/adv-arabic.png", w: 1600, h: 1360, alt: "Hysaab بالعربية — مساحة العمل كاملة، من اليمين إلى اليسار" }}
        cap="نفس النظام — Hysaab نفسه بالعربية، من اليمين إلى اليسار."
      />
    </PageShell>
  );
}
