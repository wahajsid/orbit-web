/* ── Homepage walkthrough: the five moments ─────────────────────────
   One record per moment, each paired with a genuine capture of the
   Hysaab workspace running its sample dataset (the in-product SAMPLE
   badge is left visible). Owner decision 2026-09-17: the moments follow
   what the product shows best, from a document arriving to the position
   at a glance, rather than two chat screens. Captures are cropped from
   the app shoot in public/shots (header removed: it carries a person's
   name); nothing in them is redrawn, and the one personal email address
   is covered by a visible redaction bar.

   A moment with no file renders an honest "capture pending" panel, and
   `npm run check:release` fails until every file is present. */

import fs from "node:fs";
import path from "node:path";

export const SCREENS_DIR = "home/screens";

export type MomentDef = {
  key: string;
  num: string;
  file: string;
  channel: string;
  tabTitle: string;
  tabBody: string;
  title: string;
  description: string;
  /* Reader-facing caption + alt: what the capture actually shows. */
  caption: string;
  alt: string;
  /* Shown in place of the image if the capture is missing. */
  pending: string;
  /* Optional focused crop (file in the same folder) and what to notice in it. */
  focus?: string;
  notice?: string;
};

export type Moment = MomentDef & {
  ready: boolean; src: string; width: number; height: number;
  /* A tight crop of the part of the screen the claim is about, for
     thumbnails (review 2026-09-18: dense tables were unreadable small). */
  focusSrc?: string; focusWidth?: number; focusHeight?: number;
};

const WORKSPACE = "Hysaab workspace";

/* The hero uses a tight crop of the same intake ledger as moment 01. */
export const HERO_CAPTURE: MomentDef = {
  key: "hero", num: "00", file: "00-hero-intake.png", channel: WORKSPACE,
  tabTitle: "Document intake", tabBody: "", title: "", description: "",
  caption: "Document intake in the workspace, sample data: what arrived, and the channel it came by.",
  alt: "Hysaab intake ledger listing a receipt and a supplier invoice received by WhatsApp, an approval and a quotation by email, and a bank statement from the bank feed, each with its category.",
  pending: "Workspace capture pending: the document intake ledger.",
};

export const MOMENTS: MomentDef[] = [
  {
    key: "intake", num: "01", file: "01-app-intake.png", channel: WORKSPACE,
    tabTitle: "Send it in.",
    tabBody: "Photograph a receipt or forward a document. Start in the conversation you already use.",
    title: "A document in. A clear next step out.",
    description: "Every document that arrives is filed with the channel it came by and what became of it: coded, matched, reconciled, or held with the reason.",
    caption: "The intake ledger, sample data: each document with its category, channel and outcome, including one invoice held because it failed the tax-invoice test.",
    alt: "Hysaab intake ledger: documents received by WhatsApp, email and bank feed, each with a category and a disposition such as coded, reconciled, matched to a purchase order, or held because tax criteria were not met. One email address is redacted.",
    pending: "Workspace capture pending: the document intake ledger.",
    focus: "f-01-intake.png",
    notice: "Notice the channel column, WhatsApp and email side by side, and the outcome for each document, including the one held for a failed tax test.",
  },
  {
    key: "coded", num: "02", file: "02-app-coded-checked.png", channel: WORKSPACE,
    tabTitle: "Coded and checked on arrival.",
    tabBody: "Each bill is coded from your own history and tested against the tax-invoice rules before any VAT is claimed.",
    title: "Prepared before you open it.",
    description: "Open payables arrive with the proposed account and its confidence, the tax-invoice test and the VAT recovery position. A duplicate is blocked, not booked twice.",
    caption: "Open payables, sample data: coding with its confidence and history, the tax-invoice result, recoverable or blocked VAT, and a duplicate bill held.",
    alt: "Hysaab open payables table: seven supplier invoices, each with a proposed coding and confidence percentage, a tax-invoice result of criteria met, not met or conditional, and VAT marked recoverable, blocked or conditional. One bill is flagged blocked as a duplicate.",
    pending: "Workspace capture pending: open payables with coding and tax checks.",
    focus: "f-02-coded.png",
    notice: "Notice each bill’s proposed account with its confidence and history, and the tax-invoice result beside it.",
  },
  {
    key: "challenge", num: "03", file: "03-app-second-opinion.png", channel: WORKSPACE,
    tabTitle: "Expect a second opinion.",
    tabBody: "If a treatment looks wrong, Hysaab explains the concern and recommends a better route.",
    title: "A colleague who asks you to think twice.",
    description: "When a coding falls below the confidence gate, a tax invoice fails the rules or a price creeps, Hysaab stops and brings it to you with its reasoning.",
    caption: "Decisions required, sample data: a coding questioned against the supplier’s history, input VAT held until an invoice is corrected, and a price rise with no contract change on file.",
    alt: "Hysaab decisions queue with four items: two missing periods for a recurring supplier, a coding below the confidence threshold where history suggests a different account, a tax invoice that omits the supplier TRN so input VAT is blocked, and a detected price increase. Each shows the agent, a confidence score and buttons to open the queue or the detail.",
    pending: "Workspace capture pending: the decisions queue.",
    focus: "f-03-second-opinion.png",
    notice: "Notice a coding questioned against the supplier’s own history, and input VAT held until the invoice is corrected.",
  },
  {
    key: "record", num: "04", file: "04-app-journal-why.png", channel: WORKSPACE,
    tabTitle: "Make the call. Keep the why.",
    tabBody: "Every entry keeps who posted it, who confirmed it, and the reasoning and documents behind it.",
    title: "The decision stays with its reasoning.",
    description: "The journal is the permanent record: a reclassification confirmed by a person, and an entry opened to show its commentary and evidence. Mistakes are reversed in the open, never deleted.",
    caption: "Journal activity, sample data: who posted and confirmed each entry, and one journal opened to its commentary, tie-out and attached documents.",
    alt: "Hysaab journal activity: posted journals with narrative, accounts, amount, who posted or confirmed each and a confidence score. One prepayment release is expanded to show the agent commentary, a tie-out to the invoice total, three attached documents and a void option that posts a reversing entry.",
    pending: "Workspace capture pending: journal activity with commentary and evidence.",
    focus: "f-04-journal.png",
    notice: "Notice a journal opened to its commentary, the tie-out to the invoice total and the documents attached.",
  },
  {
    key: "position", num: "05", file: "05-app-position.png", channel: WORKSPACE,
    tabTitle: "See where you stand.",
    tabBody: "Ask in plain words, or read cash, payables, receivables, VAT and runway at a glance.",
    title: "The picture, in plain words.",
    description: "The Today screen opens with a question box and the position that matters: cash, working capital, revenue, payables due, overdue receivables, VAT, runway and burn.",
    caption: "The Today screen, sample data: the plain-language question box and the eight position tiles.",
    alt: "Hysaab Today screen: a box asking “What do you want to know?” with suggested questions, above eight tiles for cash position, net working capital, revenue month to date, payables due in 30 days, receivables overdue, VAT position, runway and net burn.",
    pending: "Workspace capture pending: the Today screen.",
    focus: "f-05-position.png",
    notice: "Notice the position tiles: cash, working capital, revenue and payables due, each with its context line.",
  },
];

/* PNG width/height live at bytes 16–24 of the IHDR chunk; reading them
   reserves the right space without an image dependency. */
function pngSize(file: string): { width: number; height: number } | null {
  try {
    const fd = fs.openSync(file, "r");
    const buf = Buffer.alloc(24);
    fs.readSync(fd, buf, 0, 24, 0);
    fs.closeSync(fd);
    if (buf.toString("ascii", 1, 4) !== "PNG") return null;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return null;
  }
}

function load(m: MomentDef): Moment {
  const dir = path.join(process.cwd(), "public", SCREENS_DIR);
  const size = pngSize(path.join(dir, m.file));
  const fsize = m.focus ? pngSize(path.join(dir, m.focus)) : null;
  return {
    ...m, ready: !!size, src: `/${SCREENS_DIR}/${m.file}`, width: size?.width ?? 1548, height: size?.height ?? 500,
    ...(fsize && m.focus ? { focusSrc: `/${SCREENS_DIR}/${m.focus}`, focusWidth: fsize.width, focusHeight: fsize.height } : {}),
  };
}

/** Server-side: which captures exist, and their dimensions. */
export const loadMoments = (): Moment[] => MOMENTS.map(load);
export const loadHeroCapture = (): Moment => load(HERO_CAPTURE);

/** Any capture in public/home/screens, for the rebuilt inner pages. */
export function capture(file: string, title: string, alt: string, caption: string): Moment {
  return load({ key: file, num: "", file, channel: WORKSPACE, tabTitle: title, tabBody: "", title, description: "", caption, alt, pending: `Workspace capture pending: ${title}.` });
}
