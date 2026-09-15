"use client";

/* ── hysaab services OS: a day in the firm ──────────────────────────
   Six beats of one working day, each driving a product window. Every
   capability shown exists in the product (Oblique OS inventory,
   2026-09-15): inbox triage, meeting notes to actions, filing workbench
   with red-team review, proposals and e-signature, AI-drafted timesheet.
   Each pane has one action a person takes, because nothing the AI
   proposes counts until someone confirms it. Illustrative data. */

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "../Wordmark";

const BEATS = [
  { t: "07:30", h: "The brief is waiting.", p: "Before anyone opens email, My Day lists what needs a person: overdue tasks, approvals, unsent drafts and every deadline in the next two weeks." },
  { t: "09:05", h: "An FTA notice lands in the shared inbox.", p: "The inbox agent matches the sender to the client, files the attachment, reads the urgency, spots a tax-authority notice and raises an urgent task with a draft reply. Nobody sorted anything." },
  { t: "11:00", h: "A client meeting turns into work.", p: "A one-page prep brief is ready beforehand. Afterwards the notes become decisions and action items, each with an owner and a due date, proposed as tasks." },
  { t: "14:00", h: "The return is checked before the partner sees it.", p: "The filing workbench tests completeness, proposes tax treatments from the firm's own precedents, then runs a red-team review. The partner approves with the findings in front of her." },
  { t: "16:30", h: "A prospect signs.", p: "The proposal became an engagement letter, sent for signature inside the OS. Signed, sealed with an audit certificate, and the client moves to active with its obligations set." },
  { t: "17:45", h: "The timesheet writes itself.", p: "Hours are drafted from what you actually did today. The AI may keep or lower an estimate, never raise it, and nothing counts until you confirm." },
];

const ADVANCE_MS = 5200;

export function ServicesDay() {
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const playRef = useRef(playing);
  playRef.current = playing;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => { if (playRef.current) setBeat((b) => (b + 1) % BEATS.length); }, ADVANCE_MS);
    return () => clearInterval(id);
  }, [playing]);

  const go = (n: number) => { setBeat(n); setPlaying(false); };
  const act = (n: number) => { setDone((d) => ({ ...d, [n]: true })); setPlaying(false); };
  const needs = 5 - Object.values(done).filter(Boolean).length;

  const TABS = ["My Day", "Inbox", "Meetings", "Filings", "Growth", "Time"];

  return (
    <div className="hy-demo" id="day">
      <div className="hy-beats">
        <div className="hy-beats-ctl">
          <button type="button" className="hy-btn hy-btn--navy" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
            {playing ? "Pause the day" : "Play the day"}
          </button>
          <span className="hy-beats-mode">{playing ? "Replaying a Tuesday. Click anything to take over." : "Your turn. Press the buttons in the window."}</span>
          <span className="hy-beats-n hy-num">{beat + 1} of {BEATS.length}</span>
        </div>
        {BEATS.map((b, i) => (
          <button type="button" key={b.h} className="hy-beat" onClick={() => go(i)} aria-current={beat === i ? "step" : undefined}>
            <span className="hy-beat-time"><span className="hy-beat-t">{b.t}</span><span className="hy-beat-bar" /></span>
            <span className="hy-beat-body"><span className="hy-beat-h">{b.h}</span><span className="hy-beat-p">{b.p}</span></span>
          </button>
        ))}
      </div>

      <div className="hy-win" aria-live="polite">
        <div className="hy-win-bar">
          <Wordmark size={15} ground="navy" suffix={false} />
          <span className="hy-win-org">services OS · Sahara Tax Advisory</span>
          <span className="hy-win-user"><span className="hy-win-user-n">Mariam A., Partner</span><span className="hy-win-avatar" aria-hidden="true">MA</span></span>
        </div>
        <div className="hy-tabs" role="tablist" aria-label="Areas">
          {TABS.map((t, i) => (
            <button key={t} type="button" role="tab" className="hy-tab" aria-selected={beat === i} onClick={() => go(i)}>{t}{i === 0 ? ` · ${needs}` : ""}</button>
          ))}
        </div>

        <div className="hy-pane">
          {beat === 0 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Good morning, Mariam</span><span className="hy-pane-status">{needs} need you · 14 days of deadlines</span></div>
              <div className="hy-check">
                <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--bad" aria-hidden="true">!</span><span className="hy-check-l"><strong>FTA notice</strong> · Corniche Capital · reply due tomorrow</span><span className="hy-iv-ref">urgent</span></div>
                <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--warn" aria-hidden="true">!</span><span className="hy-check-l"><strong>Return to approve</strong> · Al Hamra Trading · VAT Q3</span><span className="hy-iv-ref">red-team done</span></div>
                <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--warn" aria-hidden="true">!</span><span className="hy-check-l"><strong>3 draft replies</strong> waiting to be sent</span><span className="hy-iv-ref">inbox</span></div>
                <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--warn" aria-hidden="true">!</span><span className="hy-check-l"><strong>Yesterday&apos;s timesheet</strong> · 6.5h drafted, unconfirmed</span><span className="hy-iv-ref">time</span></div>
                <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--ok" aria-hidden="true">✓</span><span className="hy-check-l">Marina Fit-Out · CT return · due 30 Sep · on track</span><span className="hy-iv-ref">T-15</span></div>
              </div>
              <div className="hy-tiles">
                <div className="hy-tile"><div className="hy-tile-l">Overnight email</div><div className="hy-tile-n">38</div><div className="hy-tile-s">triaged into 6 tasks</div></div>
                <div className="hy-tile"><div className="hy-tile-l">Team capacity</div><div className="hy-tile-n">86%</div><div className="hy-tile-s">2 people running hot</div></div>
                <div className="hy-tile"><div className="hy-tile-l">Due in 14 days</div><div className="hy-tile-n">11</div><div className="hy-tile-s">filings and requests</div></div>
              </div>
            </>
          )}

          {beat === 1 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Inbox · triaged by the inbox agent</span><span className="hy-pane-status">work@ · 38 overnight</span></div>
              <div className="hy-lines">
                <div className="hy-line hy-line--ask"><span className="hy-line-d">09:05</span><span className="hy-line-desc">FTA · Corniche Capital</span><span className="hy-line-ref">Tax authority notice</span><span className="hy-line-st">Critical · 1d</span></div>
                <div className="hy-line"><span className="hy-line-d">08:51</span><span className="hy-line-desc">Al Hamra · bank statements</span><span className="hy-line-ref">Filed to open request</span><span className="hy-line-st">Done</span></div>
                <div className="hy-line"><span className="hy-line-d">08:30</span><span className="hy-line-desc">Marina Fit-Out · CFO</span><span className="hy-line-ref">Question on CT group</span><span className="hy-line-st">High · 2d</span></div>
                <div className="hy-line"><span className="hy-line-d">07:12</span><span className="hy-line-desc">Unknown sender</span><span className="hy-line-ref">Newsletter</span><span className="hy-line-st">Ignored</span></div>
              </div>
              <div className="hy-dec hy-dec--open">
                <div className="hy-dec-row">
                  <span className="hy-dec-id">Agent</span>
                  <div className="hy-dec-body">
                    <span className="hy-dec-h">Voluntary disclosure query on Q1 2026 VAT</span>
                    <span className="hy-dec-p">Sender matched to Corniche Capital by domain. Tone: concerned. Attachment filed and scanned clean. Proposed task for Omar, due tomorrow, with a draft reply citing the return we filed on 28 April.</span>
                  </div>
                </div>
                <div className="hy-dec-actions">
                  {done[1]
                    ? <span className="hy-dec-p"><strong>Task accepted.</strong> Omar is on it, with the draft reply ready for him to review and send.</span>
                    : <><button type="button" className="hy-btn hy-btn--navy" onClick={() => act(1)}>Accept task and draft</button><button type="button" className="hy-btn hy-btn--outline" onClick={() => act(1)}>Reassign</button></>}
                </div>
              </div>
            </>
          )}

          {beat === 2 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Meeting · Marina Fit-Out, CT grouping</span><span className="hy-pane-status">notes pasted 12:10</span></div>
              <div className="hy-why">
                <span className="hy-why-h">Decisions</span>
                <span className="hy-why-p">Form a tax group for the two UAE entities from FY2027. Keep the KSA branch outside the group. Revisit transfer pricing documentation in November.</span>
              </div>
              <div className="hy-check">
                {[
                  ["Draft tax-group eligibility memo", "Omar", "22 Sep"],
                  ["Request FY2025 audited accounts for both entities", "Client portal", "19 Sep"],
                  ["Book TP documentation review", "Mariam", "10 Nov"],
                ].map(([task, who, due]) => (
                  <div className="hy-check-row" key={task}>
                    <span className={`hy-iv-mark ${done[2] ? "hy-iv-mark--ok" : "hy-iv-mark--na"}`} aria-hidden="true">{done[2] ? "✓" : ""}</span>
                    <span className="hy-check-l">{task}</span><span className="hy-iv-ref">{who} · {due}</span>
                  </div>
                ))}
              </div>
              <div className="hy-dec-actions" style={{ paddingLeft: 0 }}>
                {done[2]
                  ? <span className="hy-dec-p"><strong>3 tasks created</strong>, the document request went to the client portal, and the meeting is logged against the client.</span>
                  : <button type="button" className="hy-btn hy-btn--navy" onClick={() => act(2)}>Create 3 tasks</button>}
              </div>
            </>
          )}

          {beat === 3 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Filing · Al Hamra Trading · VAT Q3 2026</span><span className="hy-pane-status">{done[3] ? "Approved · version locked" : "Awaiting partner approval"}</span></div>
              <div className="hy-progress"><span className="hy-progress-l">Checklist</span><span className="hy-progress-track"><span className="hy-progress-fill" style={{ width: done[3] ? "100%" : "94%" }} /></span><span className="hy-progress-n">{done[3] ? "100%" : "94%"}</span></div>
              <div className="hy-check">
                <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--ok" aria-hidden="true">✓</span><span className="hy-check-l">Completeness · 212 of 214 invoices supported</span><span className="hy-iv-ref">data room</span></div>
                <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--ok" aria-hidden="true">✓</span><span className="hy-check-l">Treatments proposed from 3 firm precedents · accepted by Omar</span><span className="hy-iv-ref">characterisation</span></div>
                <div className="hy-check-row hy-iv-warn"><span className="hy-iv-mark hy-iv-mark--warn" aria-hidden="true">!</span><span className="hy-check-l">Red-team: staff accommodation VAT claimed without a MoHRE mandate</span><span className="hy-iv-ref">CD 149</span></div>
                <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--ok" aria-hidden="true">✓</span><span className="hy-check-l">Variance narrative drafted · output VAT up 8.4% on Q2</span><span className="hy-iv-ref">review</span></div>
                <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--ok" aria-hidden="true">✓</span><span className="hy-check-l">Transmittal letter and management representation drafted</span><span className="hy-iv-ref">letters</span></div>
              </div>
              <div className="hy-dec-actions" style={{ paddingLeft: 0 }}>
                {done[3]
                  ? <span className="hy-dec-p"><strong>Approved by Mariam A.</strong> AED 3,150 moved to blocked input tax first. The filed version can never be edited, only superseded.</span>
                  : <button type="button" className="hy-btn hy-btn--blush" onClick={() => act(3)}>Resolve the finding and approve</button>}
              </div>
            </>
          )}

          {beat === 4 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Growth · Desert Rose Logistics</span><span className="hy-pane-status">{done[4] ? "Active client" : "Engagement letter sent"}</span></div>
              <div className="hy-iv-track" aria-hidden="true" style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
                {["Lead", "Qualified", "Proposal", "Letter", "Signed"].map((l, i) => (
                  <span key={l} className={`hy-iv-track-s${i < (done[4] ? 5 : 3) ? " is-done" : ""}${!done[4] && i === 3 ? " is-on" : ""}`}>{l}</span>
                ))}
              </div>
              <div className="hy-doc">
                <div className="hy-doc-head"><span className="hy-doc-sup">ENGAGEMENT LETTER · VAT MONTHLY + CT ANNUAL</span><span className="hy-doc-kind">EL-0412</span></div>
                <div className="hy-doc-meta">Fees AED 7,500 a month · retainer invoiced on the 1st · scope, exclusions and KYC attached</div>
                <div className="hy-doc-rule" />
                <div className="hy-doc-lines">
                  <div className="hy-doc-line"><span>Trade licence and VAT certificate</span><span>read into profile</span></div>
                  <div className="hy-doc-line"><span>Obligations created</span><span>12 VAT · 1 CT</span></div>
                  <div className="hy-doc-line"><span>Signature</span><span>{done[4] ? "signed · SHA-256 sealed" : "awaiting client"}</span></div>
                </div>
              </div>
              <div className="hy-dec-actions" style={{ paddingLeft: 0 }}>
                {done[4]
                  ? <span className="hy-dec-p"><strong>Signed at 16:32.</strong> Audit certificate appended, client onboarding opened, first document request scheduled.</span>
                  : <button type="button" className="hy-btn hy-btn--navy" onClick={() => act(4)}>Show the client signing</button>}
              </div>
              <div className="hy-pane-foot">Opportunities also flags cross-sell gaps: 9 VAT clients with no CT engagement.</div>
            </>
          )}

          {beat === 5 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Timesheet · Tuesday 15 Sep</span><span className="hy-pane-status">{done[5] ? "Confirmed · 6.5h billable" : "Draft · visible only to you"}</span></div>
              <div className="hy-lines">
                <div className="hy-line"><span className="hy-line-d">1.5h</span><span className="hy-line-desc">Corniche Capital</span><span className="hy-line-ref">FTA notice review, reply</span><span className="hy-line-st">Billable</span></div>
                <div className="hy-line"><span className="hy-line-d">1.0h</span><span className="hy-line-desc">Marina Fit-Out</span><span className="hy-line-ref">CT grouping meeting</span><span className="hy-line-st">Billable</span></div>
                <div className="hy-line"><span className="hy-line-d">2.5h</span><span className="hy-line-desc">Al Hamra Trading</span><span className="hy-line-ref">VAT Q3 review, approval</span><span className="hy-line-st">Billable</span></div>
                <div className="hy-line"><span className="hy-line-d">1.5h</span><span className="hy-line-desc">Desert Rose Logistics</span><span className="hy-line-ref">Proposal, letter</span><span className="hy-line-st">Business dev</span></div>
              </div>
              <div className="hy-iv-note">Drafted from today&apos;s tasks, emails, meetings and filings. Each block is capped at 4 hours, and the AI may lower an estimate but never raise one.</div>
              <div className="hy-dec-actions" style={{ paddingLeft: 0 }}>
                {done[5]
                  ? <span className="hy-dec-p"><strong>Confirmed in one tap.</strong> Hours flow to WIP, realisation and the client&apos;s next invoice.</span>
                  : <button type="button" className="hy-btn hy-btn--navy" onClick={() => act(5)}>Confirm 6.5 hours</button>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
