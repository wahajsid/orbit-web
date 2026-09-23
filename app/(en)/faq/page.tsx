/* ── /faq ────────────────────────────────────────────────────────────
   Rebuilt 2026-09 in the homepage design (PageShell + the hw-* kit in
   app/hysaab-home.css). The questions live in one grouped array; the
   FAQPage JSON-LD is built from that same array, so the schema and the
   visible answers cannot drift. Answers are plain strings: linkify()
   only turns the addresses already in the text into links. */

import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/home/PageShell";
// Launch date deliberately not shown (owner, 2026-09-23).
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "FAQ: AI Accounting for UAE & Saudi Businesses | Hysaab",
  description:
    "Straight answers on Hysaab: what it is, which accounting systems it works with, who approves, VAT and corporate tax, data safety, launch and pricing.",
  alternates: langAlternates("/faq"),
};

type Group = { id: string; eyebrow: string; title: React.ReactNode; aside: string; block?: string; items: [string, string][] };

const GROUPS: Group[] = [
  {
    id: "product",
    eyebrow: "The product",
    title: <>What Hysaab is.<br /><span>And what it works with.</span></>,
    aside: "Hysaab sits alongside the accounting system you already use, or keeps the books for you if you have none.",
    items: [
      [
        "What exactly is Hysaab?",
        "An accounting and reporting team for UAE and Saudi businesses, built on evidence, professional judgement and human oversight. Documents arrive by WhatsApp, email or upload. They are read, coded from your own history, tested against FTA and ZATCA tax rules, matched to purchase orders and bank lines, and posted to your ledger. You approve the decisions that matter, and nothing posts silently past the limits you set.",
      ],
      [
        "Do I have to replace my current accounting system?",
        "No. Hysaab posts into Zoho Books, Xero, QuickBooks, Odoo, Wafeq or ERPNext. Your ledger stays the system of record your accountant and auditor already know. One connected ledger at a time keeps a single source of truth.",
      ],
      [
        "What if I don't use any accounting system?",
        "Then Hysaab keeps the books for you. Send documents by WhatsApp, email or upload, and the chart of accounts, the journals and the evidence behind them are kept from the first day.",
      ],
      [
        "Is there an Arabic version?",
        "Yes. The site is live in Arabic at hysaab.ai/ar, and the product workspace switches to Arabic, right to left. The team behind Hysaab works in both languages, and support in Arabic is available today at info@hysaab.ai.",
      ],
    ],
  },
  {
    id: "control",
    eyebrow: "Control and compliance",
    title: <>Who decides.<br /><span>And what is on record.</span></>,
    aside: "The books are prepared for you. The decisions stay with a person, and the reasoning stays with the books.",
    block: "hw-block--sage",
    items: [
      [
        "Does the AI post things without asking me?",
        "Only below the limits you set. Anything above your journal-value threshold, any low-confidence coding and any suspected duplicate waits in a decisions queue for a person, with the reason. Every posting carries its evidence, so you can always see why it is there.",
      ],
      [
        "How does Hysaab handle VAT and Corporate Tax?",
        "UAE VAT at 5% is tested line by line against the FTA tax-invoice criteria before input VAT is claimed. A Corporate Tax accrual at 9% is proposed each month for you to approve, and VAT and Corporate Tax turnover are reconciled to each other with the difference explained. For KSA, the 15% VAT rules and ZATCA e-invoice clearance status are tracked. If the FTA asks a question, the entries and documents behind each figure are already attached. You review and file; Hysaab does not submit returns for you.",
      ],
      [
        "Is my financial data safe?",
        "Your books live in an isolated tenant with row-level security. Ledger credentials are stored server-side, encrypted, and never reach a browser. Sign-in supports mandatory two-factor authentication. Hysaab never shares your data, and you can revoke the ledger connection at any time, from Hysaab or from the ledger's side.",
      ],
      [
        "Why should I trust a product this young with my books?",
        "Because it was built by accountants who have run month-ends, VAT filings and FTA queries themselves. Every automated action leaves an audit trail. A questionable instruction is challenged with the reason, and an override needs a written reason and is recorded. Human approval is a design principle, not a setting you can switch off.",
      ],
    ],
  },
  {
    id: "launch",
    eyebrow: "Launch and pricing",
    title: <>When it opens.<br /><span>What it costs.</span></>,
    aside: "The fee and the scope are confirmed with you before any commitment.",
    items: [
      [
        "When does Hysaab launch?",
        `Hysaab opens to new customers shortly. You do not have to wait to talk to us: book a demo or tell the team about your books now at hysaab.ai/contact, and we will confirm your accounting system, entities, scope and fees upfront.`,
      ],
      [
        "What does it cost?",
        "There are two ways to run Hysaab. Self-serve is USD 199 a month: your own team reviews, approves and closes, with Hysaab preparing the work. The managed service is scoped to your books: Oblique’s accountants work the exceptions with you and prepare each close, using Hysaab every day. Fees follow the complexity of your books, not the number of people who log in, and are confirmed with you before you start. See hysaab.ai/pricing.",
      ],
    ],
  },
];

const FAQS: [string, string][] = GROUPS.flatMap((g) => g.items);

/* FAQPage structured data — generative engines quote exactly this shape. */
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* Addresses that appear in the answers, rendered as links. The visible
   text is untouched, so it still matches the schema word for word. */
const LINKS: Record<string, string> = {
  "hysaab.ai/contact": "/contact",
  "hysaab.ai/pricing": "/pricing",
  "hysaab.ai/ar": "/ar",
  "info@hysaab.ai": "mailto:info@hysaab.ai",
};
const LINK_RE = /(hysaab\.ai\/contact|hysaab\.ai\/pricing|hysaab\.ai\/ar|info@hysaab\.ai)/g;

function linkify(text: string): React.ReactNode[] {
  return text.split(LINK_RE).map((part, i) =>
    LINKS[part] ? <a key={i} href={LINKS[part]}>{part}</a> : part,
  );
}

export default function FaqPage() {
  return (
    <PageShell band={{ title: "Something we have not answered?", body: "Ask a person. Tell us about your books and the process that takes too long, and we will show you where Hysaab fits." }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <PageHero
        eyebrow="FAQ"
        title={<>Straight answers.<br /><span>Before you ask.</span></>}
        lede="The questions founders and finance leads ask us, answered plainly."
      >
        <a className="hw-btn hw-btn--peach" href="/contact">Let’s talk <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="/how-it-works"><span className="hw-play" aria-hidden="true">▷</span> See how it works</a>
      </PageHero>

      {GROUPS.map((g) => (
        <section key={g.id} id={g.id} className={g.block}>
          <div className="hw-wrap hw-section">
            <div className="hw-heading">
              <div>
                <p className="hw-eyebrow">{g.eyebrow}</p>
                <h2>{g.title}</h2>
              </div>
              <p>{g.aside}</p>
            </div>
            <div className="hw-faq">
              {g.items.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <div className="hw-faq-a"><p>{linkify(a)}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}
    </PageShell>
  );
}
