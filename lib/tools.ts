/* The tools registry — drives the /tools index, the sitemap and llms.txt. */

/* arTitle/arDescription mark a calculator whose UI is translated — the AR
   index links to /ar/tools/<slug> when they exist, and the sitemap emits
   the hreflang pair.
   `updated` (ISO date) is the sitemap's lastmod — bump it when the
   calculator's logic or copy changes, not for site-wide restyles. */
export type Tool = { slug: string; updated: string; title: string; description: string; guide?: string; arTitle?: string; arDescription?: string };

export const TOOLS: Tool[] = [
  {
    slug: "ecl-provision-calculator",
    updated: "2026-10-07",
    title: "IFRS 9 ECL provision calculator",
    description:
      "A provision-matrix calculator for trade receivables: your ageing balances, your loss rates, and a forward-looking scenario slider — watch the provision reprice as you drag.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "eosb-gratuity-calculator",
    updated: "2026-10-07",
    title: "UAE gratuity (EOSB) calculator",
    description:
      "End-of-service gratuity under the 21/30-day rule: basic wage, years of service, the two-year cap — with the working shown.",
    guide: "uae-eosb-gratuity",
  },
  {
    slug: "uae-vat-calculator",
    updated: "2026-10-07",
    title: "VAT calculator — UAE 5% & KSA 15%",
    description: "Add VAT to a net amount or extract it from a gross one, at the UAE or KSA rate.",
    guide: "uae-blocked-input-vat",
  },
  {
    slug: "uae-corporate-tax-calculator",
    updated: "2026-10-07",
    title: "UAE Corporate Tax estimator",
    description:
      "0% to AED 375,000, 9% above — with the Small Business Relief election handled.",
    guide: "uae-tax-deadlines",
  },
  {
    slug: "ifrs16-lease-calculator",
    updated: "2026-10-07",
    title: "IFRS 16 lease liability & ROU asset calculator",
    description:
      "Compute the day-1 lease liability and right-of-use asset, then generate the full amortisation schedule — interest unwinding and straight-line depreciation, period by period.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "ias19-actuarial-eosb-calculator",
    updated: "2026-10-07",
    title: "IAS 19 actuarial EOSB valuation",
    description:
      "A simplified projected unit credit estimate for UAE end-of-service benefits: discount rate, salary escalation, attrition — the inputs an actuary uses, in your browser.",
    guide: "uae-eosb-gratuity",
  },
  {
    slug: "ias36-impairment-calculator",
    updated: "2026-09-23",
    title: "IAS 36 impairment test — value-in-use DCF",
    description:
      "Five-year cash-flow projection, WACC discount, terminal value — determine whether a CGU is impaired and by how much.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "ias12-deferred-tax-calculator",
    updated: "2026-09-23",
    title: "IAS 12 deferred tax schedule",
    description:
      "Add your balance-sheet items, their carrying amounts and tax bases — get the temporary differences and the resulting DTL/DTA positions at any tax rate.",
    guide: "uae-tax-deadlines",
  },
  {
    slug: "ifrs9-eir-calculator",
    updated: "2026-10-07",
    title: "IFRS 9 effective interest rate (EIR) calculator",
    description:
      "Solve for the EIR on a financial instrument with origination fees or a premium/discount, and produce the full amortised-cost schedule.",
    guide: "month-end-close-checklist",
  },
  {
    slug: "ksa-zakat-calculator",
    updated: "2026-09-23",
    title: "KSA Zakat estimator (ZATCA)",
    description:
      "Build the zakat base the way ZATCA does — equity, provisions and long-term borrowing in, fixed assets and long-term investments out, floored at the year's adjusted profit — at the Hijri 2.5% or Gregorian 2.5777% rate, with mixed Saudi/GCC ownership handled.",
  },
  {
    slug: "freezone-de-minimis-calculator",
    updated: "2026-09-15",
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
    updated: "2026-10-07",
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
    updated: "2026-10-07",
    title: "UAE VAT penalty estimator",
    description:
      "What a late return and late payment cost under the April 2026 rules: the fixed filing penalties plus 14% a year on unpaid tax, charged monthly — computed from days late.",
    guide: "uae-tax-deadlines",
    arTitle: "حاسبة غرامات ضريبة القيمة المضافة الإماراتية",
    arDescription:
      "كم يكلّف الإقرار المتأخر والسداد المتأخر وفق قواعد أبريل 2026: الغرامات الثابتة زائد 14% سنويًا على الضريبة غير المدفوعة تُحتسب شهريًا — محسوبة من أيام التأخر.",
  },
  {
    slug: "loyalty-points-calculator",
    updated: "2026-09-15",
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
    updated: "2026-10-20",
    title: "KSA withholding tax (WHT) calculator",
    description:
      "Domestic WHT on payments to non-residents by category — management fees 20%, royalties and any other payments 15%, rent, interest, technical services and freight 5% — with net-of-tax gross-up handled.",
    guide: "intercompany-management-fees-uae",
    arTitle: "حاسبة ضريبة الاستقطاع السعودية",
    arDescription:
      "الاستقطاع المحلي على المدفوعات لغير المقيمين حسب الفئة — أتعاب الإدارة 20%، والإتاوات وأي مدفوعات أخرى 15%، والإيجار والفوائد والخدمات الفنية والشحن 5% — مع معالجة عقود الصافي من الضريبة.",
  },
  {
    slug: "uae-corporate-tax-penalty-calculator",
    updated: "2026-09-15",
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
    updated: "2026-10-07",
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
    updated: "2026-09-15",
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
    updated: "2026-09-15",
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
    updated: "2026-10-07",
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
    updated: "2026-10-07",
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
    updated: "2026-09-15",
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
    updated: "2026-09-15",
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
    updated: "2026-09-15",
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
    updated: "2026-09-15",
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
    updated: "2026-09-16",
    title: "Partial exemption calculator (input VAT apportionment)",
    description:
      "The three pots — taxable, exempt, residual — with today's recovery ratio, the 2028 turnover ratio from Cabinet Decision 149, and the VAT you actually lose.",
    guide: "uae-partial-exemption-input-vat",
    arTitle: "حاسبة الإعفاء الجزئي (توزيع مدخلات الضريبة)",
    arDescription:
      "الأوعية الثلاثة — خاضع ومعفى ومتبقٍ — مع حساب نسبة الاسترداد بالطريقة القياسية وإظهار الضريبة التي تضيع فعلًا.",
  },
  {
    slug: "uae-real-estate-vat-checker",
    updated: "2026-09-15",
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
    updated: "2026-10-07",
    title: "VAT voluntary disclosure penalty calculator",
    description:
      "The Form 211 cost under the April 2026 rules: 1% of the tax difference for every month since the return was due, 15% more after an audit notice — and what waiting six more months adds.",
    guide: "uae-vat-voluntary-disclosure",
    arTitle: "حاسبة غرامات الإفصاح الطوعي",
    arDescription:
      "كلفة النموذج 211 وفق قواعد أبريل 2026: 1% من فرق الضريبة عن كل شهر منذ استحقاق الإقرار، و15% إضافية بعد إشعار التدقيق — وما يضيفه انتظار ستة أشهر أخرى.",
  },
  {
    slug: "uae-interest-cap-calculator",
    updated: "2026-09-15",
    title: "Interest deduction cap calculator (30% EBITDA)",
    description:
      "Net interest against the greater of 30% of adjusted EBITDA and the AED 12m safe harbour — deductible now, disallowed and carried, and which prong binds.",
    guide: "uae-interest-deduction-limitation",
    arTitle: "حاسبة سقف خصم الفائدة (30%)",
    arDescription:
      "صافي الفائدة مقابل الأعلى من 30% من الأرباح المعدلة وملاذ الـ 12 مليون درهم — المخصوم الآن والممنوع المرحَّل وأي الشقّين يلزِم.",
  },
  {
    slug: "ksa-rett-calculator",
    updated: "2026-09-27",
    title: "Saudi RETT calculator (5% Real Estate Transaction Tax)",
    description:
      "5% of the agreed price or fair market value, whichever is higher, with the first-home relief on the first SAR 1 million and the 2%-a-month late-payment fine capped at 50%.",
    guide: "ksa-real-estate-transaction-tax",
    arTitle: "حاسبة ضريبة التصرفات العقارية في السعودية (5%)",
    arDescription:
      "5% من السعر المتفق عليه أو القيمة السوقية أيهما أعلى، مع دعم المسكن الأول على أول مليون ريال، وغرامة التأخر 2% شهريًا بحد أقصى 50%.",
  },
  {
    slug: "ksa-rett-share-transfer-checker",
    updated: "2026-09-27",
    title: "RETT share-transfer checker (Saudi real estate companies)",
    description:
      "Is the company a real estate company (50% of assets at market value)? Does the transfer reach 30% in three years? Then the tax base: the higher of market value × stake and the allocated price.",
    guide: "ksa-rett-share-transfers-real-estate-companies",
    arTitle: "فحص ضريبة التصرفات العقارية على نقل الحصص (الشركات العقارية)",
    arDescription:
      "هل الكيان شركة عقارية (50% من الأصول بالقيمة السوقية)؟ هل يبلغ النقل 30% خلال ثلاث سنوات؟ ثم الوعاء: الأعلى بين القيمة السوقية × الحصة والثمن المخصص.",
  },
  {
    slug: "uae-supplier-verification-checker",
    updated: "2026-10-20",
    title: "Supplier verification checker (FTA Decision 13)",
    description:
      "Which supplier and supply checks FTA Decision No. 13 of 2026 requires before you deduct input VAT: the AED 10,000 exception, the AED 100,000 and 375,000 tests, and the payment flags.",
    guide: "uae-fta-decision-13-supplier-verification",
    arTitle: "فحص التحقق من الموردين (قرار الهيئة 13)",
    arDescription:
      "ما فحوص المورد والتوريد التي يتطلبها قرار الهيئة رقم 13 لسنة 2026 قبل خصم ضريبة المدخلات: استثناء 10,000 درهم، واختبارا 100,000 و375,000 درهم.",
  },
  {
    slug: "uae-tax-invoice-checker",
    updated: "2026-10-20",
    title: "UAE tax invoice checker (Article 59)",
    description:
      "Is a simplified invoice allowed, or must it be a full one? Tick the fields the invoice shows and see whether it supports an input VAT claim, and which field is missing.",
    guide: "uae-simplified-tax-invoice-aed-10000",
    arTitle: "فاحص الفاتورة الضريبية الإماراتية (المادة 59)",
    arDescription:
      "هل تكفي فاتورة مبسطة أم يلزم فاتورة كاملة؟ علّم الحقول الظاهرة في الفاتورة لترى هل تدعم استرداد ضريبة المدخلات وأي حقل ينقصها.",
  },
  {
    slug: "uae-vat-currency-converter",
    updated: "2026-10-20",
    title: "Foreign-currency invoice VAT converter (AED)",
    description:
      "Convert a USD, EUR or other invoice to the AED figures a UAE tax invoice must show, at the Central Bank rate, and see the exchange difference on payment that does not touch the VAT.",
    guide: "uae-vat-foreign-currency-invoices",
    arTitle: "محوّل ضريبة الفواتير بالعملات الأجنبية (درهم)",
    arDescription:
      "حوّل فاتورة بالدولار أو اليورو أو غيرهما إلى المبالغ بالدرهم التي يجب أن تظهرها الفاتورة الضريبية بسعر المصرف المركزي، مع فرق الصرف عند السداد.",
  },
  {
    slug: "uae-investment-property-depreciation-calculator",
    updated: "2026-10-20",
    title: "Investment property 4% tax depreciation calculator",
    description:
      "Ministerial Decision 173 of 2025: the Opening Value, the yearly 4% deduction, the tax saved at 9% and the add-back on sale, for a building held at fair value.",
    guide: "uae-investment-property-tax-depreciation",
    arTitle: "حاسبة استهلاك العقار الاستثماري الضريبي 4%",
    arDescription:
      "القرار الوزاري 173 لسنة 2025: القيمة الافتتاحية، والخصم السنوي 4% على العقار الاستثماري بالقيمة العادلة، والوفر الضريبي، والإضافة عند البيع.",
  },
  {
    slug: "uae-top-up-tax-estimator",
    updated: "2026-10-20",
    title: "UAE 15% top-up tax (DMTT) estimator",
    description:
      "A first estimate of the UAE Domestic Minimum Top-up Tax: effective tax rate, the payroll and tangible asset carve-outs, excess profit and the top-up to 15%.",
    guide: "uae-domestic-minimum-top-up-tax",
    arTitle: "مقدّر ضريبة الحد الأدنى الإضافية 15% في الإمارات",
    arDescription:
      "تقدير أولي لضريبة الحد الأدنى المحلية الإضافية: معدل الضريبة الفعلي، واستبعاد الرواتب والأصول الملموسة، والربح الزائد، والضريبة الإضافية حتى 15%.",
  },
  {
    slug: "uae-capital-assets-scheme-calculator",
    updated: "2026-10-20",
    title: "VAT capital assets scheme calculator",
    description:
      "The Article 58 adjustment year by year for buildings (10 years) and other assets of AED 5m+ (5 years): W, X, Q, R and Z, with the remaining-years adjustment on a sale.",
    guide: "uae-vat-capital-assets-scheme",
    arTitle: "حاسبة نظام الأصول الرأسمالية لضريبة القيمة المضافة",
    arDescription:
      "تسوية المادة 58 سنة بسنة للمباني (10 سنوات) والأصول الأخرى بقيمة 5 ملايين درهم فأكثر (5 سنوات): W وX وQ وR وZ، مع تسوية السنوات المتبقية عند البيع.",
  },
  {
    slug: "uae-e-invoicing-deadline-checker",
    updated: "2026-10-20",
    title: "UAE e-invoicing deadline checker",
    description:
      "Your Accredited Service Provider deadline and e-invoicing go-live date by phase, days remaining, the tax group exclusion and the penalties for missing them.",
    guide: "uae-e-invoicing-large-businesses-2027",
    arTitle: "فاحص مواعيد الفوترة الإلكترونية في الإمارات",
    arDescription:
      "موعد تعيين مزود الخدمة المعتمد وبدء الفوترة الإلكترونية الإلزامية حسب المرحلة، والأيام المتبقية، واستثناء المجموعات الضريبية، والغرامات.",
  },
  {
    slug: "uae-intercompany-loan-interest-calculator",
    updated: "2026-10-20",
    title: "Intercompany loan interest calculator (UAE TP)",
    description:
      "Arm's length interest on an intercompany loan against the rate charged, the Article 34 adjustment on each side, and the net UAE tax for the group.",
    guide: "uae-intercompany-loans-transfer-pricing",
    arTitle: "حاسبة فائدة القروض بين الشركات المرتبطة",
    arDescription:
      "الفائدة بالسعر المحايد على قرض بين شركات مرتبطة مقارنةً بالسعر المحتسب، وتعديل المادة 34 لدى الطرفين، وصافي الضريبة على المجموعة في الدولة.",
  },
  {
    slug: "uae-vat-ct-reconciliation-calculator",
    updated: "2026-10-20",
    title: "VAT to Corporate Tax revenue reconciliation",
    description:
      "Bridge revenue in the financial statements to Box 1, 4 and 5 of the VAT returns: advances, unbilled revenue, asset sales, non-supply income, and the unexplained gap.",
    guide: "uae-vat-corporate-tax-reconciliation",
    arTitle: "تسوية ضريبة القيمة المضافة مع إيرادات ضريبة الشركات",
    arDescription:
      "اربط الإيرادات في القوائم المالية بالخانات 1 و4 و5 في إقرارات ضريبة القيمة المضافة: الدفعات المقدمة، والإيرادات غير المفوترة، وبيع الأصول، والفرق غير المفسَّر.",
  },
  {
    slug: "uae-fta-objection-deadline-calculator",
    updated: "2026-10-20",
    title: "FTA objection deadline calculator (40 business days)",
    description:
      "The last day to request a review or reconsideration, object to the Tax Disputes Resolution Committee or appeal to court, counted in business days under Article 49.",
    guide: "uae-fta-group-tax-audit",
    arTitle: "حاسبة مهلة الاعتراض لدى الهيئة (40 يوم عمل)",
    arDescription:
      "آخر يوم لطلب المراجعة أو إعادة النظر أو الاعتراض أمام لجنة فض المنازعات الضريبية أو الطعن أمام المحكمة، محسوبًا بأيام العمل وفق المادة 49.",
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
