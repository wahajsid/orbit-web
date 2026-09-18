/* ── /privacy ────────────────────────────────────────────────────────
   The privacy notice for the website (added 2026-09-18 after a review
   found none). It describes only what this site actually does: an
   enquiry form that emails the team, an earlier waitlist form that
   stored entries, hosting logs, and no analytics or advertising
   cookies. Anything about the Hysaab application itself is covered by
   the terms agreed when a workspace is set up. A lawyer has not yet
   reviewed this text. */

import { PageShell, PageHero } from "@/components/home/PageShell";

export const metadata = {
  title: "Privacy Notice | Hysaab",
  description:
    "What the hysaab.ai website collects and why: enquiries are emailed to the team, there are no advertising cookies or analytics trackers, and you can ask us to delete.",
  alternates: { canonical: "./" },
};

const UPDATED = "18 September 2026";

export default function Page() {
  return (
    <PageShell band={false}>
      <PageHero eyebrow="Privacy notice" title={<>What this site collects,<br /><span>and what it does not.</span></>} lede={`This notice covers the hysaab.ai website. Last updated ${UPDATED}.`} notice={false} />

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">In short</p>
              <h2 className="hw-heading--stack" style={{ fontSize: 34, fontWeight: 550, letterSpacing: -1, lineHeight: 1.15, marginTop: 16 }}>We collect what you type into a form, and little else.</h2>
            </div>
            <div className="hw-prose">
              <p>Hysaab is a product of <a href="https://obliqueconsult.com" target="_blank" rel="noopener">Oblique Consult</a>, based in Dubai, United Arab Emirates. This website exists to explain the product and to let you ask us about it. It does not run advertising trackers or analytics cookies, and it does not sell or share personal information for marketing by others.</p>

              <h2>What we collect, and why</h2>
              <p><strong>Enquiries.</strong> When you use a contact or enquiry form, you give us your name, work email address, the accounting system you use and anything you write in the message. The form sends that to the Hysaab team by email so that a person can reply. It is not added to a mailing list.</p>
              <p><strong>Waitlist entries.</strong> Earlier versions of this site offered a waitlist. If you joined it, we hold the work email, company name and accounting system you entered, and we may email you about the launch. You can ask us to delete that entry at any time.</p>
              <p><strong>Server logs.</strong> Our hosting provider records the usual technical details of each request, such as the IP address, browser type and pages requested, for security and to keep the site running. These logs are kept for a short period.</p>
              <p><strong>Cookies and local storage.</strong> The website sets no advertising or analytics cookies. The site may keep a small amount of information in your own browser, such as a form draft or a chosen setting, which never leaves your device.</p>

              <h2>Who processes it</h2>
              <p>The website is hosted on Vercel. Enquiry emails are delivered through Resend. Waitlist entries are stored with Supabase. Each of these providers processes data on our instructions and under its own security commitments. Some processing takes place outside the UAE, in the European Union or the United States.</p>

              <h2>How long we keep it</h2>
              <p>An enquiry stays in our mailbox for as long as we need it to answer you and to keep a record of the conversation. Waitlist entries are kept until the launch programme ends or you ask us to remove them. Server logs are kept only briefly.</p>

              <h2>Your choices</h2>
              <p>You can ask what we hold about you, ask us to correct it, or ask us to delete it. Write to <a href="mailto:info@hysaab.ai">info@hysaab.ai</a> from the address you used and we will act on it within a reasonable time. If you do not want to use a form, you can simply email us instead.</p>

              <h2>The Hysaab application</h2>
              <p>Information you place inside a Hysaab workspace, such as invoices, bank statements and ledger data, is governed by the agreement you enter into when the workspace is set up, not by this website notice. Ask us for that agreement before you start.</p>

              <h2>Changes</h2>
              <p>If this notice changes, the date at the top changes with it. Questions about privacy go to <a href="mailto:info@hysaab.ai">info@hysaab.ai</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
