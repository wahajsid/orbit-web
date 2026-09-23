import type { Guide } from "./guides";

/* ── Cabinet Decision 149 of 2026: the practical sub-guides ─────────
   Spokes of /guides/uae-vat-cabinet-decision-149-2026-input-tax, each
   answering one question the headline coverage leaves open. Sources
   checked on 15 September 2026 are listed after each guide; re-check
   them when the Ministerial Decision on cash payments or the FTA
   conditions on employee benefits are issued. */

const cash: Guide = {
  slug: "uae-vat-cash-payments-petty-cash-2026",
  title: "VAT on cash payments and petty cash in the UAE: the input tax block from 1 October 2026",
  description:
    "From 1 October 2026, new Article 54(3) blocks input VAT on supplies above a Minister-set value paid in cash. What the rule says, what is still pending, how it hits petty cash, and what to fix before October.",
  updated: "2026-09-15",
  minutes: 8,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "From 1 October 2026, you cannot recover input VAT on a supply whose value exceeds an amount set by the Minister of Finance where the consideration is paid, or intended to be paid, in cash. The rule is new Article 54(3) of the VAT Executive Regulation, added by Cabinet Decision No. 149 of 2026, and the threshold itself sits in a separate Ministerial Decision that had not been published as of 15 September 2026.",
        "Small cash purchases are not affected by the new block unless they exceed that threshold, but they still need a valid tax invoice, usually a simplified one, before any VAT can be claimed. Large supplier payments made in cash are the real exposure, and the safe course is to move them to bank channels before October.",
      ],
    },
    {
      h: "What the rule says, and what is still pending",
      ps: [
        "[Cabinet Decision No. 149 of 2026](/guides/uae-vat-cabinet-decision-149-2026-input-tax) was issued on 1 September 2026 and announced by the Ministry of Finance on 8 September. It amends Cabinet Decision No. 52 of 2017, the Executive Regulation of the VAT law. The Ministry described the cash provision as a restriction on recovering input tax where cash payments exceed thresholds to be prescribed in a decision of the Minister of Finance, aimed at strengthening compliance and reducing evasion risk.",
        "In the consolidated Executive Regulation published by the FTA, Article 54(3) reads, in the unofficial English translation, that input tax may not be recovered on any supply which has a value exceeding the amount specified in a decision issued by the Minister, where the consideration is paid or intended to be paid in cash, in accordance with the controls specified in that decision.",
        "Two things are therefore missing: the AED figure and the controls. The FTA legislation page listed no Ministerial Decision on cash payments as of mid-September 2026, and press and adviser coverage up to 13 September describes the threshold as not yet set. Until it is issued, nobody can say with certainty which purchases are caught, but the provision itself is in force from 1 October.",
      ],
      list: [
        "It is a denial of recovery, not a timing rule. Settling in cash later does not delay the claim; it removes it.",
        "It sits alongside the existing [blocked categories in Article 53](/guides/uae-blocked-input-vat), such as entertainment and certain motor vehicles, rather than inside them.",
        "It applies per supply, measured against the value of the supply, not the size of the cash payment.",
      ],
    },
    {
      h: "How it connects to FTA Decision No. 13 of 2026",
      ps: [
        "FTA Decision No. 13 of 2026, issued on 22 July 2026 and effective from 1 October 2026, sets the checks a business must run on suppliers and supplies before deducting input tax, under Article 54(bis) of the VAT law. Article 4(2)(b) of that decision says the consideration shall be paid by electronic means, and that a cash payment must rest on a documented commercial reason, be made within the thresholds in the applicable tax legislation and be easily verifiable.",
        "Read together, the two rules point the same way. Above the Minister's threshold, cash loses recovery outright under Article 54(3). Below it, a cash payment to a supplier covered by Decision 13 still needs a written commercial reason and a verifiable trail. Decision 13 lets you skip its checks for supplies under AED 10,000 excluding VAT, but not where purchases from that supplier exceed AED 100,000 over the previous 12 months or are expected to over the next 12.",
      ],
    },
    {
      h: "What counts as cash, and the open questions",
      ps: [
        "The Executive Regulation does not define cash, and the controls that might define it are in the Ministerial Decision that has not been issued. The only nearby signal is Decision 13, which contrasts payment by electronic means with payment in cash. Until the Ministerial Decision or FTA guidance says more, treat the points below as open and document the position you take.",
      ],
      list: [
        "Banknotes and coins handed to the supplier: plainly cash.",
        "Bank transfers and payments by company card: electronic and traceable, and on any ordinary reading not cash.",
        "An employee paying a supplier with a personal card and being reimbursed: the supplier is paid electronically, so the supply looks card-settled, but keep the card slip with the claim. If the employee paid in cash, the reimbursement route does not change that.",
        "Cheques: neither cash nor electronic in the everyday sense. They leave a bank trail, but the text does not settle how they are treated.",
        "Cash deposited by you into the supplier's bank account: the money reaches a bank, but it starts as cash. This is a likely target of the controls and should not be relied on as a workaround.",
        "Part cash, part transfer: the text measures the value of the supply, not the cash portion. On a literal reading, a large supply partly settled in cash could lose recovery on the whole supply. Advisers have flagged this as unresolved.",
        "Intended to be paid in cash: the block can apply before any money moves. Cash on delivery terms, or a quote stating cash payment, are the obvious evidence of intent.",
        "Whether the threshold is measured including or excluding VAT, and how supplies straddling 1 October are treated, are also for the Ministerial Decision to settle.",
        "Splitting one purchase into several invoices to stay under the threshold is risky. It invites a [composite-supply](/guides/uae-vat-composite-bundled-supplies-2026) or commercial-substance challenge, and the controls may aggregate related supplies.",
      ],
    },
    {
      h: "Petty cash in practice",
      ps: [
        "Most petty cash spending is small: stationery, fuel top-ups, courier fees, site consumables, refreshments. Unless the Minister sets a very low threshold, these purchases will sit below the Article 54(3) line. The rules that already decide recovery on them still apply, and they are where most petty cash VAT is lost today.",
      ],
      list: [
        "You need a tax invoice to recover input VAT. A registered supplier may issue a simplified tax invoice to a registered customer where the consideration does not exceed AED 10,000, under Article 59(5)(b). It must show the words Tax Invoice, the supplier's name, address and TRN, the date, a description, and the total consideration with the tax charged in AED.",
        "A till slip without a TRN, a handwritten receipt or a card terminal slip on its own is not a tax invoice. No VAT is recoverable on it.",
        "Many small vendors are not VAT registered, and some supplies, such as local passenger transport, are exempt. There is no input VAT to recover on those, whatever the payment method.",
        "Staff reimbursements: the supplier's invoice should be addressed to, or at least support a claim by, the business, and the expense must be for business purposes. Employee-benefit costs follow the separate Article 53 rules, which [changed for staff accommodation](/guides/uae-vat-staff-accommodation-recovery-2026) on the same date.",
        "Site cash and project floats: this is where cash payments above any likely threshold happen, for subcontractors, equipment hire, materials and labour camps. These flows need moving to bank channels first.",
        "Record the settlement method on every petty cash line, not just the amount, so the Article 54(3) test can be run once the threshold is known.",
      ],
    },
    {
      h: "Worked example",
      ps: [
        "The threshold has not been set, so this example uses T for whatever amount the Ministerial Decision specifies. The purchases are illustrative. A VAT-registered contractor makes four purchases in October 2026, each with a valid tax invoice from a registered supplier, and each supplier has passed the Decision 13 checks where they apply.",
      ],
      list: [
        "Purchase A: scaffolding hire, AED 60,000 plus AED 3,000 VAT, paid by bank transfer. The payment method does not block recovery. AED 3,000 is recoverable under the normal rules.",
        "Purchase B: the same hire from another supplier, AED 60,000 plus AED 3,000 VAT, paid in cash on site. If AED 60,000 exceeds T, the AED 3,000 is not recoverable and becomes a cost of the project. If T is set above AED 60,000, Article 54(3) does not bite, but Decision 13 still requires a documented commercial reason for paying in cash.",
        "Purchase C: site consumables from a hardware shop, AED 800 plus AED 40 VAT, paid from petty cash with a simplified tax invoice. Unless T is set below AED 800, the AED 40 is recoverable. Without a simplified tax invoice it is not, whatever T is.",
        "Purchase D: equipment repair, AED 60,000 plus AED 3,000 VAT, with AED 10,000 paid in cash and the rest by transfer. On the literal reading, if AED 60,000 exceeds T, the whole AED 3,000 is at risk, not just the VAT on the cash part. Until guidance is issued, settle supplies like this entirely by bank.",
      ],
    },
    {
      h: "Checklist before 1 October 2026",
      list: [
        "Map every place cash leaves the business: petty cash boxes, site floats, driver and courier cash, cash on delivery, subcontractor and labour payments, retail and food and beverage purchasing.",
        "Rank those flows by supply value, not payment size, and flag any single supply that could plausibly exceed a threshold.",
        "Add a settlement method field to every purchase record: bank transfer, company card, personal card reimbursed, cheque, cash, mixed.",
        "Write a petty cash policy: a float limit, a cap on any single cash payment, a requirement for a tax invoice with a TRN, and a named approver.",
        "Change supplier payment terms and purchase orders so large suppliers are paid by transfer, and remove cash on delivery for anything above a small amount.",
        "Write down the commercial reason for any cash payment that remains, as Decision 13 requires, and keep the evidence with the invoice.",
        "Set up the Decision 13 supplier checks and the written policy naming who runs, reviews and supervises them.",
        "Watch for the Ministerial Decision, then apply the threshold and controls to purchases from 1 October and review anything already claimed.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "As set out in our guide to [Cabinet Decision 149 of 2026](/guides/uae-vat-cabinet-decision-149-2026-input-tax), the tax agent tests every inbound invoice against the [Article 59 tax-invoice checklist](/guides/uae-tax-invoice-checklist) before input VAT is claimed. From 1 October 2026 it also records the settlement method on every purchase and holds the input VAT on cash-settled supplies above the threshold once the Ministerial Decision sets it. Every hold names the rule and the missing evidence, and a person makes the call.",
      ],
    },
  ],
  related: [
    "uae-vat-cabinet-decision-149-2026-input-tax",
    "uae-tax-invoice-checklist",
    "uae-blocked-input-vat",
  ],
  cta: { href: "/invoice", label: "See how Hysaab Finance checks every purchase invoice" },
  faqs: [
    {
      q: "Can I claim VAT on cash purchases in the UAE after 1 October 2026?",
      a: "Yes for most small purchases, provided you hold a valid tax invoice. No where the value of the supply exceeds the amount set by the Minister of Finance and the consideration is paid, or intended to be paid, in cash. That block is new Article 54(3) of the VAT Executive Regulation.",
    },
    {
      q: "What is the cash payment threshold for input VAT in the UAE?",
      a: "As of 15 September 2026 it had not been published. Article 54(3) leaves the amount and the controls to a decision of the Minister of Finance. Until it is issued, map cash settlements and move large supplier payments to bank channels.",
    },
    {
      q: "Can I recover VAT on petty cash expenses?",
      a: "Only with a valid tax invoice from a VAT-registered supplier. For supplies of AED 10,000 or less to a registered business, a simplified tax invoice showing the supplier's TRN, the date, a description and the VAT charged is enough. A till slip without a TRN is not.",
    },
    {
      q: "Does paying part of an invoice in cash block all of the VAT?",
      a: "Possibly. Article 54(3) refers to the value of the supply, not the cash portion, so on a literal reading a supply above the threshold that is partly settled in cash could lose recovery in full. This has not been clarified, so settle large supplies entirely by bank.",
    },
    {
      q: "Is a card payment or bank transfer treated as cash?",
      a: "The Executive Regulation does not define cash. FTA Decision No. 13 of 2026 treats electronic payment as the norm and cash as the exception, so transfers and company card payments are the safe route. Cheques and cash deposited into a supplier's account are less clear.",
    },
    {
      q: "Do the FTA supplier due diligence rules apply to cash payments?",
      a: "Yes. From 1 October 2026, FTA Decision No. 13 of 2026 expects consideration to be paid electronically, and any cash payment needs a documented commercial reason, must stay within the thresholds in tax legislation and must be easily verifiable. Supplies under AED 10,000 excluding VAT are exempt from the checks unless purchases from that supplier exceed AED 100,000 over 12 months.",
    },
  ],
};

/* ── Sources relied on ────────────────────────────────────────────────

1. FTA, consolidated Executive Regulation (Cabinet Decision No. 52 of 2017 and its
   amendments, "not an official translation"), issue date 1 Sep 2026, published on
   tax.gov.ae 10 Sep 2026:
   https://tax.gov.ae/Datafolder/Files/Legislation/2026/Law-No-8-of-2017-and-its-amendments--09-2026.pdf
   - Cover page: Cabinet Decision No. 149 of 2026, issued 1 Sep 2026, effective 1 Oct 2026.
   - Article 54(3) wording (footnote 36: "Clause added as per Cabinet Decision No. 149 of 2026").
   - No definition of "cash" in Article 1 or elsewhere (text search found none).
   - Article 59(2): simplified tax invoice particulars.
   - Article 59(5)(b): simplified tax invoice allowed for a registered recipient where
     consideration "does not exceed AED 10,000". (Note: the existing
     uae-tax-invoice-checklist guide says "under AED 10,000"; the text says "does not exceed".)

2. FTA legislation index: https://tax.gov.ae/en/legislation.aspx
   - Fetched 15 Sep 2026: lists the consolidated Executive Regulation and FTA Decision
     No. 13 of 2026; no Ministerial Decision on cash payments / input tax threshold listed.

3. FTA Decision No. 13 of 2026 (unofficial translation PDF):
   https://tax.gov.ae/Datafolder/Files/Legislation/2026/FTA%20Decision%20No.%2013%20of%202026%20on%20Measures%2018%2008%202026.pdf
   (index page: https://tax.gov.ae/en/content/fta.decision.no.13.of.2026.on.measures.procedures.conditions.required.by.taxable.persons.for.verification.of.validity.and.integrity.of.supplies.aspx)
   - Issued 22 Jul 2026, effective 1 Oct 2026 (Article 7); scope Article 54(bis) (Article 2).
   - Article 4(2)(b): electronic payment; cash needs documented commercial reason, within
     thresholds in applicable tax legislation, easily verifiable.
   - Article 5(3)-(4): document checks, keep records, written policy naming responsible persons.
   - Article 6: exception for supplies under AED 10,000 excl. VAT; lost where supplier total
     exceeds AED 100,000 over previous or next 12 months.

4. Ministry of Finance announcement as republished by Dubai PR Network (8 Sep 2026):
   https://www.dubaiprnetwork.com/local-news/193887-ministry-of-finance-announces-amendments-to-the-vat-executive-regulation
   - Restriction on input tax where cash payments exceed thresholds to be prescribed by a
     decision of the Minister of Finance. (mof.gov.ae original not fetched; sharjah24 returned 403.)

5. Gulf News, 8 Sep 2026:
   https://gulfnews.com/business/markets/uae-changes-vat-rules-for-cash-payments-staff-housing-and-medical-products-1.500667220
   - Ministry quote: thresholds prescribed separately; aim to strengthen compliance and
     mitigate evasion risk.

6. Gulf News, 13 Sep 2026:
   https://gulfnews.com/business/tax-news/uae-vat-changes-could-make-large-cash-payments-more-expensive-for-businesses-1.500672960
   - Threshold not yet set / Ministerial Decision not issued as of 13 Sep.
   - Justin Whitehouse (Alvarez & Marsal): standalone restriction outside existing ineligible
     categories; retail, F&B, subcontractors, site petty cash, cash on delivery affected.
   - Partial cash settlement flagged as unresolved given "value of any supply" wording.

7. N.R. Doshi, 9 Sep 2026: https://www.nrdoshi.ae/uae-vat-changes-2026-operational-discipline
   - Threshold not in CD149; watch for Ministerial Decision.
   N.R. Doshi on Decision 13: https://www.nrdoshi.ae/fta-decision-13-2026-vat-input-tax-verification
   Khaleej Times, 20 Aug 2026: https://www.khaleejtimes.com/business/uae-introduces-mandatory-vat-supplier-and-supply-verification-checks
   - Corroborate Decision 13 details (primary PDF relied on instead).

8. VATupdate, 14 and 15 Sep 2026 (secondary, AI-assisted summaries):
   https://www.vatupdate.com/2026/09/14/uae-vat-changes-target-cash-payments-and-employee-accommodation/
   https://www.vatupdate.com/2026/09/15/uae-amends-vat-rules-to-clarify-medical-products-input-tax-credits-and-capital-assets-scheme/
   - Threshold still described as yet to be announced.

9. SERP check (related questions) for "can i claim vat on cash purchases uae" and
   "vat on petty cash expenses uae": ranking pages (alaan.com, paci.ae, naqood.ae,
   cleartax) focus on tax-invoice requirement for petty cash; used only for question framing.

Pre-cutoff knowledge (not re-fetched): local passenger transport is exempt under the VAT
Decree-Law (Article 46); Article 53 blocked categories include entertainment and certain
motor vehicles.

UNCERTAIN / NOT VERIFIED
- Threshold amount and controls: Ministerial Decision not found as of 15 Sep 2026. Re-check
  before publishing and after any MoF announcement.
- Treatment of cheques, cash deposits into supplier accounts, personal-card reimbursements,
  partial cash settlements, VAT-inclusive vs exclusive measurement, transitional supplies
  straddling 1 Oct, and aggregation of split invoices: all interpretation, not in any text.
- MoF announcement date of 8 Sep is from press republications; one search snippet said the
  decision was "issued on 8 September", which conflicts with the FTA consolidated text (1 Sep).
  The guide uses 1 Sep issue / 8 Sep announcement.
- The quoted Article 54(3) wording is from the FTA's unofficial English translation; the
  Arabic text governs.
- Could not fetch Big Four (KPMG, PwC, Deloitte) or IR Global / vatcalc commentary (403 or
  no results).
*/

const accommodation: Guide = {
  slug: "uae-vat-staff-accommodation-recovery-2026",
  title: "Can you recover VAT on staff accommodation in the UAE? The MoHRE test from 1 October 2026",
  description:
    "From 1 October 2026, input VAT on staff and labour accommodation passes the legal-obligation test in Article 53(1)(c) only where MoHRE decisions make it mandatory. The test, cost by cost, with a worked AED example.",
  updated: "2026-09-15",
  minutes: 8,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "From 1 October 2026, you can recover input VAT on accommodation you give your employees through the legal-obligation exception in Article 53(1)(c)(1) of the VAT Executive Regulation only where the accommodation is mandatory under decisions or directives issued by the Ministry of Human Resources and Emiratisation (MoHRE). A general duty under labour law is no longer enough, and the other route, a contractual obligation or documented policy, now depends on cases and conditions the Federal Tax Authority (FTA) has not issued at the time of writing.",
        "The change comes from Cabinet Decision No. 149 of 2026, issued on 1 September 2026, which amends Cabinet Decision No. 52 of 2017. It matters most to construction, facilities management, hospitality, manufacturing, logistics and oil and gas businesses that house large workforces. This guide sets out the test, applies it to each accommodation cost, and works through an example in dirhams. For the other changes in the same decision, see our guide to [Cabinet Decision 149 of 2026](/guides/uae-vat-cabinet-decision-149-2026-input-tax).",
      ],
    },
    {
      h: "What changed in the wording",
      ps: [
        "Article 53(1)(c) blocks input VAT on goods and services bought for employees free of charge and for their personal benefit, and then lists exceptions. The block itself is unchanged. The first two exceptions have been rewritten.",
      ],
      list: [
        "Legal obligation, before: recovery was allowed where there was a legal obligation to provide the goods or services under any applicable labour law in the State or a Designated Zone.",
        "Legal obligation, from 1 October 2026: recovery is allowed where provision is mandatory under the applicable labour legislation of the State or any free zone, including financial and non-financial free zones, but this does not include accommodation unless it is mandatory under MoHRE decisions or directives.",
        "Contract or policy, before: recovery was allowed where there was a contractual obligation or documented policy to provide the benefit so employees could perform their role, and it could be proven to be normal business practice.",
        "Contract or policy, from 1 October 2026: recovery is allowed where there is a contractual obligation or documented policy, in accordance with the cases and conditions specified by the FTA. The normal-business-practice test has gone, and the FTA conditions replace it.",
        "Unchanged: the exception for health insurance for employees and their family members, and the exception where the provision is a deemed supply.",
      ],
    },
    {
      h: "The decision tree for each accommodation cost",
      list: [
        "Step 1. Is the cost accommodation, or a different employee benefit? The MoHRE carve-out applies only to accommodation the employer provides. Transport, meals away from the camp and other benefits go through the general legal-obligation and contract-or-policy tests.",
        "Step 2. Does the supply carry VAT at all? Under FTA public clarification VATP003, labour accommodation that is occupied by employees as their principal place of residence, fixed to the ground, built or converted with lawful authority and not similar to a hotel or serviced apartment is residential, so its lease is exempt (or zero-rated if it is the first supply). There is no VAT on the rent to recover. Where the operator adds room cleaning, laundry and linen changes, catering, telephone and internet, or maintenance beyond general upkeep, the supply may be serviced accommodation and standard-rated at 5%.",
        "Step 3. Is the accommodation mandatory under a MoHRE decision? Law firm Clyde & Co reports that Ministerial Resolution No. 122 of 2026 requires an employer to provide accommodation in MoHRE-approved and registered labour accommodation where it has 50 or more workers and the worker's monthly wage does not exceed AED 1,500. Local authorities may widen that scope within an emirate by lowering the headcount or raising the wage cap. Check the resolution text and any emirate-level rule that applies to you.",
        "Step 4. If yes, recover under the normal rules: a valid tax invoice, use for taxable supplies, and settlement that will not fall foul of the new [cash-payment block in Article 54(3)](/guides/uae-vat-cash-payments-petty-cash-2026) once the Minister sets the threshold.",
        "Step 5. If no, the only remaining route is a contractual obligation or documented policy. The amended text does not exclude accommodation from that route, but recovery depends on FTA conditions that had not been issued at the time of writing, and some commentators read the change as closing it for housing. Until the FTA speaks, do not claim on the strength of a contract or HR policy alone. Hold the VAT and record the basis you would rely on.",
      ],
    },
    {
      h: "Cost by cost",
      list: [
        "Rent of a labour camp or staff building: if the lease is residential under VATP003, it is exempt and there is nothing to recover. If it is serviced accommodation, the 5% is recoverable only for workers the employer is required by MoHRE to house, or later under the FTA conditions.",
        "Serviced accommodation or hotel rooms used to house staff: hotels and serviced apartments are not residential buildings under Article 37 of the Executive Regulation, so these supplies carry 5%. Where they house staff, the same MoHRE test applies. A hotel night on a business trip is a separate question and is outside this guide.",
        "Utilities for the accommodation: electricity and water supplied to the employer carry VAT. The amendment does not list running costs separately. Because they are part of providing the accommodation, the cautious approach is to apply the same MoHRE test until the FTA says otherwise.",
        "Furniture, bedding and lockers: the same reasoning applies. Treat them as part of the accommodation and apply the MoHRE test.",
        "Maintenance, cleaning, pest control and security at the camp: when the landlord supplies these as incidental services with no extra fee, VATP003 treats them as part of the residential supply, so they follow the rent. When you buy them under your own contract, they carry 5% and the cautious approach is again the MoHRE test. As reported by Clyde & Co, Resolution No. 122 of 2026 itself sets standards such as licensed security guarding, free internet and periodic cleaning, which supports treating these as part of mandated accommodation where the mandate applies.",
        "Transport from the camp to site: this is not accommodation, so the MoHRE carve-out does not reach it. It falls under the general employee-benefit tests, and first check whether the supply carries VAT at all, because local passenger transport can be exempt. If you treat site transport as a business cost rather than a personal benefit, write down why.",
        "Housing allowance paid in cash: the employer buys no accommodation, so there is no input VAT to recover and the MoHRE test does not arise.",
      ],
    },
    {
      h: "Worked example: a contractor with 300 workers",
      ps: [
        "A Dubai contractor houses 300 workers in a camp run by an operator that provides beds, catering, laundry and room cleaning. The operator treats this as serviced accommodation and charges AED 1,100 per bed per month plus 5% VAT. Of the 300 workers, 220 earn AED 1,500 a month or less. The other 80 are foremen and technicians on higher wages. The camp is MoHRE-registered.",
      ],
      list: [
        "Monthly invoice: 300 beds × AED 1,100 = AED 330,000, plus VAT of AED 16,500.",
        "September 2026 invoice: under the old wording, the contractor could recover the full AED 16,500 where it could show a labour-law obligation, or a contract or documented policy that was normal business practice.",
        "From 1 October 2026, MoHRE-mandated beds: 220 × AED 1,100 = AED 242,000, VAT of AED 12,100, recoverable under the legal-obligation exception.",
        "From 1 October 2026, the other 80 beds: 80 × AED 1,100 = AED 88,000, VAT of AED 4,400. There is no MoHRE mandate, so this depends on the FTA conditions for the contractual route. Held until they are issued: AED 4,400 a month, or AED 52,800 a year.",
        "If the camp were instead a residential lease at AED 250,000 a month, the rent would be exempt. The contractor's own utilities (AED 40,000 plus AED 2,000 VAT) and security and cleaning contract (AED 30,000 plus AED 1,500 VAT) would still carry AED 3,500 of VAT. Split by headcount, 220/300 of it, about AED 2,567, passes the MoHRE test and about AED 933 is held. A headcount split is one reasonable way to evidence use. Record the method you choose.",
      ],
    },
    {
      h: "What to do before 1 October 2026",
      list: [
        "List every accommodation-related cost: rent, serviced beds, hotel stays used as housing, utilities, furniture, facilities management and security.",
        "Check how each supplier charges VAT, and ask camp operators whether they treat the supply as residential or serviced under VATP003.",
        "Count workers by wage band against the MoHRE threshold, by entity and by emirate, and keep the payroll evidence for each VAT period.",
        "Confirm each camp is MoHRE-approved and registered, and keep the registration record with the VAT file.",
        "Review employment contracts and HR policies, but do not rely on them for accommodation recovery until the FTA issues its conditions.",
        "Decide how you will split shared costs between mandated and other workers, and write the method down.",
        "Pay camp operators and accommodation suppliers by bank transfer, so the Article 54(3) cash block cannot apply.",
        "Watch for the FTA decision on the contractual route and for the final text of any MoHRE resolution you rely on.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "The tax agent already tests every inbound invoice against the [Article 59 tax-invoice checklist](/guides/uae-tax-invoice-checklist) before input VAT is claimed. From 1 October 2026 it also tags employee-benefit and accommodation costs and holds recovery until the legal-obligation or FTA-condition basis is recorded. Every hold names the rule and the missing evidence, and a person makes the call. The wider changes are covered in our guide to [Cabinet Decision 149 of 2026](/guides/uae-vat-cabinet-decision-149-2026-input-tax).",
      ],
    },
  ],
  related: [
    "uae-vat-cabinet-decision-149-2026-input-tax",
    "uae-blocked-input-vat",
    "uae-real-estate-vat",
  ],
  cta: { href: "/compliance", label: "See how Hysaab applies the October 2026 rules" },
  faqs: [
    {
      q: "Can I recover VAT on employee accommodation in the UAE from 1 October 2026?",
      a: "Under the legal-obligation exception in Article 53(1)(c)(1), only where the accommodation is mandatory under MoHRE decisions or directives. Otherwise recovery depends on the contractual-obligation or documented-policy exception, which applies under cases and conditions the FTA had not issued at the time of writing.",
    },
    {
      q: "Which employers must provide accommodation to workers under MoHRE rules?",
      a: "As reported by Clyde & Co, Ministerial Resolution No. 122 of 2026 requires employers with 50 or more workers to provide MoHRE-approved and registered accommodation for workers whose monthly wage does not exceed AED 1,500. Local authorities can widen the scope within an emirate. Check the resolution itself before relying on it.",
    },
    {
      q: "Is labour accommodation rent subject to VAT in the UAE?",
      a: "It depends on what is supplied. FTA public clarification VATP003 treats labour accommodation used as a principal place of residence, fixed to the ground, lawfully built and not hotel-like as residential, so the lease is exempt or zero-rated on first supply. Accommodation with room cleaning, laundry, catering or similar services can be serviced accommodation and standard-rated at 5%.",
    },
    {
      q: "Can I still rely on the employment contract to recover VAT on staff housing?",
      a: "Not safely for now. The amended text allows recovery on a contractual obligation or documented policy only in accordance with cases and conditions specified by the FTA, and those had not been issued at the time of writing. Hold the VAT and record the basis until they are.",
    },
    {
      q: "Does paying a housing allowance change the VAT position?",
      a: "Yes. A cash allowance is not a purchase of accommodation by the employer, so there is no input VAT on it and the Article 53 test does not arise. The employee's own rent is a matter between the employee and the landlord.",
    },
    {
      q: "Do the new rules apply to hotel stays for staff?",
      a: "Hotels and serviced apartments carry 5% VAT. Where they are used to house staff, the same MoHRE test applies from 1 October 2026. Hotel stays on business trips raise different questions and are not covered by the accommodation carve-out analysis in this guide.",
    },
  ],
};

/* ── Sources relied on (all fetched 15 Sep 2026) ─────────────────────────

1. FTA consolidated Executive Regulation, Cabinet Decision No. 52 of 2017 and its amendments
   ("not an official translation", as published by the Ministry of Finance):
   https://tax.gov.ae/Datafolder/Files/Legislation/2026/Law-No-8-of-2017-and-its-amendments--09-2026.pdf
   - Cover: CD 149 of 2026 issued 1 Sep 2026, effective 1 Oct 2026.
   - Article 53(1)(c)(1) new wording: mandatory under labour legislation of the State or any free
     zone incl. financial and non-financial free zones, "provided that this does not include the
     accommodation provided by the employer to its employees, unless the provision of such
     accommodation is mandatory pursuant to the decisions or directives issued by the Ministry of
     Human Resources and Emiratisation" (footnote 34: amended by CD 149 of 2026).
   - Article 53(1)(c)(2): contractual obligation or documented policy "in accordance with the cases
     and conditions specified by the Authority" (footnote 35: amended by CD 149 of 2026). Note: the
     text does NOT expressly exclude accommodation from route (2).
   - Article 53(1)(c)(3) health insurance and (4) deemed supply retained.
   - Article 37(2): hotels, motels, B&Bs, hotel apartments, serviced apartments are not residential buildings.
   - Article 54(3): cash block above a Minister-set amount. Article 4(6): substance test for composite supplies.

2. FTA Executive Regulation, consolidated as published 17 Nov 2022 (pre-2024 amendment):
   https://tax.gov.ae/Datafolder/Files/Legislation/Executive%20Regulation%20of%20Federal%20Decree%20Law%20No%208%20of%202017%20-%20Publish%2017112022.pdf
   - Old Article 53(1)(c)(1) "legal obligation ... under any applicable labour law in the State or
     Designated Zone"; old (c)(2) "contractual obligation or documented policy ... in order that they
     may perform their role and it can be proven to be normal business practice"; (c)(3) deemed supply.

3. FTA public clarification VATP003, Labour accommodation: residential versus serviced property:
   https://tax.gov.ae/DataFolder/Files/Pdf/03-Labour-Accomodation-residential-versus-serviced-property.pdf
   (index: https://tax.gov.ae/en/content/labour.accommodation.residential.versus.serviced.property.aspx)
   - Four residential conditions; exempt (or zero-rated first supply) vs serviced standard-rated;
     incidental services list (communal cleaning, general maintenance, pest control, garbage,
     security, utilities, facilities access); serviced indicators (telephone/internet, room cleaning,
     laundry/linen, catering, non-general maintenance); composite vs mixed supply discussion.

4. Clyde & Co, "UAE MHRE updates labour accommodation requirements", 30 Jun 2026 (Sara Khoja, Sarit Thomas):
   https://www.clydeco.com/en/insights/2026/06/uae-mhre-updates-labour-accommodation-requirements
   - Ministerial Resolution No. 122 of 2026; applies where employer has 50 or more workers and the
     worker's monthly wage does not exceed AED 1,500; commission-based workers at occupational level 5+
     excluded from the wage threshold; provide accommodation in MHRE-approved and registered labour
     accommodation; repeals MR 44 of 2022 (as amended) and MR 516 of 2024; local authorities may lower
     headcount / raise wage cap; standards incl. 24/7 licensed security guarding, free internet,
     periodic specialised cleaning.

5. Gulf News, 13 Sep 2026:
   https://gulfnews.com/business/tax-news/uae-vat-changes-could-make-large-cash-payments-more-expensive-for-businesses-1.500672960
   - Affected sectors (construction, hospitality, manufacturing, FM, oil and gas, logistics); FTA has
     not yet specified the "cases and conditions"; Justin Whitehouse (A&M) on retesting structures
     built on a general labour-law obligation.

6. Ministry of Finance announcement (8 Sep 2026) as republished by Dubai PR Network:
   https://www.dubaiprnetwork.com/local-news/193887-ministry-of-finance-announces-amendments-to-the-vat-executive-regulation
   - Amendments include "clarifying the provisions relating to employee accommodation for input tax recovery purposes".

7. Secondary commentary used for People-Also-Ask framing and to note the split reading of route (2):
   https://english.uaevartha.com/uae-overhauls-vat-rules-large-cash-payments-and-staff-housing-face-tighter-tax-recovery-tests/
     (reads voluntary accommodation as non-recoverable; contractual route described for non-housing benefits)
   https://www.nrdoshi.ae/uae-vat-changes-2026-operational-discipline
   https://www.vatupdate.com/2026/09/14/uae-vat-changes-target-cash-payments-and-employee-accommodation/
   https://www.alphaauditing.ae/vat/uae-vat-changes-2026/ ; https://www.daftra.com/en/hub/non-recoverable-input-vat-in-uae

Pre-cutoff knowledge, not re-fetched: local passenger transport is exempt under Article 46 of the
VAT Decree-Law (guide says "can be exempt"); residential leases exempt under the Decree-Law.

UNCERTAIN / NOT VERIFIED
- MR 122 of 2026: primary text not fetched (MoHRE site search did not surface it). Effective date and
  any transition period not stated in the Clyde & Co note. Guide attributes the thresholds to Clyde & Co.
- Whether Article 53(1)(c)(2) (contract/policy) remains open to accommodation: text does not exclude
  it; FTA conditions pending; commentators differ. Guide takes the cautious "hold" position.
- Whether utilities, furniture, FM, security and cleaning count as "accommodation" for the carve-out:
  not addressed in the text. Guide recommends the cautious approach (apply MoHRE test). NB the parent
  guide says these "keep the existing treatment"; consider aligning the parent wording.
- Per-worker split (mandated vs non-mandated workers) and headcount apportionment of shared camp costs
  are the author's reading, not stated in CD 149 or MR 122.
- Whether the old (c)(1)/(c)(2) wording changed between the 2022 consolidation and CD 100 of 2024:
  footnote shows Article 53 amended by CD 100/2024 (health insurance); assumed (c)(1)/(c)(2) unchanged.
- No transitional rule found for periodic or advance-billed accommodation spanning 1 Oct 2026; not
  mentioned in the guide.
- Worked-example figures (AED 1,100 per bed, 220/80 split, AED 250,000 rent etc.) are illustrative.
*/

const bundled: Guide = {
  slug: "uae-vat-composite-bundled-supplies-2026",
  title: "Composite or mixed supply? Bundled VAT rates in the UAE after 1 October 2026",
  description:
    "How UAE VAT treats a package whose parts carry different rates. The Article 4 tests, what new Article 4(6) changes from 1 October 2026, why a separate price is no longer a safe answer, and a worked AED example.",
  updated: "2026-09-15",
  minutes: 9,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "From 1 October 2026, new Article 4(6) of the VAT Executive Regulation, added by Cabinet Decision No. 149 of 2026, stops a taxable person treating a multi-component supply as several supplies where the nature and economic substance of the supply show the components are interconnected and cannot be separated. That supply is a single composite supply and, under Article 46(1)(a) of the Executive Regulation, it takes the VAT treatment of its principal component.",
        "Federal Decree-Law No. 8 of 2017 deals with the point in a single line: Article 47 leaves it to the Executive Regulation (Cabinet Decision No. 52 of 2017) to set the rules for a supply of more than one component where the components carry different tax treatments. So the whole framework sits in Articles 4 and 46 of the Executive Regulation, and that is where the change has landed.",
      ],
    },
    {
      h: "Composite, multiple and mixed supplies: before and after 1 October 2026",
      ps: [
        "UAE legislation uses two categories, not three. A single composite supply is one supply taxed at one treatment. Anything else is multiple supplies, and under Article 46(2) each component is taxed on its own terms. The phrase mixed supply does not appear in the UAE text. It comes from India's GST, where a mixed supply is taxed at the highest rate in the bundle; there is no equivalent highest-rate rule in the UAE. When people search for a mixed supply in the UAE, they are asking about multiple supplies.",
        "Article 4(3) describes when a single composite supply exists: either there is a principal component plus components that are necessary or incidental to it, or that are a means of better enjoying it; or there are two or more elements so closely linked that splitting them would be impossible or unnatural. Where a single composite supply has no principal component, Article 46(1)(b), added by Cabinet Decision No. 100 of 2024, applies the treatment that fits the nature of the supply as a whole.",
        "Before 1 October 2026, form usually won. Article 4(4), as redrafted by Cabinet Decision No. 100 of 2024 with effect from 15 November 2024, requires two conditions for a single composite supply: the price of the components is not separately identified or charged, and all components come from a single supplier. The FTA's VAT Public Clarification VATP040, dated 14 March 2025, confirmed that a supply meeting Article 4(3) is still not a single composite supply unless Article 4(4) is met, and that a single overall price does not help if the invoice, quote or contract shows a price for each component. Its examples were a marketing campaign with venue, catering and promotional goods priced in the contract, and a mobile phone sold with maintenance and warranty listed separately. In practice, itemising the components on the paperwork was enough to tax each one separately.",
        "From 1 October 2026, substance comes first. Article 4(6) says a taxable person may not treat a multi-component supply as multiple supplies where its nature and economic substance show the components are interconnected and inseparable. Article 4(4) has not been deleted: the consolidated text published by the FTA keeps both clauses. How the FTA will reconcile the two had not been clarified at the time of writing. The practical reading is that a separate price line is no longer a defence on its own. If a bundle's parts carry different rates and you tax them separately, you now need evidence that the parts are genuinely separable, not just separately priced.",
      ],
    },
    {
      h: "Testing a bundle: the questions to ask",
      ps: [
        "Article 4(2) tells you to look at the contract and the wider circumstances of the supply. Work through the same questions for every package that mixes standard-rated, zero-rated or exempt parts, and write the answers down.",
      ],
      list: [
        "What is the customer actually buying? Describe the supply from the typical customer's point of view in one sentence. If the sentence names one thing, the other parts are probably ancillary.",
        "Could the parts be bought separately in practice? Look for real standalone prices, customers who opt out of a component, and the same component sold to people who do not buy the rest. A theoretical option nobody takes up is weak evidence.",
        "Is one part ancillary? Ask whether it is necessary or essential to the main supply, normally accompanies it without being a significant part of it, or has no purpose for the customer except to enjoy the main supply better. Those are the Article 4(3)(a) descriptions.",
        "Would splitting be artificial? If removing a part would make the rest unusable or change what is supplied, the elements may be so closely linked that splitting is unnatural under Article 4(3)(b).",
        "How is it sold and marketed? A single package name, one booking flow, a headline price and advertising built around one outcome all point towards one supply.",
        "What do the contracts say, and do they match what happens? Check separate schedules, termination rights per component, service levels and who performs each part. Where a component is subcontracted, VATP040 treats the supplier as still supplying it if the supplier stays contractually responsible to the customer.",
        "Does a specific rule already decide the component? Some zero-rating and exemption articles name items directly. Check those before relying on the principal component.",
      ],
    },
    {
      h: "Where it bites: sector examples",
      ps: [
        "Each outcome below depends on the facts of the package. These are the places to test first, not conclusions.",
      ],
      list: [
        "Education. Tuition from a qualifying institution is zero-rated under Article 40(1). Article 40(4) then lists items that are not zero-rated, and for uniforms and electronic devices it says so irrespective of whether they are supplied as part of the educational service. On a plain reading, a composite-supply argument cannot zero-rate those items. Transport is different: the FTA's Education Sector VAT Guide (VATGED1, June 2026) treats local passenger transport in a qualifying bus as exempt. Whether a school bus service is separable from tuition depends on facts such as whether families can opt out.",
        "Healthcare. Treatment by a licensed provider is zero-rated under Article 41(2), and goods supplied in the course of zero-rated treatment that are necessary for it are zero-rated under Article 41(4)(b). Article 41(3)(a) already excludes stays at an establishment whose main purpose is holiday accommodation or entertainment, where the healthcare is incidental. Wellness retreats, private-suite upgrades, companion accommodation and cosmetic add-ons are the components to test.",
        "Real estate plus services. A [residential lease is exempt](/guides/uae-real-estate-vat) under Article 46(2) of the Decree-Law and Article 43 of the Executive Regulation, while hotel apartments and serviced apartments fall outside the definition of a residential building under Article 37(2)(c). A residential lease sold with cleaning, furnishing or facility services, priced separately, is the kind of package where the substance test may now decide whether the services follow the lease, or whether the whole arrangement is really serviced accommodation.",
        "Hospitality packages. Hotel accommodation is standard-rated, so the rate question arises where a package includes a component that is otherwise exempt or zero-rated. Transport is a common one, and Article 45(4) already denies local passenger transport exemption where the trip is held out as a pleasure trip, such as sightseeing or entertainment.",
        "Telecoms and digital bundles. Devices, airtime, maintenance and warranties are usually all standard-rated, so the rate rarely changes. VATP040 used a phone bundle to show that separate price lines stopped composite treatment before October. Test bundles where one element could carry a different treatment, for example an instalment arrangement that includes credit.",
        "Bundled financial products. Under Article 42(3)(a) and 42(4), financial services with no explicit fee are exempt and those charged by explicit fee are standard-rated; life insurance is exempt under Article 42(3)(c). Account packages and card products that combine margin-based services, fees and third-party benefits need a documented view of whether the fee is consideration for a separate supply or part of one financial service.",
      ],
    },
    {
      h: "Worked example: a school fee package",
      ps: [
        "This example is illustrative. The figures are invented and the outcome depends on the school's facts. A qualifying school charges each family AED 66,000 a year, itemised as AED 60,000 tuition, AED 4,000 bus transport and AED 2,000 uniforms.",
      ],
      list: [
        "Treated as multiple supplies: tuition AED 60,000 at 0% = AED 0; transport AED 4,000 exempt = AED 0; uniforms AED 2,000 at 5% = AED 100. Output VAT AED 100 per pupil, invoice total AED 66,100.",
        "Treated as one composite supply following zero-rated tuition: output VAT AED 0, invoice total AED 66,000. Across 1,200 pupils that looks like AED 120,000 a year less output VAT.",
        "But the uniform VAT does not go away. Article 40(4)(c) keeps uniforms out of zero-rating irrespective of whether they are supplied as part of the educational service, so on a plain reading the AED 100 per pupil stays payable under either analysis.",
        "The real difference is input VAT on transport. Suppose the school's bus costs are AED 1,000,000 plus AED 50,000 VAT. If transport is a separate exempt supply, the AED 50,000 relates to an exempt supply and is not recoverable. If transport were part of a single zero-rated supply, it would be recoverable.",
        "Applying the tests: if families can decline the bus, pay for it on a separate schedule and use their own transport, the service is separable in practice and multiple-supply treatment is well supported. A school that zero-rates transport and recovers the AED 50,000 needs evidence that the bus is inseparable from tuition, and a separate price line now works against it as well as for it.",
      ],
    },
    {
      h: "What to hold on file from 1 October 2026",
      list: [
        "A register of every package, bundle and multi-element contract, listing each component, the supplier of each part and the VAT treatment applied.",
        "A dated, written assessment per bundle that works through the test questions, names the principal component or explains why there is none, and records who reviewed it.",
        "Evidence of separability where you tax parts separately: standalone price lists, opt-out numbers, sales of components on their own and customer choices at the point of sale.",
        "The contracts, terms, quotes, booking screens and marketing material for each package as they stood on 1 October 2026, and each later version.",
        "Invoice templates that describe components consistently with the assessment.",
        "Where one price covers multiple supplies, the method used to allocate it between components, such as standalone selling prices, applied consistently.",
        "A link between purchase costs and the component they support, because the answer changes which input VAT you can recover, and for mixed businesses how the [partial exemption ratio](/tools/uae-partial-exemption-calculator) works out.",
        "A review trigger whenever a package, price structure or subcontracting arrangement changes, and a note of any clarification requested from the FTA.",
      ],
    },
    {
      h: "How Hysaab applies this",
      ps: [
        "As set out in our guide to [Cabinet Decision 149 of 2026](/guides/uae-vat-cabinet-decision-149-2026-input-tax), the Hysaab tax agent flags invoices where separately priced components carry different VAT rates so the composite-supply position is documented. It does not decide whether a package is one supply or several; a person makes the call.",
      ],
    },
  ],
  related: [
    "uae-vat-cabinet-decision-149-2026-input-tax",
    "uae-real-estate-vat",
    "uae-partial-exemption-input-vat",
  ],
  cta: { href: "/compliance", label: "See how Hysaab applies the October 2026 rules" },
  faqs: [
    {
      q: "What is a single composite supply under UAE VAT?",
      a: "A supply with more than one component that is treated as one supply. Under Article 4(3) of the Executive Regulation, it has a principal component with necessary or ancillary parts, or elements so closely linked that splitting them would be unnatural. Under Article 46(1), the whole supply takes the VAT treatment of the principal component.",
    },
    {
      q: "Is there a mixed supply in UAE VAT?",
      a: "Not as a legal term. UAE law distinguishes a single composite supply from multiple supplies, and each of the multiple supplies is taxed on its own terms under Article 46(2). There is no rule taxing a bundle at its highest rate, which is how mixed supplies work under India's GST.",
    },
    {
      q: "Does separate pricing still keep bundled components apart from 1 October 2026?",
      a: "Not on its own. New Article 4(6) prevents treating components as separate supplies where their nature and economic substance show they are interconnected and inseparable. Article 4(4), which lists separate pricing as a bar to composite treatment, remains in the text, and the FTA had not explained how the two interact at the time of writing.",
    },
    {
      q: "What if a composite supply has no principal component?",
      a: "Article 46(1)(b), added by Cabinet Decision No. 100 of 2024, applies the treatment that generally fits the nature of the supply as a whole.",
    },
    {
      q: "Can a school zero-rate uniforms by bundling them with tuition?",
      a: "On a plain reading, no. Article 40(4)(c) excludes uniforms from zero-rating irrespective of whether they are supplied as part of the educational service. The composite-supply question matters more for items without a specific rule, such as transport.",
    },
  ],
};

/* Sources relied on (all fetched 15 Sep 2026)

1. FTA consolidated Executive Regulation, Cabinet Decision No. 52 of 2017 and its
   amendments (not an official translation), cover lists Cabinet Decision No. 149 of 2026
   issued 1 Sep 2026, effective 1 Oct 2026:
   https://tax.gov.ae/Datafolder/Files/Legislation/2026/Law-No-8-of-2017-and-its-amendments--09-2026.pdf
   Supports: Article 4(1) to (6) wording, including new Clause 6 (footnote "Clause added as
   per Cabinet Decision No. 149 of 2026") and retention of Article 4(4)(a) and (b);
   Article 46(1)(a), (1)(b) and (2); Article 37(2)(b) and (c); Article 40(1), (4)(c), (d), (g);
   Article 41(2), (3)(a), (4)(b); Article 42(3)(a), (c) and 42(4); Article 43; Article 45(1),
   (2), (4).

2. FTA consolidated Executive Regulation as published 18 Sep 2025 (pre-CD149):
   https://tax.gov.ae/Datafolder/Files/Legislation/Executive-Regulation-of-Federal-Decree-Law-No-08-of-2017-Publish-18-09-2025.pdf
   Supports: pre-amendment Article 4 had Clauses 1 to 5 only; Article 4 and 46 footnoted as
   amended by Cabinet Decision No. 100 of 2024 (issued 6 Sep 2024, effective 15 Nov 2024).

3. Federal Decree-Law No. 8 of 2017 (FTA PDF):
   https://tax.gov.ae/DataFolder/Files/Pdf/VAT-Decree-Law-No-8-of-2017.pdf
   Supports: Article 47 "Supply of More Than One Component" delegates to the Executive
   Regulation. NOTE: the brief referred to "Article 46 of the Decree-Law"; Decree-Law
   Article 46 is exemptions (residential buildings in 46(2)). The composite-supply
   treatment rule is Article 46 of the Executive Regulation. Decree-Law 46(2) also checked at
   https://uae.shushin.io/taxlaw/vat/federal-decree-8-2017

4. FTA VAT Public Clarification VATP040, Amendments to the Executive Regulation, Cabinet
   Decision No. 100 of 2024, PDF dated 14 03 2025:
   index https://tax.gov.ae/en/content/amendments.to.the.executive.regulation.of.federal.decreelaw.no.8.of.2017.on.value.added.tax.cabinet.decision.no.100.of.2024.aspx
   PDF https://tax.gov.ae/Datafolder/Files/Pdf/2025/VATP040%20-%20Amendments%20to%20VAT%20ER%20-%2014%2003%202025.pdf
   Supports: Article 4(4) must be met even where 4(3) applies; subcontracting with contractual
   responsibility still single supplier; separate identification in invoice, quote or contract
   defeats composite treatment; marketing campaign and mobile phone examples; Article
   46(1)(b) no principal component.

5. Ministry of Finance announcement, 8 Sep 2026 (as republished):
   https://www.dubaiprnetwork.com/local-news/193887-ministry-of-finance-announces-amendments-to-the-vat-executive-regulation
   Supports: CD149 includes provisions on single composite supply "in line with the economic
   substance of the supply".

6. Education Sector VAT Guide VATGED1 (June 2026), via secondary summaries (FTA PDF not fetched):
   https://regfollower.com/uae-fta-issues-updated-vat-guide-for-educational-services/
   https://www.vatupdate.com/2026/07/18/fta-publishes-first-standalone-education-sector-vat-guide-vatged1-zero-rating-sharpened-ancillary-supplies-recalibrated/
   Supports: local passenger transport in a qualifying bus exempt; uniforms 5%.

7. Adviser commentary on CD149 composite rule:
   https://www.nrdoshi.ae/uae-vat-changes-2026-operational-discipline (separate pricing no
   longer determinative; "what is the customer actually buying"; sectors incl. hospitality,
   healthcare bundles, technology subscriptions)
   https://irglobal.com/article/uae-vat-update-cabinet-decision-no-149-of-2026/ (403 on fetch;
   search snippet only: new Clause 6 of Article 4, issued 1 Sep, effective 1 Oct 2026)
   https://kpmg.com/ae/en/insights/tax-insights/rethinking-single-composite-supply-under-uae-vat.html
   (pre-CD149 critique of Article 4(4); cites CJEU Stadion Amsterdam C-463/16; not cited in guide)
   https://legalblogs.wolterskluwer.com/international-tax-law-blog/one-or-more-supplies-the-uae-vat-attempt-to-codify-it/
   (2018: separate price and single supplier conditions existed in the original Article 4(4))

8. SERP check for target queries (15 Sep 2026): "composite supply uae vat" led by Tally,
   Kluwer, KPMG, VATupdate, JCA, Zoho; "mixed supply vs composite supply uae" dominated by
   Indian GST pages, so the mixed-supply framing is an opening. No Big Four page on CD149
   Article 4(6) was found (PwC pages returned 403; no KPMG, Deloitte, GT, A&M or Baker
   McKenzie CD149 alert surfaced in search).

Uncertain or inferred claims
- How Article 4(6) interacts with retained Article 4(4)(a) (separate pricing) and 4(4)(b)
  (single supplier): not clarified by the FTA; guide says so.
- Article 4(1) and 4(5) speak of "one price"; 4(6) does not. Whether 4(6) reaches components
  billed under wholly separate fee schedules is open.
- "Specific rule prevails" (uniforms stay 5% under Article 40(4)(c) even in a composite
  package) is a plain-reading inference, not FTA guidance.
- Input VAT on exempt school transport being irrecoverable is the general rule; actual
  outcome depends on attribution and apportionment.
- Sector examples beyond education are framed as places to test; no FTA guidance on those
  bundles under 4(6) was found.
- The mixed-supply comparison to India's GST (highest rate) is from general knowledge, not a
  fetched source.
- VATGED1 details rely on secondary summaries, not the FTA PDF itself.
- No transitional rule for contracts spanning 1 Oct 2026 was found; guide does not address it.
*/

export const CD149_GUIDES: Guide[] = [accommodation, cash, bundled];
