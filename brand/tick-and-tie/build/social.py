import json
P='pack'
WM=open(f'{P}/01-logo/hysaab-wordmark-primary.svg').read()
WMR=open(f'{P}/01-logo/hysaab-wordmark-reversed.svg').read()
MK=open(f'{P}/02-mark/hysaab-mark-primary.svg').read()
FONTS='''<style>
@font-face{font-family:SG;src:url(../../fonts/SchibstedGrotesk-400.ttf);font-weight:400}
@font-face{font-family:SG;src:url(../../fonts/SchibstedGrotesk-600.ttf);font-weight:600}
@font-face{font-family:SG;src:url(../../fonts/SchibstedGrotesk-800.ttf);font-weight:800}
@font-face{font-family:SG;src:url(../../fonts/SchibstedGrotesk-900.ttf);font-weight:900}
@font-face{font-family:JB;src:url(../../fonts/JetBrainsMono-400.ttf);font-weight:400}
@font-face{font-family:JB;src:url(../../fonts/JetBrainsMono-600.ttf);font-weight:600}
@font-face{font-family:CV;src:url(../../fonts/Caveat-700.ttf);font-weight:700}
*{box-sizing:border-box;margin:0}
body{margin:0;font-family:SG,Arial,sans-serif;color:#111418;-webkit-font-smoothing:antialiased}
.grid{background-color:#fff;background-image:linear-gradient(#F2F2EF 1px,transparent 1px),linear-gradient(90deg,#F2F2EF 1px,transparent 1px);background-size:32px 32px}
.hl{background:linear-gradient(transparent 10%,#FFE55C 10%,#FFE55C 92%,transparent 92%);padding:0 .06em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.wp{display:flex;justify-content:space-between;font-family:JB;font-size:15px;color:#4E545D;border:1px solid #E3E3DE;background:#fff;padding:9px 14px}
.wp b{color:#111418;font-weight:600}
.tm{font-family:CV;font-weight:700;color:#D1322A}
svg{display:block}
</style>'''
def page(w,h,body,extra=''):
    return f'<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>html,body{{width:{w}px;height:{h}px;overflow:hidden}}{extra}</style></head><body>{body}</body></html>'
T={}
T['og-card-1200x630']=(1200,630,page(1200,630,f'''<div class="grid" style="width:1200px;height:630px;padding:48px 64px;display:flex;flex-direction:column">
<div class="wp"><span>W/P ref <b>H-1</b> · hysaab.ai</span><span>Prepared by <b>agents</b> · Reviewed by <b>you</b></span></div>
<div style="height:58px;margin-top:40px">{WM.replace('<svg ','<svg height="58" ')}</div>
<h1 style="font-weight:900;font-size:66px;line-height:.98;letter-spacing:-.035em;margin-top:34px;max-width:980px">AI agents do the finance work. <span class="hl">Your people review and approve.</span></h1>
<div style="margin-top:auto;display:flex;justify-content:space-between;font-family:JB;font-size:17px;color:#4E545D;border-top:2px solid #111418;padding-top:16px"><span>Finance teams · Tax and advisory firms · Licensed audit firms</span><span>UAE · KSA</span></div></div>'''))
T['linkedin-banner-1584x396']=(1584,396,page(1584,396,f'''<div class="grid" style="width:1584px;height:396px;padding:52px 72px 44px 470px;display:flex;flex-direction:column;position:relative">
<div style="display:flex;justify-content:space-between;align-items:flex-start"><h1 style="font-weight:900;font-size:76px;line-height:.95;letter-spacing:-.035em">Agents prepare.<br><span class="hl">People decide.</span></h1>
<div style="border:1px solid #111418;background:#fff;padding:14px 18px;font-size:16px;width:330px"><div style="font-family:JB;font-size:12px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;margin-bottom:8px">Tick mark legend</div>
<div><span class="tm" style="font-size:24px;display:inline-block;width:30px">✓</span>Recomputed</div><div><span class="tm" style="font-size:24px;display:inline-block;width:30px">T</span>Traced to source</div><div><span class="tm" style="font-size:24px;display:inline-block;width:30px">B</span>Agreed to bank</div><div><span class="tm" style="font-size:24px;display:inline-block;width:30px">P</span>Approved by a person</div></div></div>
<div style="margin-top:auto;display:flex;justify-content:space-between;font-family:JB;font-size:16px;color:#4E545D;border-top:2px solid #111418;padding-top:12px"><span>AI agents for finance teams and the firms that serve them · UAE · KSA</span><span>hysaab.ai</span></div></div>'''))
T['x-header-1500x500']=(1500,500,page(1500,500,f'''<div style="width:1500px;height:500px;background:#111418;color:#F4F4F1;padding:70px 80px 56px 80px;display:flex;flex-direction:column">
<div style="height:48px;align-self:flex-end">{WMR.replace('<svg ','<svg height="48" ')}</div>
<h1 style="font-weight:900;font-size:92px;line-height:.95;letter-spacing:-.04em;margin-top:auto">Evidence on <span class="hl" style="color:#111418">every number.</span></h1>
<div style="display:flex;gap:26px;margin-top:26px;font-family:JB;font-size:18px;color:#B9BEC7"><span><span class="tm" style="color:#F0584B;font-size:28px">✓</span> recomputed</span><span><span class="tm" style="color:#F0584B;font-size:28px">T</span> traced</span><span><span class="tm" style="color:#F0584B;font-size:28px">B</span> agreed to bank</span><span><span class="tm" style="color:#F0584B;font-size:28px">P</span> approved by a person</span></div></div>'''))
T['square-post-1080x1080']=(1080,1080,page(1080,1080,f'''<div class="grid" style="width:1080px;height:1080px;padding:64px;display:flex;flex-direction:column">
<div class="wp" style="font-size:17px"><span>W/P ref <b>H-7</b> · September close / loose ends</span><span>Sample data</span></div>
<div style="display:flex;align-items:center;gap:54px;margin-top:auto">
<div style="position:relative;padding:0 30px"><span style="font-weight:900;font-size:380px;line-height:.8;letter-spacing:-.05em;display:block">0</span>
<svg viewBox="0 0 200 200" style="position:absolute;inset:-16% -20%;width:140%;height:132%;overflow:visible"><path d="M110 18 C 50 10, 12 60, 22 118 C 30 168, 90 190, 140 172 C 186 154, 194 92, 170 52 C 152 22, 112 6, 76 22" fill="none" stroke="#D1322A" stroke-width="5" stroke-linecap="round"/></svg></div>
<div><div style="font-family:JB;font-size:18px;letter-spacing:.1em;text-transform:uppercase;color:#4E545D">Loose ends</div><div style="font-weight:800;font-size:52px;line-height:1;letter-spacing:-.025em;margin-top:14px">A rare occasion when zero is the number you want.</div></div></div>
<div style="font-weight:900;font-size:78px;letter-spacing:.02em;margin-top:64px;margin-bottom:auto;align-self:flex-start;border-bottom:8px double #D1322A">ALL SQUARE.</div>
<div style="display:flex;justify-content:space-between;align-items:flex-end;border-top:2px solid #111418;padding-top:18px"><span style="font-family:JB;font-size:17px;color:#4E545D">Illustrative completed close · Sample data</span><div style="height:44px">{WM.replace('<svg ','<svg height="44" ')}</div></div></div>'''))
T['email-signature-600x140']=(600,140,page(600,140,f'''<div style="width:600px;height:140px;background:#fff;padding:22px 24px;display:flex;align-items:center;gap:24px;border-top:4px solid #FFE55C">
<div style="height:34px">{WM.replace('<svg ','<svg height="34" ')}</div>
<div style="border-left:1px solid #E3E3DE;padding-left:22px"><div style="font-weight:800;font-size:20px;letter-spacing:-.02em">Good books. <span class="hl">Better conversations.</span></div><div style="font-family:JB;font-size:13px;color:#4E545D;margin-top:6px">hysaab.ai · info@hysaab.ai · Built in Dubai for the Gulf</div></div></div>'''))
for k,(w,h,html) in T.items(): open(f'{P}/_render/{k}.html','w').write(html)
json.dump({k:[v[0],v[1]] for k,v in T.items()},open(f'{P}/_render/social.json','w'))
print(list(T))
