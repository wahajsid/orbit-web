import { Tm, type Locale } from "./Wp";

/* The legend for every red mark on the page. */
const T = {
  en: {
    h: "Tick mark legend",
    rows: [["✓", "Recomputed. The arithmetic is checked."], ["T", "Traced to the source document."], ["B", "Agreed to the bank statement."], ["P", "Approved by a person."]],
    foot: "Evidence on every number. Nothing posts outside the rules you approve. Built in Dubai.",
  },
  /* AR-REVIEW: legend rows */
  ar: {
    h: "دليل علامات المراجعة",
    rows: [["✓", "أُعيد احتسابه. الحساب مُتحقَّق منه."], ["T", "مُتتبَّع إلى المستند المصدر."], ["B", "مطابَق مع كشف الحساب البنكي."], ["P", "اعتمده شخص."]],
    foot: "دليل على كل رقم. ولا يُرحَّل شيء خارج القواعد التي توافق عليها. صُنع في دبي.",
  },
};

export function TickLegend({ locale = "en" }: { locale?: Locale }) {
  const t = T[locale];
  return (
    <aside className="tt-legend" aria-labelledby="tt-legend-h">
      <h2 id="tt-legend-h">{t.h}</h2>
      <ul>
        {t.rows.map(([m, s]) => <li key={m}><Tm m={m} /><span>{s}</span></li>)}
      </ul>
      <p className="tt-legend-foot"><span aria-hidden="true">✳</span><span>{t.foot}</span></p>
    </aside>
  );
}
