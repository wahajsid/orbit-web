import { Tm } from "./Wp";

/* The legend for every red mark on the page. */
export function TickLegend() {
  return (
    <aside className="tt-legend" aria-labelledby="tt-legend-h">
      <h2 id="tt-legend-h">Tick mark legend</h2>
      <ul>
        <li><Tm m="✓" /><span>Recomputed. The arithmetic is checked.</span></li>
        <li><Tm m="T" /><span>Traced to the source document.</span></li>
        <li><Tm m="B" /><span>Agreed to the bank statement.</span></li>
        <li><Tm m="P" /><span>Approved by a person.</span></li>
      </ul>
      <p className="tt-legend-foot"><span aria-hidden="true">✳</span><span>Evidence on every number. Nothing posts outside the rules you approve. Built in Dubai.</span></p>
    </aside>
  );
}
