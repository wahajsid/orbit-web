/* ── /access and /ar/access (owner decision 2026-09-30) ──────────────
   Hysaab is invite-only. One page in either language: the inner-page
   shell (PageShell, the paper-and-grid hero of PageHero with the phrase
   on the highlighter), the key line (heading + lede read as one), what happens next, and the form
   beside it so it is in view on arrival. Three short notes below. The
   closing band is off: its button would point back here.
   Tone "By invitation": exclusive but never flaunted. No waitlist, no
   counts, no queue positions. Styles: app/access.css (ra-*). */

import { PageShell } from "@/components/home/PageShell";
import { KineticTitle } from "@/components/motion/Kinetic";
import { RequestAccessForm } from "./RequestAccessForm";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { KEY_TAIL, type Locale } from "@/lib/access";

const T = {
  en: {
    eyebrow: "By invitation",
    title: <>Hysaab is opening<br /><span>by invitation.</span></>,
    next: "When yours comes up, we send an invitation to your work email. In the meantime, the free Books Check is open to anyone: a read-only look at your own books, with nothing written to your ledger.",
    check: "Check your books free", demo: "Book a demo", arrow: "→",
    notesHead: "Before you ask",
    notes: [
      ["Why by invitation", "Each new workspace is connected to your accounting system, and its approval rules are agreed with you, before the first month. We open workspaces at the pace we can do that properly."],
      ["What we ask for", "Your accounting system, volume, country and role tell us how your workspace should be set up. We use them to review your request and to write to you about it."],
      ["The faster route", "A 20-minute demo with the team, on your own books if you like. It does not replace your request; it tells us more about it."],
    ] as [string, string][],
  },
  /* AR-REVIEW: every Arabic string on this page. */
  ar: {
    eyebrow: "بالدعوة",
    title: <>يفتح Hysaab أبوابه<br /><span>بالدعوة.</span></>,
    next: "وحين يحين دور طلبك، نرسل دعوة إلى بريد عملك. وإلى ذلك الحين، فحص الدفاتر المجاني متاح للجميع: نظرة للقراءة فقط على دفاترك، دون أن يُكتب شيء في دفترك.",
    check: "افحص دفاترك مجانًا", demo: "احجز عرضًا تجريبيًا", arrow: "←",
    notesHead: "قبل أن تسأل",
    notes: [
      ["لماذا بالدعوة", "نربط كل مساحة عمل جديدة بنظامك المحاسبي، ونتفق معك على قواعد الاعتماد فيها، قبل الشهر الأول. ونفتح مساحات العمل بالوتيرة التي تتيح لنا إتقان ذلك."],
      ["ما الذي نطلبه", "نظامك المحاسبي وحجم معاملاتك ودولتك ودورك تخبرنا كيف ينبغي إعداد مساحة عملك. نستخدمها لمراجعة طلبك ومراسلتك بشأنه."],
      ["الطريق الأسرع", "عرض تجريبي مدته 20 دقيقة مع الفريق، على دفاترك إن شئت. لا يحل محل طلبك، بل يخبرنا عنه أكثر."],
    ] as [string, string][],
  },
};

export function AccessPage({ locale = "en" }: { locale?: Locale }) {
  const t = T[locale];
  const ar = locale === "ar";
  return (
    <PageShell band={false} locale={locale}>
      <section className="hw-phero ra-hero">
        <div className="hw-wrap hw-phero-in ra-hero-in">
          <div className="ra-copy">
            <p className="hw-eyebrow hw-eyebrow--dot"><span className="hw-dot" aria-hidden="true" /> {t.eyebrow}</p>
            <h1><KineticTitle title={t.title} maxMark={ar ? 12 : 16} /></h1>
            <p className="hw-phero-lede ra-key">{KEY_TAIL[locale]}</p>
            <p className="ra-next">{t.next}</p>
            <p className="ra-links">
              <a className="tt-link" href="/check">{t.check} <span aria-hidden="true">{t.arrow}</span>{ar && <span className="hw-sr"> (بالإنجليزية)</span>}</a>
              <a className="hw-link hw-link--ruled" {...DEMO}>{t.demo} <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB[locale]}</span></a>
            </p>
          </div>
          <RequestAccessForm locale={locale} source={ar ? "access-page-ar" : "access-page"} />
        </div>
      </section>

      <section aria-labelledby="ra-notes-h">
        <div className="hw-wrap hw-section ra-notes">
          <h2 className="hw-sr" id="ra-notes-h">{t.notesHead}</h2>
          <div className="hw-cards">
            {t.notes.map(([h, p], i) => (
              <article key={h}>
                <p className="hw-eyebrow"><bdi>{String(i + 1).padStart(2, "0")}</bdi></p>
                <h3>{h}</h3>
                <p>{p}</p>
                {i === 2 && <a className="hw-link hw-link--ruled" {...DEMO}>{t.demo} <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB[locale]}</span></a>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
