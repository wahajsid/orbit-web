import json, math
d=json.load(open('logo.json')); mk=d['mark']; g=d['geo']
T=g['T']; XH=g['XH']; ASC=g['ASC']; DESC=g['DESC']; W=g['W']
# mark-local: minx of the tick = -(T*XH + W/2)
minx=-(T*XH+W/2); vx=-minx; fy=lambda y: ASC-y
PADL,PADR,PADT,PADB=720,760,160,170
vb=f'{-PADL} {-PADT} {mk["w"]+PADL+PADR:.0f} {mk["h"]+PADT+PADB}'
S='#6F7680'; R='#D1322A'; INK='#111418'
lines=''
for y,lab in [(ASC,'ascender 1500'),(XH,'x-height 1080'),(0,'baseline 0'),(DESC,'descender −390')]:
    lines+=f'<line x1="{-PADL+20}" x2="{mk["w"]+PADR-20:.0f}" y1="{fy(y)}" y2="{fy(y)}" stroke="{S}" stroke-width="5" stroke-dasharray="22 16"/>'
    lines+=f'<text x="{-PADL+24}" y="{fy(y)-22}" font-size="64" fill="{S}" font-family="JetBrains Mono,monospace">{lab}</text>'
axis=f'<line x1="{vx}" x2="{vx}" y1="{fy(ASC)-60}" y2="{fy(DESC)+60}" stroke="{R}" stroke-width="5" stroke-dasharray="10 12"/>'
cl=f'<line x1="{vx}" y1="{fy(0)}" x2="{vx-T*XH}" y2="{fy(XH)}" stroke="{R}" stroke-width="6"/><line x1="{vx}" y1="{fy(0)}" x2="{vx+T*ASC}" y2="{fy(ASC)}" stroke="{R}" stroke-width="6"/><line x1="{vx}" y1="{fy(0)}" x2="{vx+T*DESC}" y2="{fy(DESC)}" stroke="{R}" stroke-width="6"/>'
# angle arcs radius 520 from vertical
r=520; a=math.atan(T)
def pt(sign): return (vx+sign*r*math.sin(a), fy(0)-r*math.cos(a))
lx,ly=pt(-1); rx,ry=pt(1)
arcs=f'<path d="M{vx} {fy(0)-r} A {r} {r} 0 0 0 {lx:.1f} {ly:.1f}" fill="none" stroke="{R}" stroke-width="6"/><path d="M{vx} {fy(0)-r} A {r} {r} 0 0 1 {rx:.1f} {ry:.1f}" fill="none" stroke="{R}" stroke-width="6"/>'
arcs+=f'<text x="{vx-40}" y="{fy(0)-r-40}" text-anchor="end" font-size="66" fill="{R}" font-family="JetBrains Mono,monospace">{g["angle_deg"]}°</text><text x="{vx+40}" y="{fy(0)-r-40}" font-size="66" fill="{R}" font-family="JetBrains Mono,monospace">{g["angle_deg"]}°</text>'
# width dimension on left arm at x-height
x0=vx-T*XH-W/2; x1=vx-T*XH+W/2; yy=fy(XH)-110
dim=f'<line x1="{x0}" x2="{x1}" y1="{yy}" y2="{yy}" stroke="{INK}" stroke-width="6"/><line x1="{x0}" x2="{x0}" y1="{yy-30}" y2="{yy+30}" stroke="{INK}" stroke-width="6"/><line x1="{x1}" x2="{x1}" y1="{yy-30}" y2="{yy+30}" stroke="{INK}" stroke-width="6"/><text x="{(x0+x1)/2}" y="{yy-26}" text-anchor="middle" font-size="64" fill="{INK}" font-family="JetBrains Mono,monospace">{W}</text>'
svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="Construction of the hysaab mark"><path fill="{INK}" fill-opacity=".9" d="{mk["ink"]}"/><path fill="{R}" fill-opacity=".9" d="{mk["red"]}"/>{lines}{axis}{cl}{arcs}{dim}</svg>'
open('pack/02-mark/hysaab-mark-construction.svg','w').write(svg)
print('ok', vb)
