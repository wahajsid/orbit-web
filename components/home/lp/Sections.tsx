/* ── Homepage v2 sections: how it works, the outcomes bento, the FAQ ───
   Copy follows the site's own claims (homepage, /accounting, /trust,
   /integrations); figures are sample data and labelled so. Styles: lp.css.
   English and Arabic (locale="ar"). AR-REVIEW: every Arabic string here is
   a new draft for the native reviewer (brand/AR-REVIEW.md). Brand, system
   and bank-line names stay Latin; figures stay Western, left to right. */

import { Story } from "./Story";
import { Tm } from "@/components/home/tt/Wp";

type Locale = "en" | "ar";

const HOW = {
  en: {
    s1: { k: "Xero · consent", b: "Connect Hysaab to Helio Trading LLC", t1: "Read-only access", t2: "Post approved journals", t2v: "Later, if you allow it", chip: "Connected · nothing changed", label: "Xero's consent screen with read-only access switched on", n: "Step 01", h: "Connect your books, read-only.", p: "Xero, Zoho Books, QuickBooks, Odoo, Wafeq or ERPNext, through their own consent screens. Nothing in your ledger changes." },
    s2: { rows: [["Bank lines matched", "312 / 312", "B"], ["Bills coded, with confidence", "48", "✓"], ["Accruals drafted, with basis", "3", "T"], ["Variances explained", "2", "✓"], ["Workpapers prepared", "31", "✓"]], label: "Prepared items being ticked off one by one", n: "Step 02", h: "Hysaab prepares the work.", p: "Matching, coding, accruals and the close binder, each with the evidence behind it, ready before your team arrives." },
    s3: { k: "Needs you · approval", what: "ACR-1031 · Hygeia Cleaning", amt: "AED 2,800.00 · evidence attached", go: "Approve", ask: "Ask a question", done: "P · approved by Layla, 16:40", label: "An accrual waiting for approval, then approved", n: "Step 03", h: "You review and decide.", p: "Approve, ask, or push back. Nothing posts until your approval rules say so, and the reason stays on the record." },
  },
  ar: {
    s1: { k: "Xero · الموافقة", b: "ربط Hysaab بـ Helio Trading LLC", t1: "صلاحية القراءة فقط", t2: "ترحيل القيود المعتمدة", t2v: "لاحقًا، إن سمحت", chip: "متصل · لم يتغير شيء", label: "شاشة موافقة Xero وصلاحية القراءة فقط مفعّلة", n: "الخطوة 01", h: "اربط دفاترك، للقراءة فقط.", p: "Xero أو Zoho Books أو QuickBooks أو Odoo أو Wafeq أو ERPNext، عبر شاشات الموافقة الخاصة بها. لا يتغير شيء في دفاترك." },
    s2: { rows: [["مطابقة الأسطر البنكية", "312 / 312", "B"], ["ترميز الفواتير مع درجة الثقة", "48", "✓"], ["مسودات الاستحقاقات مع أساسها", "3", "T"], ["تفسير الفروقات", "2", "✓"], ["إعداد أوراق العمل", "31", "✓"]], label: "بنود مُعدّة تُؤشَّر واحدًا تلو الآخر", n: "الخطوة 02", h: "Hysaab يُعدّ العمل.", p: "المطابقة والترميز والاستحقاقات وملف الإقفال، كلٌّ مع الدليل الذي وراءه، جاهزًا قبل وصول فريقك." },
    s3: { k: "يحتاج إليك · اعتماد", what: "ACR-1031 · Hygeia Cleaning", amt: "2,800.00 درهم · الدليل مرفق", go: "اعتمد", ask: "اطرح سؤالًا", done: "P · اعتمدته ليلى، 16:40", label: "استحقاق ينتظر الاعتماد، ثم يُعتمد", n: "الخطوة 03", h: "أنت تراجع وتقرر.", p: "اعتمد، أو اسأل، أو اعترض. لا يُرحَّل شيء حتى تسمح بذلك قواعد الاعتماد لديك، ويبقى السبب في السجل." },
  },
};

export function HowItWorks({ locale = "en" }: { locale?: Locale } = {}) {
  const c = HOW[locale];
  return (
    <div className="lp-steps">
      <article className="lp-step" data-reveal="">
        <Story kind="consent" label={c.s1.label}>
          <div className="lp-sheet lp-consent">
            <span className="lp-k">{c.s1.k}</span>
            <b>{c.s1.b}</b>
            <div className="lp-toggle"><span>{c.s1.t1}</span><span className="lp-sw" /></div>
            <div className="lp-toggle"><span>{c.s1.t2}</span><span className="lp-k">{c.s1.t2v}</span></div>
            <span><span className="lp-chip lp-chip--hl">{c.s1.chip}</span></span>
          </div>
        </Story>
        <p className="lp-step-n">{c.s1.n}</p>
        <h3>{c.s1.h}</h3>
        <p>{c.s1.p}</p>
      </article>
      <article className="lp-step" data-reveal="">
        <Story kind="ticks" label={c.s2.label}>
          <div className="lp-sheet">
            {c.s2.rows.map(([a, b, m]) => <div className="lp-row" key={a}><span>{a}</span><span className="m"><bdi>{b}</bdi></span><span className="tk">{m}</span></div>)}
          </div>
        </Story>
        <p className="lp-step-n">{c.s2.n}</p>
        <h3>{c.s2.h}</h3>
        <p>{c.s2.p}</p>
      </article>
      <article className="lp-step" data-reveal="">
        <Story kind="decide" label={c.s3.label}>
          <div className="lp-sheet lp-decide">
            <span className="lp-k">{c.s3.k}</span>
            <p style={{ marginTop: 8 }}><b>{c.s3.what}</b><br />{c.s3.amt}</p>
            <div className="acts"><span className="lp-btn-s lp-btn-s--go">{c.s3.go}</span><span className="lp-btn-s">{c.s3.ask}</span></div>
            <p className="done">{c.s3.done}</p>
          </div>
        </Story>
        <p className="lp-step-n">{c.s3.n}</p>
        <h3>{c.s3.h}</h3>
        <p>{c.s3.p}</p>
      </article>
    </div>
  );
}

const BENTO = {
  en: {
    sample: "Sample data.",
    cash: { label: "Bank lines being matched to their documents", h: "Understand your cash", p: "Every bank line matched to the invoice, bill or payment behind it, and the balance agreed to the bank.", ex: "212 lines matched overnight; two left for you, each with the reason." },
    dup: { label: "The same supplier bill entered twice, the second one held", k1: "Bill · 4 Mar", k2: "Bill · 6 Mar", what: "Packaging, March", stamp: "Held · duplicate", h: "Catch discrepancies", p: "Duplicates, miscoded spend and missing bills found before they reach the accounts.", ex: "The same supplier bill entered twice in March: held, not paid twice." },
    cal: { label: "The close calendar filling to done, then October locked", cal: "Close calendar · October", days: "T+1 to T+4", rec: "Reconciliations signed", locked: "October closed.", h: "Prepare the close", p: "A dated close calendar with owners, reconciliations signed by a second person, and the binder filed.", ex: "October’s 31 workpapers filed on the fourth working day." },
    vat: { label: "A bill charging VAT on a zero-rated export, held with the rule cited", inv: "Export freight · INV-2290", vat: "VAT charged", rule: "Rule", ruleV: "zero-rated export", st: "Status", held: "Held for you", h: "Answer tax questions", p: "UAE and Saudi VAT and corporate tax checked as the work is done, not at filing time.", ex: "A bill charging 5% VAT on a zero-rated export: held with the rule cited." },
  },
  ar: {
    sample: "بيانات تجريبية.",
    cash: { label: "أسطر بنكية تُطابَق مع مستنداتها", h: "افهم نقدك", p: "كل سطر بنكي مطابق مع الفاتورة أو الدفعة التي وراءه، والرصيد مطابق للبنك.", ex: "طُوبق 212 سطرًا خلال الليل؛ وبقي سطران لك، لكل منهما سببه." },
    dup: { label: "فاتورة المورّد نفسها مُدخلة مرتين، والثانية موقوفة", k1: "فاتورة · 4 مارس", k2: "فاتورة · 6 مارس", what: "تغليف، مارس", stamp: "موقوفة · مكررة", h: "اكتشف الفروقات", p: "التكرار والترميز الخاطئ والفواتير الناقصة تُكتشف قبل أن تصل إلى الحسابات.", ex: "فاتورة المورّد نفسها مُدخلة مرتين في مارس: أُوقفت ولم تُدفع مرتين." },
    cal: { label: "تقويم الإقفال يكتمل، ثم يُقفل أكتوبر", cal: "تقويم الإقفال · أكتوبر", days: "T+1 إلى T+4", rec: "المطابقات الموقّعة", locked: "أُقفل أكتوبر.", h: "جهّز الإقفال", p: "تقويم إقفال مؤرخ بأصحاب المهام، ومطابقات يوقّعها شخص ثانٍ، وملف محفوظ.", ex: "31 ورقة عمل لأكتوبر حُفظت في يوم العمل الرابع." },
    vat: { label: "فاتورة تحتسب الضريبة على تصدير خاضع لنسبة الصفر، موقوفة مع ذكر القاعدة", inv: "شحن تصدير · INV-2290", vat: "الضريبة المحتسبة", rule: "القاعدة", ruleV: "تصدير خاضع لنسبة الصفر", st: "الحالة", held: "موقوفة لك", h: "أجب عن الأسئلة الضريبية", p: "ضريبة القيمة المضافة وضريبة الشركات في الإمارات والسعودية تُفحص أثناء العمل، لا عند الإقرار.", ex: "فاتورة تحتسب 5% على تصدير خاضع لنسبة الصفر: أُوقفت مع ذكر القاعدة." },
  },
};

export function Bento({ locale = "en" }: { locale?: Locale } = {}) {
  const c = BENTO[locale];
  return (
    <div className="lp-bento">
      <article className="lp-card" data-reveal="">
        <Story kind="ticks" label={c.cash.label}>
          <div className="lp-sheet">
            <div className="lp-row"><span><bdi>TRF FALCON FREIGHT</bdi></span><span className="m"><bdi>−1,240.00</bdi></span><span className="tk">B</span></div>
            <div className="lp-row"><span><bdi>DD DESERT UTILITIES</bdi></span><span className="m"><bdi>−4,108.75</bdi></span><span className="tk">B</span></div>
            <div className="lp-row"><span><bdi>INWARD TT ORYX RETAIL</bdi></span><span className="m"><bdi>+18,400.00</bdi></span><span className="tk">B</span></div>
            <div className="lp-row"><span><bdi>POS AL NOOR STATIONERY</bdi></span><span className="m"><bdi>−312.00</bdi></span><span className="tk">B</span></div>
          </div>
        </Story>
        <div className="lp-card-t">
          <h3><Tm m="B" />{c.cash.h}</h3>
          <p>{c.cash.p}</p>
          <p className="ex">{c.cash.ex} {c.sample}</p>
        </div>
      </article>
      <article className="lp-card" data-reveal="">
        <Story kind="dup" label={c.dup.label}>
          <div className="lp-dup">
            <div className="lp-sheet"><span className="lp-k">{c.dup.k1}</span><b><bdi>GP-0412 · Gulf Packaging</bdi></b><span>{c.dup.what}</span><em><bdi>8,915.55</bdi></em></div>
            <div className="lp-sheet"><span className="lp-k">{c.dup.k2}</span><b><bdi>GP-0412 · Gulf Packaging</bdi></b><span>{c.dup.what}</span><em><bdi>8,915.55</bdi></em></div>
            <span className="lp-stamp">{c.dup.stamp}</span>
          </div>
        </Story>
        <div className="lp-card-t">
          <h3><Tm m="T" />{c.dup.h}</h3>
          <p>{c.dup.p}</p>
          <p className="ex">{c.dup.ex} {c.sample}</p>
        </div>
      </article>
      <article className="lp-card" data-reveal="">
        <Story kind="cal" label={c.cal.label}>
          <div className="lp-sheet">
            <div className="lp-row"><span>{c.cal.cal}</span><span className="m">{c.cal.days}</span><span /></div>
            <div className="lp-bar"><i /></div>
            <div className="lp-row"><span>{c.cal.rec}</span><span className="m"><bdi>7 / 7</bdi></span><span className="tk">P</span></div>
            <span className="lp-locked">{c.cal.locked}</span>
          </div>
        </Story>
        <div className="lp-card-t">
          <h3><Tm m="✓" />{c.cal.h}</h3>
          <p>{c.cal.p}</p>
          <p className="ex">{c.cal.ex} {c.sample}</p>
        </div>
      </article>
      <article className="lp-card" data-reveal="">
        <Story kind="vat" label={c.vat.label}>
          <div className="lp-sheet lp-inv">
            <div className="lp-row"><span>{c.vat.inv}</span><span className="m"><bdi>12,000.00</bdi></span><span /></div>
            <div className="lp-row"><span>{c.vat.vat}</span><span className="m"><bdi><span className="v">5% · 600.00<i className="lp-strike" /></span><span className="lp-fix">0%</span></bdi></span><span className="lp-q">?</span></div>
            <div className="lp-row"><span>{c.vat.rule}</span><span className="m">{c.vat.ruleV}</span><span /></div>
            <div className="lp-row"><span>{c.vat.st}</span><span className="m"><span className="lp-chip lp-chip--hl">{c.vat.held}</span></span><span /></div>
          </div>
        </Story>
        <div className="lp-card-t">
          <h3><Tm m="?" />{c.vat.h}</h3>
          <p>{c.vat.p}</p>
          <p className="ex">{c.vat.ex} {c.sample}</p>
        </div>
      </article>
    </div>
  );
}

export const FAQS: Record<Locale, [string, string][]> = {
  en: [
    ["Do we have to change our accounting system?", "No. Hysaab works inside Xero, Zoho Books, QuickBooks, Odoo, Wafeq and ERPNext, and your ledger stays the record. Using something else? We scope a connection with you in writing first."],
    ["Does anything post without our approval?", "No. Every change arrives as a proposal with its evidence, and nothing posts until your approval rules say so. Approval limits, period locks and control accounts stay in force."],
    ["What does it do each month?", "It matches the bank, codes bills with their confidence and history, holds input VAT until the invoice qualifies, drafts accruals with their basis, explains variances, and prepares the 31 workpapers of the close binder for your review."],
    ["Is it built for the UAE and Saudi Arabia?", "Yes. UAE and Saudi VAT, corporate tax and Zakat, AED and SAR, more than one entity in one workspace, and the whole workspace in Arabic, right to left."],
    ["How is it different from asking a chatbot?", "A chat window starts from nothing every time. Hysaab is connected to your books, your documents, your team and every decision you have made, and it keeps what it learns. It only makes a standing rule when you confirm it."],
    ["What happens to our data?", "Each company sits in its own tenant, every agent action is logged, and we do not train models on your data. These are commitments, not a third party certification; the detail is on our trust page."],
    ["How much does it cost?", "Self-serve starts from USD 199 a month, with no charge per user. For managed support or a custom setup, we confirm the scope and the fee in writing before you start."],
    ["How do we start?", "Request access, or book a demo. In the demo we connect read-only, so nothing in your books changes. You can also run a free check on your books or a bank statement first."],
  ],
  ar: [
    ["هل علينا تغيير نظامنا المحاسبي؟", "لا. يعمل Hysaab داخل Xero وZoho Books وQuickBooks وOdoo وWafeq وERPNext، وتبقى دفاترك هي السجل. تستخدم نظامًا آخر؟ نحدد معك نطاق الربط كتابيًا أولًا."],
    ["هل يُرحَّل أي شيء دون اعتمادنا؟", "لا. يصل كل تغيير مقترحًا مع دليله، ولا يُرحَّل شيء حتى تسمح بذلك قواعد الاعتماد لديك. وتبقى حدود الاعتماد وإقفال الفترات وحسابات الرقابة سارية."],
    ["ماذا يفعل كل شهر؟", "يطابق البنك، ويرمّز الفواتير مع درجة الثقة والسجل، ويوقف ضريبة المدخلات حتى تستوفي الفاتورة شروطها، ويُعدّ مسودات الاستحقاقات مع أساسها، ويفسّر الفروقات، ويُعدّ أوراق العمل الـ31 في ملف الإقفال لمراجعتك."],
    ["هل هو مبني للإمارات والسعودية؟", "نعم. ضريبة القيمة المضافة وضريبة الشركات والزكاة في الإمارات والسعودية، بالدرهم والريال، وأكثر من كيان في مساحة عمل واحدة، ومساحة العمل كلها بالعربية من اليمين إلى اليسار."],
    ["بمَ يختلف عن سؤال روبوت محادثة؟", "تبدأ نافذة المحادثة من الصفر في كل مرة. أما Hysaab فمتصل بدفاترك ومستنداتك وفريقك وكل قرار اتخذته، ويحتفظ بما يتعلمه. ولا يضع قاعدة دائمة إلا حين تؤكدها."],
    ["ماذا يحدث لبياناتنا؟", "لكل شركة مساحتها المستقلة، وكل إجراء يقوم به وكيل مسجَّل، ولا ندرّب النماذج على بياناتك. هذه التزامات وليست شهادة من طرف ثالث؛ والتفاصيل في صفحة الثقة."],
    ["كم التكلفة؟", "تبدأ الخدمة الذاتية من 199 دولارًا أمريكيًا شهريًا، دون رسوم لكل مستخدم. وللدعم المُدار أو الإعداد المخصص، نؤكد النطاق والرسوم كتابيًا قبل أن تبدأ."],
    ["كيف نبدأ؟", "اطلب الانضمام، أو احجز عرضًا تجريبيًا. في العرض نتصل للقراءة فقط، فلا يتغير شيء في دفاترك. ويمكنك أيضًا إجراء فحص مجاني لدفاترك أو لكشف حساب بنكي أولًا."],
  ],
};
/** The English list, kept under its old name. */
export const FAQ = FAQS.en;

const TRUST: Record<Locale, { q: string; tail: string; link: string; href: string }> = {
  en: { q: "What happens to our data?", tail: " the detail is on our trust page.", link: "the detail is on our trust page", href: "/trust" },
  ar: { q: "ماذا يحدث لبياناتنا؟", tail: " والتفاصيل في صفحة الثقة.", link: "والتفاصيل في صفحة الثقة", href: "/ar/trust" },
};

export function Faq({ locale = "en" }: { locale?: Locale } = {}) {
  const t = TRUST[locale];
  return (
    <div className="lp-faq">
      {FAQS[locale].map(([q, a]) => (
        <details key={q}>
          <summary>{q}<i aria-hidden="true" /></summary>
          <p>{q === t.q ? <>{a.replace(t.tail, " ")}<a href={t.href}>{t.link}</a>.</> : a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(locale: Locale = "en") {
  return { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: locale, mainEntity: FAQS[locale].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
}
