import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { AuditCheckCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE audit requirement checker — Orbit",
  description:
    "Free UAE audit checker: the AED 50m Corporate Tax threshold, the QFZP audit condition, and the company-law and free-zone rules — do you need audited financial statements?",
  alternates: langAlternates("/tools/uae-audit-requirement-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-audit-requirement-checker"
      kicker="COMPLIANCE · AUDIT"
      lede="Three regimes decide it — the tax law, the companies law, and your licensing authority. Enter your facts and get the stacked answer."
    >
      <AuditCheckCalculator />
    </ToolPage>
  );
}
