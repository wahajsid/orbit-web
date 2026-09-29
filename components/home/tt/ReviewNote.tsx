"use client";

/* ── A review note: concern, recommendation, evidence, your call ──────
   Sample data from the demo's D-118. The two buttons only record the
   choice on this page; nothing is sent anywhere. */

import { useState } from "react";
import { Tm } from "./Wp";

export function ReviewNote() {
  const [done, setDone] = useState<string | null>(null);
  return (
    <div className="tt-rn" aria-label="Example review note, sample data">
      <div className="tt-rn-h"><span>Review note <b>RN-118</b> · Decision required</span><span>Sample data</span></div>
      <div className="tt-rn-row"><span className="tt-rn-k">Concern</span><div><b>Coding below confidence threshold</b><span className="tt-rn-conf"><i style={{ width: 74 }} />74%</span></div></div>
      <div className="tt-rn-row"><span className="tt-rn-k">Recommendation</span><span>Gray Mackenzie, AED 14,720. Proposed Office consumables; history suggests Staff welfare.</span></div>
      <div className="tt-rn-row"><span className="tt-rn-k">Evidence</span><span>61% of past spend with this supplier went to Staff welfare.</span></div>
      <div className="tt-rn-row">
        <span className="tt-rn-k">Your call</span>
        <span className="tt-rn-acts">
          <button type="button" className="hw-btn hw-btn--navy" onClick={() => setDone("Recoded to Staff welfare. Reason kept on the record.")}>Accept recommendation</button>
          <button type="button" className="hw-btn tt-btn-line" onClick={() => setDone("Kept as Office consumables. Your reason is required and kept on the record.")}>Keep and give a reason</button>
        </span>
      </div>
      {done && <div className="tt-rn-row" role="status"><span className="tt-rn-k">Cleared</span><span><Tm m="P" /> {done}</span></div>}
    </div>
  );
}
