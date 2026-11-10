"use client";

import { useState } from "react";

/* ── UAE depreciation calculator (IAS 16 book) + KSA tax pool ─────────
   Book depreciation by straight-line or reducing balance with a monthly
   first-year pro-rata, and the KSA Income Tax Law Article 17 group pool
   (declining balance on the group's remaining value, additions brought
   in at 50% in the year of service and 50% the year after). Same
   classes and helpers as components/tools/calculators.tsx. Everything
   runs in the browser. */

const fmt2 = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (cur: string, n: number) =>
  `${cur} ${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const pct2 = (n: number) => `${n.toFixed(2)}%`;

function num(v: string): number {
  const n = Number(String(v).replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function Field({ label, value, onChange, suffix, width, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; suffix?: string; width?: number; placeholder?: string;
}) {
  return (
    <label className="mg-tool-field" style={width ? { maxWidth: width } : undefined}>
      <span className="mg-tool-label">{label}</span>
      <span className="mg-tool-inwrap">
        <input className="mg-tool-in" inputMode="decimal" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        {suffix && <span className="mg-tool-suffix">{suffix}</span>}
      </span>
    </label>
  );
}

/* Typical useful lives in UAE practice. These are ranges commonly seen
   in IFRS financial statements, not law: the UAE sets no tax rates. The
   KSA group is the Article 17(b) group the class most naturally falls in. */
export const ASSET_CLASSES = [
  { k: "Buildings (owned, permanent)", range: "20–50 years", life: 25, ksa: 1 },
  { k: "Movable or prefabricated buildings", range: "5–10 years", life: 10, ksa: 2 },
  { k: "Leasehold improvements and fit-out", range: "Shorter of lease term and 5–10 years", life: 5, ksa: 5 },
  { k: "Plant and machinery", range: "5–15 years", life: 10, ksa: 3 },
  { k: "Motor vehicles", range: "3–5 years", life: 5, ksa: 3 },
  { k: "Computers and IT hardware", range: "3–5 years", life: 3, ksa: 3 },
  { k: "Software (IAS 38)", range: "3–5 years", life: 3, ksa: 3 },
  { k: "Office equipment", range: "3–5 years", life: 5, ksa: 3 },
  { k: "Furniture and fixtures", range: "4–10 years", life: 5, ksa: 5 },
  { k: "Aircraft and ships", range: "15–25 years", life: 20, ksa: 5 },
  { k: "Other (enter your own life)", range: "Your estimate", life: 5, ksa: 5 },
] as const;

/* Income Tax Law (Royal Decree M/1 of 1425H) Article 17(b). */
export const KSA_GROUPS = [
  { g: 1, r: 5, k: "Fixed buildings" },
  { g: 2, r: 10, k: "Movable industrial and agricultural buildings" },
  { g: 3, r: 25, k: "Factories, machinery, equipment, software, cars and trucks" },
  { g: 4, r: 20, k: "Geological survey, drilling and exploration for natural resources" },
  { g: 5, r: 10, k: "All other depreciable assets (furniture, aircraft, ships, goodwill)" },
] as const;

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type BookRow = { label: string; months: number; open: number; dep: number; close: number };
export type TaxRow = { label: string; added: number; pool: number; dep: number; close: number; book: number };

/* Financial year containing a date, given the month the year ends in
   (1–12). Returns the calendar year the FY ends in and the months the
   asset is in use in that first year (the month of entry counts in full). */
export function firstYear(y: number, m: number, fyEnd: number) {
  const endYear = m <= fyEnd ? y : y + 1;
  const months = m <= fyEnd ? fyEnd - m + 1 : fyEnd + 12 - m + 1;
  return { endYear, months };
}

export function bookSchedule(opts: {
  cost: number; residual: number; lifeYears: number; method: "sl" | "rb"; rate: number;
  firstMonths: number; firstEndYear: number; label: (endYear: number) => string;
}): BookRow[] {
  const { cost, residual, lifeYears, method, rate, firstMonths, firstEndYear, label } = opts;
  const rows: BookRow[] = [];
  const L = Math.round(lifeYears * 12);
  if (!(cost > 0) || L <= 0 || residual >= cost) return rows;
  const monthly = (cost - residual) / L;
  let used = 0;
  let nbv = cost;
  for (let i = 0; used < L && i < 120; i++) {
    const months = Math.min(i === 0 ? firstMonths : 12, L - used);
    const last = used + months >= L;
    let dep = method === "sl" ? monthly * months : nbv * rate * (months / 12);
    if (last) dep = nbv - residual; // final period writes down to residual value
    dep = Math.max(0, Math.min(dep, nbv - residual));
    rows.push({ label: label(firstEndYear + i), months, open: nbv, dep, close: nbv - dep });
    nbv -= dep;
    used += months;
  }
  return rows;
}

/* KSA Article 17(d)–(h) for one asset treated as the only asset in its
   group: half the cost enters the pool in the year of service and half
   the next year; each year's deduction is the group rate on the pool at
   year-end; a remaining value under SAR 1,000 may be deducted in full. */
export function ksaSchedule(opts: { cost: number; ratePct: number; firstEndYear: number; label: (endYear: number) => string; book: number[]; maxYears?: number }): TaxRow[] {
  const { cost, ratePct, firstEndYear, label, book } = opts;
  const max = opts.maxYears ?? 60;
  const rows: TaxRow[] = [];
  if (!(cost > 0)) return rows;
  let wdv = 0;
  for (let i = 0; i < max; i++) {
    const added = i < 2 ? cost * 0.5 : 0;
    const pool = wdv + added;
    let dep = pool * (ratePct / 100);
    let close = pool - dep;
    if (i >= 1 && close < 1000) { dep += close; close = 0; }
    rows.push({ label: label(firstEndYear + i), added, pool, dep, close, book: book[i] ?? 0 });
    wdv = close;
    if (wdv <= 0) break;
  }
  return rows;
}

export function DepreciationCalculator() {
  const [cls, setCls] = useState(3);
  const [cost, setCost] = useState("500000");
  const [residual, setResidual] = useState("50000");
  const [life, setLife] = useState("10");
  const [inService, setInService] = useState("2026-04-01");
  const [fyEnd, setFyEnd] = useState(12);
  const [method, setMethod] = useState<"sl" | "rb" | "ksa">("sl");
  const [rbRate, setRbRate] = useState("");
  const [group, setGroup] = useState(3);

  const pickClass = (i: number) => {
    setCls(i);
    setLife(String(ASSET_CLASSES[i].life));
    setGroup(ASSET_CLASSES[i].ksa);
  };

  const c = Math.max(0, num(cost));
  const rv = Math.max(0, num(residual));
  const n = Math.max(0, num(life));
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(inService);
  const ok = Boolean(dm) && c > 0 && n > 0 && n <= 100 && rv < c;
  const y0 = dm ? +dm[1] : 2026;
  const m0 = dm ? +dm[2] : 1;
  const { endYear, months: firstMonths } = firstYear(y0, m0, fyEnd);
  const label = (ey: number) => (fyEnd === 12 ? `FY ${ey}` : `FY to ${MON[fyEnd - 1]} ${ey}`);

  /* Reducing balance: the user's rate, or the rate that brings cost down
     to residual value over the life (1 − (RV/C)^(1/n)); with no residual
     value, double the straight-line rate (2 / n). */
  const autoRate = rv > 0 && c > 0 && n > 0 ? 1 - Math.pow(rv / c, 1 / n) : n > 0 ? Math.min(1, 2 / n) : 0;
  const rate = rbRate.trim() === "" ? autoRate : Math.min(1, Math.max(0, num(rbRate) / 100));

  const sl = ok ? bookSchedule({ cost: c, residual: rv, lifeYears: n, method: "sl", rate: 0, firstMonths, firstEndYear: endYear, label }) : [];
  const rb = ok && method === "rb" ? bookSchedule({ cost: c, residual: rv, lifeYears: n, method: "rb", rate, firstMonths, firstEndYear: endYear, label }) : [];
  const g = KSA_GROUPS[group - 1];
  const tax = c > 0 && dm && method === "ksa" ? ksaSchedule({ cost: c, ratePct: g.r, firstEndYear: endYear, label, book: sl.map((r) => r.dep) }) : [];

  const book = method === "rb" ? rb : sl;
  const cur = method === "ksa" ? "SAR" : "AED";
  const slRateCost = c > 0 && n > 0 ? ((c - rv) / c / n) * 100 : 0;
  const last = book[book.length - 1];
  const taxShown = tax.slice(0, 40);
  const taxLeft = tax.length > 40 ? tax[39].close : 0;
  const tax5 = tax.slice(0, 5).reduce((s, r) => s + r.dep, 0);
  const book5 = tax.slice(0, 5).reduce((s, r) => s + r.book, 0);

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <label className="mg-tool-field" style={{ maxWidth: 320, minWidth: 240 }}>
          <span className="mg-tool-label">Asset class (sets a typical life)</span>
          <span className="mg-tool-inwrap">
            <select className="mg-tool-in" value={cls} onChange={(e) => pickClass(Number(e.target.value))}>
              {ASSET_CLASSES.map((a, i) => (
                <option key={a.k} value={i}>{a.k}</option>
              ))}
            </select>
          </span>
        </label>
        <Field label={`Asset cost (${cur})`} value={cost} onChange={setCost} width={200} />
        <Field label={`Residual value (${cur})`} value={residual} onChange={setResidual} width={180} />
        <Field label="Useful life (years)" value={life} onChange={setLife} width={150} />
        <label className="mg-tool-field" style={{ maxWidth: 200 }}>
          <span className="mg-tool-label">In service from</span>
          <span className="mg-tool-inwrap">
            <input className="mg-tool-in" type="date" value={inService} onChange={(e) => setInService(e.target.value)} />
          </span>
        </label>
        <label className="mg-tool-field" style={{ maxWidth: 170 }}>
          <span className="mg-tool-label">Financial year ends</span>
          <span className="mg-tool-inwrap">
            <select className="mg-tool-in" value={fyEnd} onChange={(e) => setFyEnd(Number(e.target.value))}>
              {MON.map((mo, i) => (
                <option key={mo} value={i + 1}>{mo}</option>
              ))}
            </select>
          </span>
        </label>
      </div>
      <p className="mg-tool-note" style={{ marginTop: 0, marginBottom: 20 }}>
        Typical range for this class in UAE practice: {ASSET_CLASSES[cls].range}. That is common accounting practice, not a legal rate.
      </p>

      <div className="mg-tool-field">
        <span className="mg-tool-label">Method</span>
        <div className="mg-tool-toggle" style={{ flexWrap: "wrap" }}>
          <button type="button" className={method === "sl" ? "on" : ""} onClick={() => setMethod("sl")}>Straight-line</button>
          <button type="button" className={method === "rb" ? "on" : ""} onClick={() => setMethod("rb")}>Reducing balance</button>
          <button type="button" className={method === "ksa" ? "on" : ""} onClick={() => setMethod("ksa")}>KSA tax pool</button>
        </div>
      </div>

      {method === "rb" && (
        <div className="mg-tool-fields">
          <Field label="Reducing-balance rate (% a year)" value={rbRate} onChange={setRbRate} width={240} placeholder={(autoRate * 100).toFixed(2)} suffix="%" />
        </div>
      )}

      {method === "ksa" && (
        <div className="mg-tool-field">
          <span className="mg-tool-label">Article 17 group</span>
          <div className="mg-tool-toggle" style={{ flexWrap: "wrap" }}>
            {KSA_GROUPS.map((x) => (
              <button key={x.g} type="button" className={group === x.g ? "on" : ""} onClick={() => setGroup(x.g)}>Group {x.g} · {x.r}%</button>
            ))}
          </div>
        </div>
      )}

      {method !== "ksa" ? (
        <div className="mg-tool-result">
          <div>
            <div className="mg-tool-label">{method === "sl" ? "Annual rate (% of cost)" : "Reducing-balance rate"}</div>
            <div className="mg-tool-big">{ok ? pct2(method === "sl" ? slRateCost : rate * 100) : "—"}</div>
          </div>
          <div>
            <div className="mg-tool-label">First-year charge ({firstMonths} {firstMonths === 1 ? "month" : "months"})</div>
            <div className="mg-tool-big">{book[0] ? money(cur, book[0].dep) : "—"}</div>
          </div>
          <div>
            <div className="mg-tool-label">Depreciable amount</div>
            <div className="mg-tool-big">{ok ? money(cur, c - rv) : "—"}</div>
          </div>
          <div>
            <div className="mg-tool-label">Fully depreciated in</div>
            <div className="mg-tool-big">{last ? last.label : "—"}</div>
          </div>
          <div className="mg-tool-note">
            {!ok
              ? <>Enter a cost above zero, a residual value below cost, a useful life of up to 100 years and the date the asset was ready for use.</>
              : method === "sl"
                ? <>Straight-line spreads the depreciable amount evenly: ({money(cur, c)} − {money(cur, rv)}) ÷ {n} years = {money(cur, (c - rv) / n)} a year, or {pct2(100 / n)} of the depreciable amount and {pct2(slRateCost)} of cost. The first year carries {firstMonths} of 12 months, counting the month the asset enters service as a full month, so the charge runs into a final part-year.</>
                : <>Reducing balance applies {pct2(rate * 100)} to the opening net book value each year, prorated by months in the first year. {rbRate.trim() === "" ? (rv > 0 ? <>The rate shown is the one that brings cost down to residual value over the life: 1 − ({fmt2(rv)} ÷ {fmt2(c)})^(1 ÷ {n}). </> : <>With no residual value the default is double the straight-line rate (2 ÷ {n}). </>) : null}The final period writes the asset down to its residual value.</>}
          </div>
        </div>
      ) : (
        <div className="mg-tool-result">
          <div>
            <div className="mg-tool-label">Statutory rate (group {g.g})</div>
            <div className="mg-tool-big">{pct2(g.r)}</div>
          </div>
          <div>
            <div className="mg-tool-label">Tax depreciation, year 1</div>
            <div className="mg-tool-big">{tax[0] ? money(cur, tax[0].dep) : "—"}</div>
          </div>
          <div>
            <div className="mg-tool-label">Tax depreciation, year 2</div>
            <div className="mg-tool-big">{tax[1] ? money(cur, tax[1].dep) : "—"}</div>
          </div>
          <div>
            <div className="mg-tool-label">Tax less book, first 5 years</div>
            <div className="mg-tool-big">{tax.length ? money(cur, tax5 - book5) : "—"}</div>
          </div>
          <div className="mg-tool-note">
            {!(c > 0 && dm)
              ? <>Enter the cost and the date the asset entered service.</>
              : <>Group {g.g} ({g.k}) is depreciated at {g.r}% of the group&rsquo;s remaining value at the end of each tax year. Half the cost joins the pool in the year the asset enters service and half the following year, so there is no monthly pro-rata and no residual value. Year 1: {money(cur, c)} × 50% × {g.r}% = {money(cur, c * 0.5 * g.r / 100)}. The schedule treats this asset as the only one in its group; in a real return the rate applies to the whole group, with disposal proceeds taken off at 50% in the same way. The book column is straight-line over {n || "—"} years for comparison. Applies to income tax payers; zakat has separate rules.</>}
          </div>
        </div>
      )}

      {method !== "ksa" && book.length > 0 && (
        <>
          <h3 className="mg-tool-schedule-h" style={{ marginTop: 32 }}>Depreciation schedule</h3>
          <div className="mg-tool-tablewrap">
            <table className="mg-tool-table">
              <thead>
                <tr><th>Year</th><th>Months</th><th>Opening NBV</th><th>Depreciation</th><th>Closing NBV</th></tr>
              </thead>
              <tbody>
                {book.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    <td className="mg-tool-mono">{r.months}</td>
                    <td className="mg-tool-mono">{fmt2(r.open)}</td>
                    <td className="mg-tool-mono">{fmt2(r.dep)}</td>
                    <td className="mg-tool-mono">{fmt2(r.close)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {method === "ksa" && taxShown.length > 0 && (
        <>
          <h3 className="mg-tool-schedule-h" style={{ marginTop: 32 }}>KSA tax depreciation (Article 17 pool)</h3>
          <div className="mg-tool-tablewrap">
            <table className="mg-tool-table mg-tool-table-wide">
              <thead>
                <tr><th>Tax year</th><th>Cost brought in (50%)</th><th>Pool at year-end</th><th>Tax depreciation</th><th>Closing tax value</th><th>Book (straight-line)</th></tr>
              </thead>
              <tbody>
                {taxShown.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    <td className="mg-tool-mono">{fmt2(r.added)}</td>
                    <td className="mg-tool-mono">{fmt2(r.pool)}</td>
                    <td className="mg-tool-mono">{fmt2(r.dep)}</td>
                    <td className="mg-tool-mono">{fmt2(r.close)}</td>
                    <td className="mg-tool-mono">{fmt2(r.book)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {taxLeft > 0 && (
            <p className="mg-tool-note" style={{ marginTop: 12 }}>
              Showing the first 40 tax years. {money(cur, taxLeft)} is still in the pool; a declining balance never quite reaches nil, and the remainder is deductible once it falls below SAR 1,000 or the whole group is disposed of.
            </p>
          )}
        </>
      )}
    </div>
  );
}
