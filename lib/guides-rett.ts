import type { Guide } from "./guides";

/* ── Saudi Real Estate Transaction Tax (RETT): the cluster ─────────
   A pillar (/guides/ksa-real-estate-transaction-tax) and three spokes:
   exemptions, share transfers in real estate companies, and the
   accounting. Written against ZATCA's Detailed Guideline for RETT,
   version 6 (May 2026), which applies the RETT Law (Royal Decree M/84,
   in force 10 April 2025) and its Implementing Regulations (ZATCA Board
   Resolution 25-03-01). Sources checked on 27 September 2026 are listed
   at the end of this file; re-check them when ZATCA issues a new
   guideline version. */

const pillar: Guide = {
  slug: "ksa-real-estate-transaction-tax",
  title: "Saudi Real Estate Transaction Tax (RETT): the 5% tax on property transfers, explained",
  description:
    "How Saudi Arabia's 5% Real Estate Transaction Tax works under the 2025 RETT Law: what counts as a transaction, the fair-market-value floor, who pays, when it is due, the first-home relief, penalties, and how RETT sits beside VAT.",
  updated: "2026-09-27",
  minutes: 8,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "Real Estate Transaction Tax (RETT) is a 5% tax on the value of almost every transfer of real estate in Saudi Arabia. It replaced VAT on property sales on 4 October 2020, and since 10 April 2025 it has sat in its own statute, the Real Estate Transaction Tax Law issued by Royal Decree No. M/84, with new Implementing Regulations approved by the ZATCA Board.",
        "The seller (the law calls them the assignor) is liable. The tax is charged on the agreed price, but never on less than fair market value. For a notarised sale it must be paid before the notary will register the transfer. There is no registration threshold and no return: every transaction is declared and paid, one by one, through the RETT service on the ZATCA portal.",
      ],
    },
    {
      h: "What counts as a real estate transaction",
      ps: [
        "RETT is not limited to sales. ZATCA's guideline defines a real estate transaction as any transaction that transfers the ownership of real estate, or its benefit, permanently, whether directly or indirectly, or that transfers its benefit for more than 50 years. The condition and use of the property do not matter: land, buildings, part of a building, an undivided share or a single residential unit are all in scope.",
        "Real estate itself now includes fixtures and equipment that form a fixed part of, or are permanently attached to, a building or engineering structure. That matters for hotels, industrial plants and energy assets, where the line between the building and the equipment inside it moves the tax base.",
      ],
      list: [
        "Sales, barter and exchanges, including a sale to a relative.",
        "Gifts and waivers, unless the [gift exemption](/guides/ksa-rett-exemptions) applies.",
        "Finance leases, lease-to-own and Islamic ijarah ending in ownership.",
        "Usufruct rights granted for more than 50 years.",
        "Transfers of 30% or more of the interests in a [real estate company](/guides/ksa-rett-share-transfers-real-estate-companies), in one deal or in linked deals within three years.",
        "Build-own-operate-transfer (BOOT) projects, taxed when ownership actually transfers.",
        "Transactions evidenced only by an unofficial document, such as a private contract that is never notarised.",
      ],
    },
    {
      h: "What falls outside the tax",
      ps: [
        "The Implementing Regulations take some events out of scope altogether, which is different from an exemption: nothing needs to be claimed and no condition can be breached later.",
      ],
      list: [
        "Subdividing land into separate plots while the same co-owners keep the same shares in each plot.",
        "Partitioning land held under a single deed among its co-owners, where each owner receives exactly their recorded share and no money changes hands between them.",
        "A capital increase in a real estate company that leaves every existing partner's percentage unchanged, or that brings in a new investor while the existing partners keep their interests for five years.",
        "The second leg of a Murabaha or finance-lease structure: the bank's purchase is taxed once, and the transfer to the customer under the same contract, for the same property and value, is not taxed again.",
        "Transfers of interests in a real estate company below the 30% threshold.",
      ],
    },
    {
      h: "The tax base: agreed price, with a fair-market-value floor",
      ps: [
        "RETT is 5% of the value agreed between the parties, provided that value is not below fair market value on the date of the transaction. The base includes everything inseparable from the property, such as licences and real rights attached to it. It excludes the profit margin built into a licensed financing arrangement: if a buyer pays SAR 1,400,000 over ten years for a SAR 1,000,000 home, the tax is SAR 50,000, not SAR 70,000.",
        "Where the parties understate the price, ZATCA taxes the market value. The guideline's own example is land sold between relatives for SAR 1,000,000 when its market value was SAR 1,500,000: the tax is 5% of SAR 1,500,000, which is SAR 75,000.",
      ],
      list: [
        "Share transfers in a real estate company: the higher of the market value of all its real estate multiplied by the percentage transferred, or the price allocated to the real estate.",
        "Usufruct over 50 years: the higher of the present value of the market value of the right, or the present value of the agreed payments over the whole term. If the payments are later changed, the parties must ask for the tax to be recalculated.",
        "BOOT projects: market value on the date ownership actually transfers, not on the date of the contract.",
      ],
    },
    {
      h: "Who pays, and when",
      ps: [
        "The assignor, meaning the seller, donor or grantor, is liable to ZATCA. Parties often agree that the buyer will bear the tax, and any person may pay the invoice, but that agreement does not move the legal liability. The 2025 regulations narrowed the buyer's exposure: the buyer is only jointly liable where ZATCA shows the buyer caused the non-payment, for example by agreeing to understate the price or by presenting an invalid first-home certificate.",
        "For a notarised sale the tax falls due on the date of notarisation and must be paid on or before it; the Ministry of Justice system will not complete the transfer until ZATCA shows the tax paid or the transaction exempt. Transactions without notarisation have their own due dates:",
      ],
      list: [
        "Possession handed over for ownership without notarisation: due on handover, pay within 30 days.",
        "Transfer of interests in a real estate company: due on the earlier of the transfer or an unconditional agreement to transfer, pay within 30 days.",
        "Usufruct over 50 years: due on the grant (unless cancelled within 30 days), pay within 30 days.",
        "BOOT projects: due on the actual transfer of ownership, pay within 30 days if not notarised.",
        "An exempt transaction whose conditions are later breached: due on the breach, pay within 30 days.",
      ],
    },
    {
      h: "The first-home relief: the state pays on the first SAR 1 million",
      ps: [
        "For a Saudi citizen buying a first home, the state bears the RETT on the price up to SAR 1,000,000. The buyer obtains a First Home certificate from the Ministry of Municipalities and Housing portal (housing.gov.sa) and gives it to the seller, who enters it when registering the sale on the ZATCA portal. ZATCA checks eligibility, and 5% applies only to the part of the price above SAR 1,000,000.",
        "On a SAR 1,300,000 first home the full tax would be SAR 65,000. The state bears SAR 50,000 (5% of SAR 1,000,000) and SAR 15,000 (5% of the remaining SAR 300,000) is paid. If the certificate later proves invalid, both seller and buyer can be pursued for the tax.",
      ],
    },
    {
      h: "Penalties",
      ps: [
        "Late payment costs 2% of the unpaid tax for each month or part of a month, starting the day after the payment deadline and capped at 50% of the unpaid tax. That is down from 5% a month under the pre-2025 regulations. If ZATCA itself amends the tax due, a further 1% a month applies to the unpaid amount. On SAR 200,000 of tax paid 75 days late, three months or part-months have run, so the fine is 6%, or SAR 12,000.",
        "Other breaches of the law, including refusing to provide documents ZATCA asks for, carry a fine of up to the tax due or SAR 50,000, whichever is greater. Tax evasion, such as understating the price with forged documents or misusing an exemption, carries a fine of up to three times the tax evaded, and anyone who helps is treated as a party to it.",
      ],
    },
    {
      h: "RETT and VAT: two separate taxes",
      ps: [
        "Since 4 October 2020, supplies of real estate that transfer ownership are exempt from VAT and subject to RETT instead. ZATCA says plainly that there is no link between the two: RETT is not VAT, it does not appear on a VAT return, and it cannot be recovered as input tax. A business whose only activity was selling real estate has its VAT registration cancelled; one that also leases commercial property or provides other taxable services stays registered and handles each sale separately through the RETT service.",
        "Transactions already charged to VAT before RETT existed are not taxed twice. Where an ijarah or Murabaha contract was concluded, and VAT accounted for, before the switch, the later transfer of title at the notary is exempt from RETT.",
      ],
    },
    {
      h: "Records, refunds and objections",
      list: [
        "Keep deeds, contracts, payment records, valuations and evidence for any exemption for five years from the transaction, in the Kingdom (physical or on servers accessible from it).",
        "Request a correction through the portal within 30 days of learning that registered data is wrong, or of any event that breaks an exemption condition.",
        "Refunds, for tax overpaid, paid in error, or paid on a transaction that was cancelled or not completed, must be requested within twelve months of the date the tax became due. ZATCA decides within 30 days and pays within 30 days of approval.",
        "Object to a ZATCA decision within 60 days of notification. ZATCA has 90 days to decide, after which the case can go to the Internal Committee for Settlement or directly to the Committee for Resolution.",
        "Unsure how RETT applies? ZATCA accepts requests for a ruling on a specific transaction.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the RETT rate in Saudi Arabia?",
      a: "5% of the value of the real estate transaction: the agreed price, but never less than fair market value on the transaction date. The rate has not changed since RETT replaced VAT on property sales in October 2020.",
    },
    {
      q: "Does the buyer or the seller pay RETT?",
      a: "The seller (assignor) is legally liable to ZATCA. Contracts often shift the cost to the buyer, and anyone may pay the invoice, but that does not move the liability. Since April 2025 the buyer is jointly liable only where ZATCA shows the buyer caused the non-payment.",
    },
    {
      q: "Is RETT charged on top of VAT?",
      a: "No. Sales of real estate are exempt from VAT and subject to RETT instead. RETT is not recoverable as input VAT and is not reported on the VAT return.",
    },
    {
      q: "Do I pay RETT on the financed amount or the property price?",
      a: "On the property price. The profit margin built into a licensed financing arrangement (Murabaha, ijarah, finance lease) is excluded from the tax base, and the transfer from the bank to you at the end of the contract is not taxed again.",
    },
    {
      q: "Is a long lease subject to RETT?",
      a: "Only a usufruct or lease right granted for more than 50 years. The tax is then 5% of the higher of the present value of the right's market value and the present value of the agreed payments, and it must be paid within 30 days of the grant.",
    },
    {
      q: "How much is the RETT late payment penalty?",
      a: "2% of the unpaid tax for each month or part of a month late, capped at 50% of the unpaid tax, plus a further 1% a month where ZATCA amends the tax due. Use the [RETT calculator](/tools/ksa-rett-calculator) to estimate both the tax and the fine.",
    },
  ],
  related: [
    "ksa-rett-exemptions",
    "ksa-rett-share-transfers-real-estate-companies",
    "ksa-rett-accounting",
    "zatca-e-invoicing-phase-2",
  ],
  cta: { href: "/compliance", label: "See how Hysaab handles KSA tax rules" },
};

const exemptions: Guide = {
  slug: "ksa-rett-exemptions",
  title: "RETT exemptions in Saudi Arabia: every exemption, its conditions and the clawback periods",
  description:
    "The Saudi Real Estate Transaction Tax exemptions under the 2025 RETT Law: inheritance, gifts to relatives, wills, endowments, in-kind contributions, 100% group transfers, off-plan developers, M&A, listed securities and funds. What each requires, and the three- and five-year holding periods that bring the 5% back.",
  updated: "2026-09-27",
  minutes: 9,
  tax: true,
  sections: [
    {
      h: "How RETT exemptions work",
      ps: [
        "An exemption does not mean the transaction disappears. The seller still registers it on the ZATCA RETT portal, selects the exemption, and receives the proof the notary needs before registering the transfer. ZATCA's own FAQ is explicit that a notarised gift to a spouse, which is exempt, still has to go through the service.",
        "Many exemptions carry a condition that runs for years after the transfer. If the condition is broken, the exemption is lost and the original transaction becomes taxable: the tax falls due on the date of the breach, must be paid within 30 days of it, and the seller must file a correction within 30 days. Every exemption also depends on evidence, which must be kept for five years.",
      ],
    },
    {
      h: "Family transfers: inheritance, gifts and wills",
      ps: [
        "Dividing an estate is exempt, whether the property passes from the deceased to the heirs or is divided among the heirs, but only within each heir's legal share under the inheritance certificate. If one heir takes the house and compensates the others for the excess over their share, that excess is a taxable transaction. A later sale by the heirs, or a sale before division so the cash can be shared, is taxed in the normal way.",
        "A notarised gift to a spouse or a relative up to the third degree is exempt. The third degree covers parents and children; siblings, grandparents and grandchildren; and uncles, aunts, nephews and nieces. A cousin is outside it. The exemption needs a genuine gift: selling a plot to your father is taxable.",
        "The gift exemption carries a three-year condition. If the recipient passes the property within three years to someone who could not have received it tax-free directly from the original donor, the exemption on the first gift falls away. In ZATCA's example, land gifted to a grandfather and passed four months later to the donor's cousin makes the first gift taxable.",
        "A transfer under a notarised lawful will is exempt.",
      ],
    },
    {
      h: "Endowments, charities and the state",
      list: [
        "A transfer without consideration to a public, private or joint endowment registered with, and supervised by, the endowments authority. Only that first free transfer is exempt; a sale to an endowment is taxed.",
        "A transfer without consideration to or from a licensed charitable organisation. Later dealings by the charity for consideration, such as granting a 70-year usufruct, are taxed.",
        "A transfer to a public agency, a public legal person, or a public-benefit entity, whatever the agency then uses the property for.",
        "A transfer by a public agency acting as a public authority under its statutory powers, not on commercial terms and not in competition with the private sector. A government body selling villas through an investment programme pays RETT like anyone else.",
        "Expropriation, or temporary taking, for public benefit under the applicable laws, including the return of the property to its original owner.",
        "Transactions where one party is a foreign government, an international organisation, or a diplomatic, consular or military mission accredited in the Kingdom, on condition of reciprocity.",
      ],
    },
    {
      h: "Finance and legal events",
      list: [
        "A temporary transfer to a licensed financier as security for financing or credit, and the return of the property once the debt is paid. If the financier keeps the property because the debt is not repaid, the transfer becomes taxable. Moving the title between banks when a home finance contract is refinanced, or selling a portfolio of ijarah contracts to a refinancing company, is also covered.",
        "Transfers completing ijarah or finance-lease contracts concluded before RETT took effect, and transactions that were charged to VAT before notarisation.",
        "A forced sale ordered by a competent court, including liquidation or administrative liquidation under the Bankruptcy Law.",
        "Cancellation by mutual consent within 90 days of notarisation, where the property is returned unchanged and the full price is refunded.",
        "Temporary transfers between an investment fund and its custodian, or between custodians of the same fund, under Capital Market Authority rules.",
      ],
    },
    {
      h: "Business transfers and restructuring",
      ps: [
        "These exemptions are where most of the value, and most of the clawback risk, sits. Each is covered in more detail in the guide to [RETT on share transfers and restructuring](/guides/ksa-rett-share-transfers-real-estate-companies).",
      ],
      list: [
        "In-kind contribution to the capital of a company established in the Kingdom. The shares received must not be disposed of for five years, and the company must keep financial statements audited by a certified external auditor throughout those five years.",
        "A transfer by an individual to a company or investment fund in the Kingdom that the individual owns 100%, directly or indirectly, provided that ownership does not change for five years.",
        "Transfers between companies or funds in the Kingdom that are 100% owned, directly or indirectly, by the same person, or where one owns 100% of the other, provided the receiving entity stays 100% owned by that person for five years.",
        "A free transfer to a company or fund 100% owned by an endowment, with the endowment's ownership unchanged for five years.",
        "In-kind contribution to a real estate investment fund under Capital Market Authority rules, provided the units received are not transferred for five years or until the fund ends, whichever comes first.",
        "Mergers and acquisitions between legal persons paid only in shares, with proportional ownership and a five-year retention period; acquisitions must also be completed in a single transaction.",
        "Initial public offerings and trading of listed securities, acquisitions of shares in listed joint-stock companies, and trading of units in unlisted funds below 50% of the fund's units.",
      ],
    },
    {
      h: "Off-plan developers: the 90-day window",
      ps: [
        "A transfer to a real estate developer licensed for off-plan sale and leasing is exempt if, on or before the transfer date, the developer holds that licence and the land has been allocated to an off-plan project with a licensing decision from the competent agency.",
        "If the project licence has not yet been issued, the seller has 90 days to submit it to ZATCA, but must first either pay the tax or give ZATCA a cash or bank guarantee for the same amount. If the licence arrives within 90 days, the guarantee is released or the tax becomes refundable. If it does not, ZATCA cashes the guarantee, and tax paid after the 90 days cannot be refunded.",
      ],
    },
    {
      h: "What does not break a holding period",
      ps: [
        "The regulations list three events that do not count as a breach of a no-transfer condition: a change in ownership through an initial public offering of the company or fund that received the property; an exempt forced sale ordered by a court; and a transfer as part of an exempt merger or acquisition, provided the interests received are then held for the rest of the original period.",
      ],
    },
    {
      h: "The clawback calendar",
      ps: [
        "Put each exempt transfer in a register with its end date and owner. Breaches rarely happen on purpose: they come from a later share sale, a group reorganisation, or a family transfer made without anyone checking the history.",
      ],
      list: [
        "Gift to a relative: three years from notarisation of the gift.",
        "In-kind contribution to company capital: five years of holding the shares and of audited financial statements.",
        "Transfers to 100%-owned companies and funds, and between entities owned by the same person: five years of unchanged ownership.",
        "Mergers and acquisitions: five years of retention by the same owners.",
        "In-kind contribution to a real estate fund: five years, or until the fund ends if sooner.",
        "Off-plan transfer without a project licence: 90 days to file it.",
        "Cancellation of a notarised sale: within 90 days.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is a gift of property to my wife or children exempt from RETT?",
      a: "Yes, if the gift is notarised and genuinely without consideration. Spouses and relatives up to the third degree qualify. The recipient must not pass the property within three years to someone who would not have qualified as a direct recipient. You still register the gift on the ZATCA RETT service and select the exemption.",
    },
    {
      q: "Do heirs pay RETT when an estate is divided?",
      a: "No, within each heir's legal share under the inheritance certificate. Any compensation paid between heirs for taking more than their share is taxable, and a sale by the heirs afterwards is taxed normally.",
    },
    {
      q: "Can I move property into my own company without RETT?",
      a: "Yes, if you own 100% of the company (directly or indirectly) and your ownership does not change for five years. Contributing property to a company with other shareholders in exchange for shares can also be exempt, but only if you hold the shares for five years and the company keeps externally audited financial statements for that period.",
    },
    {
      q: "What happens if an exemption condition is broken?",
      a: "The original transaction becomes taxable. The tax is due on the date of the breach and must be paid within 30 days, with a correction filed within 30 days. Late payment then attracts 2% a month, capped at 50%.",
    },
    {
      q: "Is the first-home relief an exemption?",
      a: "Not in the same sense. For a Saudi citizen's first home the state bears the RETT on the first SAR 1,000,000 of the price, and 5% applies to any excess. See the [RETT guide](/guides/ksa-real-estate-transaction-tax) and the [calculator](/tools/ksa-rett-calculator).",
    },
  ],
  related: ["ksa-real-estate-transaction-tax", "ksa-rett-share-transfers-real-estate-companies", "ksa-rett-accounting"],
  cta: { href: "/compliance", label: "See how Hysaab handles KSA tax rules" },
};

const shares: Guide = {
  slug: "ksa-rett-share-transfers-real-estate-companies",
  title: "RETT on share transfers in Saudi real estate companies: the 50% and 30% tests",
  description:
    "When selling shares in a Saudi company triggers the 5% Real Estate Transaction Tax: the real estate company definition, the 30%-in-three-years threshold, how the tax base is calculated, capital increases, and the group, in-kind and M&A exemptions.",
  updated: "2026-09-27",
  minutes: 8,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "Selling shares can be a property transfer for RETT purposes. If a company, fund or other entity is a real estate company, and a person or persons acting in concert transfer 30% or more of its interests, in one deal or in linked deals within three years, 5% RETT is due as if the property itself had been sold.",
        "Both tests were tightened in 2025, and the tax base for share deals has its own rule. Getting either wrong usually shows up in due diligence on the next transaction, when the unpaid tax, the 2% monthly fine and the buyer's questions all arrive together.",
      ],
    },
    {
      h: "Test one: is it a real estate company?",
      ps: [
        "An entity is a real estate company if it owns real estate in the Kingdom, directly or indirectly, for the purpose of generating revenue from it by sale or lease, and the fair market value of that real estate is at least 50% of the fair market value of all its assets. The test is met if it is passed on the date of the transfer or at any time in the 365 days before it.",
        "It applies to companies under the Companies Law, sole establishments, investment funds under Capital Market Authority rules and other entities in the Kingdom, whatever their stated purpose.",
      ],
      list: [
        "Fair market value, not book value. A company carrying land at 1990s cost can fail the test on a valuation even when its balance sheet says otherwise.",
        "Only real estate held to earn revenue through sale or lease counts. A hospital, school or factory that owns its own premises is outside the definition, which is a real narrowing from the pre-2025 rules.",
        "The 365-day look-back stops a company selling property just before a share deal to fall under 50%.",
        "Indirect holdings count: a holding company whose subsidiaries own the real estate can meet the test.",
      ],
    },
    {
      h: "Test two: does the transfer reach 30%?",
      ps: [
        "A transfer of interests in a real estate company is taxable when a person, or a group of persons acting in concert, transfers 30% or more of its interests through one transaction or a series of related transactions within three years. Below that, the transfer is outside the scope of RETT altogether.",
        "ZATCA's guideline gives the example of an investor who transfers 10% in January 2023, 15% in June 2024 and 10% in June 2025. The total reaches 35% within three years, so tax falls due on the date of the June 2025 transfer, the point at which 30% was crossed. A single 9% sale, on its own, is not taxable.",
        "Shares listed on the Saudi Exchange are exempt, and so are units in an unlisted investment fund where the transfer is below 50% of the fund's units.",
      ],
    },
    {
      h: "The tax base for a share deal",
      ps: [
        "RETT on a share transfer is 5% of the higher of two amounts: the fair market value of all the real estate the company owns, directly or indirectly, multiplied by the percentage transferred; or the price agreed between the parties and allocated to the real estate.",
        "Take a company whose real estate is worth SAR 80 million out of total assets of SAR 120 million, which puts it at 66.7%, above the 50% test. A 40% stake is sold for SAR 30 million, of which SAR 28 million is allocated to the real estate. 40% of SAR 80 million is SAR 32 million, which is higher than SAR 28 million, so the tax is 5% of SAR 32 million: SAR 1.6 million.",
        "The tax is due on the earlier of the transfer and the signing of an unconditional agreement to transfer, and must be paid within 30 days. The seller of the shares is liable.",
      ],
    },
    {
      h: "Capital increases",
      ps: [
        "Issuing new shares is not a transfer if the existing partners keep their percentages, or if a new investor subscribes while the existing partners keep the interests they held before the increase, without transferring them, for five years from the date of the increase.",
        "If the percentages shift, or an existing partner sells within five years of letting a new investor in, the capital increase becomes taxable. Structure the shareholder agreement so that lock-ups match the five-year window.",
      ],
    },
    {
      h: "Group restructuring without RETT",
      list: [
        "An individual moving property into a company or fund they own 100%, directly or indirectly: exempt if that ownership is unchanged for five years.",
        "Company to company, or company to fund, where one owns 100% of the other or both are 100% owned by the same person: exempt if the receiving entity stays 100% owned by that person for five years. Groups owned by several shareholders together, rather than by one person, do not fit this wording.",
        "In-kind contribution of property to the capital of a company in the Kingdom, including one with other shareholders: exempt if the contributor keeps the shares for five years and the company is externally audited throughout.",
        "In-kind contribution to a real estate investment fund: exempt if the units are held for five years or until the fund ends.",
      ],
    },
    {
      h: "Mergers and acquisitions",
      ps: [
        "Transfers resulting from a merger between legal persons are exempt when four conditions hold: the consideration is only interests in the surviving or new entity, with no cash or other assets; each owner receives interests in proportion to what they held before; the same owners keep those interests, directly or indirectly, for five years; and any cash or assets paid to a shareholder who objects to the merger and exits are taxed separately.",
        "An acquisition of all the interests of a real estate company is exempt when both sides are legal persons, the consideration is only interests in the acquirer, the sellers keep those interests for five years, and the acquisition is completed in a single transaction. A deal done in tranches, for example 70% and then the remainder, fails that last condition.",
      ],
    },
    {
      h: "What to do before signing",
      list: [
        "Value the target's real estate and total assets at fair market value on the expected transfer date, and check the previous 365 days.",
        "Map every transfer of interests over the last three years, including those by parties acting in concert with the seller.",
        "Check the history of any property the target received under an exemption: a share sale can break a five-year condition that sits on an earlier transfer.",
        "Allocate the price between real estate and other assets in the agreement, knowing ZATCA will compare the real estate element with market value.",
        "Put the RETT liability, the payment mechanics and the warranties in the share purchase agreement, since the seller is liable but the buyer carries the company's history.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is selling shares in a Saudi company subject to RETT?",
      a: "Only if the company is a real estate company (real estate held for sale or lease worth at least 50% of total assets at fair market value, on the transfer date or at any time in the prior 365 days) and 30% or more of its interests are transferred within three years. Listed shares are exempt.",
    },
    {
      q: "How is RETT calculated on a share transfer?",
      a: "5% of the higher of (a) the fair market value of all the company's real estate multiplied by the percentage transferred and (b) the agreed price allocated to the real estate. The [share-transfer checker](/tools/ksa-rett-share-transfer-checker) runs both tests and the base.",
    },
    {
      q: "Does a company that owns its own offices count as a real estate company?",
      a: "Not on that basis alone. Since 2025 only real estate held to generate revenue through sale or lease counts toward the 50% test, so owner-occupied premises of an operating business do not.",
    },
    {
      q: "When is RETT on a share deal due?",
      a: "On the earlier of the actual transfer and the signing of an unconditional agreement to transfer, payable within 30 days. Late payment costs 2% a month, capped at 50%.",
    },
  ],
  related: ["ksa-real-estate-transaction-tax", "ksa-rett-exemptions", "ksa-rett-accounting", "uae-qualifying-group-relief"],
  cta: { href: "/firms", label: "See Hysaab Practice for tax and advisory firms" },
};

const accounting: Guide = {
  slug: "ksa-rett-accounting",
  title: "Accounting for Saudi RETT under IFRS: buyers, sellers, developers and clawbacks",
  description:
    "How to book the 5% Saudi Real Estate Transaction Tax under IFRS as adopted by SOCPA: capitalised into property, plant and equipment, investment property or inventory for the buyer; deducted from the gain for the seller; expensed on sale by developers. Plus share deals, exemption clawbacks and the month-end checks.",
  updated: "2026-09-27",
  minutes: 7,
  tax: true,
  sections: [
    {
      h: "The short answer",
      ps: [
        "RETT is not VAT, so it is never a receivable from ZATCA. Whoever bears it treats it as a cost. For a buyer it is a transaction cost of the asset acquired; for a seller of a long-term asset it reduces the gain on disposal; for a developer selling units it is a cost of selling. The only real judgement is which party bears it economically, because the law makes the seller liable while contracts often push the cost to the buyer.",
      ],
    },
    {
      h: "The buyer: capitalise it",
      ps: [
        "Where the buyer bears the tax, it is part of the cost of what was bought. IFRS spells this out for each type of asset:",
      ],
      list: [
        "Property, plant and equipment (IAS 16): cost includes the purchase price with non-refundable purchase taxes, and costs directly attributable to bringing the asset into use.",
        "Investment property (IAS 40): directly attributable expenditure includes property transfer taxes by name, along with legal fees and other transaction costs.",
        "Inventory, for developers buying land to build and sell (IAS 2): cost of purchase includes taxes other than those later recoverable from the tax authorities.",
      ],
    },
    {
      h: "A buyer's worked example",
      ps: [
        "A company buys an office building for its own use for SAR 10,000,000. The contract says the buyer bears the RETT, so it pays SAR 500,000 against the seller's ZATCA invoice, plus SAR 60,000 of legal fees. The building goes into property, plant and equipment at SAR 10,560,000, and none of the RETT is expensed or claimed back. The land element is split out and not depreciated, as usual.",
        "If the buyer is a Saudi citizen with a valid First Home certificate, the state bears 5% of the first SAR 1,000,000, and only the tax actually paid is part of cost.",
      ],
    },
    {
      h: "The seller: reduce the gain",
      ps: [
        "Where the seller bears the tax on a sale of property, plant and equipment or investment property, the tax is a cost of disposal. The gain or loss is net disposal proceeds less carrying amount.",
        "The same building, carried at SAR 7,000,000 and sold for SAR 10,000,000 with the seller bearing SAR 500,000 of RETT, gives net proceeds of SAR 9,500,000 and a gain of SAR 2,500,000. The RETT should not be hidden in administrative expenses, and nothing is booked to a VAT account.",
      ],
    },
    {
      h: "Developers selling units",
      ps: [
        "A developer selling apartments or villas from inventory recognises revenue under IFRS 15 and cost of sales from inventory. If the developer bears the RETT on each unit, it is a selling cost, expensed when the sale is recognised. IAS 2 excludes selling costs from the cost of inventory, so it never enters the inventory balance.",
        "Where the contract makes the buyer bear the tax and the buyer pays ZATCA directly, most developers record neither the tax nor extra revenue, treating it as the buyer's own transaction cost. Because the seller remains legally liable, agree that policy with your auditor and make sure every sale shows evidence of payment before the unit is handed over.",
      ],
    },
    {
      h: "Share deals",
      ps: [
        "When RETT arises on a transfer of interests in a real estate company, the seller of the shares is liable, and the tax reduces the seller's gain on the investment.",
      ],
      list: [
        "If the buyer bears it and the deal is a business combination, IFRS 3 requires acquisition-related costs to be expensed as incurred, and in practice a transfer tax borne by the acquirer is treated as one.",
        "If the company acquired is not a business (a single property wrapper is often an asset acquisition), the cost, including the RETT borne, is allocated to the identifiable assets acquired.",
        "If the buyer acquires a minority stake measured at fair value through profit or loss, transaction costs are expensed; for other financial assets and associates they are generally added to the initial carrying amount.",
      ],
    },
    {
      h: "Exempt transfers and clawbacks",
      ps: [
        "An exempt transfer carries no tax at the time, but many exemptions come with a three- or five-year condition. If the condition is broken, the original transaction becomes taxable, due on the date of the breach and payable within 30 days. The obligating event is the breach itself, so a provision is recognised when it happens, not before.",
        "Until then, the risk belongs in the notes. Where a clawback is possible but not probable, disclose it as a contingent liability under IAS 37 if it is material. In group accounts, keep a register of every exempt intra-group transfer with its end date, so that a later sale or restructuring is tested before it is signed, not after.",
      ],
    },
    {
      h: "Month-end checks",
      list: [
        "Every property acquisition: is the RETT in the asset's cost, and is the ZATCA payment invoice or exemption certificate on file?",
        "Every property disposal: is the RETT in the disposal calculation, and was it paid before notarisation?",
        "Unnotarised transactions, share transfers and usufructs over 50 years: was the tax paid within 30 days? Unpaid amounts are a liability plus a 2%-a-month fine.",
        "Exempt transfers: are the conditions still met this month, and has anything happened in the group that could break them?",
        "Records: deeds, contracts, valuations and payment proof kept for five years, in the Kingdom.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is RETT recoverable like VAT?",
      a: "No. RETT is a separate transaction tax, not VAT. It never goes on the VAT return and cannot be claimed as input tax, so it is always a cost to whoever bears it.",
    },
    {
      q: "Should the buyer expense or capitalise RETT?",
      a: "Capitalise it into the cost of the property: IAS 16 for owner-occupied property, IAS 40 (which names property transfer taxes) for investment property, and IAS 2 for land held as inventory. The exception is a business combination, where IFRS 3 requires acquisition-related costs to be expensed.",
    },
    {
      q: "How does the seller account for RETT?",
      a: "As a cost of disposal: it reduces the net disposal proceeds and therefore the gain on sale. For a developer selling from inventory, it is a selling cost expensed when the sale is recognised.",
    },
  ],
  related: ["ksa-real-estate-transaction-tax", "ksa-rett-exemptions", "ksa-rett-share-transfers-real-estate-companies", "month-end-close-checklist"],
  cta: { href: "/accounting", label: "See how Hysaab Finance runs the close" },
};

export const RETT_GUIDES: Guide[] = [pillar, exemptions, shares, accounting];

/* Sources (checked 27 September 2026)

1. ZATCA, Detailed Guideline for the Real Estate Transaction Tax, version 6, May 2026:
   https://zatca.gov.sa/en/HelpCenter/guidelines/Documents/Detailed-Guideline-for-RETT-In-accordance-with-provision-of-RETT-Law-and-its-Implementing-Regulations.pdf
   Primary source for: scope and definitions (s.1.3, s.2), out-of-scope cases (s.3), tax base
   and examples 8–10 (s.4.2), due dates table (s.4.3–4.4), liability (s.4.5), exemptions
   5.1.1–5.1.24 and permitted events (s.5), first-home mechanism (s.6), fines (s.7.1), records,
   refunds, objections (s.8–11), FAQs 10, 12, 14.
2. ZATCA, RETT Law page (Royal Decree M/84 of 19/03/1446, in force 12/10/1446 = 10 April 2025):
   https://zatca.gov.sa/en/RulesRegulations/Taxes/Pages/RETTRegulation.aspx
3. EY tax alerts on the RETT Law and the Implementing Regulations:
   https://www.ey.com/en_gl/technical/tax-alerts/saudi-arabia-issues-real-estate-transaction-tax-law
   https://www.ey.com/en_gl/technical/tax-alerts/saudi-arabia-issues-real-estate-transaction-tax-implementing-regulations
   Supports: late-payment fine reduced from 5% to 2%, 50% cap; buyer liability narrowed.
4. Dhruva Consultants, KSA RETT Alert, 9 May 2025:
   https://dhruvaconsultants.com/wp-content/uploads/2025/05/KSA-RETT-Law-Alert.pdf
   Supports: owner-occupied property excluded from the real estate company test; general
   fine cap raised from SAR 10,000 to SAR 50,000; group exemption wording ("same person").
5. IFRS references from the standards' text: IAS 16.16(a) and 16.71; IAS 40.21 (property
   transfer taxes); IAS 2.11 and 2.16(d); IFRS 3.53; IAS 37 (contingent liabilities).

Uncertain or inferred
- Guideline example 10 (usufruct) multiplies annual value by term without discounting despite
  the "present value" wording; the guide states the rule, not the example's figure.
- Refund deadline: s.11 says the earlier of 12 months or 60 days from a final decision; the
  guide states the 12-month rule only.
- Seller-side accounting where the buyer pays the tax directly is a policy choice; the guide
  says so and points to the auditor.
- Whether a fine cap applies to the additional 1% (ZATCA-amended tax) is not stated; the
  calculator does not model it.
*/
