# Emit lib/brand-paths.ts for orbit-web: Option A wordmark + tick mark,
# in 1/1000-em units, baseline y=0, y down (the site's existing convention).
import runpy, json
ns=runpy.run_path('options.py')   # recomputes placement (optical spacing, 62u gaps)
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
gs=ns['gs']; S=1000/2048
items=ns['word'](ns['tick_y']); xs,right=ns['place'](items)
ink=[];tail=[]
def poly(P,dx): return 'M'+' L'.join('%.1f %.1f'%((x+dx)*S,-y*S) for x,y in P)+' Z'
for it,x in zip(items,xs):
    if it.kind=='glyph':
        pen=SVGPathPen(gs,ntos=lambda v:('%.1f'%v).rstrip('0').rstrip('.')); gs[it.data].draw(TransformPen(pen,(S,0,0,-S,x*S,0))); ink.append(pen.getCommands())
    else:
        for P,k in it.data: (ink if k=='ink' else tail).append(poly(P,x))
W=right*S; top=-1500*S; bot=390*S
vb='0 %.1f %.1f %.1f'%(top,W,bot-top)
# mark: tick alone, bbox-centred in a 64 box at 56 high
tick=ns['tick_y'].data
xsP=[x for P,_ in tick for x,_ in P]; ysP=[y for P,_ in tick for _,y in P]
minx,maxx,miny,maxy=min(xsP),max(xsP),min(ysP),max(ysP)
k=56/(maxy-miny); ox=(64-(maxx-minx)*k)/2; oy=(64-(maxy-miny)*k)/2
def mpoly(P): return 'M'+' L'.join('%.2f %.2f'%(ox+(x-minx)*k, oy+(maxy-y)*k) for x,y in P)+' Z'
mink=' '.join(mpoly(P) for P,c in tick if c=='ink'); mtail=' '.join(mpoly(P) for P,c in tick if c=='red')
ts=f'''/* Generated from the Tick & Tie brand build (brand/tick-and-tie/, 29 Sep 2026).
   Wordmark: lowercase hysaab in Schibsted Grotesk Black, outlined, with the
   tick-y: two arms mirrored at 19.8° from vertical, each 448 font units wide,
   meeting on the baseline; the long arm rises to the ascender and continues
   below the baseline as the Review Red tail. Every neighbouring pair is set to
   a closest gap of 62 font units. Units: 1/1000 em, y down, baseline at 0.
   Do not hand-edit; regenerate. */

export const LOCKUP = {{
  /* The new brand has no .ai suffix: both view boxes are the wordmark. */
  viewBox: "{vb}",
  width: {W:.1f},
  height: {bot-top:.1f},
  wordViewBox: "{vb}",
  wordWidth: {W:.1f},
  wordHeight: {bot-top:.1f},
  ink: "{' '.join(ink)}",
  tail: "{' '.join(tail)}",
  suffix: "",
}} as const;

/* The tick-y alone, centred on its bounding box in a 64-unit square. */
export const MARK = {{
  viewBox: "0 0 64 64",
  ink: "{mink}",
  tail: "{mtail}",
}} as const;
'''
open(__import__('os').path.join(__import__('os').path.dirname(__file__),'../../../lib/brand-paths.ts'),'w').write(ts)
print(vb, len(ts))
