import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Tools — Orbit",
  description:
    "Free Gulf finance calculators: IFRS 16 leases, IAS 19 actuarial EOSB, IAS 36 impairment DCF, IAS 12 deferred tax, IFRS 9 ECL and EIR, UAE gratuity, VAT and Corporate Tax. Computed in your browser, nothing uploaded.",
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
      <MgFooter />
    </>
  );
}
