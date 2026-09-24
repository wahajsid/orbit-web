/* ── The trust ladder: reads, then drafts, then posts ────────────────
   Owner direction 2026-09-24: approval, not "read-only", is the promise.
   The three steps are the app's connection write modes (app repo,
   lib/ledger/write-mode.ts): observe reads only and every push refuses;
   propose records each write as a draft that leaves Hysaab only once a
   person approves it (Books Check fix drafts sit in Xero as unposted
   drafts); execute writes directly, each one recorded as an operation.
   Owner 2026-09-24: approval is not forever. The ideal state is a
   trial on drafts, then routine journals post on their own. Nothing
   here claims an entry can be undone.
   Used on /trust and /accounting, EN and AR (#ladder, linked from
   /check and /how-it-works). Styles: .hw-ladder in app/hysaab-home.css.
   AR-REVIEW: every Arabic string below is a new draft. */

type Locale = "en" | "ar";

type Step = { n: string; mode: string; h: string; p: string; link?: { href: string; label: string } };

const COPY: Record<Locale, { eyebrow: string; h: [string, string]; lede: string; steps: Step[]; arrow: string }> = {
  en: {
    eyebrow: "The trust ladder",
    h: ["Starts read-only.", "Earns write access."],
    lede: "Every connection to your ledger sits on one of three steps. You decide when it moves up, and you can move it back down whenever you like. Most teams trial on drafts, then let routine journals post.",
    arrow: "→",
    steps: [
      {
        n: "Step 01", mode: "Observe", h: "Reads.",
        p: "Where every connection starts, and as far as the free Books Check ever goes. Hysaab reads the ledger and compares; nothing is written back.",
        link: { href: "/check", label: "Check your books free" },
      },
      {
        n: "Step 02", mode: "Propose · the trial", h: "Drafts.",
        p: "During the trial, fixes are prepared as drafts: the journal, the reclassification, the bill to post. They wait in Hysaab, or as unposted drafts in your ledger, until you approve each one. You see exactly how Hysaab works before it posts anything.",
      },
      {
        n: "Step 03", mode: "Execute · after the trial", h: "Posts.",
        p: "Once the trial has earned it, routine journals post on their own, inside the rules you agreed. You stop approving every entry. Each one is recorded, and anything unusual or below the confidence gate still comes to you.",
      },
    ],
  },
  ar: {
    eyebrow: "سلّم الثقة",
    h: ["يبدأ بالقراءة فقط.", "ويكسب صلاحية الكتابة."],
    lede: "كل ربط مع دفتر الأستاذ يقف على واحدة من ثلاث درجات. أنت تقرر متى يرتفع درجة، ويمكنك إنزاله متى شئت. تبدأ معظم الفرق بفترة تجربة على المسودات، ثم تسمح بترحيل القيود الروتينية.",
    arrow: "←",
    steps: [
      {
        n: "الدرجة 01", mode: "المراقبة", h: "يقرأ.",
        p: "هنا يبدأ كل ربط، وعندها يتوقف فحص الدفاتر المجاني دائمًا. يقرأ Hysaab دفتر الأستاذ ويقارن، ولا يُكتب فيه شيء.",
        link: { href: "/check", label: "افحص دفاترك مجانًا (بالإنجليزية)" },
      },
      {
        n: "الدرجة 02", mode: "الاقتراح · فترة التجربة", h: "يُعدّ المسودات.",
        p: "خلال فترة التجربة تُعدّ التصحيحات مسوداتٍ: القيد، وإعادة التصنيف، والفاتورة المراد ترحيلها. وتنتظر في Hysaab، أو مسوداتٍ غير مُرحَّلة في دفترك، حتى توافق على كل منها، فترى بالضبط كيف يعمل Hysaab قبل أن يُرحِّل أي شيء.",
      },
      {
        n: "الدرجة 03", mode: "التنفيذ · بعد التجربة", h: "يُرحِّل.",
        p: "بعد أن تثبت التجربة جدارتها، تُرحَّل القيود الروتينية تلقائيًا ضمن القواعد التي اتفقتم عليها، فلا تعود بحاجة إلى اعتماد كل قيد. تُسجَّل كل عملية، ويبقى ما هو غير معتاد أو دون بوابة الثقة يأتي إليك.",
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
