"use client";

/* ── The close film (homepage hero) ─────────────────────────────────
   Fifteen seconds of a finished month-end close, played in one app
   window: the close calendar ticks T+1 to T+4 to done (a contract
   accrual confirmed by its owner on the way), the 31 workpapers of the
   close binder file one by one, and the month locks. It is drawn in code
   rather than shipped as an MP4, so the text stays sharp at any size and
   the page stays light.
   - It plays only while on screen and the tab is visible.
   - A pause button stops it (WCAG 2.2.2); under reduced motion it shows
     the finished close, still.
   - Screen readers get one sentence of what it shows; the moving parts
     are hidden from them.
   The tasks and workpapers are the product's own (the app's close
   calendar defaults and close-binder registry). Illustrative data. */

import { useEffect, useRef, useState } from "react";
import "./close-film.css";

const LOOP = 15_000;
const TICK = 100;

/* Close calendar rows: [day, task, who or what, done at (ms)] */
const TASKS: [string, string, string, number][] = [
  ["T+1", "Match the bank lines", "312 of 312 · counted", 900],
  ["T+1", "Approve the recurring accruals", "approved by Sara", 1500],
  ["T+1", "Post depreciation", "14 assets · counted", 2000],
  ["T+2", "Accrue the fit-out contract", "AED 90,000 · confirmed by Noor", 3000],
  ["T+3", "Review the balance-sheet reconciliations", "7 of 7 signed", 3900],
  ["T+3", "Explain the variances", "2 answered by owners", 4500],
  ["T+4", "Review the draft statements", "signed by Layla, CFO", 5200],
];

const PAPERS = [
  "Index and sign-off", "Trial balance and lead schedules", "Cash and bank", "Accounts receivable", "Prepayments",
  "Other receivables and deposits", "Inventory", "Fixed assets", "Leases (IFRS 16)", "Intangibles", "Intercompany",
  "Accounts payable", "Accruals", "Deferred revenue", "Payroll and employee liabilities", "VAT", "Corporate tax and Zakat",
  "Loans and borrowings", "Other payables and provisions", "Equity", "Suspense and clearing", "FX revaluation", "Cut-off",
  "Journal entries register", "Balance sheet flux", "Income statement flux", "Cash flow working", "Financial statements",
  "Open items and exceptions", "Close checklist evidence", "Group consolidation",
];

const SCENE_B = 6200;   // the binder
const FILE_EVERY = 115; // ms per workpaper
const SCENE_C = 10_400; // locked

export function CloseFilm() {
  const [t, setT] = useState(LOOP - 1);   // server render and no-JS: the finished close
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setStill(mq.matches);
    set();
    mq.addEventListener("change", set);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    if (root.current) io.observe(root.current);
    return () => { mq.removeEventListener("change", set); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (still) { setT(LOOP - 1); return; }
    if (paused || !visible) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setT((x) => (x + TICK) % LOOP);
    }, TICK);
    return () => window.clearInterval(id);
  }, [still, paused, visible]);

  const scene = t < SCENE_B ? "cal" : t < SCENE_C ? "binder" : "locked";
  const done = TASKS.filter((x) => t >= x[3]).length;
  const filed = scene === "cal" ? 0 : scene === "locked" ? PAPERS.length : Math.min(PAPERS.length, Math.floor((t - SCENE_B) / FILE_EVERY) + 1);

  // Keep the newest filed workpaper in view inside the binder list.
  useEffect(() => {
    const ol = list.current;
    if (!ol || scene !== "binder") return;
    const li = ol.children[Math.max(0, filed - 1)] as HTMLElement | undefined;
    if (li) ol.scrollTop = Math.max(0, li.offsetTop - ol.clientHeight + li.offsetHeight + 8);
  }, [filed, scene]);
  useEffect(() => { if (scene === "cal" && list.current) list.current.scrollTop = 0; }, [scene]);

  return (
    <figure className="cf" ref={root} data-scene={scene} data-still={still ? "" : undefined}>
      <p className="hw-sr">
        Illustration of a finished month-end close in Hysaab: the close calendar ticks from T+1 to T+4 to done, a contract accrual is confirmed by its owner,
        the 31 workpapers of the close binder are filed, and October is locked on the fourth working day.
      </p>
      <div className="cf-win" aria-hidden="true">
        <div className="cf-bar">
          <span className="cf-dots"><i /><i /><i /></span>
          <span>Helio Trading LLC · Period close · October 2026</span>
          <span className="cf-tag">Illustrative</span>
        </div>

        <div className="cf-stage">
          {/* Scene 1: the close calendar */}
          <section className="cf-scene cf-cal">
            <header className="cf-h">
              <b>Close calendar</b>
              <span>{done} of {TASKS.length} done</span>
            </header>
            <div className="cf-prog"><i style={{ width: `${Math.round((done / TASKS.length) * 100)}%` }} /></div>
            <ul>
              {TASKS.map(([d, task, who, at], i) => {
                const ok = t >= at;
                const now = !ok && (i === 0 || t >= TASKS[i - 1][3]);
                return (
                  <li key={task} className={ok ? "ok" : now ? "now" : ""}>
                    <span className="cf-d">{d}</span>
                    <span className="cf-m">{ok ? "✓" : ""}</span>
                    <span className="cf-t">{task}<small>{ok ? who : now ? "in progress" : "waiting"}</small></span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Scene 2 and 3: the binder, then locked */}
          <section className="cf-scene cf-binder">
            <header className="cf-h">
              <b>Close binder · October 2026</b>
              <span><b className="cf-n">{filed}</b> / {PAPERS.length} filed</span>
            </header>
            <ol ref={list}>
              {PAPERS.map((p, i) => (
                <li key={p} className={i < filed ? "in" : ""}>
                  <span className="cf-no">{String(i).padStart(2, "0")}</span>
                  <span className="cf-p">{p}.xlsx</span>
                  <span className="cf-sig">prepared · reviewed <b>✓</b></span>
                </li>
              ))}
            </ol>
            <div className="cf-lock">
              <p className="cf-lock-k">Period locked</p>
              <p className="cf-lock-h">October closed</p>
              <p className="cf-lock-s"><b>T+4</b> · 31 workpapers filed · 0 open items</p>
              <p className="cf-lock-sign">P · reviewed L.H. 16:40</p>
            </div>
          </section>
        </div>
      </div>
      <figcaption className="cf-cap">
        <span>Illustrative close · sample data</span>
        {!still && (
          <button type="button" className="cf-pause" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
            {paused ? "Play" : "Pause"}<span className="hw-sr"> the close animation</span>
          </button>
        )}
      </figcaption>
    </figure>
  );
}
