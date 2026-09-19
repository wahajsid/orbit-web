> **Website direction updated, 19 September 2026:** [Hysaab design philosophy v5](./DESIGN-PHILOSOPHY.md) controls Wave 1 across all public website pages. It establishes the cream editorial default and selective bold completion treatment, and requires preservation of the scrollers and five-way product demonstration. Website rules below apply only where compatible with v5. The approved pen-tick logo specifications remain in force. Existing app rules remain unchanged; the owner will initiate Wave 2 separately.
# Orbit brand guide

_v3 · 15 September 2026 · replaces "Modernist green" (v2). Applies to the app (app.orbitgulf.com), the site (orbitgulf.com), emails, social images and print._

## 1. The pair

Orbit is two colours on cream. Everything else on a screen is a shade of these three or a semantic state.

| Role | Name | Hex | Where it lives |
|---|---|---|---|
| Primary · ink · action | **Deep Navy** | `#122940` | Body text, headings, buttons, the app header, links, chart lines, rules |
| Secondary · warmth | **Muted Blush** | `#E4A1A0` | Tints and hovers (as a 12–16 % wash), highlighted rows, chart bars, the mark's dot, the active tab on navy |
| Ground | **Cream** | `#FAF6EE` | Page background. Cards sit on it in white |

Blush is never a button and never a state. Navy is never a state either. Money-app states keep their own hues (§3) so a green "posted" pill can never be confused with the brand.

## 2. Full token set

**Light (paper), the default workspace**

| Token | Hex / value | Use |
|---|---|---|
| `paper` | `#FAF6EE` | page ground |
| `paper-raised` | `#F1ECE1` | chips, row separators, raised panels |
| `surface` | `#FFFFFF` | cards, inputs |
| `hairline` | `#D9D2C6` | 1 px dividers, input borders |
| `ink` | `#122940` | text, 2 px rules, buttons |
| `ink-sub` | `#46566A` | secondary text |
| `ink-faint` | `#8A94A1` | captions, placeholders |
| `accent` | `#122940` | the one action colour (buttons, links) |
| `accent-deep` | `#0B1B2C` | pressed buttons, small text on paper |
| `blush` | `#E4A1A0` | highlights, chart bars, header accent |
| `blush-tint` | `#F7E4E3` | fills behind highlighted rows, hovers |
| `ok` | `#2F7A4F` · tint `#E4F0E7` | posted, reconciled, verified |
| `warn` | `#9A6A10` · tint `rgba(154,106,16,.10)` | awaiting, proposed, held |
| `bad` | `#A3341C` · tint `#F7EBE8` | failed, critical, blocked |

**Dark (ink) variant, the toggle**

| Token | Hex / value |
|---|---|
| `bg` | `#0D1B2B` |
| `solid` | `#10233A` |
| `border` | `#24374C` |
| `ink` | `#FAF6EE` · sub `#C9D2DD` · faint `#8A94A1` |
| `accent` | `#E4A1A0` (blush carries the action on navy ground) · pressed `#F0B9B8` |
| `accent-tint` | `rgba(228,161,160,.16)` |
| `ok` | `#7DBB93` · `warn` `#D9A23C` · `bad` `#D96C5A` |

**App header (both modes)**: background `#122940`, border `#2B4059`, text `#FAF6EE`, muted `#C9D2DD`, accent `#E4A1A0`.

## 3. Semantic colour is not brand colour

| State | Light | Dark | Rule |
|---|---|---|---|
| ok / posted / verified | `#2F7A4F` | `#7DBB93` | green only ever means "good" |
| warn / awaiting / proposed | `#9A6A10` | `#D9A23C` | amber only ever means "waiting on someone" |
| bad / failed / critical | `#A3341C` | `#D96C5A` | red only ever means "wrong or blocked" |

Never use blush for a warning or navy for "ok". Never use a page's category tint (§6) as a state.

## 4. Contrast

- Navy on cream: 11.9 : 1 (AAA). Cream on navy: same.
- Blush on cream: 2.2 : 1 — **never for text**. Blush is a fill, a bar, a dot, a 2 px rule, or a tint. Text that sits on a blush tint is navy.
- Blush on navy: 5.0 : 1 (AA for 14 px+ normal text). This is why the header's active tab and the dark-mode action can be blush.
- Sub navy `#46566A` on cream: 7.2 : 1. Faint `#8A94A1` on cream: 3.6 : 1 — captions and placeholders only, never body copy.

## 5. Type

- **Archivo** (500 / 600 / 700) for headings, labels, buttons and UI copy. Letter-spacing −1 % on display sizes, +10 % uppercase on 10.5 px labels.
- **Noto Sans Arabic** behind Archivo for Arabic mode (RTL mirrors the layout; ledger vendor names stay Latin).
- **Monospace** (`ui-monospace`, SF Mono, Menlo, Consolas) for every figure, id and document number, with tabular numerals.
- Body 13–14 px on the app, 16–17 px on the site. Line-height 1.5.

## 6. Layout discipline (unchanged from v2)

- Flat and architectural: no gradients, glows, blurs, drop shadows or pill radii. Corner radius is 0 everywhere.
- One hairline (`#D9D2C6`) separates; one 2 px navy rule emphasises.
- The app tints each room faintly by category (payables, receivables, books, compliance, people). Those tints touch only kickers, headings and soft washes — never buttons, never states.
- Empty is honest: an empty panel says why, in navy sub text, with no illustration.

## 7. The wordmark and the mark (v4, 19 September 2026)

**The wordmark** is `hysaab` set in Instrument Serif (regular, lowercase, tracking -0.015 em) with the `y` replaced by a pen tick: an auditor's tick drawn as one tapered stroke, navy above the baseline, with a blush tail below it where the pen leaves the page. `.ai` follows in Instrument Serif italic at 0.27 em, in the ink colour at 55 % opacity (60 % on navy). The letterforms are baked outlines (`lib/brand-paths.ts`, rendered by `components/Wordmark.tsx`), so no webfont is loaded and the mark is identical on every surface.

Colours by ground: on cream or white, ink `#122940`, tail `#E4A1A0`. On navy, ink `#FAF6EE`, tail `#E4A1A0`. On blush, ink `#122940`, tail `#FAF6EE`. Mono: one colour throughout, tail included. The `.ai` suffix may be dropped in product chrome (`suffix={false}`); the tick may not be dropped, straightened or recoloured to a state colour. Minimum wordmark size 14 px em.

**The mark** is the pen tick alone, in a 64-unit box with the tick filling 78 % of it. The favicon and app icon are the mark in cream and blush on a navy tile; avatars use the same at 60 % fill. Minimum size 16 px; clear space equal to a quarter of the box on every side.

Files, all in `public/brand`: `hysaab-lockup-primary.svg`, `-reversed.svg`, `-mono-black.svg`, `-mono-white.svg`, `hysaab-wordmark-primary.svg` (no suffix), `hysaab-mark.svg`, `hysaab-mark-reversed.svg`, `favicon.svg` + `favicon-16/32/48/180/192.png` + `hysaab-favicon-512.png`, `hysaab-app-icon-1024.png`, `hysaab-avatar-navy/blush-1024/400.png`, `hysaab-social-card-1200x630.png/.jpg`, `hysaab-email-header-1152x416.png`, `hysaab-email-signature-960x300.png`, `hysaab-linkedin-banner-1584x396.png/.jpg`, and the lockup PNG/JPG exports. Every one of these is generated by the brand build script (`build.js` + `glyphs.json` from the Instrument Serif OFL files); regenerate rather than hand-edit. `brand/email-header-source.html` is superseded by that build.

The previous Archivo wordmark with pupils in the two `a` counters, the `aa` monogram and the Orbit ring are retired.

## 8. Voice, for the record

Finance in continuous motion. Plain words, active verbs, numbers in tables not prose. A control says exactly what happens; a result says what happened. No exclamation marks, no emoji in product copy.

## 9. Where the tokens are

- App: `lib/orbit/theme.ts` (`THEMES`, `HEADER`), `components/orbit/pageAccent.ts` (room tints), `app/globals.css`, `app/icon.svg`.
- Site: `app/globals.css` (`:root` tokens), `app/advert.css` (advert variant), `lib/og.tsx` (social images), `public/favicon.svg`, `lib/emails.ts`.
- Anything that hard-codes a hex outside these files is a bug; use the token.
