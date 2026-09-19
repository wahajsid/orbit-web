> **Website direction updated, 19 September 2026:** Read [Hysaab design philosophy v5](./DESIGN-PHILOSOPHY.md) first. It governs the new website wave, including existing Arabic pages, guides and calculators. Earlier visual-template restrictions below describe the prior rebuild and do not prevent the shared website styling changes required by v5. Preserve verified product behaviour, genuine captures, prices, SEO, accessibility and operational safeguards. App implementation is deferred until the owner requests it.
# Inner-page rebuild brief (2026-09)

Owner decisions this implements: rebuild the key inner pages in the new homepage design; align the voice with the homepage; remove the waitlist / founding seats / founder pricing; the only call to action is an enquiry ("Let's talk" → `/contact`). English only. Nothing is deployed.

## How a rebuilt page is made

Read these first, in this order:

1. `app/(en)/product/page.tsx` — **the exemplar. Copy its structure.**
2. `components/home/PageShell.tsx` — `PageShell`, `PageHero`, `Shot`.
3. `app/hysaab-home.css`, the section headed **INNER PAGES** — the kit. Also `.hw-heading`, `.hw-btn`, `.hw-link`, `.hw-eyebrow`, `.hw-mono`, `.hw-wrap`, `.hw-section` higher in the file.
4. `app/(en)/page.tsx` — the homepage, for the voice.

A page is `PageShell > PageHero + <section>` blocks. Each section is `<section className="…optional hw-block--sage | hw-block--family | hw-block--dark | hw-block--rule"><div className="hw-wrap hw-section">…</div></section>`. Open a section with `.hw-heading` (eyebrow + h2, optional right-hand paragraph; wrap the second line of the h2 in `<span>` for the accent colour).

Kit pieces: `.hw-feature` (+ `--flip`) copy beside a `Shot`; `.hw-cards` (`--2`, `--4`; `article.is-navy`); `.hw-rows` (`article > span.hw-mono + h3 + p`); `.hw-plans` (`article.is-featured`, `.hw-plan-price`); `.hw-faq` (`details > summary + div.hw-faq-a`); `.hw-table-wrap > table.hw-table`; `.hw-ticks`; `.hw-note`; `.hw-prose`; `.hw-split`.

`PageShell` already renders the header, the closing peach "Let's talk" band, the footer and the countdown. Pass `band={{ title, body }}` to tailor the band, or `band={false}` (Contact page only).

Captures available in `public/home/screens/` for `Shot`: `01-app-intake.png`, `02-app-coded-checked.png`, `03-app-second-opinion.png`, `04-app-journal-why.png`, `05-app-position.png`, `p-payables.png`, `p-receivables.png`, `p-close.png`, `p-tax.png`. Use one only where it genuinely shows what the copy says; write factual alt text and a caption that includes "sample data". Do not use images from `public/shots/` directly (they show a person's name in the header).

## Hard rules

- Edit **only the page file(s) you were assigned**. Do not edit CSS, shared components, other pages or Arabic pages. If the kit lacks something, compose from what exists and say so in your report.
- Do not run `npm run build`, `next dev` or any server (another process owns `.next`). Verify with `npx tsc --noEmit` only.
- Keep `export const metadata` with `alternates: langAlternates("/path")`. Keep the page's main search keywords in the title, description and h1 where natural; rewrite any part that mentions the waitlist, founding seats, founder pricing or an unverifiable number.
- Keep any JSON-LD `<script type="application/ld+json">` the page has, and keep it in step with the visible content (an FAQ schema must match the visible questions and answers).
- Keep useful internal links (guides, calculators, product pages).
- One `<h1>` (from `PageHero`), `<h2>` per section, `<h3>` inside cards and rows. Eyebrows are written in sentence case; CSS uppercases them.
- No new dependencies. Server components unless interactivity is needed. Do not import `advert.css`, `MgNav`, `MgFooter` or `mg-*`/`hy-*` classes in a rebuilt page.

## Voice

Hysaab is "an accounting and reporting team for Gulf businesses, built on evidence, professional judgement and human oversight". The books are prepared; the decisions are yours. Calm, editorial, finance-literate. Short sentences. No hype, no exclamation marks, no "revolutionary", no "effortless".

- Do not count agents ("sixteen agents") or lean on "AI agents" as the hero. Say what Hysaab does. "AI" may appear where it is simply accurate or needed for search.
- **Remove** statistics and claims that cannot be traced to the product: time to close, accuracy percentages, documents per month, customer counts, speed multiples, savings figures, testimonials, guarantees, launch scarcity. Prices already published on the page are facts: keep them exactly.
- Describe behaviour the workspace demonstrably has: documents are read, coded from the customer's history and tax-tested; duplicates are held; low-confidence items are brought to a person with the reason; questionable instructions are challenged and some are refused; an override needs a written reason and is recorded; journals keep commentary and evidence; reversals are mirrored entries; accruals are proposed and approved by a person; the period lock is pressed by a person; payment runs are prepared, never executed; collections reminders send only on an approved cadence; Hysaab does not file returns.
- Channels: WhatsApp, email and upload may be named (the owner has decided WhatsApp is presented as available at launch). Do not invent a phone number or a "chat now" button.
- If the existing page states something you cannot square with the list above, soften it to what is demonstrable or remove it.

## Your report

Finish with: files changed; every claim or number you removed or softened (quote the old wording); anything the kit lacked; the `tsc` result.

## Arabic pages (added 2026-09-18)

Each Arabic page is a translation of the CURRENT English rebuilt page (read the English file first; it is the source of truth for structure and claims), written to `app/ar/<page>/page.tsx`, using the same kit:

- `<PageShell locale="ar" band={{ title, body }}>` and `<PageHero locale="ar" …>`; `<Shot … locale="ar" />`. The Arabic root layout already sets `dir="rtl"`, loads the kit stylesheet and the Arabic fonts; the kit uses logical properties, so no RTL CSS work is needed. Do not add CSS.
- Metadata: an Arabic `title` and `description` carrying the page's search terms (for example برنامج محاسبة بالذكاء الاصطناعي، الإمارات، السعودية، ضريبة القيمة المضافة، ضريبة الشركات، الإقفال الشهري، فواتير الموردين), and keep `alternates: langAlternates("/<english-path>")` exactly as the English page has it. Keep any JSON-LD the English page emits, translated, and matching the visible Arabic content.
- Conventions: the brand is written in Latin, "Hysaab", never transliterated; accounting-system names stay Latin (Zoho Books, Xero, QuickBooks, Odoo, Wafeq, ERPNext); WhatsApp is واتساب and Telegram is تيليغرام in prose; digits are Latin (USD 199, 5%); currency as the English page has it. Modern Standard Arabic, formal but plain, the same calm voice: prepared work, decisions with the person. No hype.
- Internal links go to the Arabic twin where one exists (`/ar/product`, `/ar/how-it-works`, `/ar/pricing`, `/ar/compliance`, `/ar/integrations`, `/ar/faq`, `/ar/about`, `/ar/contact`, `/ar/guides`, `/ar/tools`, `/ar/invoice`, `/ar/firms`), and to the English page for `/hire`, `/audit`, `/privacy`, `/terms` and any guide or calculator that has no Arabic version (check `lib/guides-ar.ts` `getArGuide` and `lib/tools.ts` `arTitle` before linking a deep page in Arabic).
- The Contact page uses `<EnquiryForm source="Arabic contact page" locale="ar" />`.
- Prices are USD 199 (self-serve) and from USD 899 (managed service): the English pricing and FAQ pages are already updated; mirror them exactly.
- Captions and alt text in Arabic must still say the screens show sample data (بيانات تجريبية).
- Verify with `npx tsc --noEmit`. Do not run a build or dev server. Edit only your assigned files.
