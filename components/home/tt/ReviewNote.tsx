"use client";

/* ── A review note: concern, recommendation, evidence, your call ──────
   Sample data from the demo's D-118. The two buttons only record the
   choice on this page; nothing is sent anywhere. */

import { useState } from "react";
import { Tm, type Locale } from "./Wp";

const T = {
  en: {
    aria: "Example review note, sample data",
    head: <>Review note <b>RN-118</b> · Decision required</>,
    sample: "Sample data",
    concern: "Concern", concernH: "Coding below confidence threshold",
    rec: "Recommendation", recP: "Gray Mackenzie, AED 14,720. Proposed Office consumables; history suggests Staff welfare.",
    ev: "Evidence", evP: "61% of past spend with this supplier went to Staff welfare.",
    call: "Your call", accept: "Accept recommendation", keep: "Keep and give a reason",
    accepted: "Recoded to Staff welfare. Reason kept on the record.",
    kept: "Kept as Office consumables. Your reason is required and kept on the record.",
    cleared: "Cleared",
  },
  /* AR-REVIEW: the review note */
  ar: {
    aria: "مثال على ملاحظة مراجعة، بيانات تجريبية",
    head: <>ملاحظة مراجعة <b><bdi>RN-118</bdi></b> · مطلوب قرار</>,
    sample: "بيانات تجريبية",
    concern: "مصدر القلق", concernH: "ترميز دون عتبة الثقة",
    rec: "التوصية", recP: "Gray Mackenzie، 14,720 درهمًا. المقترح مستلزمات مكتبية؛ والسجل يرجّح رفاه الموظفين.",
    ev: "الدليل", evP: "61% من الإنفاق السابق مع هذا المورّد ذهب إلى رفاه الموظفين.",
    call: "قرارك", accept: "اقبل التوصية", keep: "أبقِه واذكر السبب",
    accepted: "أُعيد ترميزه إلى رفاه الموظفين. والسبب محفوظ في السجل.",
    kept: "أُبقي على مستلزمات مكتبية. سببك مطلوب ومحفوظ في السجل.",
    cleared: "أُغلقت",
  },
};

export function ReviewNote({ locale = "en" }: { locale?: Locale }) {
  const t = T[locale];
  const [done, setDone] = useState<string | null>(null);
  return (
    <div className="tt-rn" aria-label={t.aria}>
      <div className="tt-rn-h"><span>{t.head}</span><span>{t.sample}</span></div>
      <div className="tt-rn-row"><span className="tt-rn-k">{t.concern}</span><div><b>{t.concernH}</b><span className="tt-rn-conf"><i style={{ width: 74 }} /><bdi>74%</bdi></span></div></div>
      <div className="tt-rn-row"><span className="tt-rn-k">{t.rec}</span><span>{t.recP}</span></div>
      <div className="tt-rn-row"><span className="tt-rn-k">{t.ev}</span><span>{t.evP}</span></div>
      <div className="tt-rn-row">
        <span className="tt-rn-k">{t.call}</span>
        <span className="tt-rn-acts">
          <button type="button" className="hw-btn hw-btn--navy" onClick={() => setDone(t.accepted)}>{t.accept}</button>
          <button type="button" className="hw-btn tt-btn-line" onClick={() => setDone(t.kept)}>{t.keep}</button>
        </span>
      </div>
      {done && <div className="tt-rn-row" role="status"><span className="tt-rn-k">{t.cleared}</span><span><Tm m="P" /> {done}</span></div>}
    </div>
  );
}
