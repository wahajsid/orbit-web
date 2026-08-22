/* The tools registry — drives the /tools index, the sitemap and llms.txt. */

/* arTitle/arDescription mark a calculator whose UI is translated — the AR
   index links to /ar/tools/<slug> when they exist, and the sitemap emits
   the hreflang pair. */
export type Tool = { slug: string; title: string; description: string; guide?: string; arTitle?: string; arDescription?: string };

export const TOOLS: Tool[] = [
  {
    slug: "ecl-provision-calculator",
    title: "IFRS 9 ECL provision calculator",
    description:
      "A provision-matrix calculator for trade receivables: your ageing balances, your loss rates, and a forward-looking scenario slider — watch the provision reprice as you drag.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "eosb-gratuity-calculator",
    title: "UAE gratuity (EOSB) calculator",
    description:
      "End-of-service gratuity under the 21/30-day rule: basic wage, years of service, the two-year cap — with the working shown.",
    guide: "uae-eosb-gratuity",
  },
  {
    slug: "uae-vat-calculator",
    title: "VAT calculator — UAE 5% & KSA 15%",
    description: "Add VAT to a net amount or extract it from a gross one, at the UAE or KSA rate.",
    guide: "uae-blocked-input-vat",
  },
  {
    slug: "uae-corporate-tax-calculator",
    title: "UAE Corporate Tax estimator",
    description:
      "0% to AED 375,000, 9% above — with the Small Business Relief election handled.",
    guide: "uae-tax-deadlines",
  },
  {
    slug: "ifrs16-lease-calculator",
    title: "IFRS 16 lease liability & ROU asset calculator",
    description:
      "Compute the day-1 lease liability and right-of-use asset, then generate the full amortisation schedule — interest unwinding and straight-line depreciation, period by period.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "ias19-actuarial-eosb-calculator",
    title: "IAS 19 actuarial EOSB valuation",
    description:
      "A simplified projected unit credit estimate for UAE end-of-service benefits: discount rate, salary escalation, attrition — the inputs an actuary uses, in your browser.",
    guide: "uae-eosb-gratuity",
  },
  {
    slug: "ias36-impairment-calculator",
    title: "IAS 36 impairment test — value-in-use DCF",
    description:
      "Five-year cash-flow projection, WACC discount, terminal value — determine whether a CGU is impaired and by how much.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "ias12-deferred-tax-calculator",
    title: "IAS 12 deferred tax schedule",
    description:
      "Add your balance-sheet items, their carrying amounts and tax bases — get the temporary differences and the resulting DTL/DTA positions at any tax rate.",
    guide: "uae-tax-deadlines",
  },
  {
    slug: "ifrs9-eir-calculator",
    title: "IFRS 9 effective interest rate (EIR) calculator",
    description:
      "Solve for the EIR on a financial instrument with origination fees or a premium/discount, and produce the full amortised-cost schedule.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "ksa-zakat-calculator",
    title: "KSA Zakat estimator (ZATCA)",
    description:
      "Build the zakat base the way ZATCA does — equity, provisions and long-term borrowing in, fixed assets and long-term investments out, floored at the year's adjusted profit — at the Hijri 2.5% or Gregorian 2.5777% rate, with mixed Saudi/GCC ownership handled.",
  },
  {
    slug: "freezone-de-minimis-calculator",
    title: "Free zone de minimis calculator (QFZP)",
    description:
      "Test your non-qualifying revenue against the lower of AED 5m and 5% of total revenue — with the headroom shown, because breaching it costs the 0% rate for five years.",
    guide: "free-zone-corporate-tax-0-percent",
    arTitle: "حاسبة الحد الأدنى للمناطق الحرة (QFZP)",
    arDescription:
      "اختبر إيراداتك غير المؤهلة مقابل الأدنى من 5 ملايين درهم أو 5% من إجمالي الإيرادات — مع إظهار الهامش، لأن تجاوز الحد يكلّف نسبة الـ 0% خمس سنوات.",
  },
  {
    slug: "small-business-relief-checker",
    title: "Small Business Relief eligibility checker",
    description:
      "The AED 3m revenue test, the prior-period condition, the QFZP and MNE exclusions — a yes/no on the election, with the 9% it would save.",
    guide: "uae-small-business-relief",
    arTitle: "فاحص أهلية تخفيف الأعمال الصغيرة",
    arDescription:
      "اختبار إيرادات الـ 3 ملايين درهم، وشرط الفترات السابقة، واستثناءات المناطق الحرة والمجموعات الكبرى — جواب نعم/لا على الاختيار، مع الـ 9% التي سيوفرها.",
  },
  {
    slug: "uae-vat-penalty-calculator",
    title: "UAE VAT penalty estimator",
    description:
      "What a late return and late payment actually cost: the fixed filing penalties plus 2% immediately and 4% monthly on unpaid tax, capped at 300% — computed from days late.",
    guide: "uae-tax-deadlines",
    arTitle: "حاسبة غرامات ضريبة القيمة المضافة الإماراتية",
    arDescription:
      "كم يكلّف الإقرار المتأخر والسداد المتأخر فعلًا: الغرامات الثابتة زائد 2% فورًا و4% شهريًا على الضريبة غير المدفوعة بسقف 300% — محسوبة من أيام التأخر.",
  },
  {
    slug: "loyalty-points-calculator",
    title: "Loyalty points deferred revenue calculator (IFRS 15)",
    description:
      "Split a sale between today's revenue and the points liability using breakage-weighted standalone value, then watch the release as redemptions come in.",
    guide: "loyalty-points-accounting-uae",
    arTitle: "حاسبة الإيراد المؤجل لنقاط الولاء (IFRS 15)",
    arDescription:
      "قسّم البيع بين إيراد اليوم والتزام النقاط بالقيمة المستقلة المرجّحة بالاسترداد، ثم راقب الإطلاق مع ورود الاستردادات.",
  },
  {
    slug: "ksa-withholding-tax-calculator",
    title: "KSA withholding tax (WHT) calculator",
    description:
      "Domestic WHT on payments to non-residents by category — management fees 20%, royalties 15%, most others 5% — with net-of-tax gross-up handled.",
    guide: "intercompany-management-fees-uae",
    arTitle: "حاسبة ضريبة الاستقطاع السعودية",
    arDescription:
      "الاستقطاع المحلي على المدفوعات لغير المقيمين حسب الفئة — أتعاب الإدارة 20% والإتاوات 15% ومعظم الباقي 5% — مع معالجة عقود الصافي من الضريبة.",
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
