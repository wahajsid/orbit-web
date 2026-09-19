import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { GUIDES } from "@/lib/guides";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "UAE & KSA Tax and Accounting Guides | Hysaab",
  description:
    "Practical Gulf finance guides: valid UAE tax invoices, VAT and Corporate Tax deadlines, the month-end close, and working with the ledger you already have.",
  alternates: langAlternates("/guides"),
};

export default function GuidesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Guides"
        title={<>The busywork,<br /><span>explained plainly.</span></>}
        lede="Short, practical answers to the questions Gulf finance teams actually deal with — written by the accountants who built Hysaab. No gate, no email wall."
      />
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-index">
            {GUIDES.map((g) => (
              <a key={g.slug} href={`/guides/${g.slug}`}>
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.description}</p>
                </div>
                <span className="hw-mono">{g.minutes} min</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
