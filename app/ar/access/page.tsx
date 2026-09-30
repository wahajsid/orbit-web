/* ── /ar/access ──────────────────────────────────────────────────────
   النسخة العربية من صفحة طلب الانضمام (app/(en)/access/page.tsx):
   المكوّن نفسه components/hysaab/AccessPage.tsx بنصوص عربية.
   AR-REVIEW: العنوان والوصف أدناه. */

import "../../access.css";
import { AccessPage } from "@/components/hysaab/AccessPage";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "اطلب الانضمام إلى Hysaab: نفتح أبوابنا بالدعوة",
  description:
    "يفتح Hysaab أبوابه بالدعوة، ونقبل الطلبات بحسب ترتيب وصولها. وحين يحين دور طلبك نرسل دعوة إلى بريد عملك. فحص الدفاتر المجاني متاح للجميع.",
  alternates: langAlternates("/access"),
};

export default function Page() {
  return <AccessPage locale="ar" />;
}
