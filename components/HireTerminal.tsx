"use client";

/* Orbit Hire — the live pipeline terminal. Same motion as the finance one:
   three scenarios (screen the pile, run the interview, hand over the shortlist)
   cycling, feed lines typing on one-by-one. Starts on scroll-in; reduced-motion
   shows the first scenario fully. Reuses the .term-* styles from wire.css. */

import { useEffect, useRef, useState } from "react";

interface Scenario {
  key: string;
  title: [string, string];
  sub: string;
  header: string;
  lines: [string, string, string, boolean][];
}

const SCENARIOS: Scenario[] = [
  {
    key: "screen",
    title: ["Fifty CVs,", "read by breakfast."],
    sub: "Applications land from anywhere. Orbit reads each one, scores it on the evidence, and ranks the field — while sealing the details that shouldn't sway a hire.",
    header: "ORBIT HIRE / INTAKE",
    lines: [
      ["08:02", "INTAKE", "52 applications · 4 sources", false],
      ["08:03", "PARSE", "skills + evidence extracted", false],
      ["08:03", "FAIRNESS", "name · age · photo sealed", false],
      ["08:04", "RANK", "top 8 against the scorecard", false],
      ["08:04", "READY", "shortlist drafted for review ◉", true],
    ],
  },
  {
    key: "interview",
    title: ["The first interview,", "for every candidate."],
    sub: "A real voice conversation — warm, structured, in your competencies. It transcribes itself, scores against the rubric, and never gets tired at candidate forty.",
    header: "ORBIT HIRE / INTERVIEW",
    lines: [
      ["10:15", "CALL", "voice screen → candidate 12", false],
      ["10:21", "ASK", "6 role questions · follow-ups", false],
      ["10:22", "TRANSCRIBE", "verbatim + timestamps", false],
      ["10:22", "SCORE", "competencies vs rubric", false],
      ["10:23", "LOGGED", "evidence attached ◉", true],
    ],
  },
  {
    key: "shortlist",
    title: ["A shortlist", "you can defend."],
    sub: "Three finalists, each with a one-page brief: strengths, gaps and the exact questions to ask next. The reasoning is on the table — and so is the audit trail.",
    header: "ORBIT HIRE / SHORTLIST",
    lines: [
      ["11:40", "COMPARE", "8 candidates · same rubric", false],
      ["11:41", "BRIEF", "strengths · gaps · questions", false],
      ["11:41", "AUDIT", "every score traceable", false],
      ["11:42", "SHORTLIST", "3 finalists → hiring manager", false],
      ["11:42", "SENT", "you interview three, not thirty ◉", true],
    ],
  },
];

const LINE_MS = 700;
const HOLD_MS = 4200;

export function HireTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [scenario, setScenario] = useState(0);
  const [shown, setShown] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setShown(SCENARIOS[0].lines.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const play = (idx: number) => {
      setScenario(idx);
      setShown(0);
      const n = SCENARIOS[idx].lines.length;
      for (let i = 1; i <= n; i++) timers.push(setTimeout(() => setShown(i), i * LINE_MS));
      timers.push(setTimeout(() => play((idx + 1) % SCENARIOS.length), n * LINE_MS + HOLD_MS));
    };
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); play(0); } },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  const s = SCENARIOS[scenario];
  return (
    <div className="term-grid" ref={ref}>
      <div className="term-sticky">
        <h2 className="section-head" key={s.key} style={{ minHeight: "2.1em" }}>
          {s.title[0]}<br />{s.title[1]}
        </h2>
        <p className="section-sub">{s.sub}</p>
        {!reduced && (
          <div className="term-dots" aria-hidden="true">
            {SCENARIOS.map((x, i) => (
              <span key={x.key} className={`term-dot${i === scenario ? " on" : ""}`} />
            ))}
          </div>
        )}
      </div>
      <div className="term-panel">
        <div className="term-header">
          <span>{s.header}</span>
          <span className="term-live">— LIVE</span>
        </div>
        <div className="term-feed" style={{ minHeight: "11.5em" }}>
          {s.lines.map(([time, agent, rest, brass], i) => (
            <div key={s.key + agent + time} className={`feedline${i < shown ? " on" : ""}`}>
              <span className="t">{time}</span>{" "}
              <span className={brass ? "posted" : "agent"}>{agent}</span>{" "}
              {rest}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
