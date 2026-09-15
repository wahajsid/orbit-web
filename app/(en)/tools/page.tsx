import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { CtaBand } from "@/components/hysaab/CtaBand";
import { TOOLS } from "@/lib/tools";

import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "Free UAE & KSA Tax Calculators (VAT, CT, Zakat) | Hysaab",
  description:
    "Free UAE and KSA tax and accounting calculators: VAT, Corporate Tax, Zakat, penalties, partial exemption, gratuity, IFRS 16, IAS 12 and more. Computed in your browser, nothing uploaded.",
  alternates: langAlternates("/tools"),
};

export default function ToolsPage() {
  return (
    <>
      <MgNav />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">TOOLS</div>
          <h1 className="mg-page-h">Calculators that show their working.</h1>
          <p className="mg-page-lede">
            Free, fast, and computed entirely in your browser — the numbers Gulf finance teams reach
            for weekly, each with the rule behind it spelled out.
          </p>
        </section>
        <section className="mg-page-body">
          {TOOLS.map((t) => (
            <a key={t.slug} href={`/tools/${t.slug}`} className="mg-guide-row">
              <div>
                <div className="mg-guide-title">{t.title}</div>
                <p className="mg-guide-desc">{t.description}</p>
              </div>
              <span className="mg-guide-meta">FREE</span>
            </a>
          ))}
        </section>
      </main>
      <CtaBand />
      <MgFooter />
    </>
  );
}
