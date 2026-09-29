import json, math
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.basePen import decomposeQuadraticSegment
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
f=TTFont('sg900.ttf'); gs=f.getGlyphSet()
XH=1080; ASC=1500; DESC=-390; GAP=62   # GAP = the font's own closest gap between a|a, s|a, a|s (measured: 62, 64, 59)
INK='#111418'; RED='#D1322A'; SIG='#F0584B'; HI='#FFE55C'; OFF='#F4F4F1'

def sample_glyph(g):
    rp=RecordingPen(); gs[g].draw(rp); out=[]; cur=start=None
    for op,a in rp.value:
        if op=='moveTo': cur=start=a[0]; out.append(cur)
        elif op=='lineTo':
            p=a[0]; out+=[(cur[0]+(p[0]-cur[0])*t/30,cur[1]+(p[1]-cur[1])*t/30) for t in range(1,31)]; cur=p
        elif op=='qCurveTo':
            for c,e in decomposeQuadraticSegment(a):
                for i in range(1,31):
                    t=i/30; out.append(((1-t)**2*cur[0]+2*(1-t)*t*c[0]+t*t*e[0],(1-t)**2*cur[1]+2*(1-t)*t*c[1]+t*t*e[1]))
                cur=e
        elif op=='closePath': cur=start
    return out
def sample_poly(P):
    out=[]
    for i in range(len(P)):
        a=P[i]; b=P[(i+1)%len(P)]
        out+=[(a[0]+(b[0]-a[0])*t/40,a[1]+(b[1]-a[1])*t/40) for t in range(40)]
    return out
def para(y0,y1,cx,W):
    h=W/2; return [(cx(y0)-h,y0),(cx(y0)+h,y0),(cx(y1)+h,y1),(cx(y1)-h,y1)]

class Item:
    def __init__(s,kind,data,fill='ink'): s.kind=kind; s.data=data; s.fill=fill
def glyph(g): return Item('glyph',g)
def shape(polys):  # list of (poly, fillkey)
    return Item('shape',polys)
def item_points(it):
    return sample_glyph(it.data) if it.kind=='glyph' else [p for poly,_ in it.data for p in sample_poly(poly)]

def band(P,y,side,b=14):
    xs=[x for x,yy in P if abs(yy-y)<=b]
    return (min(xs) if side=='L' else max(xs)) if xs else None
def place(items):
    xs=[0]; pts=[item_points(it) for it in items]
    # shift first so its ink starts at 0
    xs[0]=-min(x for x,_ in pts[0])
    for i in range(1,len(items)):
        prev=pts[i-1]; cur=pts[i]; best=None
        for y in range(DESC,ASC+1,10):
            r=band(prev,y,'R'); l=band(cur,y,'L')
            if r is None or l is None: continue
            need=(xs[i-1]+r)+GAP-l
            best=need if best is None else max(best,need)
        xs.append(best)
    right=max(xs[i]+max(x for x,_ in pts[i]) for i in range(len(items)))
    return xs,right

def path_glyph(g,dx,top):
    pen=SVGPathPen(gs); gs[g].draw(TransformPen(pen,(1,0,0,-1,dx,top))); return pen.getCommands()
def path_poly(P,dx,top): return 'M'+' L'.join('%.1f %.1f'%(x+dx,top-y) for x,y in P)+' Z'

def compose(items, extras=None):
    xs,right=place(items); top=ASC
    layers={'ink':[], 'red':[], 'hi':[]}
    for it,x in zip(items,xs):
        if it.kind=='glyph': layers['ink'].append(path_glyph(it.data,x,top))
        else:
            for poly,k in it.data: layers[k].append(path_poly(poly,x,top))
    bottom=DESC; ext_top=ASC; left=0
    if extras:
        for poly,k in extras(right):
            layers[k].append(path_poly(poly,0,top)); bottom=min(bottom,min(y for _,y in poly)); ext_top=max(ext_top,max(y for _,y in poly)); left=min(left,min(x for x,_ in poly)); right=max(right,max(x for x,_ in poly))
    return {'vb':(left, top-ext_top, right-left, ext_top-bottom),'layers':layers,'xs':xs}

T=0.36; W=448
L=lambda y:-T*y; R=lambda y:T*y
tick_y=shape([(para(0,XH,L,W),'ink'),(para(0,ASC,R,W),'ink'),(para(DESC,0,R,W),'red')])
quiet_y=shape([(para(0,XH,L,W),'ink'),(para(0,XH,R,W),'ink'),(para(DESC,0,R,W),'red')])
word=lambda y_item:[glyph('h'),y_item,glyph('s'),glyph('a'),glyph('a'),glyph('b')]
plain=word(glyph('y'))
# C: review check after the word: short and long arm mirrored at a check angle, pen weight
TC=0.62; WC=300
check=shape([(para(0,560,lambda y:-TC*y,WC),'red'),(para(0,1300,lambda y:TC*y,WC),'red')])
# D: double rule below the descender, full width
def dbl(right): return [([(0,-470),(right,-470),(right,-570),(0,-570)],'red'),([(0,-660),(right,-660),(right,-760),(0,-760)],'red')]
# E: highlighter band behind the x-height, slanted ends like a marker
def band_hi(right): return [([(-150,-120),(right+90,-120),(right+170,1230),(-70,1230)],'hi')]

opts={
 'A':{'name':'Tick-y','items':word(tick_y),'extras':None},
 'B':{'name':'Quiet y','items':word(quiet_y),'extras':None},
 'C':{'name':'Checked','items':plain+[check],'extras':None},
 'D':{'name':'Balanced','items':plain,'extras':dbl},
 'E':{'name':'Highlighted','items':word(tick_y),'extras':band_hi},
}
res={}
for k,o in opts.items():
    c=compose(o['items'],o['extras']); res[k]={'name':o['name'],**c}
# report gaps for A to prove spacing
xsA=res['A']['xs']; print('A positions',[round(x) for x in xsA])
# icons: each option's symbol, bbox-centred
def bbox(polys): xs=[x for p,_ in polys for x,_ in p]; ys=[y for p,_ in polys for _,y in p]; return min(xs),min(ys),max(xs),max(ys)
icons={}
icons['A']=tick_y.data
icons['B']=quiet_y.data
icons['C']=check.data
icons['E']=tick_y.data
json.dump({'res':res,'icons':icons},open('options.json','w'))
print('ok')
