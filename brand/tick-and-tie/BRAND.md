# Hysaab brand · Tick & Tie (v4)

29 September 2026. **This guide controls the website** and supersedes
`brand/BRAND-GUIDE.md` (v3, navy & blush) and `brand/DESIGN-PHILOSOPHY.md`
(v5) wherever they conflict. The full illustrated guide is
`hysaab-brand-guide.pdf` in this folder.

## The idea
The brand is a working paper. Accountants check work by marking it: they
tick what they recomputed, trace figures to source documents, highlight
what matters and draw a double line under a total that balances. Hysaab's
agents prepare the work and people make the call, so the site borrows the
reviewer's tools to show it.

## Logo (Option A, "tick-y")
Lowercase **hysaab** in Schibsted Grotesk Black, outlined (never live text),
with one custom letter: the **y is a tick**.

| Measure (font units, 2048/em) | Value |
|---|---|
| Arm angle from vertical, both arms mirrored | 19.8° |
| Arm width (horizontal), same as the typeface's own y | 448 |
| Arms meet on the baseline | 0 |
| Short arm stops at the x-height | 1080 |
| Long arm rises to the ascender, level with h and b | 1500 |
| Review Red tail continues the long arm to the descender | −390 |
| Closest gap between every neighbouring pair of letters | 62 |

- Files: `01-logo/` (wordmark), `02-mark/` (tick alone + construction), `03-icons/`.
- Code: `lib/brand-paths.ts` (generated) → `components/Wordmark.tsx`.
- Clear space: one x-height on every side. Minimum: wordmark 18 px tall on
  screen / 6 mm in print; below that use the mark (16 px minimum).
- Never stretch, rotate, retype, recolour the tail or add effects.
- On dark grounds the tail is Signal Red `#F0584B`.

## Colour
| Token | Hex | Use |
|---|---|---|
| Ink | `#111418` | Text, the wordmark, rules, primary buttons (18.47:1 on Paper) |
| Paper | `#FFFFFF` | The page |
| Highlighter | `#FFE55C` | One claim per section; primary button on paper (Ink on it 14.61:1) |
| Review Red | `#D1322A` | Tick marks, the logo tail, what a person must look at (5.00:1 on Paper) |
| Signal Red | `#F0584B` | Review Red on Ink (5.45:1). Review Red on Ink is 3.69:1: graphics only |
| Graphite | `#4E545D` | Secondary text (7.64:1) |
| Pencil | `#6F7680` | Captions, meta (4.59:1) |
| Rule / Grid | `#E3E3DE` / `#F2F2EF` | Hairlines / the working-paper grid |
| Highlighter Soft | `#FFF6C2` | Rows needing attention |
| Posted / Waiting | `#1F7A4A` / `#8A5A00` | States, always named in words |

Proportions: Paper ~70, Ink ~20, Highlighter ~7, Red ~3. Red never means
"error" on its own. Full table with RGB/CMYK: `05-colour/`.

## Type
- **Schibsted Grotesk** (400–900): everything people read. Display 900 at −3 to −3.5% tracking.
- **JetBrains Mono** (400–600): every figure, ID, time and small uppercase label.
- **Caveat** (700): red review marks and sign-offs only. Never body copy.
- Arabic (/ar/*, in place 30 September 2026): **Noto Sans Arabic** for everything
  people read, **Noto Kufi Arabic** (700–800) for display headings. Both load
  the arabic subset only with no metric fallback, and sit first in every stack
  (`--sans`, `--mono`, `--hw-serif` in `app/tick-tie-ar.css`), so Latin words
  and every figure in an Arabic line fall through to Hysaab Grotesk / Hysaab
  Mono and read exactly as in English: Western digits, amounts, IDs and sums
  kept left to right (`<bdi>`). No letter-spacing or uppercase on Arabic.
  Caveat stays for the Latin marks (✓ T B P ?) only; Arabic hand notes and
  sign-offs are set in Kufi, still red. Layout mirrors through logical
  properties; offset shadows, the highlighter sweep, the tick tape and the
  demo's tie lines run right to left. The homepage and inner pages use the
  same components as English with Arabic strings (a `locale` prop).
Loaded with `next/font` in `app/(en)/layout.tsx` and `app/ar/layout.tsx`
as `--font-sans`, `--font-mono`, `--font-hand` (Hysaab Grotesk and Hysaab Mono
self-hosted from `app/site-fonts.ts`), plus `--font-arabic` and
`--font-noto-kufi` in the Arabic layout.

## Marks with meanings
| Mark | Meaning |
|---|---|
| ✓ | Recomputed: the arithmetic is checked |
| T | Traced to the source document |
| B | Agreed to the bank statement |
| P | Approved by a person |
| ? | Open: needs a person's decision |

- **Highlighter**: one per section, on the phrase that carries the point (`.tt-hl`, `.m-mark`).
- **Double rule**: under a total that balances and under ALL SQUARE only.
- **W/P strip** (`components/home/tt/Wp.tsx`): opens each homepage section, H-1 … H-13 in page order.
- **Tie lines**: dashed red lines from a figure to where it went (the demo, `components/hysaab/Demo.tsx` with `marks`).

## Where it lives in the site
- Tokens: `app/globals.css` (`:root`) and `app/hysaab-home.css` (`--hw-*`;
  legacy names such as `--hw-navy`, `--hw-blush`, `--hw-serif` now carry
  Ink, Highlighter and the Schibsted display face so every page follows).
- Homepage: `app/(en)/page.tsx` + `app/tick-tie.css` (all `tt-*`).
- Inner pages: `PageShell`/`PageHero` → paper-and-grid hero with the accent
  phrase on the highlighter.
- Emails: `lib/emails.ts` palette; header image `public/brand/hysaab-email-header-1152x416.png`.

## Regenerating the artwork
`build/` holds the scripts that produced every file here. From `build/`:
1. `pip install fonttools` and download Schibsted Grotesk Black as `sg900.ttf`
   (Google Fonts, SIL OFL).
2. `python3 options.py` (lays out the wordmark with the 62-unit spacing rule),
   `python3 gen.py`, `python3 build.py`, `python3 construct.py`.
3. `python3 gen_web.py` rewrites `lib/brand-paths.ts`.
PNG renders use Playwright (`social.py` writes the HTML templates).

`brand/build/` is the retired v3 (Instrument Serif) pipeline: do not run it, it would overwrite `lib/brand-paths.ts` with the old logo.
