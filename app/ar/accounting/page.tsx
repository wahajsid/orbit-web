import Image from "next/image";
import "../../advert.css";
import { Terminal } from "@/components/Terminal";
import { LedgerForm } from "@/components/LedgerForm";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { NpEnhance } from "@/components/NpEnhance";
import { getNextSeat, FOUNDING_SEATS } from "@/lib/launch";
import { langAlternates } from "@/lib/site-meta";

export const revalidate = 60;

export const metadata = {
  title: "Orbit — دفاترك، مُنجزة سلفًا",
  description:
    "نظام التشغيل المالي للخليج. الذمم الدائنة والمدينة ودفتر الأستاذ والضرائب والإقفال الشهري — يديرها فريق من الوكلاء، وتحت إشرافك أنت.",
  alternates: langAlternates("/accounting"),
};

const pad3 = (n: number) => String(n).padStart(3, "0");

type Chip = { k: string; v: string; tone?: "p" | "b" };
function Act({
  ink, kicker, head, say, chips, shot, cap,
}: {
  ink?: boolean; kicker: string; head: React.ReactNode; say: React.ReactNode;
  chips?: Chip[]; shot: { src: string; w: number; h: number; alt: string }; cap: string;
}) {
  return (
    <section className={`np-act${ink ? " np-band-ink" : ""}`}>
      <div className="wrap">
        <div className="microlabel np-kicker np-rise">{kicker}</div>
        <h2 className="np-head np-rise d1">{head}</h2>
        <p className="np-say np-rise d1">{say}</p>
        {chips && (
          <div className="np-chips np-rise d2">
            {chips.map((c) => (
              <span key={c.k} className="np-chip">
                <span className="k">{c.k}</span>
                <span className={c.tone === "p" ? "p" : c.tone === "b" ? "b" : undefined}>{c.v}</span>
              </span>
            ))}
          </div>
        )}
        <div className="np-shot np-rise d1">
          <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes="(max-width: 1120px) 100vw, 1064px" />
        </div>
        <div className="np-cap np-rise">{cap}</div>
      </div>
    </section>
  );
}

export default async function AccountingPage() {
  const seat = await getNextSeat();
  return (
    <>
      <SmoothScroll />

      <MgNav locale="ar" />

      <header className="hero-band on-ink np-hero" id="top">
        <div className="wrap">
          <div style={{ paddingTop: 40 }}>
            <div className="microlabel hero-kicker">فريق مالي بالذكاء الاصطناعي للإمارات والسعودية</div>
            <RotatingHeadline
              items={[
                ["لم تؤسس شركتك", "لتطابق جداول البيانات."],
                ["لم تبنِ عملك", "‏لتلاحق الإيصالات على واتساب."],
                ["لم توظّف فريقك", "ليغرق في التسويات وقيود التعديل."],
              ]}
            />
            <p className="hero-sub" style={{ maxWidth: 560 }}>
              ‏Orbit يدير العمل الروتيني — الذمم الدائنة والمدينة ودفتر الأستاذ والضرائب
              والإقفال الشهري — ويترك القرار لك.
            </p>
            <a className="np-scrollcue" href="#live" aria-label="انزل لتشاهد">
              <span className="tri">▶</span>
              <span className="lab">سبعون ثانية ترى فيها كيف يبدو</span>
              <span className="chev" aria-hidden="true">↓</span>
            </a>
            <div className="hero-actions">
              <a className="cta" href="#ledger">احجز مقعدًا في الدفعة المؤسسة</a>
              <span className="mono hero-seat">المقعد {pad3(seat)}/{FOUNDING_SEATS} ما زال متاحًا</span>
            </div>
          </div>

          <div className="np-hero-shot">
            <Image src="/shots/adv-overview.png" alt="مساحة عمل Orbit — النقد والقرارات والإقفال والضرائب في لمحة" width={1600} height={1376} sizes="(max-width: 1120px) 100vw, 1064px" priority />
          </div>
        </div>
      </header>

      <main>
        <section className="section wrap np-after-hero" id="live">
          <div dir="ltr" className="ltr-embed">
            <Terminal />
          </div>
        </section>

        <Act
          ink
          kicker="الأموال الصادرة"
          head={<>كل فاتورة تخفي سؤالين: <span className="np-accent">هل رُمِّزت صحيحًا؟ وهل الضريبة قابلة للخصم؟</span></>}
          say={<>يرمّزها Orbit فور وصولها من ذاكرة دفتر أستاذك أنت، ثم يختبرها ضريبيًا وفق القانون الإماراتي. هذه الفاتورة <strong>ترسب في اختبار المادة 59</strong> — الرقم الضريبي للمورد مفقود — فتُحجز ضريبة المدخلات ولا تُطالَب. ونسخة مكررة أُوقفت قبل أن تُرحَّل أصلًا.</>}
          chips={[
            { k: "اختبار الضريبة", v: "ضريبة مدخلات 1,036 درهمًا محجوزة", tone: "b" },
            { k: "التكرار", v: "أُوقف قبل الترحيل", tone: "b" },
            { k: "ذاكرة الترميز", v: "2,418 معاملة", tone: "p" },
          ]}
          shot={{ src: "/shots/adv-payables.png", w: 1600, h: 1273, alt: "الذمم الدائنة في Orbit — اختبار الضريبة مدمج في سطر الفاتورة" }}
          cap="الذمم الدائنة — طبقة الضريبة مدمجة في كل سطر، وأدلتها مرفقة."
        />

        <Act
          kicker="الطبقة الإقليمية"
          head={<>أدواتك العالمية لا تعرف ما تطلبه الهيئة الاتحادية للضرائب أو «زاتكا». <span className="np-accent">هذا النظام بُني هنا.</span></>}
          say={<>ضريبة القيمة المضافة وضريبة الشركات تُسوَّيان كل شهر، وكل موعد نهائي يتعقبه حارس، والفواتير الإلكترونية تُخلَّص وتُحفظ مع إثباتها. وفجوة الـ200,000 درهم؟ مُفسَّرة، ومُسندة إلى القيد.</>}
          chips={[
            { k: "القيمة المضافة ↔ ضريبة الشركات", v: "الفرق +200 ألف · مُفسَّر", tone: "p" },
            { k: "الإقرار", v: "الربع الثاني يُستحق 28 يوليو · باقي 14 يومًا", tone: "b" },
            { k: "زاتكا", v: "142 مخلَّصة · 0 مرفوضة", tone: "p" },
          ]}
          shot={{ src: "/shots/adv-tax.png", w: 1600, h: 1011, alt: "ذكاء الضرائب الخليجي في Orbit — تسوية القيمة المضافة مع ضريبة الشركات وحارس الإقرارات" }}
          cap="الضرائب — التسوية والمواعيد والتخليص، في مكان واحد."
        />

        <Act
          ink
          kicker="السجل الدائم"
          head={<>لا شيء يُحذف أبدًا. <span className="np-accent">والأخطاء تُعكس على المكشوف.</span></>}
          say={<>كل قيد يحمل مَن أنشأه، ولماذا، والمستند الذي خلفه — وكلٌّ منها يُرحِّله وكيل مُسمّى بدرجة ثقة معلنة. إقفالٌ تسلّمه للمدقق دون أن يرفّ لك جفن.</>}
          shot={{ src: "/shots/adv-ledger.png", w: 1600, h: 946, alt: "دفتر الأستاذ العام في Orbit — حركة القيود مع تعليقات الوكلاء والأدلة" }}
          cap="دفتر الأستاذ — كل قيد مُفسَّر، ودليله على بعد نقرة."
        />

        <Act
          kicker="الأموال الواردة"
          head={<>من يدين لك — وما العمل حياله، <span className="np-accent">وقد لوحق بالفعل.</span></>}
          say={<>تذكيرات التحصيل تكتب نفسها بوتيرة توافق عليها مرة واحدة؛ لا شيء يُرسل من دونك. ومخاطر الشطب تُرصد لها مخصصات وفق سياستك، تلقائيًا.</>}
          chips={[
            { k: "فترة التحصيل", v: "41 يومًا · في تحسّن", tone: "p" },
            { k: "متأخرات", v: "346,700 درهم", tone: "b" },
            { k: "المخصصات", v: "وفق السياسة" },
          ]}
          shot={{ src: "/shots/adv-receivables.png", w: 1600, h: 1297, alt: "الذمم المدينة في Orbit — طابور التحصيل وفترة التحصيل وأعمار الذمم" }}
          cap="الذمم المدينة — دليل التحصيل، مُصاغًا ومُلاحَقًا ومُسوًّى."
        />

        <section className="np-act np-band-ink" id="close">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">الإقفال الشهري</div>
            <h2 className="np-head np-rise d1">كان الإقفال الشهري يستغرق أسابيع.</h2>
            <div className="np-big np-rise d1">
              <span data-np-count="78">0%</span>
              <span className="sub">مُنجز قبل أن تستيقظ.</span>
            </div>
            <p className="np-say np-rise d2">
              الاستحقاقات مقترحة، والانحرافات معلَّمة، والبنك مُطابَق، وإقرار ضريبة القيمة
              المضافة مُسوَّد — جانب Orbit منجز قبل أن تفتح الشاشة. ما تبقى قرارك أنت. ثم
              تختم الشهر بلمسة واحدة، فلا يتغير بعدها في الخفاء أبدًا.
            </p>
            <div className="np-shot np-rise d1">
              <Image src="/shots/adv-close.png" alt="قمرة الإقفال في Orbit — قائمة نهاية الشهر مع استحقاقات مقترحة من المحرك" width={1600} height={1169} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">قمرة الإقفال — «هذا يديره Orbit» في جهة، ومهام دفترك أنت في الجهة الأخرى.</div>
          </div>
        </section>

        <Act
          kicker="نظام واحد، بأي شكل"
          head={<>شركة واحدة أو خمس. عملة واحدة أو خمس. <span className="np-accent">لغة واحدة أو اثنتان.</span></>}
          say={<>بدّل بين الكيانات، ووحّد القوائم، واعمل بالعربية كاملة — من اليمين إلى اليسار حتى الأرقام — وبالإنجليزية متى احتجتها. المنتج هو الذي ينحني لك، لا أنت.</>}
          shot={{ src: "/shots/adv-arabic.png", w: 1600, h: 1360, alt: "Orbit بالعربية — مساحة العمل كاملة، من اليمين إلى اليسار" }}
          cap="نفس النظام — أوربت نفسه بالعربية، من اليمين إلى اليسار."
        />

        <section className="why-band on-ink" id="why" style={{ marginTop: 0 }}>
          <div className="wrap">
            <div className="microlabel hero-kicker np-rise">لماذا بنينا هذا</div>
            <h2 className="why-head np-rise d1">عشنا الإقفال الشهري<br />الذي نحذفه اليوم.</h2>
            <div className="why-cols np-rise d1">
              <p>
                ‏في كل إقفال، الطقس نفسه: إيصالات تُلاحَق على واتساب، وفواتير تُدقَّق في
                منتصف الليل، وموعد ضريبة القيمة المضافة يلهث خلف الربع — بينما الأرقام التي
                تهم فعلًا لا يلمسها أحد. رأينا فرقًا مالية لامعة تُنفق لياليها على عمل إداري
                وتغفل عن القيمة الحقيقية الجالسة أمامها: ما كانت البيانات تقوله.
              </p>
              <p>
                ‏Orbit من المنتجات القليلة جدًا في هذا المجال <strong>التي بناها محاسبون عاشوا
                هذه العمليات وسهروا لياليها</strong> — لا مهندسون يخمّنونها. فبنينا الزميل الذي
                طالما تمنيناه: زميل يؤدي العمل الروتيني، ويعرض أدلته، ويترك القرار لك.
              </p>
            </div>
            <div className="why-sig np-rise">&mdash; SRW</div>
          </div>
        </section>

        <section className="section wrap" id="ledger">
          <h2 className="section-head">احجز مقعدًا في الدفعة المؤسسة.</h2>
          <p className="section-sub">
            أول {FOUNDING_SEATS} شركة تحصل على اثني عشر شهرًا مجانًا، مع تثبيت سعر المؤسسين
            بعد ذلك. بريد العمل فقط — شخص حقيقي يقرأ كل قيد.
          </p>
          <div className="price-grid">
            <div>
              <div className="np-chips" style={{ marginTop: 28 }}>
                <span className="np-chip"><span className="k">الإعداد</span><span className="p">دقائق، لا مشروع</span></span>
                <span className="np-chip"><span className="k">الدفاتر</span><span className="b">Zoho · Xero · QuickBooks · Odoo · Wafeq · ERPNext</span></span>
                <span className="np-chip"><span className="k">الاستقبال</span><span className="b">واتساب · تيليغرام · البريد الإلكتروني</span></span>
              </div>
            </div>
            <LedgerForm seat={seat} locale="ar" />
          </div>
        </section>
      </main>

      <MgFooter locale="ar" />
      <NpEnhance />
    </>
  );
}
