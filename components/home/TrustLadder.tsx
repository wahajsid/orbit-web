/* ── The trust ladder: reads, then drafts, then posts ────────────────
   Owner direction 2026-09-24: approval, not "read-only", is the promise.
   The three steps are the app's connection write modes (app repo,
   lib/ledger/write-mode.ts): observe reads only and every push refuses;
   propose records each write as a draft that leaves Hysaab only once a
   person approves it; execute writes directly, each one recorded as an
   operation. Keep the copy true to that: drafts wait in Hysaab (not in
   the ledger), and nothing here claims an entry can be undone.
   Used on /trust and /accounting, EN and AR (#ladder, linked from
   /check and /how-it-works). Styles: .hw-ladder in app/hysaab-home.css.
   AR-REVIEW: every Arabic string below is a new draft. */

type Locale = "en" | "ar";

type Step = { n: string; mode: string; h: string; p: string; link?: { href: string; label: string } };

const COPY: Record<Locale, { eyebrow: string; h: [string, string]; lede: string; steps: Step[]; arrow: string }> = {
  en: {
    eyebrow: "The trust ladder",
    h: ["Starts read-only.", "Earns write access."],
    lede: "Every connection to your ledger sits on one of three steps. Nothing posts without your approval until you move it up a step, and you can move it back down whenever you like.",
    arrow: "→",
    steps: [
      {
        n: "Step 01", mode: "Observe", h: "Reads.",
        p: "Where every connection starts, and as far as the free Books Check ever goes. Hysaab reads the ledger and compares; nothing is written back.",
        link: { href: "/check", label: "Check your books free" },
      },
      {
        n: "Step 02", mode: "Propose", h: "Drafts.",
        p: "Fixes are prepared as drafts: the journal, the reclassification, the bill to post. Nothing reaches Xero or QuickBooks until you approve it.",
      },
      {
        n: "Step 03", mode: "Execute", h: "Posts.",
        p: "Routine entries post to your ledger directly, inside the approval rules you agreed at setup. Each one is recorded, and anything below the confidence gate still comes to you.",
      },
    ],
  },
  ar: {
    eyebrow: "سلّم الثقة",
    h: ["يبدأ بالقراءة فقط.", "ويكسب صلاحية الكتابة."],
    lede: "كل ربط مع دفتر الأستاذ يقف على واحدة من ثلاث درجات. لا يُرحَّل شيء دون موافقتك حتى ترفعه أنت درجة، ويمكنك إنزاله متى شئت.",
    arrow: "←",
    steps: [
      {
        n: "الدرجة 01", mode: "المراقبة", h: "يقرأ.",
        p: "هنا يبدأ كل ربط، وعندها يتوقف فحص الدفاتر المجاني دائمًا. يقرأ Hysaab دفتر الأستاذ ويقارن، ولا يُكتب فيه شيء.",
        link: { href: "/check", label: "افحص دفاترك مجانًا (بالإنجليزية)" },
      },
      {
        n: "الدرجة 02", mode: "الاقتراح", h: "يُعدّ المسودات.",
        p: "تُعدّ التصحيحات مسوداتٍ: القيد، وإعادة التصنيف، والفاتورة المراد ترحيلها. ولا يصل شيء إلى Xero أو QuickBooks حتى توافق عليه.",
      },
      {
        n: "الدرجة 03", mode: "التنفيذ", h: "يُرحِّل.",
        p: "تُرحَّل القيود الروتينية إلى دفترك مباشرة، ضمن قواعد الموافقة التي اتُّفق عليها عند الإعداد. تُسجَّل كل عملية، وما يقع دون بوابة الثقة يبقى يأتي إليك.",
      },
    ],
  },
};

export function TrustLadder({ locale = "en" }: { locale?: Locale }) {
  const c = COPY[locale];
  return (
    <section id="ladder" aria-labelledby="ladder-h">
      <div className="hw-wrap hw-section">
        <div className="hw-heading">
          <div>
            <p className="hw-eyebrow">{c.eyebrow}</p>
            <h2 id="ladder-h">{c.h[0]}<br /><span>{c.h[1]}</span></h2>
          </div>
          <p>{c.lede}</p>
        </div>
        <ol className="hw-ladder">
          {c.steps.map((s) => (
            <li key={s.n}>
              <p className="hw-ladder-top"><span className="hw-mono">{s.n}</span><span className="hw-ladder-mode">{s.mode}</span></p>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
              {s.link && <a className="hw-link" href={s.link.href}>{s.link.label} <span aria-hidden="true">{c.arrow}</span></a>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
