import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { GUIDES } from "@/lib/guides";

import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "Guides — Orbit",
  description:
    "Practical Gulf finance guides: valid UAE tax invoices, VAT and Corporate Tax deadlines, the month-end close, and working with the ledger you already have.",
  alternates: langAlternates("/guides"),
};

export default function GuidesPage() {
  return (
    <>
      <MgNav />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">GUIDES</div>
          <h1 className="mg-page-h">The busywork, explained plainly.</h1>
          <p className="mg-page-lede">
            Short, practical answers to the questions Gulf finance teams actually deal with — written
            by the accountants who built Orbit. No gate, no email wall.
          </p>
        </section>
        <section className="mg-page-body">
          {GUIDES.map((g) => (
            <a key={g.slug} href={`/guides/${g.slug}`} className="mg-guide-row">
              <div>
                <div className="mg-guide-title">{g.title}</div>
                <p className="mg-guide-desc">{g.description}</p>
              </div>
              <span className="mg-guide-meta">{g.minutes} min</span>
            </a>
          ))}
        </section>
      </main>
      <MgFooter />
    </>
  );
}
