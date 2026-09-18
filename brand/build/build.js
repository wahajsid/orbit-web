/* Hysaab brand build: lays out the serif wordmark from Instrument Serif
   outlines, draws the pen-tick y in the same units, and renders the asset set.
   Units: 1 = 1/1000 em of the wordmark size. y-up font space is flipped to
   y-down SVG space when baked into path numbers. */
const fs = require("fs");
const path = require("path");
const { Resvg } = require("@resvg/resvg-js");

const G = JSON.parse(fs.readFileSync(path.join(__dirname, "glyphs.json"), "utf8"));
const OUT = path.join(__dirname, "out");
fs.mkdirSync(OUT, { recursive: true });

const NAVY = "#122940", BLUSH = "#E4A1A0", CREAM = "#FAF6EE";

/* ---- path maths -------------------------------------------------------- */
function xform(d, a, dscale, e, f) {
  // Applies x' = a*x + e ; y' = dscale*y + f to an absolute path; H/V become L.
  const toks = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g) || [];
  let out = [], cmd = null, i = 0, cx = 0, cy = 0, sx = 0, sy = 0;
  const r = (n) => Math.round(n * 10) / 10;
  const emit = (x, y) => out.push(r(a * x + e) + " " + r(dscale * y + f));
  while (i < toks.length) {
    const t = toks[i];
    if (/^[A-Za-z]$/.test(t)) {
      if (/[a-z]/.test(t)) throw new Error("relative command in path: " + t);
      cmd = t; i++;
      if (t === "Z") { out.push("Z"); cx = sx; cy = sy; }
      else if (t === "H" || t === "V") out.push("L");
      else out.push(t);
      continue;
    }
    if (cmd === "H") { cx = parseFloat(toks[i++]); emit(cx, cy); continue; }
    if (cmd === "V") { cy = parseFloat(toks[i++]); emit(cx, cy); continue; }
    const n = cmd === "M" || cmd === "L" ? 1 : cmd === "Q" ? 2 : cmd === "C" ? 3 : 0;
    if (!n) throw new Error("unsupported command " + cmd);
    for (let k = 0; k < n; k++) {
      const x = parseFloat(toks[i++]), y = parseFloat(toks[i++]);
      emit(x, y); cx = x; cy = y;
    }
    if (cmd === "M") { sx = cx; sy = cy; }
  }
  return out.join(" ").replace(/([MLCQ]) /g, "$1");
}
function bbox(d) {
  const nums = (d.match(/-?\d*\.?\d+/g) || []).map(Number);
  let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
  for (let i = 0; i < nums.length; i += 2) {
    minx = Math.min(minx, nums[i]); maxx = Math.max(maxx, nums[i]);
    miny = Math.min(miny, nums[i + 1]); maxy = Math.max(maxy, nums[i + 1]);
  }
  return { minx, maxx, miny, maxy };
}

/* ---- the pen tick (y) ---------------------------------------------------
   Drawn in a 60x92 box: x-height line at y=0, baseline at y=58. Scaled so
   its x-height equals the font's (510 units). */
const XH = G.regular.xHeight;            // 510
const S = XH / 58;                        // box -> font units
const TICK_BOX = { tick: "M58 3L31 60L19 58L3 30Q4 22 9 24L24 48Z", tail: "M31 60Q22 76 12 88Q5 90 7 84Q13 72 19 58Z" };
// font space (y-up): X = x*S + lsb ; Y = (58 - y)*S
const Y_LSB = 22;
const tickFont = xform(TICK_BOX.tick, S, -S, Y_LSB, 58 * S);
const tailFont = xform(TICK_BOX.tail, S, -S, Y_LSB, 58 * S);
const Y_ADV = Math.round(60 * S + Y_LSB + 4); // ink + bearings

/* ---- layout ------------------------------------------------------------- */
const TRACK = -15;
function layout(text, face, size, x0, opts = {}) {
  // returns { paths:[{d, kind}], advance } in wordmark units, y-down, baseline 0
  const f = G[face];
  const k = size / 1000;
  let pen = x0, parts = [];
  for (const ch of text) {
    if (ch === "") { // the pen-tick y
      parts.push({ d: xform(tickFont, k, -k, pen, 0), kind: "ink" });
      parts.push({ d: xform(tailFont, k, -k, pen, 0), kind: "tail" });
      pen += Y_ADV * k + TRACK * k;
      continue;
    }
    const g = f.glyphs[ch];
    if (!g) throw new Error("no glyph " + ch);
    if (g.d) parts.push({ d: xform(g.d, k, -k, pen, 0), kind: "ink" });
    pen += g.adv * k + (opts.track ?? TRACK) * k;
  }
  return { parts, advance: pen - x0 };
}

// Wordmark: h + y(tick) + saab, then ".ai" italic at 0.27x with an 80-unit gap
const word = layout("hsaab", "regular", 1000, 0);
const SUFFIX_SCALE = 0.27, GAP = 80;
const suffix = layout(".ai", "italic", 1000 * SUFFIX_SCALE, word.advance + GAP, { track: 0 });

function merge(parts, kind) { return parts.filter(p => p.kind === kind).map(p => p.d).join(" "); }
const INK = merge(word.parts, "ink");
const TAIL = merge(word.parts, "tail");
const SUF = merge(suffix.parts, "ink");

const bbInk = bbox(INK + " " + TAIL), bbSuf = bbox(SUF);
const PAD = 40;
const full = {
  minx: Math.min(bbInk.minx, bbSuf.minx) - PAD, maxx: Math.max(bbInk.maxx, bbSuf.maxx) + PAD,
  miny: Math.min(bbInk.miny, bbSuf.miny) - PAD, maxy: Math.max(bbInk.maxy, bbSuf.maxy) + PAD,
};
const wordOnly = { minx: bbInk.minx - PAD, maxx: bbInk.maxx + PAD, miny: bbInk.miny - PAD, maxy: bbInk.maxy + PAD };
const vb = (b) => `${r1(b.minx)} ${r1(b.miny)} ${r1(b.maxx - b.minx)} ${r1(b.maxy - b.miny)}`;
function r1(n) { return Math.round(n * 10) / 10; }

console.log("word advance", word.advance, "suffix advance", suffix.advance);
console.log("lockup box", full, "word box", wordOnly);

/* ---- SVG composers ------------------------------------------------------ */
function lockupPaths(ink, tail, suf, sufOpacity, withSuffix = true) {
  return `<path fill="${ink}" d="${INK}"/><path fill="${tail}" d="${TAIL}"/>` +
    (withSuffix ? `<path fill="${suf}" fill-opacity="${sufOpacity}" d="${SUF}"/>` : "");
}
function lockupSvg(ink, tail, suf, sufOpacity, bg, withSuffix = true, label = "hysaab.ai") {
  const b = withSuffix ? full : wordOnly;
  const w = r1(b.maxx - b.minx), h = r1(b.maxy - b.miny);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb(b)}" width="${w}" height="${h}" role="img" aria-label="${label}">` +
    (bg ? `<rect x="${r1(b.minx)}" y="${r1(b.miny)}" width="${w}" height="${h}" fill="${bg}"/>` : "") +
    lockupPaths(ink, tail, suf, sufOpacity, withSuffix) + `</svg>`;
}

// The mark: the pen tick alone, in a 64-unit box (tick fills ~78% of it).
const tickBB = bbox(xform(tickFont, 1, -1, 0, 0) + " " + xform(tailFont, 1, -1, 0, 0));
function markGroup(ink, tail, box = 64, fill = 0.8, cx = box / 2, cy = box / 2) {
  const w = tickBB.maxx - tickBB.minx, h = tickBB.maxy - tickBB.miny;
  const k = (box * fill) / Math.max(w, h);
  const ox = cx - (tickBB.minx + w / 2) * k, oy = cy - (tickBB.miny + h / 2) * k;
  return `<path fill="${ink}" d="${xform(tickFont, k, -k, ox, oy)}"/><path fill="${tail}" d="${xform(tailFont, k, -k, ox, oy)}"/>`;
}
function markSvg(ink, tail, bg, rx = 0, box = 64, fill = 0.78) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box} ${box}" width="${box}" height="${box}" role="img" aria-label="hysaab">` +
    (bg ? `<rect width="${box}" height="${box}" rx="${rx}" fill="${bg}"/>` : "") + markGroup(ink, tail, box, fill) + `</svg>`;
}
// Small-size fallback (06): geometric tick and a blush dot.
function tickDotSvg(ink, dot, bg, rx = 0) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="hysaab">` +
    (bg ? `<rect width="64" height="64" rx="${rx}" fill="${bg}"/>` : "") +
    `<path d="M11 33L25 48L49 20" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="53" cy="48" r="5.5" fill="${dot}"/></svg>`;
}

/* ---- placed lockup inside a canvas ------------------------------------- */
function placedLockup(ink, tail, suf, sufOpacity, targetW, x, y, withSuffix = true) {
  const b = withSuffix ? full : wordOnly;
  const k = targetW / (b.maxx - b.minx);
  const tx = x - b.minx * k, ty = y - b.miny * k;
  const P = (d) => xform(d, k, k, tx, ty);
  return { svg: `<path fill="${ink}" d="${P(INK)}"/><path fill="${tail}" d="${P(TAIL)}"/>` + (withSuffix ? `<path fill="${suf}" fill-opacity="${sufOpacity}" d="${P(SUF)}"/>` : ""), h: (b.maxy - b.miny) * k };
}
function textPaths(text, face, sizePx, x, y, fill, opacity = 1, track = 0) {
  const l = layout(text, face, sizePx, x, { track });
  const d = l.parts.map(p => xform(p.d, 1, 1, 0, y)).join(" ");
  return { svg: `<path fill="${fill}" fill-opacity="${opacity}" d="${d}"/>`, w: l.advance };
}
function doc(w, h, inner) { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${inner}</svg>`; }

/* ---- render helpers ----------------------------------------------------- */
function png(svg, file, width) {
  const r = new Resvg(svg, { fitTo: width ? { mode: "width", value: width } : { mode: "original" }, font: { loadSystemFonts: false } });
  fs.writeFileSync(path.join(OUT, file), r.render().asPng());
}
function write(file, s) { fs.writeFileSync(path.join(OUT, file), s); }

/* ---- 1. lockups --------------------------------------------------------- */
write("hysaab-lockup-primary.svg", lockupSvg(NAVY, BLUSH, NAVY, 0.55, null));
write("hysaab-lockup-reversed.svg", lockupSvg(CREAM, BLUSH, CREAM, 0.6, null));
write("hysaab-lockup-mono-black.svg", lockupSvg("#000000", "#000000", "#000000", 0.55, null));
write("hysaab-lockup-mono-white.svg", lockupSvg("#FFFFFF", "#FFFFFF", "#FFFFFF", 0.6, null));
write("hysaab-wordmark-primary.svg", lockupSvg(NAVY, BLUSH, NAVY, 0.55, null, false, "hysaab"));
png(lockupSvg(NAVY, BLUSH, NAVY, 0.55, null), "hysaab-lockup-navy-transparent.png", 2400);
png(lockupSvg(NAVY, BLUSH, NAVY, 0.55, CREAM), "hysaab-lockup-navy-on-cream.png", 2400);
png(lockupSvg(CREAM, BLUSH, CREAM, 0.6, NAVY), "hysaab-lockup-reversed-navy.png", 2400);
png(lockupSvg("#000000", "#000000", "#000000", 0.55, null), "hysaab-lockup-mono-black.png", 2400);

/* ---- 2. the mark and favicons ------------------------------------------ */
write("hysaab-mark.svg", markSvg(NAVY, BLUSH, null));
write("hysaab-mark-reversed.svg", markSvg(CREAM, BLUSH, null));
write("favicon.svg", markSvg(CREAM, BLUSH, NAVY, 12));
write("favicon-tickdot.svg", tickDotSvg(CREAM, BLUSH, NAVY, 12));
for (const s of [16, 32, 48, 180, 192, 512]) png(markSvg(CREAM, BLUSH, NAVY, s >= 180 ? 0 : 12), `favicon-pen-${s}.png`, s);
for (const s of [16, 32, 48]) png(tickDotSvg(CREAM, BLUSH, NAVY, 12), `favicon-tickdot-${s}.png`, s);
for (const s of [1024, 400]) {
  png(markSvg(CREAM, BLUSH, NAVY, 0, 64, 0.6), `hysaab-avatar-navy-${s}.png`, s);
  png(markSvg(NAVY, CREAM, BLUSH, 0, 64, 0.6), `hysaab-avatar-blush-${s}.png`, s);
}
// App icon 1024 with the tile radius of the boards (26/112)
png(markSvg(CREAM, BLUSH, NAVY, 64 * 26 / 112, 64, 0.62), "hysaab-app-icon-1024.png", 1024);

/* ---- 3. cards ------------------------------------------------------------ */
{ // social card 1200x630: cream, navy frame, lockup centred, tagline
  const W = 1200, H = 630;
  const lk = placedLockup(NAVY, BLUSH, NAVY, 0.55, 640, 280, 0);
  const lkTop = (H - lk.h) / 2 - 30;
  const lk2 = placedLockup(NAVY, BLUSH, NAVY, 0.55, 640, 280, lkTop);
  const tag = textPaths("Good books. Better conversations.", "italic", 34, 0, 0, NAVY, 0.7);
  const tag2 = textPaths("Good books. Better conversations.", "italic", 34, (W - tag.w) / 2, lkTop + lk.h + 64, NAVY, 0.7);
  const svg = doc(W, H, `<rect width="${W}" height="${H}" fill="${CREAM}"/><rect x="49.5" y="49.5" width="${W - 99}" height="${H - 99}" fill="none" stroke="${NAVY}" stroke-width="3"/>` + lk2.svg + tag2.svg);
  write("hysaab-social-card-1200x630.svg", svg); png(svg, "hysaab-social-card-1200x630.png");
}
{ // email header 1152x416 (shown at 576x208): navy, reversed lockup, line
  const W = 1152, H = 416;
  const lk = placedLockup(CREAM, BLUSH, CREAM, 0.6, 520, (W - 520) / 2, 0);
  const top = (H - lk.h) / 2 - 22;
  const lk2 = placedLockup(CREAM, BLUSH, CREAM, 0.6, 520, (W - 520) / 2, top);
  const t = textPaths("Your shared service team of finance agents.", "italic", 30, 0, 0, CREAM, 0.7);
  const t2 = textPaths("Your shared service team of finance agents.", "italic", 30, (W - t.w) / 2, top + lk.h + 54, CREAM, 0.7);
  const svg = doc(W, H, `<rect width="${W}" height="${H}" fill="${NAVY}"/>` + lk2.svg + t2.svg);
  write("hysaab-email-header-1152x416.svg", svg); png(svg, "hysaab-email-header-1152x416.png");
}
{ // LinkedIn banner 1584x396: navy, reversed lockup centred
  const W = 1584, H = 396;
  const lk = placedLockup(CREAM, BLUSH, CREAM, 0.6, 560, (W - 560) / 2, 0);
  const lk2 = placedLockup(CREAM, BLUSH, CREAM, 0.6, 560, (W - 560) / 2, (H - lk.h) / 2);
  const svg = doc(W, H, `<rect width="${W}" height="${H}" fill="${NAVY}"/>` + lk2.svg);
  write("hysaab-linkedin-banner-1584x396.svg", svg); png(svg, "hysaab-linkedin-banner-1584x396.png");
}
{ // email signature 960x300: cream, lockup left, line under
  const W = 960, H = 300;
  const lk = placedLockup(NAVY, BLUSH, NAVY, 0.55, 420, 60, 0);
  const top = (H - lk.h) / 2 - 18;
  const lk2 = placedLockup(NAVY, BLUSH, NAVY, 0.55, 420, 60, top);
  const t = textPaths("Good books. Better conversations.", "italic", 26, 64, top + lk.h + 44, NAVY, 0.7);
  const svg = doc(W, H, `<rect width="${W}" height="${H}" fill="${CREAM}"/>` + lk2.svg + t.svg);
  write("hysaab-email-signature-960x300.svg", svg); png(svg, "hysaab-email-signature-960x300.png");
}

/* ---- 4. TypeScript module for the site --------------------------------- */
const MK = (() => {
  const w = tickBB.maxx - tickBB.minx, h = tickBB.maxy - tickBB.miny;
  const k = (64 * 0.78) / Math.max(w, h);
  const ox = 32 - (tickBB.minx + w / 2) * k, oy = 32 - (tickBB.miny + h / 2) * k;
  return { ink: xform(tickFont, k, -k, ox, oy), tail: xform(tailFont, k, -k, ox, oy) };
})();
const ts = `/* Generated by the brand build (scratchpad/brand-build/build.js) from
   Instrument Serif outlines + the pen-tick y. Units: 1/1000 em of the
   wordmark size, y down, baseline at 0. Do not hand-edit; regenerate. */

export const LOCKUP = {
  /* full lockup: hysaab + .ai */
  viewBox: "${vb(full)}",
  width: ${r1(full.maxx - full.minx)},
  height: ${r1(full.maxy - full.miny)},
  /* wordmark only: hysaab */
  wordViewBox: "${vb(wordOnly)}",
  wordWidth: ${r1(wordOnly.maxx - wordOnly.minx)},
  wordHeight: ${r1(wordOnly.maxy - wordOnly.miny)},
  /* the baseline sits at y=0; the h ascender top is at y=${r1(bbInk.miny)} */
  ink: "${INK}",
  tail: "${TAIL}",
  suffix: "${SUF}",
} as const;

export const MARK = {
  viewBox: "0 0 64 64",
  ink: "${MK.ink}",
  tail: "${MK.tail}",
} as const;
`;
write("brand-paths.ts", ts);
console.log("done ->", OUT);
