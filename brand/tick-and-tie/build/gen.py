import json, math
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
f=TTFont('sg900.ttf'); gs=f.getGlyphSet(); hm=f['hmtx']
XH=1080; ASC=1500; DESC=-390   # x-height, h/b ascender, y descender (from the font)
W=448        # horizontal arm width, identical to the font's own y arms at x-height (9->457, 888->1336)
T=0.36       # tan of arm angle from vertical; both arms mirror this exactly
ANG=math.degrees(math.atan(T))
TRACK=-36    # uniform tracking between letters, font units (-1.76% of the em)

def para(y0,y1,cx_at):  # parallelogram with horizontal cuts, centreline x = cx_at(y)
    h=W/2
    return [(cx_at(y0)-h,y0),(cx_at(y0)+h,y0),(cx_at(y1)+h,y1),(cx_at(y1)-h,y1)]
L=lambda y:-T*y        # left arm centreline, vertex at (0,0) on the baseline
R=lambda y: T*y        # right arm centreline; below the baseline it continues as the tail
left=para(0,XH,L); right=para(0,ASC,R); tail=para(DESC,0,R)
# notch where the inner edges meet
notch_y=(W/2)/T
# bounding box of the tick
xs=[p[0] for p in left+right+tail]; minx,maxx=min(xs),max(xs)

def pts2d(pts,dx,flip):
    return 'M'+' L'.join('%.1f %.1f'%(x+dx,flip(y)) for x,y in pts)+' Z'

def glyph_path(name,dx,flip_top):
    pen=SVGPathPen(gs); tp=TransformPen(pen,(1,0,0,-1,dx,flip_top)); gs[name].draw(tp); return pen.getCommands()

# ---- wordmark ----
LSB_Y=9; RSB_Y=49          # y side bearings: lsb as the font y; rsb opened 40u so the tall arm clears the s
y_adv=(maxx-minx)+LSB_Y+RSB_Y
seq=[('h',hm['h'][0]),('Y',y_adv),('s',hm['s'][0]),('a',hm['a'][0]),('a',hm['a'][0]),('b',hm['b'][0])]
x=0; ink=[]; red=[]
top=ASC
flip=lambda y: top-y
for i,(g,adv) in enumerate(seq):
    if g=='Y':
        dx=x+LSB_Y-minx
        ink.append(pts2d(left,dx,flip)); ink.append(pts2d(right,dx,flip)); red.append(pts2d(tail,dx,flip))
    else:
        ink.append(glyph_path(g,x,top))
    x+=adv+(TRACK if i<len(seq)-1 else 0)
# trim right bearing of b and left bearing of h so the box is the ink
left_ink=125; right_ink=x-(hm['b'][0]-1300)
wm={'viewBox':'%d 0 %d %d'%(left_ink,right_ink-left_ink,ASC-DESC),'ink':' '.join(ink),'red':' '.join(red),
    'width':right_ink-left_ink,'height':ASC-DESC}

# ---- mark (tick alone), bbox-centred ----
mw=maxx-minx; mh=ASC-DESC
mk_ink=pts2d(left,-minx,lambda y:ASC-y)+' '+pts2d(right,-minx,lambda y:ASC-y)
mk_red=pts2d(tail,-minx,lambda y:ASC-y)
mark={'w':mw,'h':mh,'ink':mk_ink,'red':mk_red}
geo={'XH':XH,'ASC':ASC,'DESC':DESC,'W':W,'T':T,'angle_deg':round(ANG,2),'stroke_perp':round(W*math.cos(math.atan(T)),1),
     'notch_y':round(notch_y,1),'track':TRACK,'mark_w':round(mw,1),'mark_h':mh,'stem_h':400}
json.dump({'wm':wm,'mark':mark,'geo':geo},open('logo.json','w'))
print(geo, wm['viewBox'])
# symmetry check: left arm vs right arm below x-height mirror exactly
l=[(round(-x_,3),y) for x_,y in para(0,XH,L)]; r=para(0,XH,R)
print('mirror check', sorted(l)==sorted([(round(x_,3),y) for x_,y in r]))
