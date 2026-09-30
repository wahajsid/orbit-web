"""Hysaab figure fonts, built from two OFL typefaces.

Amounts must read 12,840.00, never 12 , 840 . 00. Two faces caused the gaps:

* Hysaab Grotesk = Schibsted Grotesk whose tabular-figures feature (tnum)
  changes digits only. Upstream, tnum also swaps the comma, full stop, colon,
  semicolon, '#' and '%' for 1300-unit glyphs as wide as a digit, so every
  `font-variant-numeric: tabular-nums` amount spread out. Digits still become
  tabular, so right-aligned columns line up.
* Hysaab Mono = JetBrains Mono with a narrow comma and full stop (340 units
  instead of 600). New glyphs are added and the cmap repointed, so composites
  that reuse the originals (semicolon, ellipsis) are untouched.

Sources: @expo-google-fonts/schibsted-grotesk (npm) static TTFs 400-900, and
JetBrains Mono static TTFs 400/500/600/700 (Google Fonts). Run:
  python3 build_fonts.py <schibsted-dir> <jetbrains-dir> <out-dir>
Needs fonttools and brotli."""
import copy, os, sys
from fontTools.ttLib import TTFont

SCH_DIR, JBM_DIR, OUT = sys.argv[1:4]
os.makedirs(OUT, exist_ok=True)
STYLE = {400: "Regular", 500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold", 900: "Black"}
KEEP_TNUM = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
LICENSE_NOTE = "{fam} is a modified version of {src} (SIL Open Font License 1.1): {what}."


def rename(f, fam, wt, src, what, ital=False):
    style = STYLE[wt] + (" Italic" if ital else "")
    if style == "Regular Italic":
        style = "Italic"
    name = f["name"]
    for rec in list(name.names):
        if rec.nameID in (1, 2, 3, 4, 6, 16, 17):
            name.removeNames(nameID=rec.nameID)
    ribbi = style in ("Regular", "Bold", "Italic", "Bold Italic")
    legacy_sub = style if ribbi else ("Italic" if ital else "Regular")
    name.setName(fam if ribbi else f"{fam} {style.replace(' Italic', '')}", 1, 3, 1, 0x409)
    name.setName(legacy_sub, 2, 3, 1, 0x409)
    name.setName(f"{fam} {style}; Hysaab", 3, 3, 1, 0x409)
    name.setName(f"{fam} {style}", 4, 3, 1, 0x409)
    name.setName(f"{fam.replace(' ', '')}-{style.replace(' ', '')}", 6, 3, 1, 0x409)
    name.setName(fam, 16, 3, 1, 0x409)
    name.setName(style, 17, 3, 1, 0x409)
    name.setName(LICENSE_NOTE.format(fam=fam, src=src, what=what), 10, 3, 1, 0x409)


def save(f, stem):
    for tag in ("hdmx", "LTSH", "VDMX", "DSIG"):
        if tag in f:
            del f[tag]
    f.flavor = "woff2"
    f.save(os.path.join(OUT, stem + ".woff2"))


# Hysaab Grotesk, roman and italic
for (wt, style), ital in [(ws, i) for ws in STYLE.items() for i in (False, True)]:
    sub = f"{wt}{style}" + ("_Italic" if ital else "")
    f = TTFont(os.path.join(SCH_DIR, sub, f"SchibstedGrotesk_{sub}.ttf"))
    gsub = f["GSUB"].table
    dropped = set()
    for fr in gsub.FeatureList.FeatureRecord:
        if fr.FeatureTag != "tnum":
            continue
        for li in fr.Feature.LookupListIndex:
            for st in gsub.LookupList.Lookup[li].SubTable:
                for g in list(st.mapping):
                    if g not in KEEP_TNUM:
                        del st.mapping[g]
                        dropped.add(g)
    rename(f, "Hysaab Grotesk", wt, "Schibsted Grotesk", "tabular figures change digits only", ital)
    save(f, f"HysaabGrotesk-{wt}" + ("-italic" if ital else ""))
    print("grotesk", sub, "tnum no longer swaps", sorted(dropped))

# Hysaab Mono
NARROW = 340
for wt in (400, 500, 600, 700):
    f = TTFont(os.path.join(JBM_DIR, f"JetBrainsMono-{wt}.ttf"))
    glyf, hmtx = f["glyf"], f["hmtx"]
    order = f.getGlyphOrder()
    for cp, base in ((0x2C, "comma"), (0x2E, "period")):
        g = copy.deepcopy(glyf[base])
        assert not g.isComposite(), base
        g.recalcBounds(glyf)
        dx = round((NARROW - (g.xMax - g.xMin)) / 2) - g.xMin
        g.coordinates.translate((dx, 0))
        g.recalcBounds(glyf)
        new = base + ".fig"
        order.append(new)
        glyf.glyphs[new] = g
        hmtx.metrics[new] = (NARROW, g.xMin)
        for t in f["cmap"].tables:
            if t.isUnicode() and cp in t.cmap:
                t.cmap[cp] = new
    f.setGlyphOrder(order)
    glyf.glyphOrder = order
    f["post"].isFixedPitch = 0
    f["OS/2"].panose.bProportion = 0
    rename(f, "Hysaab Mono", wt, "JetBrains Mono", "narrower comma and full stop for figures")
    save(f, f"HysaabMono-{wt}")
    print("mono", wt, "comma/period advance", NARROW)
