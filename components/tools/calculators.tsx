"use client";

import { useState } from "react";

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

  const t = Math.max(0, num(taxIn));
  const e = Math.max(0, num(exIn));
  const r = Math.max(0, num(resid));
  const ratio = t + e > 0 ? Math.round((t / (t + e)) * 100) : 100;
  const residRec = (r * ratio) / 100;
  const total = t + residRec;
  const lost = e + (r - residRec);

  const L = ar
    ? { t: "مدخلات منسوبة للتوريدات الخاضعة (درهم)", e: "مدخلات منسوبة للتوريدات المعفاة (درهم)", r: "المدخلات المتبقية — المصاريف العامة (درهم)", ratio: "نسبة الاسترداد", rec: "إجمالي المسترد", lost: "الضريبة الضائعة" }
    : { t: "Input VAT attributed to taxable supplies (AED)", e: "Input VAT attributed to exempt supplies (AED)", r: "Residual input VAT — overheads (AED)", ratio: "Recovery ratio", rec: "Total recoverable", lost: "VAT lost" };

  return (
    <div className="mg-tool">
      <div className="mg-tool-fields">
        <Field label={L.t} value={taxIn} onChange={setTaxIn} width={290} />
        <Field label={L.e} value={exIn} onChange={setExIn} width={290} />
        <Field label={L.r} value={resid} onChange={setResid} width={290} />
      </div>
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
        <div className="mg-tool-note">
          {ar
            ? <>الطريقة القياسية: المدخلات المنسوبة للخاضع تُسترد كاملة، والمنسوبة للمعفى تضيع، والمتبقي يُسترد بنسبة المنسوب المسترد إلى إجمالي المنسوب ({ratio}% هنا، مقربة). ولا تنسَ التسوية السنوية — احسب السنة كلًا واحدًا وسوِّ الفرق في الفترة المقررة.</>
            : <>The standard method: attributed-to-taxable recovers in full, attributed-to-exempt is lost, and the residual recovers at the ratio of recoverable attributed input tax to total attributed input tax ({ratio}% here, rounded). Don't skip the annual wash-up — recompute the year as a whole and adjust the difference in the prescribed period.</>}
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
