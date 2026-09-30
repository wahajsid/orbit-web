"use client";

/* ── One night on a group's books, as an audit trail ──────────────────
   Each line carries the mark a reviewer would give it. The one line only
   a person can clear shows "?" and two real buttons; answering it here
   also answers it in the five-ways demo (CHEQUE_EVENT), and the reverse. */

import { useEffect, useState } from "react";
import { CHEQUE_EVENT, type ChequeDetail } from "../../hysaab/Demo";
import { Tm, type Locale } from "./Wp";

export type TrailRow = { t: string; who: string; msg: React.ReactNode; mark?: string; ask?: boolean };

const T = {
  en: {
    cols: ["Time", "Agent", "What it did", "Mark"],
    point: "Review point · yours", petty: "Post as petty cash", ask: "Ask Omar for the slip",
    resolved: { petty: "posted as petty cash", ask: "slip requested from Omar" }, by: "L.H.",
    approved: "Approved by a person", open: "Open: needs a person",
  },
  /* AR-REVIEW: the audit trail's furniture (the answers match the demo's). */
  ar: {
    cols: ["الوقت", "الوكيل", "ما فعله", "العلامة"],
    point: "نقطة مراجعة · لك", petty: "ترحيل كنثرية", ask: "اطلب الإيصال من عمر",
    resolved: { petty: "رُحِّل كنثرية", ask: "طُلب الإيصال من عمر" }, by: "ل.ح.",
    approved: "اعتمده شخص", open: "مفتوح: يحتاج إلى شخص",
  },
};

export function AuditTrail({ rows, locale = "en" }: { rows: TrailRow[]; locale?: Locale }) {
  const t = T[locale];
  const [chq, setChq] = useState<null | "petty" | "ask">(null);
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<ChequeDetail>).detail;
      if (d?.from === "demo") setChq(d.value);
    };
    window.addEventListener(CHEQUE_EVENT, on);
    return () => window.removeEventListener(CHEQUE_EVENT, on);
  }, []);
  const answer = (value: "petty" | "ask") => {
    setChq(value);
    window.dispatchEvent(new CustomEvent<ChequeDetail>(CHEQUE_EVENT, { detail: { value, from: "trail" } }));
  };
  return (
    <div className="tt-trail">
      <table>
        <thead><tr><th scope="col">{t.cols[0]}</th><th scope="col">{t.cols[1]}</th><th scope="col">{t.cols[2]}</th><th scope="col" className="tt-trail-k">{t.cols[3]}</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.t + r.who} className={r.ask ? "tt-trail-ask" : undefined}>
              <td className="tt-trail-t"><bdi>{r.t}</bdi></td>
              <td className="tt-trail-a">{r.who}</td>
              <td>
                {r.msg}
                {r.ask && (chq == null ? (
                  <span className="tt-trail-sign">
                    <span className="tt-trail-sign-l">{t.point}</span>
                    <button type="button" className="hw-btn hw-btn--navy" onClick={() => answer("petty")}>{t.petty}</button>
                    <button type="button" className="hw-btn tt-btn-line" onClick={() => answer("ask")}>{t.ask}</button>
                  </span>
                ) : (
                  <span className="tt-trail-done" role="status"><span className="tt-trail-done-m">P</span> · {t.resolved[chq]} · {t.by} <bdi>06:11</bdi></span>
                ))}
              </td>
              <td className="tt-trail-k">
                {r.ask ? <Tm m={chq ? "P" : "?"} label={chq ? t.approved : t.open} /> : <Tm m={r.mark ?? "✓"} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
