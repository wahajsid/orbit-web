/* ── It communicates, alongside it writes ────────────────────────────
   Owner direction 2026-09-24. The four things the agents send, each true
   to the app (app repo): collections (lib/collections/messages.ts: the
   cadence you set, a statement of account from the second reminder,
   queue-first unless routine auto-send is switched on, escalations
   always human-gated); the receipt chase (lib/cron/dispatch.ts
   receipt_chase: one ask about unmatched bank payments, WhatsApp, then
   Telegram, then email); channel tasking (app/api/inbound/whatsapp and
   /email reply on the same channel); drafted journals (lib/team/actions.ts
   propose_journal and propose_accruals). WhatsApp sending needs the Meta
   credentials the owner is configuring.
   Renders a heading and four cards; the caller supplies the section.
   AR-REVIEW: every Arabic string below is a new draft. */

type Locale = "en" | "ar";

const COPY: Record<Locale, { eyebrow: string; h: [string, string]; lede: string; cards: { e: string; h: string; p: string }[] }> = {
  en: {
    eyebrow: "It writes, and it communicates",
    h: ["It reads your books, writes the entries", "and chases what’s missing. You approve."],
    lede: "The agents do more than prepare work on a screen. They write to the people the work depends on, on the channels you already use.",
    cards: [
      { e: "Customers", h: "Chases overdue invoices.", p: "Reminders follow the collections cadence you set, with a statement of account from the second reminder. They wait for your approval unless you switch on auto-send for routine ones; escalations always come to you." },
      { e: "Missing documents", h: "Asks for the receipt.", p: "Money that left the bank with no bill behind it gets one friendly ask, on WhatsApp or by email. Reply with a photo and it goes straight into intake." },
      { e: "Your team", h: "Answers on WhatsApp or email.", p: "Send a question or a task. The agents work it against your books and reply on the same channel, with the figures and the entries behind them." },
      { e: "The ledger", h: "Drafts the journal.", p: "Accruals, reclassifications and corrections arrive as drafted journals with their basis. You approve, and they post to the ledger you already use." },
    ],
  },
  ar: {
    eyebrow: "يكتب، ويتواصل",
    h: ["يقرأ دفاترك، ويكتب القيود،", "ويلاحق ما ينقص. وأنت توافق."],
    lede: "لا يكتفي الوكلاء بإعداد العمل على الشاشة. يراسلون الأشخاص الذين يتوقف عليهم العمل، عبر القنوات التي تستخدمها بالفعل.",
    cards: [
      { e: "العملاء", h: "يلاحق الفواتير المتأخرة.", p: "تتبع رسائل التذكير وتيرة التحصيل التي تحددها، ومعها كشف حساب ابتداءً من التذكير الثاني. تنتظر موافقتك ما لم تفعّل الإرسال التلقائي للرسائل الروتينية، والتصعيد يأتي إليك دائمًا." },
      { e: "المستندات الناقصة", h: "يطلب الإيصال.", p: "المبالغ التي خرجت من البنك دون فاتورة وراءها تُرسل بشأنها رسالة لطيفة واحدة عبر واتساب أو البريد. ردّ بصورة، فتدخل مباشرة إلى استلام المستندات." },
      { e: "فريقك", h: "يجيب عبر واتساب أو البريد.", p: "أرسل سؤالًا أو مهمة. يعالجها الوكلاء على دفاترك ويردّون على القناة نفسها، بالأرقام والقيود التي تقف خلفها." },
      { e: "دفتر الأستاذ", h: "يُعدّ القيد.", p: "الاستحقاقات وإعادات التصنيف والتصحيحات تصل قيودًا مُعدّة مع أساسها. توافق أنت، فتُرحَّل إلى النظام المحاسبي الذي تستخدمه بالفعل." },
    ],
  },
};

export function AgentsAct({ locale = "en" }: { locale?: Locale }) {
  const c = COPY[locale];
  return (
    <div className="hw-acts">
      <div className="hw-heading">
        <div>
          <p className="hw-eyebrow">{c.eyebrow}</p>
          <h2>{c.h[0]}<br /><span>{c.h[1]}</span></h2>
        </div>
        <p>{c.lede}</p>
      </div>
      <div className="hw-cards hw-cards--4">
        {c.cards.map((k) => (
          <article key={k.h}>
            <p className="hw-eyebrow">{k.e}</p>
            <h3>{k.h}</h3>
            <p>{k.p}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
