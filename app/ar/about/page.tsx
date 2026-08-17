import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "من نحن — Orbit",
  description:
    "أوربت مبني في الخليج على يد محاسبين عاشوا الإقفال الشهري الذي يمحونه اليوم — معيار تصميم واحد، وأربعة منتجات، وحكم بشري يبقى حيث ينبغي أن يكون.",
  alternates: langAlternates("/about"),
};

export default function AboutPage() {
  return (
    <>
      <MgNav locale="ar" />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">من نحن</div>
          <h1 className="mg-page-h">عشنا الإقفال الشهري الذي نمحوه اليوم.</h1>
          <p className="mg-page-lede">
            أوربت مبني في دبي على يد محاسبين عاشوا هذه العمليات وسهروا عليها —
            الإقفال الشهري، وإقرارات ضريبة القيمة المضافة، واستفسارات الهيئة الاتحادية للضرائب — لا على يد مهندسين يخمّنونها.
          </p>
        </section>

        <section className="mg-page-body mg-guide-body">
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">من أين جاء أوربت</h2>
            <p className="mg-guide-p">
              في كل إقفال، الطقس نفسه: إيصالات تُلاحَق عبر واتساب، وفواتير تُدقَّق في
              منتصف الليل، وموعد ضريبة القيمة المضافة يلهث خلف الربع — والأرقام التي
              تهم فعلًا، لا أحد يلمسها. رأينا فرقًا مالية لامعة تقضي لياليها في
              عمل إداري وتغفل عن القيمة الحقيقية الجالسة أمامها: ما كانت البيانات
              تقوله.
            </p>
            <p className="mg-guide-p">
              فبنينا الزميل الذي تمنيناه دائمًا: زميل يؤدي العمل الروتيني، ويعرض
              أدلته، ويترك الحكم لك. أولًا لفريقنا الضريبي، ثم للشركات من
              حولنا، والآن للخليج كله.
            </p>
          </div>

          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">ما نؤمن به</h2>
            <ul className="mg-guide-list">
              <li>كل رقم يقود إلى مستند — الدليل ليس اختياريًا</li>
              <li>لا شيء يُحذف؛ الأخطاء تُعكس في العلن</li>
              <li>الوكلاء يقترحون، والمحركات الحتمية تُرحِّل، والبشر يوافقون على القرارات المهمة</li>
              <li>الامتثال ليس ميزة — إنه الوضع الافتراضي، يُختبر قبل أن يتحرك درهم واحد</li>
              <li>على البرنامج أن يقول بصدق ما فعله، وأن يرفض بصدق ما لا يستطيعه</li>
            </ul>
          </div>

          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">العائلة</h2>
            <p className="mg-guide-p">
              مهمة واحدة — تغيير طريقة إنجاز الضرائب والمحاسبة والخدمات من حولهما في
              الخليج — تحملها أربعة منتجات: <a className="textlink" href="/ar/product">Orbit</a> يدير
              الدفاتر، و<a className="textlink" href="/ar/hire">Orbit Hire</a> يدير التوظيف، و{" "}
              <a className="textlink" href="/ar/invoice">Orbit Invoice</a> يختبر كل فاتورة مورد
              وفق قواعد الهيئة الاتحادية للضرائب و«زاتكا»، و{" "}
              <a className="textlink" href="/ar/firms">Orbit for Firms</a> يدير المكتب نفسه.
            </p>
          </div>

          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">أين نحن</h2>
            <p className="mg-guide-p">
              دبي، الإمارات — نعمل في أنحاء الإمارات والسعودية، بالإنجليزية والعربية. راسلنا
              على <a className="textlink" href="mailto:info@orbitgulf.com">info@orbitgulf.com</a>؛
              شخص حقيقي يقرأ كل رسالة.
            </p>
          </div>

          <div className="mg-guide-cta">
            <a href="/ar/product" className="mg-cta">شاهد المنتج ←</a>
            <a href="/ar/contact" className="mg-ghost">تحدث إلينا</a>
          </div>
        </section>
      </main>
      <MgFooter locale="ar" />
    </>
  );
}
