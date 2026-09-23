/* ── A Books Check running (the /check hero foot) ────────────────────
   Four beats of one check, drawn with the motion system's step pattern
   (.m-steps in app/motion.css): the rule fills and each tick completes
   one beat apart, once. It waits while off screen (data-play) and is a
   plain, complete list without JS or under reduced motion. The list is
   the explanation; the ticks are decoration. */

const STEPS: readonly [string, string, string][] = [
  ["Pull", "Your ledger, read-only", "From Xero or QuickBooks. Nothing in your books is changed."],
  ["Rules", "Every account checked", "Set checks run across the whole ledger."],
  ["Review", "AI reads what the rules flag", "It weighs each finding against the entries behind it."],
  ["Note", "Your findings, ranked", "What matters most first, with the evidence."],
];

export function CheckRun() {
  return (
    <section className="hw-checkrun" aria-labelledby="hw-checkrun-h">
      <div className="hw-wrap hw-checkrun-in">
        <p className="hw-eyebrow" id="hw-checkrun-h">One check, about a minute</p>
        <ol className="m-steps" data-play="">
          {STEPS.map(([k, h, p], i) => (
            <li className="m-step" key={k}>
              <span className="m-step-tick" aria-hidden="true">
                <svg viewBox="0 0 16 16"><path pathLength={1} d="M3.5 8.5l3 3 6-7" /></svg>
              </span>
              <span className="hw-mono">{String(i + 1).padStart(2, "0")} · {k}</span>
              <strong>{h}</strong>
              <span className="hw-checkrun-p">{p}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
