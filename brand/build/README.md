# Brand build

Regenerates every file in `public/brand` plus `lib/brand-paths.ts` from the
Instrument Serif outlines (OFL, from Google Fonts) and the pen-tick `y`.

1. `python extract.py` next to `InstrumentSerif-Regular.woff` and
   `InstrumentSerif-Italic.woff` (download from fonts.gstatic.com) writes
   `glyphs.json` (already committed; rerun only if the font changes).
2. `npm i @resvg/resvg-js` in this folder, then `node build.js` writes `out/`.
3. Copy `out/*` into `public/brand` (favicon.svg also to `public/`), and
   `out/brand-paths.ts` to `lib/brand-paths.ts`. JPG versions: Pillow,
   quality 92.

Tick geometry lives in `TICK_BOX` in build.js: a 60x92 box, x-height at
y=0, baseline at y=58, scaled to the font's 510-unit x-height.
