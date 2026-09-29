import json, os, math
d=json.load(open('logo.json')); wm=d['wm']; mk=d['mark']; geo=d['geo']
INK='#111418'; PAPER='#FFFFFF'; HI='#FFE55C'; RED='#D1322A'; SIG='#F0584B'; OFF='#F4F4F1'
P='pack'
for sub in ['01-logo','02-mark','03-icons','04-social','05-colour','06-type','_render']: os.makedirs(f'{P}/{sub}',exist_ok=True)
vb=[float(v) for v in wm['viewBox'].split()]
X=geo['XH']  # clear space unit = x-height

def wordmark_svg(ink,red,bg=None,pad=0):
    x,y,w,h=vb; X0,Y0,W0,H0=x-pad,y-pad,w+2*pad,h+2*pad
    b=f'<rect x="{X0}" y="{Y0}" width="{W0}" height="{H0}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{X0:.0f} {Y0:.0f} {W0:.0f} {H0:.0f}" role="img" aria-label="hysaab">{b}<path fill="{ink}" d="{wm["ink"]}"/><path fill="{red}" d="{wm["red"]}"/></svg>'
def mark_paths(ink,red,s,ox,oy):
    return f'<g transform="translate({ox:.2f} {oy:.2f}) scale({s:.5f})"><path fill="{ink}" d="{mk["ink"]}"/><path fill="{red}" d="{mk["red"]}"/></g>'
def mark_svg(ink,red):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {mk["w"]:.1f} {mk["h"]}" role="img" aria-label="hysaab mark">'+mark_paths(ink,red,1,0,0)+'</svg>'
def icon_svg(bg,ink,red,size=1024,frac=0.6,circle=False,radius=0):
    s=size*frac/mk['h']; w=mk['w']*s; h=mk['h']*s; ox=(size-w)/2; oy=(size-h)/2   # bbox-centred: equal margins both axes
    shape=f'<circle cx="{size/2}" cy="{size/2}" r="{size/2}" fill="{bg}"/>' if circle else f'<rect width="{size}" height="{size}" rx="{radius}" fill="{bg}"/>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" role="img" aria-label="hysaab">{shape}'+mark_paths(ink,red,s,ox,oy)+'</svg>'
def w(path,s): open(f'{P}/{path}','w').write(s)

# 01 logo
w('01-logo/hysaab-wordmark-primary.svg', wordmark_svg(INK,RED))
w('01-logo/hysaab-wordmark-reversed.svg', wordmark_svg(OFF,SIG))
w('01-logo/hysaab-wordmark-mono-ink.svg', wordmark_svg(INK,INK))
w('01-logo/hysaab-wordmark-mono-white.svg', wordmark_svg(PAPER,PAPER))
w('01-logo/hysaab-wordmark-on-highlighter.svg', wordmark_svg(INK,RED,HI,X))
w('01-logo/hysaab-wordmark-on-ink.svg', wordmark_svg(OFF,SIG,INK,X))
w('01-logo/hysaab-wordmark-with-clearspace.svg', wordmark_svg(INK,RED,PAPER,X))
# 02 mark
w('02-mark/hysaab-mark-primary.svg', mark_svg(INK,RED))
w('02-mark/hysaab-mark-reversed.svg', mark_svg(OFF,SIG))
w('02-mark/hysaab-mark-mono-ink.svg', mark_svg(INK,INK))
w('02-mark/hysaab-mark-mono-white.svg', mark_svg(PAPER,PAPER))
# 03 icons
w('03-icons/app-icon-highlighter.svg', icon_svg(HI,INK,RED))
w('03-icons/app-icon-ink.svg', icon_svg(INK,OFF,SIG))
w('03-icons/app-icon-paper.svg', icon_svg(PAPER,INK,RED))
w('03-icons/favicon.svg', icon_svg(HI,INK,RED,64,0.72,radius=12))
# 04 social avatars (circle-safe)
w('04-social/avatar-highlighter.svg', icon_svg(HI,INK,RED,1024,0.56,circle=False))
w('04-social/avatar-ink.svg', icon_svg(INK,OFF,SIG,1024,0.56,circle=False))
json.dump({'vb':vb,'X':X},open(f'{P}/_render/meta.json','w'))
print('ok')
