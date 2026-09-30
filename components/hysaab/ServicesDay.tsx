"use client";

/* ── Hysaab Practice: a day in the firm ──────────────────────────
   Six beats of one working day, each driving a product window. Every
   capability shown exists in the product (Oblique OS inventory,
   2026-09-15): inbox triage, meeting notes to actions, filing workbench
   with red-team review, proposals and e-signature, AI-drafted timesheet.
   Each pane has one action a person takes, because nothing the AI
   proposes counts until someone confirms it. Illustrative data.
   English is the source of truth; the Arabic table (/ar/firms) must
   match its shape. Client and firm names, IDs and figures stay Latin. */

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "../Wordmark";

type Locale = "en" | "ar";
type Tone = "ok" | "bad" | "warn";
type R = React.ReactNode;

const EN = {
  beats: [
    { t: "07:30", h: "The brief is waiting.", p: "Before anyone opens email, My Day lists what needs a person: overdue tasks, approvals, unsent drafts and every deadline in the next two weeks." },
    { t: "09:05", h: "An FTA notice lands in the shared inbox.", p: "The inbox agent matches the sender to the client, files the attachment, reads the urgency, spots a tax-authority notice and raises an urgent task with a draft reply. Nobody sorted anything." },
    { t: "11:00", h: "A client meeting turns into work.", p: "A one-page prep brief is ready beforehand. Afterwards the notes become decisions and action items, each with an owner and a due date, proposed as tasks." },
    { t: "14:00", h: "The return is checked before the partner sees it.", p: "The filing workbench tests completeness, proposes tax treatments from the firm's own precedents, then runs a red-team review. The partner approves with the findings in front of her." },
    { t: "16:30", h: "A prospect signs.", p: "The proposal became an engagement letter, sent for signature inside the OS. Signed, sealed with an audit certificate, and the client moves to active with its obligations set." },
    { t: "17:45", h: "The timesheet writes itself.", p: "Hours are drafted from what you actually did today. The AI may keep or lower an estimate, never raise it, and nothing counts until you confirm." },
  ],
  pause: "Pause the day", play: "Play the day",
  modePlaying: "Replaying a Tuesday. Click anything to take over.",
  modeControls: "Your turn. Press the buttons in the window.",
  of: (n: number, all: number) => `${n} of ${all}`,
  org: "Hysaab Practice · Sahara Tax Advisory", user: "Mariam A., Partner", areas: "Areas",
  tabs: ["My Day", "Inbox", "Meetings", "Filings", "Growth", "Time"],
  // 0 · my day
  dayTitle: "Good morning, Mariam", dayStatus: (n: number) => `${n} need you · 14 days of deadlines`,
  dayRows: [
    ["bad", <><strong>FTA notice</strong> · Corniche Capital · reply due tomorrow</>, "urgent"],
    ["warn", <><strong>Return to approve</strong> · Al Hamra Trading · VAT Q3</>, "red-team done"],
    ["warn", <><strong>3 draft replies</strong> waiting to be sent</>, "inbox"],
    ["warn", <><strong>Yesterday&apos;s timesheet</strong> · 6.5h drafted, unconfirmed</>, "time"],
    ["ok", <>Marina Fit-Out · CT return · due 30 Sep · on track</>, "T-15"],
  ] as [Tone, R, string][],
  dayTiles: [["Overnight email", "38", "triaged into 6 tasks"], ["Team capacity", "86%", "2 people running hot"], ["Due in 14 days", "11", "filings and requests"]],
  // 1 · inbox
  inTitle: "Inbox · triaged by the inbox agent", inStatus: "work@ · 38 overnight",
  inLines: [
    ["09:05", "FTA · Corniche Capital", "Tax authority notice", "Critical · 1d", true],
    ["08:51", "Al Hamra · bank statements", "Filed to open request", "Done"],
    ["08:30", "Marina Fit-Out · CFO", "Question on CT group", "High · 2d"],
    ["07:12", "Unknown sender", "Newsletter", "Ignored"],
  ] as [string, string, string, string, boolean?][],
  agent: "Agent",
  inH: "Voluntary disclosure query on Q1 2026 VAT",
  inP: "Sender matched to Corniche Capital by domain. Tone: concerned. Attachment filed and scanned clean. Proposed task for Omar, due tomorrow, with a draft reply citing the return we filed on 28 April.",
  inDone: <><strong>Task accepted.</strong> Omar is on it, with the draft reply ready for him to review and send.</>,
  inAccept: "Accept task and draft", inReassign: "Reassign",
  // 2 · meeting
  mtTitle: "Meeting · Marina Fit-Out, CT grouping", mtStatus: "notes pasted 12:10",
  mtH: "Decisions",
  mtP: "Form a tax group for the two UAE entities from FY2027. Keep the KSA branch outside the group. Revisit transfer pricing documentation in November.",
  mtTasks: [
    ["Draft tax-group eligibility memo", "Omar", "22 Sep"],
    ["Request FY2025 audited accounts for both entities", "Client portal", "19 Sep"],
    ["Book TP documentation review", "Mariam", "10 Nov"],
  ],
  mtDone: <><strong>3 tasks created</strong>, the document request went to the client portal, and the meeting is logged against the client.</>,
  mtBtn: "Create 3 tasks",
  // 3 · filing
  flTitle: "Filing · Al Hamra Trading · VAT Q3 2026", flDone: "Approved · version locked", flWait: "Awaiting partner approval", checklist: "Checklist",
  flRows: [
    ["ok", "Completeness · 212 of 214 invoices supported", "data room"],
    ["ok", "Treatments proposed from 3 firm precedents · accepted by Omar", "characterisation"],
    ["warn", "Red-team: staff accommodation VAT claimed without a MoHRE mandate", "CD 149"],
    ["ok", "Variance narrative drafted · output VAT up 8.4% on Q2", "review"],
    ["ok", "Transmittal letter and management representation drafted", "letters"],
  ] as [Tone, string, string][],
  flApproved: <><strong>Approved by Mariam A.</strong> AED 3,150 moved to blocked input tax first. The filed version can never be edited, only superseded.</>,
  flBtn: "Resolve the finding and approve",
  // 4 · growth
  grTitle: "Growth · Desert Rose Logistics", grDone: "Active client", grWait: "Engagement letter sent",
  grTrack: ["Lead", "Qualified", "Proposal", "Letter", "Signed"],
  grSup: "ENGAGEMENT LETTER · VAT MONTHLY + CT ANNUAL",
  grMeta: "Fees AED 7,500 a month · retainer invoiced on the 1st · scope, exclusions and KYC attached",
  grLines: [["Trade licence and VAT certificate", "read into profile"], ["Obligations created", "12 VAT · 1 CT"]],
  grSig: "Signature", grSigned: "signed · SHA-256 sealed", grAwait: "awaiting client",
  grSignedP: <><strong>Signed at 16:32.</strong> Audit certificate appended, client onboarding opened, first document request scheduled.</>,
  grBtn: "Show the client signing",
  grFoot: "Opportunities also flags cross-sell gaps: 9 VAT clients with no CT engagement.",
  // 5 · time
  tmTitle: "Timesheet · Tuesday 15 Sep", tmDone: "Confirmed · 6.5h billable", tmWait: "Draft · visible only to you",
  tmLines: [
    ["1.5h", "Corniche Capital", "FTA notice review, reply", "Billable"],
    ["1.0h", "Marina Fit-Out", "CT grouping meeting", "Billable"],
    ["2.5h", "Al Hamra Trading", "VAT Q3 review, approval", "Billable"],
    ["1.5h", "Desert Rose Logistics", "Proposal, letter", "Business dev"],
  ],
  tmNote: "Drafted from today's tasks, emails, meetings and filings. Each block is capped at 4 hours, and the AI may lower an estimate but never raise one.",
  tmConfirmed: <><strong>Confirmed in one tap.</strong> Hours flow to WIP, realisation and the client&apos;s next invoice.</>,
  tmBtn: "Confirm 6.5 hours",
};

type Strings = typeof EN;

/* AR-REVIEW: every string in the Arabic day in the firm. */
const AR: Strings = {
  beats: [
    { t: "07:30", h: "الموجز بانتظارك.", p: "قبل أن يفتح أحد بريده، تعرض «يومي» ما يحتاج إلى شخص: المهام المتأخرة، والاعتمادات، والمسودات غير المرسلة، وكل موعد نهائي في الأسبوعين القادمين." },
    { t: "09:05", h: "إشعار من الهيئة الاتحادية للضرائب يصل إلى البريد المشترك.", p: "يطابق وكيل البريد المرسل مع العميل، ويؤرشف المرفق، ويقرأ درجة الإلحاح، ويتعرف على إشعار من جهة ضريبية فيُنشئ مهمة عاجلة مع مسودة رد. لم يفرز أحد شيئًا." },
    { t: "11:00", h: "اجتماع مع عميل يتحول إلى عمل.", p: "موجز تحضيري من صفحة واحدة جاهز مسبقًا. وبعد الاجتماع تصبح الملاحظات قرارات وبنود عمل، لكلٍّ منها مسؤول وموعد، مقترحة كمهام." },
    { t: "14:00", h: "الإقرار يُفحص قبل أن تراه الشريكة.", p: "تختبر منصة الإقرارات الاكتمال، وتقترح المعالجات الضريبية من سوابق المكتب نفسه، ثم تُجري مراجعة نقدية. وتعتمد الشريكة والملاحظات أمامها." },
    { t: "16:30", h: "عميل محتمل يوقّع.", p: "تحوّل العرض إلى خطاب ارتباط أُرسل للتوقيع داخل النظام. وُقّع، وخُتم بشهادة تدقيق، وانتقل العميل إلى الحالة النشطة مع تحديد التزاماته." },
    { t: "17:45", h: "سجل الوقت يكتب نفسه.", p: "تُصاغ الساعات مما فعلته اليوم فعلًا. يمكن للذكاء الاصطناعي أن يُبقي التقدير أو يخفّضه، ولا يرفعه أبدًا، ولا يُحتسب شيء حتى تؤكده." },
  ],
  pause: "أوقف اليوم مؤقتًا", play: "شغّل اليوم",
  modePlaying: "نعيد عرض يوم ثلاثاء. انقر أي شيء لتتولى الأمر.",
  modeControls: "دورك. اضغط الأزرار في النافذة.",
  of: (n: number, all: number) => `${n} من ${all}`,
  org: "Hysaab Practice · Sahara Tax Advisory", user: "مريم أ.، شريكة", areas: "المجالات",
  tabs: ["يومي", "البريد", "الاجتماعات", "الإقرارات", "النمو", "الوقت"],
  dayTitle: "صباح الخير يا مريم", dayStatus: (n: number) => `${n} تحتاجك · مواعيد 14 يومًا`,
  dayRows: [
    ["bad", <><strong>إشعار من الهيئة</strong> · Corniche Capital · الرد مستحق غدًا</>, "عاجل"],
    ["warn", <><strong>إقرار للاعتماد</strong> · Al Hamra Trading · ضريبة القيمة المضافة، الربع 3</>, "المراجعة النقدية تمّت"],
    ["warn", <><strong>3 مسودات ردود</strong> بانتظار الإرسال</>, "البريد"],
    ["warn", <><strong>سجل وقت الأمس</strong> · 6.5 ساعة مصاغة، غير مؤكدة</>, "الوقت"],
    ["ok", <>Marina Fit-Out · إقرار ضريبة الشركات · مستحق 30 سبتمبر · في موعده</>, "T-15"],
  ],
  dayTiles: [["بريد الليلة", "38", "فُرز في 6 مهام"], ["سعة الفريق", "86%", "شخصان تحت ضغط"], ["مستحق خلال 14 يومًا", "11", "إقرارات وطلبات"]],
  inTitle: "البريد · فرزه وكيل البريد", inStatus: "work@ · 38 خلال الليل",
  inLines: [
    ["09:05", "الهيئة · Corniche Capital", "إشعار من جهة ضريبية", "حرج · يوم", true],
    ["08:51", "Al Hamra · كشوف بنكية", "أُرشف في طلب مفتوح", "تم"],
    ["08:30", "Marina Fit-Out · المدير المالي", "سؤال عن مجموعة ضريبة الشركات", "مرتفع · يومان"],
    ["07:12", "مرسل غير معروف", "نشرة بريدية", "تم تجاهله"],
  ],
  agent: "الوكيل",
  inH: "استفسار إفصاح طوعي عن ضريبة القيمة المضافة للربع الأول 2026",
  inP: "طوبق المرسل مع Corniche Capital عبر النطاق. النبرة: قلقة. أُرشف المرفق وفُحص فكان سليمًا. مهمة مقترحة لعمر، مستحقة غدًا، مع مسودة رد تستشهد بالإقرار الذي قدمناه في 28 أبريل.",
  inDone: <><strong>قُبلت المهمة.</strong> عمر يتولاها، ومسودة الرد جاهزة ليراجعها ويرسلها.</>,
  inAccept: "اقبل المهمة والمسودة", inReassign: "أعد الإسناد",
  mtTitle: "اجتماع · Marina Fit-Out، تجميع ضريبة الشركات", mtStatus: "أُلصقت الملاحظات 12:10",
  mtH: "القرارات",
  mtP: "تكوين مجموعة ضريبية للكيانين الإماراتيين من السنة المالية 2027. إبقاء فرع السعودية خارج المجموعة. مراجعة وثائق أسعار التحويل في نوفمبر.",
  mtTasks: [
    ["صياغة مذكرة أهلية المجموعة الضريبية", "عمر", "22 سبتمبر"],
    ["طلب الحسابات المدققة للسنة المالية 2025 للكيانين", "بوابة العميل", "19 سبتمبر"],
    ["حجز مراجعة وثائق أسعار التحويل", "مريم", "10 نوفمبر"],
  ],
  mtDone: <><strong>أُنشئت 3 مهام</strong>، وذهب طلب المستندات إلى بوابة العميل، وسُجّل الاجتماع على العميل.</>,
  mtBtn: "أنشئ 3 مهام",
  flTitle: "إقرار · Al Hamra Trading · ضريبة القيمة المضافة، الربع 3 2026", flDone: "معتمد · النسخة مقفلة", flWait: "بانتظار اعتماد الشريكة", checklist: "قائمة التحقق",
  flRows: [
    ["ok", "الاكتمال · 212 من 214 فاتورة مدعومة", "غرفة البيانات"],
    ["ok", "معالجات مقترحة من 3 سوابق للمكتب · قبلها عمر", "التوصيف"],
    ["warn", "المراجعة النقدية: ضريبة سكن الموظفين مطالَب بها دون تفويض من وزارة الموارد البشرية والتوطين", "القرار 149"],
    ["ok", "شرح الفروقات مُصاغ · ضريبة المخرجات ارتفعت 8.4% عن الربع 2", "المراجعة"],
    ["ok", "خطاب الإحالة وإقرار الإدارة مُصاغان", "الخطابات"],
  ],
  flApproved: <><strong>اعتمدته مريم أ.</strong> نُقل 3,150 درهمًا إلى ضريبة المدخلات المحظورة أولًا. النسخة المقدَّمة لا تُعدَّل أبدًا، بل تحل محلها نسخة لاحقة.</>,
  flBtn: "عالج الملاحظة واعتمد",
  grTitle: "النمو · Desert Rose Logistics", grDone: "عميل نشط", grWait: "أُرسل خطاب الارتباط",
  grTrack: ["محتمل", "مؤهَّل", "عرض", "خطاب", "موقَّع"],
  grSup: "خطاب ارتباط · ضريبة القيمة المضافة شهريًا + ضريبة الشركات سنويًا",
  grMeta: "الأتعاب 7,500 درهم شهريًا · يُفوتر المقدَّم في الأول من الشهر · النطاق والاستثناءات وملف «اعرف عميلك» مرفقة",
  grLines: [["الرخصة التجارية وشهادة ضريبة القيمة المضافة", "قُرئت في الملف"], ["الالتزامات المنشأة", "12 قيمة مضافة · 1 شركات"]],
  grSig: "التوقيع", grSigned: "موقَّع · مختوم SHA-256", grAwait: "بانتظار العميل",
  grSignedP: <><strong>وُقّع في 16:32.</strong> أُلحقت شهادة التدقيق، وفُتح تأهيل العميل، وجُدول أول طلب مستندات.</>,
  grBtn: "اعرض توقيع العميل",
  grFoot: "وتكشف الفرص أيضًا فجوات البيع المتقاطع: 9 عملاء ضريبة قيمة مضافة بلا ارتباط ضريبة شركات.",
  tmTitle: "سجل الوقت · الثلاثاء 15 سبتمبر", tmDone: "مؤكَّد · 6.5 ساعة قابلة للفوترة", tmWait: "مسودة · مرئية لك فقط",
  tmLines: [
    ["1.5 س", "Corniche Capital", "مراجعة إشعار الهيئة، والرد", "للفوترة"],
    ["1.0 س", "Marina Fit-Out", "اجتماع تجميع ضريبة الشركات", "للفوترة"],
    ["2.5 س", "Al Hamra Trading", "مراجعة الربع 3 واعتماده", "للفوترة"],
    ["1.5 س", "Desert Rose Logistics", "العرض والخطاب", "تطوير أعمال"],
  ],
  tmNote: "مصاغ من مهام اليوم ورسائله واجتماعاته وإقراراته. كل كتلة محدودة بأربع ساعات، ويمكن للذكاء الاصطناعي تخفيض التقدير لا رفعه أبدًا.",
  tmConfirmed: <><strong>أُكّد بنقرة واحدة.</strong> تنتقل الساعات إلى الأعمال قيد التنفيذ ونسبة التحصيل وفاتورة العميل التالية.</>,
  tmBtn: "أكّد 6.5 ساعة",
};

const S: Record<Locale, Strings> = { en: EN, ar: AR };

const ADVANCE_MS = 5200;

const MARK: Record<Tone, string> = { ok: "✓", bad: "!", warn: "!" };

export function ServicesDay({ locale = "en" }: { locale?: Locale }) {
  const s = S[locale];
  const BEATS = s.beats;
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const playRef = useRef(playing);
  playRef.current = playing;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => { if (playRef.current) setBeat((b) => (b + 1) % BEATS.length); }, ADVANCE_MS);
    return () => clearInterval(id);
  }, [playing, BEATS.length]);

  const go = (n: number) => { setBeat(n); setPlaying(false); };
  const act = (n: number) => { setDone((d) => ({ ...d, [n]: true })); setPlaying(false); };
  const needs = 5 - Object.values(done).filter(Boolean).length;

  return (
    <div className="hy-demo" id="day">
      <div className="hy-beats">
        <div className="hy-beats-ctl">
          <button type="button" className="hy-btn hy-btn--navy" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
            {playing ? s.pause : s.play}
          </button>
          <span className="hy-beats-mode">{playing ? s.modePlaying : s.modeControls}</span>
          <span className="hy-beats-n hy-num">{s.of(beat + 1, BEATS.length)}</span>
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
          <span className="hy-win-org">{s.org}</span>
          <span className="hy-win-user"><span className="hy-win-user-n">{s.user}</span><span className="hy-win-avatar" aria-hidden="true">MA</span></span>
        </div>
        <div className="hy-tabs" role="tablist" aria-label={s.areas}>
          {s.tabs.map((t, i) => (
            <button key={t} type="button" role="tab" className="hy-tab" aria-selected={beat === i} onClick={() => go(i)}>{t}{i === 0 ? ` · ${needs}` : ""}</button>
          ))}
        </div>

        <div className="hy-pane">
          {beat === 0 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.dayTitle}</span><span className="hy-pane-status">{s.dayStatus(needs)}</span></div>
              <div className="hy-check">
                {s.dayRows.map(([tone, l, ref], i) => (
                  <div key={i} className="hy-check-row"><span className={`hy-iv-mark hy-iv-mark--${tone}`} aria-hidden="true">{MARK[tone]}</span><span className="hy-check-l">{l}</span><span className="hy-iv-ref">{ref}</span></div>
                ))}
              </div>
              <div className="hy-tiles">
                {s.dayTiles.map(([l, n, sub]) => <div key={l} className="hy-tile"><div className="hy-tile-l">{l}</div><div className="hy-tile-n">{n}</div><div className="hy-tile-s">{sub}</div></div>)}
              </div>
            </>
          )}

          {beat === 1 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.inTitle}</span><span className="hy-pane-status">{s.inStatus}</span></div>
              <div className="hy-lines">
                {s.inLines.map(([d, desc, ref, st, ask]) => (
                  <div key={d} className={`hy-line${ask ? " hy-line--ask" : ""}`}><span className="hy-line-d">{d}</span><span className="hy-line-desc">{desc}</span><span className="hy-line-ref">{ref}</span><span className="hy-line-st">{st}</span></div>
                ))}
              </div>
              <div className="hy-dec hy-dec--open">
                <div className="hy-dec-row">
                  <span className="hy-dec-id">{s.agent}</span>
                  <div className="hy-dec-body">
                    <span className="hy-dec-h">{s.inH}</span>
                    <span className="hy-dec-p">{s.inP}</span>
                  </div>
                </div>
                <div className="hy-dec-actions">
                  {done[1]
                    ? <span className="hy-dec-p">{s.inDone}</span>
                    : <><button type="button" className="hy-btn hy-btn--navy" onClick={() => act(1)}>{s.inAccept}</button><button type="button" className="hy-btn hy-btn--outline" onClick={() => act(1)}>{s.inReassign}</button></>}
                </div>
              </div>
            </>
          )}

          {beat === 2 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.mtTitle}</span><span className="hy-pane-status">{s.mtStatus}</span></div>
              <div className="hy-why">
                <span className="hy-why-h">{s.mtH}</span>
                <span className="hy-why-p">{s.mtP}</span>
              </div>
              <div className="hy-check">
                {s.mtTasks.map(([task, who, due]) => (
                  <div className="hy-check-row" key={task}>
                    <span className={`hy-iv-mark ${done[2] ? "hy-iv-mark--ok" : "hy-iv-mark--na"}`} aria-hidden="true">{done[2] ? "✓" : ""}</span>
                    <span className="hy-check-l">{task}</span><span className="hy-iv-ref">{who} · {due}</span>
                  </div>
                ))}
              </div>
              <div className="hy-dec-actions" style={{ paddingInlineStart: 0 }}>
                {done[2]
                  ? <span className="hy-dec-p">{s.mtDone}</span>
                  : <button type="button" className="hy-btn hy-btn--navy" onClick={() => act(2)}>{s.mtBtn}</button>}
              </div>
            </>
          )}

          {beat === 3 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.flTitle}</span><span className="hy-pane-status">{done[3] ? s.flDone : s.flWait}</span></div>
              <div className="hy-progress"><span className="hy-progress-l">{s.checklist}</span><span className="hy-progress-track"><span className="hy-progress-fill" style={{ width: done[3] ? "100%" : "94%" }} /></span><span className="hy-progress-n">{done[3] ? "100%" : "94%"}</span></div>
              <div className="hy-check">
                {s.flRows.map(([tone, l, ref]) => (
                  <div key={l} className={`hy-check-row${tone === "warn" ? " hy-iv-warn" : ""}`}><span className={`hy-iv-mark hy-iv-mark--${tone}`} aria-hidden="true">{MARK[tone]}</span><span className="hy-check-l">{l}</span><span className="hy-iv-ref">{ref}</span></div>
                ))}
              </div>
              <div className="hy-dec-actions" style={{ paddingInlineStart: 0 }}>
                {done[3]
                  ? <span className="hy-dec-p">{s.flApproved}</span>
                  : <button type="button" className="hy-btn hy-btn--blush" onClick={() => act(3)}>{s.flBtn}</button>}
              </div>
            </>
          )}

          {beat === 4 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.grTitle}</span><span className="hy-pane-status">{done[4] ? s.grDone : s.grWait}</span></div>
              <div className="hy-iv-track" aria-hidden="true" style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
                {s.grTrack.map((l, i) => (
                  <span key={l} className={`hy-iv-track-s${i < (done[4] ? 5 : 3) ? " is-done" : ""}${!done[4] && i === 3 ? " is-on" : ""}`}>{l}</span>
                ))}
              </div>
              <div className="hy-doc">
                <div className="hy-doc-head"><span className="hy-doc-sup">{s.grSup}</span><span className="hy-doc-kind">EL-0412</span></div>
                <div className="hy-doc-meta">{s.grMeta}</div>
                <div className="hy-doc-rule" />
                <div className="hy-doc-lines">
                  {s.grLines.map(([k, v]) => <div key={k} className="hy-doc-line"><span>{k}</span><span>{v}</span></div>)}
                  <div className="hy-doc-line"><span>{s.grSig}</span><span>{done[4] ? s.grSigned : s.grAwait}</span></div>
                </div>
              </div>
              <div className="hy-dec-actions" style={{ paddingInlineStart: 0 }}>
                {done[4]
                  ? <span className="hy-dec-p">{s.grSignedP}</span>
                  : <button type="button" className="hy-btn hy-btn--navy" onClick={() => act(4)}>{s.grBtn}</button>}
              </div>
              <div className="hy-pane-foot">{s.grFoot}</div>
            </>
          )}

          {beat === 5 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.tmTitle}</span><span className="hy-pane-status">{done[5] ? s.tmDone : s.tmWait}</span></div>
              <div className="hy-lines">
                {s.tmLines.map(([d, desc, ref, st]) => (
                  <div key={desc} className="hy-line"><span className="hy-line-d">{d}</span><span className="hy-line-desc">{desc}</span><span className="hy-line-ref">{ref}</span><span className="hy-line-st">{st}</span></div>
                ))}
              </div>
              <div className="hy-iv-note">{s.tmNote}</div>
              <div className="hy-dec-actions" style={{ paddingInlineStart: 0 }}>
                {done[5]
                  ? <span className="hy-dec-p">{s.tmConfirmed}</span>
                  : <button type="button" className="hy-btn hy-btn--navy" onClick={() => act(5)}>{s.tmBtn}</button>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
