import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { FOUNDING_SEATS } from "@/lib/launch";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "الأسعار — Orbit",
  description:
    "ثلاث فئات — Starter بـ149 درهمًا شهريًا، وGrowth بـ499 درهمًا شهريًا، وScale بـ1,499 درهمًا شهريًا — تُقاس بحجم استخدامك لفريق الذكاء الاصطناعي، لا بعدد المقاعد. أول 100 شركة تحصل على اثني عشر شهرًا مجانًا.",
  alternates: langAlternates("/pricing"),
};

const TIERS: { name: string; price: string; who: string; feats: string[]; hero?: boolean }[] = [
  {
    name: "Starter",
    price: "‏149 درهمًا",
    who: "لمنشأة صغيرة تنقل دفاترها من واتساب وجداول البيانات.",
    feats: [
      "فريق الوكلاء كاملًا على دفاترك",
      "المستندات تصل عبر البريد وتيليغرام",
      "قائمة القرارات، والإقفال الشهري، وحزمة مجلس الإدارة",
      "دفتر أستاذ واحد متصل — أو يتولى Orbit مسك الدفاتر",
      "استخدام على مقاس منشأة صغيرة",
    ],
  },
  {
    name: "Growth",
    price: "‏499 درهمًا",
    who: "لمنشأة تريد الفريق على اتصال دائم.",
    hero: true,
    feats: [
      "كل ما في Starter",
      "كلّف الفريق بالمهام عبر واتساب",
      "تذكيرات التحصيل تُرسل تلقائيًا ضمن سياستك",
      "سعة شهرية أكبر للفريق",
    ],
  },
  {
    name: "Scale",
    price: "‏1,499 درهمًا",
    who: "للمجموعات والدفاتر المزدحمة.",
    feats: [
      "كل ما في Growth",
      "أعلى حدود الاستخدام",
      "متسع لكيانات متعددة وحجم مستندات كثيف",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <MgNav locale="ar" />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">الأسعار</div>
          <h1 className="mg-page-h">على قدر العمل، لا على عدد المقاعد.</h1>
          <p className="mg-page-lede">
            كل فئة تحصل على فريق الوكلاء كاملًا — والسعر يتدرج مع حجم استخدامك له، لا مع
            عدد من يسجلون الدخول. لا حسابات لكل مستخدم، ولا فدية مقابل الميزات.
          </p>
        </section>

        <section className="mg-page-body">
          <div className="mg-price-grid">
            {TIERS.map((t) => (
              <div key={t.name} className={t.hero ? "mg-price-card mg-price-hero" : "mg-price-card"}>
                <div className="mg-kicker">{t.name}</div>
                <div className="mg-price-n">{t.price}<span className="mg-price-per">/شهريًا</span></div>
                <p className="mg-price-who">{t.who}</p>
                <ul className="mg-price-feats">
                  {t.feats.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <a href="/ar#join" className="mg-cta">احجز عرضًا ←</a>
              </div>
            ))}
          </div>

          <div className="mg-price-founding">
            <div className="mg-kicker">الدفعة المؤسسة</div>
            <h2 className="mg-prod-dh">أول {FOUNDING_SEATS} شركة لا تدفع شيئًا لمدة عام.</h2>
            <p className="mg-prod-dp" style={{ maxWidth: "58ch" }}>
              اثنا عشر شهرًا مجانًا (تسري سياسة الاستخدام العادل)، وسعر المؤسسين مثبّت
              بعدها، وخط مباشر مع الفريق الذي يبنيه. بريد العمل فقط — شخص حقيقي يقرأ كل
              قيد.
            </p>
            <div style={{ marginTop: 20 }}>
              <a href="/ar#join" className="mg-cta">احجز مقعدًا مؤسسًا ←</a>
            </div>
          </div>
        </section>
      </main>
      <MgFooter locale="ar" />
    </>
  );
}
