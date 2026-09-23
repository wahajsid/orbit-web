# Hysaab motion system

_v1 · September 2026 · phase 1: the shared system, the homepage and /check._

Motion on hysaab.ai is calm, quick and precise, like a finance product should be. It confirms an action, orders what the eye reads, and then gets out of the way. Never bouncy, never playful, never decorative for its own sake.

Everything lives in two places:

- `app/motion.css`: tokens, keyframes, utilities and the bindings that give the shared kit (buttons, links, nav, forms) its micro-interactions. Loaded last in both root layouts.
- `components/motion/MotionEnhancer.tsx`: one tiny client component, mounted in both root layouts, that handles scroll reveals, count-ups and arrow tagging. No library.

## Rules

1. **Content is visible by default.** Nothing is hidden in the server HTML. Scroll-reveal targets only start hidden after the enhancer has run and added `html.m-ready`, and anything already on screen at that moment is marked `.is-seen` and never hidden. No-JS visitors and crawlers get the full page.
2. **Transform and opacity only.** No layout properties are animated. Colour and border changes on hover and focus use the `quick` clock (paint only). SVG ticks draw with `stroke-dashoffset`.
3. **Reduced motion means none.** Under `prefers-reduced-motion: reduce` the enhancer does not arm reveals, every animation and transition in the system is off, and all states render final and complete.
4. **Run once.** Reveals, count-ups and the step illustration play once per page view. Only the existing tickers loop, and they keep their pause control.
5. **Flat brand.** No blur, glow, gradient or soft shadow. The only shadow is the brand's flat offset block, and in motion it moves as a transform (`.m-lift`).
6. **Hover is for pointers.** Hover effects sit behind `@media (hover: hover) and (pointer: fine)`. Touch gets a press state instead, so nothing sticks after a tap.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--m-dur-stagger` | 40ms | per-item stagger |
| `--m-dur-micro` | 80ms | press, large-item stagger |
| `--m-dur-quick` | 150ms | colour and border states, closes |
| `--m-dur-fast` | 250ms | hover in, menu open, panel swap |
| `--m-dur-medium` | 350ms | hover out: fills and underlines retract |
| `--m-dur-slow` | 400ms | arrow slide round trip |
| `--m-dur-reveal` | 500ms | entrance and scroll reveal |
| `--m-dur-step` | 320ms | one beat of a sequenced illustration |
| `--m-dur-count` | 900ms | count-up numbers |
| `--m-ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | the default for everything that moves |
| `--m-ease-in-out` | `ease-in-out` | progress lines, busy bar |
| `--m-ease-linear` | `linear` | tickers |
| `--m-d-micro` | 4px | error message rise |
| `--m-d-base` | 8px | menu drop, arrow travel |
| `--m-d-reveal` | 12px | entrance and reveal rise |
| `--m-lift` | 2px | button and card lift |
| `--m-press` | 0.98 | pressed button scale |

The scale follows transitions.dev; its bounce curves and blur tokens are deliberately left out. Hover in is faster (`fast`) than hover out (`medium`). Total stagger stays under about 300ms: `stagger` caps at 7 steps, `stagger-lg` at 3.

## Utilities

| You want | Write |
|---|---|
| Hero lines entering on first paint | `className="m-enter"` on the parent (children stagger 80ms); `m-enter-block` on a companion block that follows |
| A block rising in on scroll | `data-reveal=""` |
| Children rising in one after another | `data-reveal="stagger"` (40ms) or `data-reveal="stagger-lg"` (80ms, cards) |
| A number counting up once | `<span data-count="">43</span>`, optional `data-count-from="0"`. Server HTML holds the real figure; numbers already on screen at load are not re-counted |
| A button with fill sweep, lift and press | any `.hw-btn` or `.hw-nav-cta` already has it; `.m-btn` for new buttons, colour via `--m-fill` |
| A sliding arrow | automatic for `↗ → ←` in `<span aria-hidden="true">` inside `.hw-btn`, `.hw-link`, `.hw-textlink`, `.hw-nav-cta`, `.hw-footer-mail`; elsewhere add `m-arrow m-arrow--ne` (or `--e`, `--w`) |
| An underline that draws in | `.m-underline`; already on `.hw-nav a`, `.hw-signin`, `.hw-link--ruled`, `.hw-textlink`. Colour via `--m-line` |
| A card that answers hover | `.m-sweep` (a 2px navy rule draws across the top) for cards that contain a link; `.m-lift` for whole-card links |
| A process playing through | `<ol class="m-steps" data-play="">` of `.m-step` items, see `components/hysaab/CheckRun.tsx` |

## Rolling out to a page

1. Inner pages built from `PageShell` + `PageHero`: add `<MotionPage />` (from `components/motion/MotionPage`) anywhere in the page. The hero then enters with the stagger, and `.hw-heading`, `.hw-cards`, `.hw-plans`, `.hw-rows`, `.hw-index`, `.hw-feature`, `.hw-faq`, `.hw-table-wrap`, `.hw-note`, `.hw-prose`, `.hw-form`, section `.hw-actions` and the closing band reveal on scroll. No other markup changes.
2. Bespoke sections: add `data-reveal` attributes directly, as the homepage does.
3. Real figures on the page: wrap the number in `data-count`. Never count up an invented number.
4. Check at 375px, with reduced motion on, and with JS off.

Buttons, links, the nav, the mobile menu and the enquiry form states are shared components, so they already behave the same on every page.

## Adopted so far

- **Homepage** (`app/(en)/page.tsx`): hero stagger and feed entrance, section reveals, workflow, principles, ways, team and product-family staggers, product-card top-rule sweep, 43 to 0 count-down on the close block with the matching 43 count-up.
- **/check**: rebuilt in round 2 (below): kinetic hero, the sample report assembling, a marquee, a sticky step reveal, a sage verdict, oversized numerals and a giant closing link. Styles in `app/check.css`.
- **Everywhere**: button fill sweep, lift and press; arrow slide; nav, ruled-link and text-link underline sweeps; form focus, validation, busy and success states; mobile menu drop.

## Round 2: louder, still tasteful (owner, 24 September 2026)

The owner asked for motion you notice above the fold, bold use of the palette and less copy. For /check and the homepage this overrides "calm, never playful". Neon, glows, blurs and bounce are still out, and so is anything that costs readability, accessibility or reduced motion.

| You want | Write |
|---|---|
| Headline lines rising out of a mask | `<KineticLines lines={[...]} />` inside the `h1` |
| A blush marker sweeping behind a word | `<Mark at={820}>really</Mark>`; `--m-mark-from` is the word's colour before the sweep |
| A magnetic CTA whose fill rises from the foot | `hw-btn m-cta m-magnetic`; `m-cta--on-navy` or `m-cta--sage` for other grounds |
| Letters that roll to a fresh copy on hover | `<SwapLabel text="Check my books" />` |
| A figure on spinning digit reels | `<DigitRoll value="4.82" delay={650} />`, pure CSS, lands on the real value |
| Words that light up as you scroll | `<ScrollWords text="..." />` |
| A marquee | `<Ticker items={[...]} label="..." />`, pauses on hover, wraps still under reduced motion |
| A sticky step reveal | `data-steps` on the wrapper, `data-step` on each step; the panel reads `data-active`. See `components/check/CheckSteps.tsx` |
| Parallax on product shots | `data-parallax` on the grid of captures |
| A sequence with a replay button | `<button data-replay="element-id">` |

Also new: the logo's pen tick draws itself on load and again on hover or focus, and `html, body` now use `overflow-x: clip` on hysaab pages. `hidden` had made body its own scroll container, so no `position: sticky` ever stuck, including the demo window on the homepage.

Every first-paint sequence is written so that its resting CSS is the finished state. `animation: none` (reduced motion) and no-JS therefore both show the complete page.

### Credits

Ideas and techniques ported to plain CSS and React without their dependencies (no `motion`, no Tailwind):

- **SmoothUI** by Eduardo Calvo, MIT, github.com/educlopez/smoothui: MaskRevealUp (kinetic lines), MagneticButton (radius falloff), NumberFlow (digit reels), ScrollRevealParagraph (scroll-lit words).
- **MicroKit** by henriquegpb, MIT, github.com/henriquegpb/microkit: Magnetic Fill Button (fill from the foot plus pointer pull), Staggered Letter Text Swap.
- **Amicro** by Subhan, MIT, github.com/Subhan-code/Amicro--Micro-transitions-: StickyReveal (sticky step panel).
- **Bencho** (bencho.dev): the licence is not published, so no code was used. The progress-tick idea in the step panel was drawn from scratch.
- **transitions.dev** skills: token scale, stagger and open/close rules.

## Phase 3: every page, English and Arabic (24 September 2026)

- **Every `PageShell` page is in.** The shell renders the motion marker, so there is nothing to add per page. Its `PageHero` title becomes kinetic lines, split at the `<br />`s. The first accent `<span>` short enough not to wrap (16 characters in English, 12 in Arabic) gets the marker sweep. Hero buttons become magnetic fill CTAs on the server, so nothing arrives late and nothing shifts. The kit reveals on scroll, and so do the footer columns.
- **`motion="hero"`** on `PageShell` keeps long reading pages (every guide article, EN and AR) calm: the hero only, no reveals in the text.
- **`CtaBand`**: its title runs as kinetic lines once it scrolls into view (`data-kin-on-view`), and its button is magnetic.
- **Index rows** (`.hw-index`, guides and tools): a blush rule grows at the start edge, the row slides toward the reader and the badge fills. This is the list form of `m-lift`: an offset block under a ruled list looked broken.
- **Sage bands** (`.hw-block--sage`): display-size headings for the outcome moments.
- **Genuine figures**: pricing (EN and AR) runs its plan prices on digit reels when they come into view.
- **Arabic**: lines only, never letters, so letter joining is never broken. `SwapLabel whole` slides the whole label. The marker sweeps from the right, lines tilt in from the right, button fills start at the right, and digit reels stay left to right.
- **Legacy components**: Terminal (`.feedline`, `.term-dot`), the rotating headline (`.hero-rotate`, 350ms fade) and the old agent feed now read the tokens.
