import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { TOOLS } from "@/lib/tools";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "Free UAE & KSA Tax Calculators (VAT, CT, Zakat) | Hysaab",
  description:
    "Free UAE and KSA tax and accounting calculators that show their working: VAT, corporate tax, EOSB, IFRS 16, IFRS 9, Zakat and more. No sign-up.",
  alternates: langAlternates("/tools"),
};

export default function ToolsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Tools"
        title={<>Calculators that show<br /><span>their working.</span></>}
        lede="Free calculators, computed in your browser, each with the rule spelled out."
      />
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-index">
            {TOOLS.map((t) => (
              <a key={t.slug} href={`/tools/${t.slug}`}>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </div>
                <span className="hw-mono">Free</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
