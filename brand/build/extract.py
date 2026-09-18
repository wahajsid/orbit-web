import json, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

def dump(path):
    f = TTFont(path)
    upm = f['head'].unitsPerEm
    os2 = f['OS/2']; hhea = f['hhea']
    cmap = f.getBestCmap()
    gs = f.getGlyphSet()
    hmtx = f['hmtx']
    out = {}
    chars = [chr(c) for c in range(32, 127)]
    for ch in chars:
        gn = cmap.get(ord(ch))
        if not gn: continue
        pen = SVGPathPen(gs)
        gs[gn].draw(pen)
        adv, lsb = hmtx[gn]
        out[ch] = {"d": pen.getCommands(), "adv": adv}
    # kerning from GPOS pair adjustment (flat pairs only)
    kern = {}
    try:
        gpos = f['GPOS'].table
        rev = {v:k for k,v in cmap.items()}
        for lookup in gpos.LookupList.Lookup:
            for st in lookup.SubTable:
                if getattr(st, 'LookupType', lookup.LookupType) == 9:
                    st = st.ExtSubTable
                if st.LookupType != 2: continue
                if st.Format == 1:
                    firsts = st.Coverage.glyphs
                    for i, ps in enumerate(st.PairSet):
                        g1 = firsts[i]
                        for pvr in ps.PairValueRecord:
                            v = pvr.Value1.XAdvance if pvr.Value1 and hasattr(pvr.Value1,'XAdvance') else 0
                            if v and g1 in rev and pvr.SecondGlyph in rev:
                                kern[chr(rev[g1])+chr(rev[pvr.SecondGlyph])] = v
                elif st.Format == 2:
                    cd1 = st.ClassDef1.classDefs; cd2 = st.ClassDef2.classDefs
                    cov = set(st.Coverage.glyphs)
                    for g1 in cov:
                        c1 = cd1.get(g1, 0)
                        for g2 in rev:
                            c2 = cd2.get(g2, 0)
                            rec = st.Class1Record[c1].Class2Record[c2]
                            v = rec.Value1.XAdvance if rec.Value1 and hasattr(rec.Value1,'XAdvance') else 0
                            if v and g1 in rev:
                                kern[chr(rev[g1])+chr(rev[g2])] = v
    except Exception as e:
        print("kern skipped:", e, file=sys.stderr)
    return {"upm": upm, "xHeight": os2.sxHeight, "capHeight": os2.sCapHeight,
            "ascender": hhea.ascent, "descender": hhea.descent, "glyphs": out, "kern": kern}

data = {"regular": dump("InstrumentSerif-Regular.woff"), "italic": dump("InstrumentSerif-Italic.woff")}
json.dump(data, open("../brand-build/glyphs.json","w"))
r = data["regular"]
print("upm", r["upm"], "xHeight", r["xHeight"], "cap", r["capHeight"], "asc", r["ascender"], "desc", r["descender"])
print("adv h s a b .", [r["glyphs"][c]["adv"] for c in "hsab."])
print("kern pairs", len(r["kern"]), {k:v for k,v in r["kern"].items() if k in ("hs","sa","aa","ab","hy","ys")})
