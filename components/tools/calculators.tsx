"use client";

import { useEffect, useState } from "react";

/* ── The tools hub's calculators ─────────────────────────────────────
   Nine client-side calculators in the modernist language. All figures
   recompute live as you type or drag; every page states plainly that
   the numbers are illustrative. No data leaves the browser. */

const aed = (n: number) =>
  `AED ${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const aed2 = (n: number) =>
  `AED ${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmt2 = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct2 = (n: number) => `${n.toFixed(2)}%`;

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

/* ── 5 · IFRS 16 Lease Liability & ROU Asset ────────────────────── */

export function LeaseCalculator() {
  const [payment, setPayment] = useState("50000");
  const [frequency, setFrequency] = useState<"monthly" | "quarterly" | "annual">("monthly");
  const [termYears, setTermYears] = useState("5");
  const [termMonths, setTermMonths] = useState("0");
  const [rate, setRate] = useState("6");
  const [prepaid, setPrepaid] = useState("0");

  const pmt = num(payment);
  const disc = num(rate) / 100;
  const totalMonths = Math.max(1, Math.round(num(termYears) * 12 + num(termMonths)));
  const periodsPerYear = frequency === "monthly" ? 12 : frequency === "quarterly" ? 4 : 1;
  const periodRate = disc / periodsPerYear;
  const totalPeriods = Math.round(totalMonths / (12 / periodsPerYear));
  const prep = num(prepaid);

  const periods = Math.max(1, totalPeriods);
  const pvFactor = periodRate > 0
    ? (1 - Math.pow(1 + periodRate, -periods)) / periodRate
    : periods;
  const leaseLiability = pmt * pvFactor;
  const rouAsset = leaseLiability + prep;

  const schedule: { period: number; openBal: number; interest: number; payment: number; closeBal: number; rouOpen: number; depr: number; rouClose: number }[] = [];
  const deprPerPeriod = rouAsset / periods;
  let bal = leaseLiability;
  let rou = rouAsset;
  for (let i = 1; i <= periods; i++) {
    const interest = bal * periodRate;
    const principal = pmt - interest;
    const closeBal = Math.max(0, bal + interest - pmt);
    const rouClose = Math.max(0, rou - deprPerPeriod);
    schedule.push({ period: i, openBal: bal, interest, payment: pmt, closeBal, rouOpen: rou, depr: deprPerPeriod, rouClose });
    bal = closeBal;
    rou = rouClose;
  }

  const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);
  const totalPayments = pmt * periods;

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label="Lease payment (AED)" value={payment} onChange={setPayment} width={200} />
        <div className="mg-tool-field" style={{ maxWidth: 280 }}>
          <span className="mg-tool-label">Frequency</span>
          <div className="mg-tool-toggle">
            <button type="button" className={frequency === "monthly" ? "on" : ""} onClick={() => setFrequency("monthly")}>Monthly</button>
            <button type="button" className={frequency === "quarterly" ? "on" : ""} onClick={() => setFrequency("quarterly")}>Quarterly</button>
            <button type="button" className={frequency === "annual" ? "on" : ""} onClick={() => setFrequency("annual")}>Annual</button>
          </div>
        </div>
        <Field label="Lease term — years" value={termYears} onChange={setTermYears} width={130} />
        <Field label="+ months" value={termMonths} onChange={setTermMonths} width={100} />
        <Field label="Discount rate (% p.a.)" value={rate} onChange={setRate} width={160} />
        <Field label="Prepaid / initial direct costs" value={prepaid} onChange={setPrepaid} width={200} />
      </div>

      <div className="mg-tool-result">
        <div><div className="mg-tool-label">Lease liability (PV)</div><div className="mg-tool-big">{aed2(leaseLiability)}</div></div>
        <div><div className="mg-tool-label">ROU asset (day 1)</div><div className="mg-tool-big">{aed2(rouAsset)}</div></div>
        <div><div className="mg-tool-label">Total interest</div><div className="mg-tool-big">{aed2(totalInterest)}</div></div>
        <div><div className="mg-tool-label">Total payments</div><div className="mg-tool-big">{aed2(totalPayments)}</div></div>
      </div>

      <h3 className="mg-tool-schedule-h">Amortisation schedule</h3>
      <div className="mg-tool-tablewrap">
        <table className="mg-tool-table mg-tool-table-wide">
          <thead>
            <tr>
              <th>#</th><th>Liability open</th><th>Interest</th><th>Payment</th><th>Liability close</th>
              <th>ROU open</th><th>Depreciation</th><th>ROU close</th>
            </tr>
          </thead>
          <tbody>
            {schedule.slice(0, 60).map((r) => (
              <tr key={r.period}>
                <td>{r.period}</td>
                <td className="mg-tool-mono">{fmt2(r.openBal)}</td>
                <td className="mg-tool-mono">{fmt2(r.interest)}</td>
                <td className="mg-tool-mono">{fmt2(r.payment)}</td>
                <td className="mg-tool-mono">{fmt2(r.closeBal)}</td>
                <td className="mg-tool-mono">{fmt2(r.rouOpen)}</td>
                <td className="mg-tool-mono">{fmt2(r.depr)}</td>
                <td className="mg-tool-mono">{fmt2(r.rouClose)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {periods > 60 && <p className="mg-tool-note" style={{ marginTop: 12 }}>Showing the first 60 of {periods} periods.</p>}
    </div>
  );
}

/* ── 6 · IAS 19 Actuarial EOSB valuation ─────────────────────────── */

export function ActuarialEosbCalculator() {
  const [headcount, setHeadcount] = useState("25");
  const [avgBasic, setAvgBasic] = useState("12000");
  const [avgService, setAvgService] = useState("3.5");
  const [discountRate, setDiscountRate] = useState("5.0");
  const [salaryGrowth, setSalaryGrowth] = useState("3.0");
  const [attrition, setAttrition] = useState("15");

  const n = Math.max(0, Math.round(num(headcount)));
  const basic = num(avgBasic);
  const svc = num(avgService);
  const dr = num(discountRate) / 100;
  const sg = num(salaryGrowth) / 100;
  const att = num(attrition) / 100;

  const projectionYears = 5;
  const rows: { year: number; projected: number; prob: number; pv: number }[] = [];
  let totalPV = 0;

  for (let y = 1; y <= projectionYears; y++) {
    const futureService = svc + y;
    const futureBasic = basic * Math.pow(1 + sg, y);
    const daily = (futureBasic * 12) / 365;
    const first5 = Math.min(futureService, 5) * 21;
    const after5 = Math.max(0, futureService - 5) * 30;
    const rawGratuity = futureService >= 1 ? daily * (first5 + after5) : 0;
    const capped = Math.min(rawGratuity, futureBasic * 24);
    const exitProb = att * Math.pow(1 - att, y - 1);
    const pv = (capped * exitProb * n) / Math.pow(1 + dr, y);
    rows.push({ year: y, projected: capped, prob: exitProb, pv });
    totalPV += pv;
  }

  const stayProb = Math.pow(1 - att, projectionYears);
  const termBasic = basic * Math.pow(1 + sg, projectionYears);
  const termService = svc + projectionYears;
  const termDaily = (termBasic * 12) / 365;
  const termFirst5 = Math.min(termService, 5) * 21;
  const termAfter5 = Math.max(0, termService - 5) * 30;
  const termGratuity = termService >= 1 ? Math.min(termDaily * (termFirst5 + termAfter5), termBasic * 24) : 0;
  const termPV = (termGratuity * stayProb * n) / Math.pow(1 + dr, projectionYears);
  totalPV += termPV;

  const undiscountedNow = (() => {
    const daily = (basic * 12) / 365;
    const f5 = Math.min(svc, 5) * 21;
    const a5 = Math.max(0, svc - 5) * 30;
    const raw = svc >= 1 ? daily * (f5 + a5) : 0;
    return Math.min(raw, basic * 24) * n;
  })();

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label="Headcount" value={headcount} onChange={setHeadcount} width={110} />
        <Field label="Avg basic wage (AED/mo)" value={avgBasic} onChange={setAvgBasic} width={190} />
        <Field label="Avg service (years)" value={avgService} onChange={setAvgService} width={150} />
        <Field label="Discount rate (%)" value={discountRate} onChange={setDiscountRate} width={140} />
        <Field label="Salary growth (%)" value={salaryGrowth} onChange={setSalaryGrowth} width={140} />
        <Field label="Attrition rate (%)" value={attrition} onChange={setAttrition} width={140} />
      </div>

      <div className="mg-tool-result">
        <div><div className="mg-tool-label">IAS 19 DBO estimate</div><div className="mg-tool-big">{aed2(totalPV)}</div></div>
        <div><div className="mg-tool-label">Undiscounted (today)</div><div className="mg-tool-big">{aed2(undiscountedNow)}</div></div>
        <div><div className="mg-tool-label">Actuarial uplift</div><div className="mg-tool-big">{undiscountedNow > 0 ? pct2(((totalPV - undiscountedNow) / undiscountedNow) * 100) : "—"}</div></div>
      </div>

      <h3 className="mg-tool-schedule-h">Projected exit-year cashflows</h3>
      <div className="mg-tool-tablewrap">
        <table className="mg-tool-table">
          <thead>
            <tr><th>Exit year</th><th>Per-employee gratuity</th><th>Exit probability</th><th>PV of obligation</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.year}>
                <td>Year {r.year}</td>
                <td className="mg-tool-mono">{fmt2(r.projected)}</td>
                <td className="mg-tool-mono">{pct2(r.prob * 100)}</td>
                <td className="mg-tool-mono">{fmt2(r.pv)}</td>
              </tr>
            ))}
            <tr>
              <td>Still employed</td>
              <td className="mg-tool-mono">{fmt2(termGratuity)}</td>
              <td className="mg-tool-mono">{pct2(stayProb * 100)}</td>
              <td className="mg-tool-mono">{fmt2(termPV)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mg-tool-note" style={{ marginTop: 16 }}>
        Simplified projected unit credit model with a flat exit-probability tree. A full actuarial valuation
        uses employee-level data and mortality tables — this gives a directional estimate for planning
        and helps explain why the IAS 19 number differs from the simple labour-law sum.
      </div>
    </div>
  );
}

/* ── 7 · IAS 36 Impairment — Value-in-Use DCF ───────────────────── */

export function ImpairmentCalculator() {
  const [carrying, setCarrying] = useState("5000000");
  const [cf, setCf] = useState(["800000", "900000", "1000000", "1050000", "1100000"]);
  const [wacc, setWacc] = useState("10");
  const [termGrowth, setTermGrowth] = useState("2");

  const r = num(wacc) / 100;
  const g = num(termGrowth) / 100;
  const carryAmt = num(carrying);

  const pvs = cf.map((c, i) => {
    const v = num(c);
    return { year: i + 1, cf: v, pv: v / Math.pow(1 + r, i + 1) };
  });

  const lastCF = num(cf[cf.length - 1]);
  const terminalValue = r > g ? (lastCF * (1 + g)) / (r - g) : 0;
  const terminalPV = terminalValue / Math.pow(1 + r, cf.length);
  const totalPV = pvs.reduce((s, p) => s + p.pv, 0) + terminalPV;
  const impairment = Math.max(0, carryAmt - totalPV);
  const headroom = totalPV - carryAmt;

  const setCfAt = (i: number, v: string) => {
    const next = cf.slice();
    next[i] = v;
    setCf(next);
  };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label="Carrying amount of CGU (AED)" value={carrying} onChange={setCarrying} width={240} />
        <Field label="WACC / discount rate (%)" value={wacc} onChange={setWacc} width={180} />
        <Field label="Terminal growth rate (%)" value={termGrowth} onChange={setTermGrowth} width={180} />
      </div>

      <h3 className="mg-tool-schedule-h">Projected free cash flows</h3>
      <div className="mg-tool-tablewrap">
        <table className="mg-tool-table">
          <thead>
            <tr><th>Year</th><th>Cash flow (AED)</th><th>Discount factor</th><th>Present value</th></tr>
          </thead>
          <tbody>
            {pvs.map((p, i) => (
              <tr key={p.year}>
                <td>Year {p.year}</td>
                <td><input className="mg-tool-in mg-tool-in-cell" inputMode="decimal" value={cf[i]} onChange={(e) => setCfAt(i, e.target.value)} /></td>
                <td className="mg-tool-mono">{(1 / Math.pow(1 + r, i + 1)).toFixed(4)}</td>
                <td className="mg-tool-mono">{fmt2(p.pv)}</td>
              </tr>
            ))}
            <tr>
              <td>Terminal</td>
              <td className="mg-tool-mono">{fmt2(terminalValue)}</td>
              <td className="mg-tool-mono">{(1 / Math.pow(1 + r, cf.length)).toFixed(4)}</td>
              <td className="mg-tool-mono">{fmt2(terminalPV)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mg-tool-result">
        <div><div className="mg-tool-label">Value in use</div><div className="mg-tool-big">{aed2(totalPV)}</div></div>
        <div><div className="mg-tool-label">Carrying amount</div><div className="mg-tool-big">{aed2(carryAmt)}</div></div>
        <div>
          <div className="mg-tool-label">{headroom >= 0 ? "Headroom" : "Impairment loss"}</div>
          <div className="mg-tool-big" style={headroom < 0 ? { color: "var(--bad)" } : undefined}>
            {headroom >= 0 ? aed2(headroom) : aed2(impairment)}
          </div>
        </div>
      </div>
      <div className="mg-tool-note">
        {headroom >= 0
          ? "Value in use exceeds carrying amount — no impairment required."
          : `Value in use is below carrying amount by ${aed2(impairment)}. The CGU should be written down and the loss recognised in profit or loss.`}
      </div>
    </div>
  );
}

/* ── 8 · IAS 12 Deferred Tax schedule ────────────────────────────── */

type DtRow = { desc: string; carrying: string; taxBase: string };

const DT_DEFAULTS: DtRow[] = [
  { desc: "Property, plant & equipment", carrying: "1200000", taxBase: "1000000" },
  { desc: "Right-of-use assets", carrying: "800000", taxBase: "0" },
  { desc: "Trade receivables (net of ECL)", carrying: "450000", taxBase: "500000" },
  { desc: "Lease liabilities", carrying: "820000", taxBase: "0" },
  { desc: "Employee benefit obligations", carrying: "350000", taxBase: "0" },
];

export function DeferredTaxCalculator() {
  const [rows, setRows] = useState<DtRow[]>(DT_DEFAULTS);
  const [taxRate, setTaxRate] = useState("9");

  const rate = num(taxRate) / 100;

  const computed = rows.map((r) => {
    const ca = num(r.carrying);
    const tb = num(r.taxBase);
    const diff = ca - tb;
    return { ...r, ca, tb, diff, dtl: diff > 0 ? diff * rate : 0, dta: diff < 0 ? Math.abs(diff) * rate : 0 };
  });

  const totalDTL = computed.reduce((s, r) => s + r.dtl, 0);
  const totalDTA = computed.reduce((s, r) => s + r.dta, 0);
  const net = totalDTL - totalDTA;

  const updateRow = (i: number, field: keyof DtRow, v: string) => {
    const next = rows.slice();
    next[i] = { ...next[i], [field]: v };
    setRows(next);
  };
  const addRow = () => setRows([...rows, { desc: "", carrying: "0", taxBase: "0" }]);
  const removeRow = (i: number) => { if (rows.length > 1) setRows(rows.filter((_, j) => j !== i)); };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields" style={{ marginBottom: 16 }}>
        <Field label="Tax rate (%)" value={taxRate} onChange={setTaxRate} width={120} />
      </div>

      <div className="mg-tool-tablewrap">
        <table className="mg-tool-table mg-tool-table-wide">
          <thead>
            <tr>
              <th>Item</th><th>Carrying amount</th><th>Tax base</th><th>Temp. difference</th>
              <th>DTL</th><th>DTA</th><th></th>
            </tr>
          </thead>
          <tbody>
            {computed.map((r, i) => (
              <tr key={i}>
                <td><input className="mg-tool-in mg-tool-in-cell" style={{ maxWidth: 220, minWidth: 140 }} value={rows[i].desc} onChange={(e) => updateRow(i, "desc", e.target.value)} /></td>
                <td><input className="mg-tool-in mg-tool-in-cell" inputMode="decimal" value={rows[i].carrying} onChange={(e) => updateRow(i, "carrying", e.target.value)} /></td>
                <td><input className="mg-tool-in mg-tool-in-cell" inputMode="decimal" value={rows[i].taxBase} onChange={(e) => updateRow(i, "taxBase", e.target.value)} /></td>
                <td className="mg-tool-mono" style={r.diff < 0 ? { color: "var(--accent)" } : r.diff > 0 ? { color: "var(--bad)" } : undefined}>{fmt2(r.diff)}</td>
                <td className="mg-tool-mono">{r.dtl > 0 ? fmt2(r.dtl) : "—"}</td>
                <td className="mg-tool-mono">{r.dta > 0 ? fmt2(r.dta) : "—"}</td>
                <td><button type="button" className="mg-tool-rm" onClick={() => removeRow(i)} aria-label="Remove row">×</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" className="mg-tool-add" onClick={addRow}>+ Add line</button>

      <div className="mg-tool-result">
        <div><div className="mg-tool-label">Total DTL</div><div className="mg-tool-big" style={{ color: "var(--bad)" }}>{aed2(totalDTL)}</div></div>
        <div><div className="mg-tool-label">Total DTA</div><div className="mg-tool-big">{aed2(totalDTA)}</div></div>
        <div>
          <div className="mg-tool-label">Net position</div>
          <div className="mg-tool-big" style={net > 0 ? { color: "var(--bad)" } : undefined}>
            {net >= 0 ? `${aed2(net)} DTL` : `${aed2(Math.abs(net))} DTA`}
          </div>
        </div>
      </div>
      <div className="mg-tool-note">
        Taxable temporary differences create DTLs; deductible ones create DTAs. Net presentation is
        permitted only when the entity has a legally enforceable right to set off and they relate to
        taxes levied by the same authority.
      </div>
    </div>
  );
}

/* ── 9 · IFRS 9 Effective Interest Rate (EIR) ───────────────────── */

export function EirCalculator() {
  const [principal, setPrincipal] = useState("1000000");
  const [coupon, setCoupon] = useState("5");
  const [termYears, setTermYears] = useState("5");
  const [fees, setFees] = useState("20000");
  const [premium, setPremium] = useState("0");

  const face = num(principal);
  const cpn = num(coupon) / 100;
  const years = Math.max(1, Math.round(num(termYears)));
  const origFees = num(fees);
  const prem = num(premium);

  const netProceeds = face - origFees + prem;
  const couponAmt = face * cpn;

  const solveEIR = (): number => {
    let lo = 0, hi = 1;
    for (let iter = 0; iter < 200; iter++) {
      const mid = (lo + hi) / 2;
      let pv = 0;
      for (let t = 1; t <= years; t++) {
        pv += couponAmt / Math.pow(1 + mid, t);
      }
      pv += face / Math.pow(1 + years > 0 ? 1 + mid : 1, years);
      if (pv > netProceeds) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  };

  const eir = netProceeds > 0 && years > 0 ? solveEIR() : 0;

  const schedule: { year: number; openBal: number; interest: number; couponPaid: number; closeBal: number }[] = [];
  let bal = netProceeds;
  for (let t = 1; t <= years; t++) {
    const interest = bal * eir;
    const close = t < years ? bal + interest - couponAmt : 0;
    schedule.push({ year: t, openBal: bal, interest, couponPaid: couponAmt, closeBal: Math.max(0, close) });
    bal = Math.max(0, close);
  }

  const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label="Face value / principal (AED)" value={principal} onChange={setPrincipal} width={220} />
        <Field label="Coupon rate (% p.a.)" value={coupon} onChange={setCoupon} width={160} />
        <Field label="Term (years)" value={termYears} onChange={setTermYears} width={120} />
        <Field label="Origination fees (AED)" value={fees} onChange={setFees} width={180} />
        <Field label="Premium / (discount) (AED)" value={premium} onChange={setPremium} width={200} />
      </div>

      <div className="mg-tool-result">
        <div><div className="mg-tool-label">Effective interest rate</div><div className="mg-tool-big">{pct2(eir * 100)}</div></div>
        <div><div className="mg-tool-label">Net proceeds (day 1)</div><div className="mg-tool-big">{aed2(netProceeds)}</div></div>
        <div><div className="mg-tool-label">Coupon rate</div><div className="mg-tool-big">{pct2(cpn * 100)}</div></div>
        <div><div className="mg-tool-label">Total IFRS interest</div><div className="mg-tool-big">{aed2(totalInterest)}</div></div>
      </div>

      <h3 className="mg-tool-schedule-h">Amortised cost schedule</h3>
      <div className="mg-tool-tablewrap">
        <table className="mg-tool-table">
          <thead>
            <tr><th>Year</th><th>Amortised cost (open)</th><th>Interest (P&L)</th><th>Coupon paid</th><th>Amortised cost (close)</th></tr>
          </thead>
          <tbody>
            {schedule.map((r) => (
              <tr key={r.year}>
                <td>{r.year}</td>
                <td className="mg-tool-mono">{fmt2(r.openBal)}</td>
                <td className="mg-tool-mono">{fmt2(r.interest)}</td>
                <td className="mg-tool-mono">{fmt2(r.couponPaid)}</td>
                <td className="mg-tool-mono">{fmt2(r.closeBal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mg-tool-note" style={{ marginTop: 16 }}>
        The EIR is the rate that exactly discounts the expected future cash flows to the net carrying
        amount at initial recognition (IFRS 9 B5.4.1). The difference between EIR interest and coupon
        paid unwinds the fees/premium over the instrument&rsquo;s life.
      </div>
    </div>
  );
}

/* ── 10 · KSA Zakat estimator (ZATCA) ─────────────────────────────── */

const sar = (n: number) =>
  `SAR ${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const sar2 = (n: number) =>
  `SAR ${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function ZakatCalculator() {
  // Sources of funds (the base builds up from what finances the business…)
  const [capital, setCapital] = useState("1000000");
  const [retained, setRetained] = useState("250000");
  const [provisions, setProvisions] = useState("50000");
  const [ltLiab, setLtLiab] = useState("300000");
  const [profit, setProfit] = useState("400000");
  // …less what is tied up long-term (not zakatable working wealth).
  const [fixedAssets, setFixedAssets] = useState("700000");
  const [ltInvest, setLtInvest] = useState("100000");
  const [losses, setLosses] = useState("0");

  const [yearType, setYearType] = useState<"hijri" | "gregorian">("gregorian");
  const [saudiPct, setSaudiPct] = useState("100");

  // ZATCA levies 2.5% for a Hijri year; a Gregorian year is grossed up
  // for its extra days: 2.5% × 365/354 ≈ 2.577683%.
  const rate = yearType === "hijri" ? 2.5 : 2.577683;

  const additions = num(capital) + num(retained) + num(provisions) + num(ltLiab) + num(profit);
  const deductions = num(fixedAssets) + num(ltInvest) + num(losses);
  const netBase = additions - deductions;
  // The base is floored at the adjusted profit for the year: deductions
  // can shelter equity, never the year's result itself.
  const flooredBase = Math.max(netBase, num(profit));
  const base = Math.max(0, flooredBase);
  const floorApplied = base > 0 && netBase < num(profit);

  const share = Math.min(100, Math.max(0, num(saudiPct)));
  const zakatable = base * (share / 100);
  const zakat = zakatable * (rate / 100);

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <div className="mg-tool-field" style={{ maxWidth: 280 }}>
          <span className="mg-tool-label">Fiscal year</span>
          <div className="mg-tool-toggle">
            <button type="button" className={yearType === "hijri" ? "on" : ""} onClick={() => setYearType("hijri")}>Hijri · 2.5%</button>
            <button type="button" className={yearType === "gregorian" ? "on" : ""} onClick={() => setYearType("gregorian")}>Gregorian · 2.5777%</button>
          </div>
        </div>
        <Field label="Saudi / GCC ownership" value={saudiPct} onChange={setSaudiPct} suffix="%" width={180} />
      </div>

      <h3 className="mg-tool-schedule-h">Sources of funds (additions to the base)</h3>
      <div className="mg-tool-fields">
        <Field label="Paid-up capital (SAR)" value={capital} onChange={setCapital} width={200} />
        <Field label="Retained earnings + reserves" value={retained} onChange={setRetained} width={200} />
        <Field label="Provisions (opening)" value={provisions} onChange={setProvisions} width={180} />
        <Field label="Long-term liabilities" value={ltLiab} onChange={setLtLiab} width={180} />
        <Field label="Adjusted net profit for the year" value={profit} onChange={setProfit} width={210} />
      </div>

      <h3 className="mg-tool-schedule-h">Deductions (long-term uses of funds)</h3>
      <div className="mg-tool-fields">
        <Field label="Net fixed assets & intangibles" value={fixedAssets} onChange={setFixedAssets} width={210} />
        <Field label="Long-term investments" value={ltInvest} onChange={setLtInvest} width={190} />
        <Field label="Carried-forward losses" value={losses} onChange={setLosses} width={190} />
      </div>

      <div className="mg-tool-tablewrap" style={{ marginTop: 20 }}>
        <table className="mg-tool-table">
          <thead>
            <tr><th>Zakat base build-up</th><th>SAR</th></tr>
          </thead>
          <tbody>
            <tr><td>Sources of funds</td><td className="mg-tool-mono">{fmt2(additions)}</td></tr>
            <tr><td>Less: deductible long-term assets</td><td className="mg-tool-mono">({fmt2(deductions)})</td></tr>
            <tr><td>Net position</td><td className="mg-tool-mono">{fmt2(netBase)}</td></tr>
            {floorApplied && (
              <tr><td>Floor — base cannot fall below adjusted profit</td><td className="mg-tool-mono">{fmt2(num(profit))}</td></tr>
            )}
            <tr><td><b>Zakat base</b></td><td className="mg-tool-mono"><b>{fmt2(base)}</b></td></tr>
            {share < 100 && (
              <tr><td>Saudi / GCC share ({share}%)</td><td className="mg-tool-mono">{fmt2(zakatable)}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">Zakat due</div>
          <div className="mg-tool-big">{sar2(zakat)}</div>
        </div>
        <div>
          <div className="mg-tool-label">Rate applied</div>
          <div className="mg-tool-big">{rate.toFixed(4)}%</div>
        </div>
        <div className="mg-tool-note">
          {floorApplied && <>The floor rule applied: deductions took the equity base below the year&rsquo;s adjusted profit, so zakat is charged on the profit itself ({sar(num(profit))}). </>}
          {share < 100
            ? <>Zakat applies to the Saudi/GCC share only ({share}%); the non-Saudi share of profits is instead subject to 20% income tax, which this tool does not compute.</>
            : <>The base is what finances the business (equity, provisions, long-term borrowing and the year&rsquo;s profit) less what is locked up long-term (fixed assets, long-term investments, carried losses).</>}
        </div>
      </div>
    </div>
  );
}

/* ── 11 · Free zone de minimis test (QFZP) ────────────────────────── */

export function DeMinimisCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [total, setTotal] = useState("12000000");
  const [nonQual, setNonQual] = useState("450000");

  const t = num(total);
  const nq = num(nonQual);
  const threshold = Math.min(5000000, t * 0.05);
  const pass = t > 0 && nq <= threshold;
  const headroom = threshold - nq;

  const L = ar
    ? { total: "إجمالي الإيرادات للفترة (درهم)", nq: "الإيرادات غير المؤهلة (درهم)", th: "حد الأدنى (de minimis)", res: "النتيجة", within: "ضمن الحد", breached: "تجاوز الحد", head: "الهامش المتبقي", over: "التجاوز" }
    : { total: "Total revenue for the period (AED)", nq: "Non-qualifying revenue (AED)", th: "De minimis threshold", res: "Result", within: "Within", breached: "Breached", head: "Headroom left", over: "Over by" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.total} value={total} onChange={setTotal} width={260} />
        <Field label={L.nq} value={nonQual} onChange={setNonQual} width={260} />
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.th}</div>
          <div className="mg-tool-big">{aed(threshold)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.res}</div>
          <div className="mg-tool-big" style={{ color: pass ? "var(--accent)" : "var(--bad)" }}>{t > 0 ? (pass ? L.within : L.breached) : "—"}</div>
        </div>
        <div>
          <div className="mg-tool-label">{pass ? L.head : L.over}</div>
          <div className="mg-tool-big">{t > 0 ? aed(Math.abs(headroom)) : "—"}</div>
        </div>
        <div className="mg-tool-note">
          {ar ? <>الحد هو الأدنى من 5,000,000 درهم أو 5% من إجمالي الإيرادات ({aed(t * 0.05)}).{" "}
            {pass
              ? "الإيرادات غير المؤهلة ضمن الحد — نظام الـ 0% يجتاز هذا الاختبار (وتبقى شروط الشخص المؤهل الأخرى: الحضور الفعلي، والحسابات المدققة، والتسعير التحويلي)."
              : <b>تجاوز الحد يُسقط صفة الشخص المؤهل القائم في المنطقة الحرة لهذه الفترة وللفترات الأربع التالية — خمس سنوات من 9% على كل شيء.</b>}</>
          : <>The threshold is the lower of AED 5,000,000 and 5% of total revenue ({aed(t * 0.05)}).{" "}
            {pass
              ? "Non-qualifying revenue is inside the de minimis — the 0% regime survives this test (the other QFZP conditions still apply: substance, audited accounts, transfer pricing)."
              : <b>Breaching the de minimis loses Qualifying Free Zone Person status for this period and the four that follow — five years of 9% on everything.</b>}</>}
        </div>
      </div>
    </div>
  );
}

/* ── 12 · Small Business Relief eligibility checker ───────────────── */

export function SbrCheckerCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [revenue, setRevenue] = useState("2400000");
  const [taxable, setTaxable] = useState("400000");
  const [priorOk, setPriorOk] = useState(true);
  const [qfzp, setQfzp] = useState(false);
  const [mne, setMne] = useState(false);

  const r = num(revenue);
  const ti = num(taxable);
  const underCap = r <= 3000000;
  const eligible = underCap && priorOk && !qfzp && !mne;
  const taxWithout = Math.max(0, ti - 375000) * 0.09;
  const blockers: string[] = [];
  if (!underCap) blockers.push(ar ? "الإيرادات تتجاوز 3,000,000 درهم" : "revenue exceeds AED 3,000,000");
  if (!priorOk) blockers.push(ar ? "فترة سابقة تجاوزت 3,000,000 درهم" : "a previous period already exceeded AED 3,000,000");
  if (qfzp) blockers.push(ar ? "الشخص المؤهل في المنطقة الحرة لا يستطيع الاختيار" : "Qualifying Free Zone Persons cannot elect");
  if (mne) blockers.push(ar ? "أعضاء المجموعات متعددة الجنسيات الكبيرة لا يستطيعون الاختيار" : "members of large MNE groups cannot elect");

  const L = ar
    ? { rev: "إيرادات الفترة (درهم)", ti: "الدخل الخاضع إن عُرف (درهم)", prior: "كل الفترات السابقة بقيت أيضًا عند 3 ملايين درهم أو أقل", qfzp: "شخص مؤهل قائم في منطقة حرة (نظام الـ 0%)", mne: "عضو في مجموعة متعددة الجنسيات فوق عتبة CbCR (‏3.15 مليار درهم)", elig: "الأهلية", can: "يمكن الاختيار", cannot: "لا يمكن الاختيار", saved: "الوفر التقديري من 9%" }
    : { rev: "Revenue for the period (AED)", ti: "Taxable income, if known (AED)", prior: "All previous tax periods also stayed at or under AED 3m", qfzp: "Qualifying Free Zone Person (0% regime)", mne: "Member of an MNE group above the CbCR threshold (AED 3.15bn)", elig: "Eligibility", can: "Can elect", cannot: "Cannot elect", saved: "Estimated 9% saved" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.rev} value={revenue} onChange={setRevenue} width={240} />
        <Field label={L.ti} value={taxable} onChange={setTaxable} width={240} />
      </div>
      <div className="mg-tool-fields">
        <label className="mg-tool-check">
          <input type="checkbox" checked={priorOk} onChange={(e) => setPriorOk(e.target.checked)} />
          <span>{L.prior}</span>
        </label>
        <label className="mg-tool-check">
          <input type="checkbox" checked={qfzp} onChange={(e) => setQfzp(e.target.checked)} />
          <span>{L.qfzp}</span>
        </label>
        <label className="mg-tool-check">
          <input type="checkbox" checked={mne} onChange={(e) => setMne(e.target.checked)} />
          <span>{L.mne}</span>
        </label>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.elig}</div>
          <div className="mg-tool-big" style={{ color: eligible ? "var(--accent)" : "var(--bad)" }}>{eligible ? L.can : L.cannot}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.saved}</div>
          <div className="mg-tool-big">{eligible ? aed(taxWithout) : "—"}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? (eligible
              ? <>مع الاختيار يُعامَل الدخل الخاضع كأنه صفر للفترة — مقابل ما يقدَّر بـ {aed2(taxWithout)} على الشرائح العادية 0%/9%. يُمارَس الاختيار في الإقرار الضريبي، ويسري على الفترات المنتهية في 31 ديسمبر 2026 أو قبله، ويتخلى عن ترحيل خسائر الفترة. ويبقى التسجيل والتقديم واجبين.</>
              : <>غير مؤهل: {blockers.join("؛ ")}. وتبقى الشريحة الصفرية حتى 375,000 درهم و9% فوقها ساريتين.</>)
            : (eligible
              ? <>With the election, taxable income is treated as nil for the period — versus an estimated {aed2(taxWithout)} at the standard 0%/9% bands. The election is made in the tax return, applies to periods ending on or before 31 December 2026, and gives up loss carry-forward for the period. Registration and filing are still required.</>
              : <>Not eligible: {blockers.join("; ")}. The standard 0% band to AED 375,000 and 9% above still apply.</>)}
        </div>
      </div>
    </div>
  );
}

/* ── 13 · UAE VAT late filing & payment penalties ─────────────────── */

export function VatPenaltyCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [unpaid, setUnpaid] = useState("50000");
  const [days, setDays] = useState("45");
  const [lateReturn, setLateReturn] = useState(true);
  const [repeat, setRepeat] = useState(false);

  const tax = Math.max(0, num(unpaid));
  const d = Math.max(0, Math.floor(num(days)));
  const monthlyHits = d >= 31 ? Math.floor((d - 1) / 30) : 0;
  const latePct = d > 0 ? Math.min(300, 2 + 4 * monthlyHits) : 0;
  const latePayment = (tax * latePct) / 100;
  const filing = lateReturn ? (repeat ? 2000 : 1000) : 0;
  const total = latePayment + filing;

  const L = ar
    ? { unpaid: "الضريبة غير المدفوعة (درهم)", days: "الأيام بعد الموعد النهائي", lateRet: "الإقرار نفسه قُدِّم متأخرًا أيضًا", repeat: "تكرار التأخر في التقديم خلال 24 شهرًا", pay: `غرامة التأخر في السداد (${latePct}%)`, file: "غرامة التأخر في التقديم", total: "إجمالي التعرض" }
    : { unpaid: "Unpaid VAT (AED)", days: "Days past the deadline", lateRet: "The return itself was also filed late", repeat: "Repeat late filing within 24 months", pay: `Late-payment penalty (${latePct}%)`, file: "Late-filing penalty", total: "Total exposure" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.unpaid} value={unpaid} onChange={setUnpaid} width={220} />
        <Field label={L.days} value={days} onChange={setDays} width={200} />
      </div>
      <div className="mg-tool-fields">
        <label className="mg-tool-check">
          <input type="checkbox" checked={lateReturn} onChange={(e) => setLateReturn(e.target.checked)} />
          <span>{L.lateRet}</span>
        </label>
        <label className="mg-tool-check">
          <input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} />
          <span>{L.repeat}</span>
        </label>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.pay}</div>
          <div className="mg-tool-big">{aed2(latePayment)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.file}</div>
          <div className="mg-tool-big">{aed2(filing)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.total}</div>
          <div className="mg-tool-big">{aed2(total)}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? <>التأخر في السداد: 2% من الضريبة غير المدفوعة فور انقضاء الموعد، ثم 4% شهريًا ابتداءً من شهر بعده{monthlyHits > 0 ? ` (${monthlyHits} ${monthlyHits === 1 ? "رسم شهري" : "رسوم شهرية"} حتى الآن)` : ""}, بسقف 300%. التأخر في التقديم: 1,000 درهم للمرة الأولى و2,000 درهم عند التكرار خلال 24 شهرًا. والإفصاح الطوعي قبل إشعار التدقيق يخفّض التعرض عادةً — والأرقام هنا تفترض عدمه.</>
            : <>Late payment: 2% of the unpaid tax immediately after the deadline, then 4% monthly starting one month after it{monthlyHits > 0 ? ` (${monthlyHits} monthly charge${monthlyHits === 1 ? "" : "s"} so far)` : ""}, capped at 300%. Late filing: AED 1,000 first offence, AED 2,000 on repetition within 24 months. Voluntary disclosure before an audit notice generally reduces the exposure — the numbers here assume none.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 14 · Loyalty points deferred revenue (IFRS 15) ───────────────── */

export function LoyaltyCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [sale, setSale] = useState("1000");
  const [face, setFace] = useState("50");
  const [redeemPct, setRedeemPct] = useState("80");
  const [donePct, setDonePct] = useState("0");

  const L = ar
    ? { sale: "قيمة البيع (درهم)", face: "النقاط الممنوحة بالقيمة الاسمية (درهم)", rr: "الاسترداد المتوقع", done: "المستَرد حتى الآن (من النقاط الصادرة)", now: "إيراد عند البيع", def: "المؤجل للنقاط", lia: "التزام العقد اليوم" }
    : { sale: "Sale amount (AED)", face: "Points granted, at face value (AED)", rr: "Expected redemption", done: "Redeemed to date (of points issued)", now: "Revenue at sale", def: "Deferred to points", lia: "Contract liability today" };

  const s = Math.max(0, num(sale));
  const f = Math.max(0, num(face));
  const rr = Math.min(100, Math.max(0, num(redeemPct))) / 100;
  const done = Math.min(100, Math.max(0, num(donePct))) / 100;

  const ssp = f * rr; // standalone value of the points, breakage-weighted
  const denom = s + ssp;
  const revNow = denom > 0 ? (s * s) / denom : 0;
  const deferred = denom > 0 ? (s * ssp) / denom : 0;
  const progress = rr > 0 ? Math.min(1, done / rr) : 0;
  const released = deferred * progress;
  const liability = deferred - released;

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.sale} value={sale} onChange={setSale} width={200} />
        <Field label={L.face} value={face} onChange={setFace} width={250} />
        <Field label={L.rr} value={redeemPct} onChange={setRedeemPct} suffix="%" width={190} />
        <Field label={L.done} value={donePct} onChange={setDonePct} suffix="%" width={250} />
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.now}</div>
          <div className="mg-tool-big">{aed2(revNow)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.def}</div>
          <div className="mg-tool-big">{aed2(deferred)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.lia}</div>
          <div className="mg-tool-big">{aed2(liability)}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? <>القيمة المستقلة للنقاط هي قيمتها الاسمية مرجّحة بالاسترداد المتوقع ({aed2(ssp)})؛ ويُقسَّم سعر البيع بالنسبة ({fmt2(denom > 0 ? (s / denom) * 100 : 0)}% / {fmt2(denom > 0 ? (ssp / denom) * 100 : 0)}%). ويُطلَق الإيراد المؤجل بنسبة الاستردادات إلى الإجمالي المتوقع — أُطلق {fmt2(progress * 100)}% حتى الآن ({aed2(released)}) — فيظهر إيراد النقاط غير المستردة مع تشغيل البرنامج لا دفعة واحدة عند الانتهاء.</>
            : <>The points&rsquo; standalone value is their face value weighted by expected redemption ({aed2(ssp)}); the sale price is split in proportion ({fmt2(denom > 0 ? (s / denom) * 100 : 0)}% / {fmt2(denom > 0 ? (ssp / denom) * 100 : 0)}%). Deferred revenue releases in proportion to redemptions against the expected total — {fmt2(progress * 100)}% released so far ({aed2(released)}), so breakage income emerges as the programme runs rather than in one lump at expiry.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 15 · KSA withholding tax (reuses the Zakat calculator's sar2) ── */

const WHT_CATS = [
  { k: "Management fees", r: 20 },
  { k: "Royalties", r: 15 },
  { k: "Other services", r: 15 },
  { k: "Dividends", r: 5 },
  { k: "Interest", r: 5 },
  { k: "Rent", r: 5 },
  { k: "Technical / consulting", r: 5 },
  { k: "Insurance premiums", r: 5 },
  { k: "Intl. telecommunications", r: 5 },
] as const;

const WHT_CATS_AR = [
  "أتعاب الإدارة", "الإتاوات", "خدمات أخرى", "توزيعات الأرباح", "الفوائد",
  "الإيجار", "الخدمات الفنية / الاستشارية", "أقساط التأمين", "الاتصالات الدولية",
] as const;

export function WhtCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [amount, setAmount] = useState("100000");
  const [cat, setCat] = useState(0);
  const [grossUp, setGrossUp] = useState(false);

  const a = Math.max(0, num(amount));
  const r = WHT_CATS[cat].r / 100;
  const wht = grossUp ? (a * r) / (1 - r) : a * r;
  const gross = grossUp ? a + wht : a;
  const net = gross - wht;

  const L = ar
    ? { amt: grossUp ? "الصافي الذي يجب أن يصل للمورد (ريال)" : "المبلغ الإجمالي (ريال)", gu: "العقد صافٍ من الضريبة (احسب الإجمالي التصاعدي)", cat: "فئة الدفعة", wht: `الاستقطاع الواجب (${WHT_CATS[cat].r}%)`, net: "ما يستلمه المورد", cost: "التكلفة الكلية" }
    : { amt: grossUp ? "Net amount the supplier must receive (SAR)" : "Gross payment (SAR)", gu: "Contract is net-of-tax (gross-up the WHT)", cat: "Payment category", wht: `WHT to withhold (${WHT_CATS[cat].r}%)`, net: "Supplier receives", cost: "Total cost" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.amt} value={amount} onChange={setAmount} width={290} />
        <label className="mg-tool-check">
          <input type="checkbox" checked={grossUp} onChange={(e) => setGrossUp(e.target.checked)} />
          <span>{L.gu}</span>
        </label>
      </div>
      <div className="mg-tool-field">
        <span className="mg-tool-label">{L.cat}</span>
        <div className="mg-tool-toggle" style={{ flexWrap: "wrap" }}>
          {WHT_CATS.map((c, i) => (
            <button key={c.k} type="button" className={cat === i ? "on" : ""} onClick={() => setCat(i)}>{ar ? WHT_CATS_AR[i] : c.k} · {c.r}%</button>
          ))}
        </div>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.wht}</div>
          <div className="mg-tool-big">{sar2(wht)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.net}</div>
          <div className="mg-tool-big">{sar2(net)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.cost}</div>
          <div className="mg-tool-big">{sar2(gross)}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? <>يسري الاستقطاع على المدفوعات من السعودية لغير المقيمين عن دخل مصدره المملكة، بالنسب المحلية المبينة؛ ويستحق إقرار الاستقطاع وسداده خلال الأيام العشرة الأولى من الشهر التالي للدفع. وقد تخفّض اتفاقية ضريبية النسبة — عمليًا عبر الاستقطاع ثم الاسترداد. وبنود الصافي من الضريبة تجعل الضريبة تكلفة الدافع، كما هو محسوب هنا.</>
            : <>Withholding applies to payments from KSA to non-residents for KSA-source income, at the domestic rates shown; the WHT return and payment are due within the first ten days of the month following payment. A tax treaty can reduce the rate — in practice via withhold-and-refund. Gross-up clauses make the tax the payer&rsquo;s cost, as computed here.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 16 · UAE Corporate Tax penalties ─────────────────────────────── */

export function CtPenaltyCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [unpaid, setUnpaid] = useState("100000");
  const [months, setMonths] = useState("9");
  const [lateReg, setLateReg] = useState(false);

  const tax = Math.max(0, num(unpaid));
  const m = Math.max(0, Math.ceil(num(months)));
  const filing = 500 * Math.min(m, 12) + 1000 * Math.max(0, m - 12);
  const payment = tax * 0.14 * (m / 12);
  const reg = lateReg ? 10000 : 0;
  const total = filing + payment + reg;

  const L = ar
    ? { unpaid: "الضريبة غير المدفوعة (درهم)", months: "أشهر التأخر (تقديمًا وسدادًا)", reg: "التسجيل نفسه تأخر أيضًا (‏10,000 درهم)", f: "غرامة التقديم", p: "غرامة السداد (14% سنويًا)", t: "إجمالي الغرامات" }
    : { unpaid: "Unpaid Corporate Tax (AED)", months: "Months late (filing & payment)", reg: "Registration was also late (AED 10,000)", f: "Filing penalty", p: "Payment penalty (14% p.a.)", t: "Total penalties" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.unpaid} value={unpaid} onChange={setUnpaid} width={240} />
        <Field label={L.months} value={months} onChange={setMonths} width={230} />
        <label className="mg-tool-check">
          <input type="checkbox" checked={lateReg} onChange={(e) => setLateReg(e.target.checked)} />
          <span>{L.reg}</span>
        </label>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.f}</div>
          <div className="mg-tool-big">{aed2(filing + reg)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.p}</div>
          <div className="mg-tool-big">{aed2(payment)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.t}</div>
          <div className="mg-tool-big">{aed2(total)}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? <>التقديم المتأخر: 500 درهم شهريًا للأشهر الاثني عشر الأولى ثم 1,000 درهم شهريًا بعدها — ويجري حتى بلا ضريبة مستحقة. السداد المتأخر: 14% سنويًا على غير المدفوع تُحتسب شهريًا. التسجيل المتأخر: 10,000 درهم ثابتة. الأرقام استرشادية للتخطيط لا لإعداد المنازعات.</>
            : <>Late filing: AED 500/month for the first twelve months, AED 1,000/month after — and it runs even when no tax is due. Late payment: 14% per annum on the unpaid amount, applied monthly. Late registration: AED 10,000 fixed. Indicative figures for planning, not dispute preparation.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 17 · UAE VAT registration checker ────────────────────────────── */

export function VatRegistrationCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [past, setPast] = useState("300000");
  const [next30, setNext30] = useState("0");

  const p = Math.max(0, num(past));
  const n = Math.max(0, num(next30));
  const test = Math.max(p, n);
  const mandatory = test > 375000;
  const voluntary = !mandatory && test > 187500;

  const L = ar
    ? { past: "التوريدات الخاضعة آخر 12 شهرًا (درهم)", next: "المتوقع خلال الثلاثين يومًا القادمة (درهم)", verdict: "النتيجة", m: "التسجيل إلزامي", v: "التسجيل اختياري متاح", b: "تحت العتبتين", gap: mandatory ? "فوق العتبة بـ" : "المسافة إلى الإلزامي" }
    : { past: "Taxable supplies, last 12 months (AED)", next: "Expected in the next 30 days (AED)", verdict: "Verdict", m: "Registration is mandatory", v: "Voluntary registration available", b: "Below both thresholds", gap: mandatory ? "Over the threshold by" : "Distance to mandatory" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.past} value={past} onChange={setPast} width={280} />
        <Field label={L.next} value={next30} onChange={setNext30} width={280} />
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.verdict}</div>
          <div className="mg-tool-big" style={{ color: mandatory ? "var(--bad)" : voluntary ? "var(--accent)" : "var(--text-muted)" }}>
            {mandatory ? L.m : voluntary ? L.v : L.b}
          </div>
        </div>
        <div>
          <div className="mg-tool-label">{L.gap}</div>
          <div className="mg-tool-big">{aed(Math.abs(375000 - test))}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? <>الإلزامي عند تجاوز 375,000 درهم في الاثني عشر شهرًا الماضية أو توقّع تجاوزها خلال الثلاثين يومًا القادمة؛ والاختياري من 187,500 درهم (توريدات أو مصروفات خاضعة). التسجيل المتأخر يكلّف 10,000 درهم — والعداد يجري على أساس متحرك شهريًا، لا على السنة المالية.</>
            : <>Mandatory once taxable supplies exceed AED 375,000 in the past 12 months, or are expected to in the next 30 days; voluntary from AED 187,500 (supplies or taxable expenses). Late registration costs AED 10,000 — and the test runs on a rolling monthly basis, not your financial year.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 18 · VAT bad-debt relief (Article 64) ────────────────────────── */

export function BadDebtCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [gross, setGross] = useState("52500");
  const [monthsSince, setMonthsSince] = useState("8");
  const [paid, setPaid] = useState(true);
  const [writtenOff, setWrittenOff] = useState(true);
  const [notified, setNotified] = useState(false);

  const g = Math.max(0, num(gross));
  const m = Math.max(0, num(monthsSince));
  const sixMonths = m > 6;
  const eligible = paid && writtenOff && notified && sixMonths;
  const relief = (g * 5) / 105;

  const blockers: string[] = [];
  if (!paid) blockers.push(ar ? "لم تُسدد ضريبة المخرجات للهيئة" : "output VAT not yet paid to the FTA");
  if (!writtenOff) blockers.push(ar ? "لم يُشطب الدين في الحسابات" : "debt not written off in the accounts");
  if (!notified) blockers.push(ar ? "لم يُخطَر العميل بالشطب" : "customer not notified of the write-off");
  if (!sixMonths) blockers.push(ar ? "لم تمضِ ستة أشهر على التوريد" : "six months have not passed since the supply");

  const L = ar
    ? { gross: "الإجمالي المشطوب شامل الضريبة (درهم)", months: "الأشهر منذ تاريخ التوريد", paid: "ضريبة المخرجات حُسبت وسُددت للهيئة", wo: "المقابل شُطب في الحسابات", not: "العميل أُخطر بالمبلغ المشطوب", res: "النتيجة", ok: "الإعفاء متاح", no: "ليس بعد", amt: "تسوية ضريبة المخرجات (5/105)" }
    : { gross: "Gross written-off amount, VAT-inclusive (AED)", months: "Months since the date of supply", paid: "Output VAT was charged and paid to the FTA", wo: "Consideration written off in the accounts", not: "Customer notified of the write-off", res: "Result", ok: "Relief available", no: "Not yet", amt: "Output VAT adjustment (5/105)" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.gross} value={gross} onChange={setGross} width={290} />
        <Field label={L.months} value={monthsSince} onChange={setMonthsSince} width={220} />
      </div>
      <div className="mg-tool-fields">
        <label className="mg-tool-check">
          <input type="checkbox" checked={paid} onChange={(e) => setPaid(e.target.checked)} />
          <span>{L.paid}</span>
        </label>
        <label className="mg-tool-check">
          <input type="checkbox" checked={writtenOff} onChange={(e) => setWrittenOff(e.target.checked)} />
          <span>{L.wo}</span>
        </label>
        <label className="mg-tool-check">
          <input type="checkbox" checked={notified} onChange={(e) => setNotified(e.target.checked)} />
          <span>{L.not}</span>
        </label>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.res}</div>
          <div className="mg-tool-big" style={{ color: eligible ? "var(--accent)" : "var(--bad)" }}>{eligible ? L.ok : L.no}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.amt}</div>
          <div className="mg-tool-big">{eligible ? aed2(relief) : "—"}</div>
        </div>
        <div className="mg-tool-note">
          {eligible
            ? (ar
              ? <>خفّض ضريبة المخرجات بـ {aed2(relief)} في إقرار الفترة التي اكتملت فيها الشروط. تذكّر المرآة: على عميلك المسجل تخفيض ضريبة مدخلاته بالمقدار نفسه — وإن حصّلت لاحقًا أعدت احتساب الضريبة على المحصَّل.</>
              : <>Reduce output tax by {aed2(relief)} in the return for the period the conditions were completed. Remember the mirror: your registered customer must reduce their input VAT by the same measure — and if you later recover, the VAT is re-accounted on the recovery.</>)
            : (ar
              ? <>الشروط غير المكتملة: {blockers.join("؛ ")}. الإعفاء يتطلب الأربعة كلها بموجب المادة 64.</>
              : <>Outstanding conditions: {blockers.join("; ")}. Relief requires all four under Article 64.</>)}
        </div>
      </div>
    </div>
  );
}

/* ── 19 · Designated zone VAT decision checker ────────────────────── */

const DZ_TYPES = [
  { k: "Goods — resold or incorporated", ak: "سلع — تُباع أو تُدمج" },
  { k: "Goods — consumed in the zone", ak: "سلع — تُستهلك في المنطقة" },
  { k: "Services", ak: "خدمات" },
] as const;
const DZ_DESTS = [
  { k: "Within the same designated zone", ak: "داخل المنطقة المحددة نفسها" },
  { k: "To another designated zone", ak: "إلى منطقة محددة أخرى" },
  { k: "To the UAE mainland", ak: "إلى البر الرئيسي" },
  { k: "Abroad (export)", ak: "إلى الخارج (تصدير)" },
] as const;

export function DesignatedZoneCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [type, setType] = useState(0);
  const [dest, setDest] = useState(0);

  // type 2 = services → always standard 5%. Goods consumed → 5% within zone.
  // Goods for resale/incorporation: within zone / zone-to-zone / abroad →
  // outside scope; to mainland → import VAT on entry.
  let verdict: "out" | "vat" | "import";
  if (type === 2) verdict = "vat";
  else if (dest === 2) verdict = "import";
  else if (type === 1 && dest === 0) verdict = "vat";
  else verdict = "out";

  const V = ar
    ? { out: "خارج نطاق الضريبة", vat: "خاضع 5%", import: "ضريبة استيراد عند الدخول" }
    : { out: "Outside the scope", vat: "Standard-rated 5%", import: "Import VAT on entry" };
  const NOTES = ar
    ? {
        out: "خارج النطاق بشرط بقاء الرقابة الجمركية وعدم إطلاق السلع للتداول في الطريق. احتفظ بدليل الحركة — الخروج من النطاق معيار توثيق.",
        vat: type === 2
          ? "مكان توريد الخدمات في المنطقة المحددة يعامَل كالبر الرئيسي — كل الخدمات بالنسبة العادية أيًا كان الطرفان."
          : "السلع المشتراة لتُستهلك داخل المنطقة (لا لإعادة البيع أو الدمج) تُفرض عليها الضريبة عاديًا.",
        import: "انتقال السلع من المنطقة المحددة إلى البر الرئيسي استيراد: تستحق ضريبة الاستيراد عبر رقم التسجيل الضريبي للمستورد أو عند الجمارك.",
      }
    : {
        out: "Outside the scope provided customs controls hold and the goods aren't released into circulation in transit. Keep the movement evidence — outside-scope is a documentation standard.",
        vat: type === 2
          ? "Place of supply of services in a designated zone is treated as the mainland — all services at the standard rate, whoever the parties are."
          : "Goods bought to be used or consumed inside the zone (not resold or incorporated) are taxed normally.",
        import: "Goods moving from a designated zone to the mainland are an import: import VAT is due via the importer's TRN or at customs.",
      };
  const L = ar
    ? { type: "ما الذي يورَّد؟", dest: "إلى أين؟", res: "المعاملة" }
    : { type: "What is being supplied?", dest: "Where is it going?", res: "Treatment" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-field">
        <span className="mg-tool-label">{L.type}</span>
        <div className="mg-tool-toggle" style={{ flexWrap: "wrap" }}>
          {DZ_TYPES.map((t, i) => (
            <button key={t.k} type="button" className={type === i ? "on" : ""} onClick={() => setType(i)}>{ar ? t.ak : t.k}</button>
          ))}
        </div>
      </div>
      <div className="mg-tool-field">
        <span className="mg-tool-label">{L.dest}</span>
        <div className="mg-tool-toggle" style={{ flexWrap: "wrap" }}>
          {DZ_DESTS.map((d, i) => (
            <button key={d.k} type="button" className={dest === i ? "on" : ""} onClick={() => setDest(i)} disabled={type === 2 && i !== 0}>{ar ? d.ak : d.k}</button>
          ))}
        </div>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.res}</div>
          <div className="mg-tool-big" style={{ color: verdict === "out" ? "var(--accent)" : verdict === "vat" ? "var(--text)" : "var(--warn, #9A6A10)" }}>{V[verdict]}</div>
        </div>
        <div className="mg-tool-note">{NOTES[verdict]}</div>
      </div>
    </div>
  );
}

/* ── 20 · E-commerce VAT checker ──────────────────────────────────── */

export function EcomVatCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [amount, setAmount] = useState("1000");
  const [stream, setStream] = useState(0); // 0 goods, 1 electronic services
  const [abroad, setAbroad] = useState(false);
  const [evidence, setEvidence] = useState(false);

  const a = Math.max(0, num(amount));
  // Domestic → 5%. Goods abroad with export evidence → 0%; without → hold at 5%.
  // E-services used abroad with evidence → 0%/out of scope; without → 5%.
  const zero = abroad && evidence;
  const vat = zero ? 0 : a * 0.05;

  const L = ar
    ? { amt: "قيمة الطلب (درهم)", stream: "نوع الإيراد", goods: "سلع تُشحن", es: "خدمات إلكترونية", abroad: stream === 0 ? "العميل خارج الإمارات (تصدير)" : "الخدمة تُستخدم خارج الإمارات", ev: stream === 0 ? "دليل الخروج الجمركي محفوظ" : "دليل مكان الاستخدام محفوظ", rate: "النسبة", out: "الضريبة", tot: "الإجمالي" }
    : { amt: "Order amount (AED)", stream: "Revenue stream", goods: "Goods shipped", es: "Electronic services", abroad: stream === 0 ? "Customer outside the UAE (export)" : "Service used outside the UAE", ev: stream === 0 ? "Customs exit evidence retained" : "Use-and-enjoyment evidence retained", rate: "Rate", out: "VAT", tot: "Total" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.amt} value={amount} onChange={setAmount} width={200} />
        <div className="mg-tool-field" style={{ maxWidth: 320 }}>
          <span className="mg-tool-label">{L.stream}</span>
          <div className="mg-tool-toggle">
            <button type="button" className={stream === 0 ? "on" : ""} onClick={() => setStream(0)}>{L.goods}</button>
            <button type="button" className={stream === 1 ? "on" : ""} onClick={() => setStream(1)}>{L.es}</button>
          </div>
        </div>
      </div>
      <div className="mg-tool-fields">
        <label className="mg-tool-check">
          <input type="checkbox" checked={abroad} onChange={(e) => setAbroad(e.target.checked)} />
          <span>{L.abroad}</span>
        </label>
        {abroad && (
          <label className="mg-tool-check">
            <input type="checkbox" checked={evidence} onChange={(e) => setEvidence(e.target.checked)} />
            <span>{L.ev}</span>
          </label>
        )}
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.rate}</div>
          <div className="mg-tool-big" style={{ color: zero ? "var(--accent)" : "var(--text)" }}>{zero ? "0%" : "5%"}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.out}</div>
          <div className="mg-tool-big">{aed2(vat)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.tot}</div>
          <div className="mg-tool-big">{aed2(a + vat)}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? (abroad && !evidence
              ? <b>وجهة خارجية بلا دليل محفوظ: عامل التوريد 5% حتى يكتمل الملف — النسبة الصفرية تُكتسب بالتوثيق، والهيئة تعيد التسعير حيث يغيب.</b>
              : zero
                ? "نسبة صفرية: استرداد كامل لضريبة المدخلات، مع الاحتفاظ بالدليل لكل طلب مربوطًا برقمه."
                : "توريد محلي: 5% على السعر وفاتورة ضريبية (المبسطة تكفي المستهلكين عادة). وتذكّر عتبة التسجيل 375,000 درهم على إيراد متحرك.")
            : (abroad && !evidence
              ? <b>Foreign destination without retained evidence: treat the supply as 5% until the file is complete — zero-rating is earned by documentation, and the FTA re-rates where it is missing.</b>
              : zero
                ? "Zero-rated: full input-tax recovery, with the evidence kept per order, linked to the order number."
                : "Domestic supply: 5% on the price with a tax invoice (simplified usually suffices for consumers). Remember the AED 375,000 registration threshold runs on rolling revenue.")}
        </div>
      </div>
    </div>
  );
}

/* ── 21 · UAE employee cost calculator ────────────────────────────── */

export function EmployeeCostCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [gross, setGross] = useState("15000");
  const [basicPct, setBasicPct] = useState("60");
  const [national, setNational] = useState(false);
  const [pensionPct, setPensionPct] = useState("12.5");

  const g = Math.max(0, num(gross));
  const bp = Math.min(100, Math.max(0, num(basicPct))) / 100;
  const basic = g * bp;
  // EOSB accrues on basic at 21 days/year for expat staff; nationals get
  // pension contributions instead.
  const eosb = national ? 0 : (basic * 21) / 365;
  const pension = national ? (g * Math.max(0, num(pensionPct))) / 100 : 0;
  const monthly = g + eosb + pension;

  const L = ar
    ? { g: "الراتب الإجمالي الشهري (درهم)", b: "نسبة الأساسي من الإجمالي", nat: "الموظف مواطن (معاش بدل مكافأة نهاية الخدمة)", pp: "مساهمة صاحب العمل في المعاش", eosb: "مخصص نهاية الخدمة الشهري", pen: "مساهمة المعاش الشهرية", tot: "التكلفة الشهرية لصاحب العمل", yr: "سنويًا" }
    : { g: "Gross monthly salary (AED)", b: "Basic as % of gross", nat: "UAE/GCC national (pension instead of EOSB)", pp: "Employer pension contribution", eosb: "Monthly EOSB provision", pen: "Monthly pension contribution", tot: "Monthly employer cost", yr: "Annually" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.g} value={gross} onChange={setGross} width={220} />
        <Field label={L.b} value={basicPct} onChange={setBasicPct} suffix="%" width={190} />
        <label className="mg-tool-check">
          <input type="checkbox" checked={national} onChange={(e) => setNational(e.target.checked)} />
          <span>{L.nat}</span>
        </label>
        {national && <Field label={L.pp} value={pensionPct} onChange={setPensionPct} suffix="%" width={200} />}
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{national ? L.pen : L.eosb}</div>
          <div className="mg-tool-big">{aed2(national ? pension : eosb)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.tot}</div>
          <div className="mg-tool-big">{aed2(monthly)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.yr}</div>
          <div className="mg-tool-big">{aed(monthly * 12)}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? <>مخصص نهاية الخدمة يُحتسب شهريًا على الأساسي (21 يومًا سنويًا لأول خمس سنوات؛ يرتفع إلى 30 بعدها فترتفع التكلفة الحقيقية مع الأقدمية). للمواطنين تُطبق مساهمات المعاش وفق نظام الهيئة المختصة ونسبتها تختلف بحسب تاريخ الالتحاق — عدّل الحقل لموقفك. أضف تكاليفك الثابتة (التأشيرة والتأمين الطبي وبدل الإجازة) فوق هذا الرقم.</>
            : <>The EOSB provision accrues monthly on basic wage (21 days/year for the first five years; 30 after, so true cost rises with tenure). For nationals, pension contributions apply per the relevant authority and the rate differs by joining date — adjust the field to your case. Add your fixed costs (visa, medical insurance, leave allowance) on top of this figure.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 22 · Participation exemption checker ─────────────────────────── */

export function ParticipationCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [gain, setGain] = useState("1000000");
  const [ownPct, setOwnPct] = useState("10");
  const [cost, setCost] = useState("0");
  const [months, setMonths] = useState("18");
  const [taxed9, setTaxed9] = useState(true);
  const [uaeDividend, setUaeDividend] = useState(false);

  const g = Math.max(0, num(gain));
  const ownership = num(ownPct) >= 5 || num(cost) >= 4000000;
  const held = num(months) >= 12;
  const exempt = uaeDividend || (ownership && held && taxed9);
  const taxIfNot = Math.max(0, g - 375000) * 0.09;

  const blockers: string[] = [];
  if (!uaeDividend) {
    if (!ownership) blockers.push(ar ? "الملكية دون 5% وتكلفة الاقتناء دون 4 ملايين درهم" : "ownership below 5% and acquisition cost below AED 4m");
    if (!held) blockers.push(ar ? "مدة الاحتفاظ دون 12 شهرًا" : "holding period under 12 months");
    if (!taxed9) blockers.push(ar ? "المساهمة غير خاضعة لـ 9% على الأقل في بلدها" : "participation not subject to at least 9% tax in its jurisdiction");
  }

  const L = ar
    ? { gain: "التوزيع أو الربح الرأسمالي (درهم)", own: "نسبة الملكية", cost: "أو تكلفة الاقتناء (درهم)", months: "أشهر الاحتفاظ (فعلية أو منوية)", taxed: "المساهمة خاضعة لـ 9% على الأقل في بلدها (أو تستوفي الاختبار المكافئ)", uae: "توزيع من شركة مقيمة في الإمارات (معفى دون شروط)", res: "الموقف", ok: "معفى", no: "خاضع", tax: "الضريبة إن لم يُعفَ" }
    : { gain: "Dividend or capital gain (AED)", own: "Ownership", cost: "or acquisition cost (AED)", months: "Months held (actual or intended)", taxed: "Participation taxed at ≥9% in its jurisdiction (or meets the equivalent test)", uae: "Dividend from a UAE-resident company (exempt without conditions)", res: "Position", ok: "Exempt", no: "Taxable", tax: "Tax if not exempt" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.gain} value={gain} onChange={setGain} width={230} />
        <Field label={L.own} value={ownPct} onChange={setOwnPct} suffix="%" width={140} />
        <Field label={L.cost} value={cost} onChange={setCost} width={210} />
        <Field label={L.months} value={months} onChange={setMonths} width={230} />
      </div>
      <div className="mg-tool-fields">
        <label className="mg-tool-check">
          <input type="checkbox" checked={uaeDividend} onChange={(e) => setUaeDividend(e.target.checked)} />
          <span>{L.uae}</span>
        </label>
        {!uaeDividend && (
          <label className="mg-tool-check">
            <input type="checkbox" checked={taxed9} onChange={(e) => setTaxed9(e.target.checked)} />
            <span>{L.taxed}</span>
          </label>
        )}
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.res}</div>
          <div className="mg-tool-big" style={{ color: exempt ? "var(--accent)" : "var(--bad)" }}>{exempt ? L.ok : L.no}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.tax}</div>
          <div className="mg-tool-big">{exempt ? "—" : aed(taxIfNot)}</div>
        </div>
        <div className="mg-tool-note">
          {exempt
            ? (ar
              ? "المساهمة مؤهلة — التوزيع أو الربح خارج وعاء ضريبة الشركات. تذكّر المقابل: تكاليف اقتناء المساهمات المعفاة والتخارج منها غير قابلة للخصم، والأدلة (نسبة الملكية، التاريخ، إثبات الخضوع للضريبة) يجب أن تكون في الملف قبل الإقرار."
              : "The participation qualifies — the dividend or gain sits outside the Corporate Tax base. Remember the mirror: costs of acquiring or disposing of exempt participations are non-deductible, and the evidence (ownership %, dates, subject-to-tax proof) needs to be on file before the return.")
            : (ar
              ? <>غير معفى: {blockers.join("؛ ")}. المبلغ يدخل الدخل الخاضع على الشرائح العادية (الضريبة المبينة تفترض عدم وجود دخل خاضع آخر).</>
              : <>Not exempt: {blockers.join("; ")}. The amount enters taxable income at the standard bands (the tax shown assumes no other taxable income).</>)}
        </div>
      </div>
    </div>
  );
}

/* ── 23 · Reverse charge VAT calculator ───────────────────────────── */

export function ReverseChargeCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [amount, setAmount] = useState("50000");
  const [recovery, setRecovery] = useState("100");

  const a = Math.max(0, num(amount));
  const rec = Math.min(100, Math.max(0, num(recovery))) / 100;
  const output = a * 0.05;
  const input = output * rec;
  const net = output - input;

  const L = ar
    ? { amt: "قيمة الخدمة أو السلعة المستوردة (درهم)", rec: "نسبة استرداد المدخلات لديك", out: "ضريبة المخرجات المستحقة", inp: "المدخلات المستردة", net: "الأثر النقدي الصافي" }
    : { amt: "Imported service or goods value (AED)", rec: "Your input-recovery entitlement", out: "Output VAT to account", inp: "Input VAT recovered", net: "Net cash effect" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.amt} value={amount} onChange={setAmount} width={270} />
        <Field label={L.rec} value={recovery} onChange={setRecovery} suffix="%" width={230} />
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.out}</div>
          <div className="mg-tool-big">{aed2(output)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.inp}</div>
          <div className="mg-tool-big">{aed2(input)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.net}</div>
          <div className="mg-tool-big" style={{ color: net > 0 ? "var(--bad)" : "var(--accent)" }}>{aed2(net)}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? (net > 0
              ? <>باسترداد جزئي يصبح الاحتساب العكسي كلفة حقيقية: {aed2(net)} تُدفع مع الإقرار. القيدان يظهران في الإقرار نفسه — خانة المخرجات وخانة المدخلات، كلتاهما إلزامية.</>
              : "استرداد كامل: لا نقد يتحرك، لكن القيدين إلزاميان في الإقرار — خانة مخرجات فارغة مع مصروفات موردين أجانب في دفترك تناقضٌ تراه الهيئة.")
            : (net > 0
              ? <>With partial recovery the reverse charge becomes a real cost: {aed2(net)} payable with the return. Both entries appear in the same return — the output box and the input box, both mandatory.</>
              : "Full recovery: no cash moves, but both entries are mandatory in the return — an empty reverse-charge box alongside foreign-supplier costs in your ledger is a contradiction the FTA can see.")}
        </div>
      </div>
    </div>
  );
}

/* ── 24 · UAE audit requirement checker ───────────────────────────── */

export function AuditCheckCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [revenue, setRevenue] = useState("20000000");
  const [qfzp, setQfzp] = useState(false);
  const [freezone, setFreezone] = useState(false);
  const [mainlandLLC, setMainlandLLC] = useState(true);

  const r = Math.max(0, num(revenue));
  const ctAudit = r > 50000000 || qfzp;
  const otherAudit = freezone || mainlandLLC;
  const required = ctAudit || otherAudit;

  const reasons: string[] = [];
  if (r > 50000000) reasons.push(ar ? "الإيرادات تتجاوز 50 مليون درهم (قانون ضريبة الشركات)" : "revenue exceeds AED 50m (Corporate Tax law)");
  if (qfzp) reasons.push(ar ? "شخص مؤهل في منطقة حرة — التدقيق شرط لنظام الـ 0%" : "Qualifying Free Zone Person — the audit is a condition of the 0% regime");
  if (freezone && !qfzp) reasons.push(ar ? "معظم المناطق الحرة تطلب قوائم مدققة لتجديد الرخصة" : "most free zones require audited statements for licence renewal");
  if (mainlandLLC) reasons.push(ar ? "قانون الشركات التجارية يلزم شركات البر الرئيسي بمدقق معين" : "the Commercial Companies Law requires mainland companies to appoint an auditor");

  const L = ar
    ? { rev: "إيرادات الفترة (درهم)", qfzp: "شخص مؤهل في منطقة حرة (نظام 0%)", fz: "كيان منطقة حرة (غير مؤهل أو لم يختر)", ml: "شركة بر رئيسي (ذ.م.م وشبهها)", res: "قوائم مدققة؟", yes: "مطلوبة", no: "غير ملزمة ضريبيًا" }
    : { rev: "Revenue for the period (AED)", qfzp: "Qualifying Free Zone Person (0% regime)", fz: "Free-zone entity (not QFZP / not electing)", ml: "Mainland company (LLC and similar)", res: "Audited statements?", yes: "Required", no: "Not CT-mandated" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.rev} value={revenue} onChange={setRevenue} width={240} />
      </div>
      <div className="mg-tool-fields">
        <label className="mg-tool-check">
          <input type="checkbox" checked={qfzp} onChange={(e) => { setQfzp(e.target.checked); if (e.target.checked) { setFreezone(true); setMainlandLLC(false); } }} />
          <span>{L.qfzp}</span>
        </label>
        <label className="mg-tool-check">
          <input type="checkbox" checked={freezone} onChange={(e) => setFreezone(e.target.checked)} />
          <span>{L.fz}</span>
        </label>
        <label className="mg-tool-check">
          <input type="checkbox" checked={mainlandLLC} onChange={(e) => setMainlandLLC(e.target.checked)} />
          <span>{L.ml}</span>
        </label>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.res}</div>
          <div className="mg-tool-big" style={{ color: required ? "var(--bad)" : "var(--accent)" }}>{required ? L.yes : L.no}</div>
        </div>
        <div className="mg-tool-note">
          {required
            ? (ar ? <>الأسباب: {reasons.join("؛ ")}.</> : <>Because: {reasons.join("; ")}.</>)
            : (ar
              ? "لا إلزام تدقيق من قانون ضريبة الشركات على هذه المعطيات — لكن راجع شروط جهة ترخيصك وعقود بنوكك ومستثمريك؛ فالتدقيق يُفرض من ثلاث جهات لا واحدة."
              : "No CT-law audit mandate on these inputs — but check your licensing authority's conditions and your bank/investor covenants; audits are imposed by three regimes, not one.")}
        </div>
      </div>
    </div>
  );
}

/* ── 25 · Tax loss carry-forward (75% cap) ────────────────────────── */

export function LossCarryCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [income, setIncome] = useState("1000000");
  const [losses, setLosses] = useState("800000");

  const inc = Math.max(0, num(income));
  const bf = Math.max(0, num(losses));
  const cap = inc * 0.75;
  const used = Math.min(bf, cap);
  const after = inc - used;
  const tax = Math.max(0, after - 375000) * 0.09;
  const carried = bf - used;

  const L = ar
    ? { inc: "الدخل الخاضع للفترة (درهم)", bf: "الخسائر المرحّلة المتاحة (درهم)", used: "الخسائر المستخدمة (سقف 75%)", taxable: "الدخل الخاضع بعد التقاص", tax: "الضريبة المستحقة", cf: "الخسائر المستمرة بالترحيل" }
    : { inc: "Taxable income for the period (AED)", bf: "Brought-forward losses available (AED)", used: "Losses used (75% cap)", taxable: "Taxable income after offset", tax: "Tax payable", cf: "Losses carried onward" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.inc} value={income} onChange={setIncome} width={250} />
        <Field label={L.bf} value={losses} onChange={setLosses} width={260} />
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.used}</div>
          <div className="mg-tool-big">{aed(used)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.taxable}</div>
          <div className="mg-tool-big">{aed(after)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.tax}</div>
          <div className="mg-tool-big">{aed2(tax)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.cf}</div>
          <div className="mg-tool-big">{aed(carried)}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? <>التقاص مسقوف عند 75% من دخل الفترة ({aed(cap)})؛ والضريبة تُحسب على المتبقي بالشرائح العادية (0% حتى 375,000 درهم ثم 9%). تذكّر اختبارات البقاء: تغيّر ملكية يجاوز 50% يحتاج استمرار النشاط نفسه أو شبيهه، وخسائر فترات تخفيف الأعمال الصغيرة لا تُرحَّل أصلًا.</>
            : <>The offset is capped at 75% of the period's income ({aed(cap)}); tax runs on the remainder at the standard bands (0% to AED 375,000, then 9%). Remember the survival tests: an ownership change over 50% needs the same-or-similar business to continue, and losses from Small Business Relief periods never carry at all.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 26 · Partial exemption recovery ratio ────────────────────────── */

export function PartialExemptionCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [taxIn, setTaxIn] = useState("40000");
  const [exIn, setExIn] = useState("10000");
  const [resid, setResid] = useState("25000");
  // Cabinet Decision 149 of 2026: turnover-based ratio from the first tax
  // year commencing after 1 October 2027 (Article 55(6)).
  const [method, setMethod] = useState<"input" | "turnover">("input");
  const [recSup, setRecSup] = useState("900000");
  const [exSup, setExSup] = useState("200000");

  const t = Math.max(0, num(taxIn));
  const e = Math.max(0, num(exIn));
  const r = Math.max(0, num(resid));
  const rs = Math.max(0, num(recSup));
  const es = Math.max(0, num(exSup));
  const inputRatio = t + e > 0 ? Math.round((t / (t + e)) * 100) : 100;
  const turnoverRatio = rs + es > 0 ? Math.round((rs / (rs + es)) * 100) : 100;
  const ratio = method === "input" ? inputRatio : turnoverRatio;
  const residRec = (r * ratio) / 100;
  const total = t + residRec;
  const lost = e + (r - residRec);
  const other = t + (r * (method === "input" ? turnoverRatio : inputRatio)) / 100;
  const delta = method === "turnover" ? total - other : other - total; // 2028 minus today

  const L = ar
    ? { t: "مدخلات منسوبة للتوريدات الخاضعة (درهم)", e: "مدخلات منسوبة للتوريدات المعفاة (درهم)", r: "المدخلات المتبقية — المصاريف العامة (درهم)", ratio: "نسبة الاسترداد", rec: "إجمالي المسترد", lost: "الضريبة الضائعة", method: "طريقة التوزيع", mIn: "الحالية: نسبة المدخلات", mTo: "من 2028: نسبة التوريدات", rs: "قيمة التوريدات التي تمنح حق الاسترداد (درهم)", es: "قيمة التوريدات المعفاة (درهم)", delta: "أثر طريقة 2028 على المسترد" }
    : { t: "Input VAT attributed to taxable supplies (AED)", e: "Input VAT attributed to exempt supplies (AED)", r: "Residual input VAT — overheads (AED)", ratio: "Recovery ratio", rec: "Total recoverable", lost: "VAT lost", method: "Apportionment method", mIn: "Today: input tax ratio", mTo: "From 2028: turnover ratio", rs: "Value of supplies that carry recovery (AED)", es: "Value of exempt supplies (AED)", delta: "2028 method vs today" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-field">
        <span className="mg-tool-label">{L.method}</span>
        <div className="mg-tool-toggle" style={{ flexWrap: "wrap" }}>
          <button type="button" className={method === "input" ? "on" : ""} onClick={() => setMethod("input")}>{L.mIn}</button>
          <button type="button" className={method === "turnover" ? "on" : ""} onClick={() => setMethod("turnover")}>{L.mTo}</button>
        </div>
      </div>
      <div className="mg-tool-fields">
        <Field label={L.t} value={taxIn} onChange={setTaxIn} width={290} />
        <Field label={L.e} value={exIn} onChange={setExIn} width={290} />
        <Field label={L.r} value={resid} onChange={setResid} width={290} />
      </div>
      {method === "turnover" && (
        <div className="mg-tool-fields">
          <Field label={L.rs} value={recSup} onChange={setRecSup} width={290} />
          <Field label={L.es} value={exSup} onChange={setExSup} width={290} />
        </div>
      )}
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.ratio}</div>
          <div className="mg-tool-big">{ratio}%</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.rec}</div>
          <div className="mg-tool-big">{aed2(total)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.lost}</div>
          <div className="mg-tool-big" style={{ color: lost > 0 ? "var(--bad)" : "var(--accent)" }}>{aed2(lost)}</div>
        </div>
        {method === "turnover" && (
          <div>
            <div className="mg-tool-label">{L.delta}</div>
            <div className="mg-tool-big" style={{ color: delta < 0 ? "var(--bad)" : "var(--accent)" }}>{delta >= 0 ? "+" : "−"}{aed2(Math.abs(delta))}</div>
          </div>
        )}
        <div className="mg-tool-note">
          {method === "input"
            ? (ar
              ? <>الطريقة القياسية: المدخلات المنسوبة للخاضع تُسترد كاملة، والمنسوبة للمعفى تضيع، والمتبقي يُسترد بنسبة المنسوب المسترد إلى إجمالي المنسوب ({ratio}% هنا، مقربة). ولا تنسَ التسوية السنوية — احسب السنة كلًا واحدًا وسوِّ الفرق في الفترة المقررة.</>
              : <>The standard method: attributed-to-taxable recovers in full, attributed-to-exempt is lost, and the residual recovers at the ratio of recoverable attributed input tax to total attributed input tax ({ratio}% here, rounded). Don't skip the annual wash-up — recompute the year as a whole and adjust the difference in the prescribed period.</>)
            : (ar
              ? <>بموجب قرار مجلس الوزراء رقم 149 لسنة 2026، يُوزَّع المتبقي ابتداءً من أول سنة ضريبية تبدأ بعد 1 أكتوبر 2027 بنسبة قيمة التوريدات التي تمنح حق الاسترداد إلى قيمة جميع التوريدات ({turnoverRatio}% هنا، مقابل {inputRatio}% بالطريقة الحالية). استبعد من الحساب بيع أصولك الرأسمالية وتوريدات الاحتساب العكسي المستلمة. وتبقى الجهات الحكومية والخيرية على نسبة المدخلات، وتستمر التسوية السنوية.</>
              : <>Under Cabinet Decision 149 of 2026, from the first tax year commencing after 1 October 2027 the residual pot recovers at the value of supplies that carry recovery over the value of all supplies ({turnoverRatio}% here, against {inputRatio}% on today&apos;s method). Leave disposals of your own capital assets and reverse-charge receipts of concerned goods and services out of both figures. Government entities and charities keep the input tax ratio, and the annual adjustment continues.</>)}
        </div>
      </div>
    </div>
  );
}

/* ── 27 · Real estate VAT checker ─────────────────────────────────── */

const RE_TYPES = [
  { k: "New residential — first supply within 3 years", ak: "سكني جديد — توريد أول خلال 3 سنوات", v: "zero" },
  { k: "Residential — subsequent supply or lease", ak: "سكني — توريد لاحق أو إيجار", v: "exempt" },
  { k: "Commercial — sale or lease", ak: "تجاري — بيع أو إيجار", v: "std" },
  { k: "Bare land", ak: "أرض فضاء", v: "exempt2" },
  { k: "Hotel apartments / serviced accommodation", ak: "شقق فندقية / سكن مخدوم", v: "std2" },
] as const;

export function RealEstateVatCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [amount, setAmount] = useState("1000000");
  const [type, setType] = useState(0);

  const a = Math.max(0, num(amount));
  const v = RE_TYPES[type].v;
  const isStd = v === "std" || v === "std2";
  const isZero = v === "zero";
  const vat = isStd ? a * 0.05 : 0;

  const L = ar
    ? { amt: "قيمة البيع أو الإيجار (درهم)", type: "نوع التوريد", treat: "المعاملة", vat: "الضريبة", rec: "استرداد المدخلات", zero: "صفرية 0%", ex: "معفاة", std: "خاضعة 5%", full: "متاح كاملًا", none: "غير متاح" }
    : { amt: "Sale or lease value (AED)", type: "Supply type", treat: "Treatment", vat: "VAT", rec: "Input-VAT recovery", zero: "Zero-rated 0%", ex: "Exempt", std: "Standard 5%", full: "Fully available", none: "Not available" };

  const NOTES = ar
    ? {
        zero: "التوريد الأول للسكني الجديد خلال ثلاث سنوات من الإنجاز صفري — لا ضريبة على المشتري واسترداد كامل لضريبة الإنشاء لدى المطوّر. وثّق تاريخي الإنجاز والتوريد الأول باليوم؛ فوات النافذة يحوّلها إعفاءً ويحبس المدخلات.",
        exempt: "السكني بعد توريده الأول معفى: لا ضريبة على المستأجر أو المشتري، ولا استرداد لمدخلات تُنسب إليه — الصيانة والوساطة والإدارة تحمل 5% ضائعة. ومحفظة مختلطة تجرّك إلى الإعفاء الجزئي.",
        exempt2: "الأرض الفضاء معفاة. لكن أرضًا بأعمال هندسية مدنية أو بناء منقوص الإنجاز قد تُعامل مختلفًا — إنها مسألة وقائع، والعقود الكبيرة تستحق رأيًا مكتوبًا.",
        std: "خاضع 5% على كامل المقابل. للمشتري المسجل تُسترد الضريبة عادة؛ وانتبه لآلية الدفع الخاصة في بيوع العقار التجاري — الضريبة للهيئة مباشرة قبل النقل.",
        std2: "السكن المخدوم والشقق الفندقية ضيافة لا سكن: خاضعة 5% مع استرداد المدخلات — والجوهر لا اللافتة هو الحاسم.",
      }
    : {
        zero: "First supply of new residential within three years of completion is zero-rated — no VAT for the buyer and full recovery of construction VAT for the developer. Document completion and first-supply dates to the day; missing the window turns this exempt and strands the input VAT.",
        exempt: "Residential after its first supply is exempt: no VAT charged, and no recovery of input VAT attributed to it — maintenance, agency and management costs carry a lost 5%. A mixed portfolio drags you into partial exemption.",
        exempt2: "Bare land is exempt. Land with civil-engineering works or partially completed buildings can be treated differently — it is a facts question, and large deals deserve a written position.",
        std: "Standard-rated at 5% on the full consideration. A registered buyer usually recovers it; note the special payment mechanics on commercial property sales — VAT goes to the FTA directly before transfer.",
        std2: "Serviced accommodation and hotel apartments are hospitality, not housing: standard-rated 5% with input recovery — substance, not signage, decides.",
      };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.amt} value={amount} onChange={setAmount} width={240} />
      </div>
      <div className="mg-tool-field">
        <span className="mg-tool-label">{L.type}</span>
        <div className="mg-tool-toggle" style={{ flexWrap: "wrap" }}>
          {RE_TYPES.map((t, i) => (
            <button key={t.k} type="button" className={type === i ? "on" : ""} onClick={() => setType(i)}>{ar ? t.ak : t.k}</button>
          ))}
        </div>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.treat}</div>
          <div className="mg-tool-big" style={{ color: isZero ? "var(--accent)" : isStd ? "var(--text)" : "var(--bad)" }}>{isZero ? L.zero : isStd ? L.std : L.ex}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.vat}</div>
          <div className="mg-tool-big">{aed2(vat)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.rec}</div>
          <div className="mg-tool-big">{isZero || isStd ? L.full : L.none}</div>
        </div>
        <div className="mg-tool-note">{NOTES[v]}</div>
      </div>
    </div>
  );
}

/* ── 28 · VAT voluntary disclosure penalty ladder ─────────────────── */

export function VdPenaltyCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [diff, setDiff] = useState("100000");
  const [years, setYears] = useState("1");
  const [repeat, setRepeat] = useState(false);

  const d = Math.max(0, num(diff));
  const y = Math.max(0, num(years));
  const pct = y <= 1 ? 5 : y <= 2 ? 10 : y <= 3 ? 20 : y <= 4 ? 30 : 40;
  const fixed = repeat ? 2000 : 1000;
  const pctAmt = (d * pct) / 100;
  const total = fixed + pctAmt;
  const nextPct = y <= 1 ? 10 : y <= 2 ? 20 : y <= 3 ? 30 : y <= 4 ? 40 : 40;
  const waitCost = (d * (nextPct - pct)) / 100;

  const L = ar
    ? { diff: "فرق الضريبة في الإفصاح (درهم)", years: "السنوات منذ استحقاق الإقرار الأصلي", repeat: "إفصاح متكرر (الغرامة الثابتة 2,000)", pct: `الغرامة النسبية (${pct}%)`, fixed: "الغرامة الثابتة", total: "إجمالي كلفة الإفصاح", wait: "كلفة انتظار سنة أخرى" }
    : { diff: "Tax difference being disclosed (AED)", years: "Years since the original return was due", repeat: "Repeat disclosure (AED 2,000 fixed)", pct: `Percentage penalty (${pct}%)`, fixed: "Fixed penalty", total: "Total disclosure cost", wait: "Cost of waiting another year" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.diff} value={diff} onChange={setDiff} width={270} />
        <Field label={L.years} value={years} onChange={setYears} width={280} />
        <label className="mg-tool-check">
          <input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} />
          <span>{L.repeat}</span>
        </label>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.pct}</div>
          <div className="mg-tool-big">{aed2(pctAmt)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.fixed}</div>
          <div className="mg-tool-big">{aed2(fixed)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.total}</div>
          <div className="mg-tool-big">{aed2(total)}</div>
        </div>
        {waitCost > 0 && (
          <div>
            <div className="mg-tool-label">{L.wait}</div>
            <div className="mg-tool-big" style={{ color: "var(--bad)" }}>+{aed2(waitCost)}</div>
          </div>
        )}
        <div className="mg-tool-note">
          {ar
            ? <>السلّم: 5% خلال السنة الأولى من الاستحقاق، ثم 10% و20% و30% و40% بعد السنة الرابعة — زائد الثابتة 1,000/2,000 درهم. وكل هذا يفترض الإفصاح قبل إشعار التدقيق؛ بعده يسقط السلّم المخفَّض ويقفز التعرض. الأخطاء البالغة 10,000 درهم فأقل تُصحح في الإقرار التالي بلا نموذج 211.</>
            : <>The ladder: 5% within the first year of the due date, then 10%, 20%, 30%, and 40% beyond year four — plus the AED 1,000/2,000 fixed penalty. All of this assumes disclosure before an audit notice; after one, the reduced ladder is gone and exposure jumps. Errors of AED 10,000 or less are corrected in the next return, no Form 211 needed.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 29 · Interest deduction cap (30% EBITDA) ─────────────────────── */

export function InterestCapCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [netInt, setNetInt] = useState("20000000");
  const [ebitda, setEbitda] = useState("50000000");

  const ni = Math.max(0, num(netInt));
  const eb = Math.max(0, num(ebitda));
  const prong30 = eb * 0.3;
  const cap = Math.max(prong30, 12000000);
  const deductible = Math.min(ni, cap);
  const carried = ni - deductible;
  const safeHarbour = cap === 12000000 && ni > 0;

  const L = ar
    ? { ni: "صافي مصروف الفائدة (درهم)", eb: "الأرباح المعدلة قبل الفائدة والضريبة والاستهلاك (درهم)", cap: "السقف الملزِم", ded: "الفائدة القابلة للخصم", cf: "الممنوع — يُرحَّل 10 فترات", which: safeHarbour ? "ملاذ الـ 12 مليون الآمن" : "شق الـ 30% من الأرباح" }
    : { ni: "Net interest expense (AED)", eb: "Adjusted EBITDA (AED)", cap: "Binding cap", ded: "Interest deductible", cf: "Disallowed — carries 10 periods", which: safeHarbour ? "AED 12m safe harbour" : "30% of EBITDA prong" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.ni} value={netInt} onChange={setNetInt} width={250} />
        <Field label={L.eb} value={ebitda} onChange={setEbitda} width={300} />
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.cap} — {L.which}</div>
          <div className="mg-tool-big">{aed(cap)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.ded}</div>
          <div className="mg-tool-big" style={{ color: "var(--accent)" }}>{aed(deductible)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.cf}</div>
          <div className="mg-tool-big" style={{ color: carried > 0 ? "var(--bad)" : "var(--text)" }}>{aed(carried)}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? <>السقف هو الأعلى من 30% من الأرباح المعدلة ({aed(prong30)}) أو 12,000,000 درهم. والممنوع يُرحَّل حتى عشر فترات ضمن سقوف تلك السنوات. خارج الحساب: قروض ما قبل 9 ديسمبر 2022 (استثناء تاريخي)، والبنوك والتأمين مستثنون — وقواعد قروض الأشخاص المتصلين تسبق هذا السقف.</>
            : <>The cap is the greater of 30% of adjusted EBITDA ({aed(prong30)}) or AED 12,000,000. Disallowed interest carries up to ten periods, inside those years' own caps. Outside this computation: loans agreed before 9 December 2022 (grandfathered), banks and insurers are excluded — and the connected-person loan rules run before this cap does.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 30 · KSA Real Estate Transaction Tax (RETT) ──────────────────── */

export function RettCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [price, setPrice] = useState("1300000");
  const [fmv, setFmv] = useState("");
  const [firstHome, setFirstHome] = useState(false);
  const [days, setDays] = useState("0");

  const agreed = Math.max(0, num(price));
  const market = Math.max(0, num(fmv));
  const base = Math.max(agreed, market);
  const fullTax = base * 0.05;
  const stateBears = firstHome ? Math.min(base, 1_000_000) * 0.05 : 0;
  const payable = fullTax - stateBears;
  const d = Math.max(0, Math.floor(num(days)));
  const months = Math.ceil(d / 30);
  const finePct = Math.min(50, 2 * months);
  const fine = (payable * finePct) / 100;

  const L = ar
    ? { price: "السعر المتفق عليه (ريال)", fmv: "القيمة السوقية العادلة إن كانت أعلى (ريال)", days: "أيام التأخر في السداد", first: "المشتري يحمل شهادة المسكن الأول (مواطن سعودي، مسكن أول)", base: "وعاء الضريبة", pay: "الضريبة المستحقة (5%)", state: "تتحملها الدولة", fine: `غرامة التأخر (${finePct}%)` }
    : { price: "Agreed price (SAR)", fmv: "Fair market value, if higher (SAR)", days: "Days paid late", first: "Buyer holds a First Home certificate (Saudi citizen, first home)", base: "Tax base", pay: "RETT payable (5%)", state: "Borne by the state", fine: `Late-payment fine (${finePct}%)` };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.price} value={price} onChange={setPrice} width={220} />
        <Field label={L.fmv} value={fmv} onChange={setFmv} width={260} />
        <Field label={L.days} value={days} onChange={setDays} width={160} />
      </div>
      <div className="mg-tool-fields">
        <label className="mg-tool-check">
          <input type="checkbox" checked={firstHome} onChange={(e) => setFirstHome(e.target.checked)} />
          <span>{L.first}</span>
        </label>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.base}</div>
          <div className="mg-tool-big">{sar(base)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.pay}</div>
          <div className="mg-tool-big">{sar2(payable)}</div>
        </div>
        {firstHome && (
          <div>
            <div className="mg-tool-label">{L.state}</div>
            <div className="mg-tool-big">{sar2(stateBears)}</div>
          </div>
        )}
        {d > 0 && (
          <div>
            <div className="mg-tool-label">{L.fine}</div>
            <div className="mg-tool-big">{sar2(fine)}</div>
          </div>
        )}
        <div className="mg-tool-note">
          {ar
            ? <>الوعاء هو السعر المتفق عليه أو القيمة السوقية العادلة أيهما أعلى، ويُستبعد ربح التمويل. البائع هو الملتزم حتى لو اتفق المشتري على تحمل الضريبة. في البيع الموثق تُسدَّد قبل التوثيق، فيقع التأخر غالبًا في التصرفات غير الموثقة ونقل الحصص وحقوق الانتفاع لأكثر من 50 سنة (مهلة السداد 30 يومًا). الغرامة 2% عن كل شهر أو جزء منه ({months} {months === 1 ? "شهر" : "أشهر"} محسوبة هنا، 30 يومًا لكل شهر)، بحد أقصى 50%. وتُضاف 1% شهريًا إذا عدّلت الهيئة مبلغ الضريبة، وهي غير محسوبة هنا.</>
            : <>The base is the agreed price or fair market value, whichever is higher; the profit in a financing arrangement is excluded. The seller is liable even if the buyer agrees to bear the tax. For a notarised sale it is paid before notarisation, so lateness mainly arises on unnotarised transfers, share deals and usufructs over 50 years (30 days to pay). The fine is 2% for each month or part of a month late ({months} {months === 1 ? "month" : "months"} counted here, at 30 days each), capped at 50%. A further 1% a month applies where ZATCA amends the tax, which is not modelled.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 31 · KSA RETT on share transfers: the real estate company test ── */

export function RettShareCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [re, setRe] = useState("80000000");
  const [assets, setAssets] = useState("120000000");
  const [pct, setPct] = useState("40");
  const [alloc, setAlloc] = useState("28000000");
  const [revenue, setRevenue] = useState(true);
  const [listed, setListed] = useState(false);

  const reV = Math.max(0, num(re));
  const total = Math.max(0, num(assets));
  const share = Math.min(100, Math.max(0, num(pct)));
  const ratio = total > 0 ? (reV / total) * 100 : 0;
  const isRec = revenue && ratio >= 50;
  const reaches = share >= 30;
  const taxable = isRec && reaches && !listed;
  const byValue = (reV * share) / 100;
  const byPrice = Math.max(0, num(alloc));
  const base = Math.max(byValue, byPrice);
  const tax = taxable ? base * 0.05 : 0;

  const verdict = ar
    ? listed
      ? "معفى: تداول أسهم مدرجة في السوق المالية السعودية."
      : !revenue
        ? "خارج النطاق: العقار غير محتفظ به لتحقيق إيراد بالبيع أو التأجير، فالكيان ليس شركة عقارية."
        : !isRec
          ? `خارج النطاق بهذه الأرقام: العقار ${pct2(ratio)} من إجمالي الأصول، دون 50%. افحص الـ 365 يومًا السابقة أيضًا.`
          : !reaches
            ? `شركة عقارية (${pct2(ratio)})، لكن ${share}% دون حد الـ 30%. أضف كل نقل مرتبط خلال السنوات الثلاث الماضية.`
            : `خاضع: شركة عقارية (${pct2(ratio)}) ونُقل ${share}%. تُستحق في تاريخ النقل أو الاتفاق غير المشروط أيهما أسبق، وتُسدَّد خلال 30 يومًا.`
    : listed
      ? "Exempt: trading in shares listed on the Saudi Exchange."
      : !revenue
        ? "Outside scope: the real estate is not held to earn revenue through sale or lease, so the entity is not a real estate company."
        : !isRec
          ? `Outside scope on these figures: real estate is ${pct2(ratio)} of total assets, below 50%. Check the previous 365 days too.`
          : !reaches
            ? `Real estate company (${pct2(ratio)}), but ${share}% is below the 30% threshold. Add every related transfer in the last three years.`
            : `Taxable: a real estate company (${pct2(ratio)}) and ${share}% transferred. Due on the earlier of transfer or unconditional agreement; pay within 30 days.`;

  const L = ar
    ? { re: "القيمة السوقية للعقارات في المملكة (ريال)", assets: "القيمة السوقية لإجمالي الأصول (ريال)", pct: "الحصص المنقولة خلال 3 سنوات", alloc: "الثمن المخصص للعقار (ريال)", rev: "العقار محتفظ به لتحقيق إيراد بالبيع أو التأجير (لا يشغله الكيان بنفسه)", listed: "الأسهم مدرجة في السوق المالية السعودية", ratio: "العقار / إجمالي الأصول", base: "وعاء الضريبة (الأعلى من الاثنين)", tax: "الضريبة (5%)" }
    : { re: "Market value of Saudi real estate held (SAR)", assets: "Market value of total assets (SAR)", pct: "Interests transferred in 3 years", alloc: "Price allocated to the real estate (SAR)", rev: "Real estate is held to earn revenue by sale or lease (not owner-occupied)", listed: "Shares are listed on the Saudi Exchange", ratio: "Real estate / total assets", base: "Tax base (higher of the two)", tax: "RETT (5%)" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.re} value={re} onChange={setRe} width={300} />
        <Field label={L.assets} value={assets} onChange={setAssets} width={260} />
      </div>
      <div className="mg-tool-fields">
        <Field label={L.pct} value={pct} onChange={setPct} suffix="%" width={220} />
        <Field label={L.alloc} value={alloc} onChange={setAlloc} width={280} />
      </div>
      <div className="mg-tool-fields">
        <label className="mg-tool-check">
          <input type="checkbox" checked={revenue} onChange={(e) => setRevenue(e.target.checked)} />
          <span>{L.rev}</span>
        </label>
        <label className="mg-tool-check">
          <input type="checkbox" checked={listed} onChange={(e) => setListed(e.target.checked)} />
          <span>{L.listed}</span>
        </label>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{L.ratio}</div>
          <div className="mg-tool-big">{pct2(ratio)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.base}</div>
          <div className="mg-tool-big">{sar(base)}</div>
        </div>
        <div>
          <div className="mg-tool-label">{L.tax}</div>
          <div className="mg-tool-big">{sar2(tax)}</div>
        </div>
        <div className="mg-tool-note">
          {ar
            ? <>{verdict} الوعاء هو الأعلى بين القيمة السوقية لجميع عقارات الشركة &times; نسبة الحصص المنقولة ({sar(byValue)}) والثمن المخصص للعقار ({sar(byPrice)}). وقد تنطبق إعفاءات المجموعة والحصة العينية والاندماج والاستحواذ مقابل حصص، ولكل منها شرط احتفاظ خمس سنوات.</>
            : <>{verdict} The base is the higher of the market value of all the company&rsquo;s real estate &times; the percentage transferred ({sar(byValue)}) and the price allocated to the real estate ({sar(byPrice)}). Group, in-kind contribution and share-for-share M&amp;A exemptions can apply, each with a five-year holding condition.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 32 · Supplier verification checker (FTA Decision No. 13 of 2026) ─ */

export function SupplierCheckCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [kind, setKind] = useState(0); // 0 company, 1 individual
  const [recent, setRecent] = useState(false);
  const [supply, setSupply] = useState("9000");
  const [prev12, setPrev12] = useState("72000");
  const [next12, setNext12] = useState("108000");
  const [pay, setPay] = useState(0); // 0 electronic, 1 cash, 2 third party / foreign account

  const s = Math.max(0, num(supply));
  const p = Math.max(0, num(prev12));
  const n = Math.max(0, num(next12));
  const total = Math.max(p, n);
  // Article 6: under AED 10,000 excl. VAT is excused unless the supplier total
  // exceeds AED 100,000 over the previous or the next 12 months.
  const exempt = s < 10000 && total <= 100000;
  const bank = total > 375000; // Article 3(4)

  const T = ar
    ? {
        idCo: "هوية المورد: التحقق من التأسيس عبر قاعدة بيانات رسمية أو شهادة التأسيس مع تطابق الاسم والعنوان، ونسخة من الهوية الإماراتية أو جواز سفر من يمثّل المورد.",
        idPerson: "هوية المورد: نسخة سارية من الهوية الإماراتية أو جواز السفر، ولقاء (حضوريًا أو بالفيديو) قبل التوريد.",
        place: "مقر العمل: مقر فعلي للمورد، يُتحقق منه إلكترونيًا أو بزيارة، ويتناسب مع نشاطه.",
        risk: "مؤشرات المخاطر: أكثر من تغييرين في العنوان أو في الموظفين الرئيسيين خلال 12 شهرًا، أو تعاملات لا تتناسب مع حجمه. إن انطبق أيٌّ منها فاحتفظ بتفسير مكتوب.",
        bank: "أكثر من 375,000 درهم سنويًا: تأكيد كتابي من بنك في الدولة بأن للمورد حسابًا دون تحفظات، ومراجعة التقييمات والتغطية الإعلامية المتاحة للعموم.",
        bankRecent: "تحققت من المورد خلال آخر 12 شهرًا. تأكد أن ملفه يتضمن تأكيد البنك في الدولة ومراجعة التغطية العامة، المطلوبين فوق 375,000 درهم سنويًا.",
        supply: "هذا التوريد: سبب تجاري حقيقي، وسعر أو هامش يتماشى مع السوق، وسلع أو خدمات ضمن رخصة المورد، والتحقق من منشأ السلع وملكيتها، وتفسير دور أي وسيط.",
        cash: "الدفع نقدًا: وثّق السبب التجاري، والتزم بالحدود الواردة في التشريع الضريبي، واجعله سهل التحقق. وقد تفقد المدفوعات النقدية الكبيرة حق الاسترداد بموجب المادة 54(3).",
        third: "الدفع لطرف ثالث أو لحساب بنكي خارج دولة تأسيس المورد: سجّل تفسيرًا تجاريًا معقولًا.",
        doc: "وثّق كل خطوة واحتفظ بالأدلة، وفق سياسة مكتوبة تحدد من ينفّذ الفحوص ومن يراجعها.",
        who: "المورد", kinds: ["شركة", "فرد"], sup: "هذا التوريد دون الضريبة (درهم)", p12: "المشتريات منه آخر 12 شهرًا (درهم)", n12: "المتوقع في الـ 12 شهرًا القادمة (درهم)",
        paid: "طريقة الدفع", pays: ["تحويل بنكي أو بطاقة", "نقدًا", "طرف ثالث أو حساب خارجي"], rec: "تحققنا من هذا المورد خلال آخر 12 شهرًا",
        res: "النتيجة", none: "لا فحوص مطلوبة", req: "الفحوص مطلوبة", tot: "إجمالي المورد المعتمد",
        exemptNote: "التوريد أقل من 10,000 درهم دون الضريبة ولا يتجاوز إجمالي المورد خلال 12 شهرًا 100,000 درهم، فتُعفي المادة 6 من الفحوص. احتفظ بالإجماليات في الملف لتبيّن كيف وصلت إلى هذا الرأي.",
        lost: "التوريد أقل من 10,000 درهم، لكن إجمالي المورد خلال 12 شهرًا يتجاوز 100,000 درهم، فيسقط الاستثناء. ",
        before: "قبل خصم ضريبة المدخلات:",
      }
    : {
        idCo: "Supplier identity: incorporation confirmed through an official database or certificate, name and address matching; Emirates ID or passport of the person who represents the supplier.",
        idPerson: "Supplier identity: copy of a valid Emirates ID or passport, and a meeting (in person or by video) before the supply.",
        place: "Place of business: a real place of business, confirmed electronically or by a visit, that fits the supplier's activity.",
        risk: "Risk indicators: more than two address changes or two key-staff changes in 12 months, or trading out of line with its size. If any applies, keep a written explanation.",
        bank: "Over AED 375,000 a year: written confirmation from a UAE bank that the supplier holds an account, without reservations, and a review of public reviews and media coverage.",
        bankRecent: "Supplier verified in the last 12 months. Confirm that file includes the UAE bank confirmation and the public-coverage review, needed above AED 375,000 a year.",
        supply: "This supply: a genuine commercial reason, a price or margin in line with the market, goods or services within the supplier's licence, goods' origin and title checked, and any intermediary's role explained.",
        cash: "Cash payment: document the commercial reason, keep within the thresholds in tax law and make it easy to verify. Large cash payments can also lose recovery under Article 54(3).",
        third: "Payment to a third party or a bank account outside the supplier's country of incorporation: record a reasonable commercial explanation.",
        doc: "Document each step and keep the evidence, under a written policy naming who runs and reviews the checks.",
        who: "The supplier is", kinds: ["A company", "An individual"], sup: "This supply, excluding VAT (AED)", p12: "Purchases from them, last 12 months (AED)", n12: "Expected, next 12 months (AED)",
        paid: "Paid by", pays: ["Bank transfer or card", "Cash", "Third party or foreign account"], rec: "We verified this supplier in the last 12 months",
        res: "Result", none: "No checks required", req: "Checks required", tot: "Supplier total tested",
        exemptNote: "The supply is under AED 10,000 excluding VAT and the supplier's 12-month total does not exceed AED 100,000, so Article 6 excuses the checks. Keep the totals on file to show how you reached that view.",
        lost: "The supply is under AED 10,000, but the supplier's 12-month total exceeds AED 100,000, so the exception falls away. ",
        before: "Before deducting the input VAT:",
      };

  const checks: string[] = [];
  if (!exempt) {
    if (!recent) {
      checks.push(kind === 0 ? T.idCo : T.idPerson);
      checks.push(T.place);
      checks.push(T.risk);
      if (bank) checks.push(T.bank);
    } else if (bank) {
      checks.push(T.bankRecent);
    }
    checks.push(T.supply);
    if (pay === 1) checks.push(T.cash);
    if (pay === 2) checks.push(T.third);
    checks.push(T.doc);
  }

  return (
    <div className="mg-tool">
      <div className="mg-tool-field">
        <span className="mg-tool-label">{T.who}</span>
        <div className="mg-tool-toggle">
          {T.kinds.map((t, i) => (
            <button key={t} type="button" className={kind === i ? "on" : ""} onClick={() => setKind(i)}>{t}</button>
          ))}
        </div>
      </div>
      <div className="mg-tool-fields">
        <Field label={T.sup} value={supply} onChange={setSupply} width={250} />
        <Field label={T.p12} value={prev12} onChange={setPrev12} width={290} />
        <Field label={T.n12} value={next12} onChange={setNext12} width={250} />
      </div>
      <div className="mg-tool-field">
        <span className="mg-tool-label">{T.paid}</span>
        <div className="mg-tool-toggle" style={{ flexWrap: "wrap" }}>
          {T.pays.map((t, i) => (
            <button key={t} type="button" className={pay === i ? "on" : ""} onClick={() => setPay(i)}>{t}</button>
          ))}
        </div>
      </div>
      <div className="mg-tool-fields">
        <label className="mg-tool-check">
          <input type="checkbox" checked={recent} onChange={(e) => setRecent(e.target.checked)} />
          <span>{T.rec}</span>
        </label>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{T.res}</div>
          <div className="mg-tool-big" style={{ color: exempt ? "var(--accent)" : "var(--text)" }}>{exempt ? T.none : T.req}</div>
        </div>
        <div>
          <div className="mg-tool-label">{T.tot}</div>
          <div className="mg-tool-big">{aed(total)}</div>
        </div>
        <div className="mg-tool-note">
          {exempt
            ? <>{T.exemptNote}</>
            : <>
                {s < 10000 && total > 100000 && <>{T.lost}</>}
                {T.before}
                <ul style={{ margin: "8px 0 0", paddingInlineStart: 18 }}>
                  {checks.map((c) => <li key={c} style={{ marginBottom: 6 }}>{c}</li>)}
                </ul>
              </>}
        </div>
      </div>
    </div>
  );
}

/* ── 33 · Tax invoice checker (Article 59) ─────────────────────────── */

const INV_FULL = [
  { k: "heading", t: "The words “Tax Invoice” clearly displayed", a: "عبارة «فاتورة ضريبية» بوضوح" },
  { k: "supplier", t: "Supplier's name, address and TRN", a: "اسم المورد وعنوانه ورقم تسجيله الضريبي" },
  { k: "recipient", t: "Your name, address and TRN", a: "اسمك وعنوانك ورقم تسجيلك الضريبي" },
  { k: "number", t: "A sequential or unique invoice number", a: "رقم فاتورة تسلسلي أو فريد" },
  { k: "date", t: "Date of issue (and date of supply, if different)", a: "تاريخ الإصدار (وتاريخ التوريد إن اختلف)" },
  { k: "desc", t: "A description of the goods or services", a: "وصف السلع أو الخدمات" },
  { k: "lines", t: "Per line: unit price, quantity, VAT rate and amount in AED", a: "لكل بند: سعر الوحدة والكمية ونسبة الضريبة والمبلغ بالدرهم" },
  { k: "discount", t: "Any discount shown (or none was given)", a: "أي خصم ممنوح (أو لا يوجد خصم)" },
  { k: "gross", t: "Gross amount payable in AED", a: "إجمالي المبلغ المستحق بالدرهم" },
  { k: "vat", t: "VAT in AED, with the exchange rate if converted", a: "الضريبة بالدرهم مع سعر الصرف عند التحويل" },
  { k: "rc", t: "Reverse charge statement and legal reference", a: "بيان الاحتساب العكسي والمرجع القانوني" },
] as const;
const INV_SIMPLE = [
  { k: "heading", t: "The words “Tax Invoice” clearly displayed", a: "عبارة «فاتورة ضريبية» بوضوح" },
  { k: "supplier", t: "Supplier's name, address and TRN", a: "اسم المورد وعنوانه ورقم تسجيله الضريبي" },
  { k: "date", t: "Date of issue", a: "تاريخ الإصدار" },
  { k: "desc", t: "A description of the goods or services", a: "وصف السلع أو الخدمات" },
  { k: "total", t: "Total consideration and VAT charged, in AED", a: "إجمالي المقابل والضريبة المحتسبة بالدرهم" },
] as const;

export function InvoiceCheckerCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [registered, setRegistered] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [einv, setEinv] = useState(false);
  const [total, setTotal] = useState("8400");
  const [issued, setIssued] = useState(1); // 0 full, 1 simplified
  const [have, setHave] = useState<Record<string, boolean>>({
    heading: true, supplier: false, recipient: true, number: true, date: true, desc: true,
    lines: true, discount: true, gross: true, vat: true, rc: true, total: true,
  });

  const T = ar
    ? {
        reg: "نحن مسجلون في ضريبة القيمة المضافة", rev: "نحن نحتسب الضريبة (الاحتساب العكسي)", ein: "المورد يصدر فواتير إلكترونية",
        tot: "إجمالي الفاتورة شامل الضريبة (درهم)", iss: "أصدر المورد", types: ["فاتورة ضريبية كاملة", "فاتورة ضريبية مبسطة"], tick: "علّم ما تظهره الفاتورة",
        res: "النتيجة", ok: "فاتورة ضريبية صالحة", no: "غير صالحة بعد", typ: "النوع المسموح", both: "مبسطة أو كاملة", safe: "كاملة (الأسلم)", full: "كاملة فقط",
        wE: "المورد يصدر فواتير إلكترونية، فتُلغي المادة 59(16) خيار الفاتورة المبسطة.",
        wR: "أنت تحتسب الضريبة بآلية الاحتساب العكسي، والمادة 59(5) تستثنيها من الفاتورة المبسطة.",
        wU: "أنت غير مسجل، فتسمح المادة 59(5)(أ) بفاتورة مبسطة بأي مبلغ.",
        wS: "أنت مسجل والإجمالي شامل الضريبة 10,000 درهم أو أقل، فتسمح المادة 59(5)(ب) بفاتورة مبسطة على أي قراءة.",
        wG: "السعر قبل الضريبة 10,000 درهم أو أقل، لكن الإجمالي مع الضريبة يتجاوزها. النص لا يحدد أيهما المعتبر، فالفاتورة الكاملة هي الخيار الأسلم.",
        wF: "أنت مسجل والمقابل يتجاوز 10,000 درهم، فالفاتورة الضريبية الكاملة مطلوبة.",
        notType: "الفاتورة المبسطة لا تكفي هنا: اطلب من المورد فاتورة ضريبية كاملة. ", miss: "ينقص: ",
        valid: "الفاتورة تدعم استرداد ضريبة المدخلات، مع الشروط الأخرى: السداد أو نية السداد خلال ستة أشهر، وفحوص المورد حيث تنطبق.",
        hold: "أوقف الضريبة واطلب من المورد فاتورة مصححة، واستردها في الفترة التي تحوز فيها فاتورة صالحة.",
      }
    : {
        reg: "We are VAT-registered", rev: "We account for the VAT (reverse charge)", ein: "The supplier issues e-invoices",
        tot: "Invoice total including VAT (AED)", iss: "The supplier issued", types: ["A full tax invoice", "A simplified tax invoice"], tick: "Tick what the invoice shows",
        res: "Result", ok: "Valid tax invoice", no: "Not valid yet", typ: "Type allowed", both: "Simplified or full", safe: "Full (safe)", full: "Full only",
        wE: "The supplier issues electronic invoices, so Article 59(16) removes the simplified option.",
        wR: "You account for the VAT under the reverse charge, which Article 59(5) excludes from simplified invoices.",
        wU: "You are not registered, so Article 59(5)(a) allows a simplified invoice at any amount.",
        wS: "You are registered and the total, including VAT, is AED 10,000 or less, so Article 59(5)(b) allows a simplified invoice on any reading.",
        wG: "The price before VAT is AED 10,000 or less, but the total with VAT is above it. The text does not say which counts, so a full invoice is the safe choice.",
        wF: "You are registered and the consideration exceeds AED 10,000, so a full tax invoice is required.",
        notType: "A simplified invoice is not enough here: ask the supplier for a full tax invoice. ", miss: "Missing: ",
        valid: "The invoice supports an input VAT claim, subject to the other conditions: paying or intending to pay within six months, and the supplier checks where they apply.",
        hold: "Hold the VAT and ask the supplier for a corrected invoice. Claim it in the period in which you hold a valid one.",
      };

  const t = Math.max(0, num(total));
  // Article 59(5): simplified allowed for an unregistered recipient, or a
  // registered one where consideration does not exceed AED 10,000 — never
  // under the reverse charge; Article 59(16) removes it for e-invoices.
  let allowed: "simplified" | "grey" | "full";
  let why: string;
  if (einv) { allowed = "full"; why = T.wE; }
  else if (reverse) { allowed = "full"; why = T.wR; }
  else if (!registered) { allowed = "simplified"; why = T.wU; }
  else if (t <= 10000) { allowed = "simplified"; why = T.wS; }
  else if (t / 1.05 <= 10000) { allowed = "grey"; why = T.wG; }
  else { allowed = "full"; why = T.wF; }

  const asSimple = issued === 1;
  const typeOk = !asSimple || allowed === "simplified";
  const fields = (asSimple ? INV_SIMPLE : INV_FULL).filter(
    (f) => (f.k !== "recipient" || registered) && (f.k !== "rc" || reverse),
  );
  const missing = fields.filter((f) => !have[f.k]);
  const valid = typeOk && missing.length === 0;

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <label className="mg-tool-check">
          <input type="checkbox" checked={registered} onChange={(e) => setRegistered(e.target.checked)} />
          <span>{T.reg}</span>
        </label>
        <label className="mg-tool-check">
          <input type="checkbox" checked={reverse} onChange={(e) => setReverse(e.target.checked)} />
          <span>{T.rev}</span>
        </label>
        <label className="mg-tool-check">
          <input type="checkbox" checked={einv} onChange={(e) => setEinv(e.target.checked)} />
          <span>{T.ein}</span>
        </label>
      </div>
      <div className="mg-tool-fields">
        <Field label={T.tot} value={total} onChange={setTotal} width={260} />
        <div className="mg-tool-field">
          <span className="mg-tool-label">{T.iss}</span>
          <div className="mg-tool-toggle">
            {T.types.map((x, i) => (
              <button key={x} type="button" className={issued === i ? "on" : ""} onClick={() => setIssued(i)}>{x}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="mg-tool-field">
        <span className="mg-tool-label">{T.tick}</span>
        <div className="mg-tool-fields" style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
          {fields.map((f) => (
            <label key={f.k} className="mg-tool-check">
              <input type="checkbox" checked={!!have[f.k]} onChange={(e) => setHave({ ...have, [f.k]: e.target.checked })} />
              <span>{ar ? f.a : f.t}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mg-tool-result">
        <div>
          <div className="mg-tool-label">{T.res}</div>
          <div className="mg-tool-big" style={{ color: valid ? "var(--accent)" : "var(--bad)" }}>{valid ? T.ok : T.no}</div>
        </div>
        <div>
          <div className="mg-tool-label">{T.typ}</div>
          <div className="mg-tool-big">{allowed === "simplified" ? T.both : allowed === "grey" ? T.safe : T.full}</div>
        </div>
        <div className="mg-tool-note">
          {why}{" "}
          {!typeOk && <>{T.notType}</>}
          {missing.length > 0 && <>{T.miss}{missing.map((m) => (ar ? m.a : m.t)).join(ar ? "؛ " : "; ")}. </>}
          {valid ? <>{T.valid}</> : <>{T.hold}</>}
        </div>
      </div>
    </div>
  );
}

/* ── 34 · Foreign-currency invoice VAT converter ───────────────────── */

export function FxVatCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [ccy, setCcy] = useState("EUR");
  const [net, setNet] = useState("8000");
  const [rate, setRate] = useState("4.2850");
  const [settle, setSettle] = useState("4.3100");

  const code = ccy.trim().toUpperCase().slice(0, 3) || "FCY";
  const n = Math.max(0, num(net));
  const r = Math.max(0, num(rate));
  const sr = Math.max(0, num(settle));
  const r2 = (v: number) => Math.round(v * 100) / 100;
  const netAed = r2(n * r);
  const vatAed = r2(netAed * 0.05);
  const grossAed = r2(netAed + vatAed);
  const grossFcy = n * 1.05;
  const received = r2(grossFcy * sr);
  const diff = r2(received - grossAed);
  const decimals = (rate.split(".")[1] ?? "").length;
  const gain = diff > 0;

  const T = ar
    ? { ccy: "العملة", net: `المبلغ الصافي قبل الضريبة (${code})`, rate: `سعر المصرف المركزي، درهم لكل ${code}`, settle: "السعر عند السداد (اختياري)", peg: "الدولار عند سعر الربط 3.6725",
        netA: "الصافي بالدرهم", vatA: "الضريبة 5% بالدرهم", grossA: "الإجمالي بالدرهم", fx: gain ? "ربح صرف عند السداد" : "خسارة صرف عند السداد" }
    : { ccy: "Currency", net: `Net amount before VAT (${code})`, rate: `Central Bank rate, AED per ${code}`, settle: "Rate when paid (optional)", peg: "USD at the 3.6725 peg",
        netA: "Net, in AED", vatA: "VAT at 5%, in AED", grossA: "Gross, in AED", fx: gain ? "Exchange gain on payment" : "Exchange loss on payment" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={T.ccy} value={ccy} onChange={setCcy} width={110} />
        <Field label={T.net} value={net} onChange={setNet} width={230} />
        <Field label={T.rate} value={rate} onChange={setRate} width={230} />
        <Field label={T.settle} value={settle} onChange={setSettle} width={210} />
      </div>
      <div className="mg-tool-toggle" style={{ flexWrap: "wrap", marginBottom: 16 }}>
        <button type="button" className={code === "USD" ? "on" : ""} onClick={() => { setCcy("USD"); setRate("3.6725"); setSettle("3.6725"); }}>{T.peg}</button>
      </div>
      <div className="mg-tool-result">
        <div><div className="mg-tool-label">{T.netA}</div><div className="mg-tool-big">{aed2(netAed)}</div></div>
        <div><div className="mg-tool-label">{T.vatA}</div><div className="mg-tool-big">{aed2(vatAed)}</div></div>
        <div><div className="mg-tool-label">{T.grossA}</div><div className="mg-tool-big">{aed2(grossAed)}</div></div>
        {sr > 0 && diff !== 0 && (
          <div><div className="mg-tool-label">{T.fx}</div><div className="mg-tool-big">{aed2(Math.abs(diff))}</div></div>
        )}
        <div className="mg-tool-note">
          {ar
            ? <>
                تُظهر الفاتورة {code} {fmt2(grossFcy)} إجماليًا، ويجب أن تُظهر أيضًا مبالغ البنود والإجمالي {aed2(grossAed)} والضريبة {aed2(vatAed)} بالدرهم، مع السعر {rate || "—"}. يحمل البند 1 من الإقرار {aed2(netAed)} وضريبة مخرجات {aed2(vatAed)}.
                {sr > 0 && diff !== 0 && <> عندما يسدد العميل {code} {fmt2(grossFcy)} بسعر {settle} تستلم {aed2(received)}: الفرق {aed2(Math.abs(diff))} {gain ? "ربح" : "خسارة"} صرف في الحسابات ولا يغيّر الضريبة التي تحددت في تاريخ التوريد.</>}
                {sr > 0 && diff === 0 && <> بسعر لم يتغير لا يوجد فرق صرف عند السداد.</>}
                {code !== "USD" && decimals > 0 && decimals < 4 && <> تحقق من السعر: المصرف المركزي ينشر الأسعار بخانات عشرية أكثر، والهيئة لا تسمح بالتقريب.</>}
              </>
            : <>
                The invoice shows {code} {fmt2(grossFcy)} in total, and must also show the line amounts, the gross {aed2(grossAed)} and the VAT {aed2(vatAed)} in AED, with the rate {rate || "—"}. Box 1 carries {aed2(netAed)} and {aed2(vatAed)} of output tax.
                {sr > 0 && diff !== 0 && <> When the customer pays {code} {fmt2(grossFcy)} at {settle}, you receive {aed2(received)}: the {aed2(Math.abs(diff))} difference is an exchange {gain ? "gain" : "loss"} in the accounts and does not change the VAT, which was fixed at the date of supply.</>}
                {sr > 0 && diff === 0 && <> At an unchanged rate there is no exchange difference on payment.</>}
                {code !== "USD" && decimals > 0 && decimals < 4 && <> Check the rate: the Central Bank publishes rates with more decimals, and the FTA does not allow rounding.</>}
              </>}
        </div>
      </div>
    </div>
  );
}

/* ── 35 · Investment property 4% tax depreciation (MD 173 of 2025) ── */

const DAY = 86400000;
const utc = (s: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : NaN;
};
const addYears = (t: number, n: number) => {
  const d = new Date(t);
  return Date.UTC(d.getUTCFullYear() + n, d.getUTCMonth(), d.getUTCDate());
};
const dayLabel = (t: number, ar = false) =>
  new Date(t).toLocaleDateString(ar ? "ar-AE-u-nu-latn" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="mg-tool-field" style={{ maxWidth: 200 }}>
      <span className="mg-tool-label">{label}</span>
      <span className="mg-tool-inwrap">
        <input className="mg-tool-in" type="date" value={value} onChange={(e) => onChange(e.target.value)} />
      </span>
    </label>
  );
}

export function IpDepreciationCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [cost, setCost] = useState("14000000");
  const [acq, setAcq] = useState("2022-01-01");
  const [first, setFirst] = useState("2025-01-01");
  const [saleYear, setSaleYear] = useState("2030");

  const c = Math.max(0, num(cost));
  const a = utc(acq);
  const f = utc(first);
  const ok = Number.isFinite(a) && Number.isFinite(f) && c > 0;

  // Opening Value: 4% for each calendar year (prorated by days) held before
  // the first tax period under the Decision. Those years are never deducted.
  let prior = 0;
  if (ok && a < f) {
    for (let y = new Date(a).getUTCFullYear(); y <= new Date(f - DAY).getUTCFullYear(); y++) {
      const ys = Date.UTC(y, 0, 1), ye = Date.UTC(y + 1, 0, 1);
      const days = (Math.min(f, ye) - Math.max(a, ys)) / DAY;
      if (days > 0) prior += days / ((ye - ys) / DAY);
    }
  }
  const opening = Math.max(0, c - c * 0.04 * prior);
  const annual = c * 0.04;

  const rows: { start: number; end: number; ded: number; close: number }[] = [];
  let twdv = opening;
  for (let i = 0; ok && i < 40 && twdv > 0.005; i++) {
    const ps = addYears(f, i), pe = addYears(f, i + 1);
    if (a >= pe) { rows.push({ start: ps, end: pe - DAY, ded: 0, close: twdv }); continue; }
    const frac = a > ps ? (pe - a) / (pe - ps) : 1;
    const ded = Math.min(annual * frac, twdv);
    twdv -= ded;
    rows.push({ start: ps, end: pe - DAY, ded, close: Math.max(0, twdv) });
  }
  const sy = Math.round(num(saleYear));
  const claimed = sy > 0 ? rows.filter((r) => new Date(r.end).getUTCFullYear() <= sy).reduce((s, r) => s + r.ded, 0) : 0;
  const periods = rows.filter((r) => r.ded > 0).length;

  const T = ar
    ? { cost: "تكلفة المبنى دون الأرض (درهم)", acq: "تاريخ الاقتناء", first: "بداية أول فترة ضريبية وفق القرار 173", sale: "البيع في الفترة المنتهية في (سنة، اختياري)",
        prior: "السنوات السابقة", open: "القيمة الافتتاحية", ann: "الخصم السنوي الكامل (4%)", save: "الوفر الضريبي السنوي بنسبة 9%", back: `الإضافة عند البيع (${sy})`,
        sched: "جدول الخصم", per: "الفترة الضريبية", ded: "الخصم", tax: "الوفر الضريبي (9%)", wdv: "القيمة الدفترية الضريبية", enter: "أدخل تكلفة المبنى والتاريخين." }
    : { cost: "Building cost, excluding land (AED)", acq: "Acquired on", first: "First tax period under MD 173 starts", sale: "Sold in period ending (year, optional)",
        prior: "Years held before", open: "Opening Value", ann: "Full-year deduction (4%)", save: "Tax saved a year at 9%", back: `Add-back on sale (${sy})`,
        sched: "Deduction schedule", per: "Tax period", ded: "Deduction", tax: "Tax saved (9%)", wdv: "Written-down value", enter: "Enter the building cost and both dates." };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={T.cost} value={cost} onChange={setCost} width={260} />
        <DateField label={T.acq} value={acq} onChange={setAcq} />
        <DateField label={T.first} value={first} onChange={setFirst} />
        <Field label={T.sale} value={saleYear} onChange={setSaleYear} width={250} />
      </div>
      <div className="mg-tool-result">
        <div><div className="mg-tool-label">{T.prior}</div><div className="mg-tool-big">{prior.toFixed(2)}</div></div>
        <div><div className="mg-tool-label">{T.open}</div><div className="mg-tool-big">{aed(opening)}</div></div>
        <div><div className="mg-tool-label">{T.ann}</div><div className="mg-tool-big">{aed(annual)}</div></div>
        <div><div className="mg-tool-label">{T.save}</div><div className="mg-tool-big">{aed(annual * 0.09)}</div></div>
        {claimed > 0 && (
          <div><div className="mg-tool-label">{T.back}</div><div className="mg-tool-big">{aed(claimed)}</div></div>
        )}
        <div className="mg-tool-note">
          {!ok
            ? <>{T.enter}</>
            : ar
              ? <>القيمة الافتتاحية هي التكلفة ناقص 4% عن كل سنة ميلادية سبقت أول فترة ضريبية تبدأ في 1 يناير 2025 أو بعده: {aed(c)} − {aed(c * 0.04 * prior)} = {aed(opening)}. كل فترة تخصم الأقل من 4% من التكلفة والقيمة الدفترية الضريبية، فتستمر الخصومات {periods} فترة.{claimed > 0 && <> البيع في نهاية {sy} يضيف إلى الدخل {aed(claimed)} المخصومة (نحو {aed(claimed * 0.09)} ضريبة بنسبة 9%)، إضافة إلى ضريبة الربح المحقق. وزّع الفترة الأخيرة نسبيًا إن تم البيع في منتصف السنة.</>} يفترض فترات ضريبية متتالية مدة كل منها 12 شهرًا.</>
              : <>Opening Value is the cost less 4% for each calendar year held before the first tax period starting on or after 1 January 2025: {aed(c)} − {aed(c * 0.04 * prior)} = {aed(opening)}. Each period deducts the lower of 4% of cost and the written-down value, so the deductions run for {periods} periods.{claimed > 0 && <> Selling at the end of {sy} adds back the {aed(claimed)} claimed (about {aed(claimed * 0.09)} of tax at 9%), on top of the tax on the realised gain. Prorate the final period if the sale is mid-year.</>} Assumes consecutive 12-month tax periods.</>}
        </div>
      </div>
      {ok && rows.length > 0 && (
        <>
          <h3 className="mg-tool-schedule-h" style={{ marginTop: 32 }}>{T.sched}</h3>
          <div className="mg-tool-tablewrap">
            <table className="mg-tool-table">
              <thead>
                <tr><th>{T.per}</th><th>{T.ded}</th><th>{T.tax}</th><th>{T.wdv}</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.start}>
                    <td>{dayLabel(r.start, ar)} – {dayLabel(r.end, ar)}</td>
                    <td className="mg-tool-mono">{fmt2(r.ded)}</td>
                    <td className="mg-tool-mono">{fmt2(r.ded * 0.09)}</td>
                    <td className="mg-tool-mono">{fmt2(r.close)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

/* ── 36 · UAE Domestic Minimum Top-up Tax estimator (Pillar Two) ───── */

// OECD Model Rules Art 9.2 transitional carve-out rates, by year the fiscal year starts.
const SBIE_RATES: Record<string, [number, number]> = { "2025": [9.6, 7.6], "2026": [9.4, 7.4], "2027": [9.2, 7.2] };

export function TopUpTaxCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [income, setIncome] = useState("400000000");
  const [taxes, setTaxes] = useState("30000000");
  const [payroll, setPayroll] = useState("50000000");
  const [assets, setAssets] = useState("200000000");
  const [year, setYear] = useState("2025");

  const inc = num(income);
  const tx = Math.max(0, num(taxes));
  const [pr, ar_] = SBIE_RATES[year];
  const sbie = Math.max(0, num(payroll)) * pr / 100 + Math.max(0, num(assets)) * ar_ / 100;
  const etr = inc > 0 ? (tx / inc) * 100 : 0;
  const topPct = inc > 0 ? Math.max(0, 15 - etr) : 0;
  const excess = Math.max(0, inc - sbie);
  const topUp = (excess * topPct) / 100;
  const shEtr = year === "2025" ? 16 : year === "2026" ? 17 : null;

  const L = ar
    ? { inc: "دخل GloBE لكيانات المجموعة في الدولة (درهم)", tx: "الضرائب المشمولة المعدّلة (درهم)", pay: "تكاليف الرواتب المؤهلة (درهم)", ast: "القيمة الدفترية للأصول الملموسة (درهم)", yr: "السنة المالية تبدأ في", etr: "معدل الضريبة الفعلي في الإمارات", pct: "نسبة الضريبة الإضافية", sb: "استبعاد الدخل القائم على الجوهر", ex: "الربح الزائد", tu: "الضريبة الإضافية التقديرية" }
    : { inc: "GloBE income of all UAE entities (AED)", tx: "Adjusted covered taxes (AED)", pay: "Eligible payroll costs (AED)", ast: "Carrying value of tangible assets (AED)", yr: "Fiscal year starting in", etr: "UAE effective tax rate", pct: "Top-up percentage", sb: "Substance-based exclusion", ex: "Excess profit", tu: "Estimated top-up tax" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.inc} value={income} onChange={setIncome} width={280} />
        <Field label={L.tx} value={taxes} onChange={setTaxes} width={240} />
        <Field label={L.pay} value={payroll} onChange={setPayroll} width={240} />
        <Field label={L.ast} value={assets} onChange={setAssets} width={260} />
      </div>
      <div className="mg-tool-field">
        <span className="mg-tool-label">{L.yr}</span>
        <div className="mg-tool-toggle">
          {Object.keys(SBIE_RATES).map((y) => (
            <button key={y} type="button" className={year === y ? "on" : ""} onClick={() => setYear(y)}>{y}</button>
          ))}
        </div>
      </div>
      <div className="mg-tool-result">
        <div><div className="mg-tool-label">{L.etr}</div><div className="mg-tool-big">{pct2(etr)}</div></div>
        <div><div className="mg-tool-label">{L.pct}</div><div className="mg-tool-big">{pct2(topPct)}</div></div>
        <div><div className="mg-tool-label">{L.sb}</div><div className="mg-tool-big">{aed(sbie)}</div></div>
        <div><div className="mg-tool-label">{L.ex}</div><div className="mg-tool-big">{aed(excess)}</div></div>
        <div><div className="mg-tool-label">{L.tu}</div><div className="mg-tool-big" style={{ color: topUp > 0 ? "var(--bad)" : "var(--accent)" }}>{aed(topUp)}</div></div>
        <div className="mg-tool-note">
          {ar
            ? <>الاستبعاد = {pr}% من الرواتب + {ar_}% من الأصول الملموسة (النسب الانتقالية لسنة {year}). الضريبة = ({"15% − "}{pct2(etr)}) × الربح الزائد. {shEtr && <>ملاذ تقارير CbCR الانتقالي يحتاج معدلًا فعليًا مبسطًا لا يقل عن {shEtr}% بأرقام التقرير لا بأرقام GloBE. </>}التسجيل مطلوب حتى لو كانت الضريبة صفرًا؛ والمهلة الانتقالية للسنوات المنتهية قبل 30 أبريل 2026 هي 30 نوفمبر 2026. تقدير أولي فقط: دخل GloBE والضرائب المشمولة يتطلبان تعديلات كثيرة على الحسابات.</>
            : <>Exclusion = {pr}% of payroll + {ar_}% of tangible assets (the transitional rates for {year}). Top-up = (15% − {pct2(etr)}) × excess profit. {shEtr && <>The transitional CbCR safe harbour needs a simplified effective rate of at least {shEtr}%, measured on country-by-country report figures, not GloBE figures. </>}Registration is required even when the tax is zero; for years ending before 30 April 2026 the transitional deadline is 30 November 2026. A first estimate only: GloBE income and covered taxes carry many adjustments to the accounts.</>}
        </div>
      </div>
    </div>
  );
}

/* ── 37 · VAT capital assets scheme adjustment (Article 58) ────────── */

export function CapitalAssetCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [building, setBuilding] = useState(true);
  const [w, setW] = useState("2500000");
  const [x, setX] = useState("80");
  const [qs, setQs] = useState<string[]>(["80", "60", "90", "90", "90", "90", "90", "90", "90"]);
  const [saleYear, setSaleYear] = useState("6");
  const [saleTaxable, setSaleTaxable] = useState(true);

  const years = building ? 10 : 5;
  const W = Math.max(0, num(w));
  const X = Math.min(100, Math.max(0, num(x)));
  const slice = W / years;
  const z = (slice * X) / 100;
  const sale = Math.round(num(saleYear));
  const sold = sale >= 1 && sale < years;

  const rows: { y: number; q: number; r: number; adj: number; deemed: boolean }[] = [];
  for (let y = 2; y <= years; y++) {
    const deemed = sold && y > sale;
    const q = deemed ? (saleTaxable ? 100 : 0) : Math.min(100, Math.max(0, num(qs[y - 2] ?? "0")));
    const r = (slice * q) / 100;
    rows.push({ y, q, r, adj: r - z, deemed });
  }
  const annual = rows.filter((r) => !r.deemed).reduce((s, r) => s + r.adj, 0);
  const onSale = rows.filter((r) => r.deemed).reduce((s, r) => s + r.adj, 0);
  const setQ = (i: number, v: string) => setQs(qs.map((q, j) => (j === i ? v : q)));

  const L = ar
    ? { b: "مبنى (10 سنوات)", o: "أصل آخر (5 سنوات)", w: "ضريبة المدخلات في السنة الأولى W (درهم)", x: "نسبة الاسترداد في السنة الأولى X (%)", q: "نسبة الاسترداد Q لكل سنة (%)", s: "بيع في السنة (اختياري)", st: "البيع خاضع للضريبة", z: "الحصة السنوية Z", tot: "صافي التسويات السنوية", sale: "تسوية السنوات المتبقية عند البيع", yr: "السنة", adj: "التسوية", dm: "مفترضة" }
    : { b: "Building (10 years)", o: "Other asset (5 years)", w: "Year 1 input VAT, W (AED)", x: "Year 1 recovery, X (%)", q: "Recovery Q in each later year (%)", s: "Sold in year (optional)", st: "The sale is taxable", z: "Annual share Z", tot: "Net annual adjustments", sale: "Remaining-years adjustment on sale", yr: "Year", adj: "Adjustment", dm: "deemed" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-toggle" style={{ marginBottom: 16, flexWrap: "wrap" }}>
        <button type="button" className={building ? "on" : ""} onClick={() => setBuilding(true)}>{L.b}</button>
        <button type="button" className={!building ? "on" : ""} onClick={() => setBuilding(false)}>{L.o}</button>
      </div>
      <div className="mg-tool-fields">
        <Field label={L.w} value={w} onChange={setW} width={240} />
        <Field label={L.x} value={x} onChange={setX} width={200} />
        <Field label={L.s} value={saleYear} onChange={setSaleYear} width={180} />
        <label className="mg-tool-check">
          <input type="checkbox" checked={saleTaxable} onChange={(e) => setSaleTaxable(e.target.checked)} />
          <span>{L.st}</span>
        </label>
      </div>
      <div className="mg-tool-field">
        <span className="mg-tool-label">{L.q}</span>
        <div className="mg-tool-fields" style={{ gap: 10 }}>
          {Array.from({ length: years - 1 }, (_, i) => (
            <Field key={i} label={`${ar ? "س" : "Y"}${i + 2}`} value={qs[i]} onChange={(v) => setQ(i, v)} width={78} />
          ))}
        </div>
      </div>
      <div className="mg-tool-result">
        <div><div className="mg-tool-label">{L.z}</div><div className="mg-tool-big">{aed(z)}</div></div>
        <div><div className="mg-tool-label">{L.tot}</div><div className="mg-tool-big">{annual > 0 ? "+" : annual < 0 ? "−" : ""}{aed(Math.abs(annual))}</div></div>
        {sold && <div><div className="mg-tool-label">{L.sale}</div><div className="mg-tool-big">{onSale > 0 ? "+" : onSale < 0 ? "−" : ""}{aed(Math.abs(onSale))}</div></div>}
        <div className="mg-tool-note">
          {ar
            ? <>كل سنة: R = W ÷ {years} × Q مقارنةً بـ Z = W ÷ {years} × X = {aed(z)}. إن زاد R تزيد ضريبة المدخلات بالفرق، وإن نقص تُخفَّض. تُسجَّل التسوية في أول فترة ضريبية من السنة الضريبية التالية. {sold && <>عند البيع في السنة {sale} تُعامل السنوات {sale + 1} إلى {years} وكأنها {saleTaxable ? "خاضعة بالكامل" : "معفاة بالكامل"}، وتدخل تسويتها في إقرار فترة البيع (على القراءة المعتادة).</>}</>
            : <>Each year: R = W ÷ {years} × Q against Z = W ÷ {years} × X = {aed(z)}. If R is higher, input tax increases by the difference; if lower, it is reduced. Each adjustment goes in the first tax period of the following tax year. {sold && <>On a sale in Year {sale}, Years {sale + 1} to {years} are treated as {saleTaxable ? "fully taxable" : "fully exempt"}, and their adjustment goes in the return for the period of the sale (on the usual reading).</>}</>}
        </div>
      </div>
      <div className="mg-tool-tablewrap" style={{ marginTop: 24 }}>
        <table className="mg-tool-table">
          <thead><tr><th>{L.yr}</th><th>Q</th><th>R</th><th>Z</th><th>{L.adj}</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.y}>
                <td>{r.y}{r.deemed ? ` (${L.dm})` : ""}</td>
                <td className="mg-tool-mono">{r.q}%</td>
                <td className="mg-tool-mono">{fmt2(r.r)}</td>
                <td className="mg-tool-mono">{fmt2(z)}</td>
                <td className="mg-tool-mono">{r.adj > 0 ? "+" : r.adj < 0 ? "−" : ""}{fmt2(Math.abs(r.adj))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── 38 · UAE e-invoicing deadline checker ─────────────────────────── */

const EINV_PHASES = [
  { k: "AED 50 million revenue or more", ak: "إيرادات 50 مليون درهم أو أكثر", asp: "2026-10-30", live: "2027-01-01" },
  { k: "Below AED 50 million", ak: "أقل من 50 مليون درهم", asp: "2027-03-31", live: "2027-07-01" },
  { k: "Government entity", ak: "جهة حكومية", asp: "2027-03-31", live: "2027-10-01" },
] as const;

export function EinvoiceDeadlineCalculator({ ar = false }: { ar?: boolean } = {}) {
  const [phase, setPhase] = useState(0);
  const [groupOnly, setGroupOnly] = useState(false);
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => {
    const d = new Date();
    setToday(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  }, []);

  const p = EINV_PHASES[phase];
  const asp = utc(p.asp), live = utc(p.live);
  const left = (t: number) => (today == null ? null : Math.round((t - today) / DAY));
  const fmtDate = (t: number) =>
    new Date(t).toLocaleDateString(ar ? "ar-AE-u-nu-latn" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const days = (n: number | null) =>
    n == null ? "" : n >= 0 ? (ar ? ` · بعد ${n} يومًا` : ` · ${n} days left`) : (ar ? ` · مضى ${-n} يومًا` : ` · ${-n} days ago`);

  const L = ar
    ? { who: "من أنت؟", grp: "كل مبيعاتنا بين الشركات داخل مجموعتنا الضريبية", asp: "آخر موعد لتعيين مزود خدمة معتمد", live: "بدء الفوترة الإلكترونية الإلزامية" }
    : { who: "Which describes you?", grp: "All our B2B sales are to members of our own VAT tax group", asp: "Appoint an Accredited Service Provider by", live: "Mandatory e-invoicing from" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-field">
        <span className="mg-tool-label">{L.who}</span>
        <div className="mg-tool-toggle" style={{ flexWrap: "wrap" }}>
          {EINV_PHASES.map((x, i) => (
            <button key={x.k} type="button" className={phase === i ? "on" : ""} onClick={() => setPhase(i)}>{ar ? x.ak : x.k}</button>
          ))}
        </div>
      </div>
      <div className="mg-tool-fields">
        <label className="mg-tool-check">
          <input type="checkbox" checked={groupOnly} onChange={(e) => setGroupOnly(e.target.checked)} />
          <span>{L.grp}</span>
        </label>
      </div>
      <div className="mg-tool-result">
        <div><div className="mg-tool-label">{L.asp}</div><div className="mg-tool-big">{fmtDate(asp)}</div><div className="mg-tool-note">{days(left(asp))}</div></div>
        <div><div className="mg-tool-label">{L.live}</div><div className="mg-tool-big">{fmtDate(live)}</div><div className="mg-tool-note">{days(left(live))}</div></div>
        <div className="mg-tool-note">
          {ar
            ? <>{phase === 0 && <>نُقل موعد تعيين المزود من 31 يوليو إلى 30 أكتوبر 2026 في مايو 2026، ولم يتغير موعد البدء. </>}{groupOnly && <>المعاملات بين أعضاء المجموعة الضريبية نفسها مستثناة 24 شهرًا من 1 يناير 2027 (إعلان 19 أكتوبر 2026)، لكن أي بيع لطرف خارج المجموعة يبقى ضمن النطاق، وستحتاج مزودًا لاستلام فواتير الموردين أيضًا. </>}الغرامات بموجب قرار مجلس الوزراء رقم 106 لسنة 2025: 5,000 درهم عن كل شهر تأخير في التطبيق، و100 درهم عن كل فاتورة لا تصدر بالشكل المطلوب بحد أقصى 5,000 درهم شهريًا لكل فئة. المبيعات للمستهلكين خارج النطاق.</>
            : <>{phase === 0 && <>The provider deadline moved from 31 July to 30 October 2026 in May 2026; the go-live date did not move. </>}{groupOnly && <>Transactions between members of the same VAT tax group are excluded for 24 months from 1 January 2027 (announced 19 October 2026), but any sale outside the group stays in scope, and you still need a provider to receive suppliers' e-invoices. </>}Penalties under Cabinet Decision No. 106 of 2025: AED 5,000 for each month of late implementation, and AED 100 per invoice not issued in the required form, capped at AED 5,000 a month for each category. Sales to consumers are out of scope.</>}
        </div>
      </div>
    </div>
  );
}
