/* ── Self-serve volume bands on /pricing (en + ar) ───────────────────
   A small working-paper table: the bands from lib/pricing.ts, figures in
   the mono face, every price asterisked, the indicative-price note
   directly under the table. Arabic keeps Western digits, left to right. */

import { BANDS, BAND_MAX, fmt } from "@/lib/pricing";

const T = {
  en: {
    eyebrow: "Self-serve volume bands",
    title: "Priced by the work in the month.",
    what: "A transaction is each supplier bill, each sales invoice and each bank statement line Hysaab processes in the month.",
    over: "Over your band in a month? Hysaab keeps working, and the next band applies from the following month. The books never stop mid-month.",
    caption: "Self-serve price by transactions a month, in US dollars",
    colTx: "Transactions a month",
    colUsd: "USD a month",
    upTo: (n: string) => <>Up to <bdi>{n}</bdi></>,
    above: (n: string) => <>Above <bdi>{n}</bdi></>,
    managed: "Managed service, scoped",
    note: "*Indicative prices. The final fee depends on the outcomes you expect, your accounting system and your current workflows. We confirm it in writing before you start.",
  },
  ar: {
    eyebrow: "شرائح الحجم في الخدمة الذاتية",
    title: "السعر بحجم عمل الشهر.",
    what: "المعاملة هي كل فاتورة مورّد، وكل فاتورة مبيعات، وكل سطر في كشف الحساب البنكي يعالجه Hysaab خلال الشهر.",
    over: "تجاوزت شريحتك في شهر ما؟ يواصل Hysaab العمل، وتُطبَّق الشريحة التالية من الشهر الذي يليه. لا تتوقف الدفاتر في منتصف الشهر.",
    caption: "سعر الخدمة الذاتية بحسب عدد المعاملات شهريًا، بالدولار الأمريكي",
    colTx: "المعاملات شهريًا",
    colUsd: "دولار أمريكي شهريًا",
    upTo: (n: string) => <>حتى <bdi>{n}</bdi></>,
    above: (n: string) => <>أكثر من <bdi>{n}</bdi></>,
    managed: "الخدمة المُدارة، وفق النطاق",
    note: "*أسعار استرشادية. تعتمد الرسوم النهائية على النتائج التي تتوقعها، ونظامك المحاسبي، وسير عملك الحالي. نؤكدها كتابةً قبل أن تبدأ.",
  },
};

export function PriceBands({ locale = "en" }: { locale?: "en" | "ar" }) {
  const t = T[locale];
  return (
    <div className="tt-bands" id="bands">
      <div className="tt-bands-head">
        <p className="hw-eyebrow">{t.eyebrow}</p>
        <h3>{t.title}</h3>
        <p>{t.what} {t.over}</p>
      </div>
      <div className="tt-bands-t">
        <table>
          <caption className="hw-sr">{t.caption}</caption>
          <thead>
            <tr><th scope="col">{t.colTx}</th><th scope="col">{t.colUsd}</th></tr>
          </thead>
          <tbody>
            {BANDS.map((b) => (
              <tr key={b.upTo}>
                <th scope="row">{t.upTo(fmt(b.upTo))}</th>
                <td><bdi className="tt-bands-n">{b.usd}<span className="tt-bands-ast">*</span></bdi></td>
              </tr>
            ))}
            <tr>
              <th scope="row">{t.above(fmt(BAND_MAX))}</th>
              <td className="tt-bands-m">{t.managed}</td>
            </tr>
          </tbody>
        </table>
        <p className="tt-bands-note">{t.note}</p>
      </div>
    </div>
  );
}
