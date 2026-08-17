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
