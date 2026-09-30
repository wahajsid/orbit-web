/* ── /access ─────────────────────────────────────────────────────────
   Request access (owner decision 2026-09-30: Hysaab is invite-only).
   Every "sign up / get started" call to action on the site lands here.
   The page itself is components/hysaab/AccessPage.tsx (shared with
   /ar/access); the form posts to /api/early-access. */

import "../../access.css";
import { AccessPage } from "@/components/hysaab/AccessPage";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Request Access to Hysaab: Opening by Invitation",
  description:
    "Hysaab is opening by invitation. Requests are admitted in the order they arrive; when yours comes up we send an invitation to your work email. The free Books Check is open to anyone.",
  alternates: langAlternates("/access"),
};

export default function Page() {
  return <AccessPage />;
}
