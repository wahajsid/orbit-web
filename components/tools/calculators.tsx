"use client";

import { useState } from "react";

/* ── The tools hub's calculators ─────────────────────────────────────
   Four client-side calculators in the modernist language. All figures
   recompute live as you type or drag; every page states plainly that
   the numbers are illustrative. No data leaves the browser. */

const aed = (n: number) =>
  `AED ${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const aed2 = (n: number) =>
  `AED ${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function num(v: string): number {
  const n = Number(String(v).replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function Field({ label, value, onChange, suffix, width }: {
  label: string; value: string; onChange: (v: string) => void; suffix?: string; width?: number;
}) {
  return (
    <label className="mg-tool-field" style={width ? { maxWidth: width } : undefined}>
      <span className="mg-tool-label">{label}</span>
      <span className="mg-tool-inwrap">
        <input className="mg-tool-in" inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
        {suffix && <span className="mg-tool-suffix">{suffix}</span>}
      </span>
    </label>
  );
}

/* ── 1 · ECL provision matrix (IFRS 9 simplified approach) ────────── */

const ECL_BUCKETS = ["Current", "1–30 days", "31–60 days", "61–90 days", "90+ days"] as const;
const ECL_DEFAULT_BAL = ["500000", "120000", "60000", "30000", "15000"];
const ECL_DEFAULT_RATE = ["0.5", "2", "5", "12", "30"];

export function EclCalculator() {
  const [bal, setBal] = useState<string[]>(ECL_DEFAULT_BAL);
  const [rate, setRate] = useState<string[]>(ECL_DEFAULT_RATE);
  const [adj, setAdj] = useState(0); // forward-looking adjustment, −50…+100 %

  const rows = ECL_BUCKETS.map((b, i) => {
    const exposure = num(bal[i]);
    const base = num(rate[i]);
    const applied = Math.max(0, base * (1 + adj / 100));
    return { b, exposure, base, applied, ecl: (exposure * applied) / 100 };
  });
  const totalExp = rows.reduce((s, r) => s + r.exposure, 0);
  const totalEcl = rows.reduce((s, r) => s + r.ecl, 0);
  const set = (arr: string[], i: number, v: string, fn: (a: string[]) => void) => {
    const next = arr.slice(); next[i] = v; fn(next);
  };

  return (
    <div className="mg-tool">
      <div className="mg-tool-tablewrap">
        <table className="mg-tool-table">
          <thead>
            <tr><th>Ageing bucket</th><th>Receivables (AED)</th><th>Loss rate %</th><th>Applied %</th><th>ECL (AED)</th></tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.b}>
                <td>{r.b}</td>
                <td><input className="mg-tool-in mg-tool-in-cell" inputMode="decimal" value={bal[i]} onChange={(e) => set(bal, i, e.target.value, setBal)} /></td>
                <td><input className="mg-tool-in mg-tool-in-cell" inputMode="decimal" value={rate[i]} onChange={(e) => set(rate, i, e.target.value, setRate)} /></td>
                <td className="mg-tool-mono">{r.applied.toFixed(2)}%</td>
                <td className="mg-tool-mono">{r.ecl.toLocaleString("en-US", { maximumFractionDigits: 0 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mg-tool-slider">
        <div className="mg-tool-label">
          Forward-looking adjustment: <b style={{ color: "var(--accent)" }}>{adj > 0 ? "+" : ""}{adj}%</b> on every loss rate
          <span className="mg-tool-hint"> — drag to stress the macro scenario</span>
        </div>
        <input type="range" min={-50} max={100} step={5} value={adj} onChange={(e) => setAdj(Number(e.target.value))} aria-label="Forward-looking adjustment" />
        <div className="mg-tool-slider-ends"><span>−50% (upside)</span><span>0 (base)</span><span>+100% (downside)</span></div>
      </div>

      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">Total provision (ECL)</div>
          <div className="mg-tool-big">{aed(totalEcl)}</div>
        </div>
        <div>
          <div className="mg-tool-label">Coverage</div>
          <div className="mg-tool-big">{totalExp > 0 ? ((totalEcl / totalExp) * 100).toFixed(2) : "0.00"}%</div>
        </div>
        <div>
          <div className="mg-tool-label">Receivables</div>
          <div className="mg-tool-big">{aed(totalExp)}</div>
        </div>
      </div>
    </div>
  );
}

/* ── 2 · EOSB gratuity (UAE, 21/30-day rule) ──────────────────────── */

export function EosbCalculator() {
  const [basic, setBasic] = useState("10000");
  const [years, setYears] = useState("5");
  const [months, setMonths] = useState("0");

  const b = num(basic);
  const service = Math.max(0, num(years)) + Math.min(11, Math.max(0, num(months))) / 12;
  const daily = (b * 12) / 365;
  const first = Math.min(service, 5) * 21;
  const after = Math.max(0, service - 5) * 30;
  const raw = service >= 1 ? daily * (first + after) : 0;
  const cap = b * 24;
  const gratuity = Math.min(raw, cap);

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label="Basic monthly wage (AED)" value={basic} onChange={setBasic} width={220} />
        <Field label="Years of service" value={years} onChange={setYears} width={140} />
        <Field label="+ months" value={months} onChange={setMonths} width={120} />
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">End-of-service gratuity</div>
          <div className="mg-tool-big">{service >= 1 ? aed2(gratuity) : "—"}</div>
        </div>
        <div className="mg-tool-note">
          {service < 1
            ? "Entitlement begins after one year of continuous service."
            : <>21 days of basic wage per year for the first five years ({(Math.min(service, 5) * 21).toFixed(1)} days), 30 days per year after ({(Math.max(0, service - 5) * 30).toFixed(1)} days), at a daily basic wage of {aed2(daily)}.{raw > cap && <b> Capped at two years&rsquo; wage ({aed(cap)}).</b>}</>}
        </div>
      </div>
    </div>
  );
}

/* ── 3 · VAT (UAE 5% / KSA 15%) ───────────────────────────────────── */

export function VatCalculator() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState(5);
  const [mode, setMode] = useState<"add" | "extract">("add");

  const a = num(amount);
  const net = mode === "add" ? a : a / (1 + rate / 100);
  const vat = net * (rate / 100);
  const gross = net + vat;

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={mode === "add" ? "Net amount" : "Gross amount (VAT-inclusive)"} value={amount} onChange={setAmount} width={220} />
        <div className="mg-tool-field" style={{ maxWidth: 220 }}>
          <span className="mg-tool-label">Rate</span>
          <div className="mg-tool-toggle">
            <button type="button" className={rate === 5 ? "on" : ""} onClick={() => setRate(5)}>UAE 5%</button>
            <button type="button" className={rate === 15 ? "on" : ""} onClick={() => setRate(15)}>KSA 15%</button>
          </div>
        </div>
        <div className="mg-tool-field" style={{ maxWidth: 260 }}>
          <span className="mg-tool-label">Direction</span>
          <div className="mg-tool-toggle">
            <button type="button" className={mode === "add" ? "on" : ""} onClick={() => setMode("add")}>Add VAT</button>
            <button type="button" className={mode === "extract" ? "on" : ""} onClick={() => setMode("extract")}>Extract VAT</button>
          </div>
        </div>
      </div>
      <div className="mg-tool-result">
        <div><div className="mg-tool-label">Net</div><div className="mg-tool-big">{aed2(net)}</div></div>
        <div><div className="mg-tool-label">VAT ({rate}%)</div><div className="mg-tool-big">{aed2(vat)}</div></div>
        <div><div className="mg-tool-label">Gross</div><div className="mg-tool-big">{aed2(gross)}</div></div>
      </div>
    </div>
  );
}

/* ── 4 · UAE Corporate Tax estimator ──────────────────────────────── */

export function CtCalculator() {
  const [income, setIncome] = useState("600000");
  const [sbr, setSbr] = useState(false);

  const t = num(income);
  const tax = sbr ? 0 : Math.max(0, t - 375000) * 0.09;
  const eff = t > 0 ? (tax / t) * 100 : 0;

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label="Taxable income for the period (AED)" value={income} onChange={setIncome} width={260} />
        <label className="mg-tool-check">
          <input type="checkbox" checked={sbr} onChange={(e) => setSbr(e.target.checked)} />
          <span>Electing Small Business Relief (revenue ≤ AED 3m, eligible periods)</span>
        </label>
      </div>
      <div className="mg-tool-result">
        <div><div className="mg-tool-label">Corporate Tax</div><div className="mg-tool-big">{aed2(tax)}</div></div>
        <div><div className="mg-tool-label">Effective rate</div><div className="mg-tool-big">{eff.toFixed(2)}%</div></div>
        <div className="mg-tool-note">
          {sbr
            ? "With a valid Small Business Relief election, taxable income is treated as nil for the period."
            : "0% on the first AED 375,000 of taxable income, 9% above it."}
        </div>
      </div>
    </div>
  );
}
