/* SEO audit of a running build: node scripts/seo-audit.mjs [origin]
   For every marketing route in both languages it reports title and
   description lengths, canonical, hreflang pairs (and whether each twin
   answers 200), h1 count, robots meta, JSON-LD types, and duplicate
   titles across pages. Exit 1 on any hard problem. */

const ORIGIN = process.argv[2] || "http://localhost:3200";
const EN = ["/", "/product", "/how-it-works", "/pricing", "/faq", "/about", "/contact", "/compliance", "/integrations", "/invoice", "/firms", "/audit", "/hire", "/accounting", "/guides", "/tools", "/privacy", "/terms", "/tools/uae-vat-calculator", "/guides/uae-tax-invoice-checklist"];
const AR = ["/ar", "/ar/product", "/ar/how-it-works", "/ar/pricing", "/ar/faq", "/ar/about", "/ar/contact", "/ar/compliance", "/ar/integrations", "/ar/invoice", "/ar/firms", "/ar/accounting", "/ar/guides", "/ar/tools", "/ar/tools/uae-vat-penalty-calculator"];

const get = (re, s) => { const m = s.match(re); return m ? m[1] : null; };
const all = (re, s) => [...s.matchAll(re)].map((m) => m[1]);
const decode = (s) => (s ?? "").replace(/&amp;/g, "&").replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"');

const rows = [];
let hard = 0;
const titles = new Map();
for (const path of [...EN, ...AR]) {
  const res = await fetch(ORIGIN + path);
  const html = await res.text();
  const head = html.slice(0, html.indexOf("</head>"));
  const title = decode(get(/<title>([^<]*)<\/title>/, head));
  const desc = decode(get(/<meta name="description" content="([^"]*)"/, head));
  const canonical = get(/<link rel="canonical" href="([^"]*)"/, head);
  const hreflang = [...head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)].map((m) => [m[1], m[2]]);
  const robots = get(/<meta name="robots" content="([^"]*)"/, head);
  const ogImage = get(/<meta property="og:image" content="([^"]*)"/, head);
  const lang = get(/<html[^>]*lang="([^"]+)"/, html);
  const dir = get(/<html[^>]*dir="([^"]+)"/, html);
  const h1s = all(/<h1[^>]*>([\s\S]*?)<\/h1>/g, html).map((h) => decode(h.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()));
  const ld = all(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, html).map((j) => { try { const o = JSON.parse(j); return o["@type"]; } catch { return "INVALID"; } });
  const problems = [];
  if (res.status !== 200) problems.push(`HTTP ${res.status}`);
  if (!title) problems.push("no title"); else if (title.length > 65) problems.push(`title ${title.length} chars`);
  if (!desc) problems.push("no description"); else if (desc.length > 165 || desc.length < 60) problems.push(`description ${desc.length} chars`);
  if (hreflang.length === 0 && !/\/(privacy|terms|hire|audit)$/.test(path)) problems.push("no hreflang");
  if (!canonical) problems.push("no canonical"); else if (canonical !== `https://hysaab.ai${path === "/" ? "" : path}` && canonical !== `https://hysaab.ai${path}`) problems.push(`canonical ${canonical}`);
  if (h1s.length !== 1) problems.push(`${h1s.length} h1`);
  if (robots && /noindex/.test(robots)) problems.push(`robots ${robots}`);
  if (ld.includes("INVALID")) problems.push("invalid JSON-LD");
  if (path.startsWith("/ar") && (lang !== "ar" || dir !== "rtl")) problems.push(`lang ${lang} dir ${dir}`);
  for (const [l, href] of hreflang) {
    const r = await fetch(href.replace("https://hysaab.ai", ORIGIN), { method: "HEAD" });
    if (r.status !== 200) problems.push(`hreflang ${l} → ${r.status}`);
  }
  if (title) titles.set(title, [...(titles.get(title) ?? []), path]);
  if (problems.length) hard++;
  rows.push({ path, status: res.status, title, tlen: title?.length, dlen: desc?.length, canonical: canonical?.replace("https://hysaab.ai", ""), hreflang: hreflang.map(([l]) => l).join(","), h1: h1s[0]?.slice(0, 60), ld: ld.join("+"), og: !!ogImage, problems: problems.join("; ") });
}
for (const [t, paths] of titles) if (paths.length > 1) { hard++; rows.push({ path: paths.join(" & "), problems: `duplicate title: ${t}` }); }
console.table(rows.map(({ path, tlen, dlen, hreflang, h1, ld, problems }) => ({ path, tlen, dlen, hreflang, h1, ld, problems })));
console.log(hard ? `${hard} page(s) with problems` : "No hard SEO problems found.");
process.exit(hard ? 1 : 0);
