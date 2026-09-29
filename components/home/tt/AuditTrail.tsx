"use client";

/* ── One night on a group's books, as an audit trail ──────────────────
   Each line carries the mark a reviewer would give it. The one line only
   a person can clear shows "?" and two real buttons; answering it here
   also answers it in the five-ways demo (CHEQUE_EVENT), and the reverse. */

import { useEffect, useState } from "react";
import { CHEQUE_EVENT, type ChequeDetail } from "../../hysaab/Demo";
import { Tm } from "./Wp";

export type TrailRow = { t: string; who: string; msg: React.ReactNode; mark?: string; ask?: boolean };

const RESOLVED: Record<"petty" | "ask", string> = { petty: "posted as petty cash", ask: "slip requested from Omar" };

export function AuditTrail({ rows }: { rows: TrailRow[] }) {
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
        <thead><tr><th scope="col">Time</th><th scope="col">Agent</th><th scope="col">What it did</th><th scope="col" className="tt-trail-k">Mark</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.t + r.who} className={r.ask ? "tt-trail-ask" : undefined}>
              <td className="tt-trail-t">{r.t}</td>
              <td className="tt-trail-a">{r.who}</td>
              <td>
                {r.msg}
                {r.ask && (chq == null ? (
                  <span className="tt-trail-sign">
                    <span className="tt-trail-sign-l">Review point · yours</span>
                    <button type="button" className="hw-btn hw-btn--navy" onClick={() => answer("petty")}>Post as petty cash</button>
                    <button type="button" className="hw-btn tt-btn-line" onClick={() => answer("ask")}>Ask Omar for the slip</button>
                  </span>
                ) : (
                  <span className="tt-trail-done" role="status">P · {RESOLVED[chq]} · L.H. 06:11</span>
                ))}
              </td>
              <td className="tt-trail-k">
                {r.ask ? <Tm m={chq ? "P" : "?"} label={chq ? "Approved by a person" : "Open: needs a person"} /> : <Tm m={r.mark ?? "✓"} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
