/* ── hysaab.ai homepage — Tick & Tie (brand/tick-and-tie/BRAND.md) ───
   Simpler homepage (2026-10-24, owner): one promise and a short film of a
   finished close in the hero, then what every close delivers, how it
   runs, the products, who is behind it, the free Books Check and the
   demo form. Seven sections instead of thirteen. Each still opens with a
   W/P reference (H-1 … H-7, in page order); the key claim sits on the
   highlighter. Every figure on the page is the product's own (the close
   binder's 31 workpapers, the close calendar's T+1…T+5); nothing here is
   a customer result. The previous homepage is in git history and
   backups/home-*.page.tsx.bak. Styles: app/tick-tie.css (tt-*), the film
   in components/home/close-film.css. */

import { HomeHeader } from "@/components/home/HomeHeader";
import { EnquiryForm, InterestLink } from "@/components/home/EnquiryForm";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { ACCESS_HREF, KEY_LINE } from "@/lib/access";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TEAM } from "@/lib/team";
import { SwapLabel } from "@/components/motion/Kinetic";
import { Wp, Tm } from "@/components/home/tt/Wp";
import { CloseFilm } from "@/components/home/CloseFilm";

/* The close binder, as the app files it (orbit-app lib/close-binder/registry.ts). */
const BINDER = [
  "Index and sign-off", "Trial balance and lead schedules", "Cash and bank", "Accounts receivable", "Prepayments",
  "Other receivables and deposits", "Inventory", "Fixed assets", "Leases (IFRS 16)", "Intangibles", "Intercompany",
  "Accounts payable", "Accruals", "Deferred revenue and contract liabilities", "Payroll and employee liabilities", "VAT",
  "Corporate tax and Zakat", "Loans and borrowings", "Other payables and provisions", "Equity", "Suspense and clearing",
  "FX revaluation", "Cut-off", "Journal entries register", "Balance sheet flux", "Income statement flux", "Cash flow working",
  "Financial statements", "Open items and exceptions", "Close checklist evidence", "Group consolidation",
];

const PRODUCTS: { who: string; status: string; name: string; line: string; href: string; cta: string }[] = [
  { who: "For finance teams", status: "Early access", name: "Hysaab Finance", line: "The close, payables, reconciliations and the reporting pack, prepared inside the ledger you already use.", href: "/accounting", cta: "Explore Hysaab Finance" },
  { who: "For tax and advisory firms", status: "Coming soon", name: "Hysaab Practice", line: "Hundreds of VAT and CT checks on every return, with treatments drawn from your own precedents.", href: "/firms", cta: "Explore Hysaab Practice" },
  { who: "For licensed audit firms", status: "Coming soon", name: "Hysaab Audit", line: "Every journal scored and samples designed in code. A licensed partner concludes and signs.", href: "/audit", cta: "Explore Hysaab Audit" },
];

export const metadata = {
  title: "AI Agents for Finance Teams and Firms in UAE & KSA | Hysaab",
  description:
    "AI agents prepare the month-end close with Xero, Zoho Books or QuickBooks: bank matched, accruals confirmed, 31 workpapers filed. Your team signs off and locks. For the UAE and KSA.",
  alternates: langAlternates("/"),
};

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.en}</span>;

export default function Page() {
  return (
    <div className="hw-page tt-page" id="top">
      <a href="#main" className="hw-skip">Skip to the content</a>
      <span data-motion-page="full" hidden />
      <HomeHeader />

      <main id="main">
        {/* ── H-1 Hero: one sentence, the film of a finished close ── */}
        <section className="tt-sec tt-grid tt-hero tt-hero2">
          <div className="hw-wrap">
            <Wp r="H-1" right={<>Prepared by <b>agents</b> · Signed off by <b>you</b></>}>The month-end close</Wp>
            <div className="tt-hero2-g">
              <div className="tt-hero2-copy">
                <h1>Agents close the month. <span className="tt-hl">Your team signs it off.</span></h1>
                <p className="tt-hero-sub">Working with Xero, Zoho Books or QuickBooks, Hysaab matches the bank, prepares the accruals and files every workpaper. Your people confirm, approve and lock. Built in Dubai for the UAE and Saudi Arabia.</p>
                <div className="tt-acts tt-hero2-acts">
                  <a className="hw-btn hw-btn--navy m-cta m-magnetic" {...DEMO}><SwapLabel text="Book a demo" /> <span aria-hidden="true">↗</span>{newTab}</a>
                  <a href={ACCESS_HREF.en} className="tt-link">Request access <span aria-hidden="true">→</span></a>
                </div>
                <p className="tt-invite">{KEY_LINE.en} <a className="hw-link hw-link--ruled" href="/check">Check your books free <span aria-hidden="true">→</span></a></p>
              </div>
              <CloseFilm />
            </div>
          </div>
        </section>

        {/* ── H-2 What every close delivers ── */}
        <section className="tt-sec" id="binder" aria-labelledby="tt-binder-h">
          <div className="hw-wrap">
            <Wp r="H-2" right="The product's own numbers">What you get at the end of every close</Wp>
            <h2 className="tt-h2" id="tt-binder-h" data-reveal="">A closed month, <span className="tt-hl" data-play="">and the binder to prove it.</span></h2>
            <div className="tt-facts" data-reveal="stagger-lg">
              <article><b>31</b><p>Excel workpapers in every close binder, from the index to group consolidation. Each carries who prepared it, who reviewed it, and DRAFT or FINAL.</p></article>
              <article><b>T+1–T+5</b><p>Every close task dated by working day, with an owner. At-risk tasks show before the deadline, not after it.</p></article>
              <article><b>0</b><p>Accruals booked before a person confirms them. Contract estimates go to their owner first; reconciliations need a second signature.</p></article>
              <article><b>Days</b><p>Days to close, measured every month, so each close can be compared with the last.</p></article>
            </div>
            <div className="tt-binder" aria-label="The workpapers in a Hysaab close binder">
              <p className="tt-binder-h"><span>Close binder · one folder per month</span><span>{BINDER.length} workpapers</span></p>
              <ol>
                {BINDER.map((w, i) => <li key={w}><span>{String(i).padStart(2, "0")}</span>{w}</li>)}
              </ol>
            </div>
          </div>
        </section>

        {/* ── H-3 How a close runs ── */}
        <section className="tt-sec tt-grid" id="how-it-works" aria-labelledby="tt-how-h">
          <div className="hw-wrap">
            <Wp r="H-3" right="Agents prepare · people decide">How a close runs</Wp>
            <h2 className="tt-h2" id="tt-how-h" data-reveal="">The agents do the work. <span className="tt-hl" data-play="">People make the calls.</span></h2>
            <ol className="tt-steps tt-steps3" data-reveal="stagger-lg">
              <li><span className="tt-step-n">01</span><div><h3>Agents prepare.</h3><p>Bank lines matched, recurring and contract accruals estimated, depreciation and prepayments released, VAT checked, variances explained and the control accounts reconciled.</p></div></li>
              <li><span className="tt-step-n">02</span><div><h3>Your people confirm.</h3><p>Owners confirm their estimates, a second person signs each reconciliation, and you approve the journals. When something looks wrong, Hysaab says why before you decide.</p></div></li>
              <li><span className="tt-step-n">03</span><div><h3>Locked and filed.</h3><p>The month locks, the binder is filed and the days to close are recorded. Nothing posts into a closed month.</p></div></li>
            </ol>
            <p className="tt-more"><a className="tt-link" href="/accounting">See how Hysaab Finance works <span aria-hidden="true">→</span></a><a className="tt-link" href="/trust">Our commitments on data and control <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* ── H-4 The products ── */}
        <section id="products" className="tt-sec" aria-labelledby="tt-prod-h">
          <span id="family" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp r="H-4" right="Each works on its own">The products</Wp>
            <h2 className="tt-h2" id="tt-prod-h" data-reveal="">For finance teams, <span className="tt-hl" data-play="">and the firms that serve them.</span></h2>
            <div className="tt-prods" data-reveal="stagger-lg">
              {PRODUCTS.map((p) => (
                <article key={p.name}>
                  <p className="tt-prod-st"><span>{p.who}</span><b>{p.status}</b></p>
                  <h3>{p.name}</h3>
                  <p>{p.line}</p>
                  <a className="tt-link" href={p.href}>{p.cta} <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>
            <p className="tt-more">Hiring into finance? <a className="tt-link" href="/hire">Meet Ibtidah <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* ── H-5 Ways to work, and who is behind it ── */}
        <section id="ways" className="tt-sec tt-grid" aria-labelledby="tt-ways-h">
          <span id="team" className="hw-anchor" aria-hidden="true" />
          <span id="origin" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp r="H-5" right="Scope agreed before we start">Ways to work</Wp>
            <h2 className="tt-h2" id="tt-ways-h" data-reveal="">Your people. <span className="tt-hl" data-play="">Or ours, alongside.</span></h2>
            <div className="tt-ways" data-reveal="stagger-lg">
              <article>
                <p className="tt-who">For your finance team</p>
                <h3>Your team runs the close.</h3>
                <p>Hysaab prepares the work. Your people review the exceptions, sign the workpapers and keep the decisions in-house.</p>
                <InterestLink interest="Own team">Discuss your team&apos;s close <span aria-hidden="true">↗</span></InterestLink>
              </article>
              <p className="tt-or" aria-hidden="true">or</p>
              <article>
                <p className="tt-who">For more hands-on support</p>
                <h3>We run it with you.</h3>
                <p>Oblique&apos;s accountants run the queue and prepare the close with you, using Hysaab every day. For mid-sized and larger companies.</p>
                <InterestLink interest="Managed support">Discuss managed support <span aria-hidden="true">↗</span></InterestLink>
              </article>
            </div>
            <div className="tt-origin2">
              <p><Tm m="P" /> Built by accountants who ran the work first. Hysaab grew out of the tax and accounting work Oblique Consult does for Gulf businesses, and is engineered with Simpla.</p>
              <div className="tt-orgs">
                <a href="https://obliqueconsult.com" target="_blank" rel="noopener">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/partners/oblique-consult.svg" alt="Oblique Consult" width={1011} height={386} loading="lazy" />
                  <span><strong>{TEAM[0]?.name}</strong>{TEAM[0]?.role}, {TEAM[0]?.org}<span className="hw-sr"> (opens in a new tab)</span></span>
                </a>
                <a href="https://www.simpla.ai" target="_blank" rel="noopener">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/partners/simpla.png" alt="Simpla" width={1024} height={304} loading="lazy" />
                  <span><strong>{TEAM[1]?.name}</strong>{TEAM[1]?.role}, {TEAM[1]?.org}<span className="hw-sr"> (opens in a new tab)</span></span>
                </a>
              </div>
              <p className="tt-more"><a className="tt-link" href="/about">Read the full story <span aria-hidden="true">→</span></a></p>
            </div>
          </div>
        </section>

        {/* ── H-6 Books Check ── */}
        <section className="tt-sec tt-books" aria-labelledby="tt-books-h">
          <div className="hw-wrap">
            <Wp r="H-6" right="Read-only">Not ready for a demo?</Wp>
            <div className="tt-books-g">
              <div data-reveal="">
                <h2 id="tt-books-h">Check your books free.</h2>
                <p className="tt-books-p">Connect Xero or QuickBooks. See what Hysaab finds in about a minute. Read‑only.</p>
                <a className="hw-btn hw-btn--navy m-cta m-magnetic" href="/check"><SwapLabel text="Check my books" /> <span aria-hidden="true">→</span></a>
              </div>
              <div className="tt-tape" aria-label="Example Books Check findings, sample data">
                <p className="tt-tape-hd">BOOKS CHECK · SAMPLE<br />Read-only · 00:58</p>
                <p><span>Same supplier bill twice</span><span>March</span><Tm m="T" /></p>
                <p><span>5% VAT on zero-rated export</span><span>held</span><Tm m="✓" /></p>
                <p><span>Payroll missed, then doubled</span><span>Jan–Feb</span><Tm m="B" /></p>
                <p><span>Accrual never unwound</span><span>Dec</span><Tm m="T" /></p>
                <p><span>Journal with no support</span><span>JE-0098</span><Tm m="?" /></p>
                <p className="tt-tape-ft">Example findings. Sample data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── H-7 Book a demo (enquiry form) ── */}
        <section className="tt-sec tt-grid hw-conversation tt-conversation" id="conversation">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <span id="cohort" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp r="H-7" right="A person replies">A conversation, not a sales deck</Wp>
            <div className="hw-conversation-grid" data-reveal="stagger-lg">
              <div>
                <h2 className="tt-h2">Book a <span className="tt-hl" data-play="">demo.</span></h2>
                <p className="tt-lead">Tell us how your close runs today and what takes too long.<br />We will show you where Hysaab fits.</p>
                <p className="hw-demo-direct">Prefer to pick a time yourself? <a className="tt-link" {...DEMO}>Choose a slot in our calendar <span aria-hidden="true">↗</span>{newTab}</a></p>
                <div className="hw-agenda">
                  <span className="hw-mono">Your first conversation</span>
                  <ol>
                    <li><span className="hw-mono">01</span> How your close runs today</li>
                    <li><span className="hw-mono">02</span> A finished close, walked through</li>
                    <li><span className="hw-mono">03</span> Fit, scope and next steps</li>
                  </ol>
                </div>
              </div>
              <EnquiryForm demo />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter home />
    </div>
  );
}
