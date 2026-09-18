/* ── The people behind Hysaab ────────────────────────────────────────
   Owner instruction 2026-09-18: name the team from Oblique Consult and
   Simpla. Roles and experience are taken from what the companies and the
   individuals have published (obliqueconsult.com/about-us and public
   professional profiles), not written from memory. Nothing here should
   be added or changed without a published source. */

export type Person = { name: string; initials: string; role: string; org: string; bio?: string; href: string; linkLabel: string; ar: { role: string; org: string; bio?: string } };

export const TEAM: Person[] = [
  {
    name: "Wahaj Siddiqui", initials: "WS", role: "Founder", org: "Oblique Consult",
    bio: "Over 18 years in corporate finance and tax advisory, including KPMG, Etihad Airways, Al Hilal Bank and Emirates Airlines, across external audit, financial reporting, internal audit and tax leadership.",
    href: "https://obliqueconsult.com/about-us", linkLabel: "Oblique Consult",
    ar: { role: "المؤسس", org: "Oblique Consult", bio: "أكثر من 18 عامًا في التمويل المؤسسي والاستشارات الضريبية، في KPMG وطيران الاتحاد ومصرف الهلال وطيران الإمارات، عبر التدقيق الخارجي والتقارير المالية والتدقيق الداخلي وقيادة الضرائب." },
  },
  {
    name: "Saad Zafar", initials: "SZ", role: "Co-Founder", org: "Simpla",
    bio: "A finance professional with a background in financial leadership and audit, including Majid Al Futtaim and KPMG.",
    href: "https://www.linkedin.com/in/saad-zafar-b156894a/", linkLabel: "LinkedIn",
    ar: { role: "شريك مؤسس", org: "Simpla", bio: "مهني مالي بخلفية في القيادة المالية والتدقيق، في ماجد الفطيم وKPMG." },
  },
  {
    name: "Matthew Durack", initials: "MD", role: "CTO & Co-Founder", org: "Simpla",
    href: "https://ae.linkedin.com/in/matthew-durack-7327b812a", linkLabel: "LinkedIn",
    ar: { role: "المدير التقني وشريك مؤسس", org: "Simpla" },
  },
  {
    name: "Arslan Ahmad", initials: "AA", role: "Senior Manager", org: "Oblique Consult",
    href: "https://obliqueconsult.com/about-us", linkLabel: "Oblique Consult",
    ar: { role: "مدير أول", org: "Oblique Consult" },
  },
  {
    name: "KR Ashtalakshmi", initials: "KA", role: "Senior Tax Advisor", org: "Oblique Consult",
    href: "https://obliqueconsult.com/about-us", linkLabel: "Oblique Consult",
    ar: { role: "مستشارة ضرائب أولى", org: "Oblique Consult" },
  },
];
