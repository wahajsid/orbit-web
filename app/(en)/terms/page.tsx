/* ── /terms ──────────────────────────────────────────────────────────
   Terms for USING THIS WEBSITE (added 2026-09-18). The Hysaab
   application and any managed service are governed by the agreement
   signed when a workspace is set up; this page says so rather than
   pretending to be that agreement. A lawyer has not yet reviewed it. */

import { PageShell, PageHero } from "@/components/home/PageShell";

export const metadata = {
  title: "Website Terms | Hysaab",
  description: "The terms for using the hysaab.ai website: what the content is for, what it is not, and where the application and service agreements live.",
  alternates: { canonical: "./" },
};

const UPDATED = "18 September 2026";

export default function Page() {
  return (
    <PageShell band={false}>
      <PageHero eyebrow="Website terms" title={<>Plain terms<br /><span>for using this site.</span></>} lede={`These terms cover the hysaab.ai website. Last updated ${UPDATED}.`} notice={false} />

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">In short</p>
              <h2 className="hw-heading--stack" style={{ fontSize: 34, fontWeight: 550, letterSpacing: -1, lineHeight: 1.15, marginTop: 16 }}>Read freely. Rely on your own advisor.</h2>
            </div>
            <div className="hw-prose">
              <p>This website is operated by Oblique Consult, Dubai, United Arab Emirates, the company behind Hysaab. By using the site you accept these terms. If you do not, please do not use it.</p>

              <h2>What the content is</h2>
              <p>The pages, guides and calculators on this site are general information about accounting, tax and the Hysaab product. They are written with care, but they are not accounting, tax or legal advice for your situation, and reading them does not create a client relationship. Figures produced by the calculators are illustrative, computed in your browser, and should be checked with your advisor before you act on them.</p>
              <p>Screens shown on this site are captures of the Hysaab workspace running a sample dataset unless stated otherwise. Scenarios, names and figures in walkthroughs are examples, not results.</p>

              <h2>The product and the service</h2>
              <p>Using the Hysaab application, and any managed accounting service, is governed by the agreement you enter into when a workspace is set up, including its scope, fees and responsibilities. Nothing on this website is an offer that binds us until that agreement exists. Prices shown are indicative and are confirmed in that agreement.</p>

              <h2>Your use of the site</h2>
              <p>You may read, link to and quote short extracts of this site with attribution. You may not copy it wholesale, scrape it for commercial use, attempt to interfere with it, or use it to send us unlawful or abusive content. The Hysaab name, the wordmark and the site design belong to Oblique Consult.</p>

              <h2>Third-party links</h2>
              <p>Links to other sites, including our own related products, are provided for convenience. We are not responsible for their content or their terms.</p>

              <h2>Liability</h2>
              <p>The site is provided as it is. To the extent the law allows, we are not liable for loss arising from reliance on general information on this site or from the site being unavailable. Nothing here limits liability that cannot be limited under applicable law.</p>

              <h2>Law and contact</h2>
              <p>These terms are governed by the laws applicable in the Emirate of Dubai, United Arab Emirates. Questions go to <a href="mailto:info@hysaab.ai">info@hysaab.ai</a>. Our privacy notice is at <a href="/privacy">hysaab.ai/privacy</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
