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
  {
    slug: "uae-corporate-tax-penalty-calculator",
    title: "UAE Corporate Tax penalty calculator",
    description:
      "Late registration, monthly filing penalties (AED 500 rising to 1,000) and 14% p.a. on unpaid tax — enter months late and see the full exposure.",
    guide: "uae-corporate-tax-penalties",
    arTitle: "حاسبة غرامات ضريبة الشركات الإماراتية",
    arDescription:
      "التسجيل المتأخر، وغرامات التقديم الشهرية (500 درهم ترتفع إلى 1,000)، و14% سنويًا على الضريبة غير المدفوعة — أدخل أشهر التأخر وشاهد التعرض كاملًا.",
  },
  {
    slug: "uae-vat-registration-checker",
    title: "UAE VAT registration checker",
    description:
      "The AED 375,000 mandatory and AED 187,500 voluntary thresholds, tested the way the FTA tests them — rolling 12 months plus the next-30-days rule.",
    guide: "uae-tax-deadlines",
    arTitle: "فاحص التسجيل في ضريبة القيمة المضافة الإماراتية",
    arDescription:
      "عتبتا الإلزامي 375,000 درهم والاختياري 187,500 درهم، مختبرتان كما تختبرهما الهيئة — 12 شهرًا متحركة وقاعدة الثلاثين يومًا القادمة.",
  },
  {
    slug: "uae-bad-debt-relief-calculator",
    title: "VAT bad-debt relief calculator (Article 64)",
    description:
      "Check the four conditions, count the six months, and get the exact 5/105 output-tax adjustment on the written-off amount.",
    guide: "uae-vat-bad-debt-relief",
    arTitle: "حاسبة إعفاء الديون المعدومة (المادة 64)",
    arDescription:
      "افحص الشروط الأربعة، وعُدّ الأشهر الستة، واحصل على تسوية ضريبة المخرجات 5/105 بالضبط على المبلغ المشطوب.",
  },
  {
    slug: "uae-designated-zone-vat-checker",
    title: "Designated zone VAT checker",
    description:
      "Pick what's being supplied and where it's going — get the treatment: outside the scope, standard 5%, or import VAT on entry to the mainland.",
    guide: "uae-designated-zone-vat",
    arTitle: "فاحص ضريبة المناطق المحددة",
    arDescription:
      "اختر ما يورَّد وإلى أين يذهب — واحصل على المعاملة: خارج النطاق، أو 5% عادية، أو ضريبة استيراد عند دخول البر الرئيسي.",
  },
  {
    slug: "uae-ecommerce-vat-checker",
    title: "E-commerce VAT checker (UAE)",
    description:
      "Goods or electronic services, domestic or abroad, evidence or not — the rate, the VAT and the total per order, with the zero-rating documentation rule enforced.",
    guide: "uae-ecommerce-vat",
    arTitle: "فاحص ضريبة التجارة الإلكترونية (الإمارات)",
    arDescription:
      "سلع أو خدمات إلكترونية، محلي أو خارجي، بدليل أو بدونه — النسبة والضريبة والإجمالي لكل طلب، مع فرض قاعدة توثيق النسبة الصفرية.",
  },
  {
    slug: "uae-employee-cost-calculator",
    title: "UAE employee cost calculator",
    description:
      "What a hire really costs per month: gross salary plus the monthly EOSB provision on basic wage — or pension contributions for nationals — with the annual total.",
    guide: "uae-wps-payroll-compliance",
    arTitle: "حاسبة تكلفة الموظف في الإمارات",
    arDescription:
      "كم يكلّف التوظيف شهريًا فعلًا: الراتب الإجمالي زائد مخصص نهاية الخدمة الشهري على الأساسي — أو مساهمات المعاش للمواطنين — مع الإجمالي السنوي.",
  },
  {
    slug: "uae-participation-exemption-checker",
    title: "Participation exemption checker (UAE CT)",
    description:
      "Ownership, holding period and subject-to-tax — the three tests that decide whether a dividend or exit gain is exempt, with the 9% at stake shown.",
    guide: "uae-holding-company-participation-exemption",
    arTitle: "فاحص إعفاء المساهمة (ضريبة الشركات)",
    arDescription:
      "الملكية ومدة الاحتفاظ والخضوع للضريبة — الاختبارات الثلاثة التي تحسم إعفاء التوزيع أو ربح التخارج، مع إظهار الـ 9% على المحك.",
  },
  {
    slug: "uae-reverse-charge-calculator",
    title: "Reverse charge VAT calculator (UAE)",
    description:
      "Imported services and goods: the output VAT to account, the input VAT you recover, and the net cash effect at your actual recovery rate.",
    guide: "uae-vat-reverse-charge",
    arTitle: "حاسبة الاحتساب العكسي (الإمارات)",
    arDescription:
      "الخدمات والسلع المستوردة: ضريبة المخرجات المستحقة والمدخلات المستردة والأثر النقدي الصافي بنسبة استردادك الفعلية.",
  },
  {
    slug: "uae-audit-requirement-checker",
    title: "UAE audit requirement checker",
    description:
      "The AED 50m Corporate Tax test, the QFZP condition, and the company-law and free-zone rules that stack on top — a straight answer on whether you need audited statements.",
    guide: "uae-audit-requirements",
    arTitle: "فاحص وجوب التدقيق في الإمارات",
    arDescription:
      "اختبار الـ 50 مليون درهم في ضريبة الشركات، وشرط الشخص المؤهل، وقواعد قانون الشركات والمناطق الحرة المتراكمة فوقهما — جواب مباشر عن حاجتك لقوائم مدققة.",
  },
  {
    slug: "uae-tax-loss-carry-forward-calculator",
    title: "Tax loss carry-forward calculator (UAE CT)",
    description:
      "Brought-forward losses against this year's income with the 75% offset cap applied — losses used, tax payable, and what carries onward.",
    guide: "uae-tax-loss-carry-forward",
    arTitle: "حاسبة ترحيل الخسائر الضريبية (ضريبة الشركات)",
    arDescription:
      "الخسائر المرحّلة مقابل دخل السنة مع تطبيق سقف التقاص 75% — الخسائر المستخدمة والضريبة المستحقة وما يستمر بالترحيل.",
  },
  {
    slug: "uae-partial-exemption-calculator",
    title: "Partial exemption calculator (input VAT apportionment)",
    description:
      "The three pots — taxable, exempt, residual — with the standard-method recovery ratio computed and the VAT you actually lose shown.",
    guide: "uae-partial-exemption-input-vat",
    arTitle: "حاسبة الإعفاء الجزئي (توزيع مدخلات الضريبة)",
    arDescription:
      "الأوعية الثلاثة — خاضع ومعفى ومتبقٍ — مع حساب نسبة الاسترداد بالطريقة القياسية وإظهار الضريبة التي تضيع فعلًا.",
  },
  {
    slug: "uae-real-estate-vat-checker",
    title: "UAE real estate VAT checker",
    description:
      "New residential, later residential, commercial, bare land, serviced apartments — the treatment, the VAT, and whether your input VAT survives.",
    guide: "uae-real-estate-vat",
    arTitle: "فاحص ضريبة العقارات الإماراتية",
    arDescription:
      "سكني جديد، سكني لاحق، تجاري، أرض فضاء، شقق مخدومة — المعاملة والضريبة وهل تنجو مدخلاتك.",
  },
  {
    slug: "uae-voluntary-disclosure-penalty-calculator",
    title: "VAT voluntary disclosure penalty calculator",
    description:
      "The Form 211 cost by year: the fixed penalty plus the 5%-to-40% ladder on the tax difference — and what waiting one more year adds.",
    guide: "uae-vat-voluntary-disclosure",
    arTitle: "حاسبة غرامات الإفصاح الطوعي",
    arDescription:
      "كلفة النموذج 211 بحسب السنة: الغرامة الثابتة زائد سلّم الـ 5% إلى 40% على فرق الضريبة — وما يضيفه انتظار سنة أخرى.",
  },
  {
    slug: "uae-interest-cap-calculator",
    title: "Interest deduction cap calculator (30% EBITDA)",
    description:
      "Net interest against the greater of 30% of adjusted EBITDA and the AED 12m safe harbour — deductible now, disallowed and carried, and which prong binds.",
    guide: "uae-interest-deduction-limitation",
    arTitle: "حاسبة سقف خصم الفائدة (30%)",
    arDescription:
      "صافي الفائدة مقابل الأعلى من 30% من الأرباح المعدلة وملاذ الـ 12 مليون درهم — المخصوم الآن والممنوع المرحَّل وأي الشقّين يلزِم.",
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
