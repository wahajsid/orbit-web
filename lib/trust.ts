/* ── Commitments to firms and finance teams ───────────────────────────
   One source for /trust, /ar/trust and the questions on /firms and
   /ar/firms (website change plan 2026-09-23).

   COMMERCIAL: the five questions firms ask.
   DRAFT: owner review. The plan names these questions but gives no
   answers; these are drafted from conservative commitments and must be
   confirmed by the owner before launch.

   CONTROLS: data controls. Owner, 2026-09-23: they are being put in
   place before launch, so they are worded as commitments ("We keep…",
   "We never…"), never as audited certifications.

   AR-REVIEW: every Arabic string in this file is a new draft for the
   native reviewer (listed in brand/AR-REVIEW.md). */

export type QA = { q: string; a: string };
export type Control = { h: string; p: string };

/* DRAFT: owner review */
export const FIRM_QUESTIONS: Record<"en" | "ar", QA[]> = {
  en: [
    {
      q: "Do you compete with us for clients?",
      a: "No. Hysaab Practice and Hysaab Audit are software for your firm. We do not use your workspace to find, contact or sell to your clients. Oblique Consult, the advisory firm our founders also run, has no access to your workspace or your client list.",
    },
    {
      q: "Who owns our client data and the client relationships?",
      a: "You do. The client records, files and working papers you put into Hysaab belong to your firm, and we process them only to run the service for you. Each client relationship is yours. Hysaab deals with your clients only where you invite them into the workspace, and only to exchange work with your firm.",
    },
    {
      q: "Will you contact our clients?",
      a: "Not for our own purposes. Anything your clients receive through Hysaab is sent by your firm, when a person at your firm presses send. We do not market to your clients or approach them for work.",
    },
    {
      q: "Can we keep our own brand, or white-label Hysaab?",
      a: "Your clients deal with your firm, not with us. Reports, letters and returns you prepare in Hysaab go out as your firm’s work. How far the client-facing screens can carry your own brand is agreed with each firm before you start, and we will tell you plainly what is available today.",
    },
    {
      q: "What happens to our data if we leave?",
      a: "You can take a full export of your records and documents before you go. After that we delete your firm’s data from the service on the timetable in your agreement, keeping only what the law requires us to keep, and we confirm in writing when it is done.",
    },
  ],
  /* AR-REVIEW */
  ar: [
    {
      q: "هل تنافسوننا على العملاء؟",
      a: "لا. Hysaab Practice وHysaab Audit برنامجان لمكتبكم. لا نستخدم مساحة عملكم للبحث عن عملائكم أو التواصل معهم أو البيع لهم. وOblique Consult، المكتب الاستشاري الذي يديره مؤسسونا أيضًا، لا يملك أي وصول إلى مساحة عملكم أو قائمة عملائكم.",
    },
    {
      q: "لمن تعود بيانات عملائنا وعلاقاتنا معهم؟",
      a: "لكم. سجلات العملاء وملفاتهم وأوراق العمل التي تضعونها في Hysaab ملك لمكتبكم، ولا نعالجها إلا لتشغيل الخدمة لكم. وكل علاقة مع عميل هي علاقتكم. ولا يتعامل Hysaab مع عملائكم إلا حيث تدعونهم إلى مساحة العمل، ولتبادل العمل مع مكتبكم فقط.",
    },
    {
      q: "هل ستتواصلون مع عملائنا؟",
      a: "ليس لأغراضنا. كل ما يصل إلى عملائكم عبر Hysaab يرسله مكتبكم، حين يضغط شخص في مكتبكم زر الإرسال. ولا نسوّق لعملائكم ولا نعرض عليهم أي عمل.",
    },
    {
      q: "هل نحتفظ بعلامتنا التجارية، أو نقدّم Hysaab باسمنا؟",
      a: "عملاؤكم يتعاملون مع مكتبكم لا معنا. والتقارير والخطابات والإقرارات التي تُعدّونها في Hysaab تخرج بوصفها عمل مكتبكم. أما مدى ظهور علامتكم على الشاشات التي يراها العملاء فيُتفق عليه مع كل مكتب قبل البدء، وسنقول لكم بوضوح ما هو متاح اليوم.",
    },
    {
      q: "ماذا يحدث لبياناتنا إذا غادرنا؟",
      a: "يمكنكم أخذ نسخة كاملة من سجلاتكم ومستنداتكم قبل المغادرة. وبعد ذلك نحذف بيانات مكتبكم من الخدمة وفق الجدول الزمني في اتفاقيتكم، ولا نحتفظ إلا بما يلزمنا القانون بالاحتفاظ به، ونؤكد لكم كتابيًا عند الانتهاء.",
    },
  ],
};

export const DATA_CONTROLS: Record<"en" | "ar", Control[]> = {
  en: [
    { h: "Each customer’s data kept apart.", p: "We keep every firm’s and every company’s data in its own tenant. Each request is checked against the customer it belongs to, so one customer never sees another’s records." },
    { h: "Every agent action logged.", p: "We log every action an agent takes: what it did, on which record, with what evidence, and who approved it." },
    { h: "No training on your data.", p: "We never use your data to train AI models. Your records are used to do your work and nothing else." },
    { h: "Credentials kept encrypted.", p: "We keep the credentials that connect Hysaab to your ledger and your other systems encrypted, and we never display them in the workspace." },
    { h: "Staff access only with your written permission.", p: "Our staff do not open your workspace without your written permission. When they do, for support you have asked for, every access is logged." },
  ],
  /* AR-REVIEW */
  ar: [
    { h: "بيانات كل عميل منفصلة.", p: "نحفظ بيانات كل مكتب وكل شركة في مساحة مستقلة خاصة بها. ويُفحص كل طلب مقابل العميل الذي ينتمي إليه، فلا يرى أي عميل سجلات عميل آخر." },
    { h: "كل إجراء يتخذه وكيل مُسجَّل.", p: "نسجّل كل إجراء يتخذه أي وكيل: ما الذي فعله، وعلى أي سجل، وبأي دليل، ومن اعتمده." },
    { h: "لا تدريب على بياناتك.", p: "لا نستخدم بياناتك أبدًا لتدريب نماذج الذكاء الاصطناعي. سجلاتك تُستخدم لإنجاز عملك ولا شيء غيره." },
    { h: "بيانات الاعتماد مشفّرة.", p: "نحفظ بيانات الاعتماد التي تربط Hysaab بدفتر أستاذك وأنظمتك الأخرى مشفّرة، ولا نعرضها أبدًا في مساحة العمل." },
    { h: "وصول الموظفين بإذن كتابي منك فقط.", p: "لا يفتح موظفونا مساحة عملك دون إذن كتابي منك. وحين يفعلون ذلك لتقديم دعم طلبته، يُسجَّل كل وصول." },
  ],
};
