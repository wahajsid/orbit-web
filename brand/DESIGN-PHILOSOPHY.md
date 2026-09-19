# Hysaab design philosophy

Version 5 · 19 September 2026 · Website first

## Decision and scope

Use the approved cream editorial direction as the everyday website system. Use the approved bold sage direction for moments of completion and relief. Retain the current serif wordmark and blush pen-tick exactly.

Wave 1 covers the Hysaab marketing website and every public page, including existing Arabic counterparts, guide articles and calculators. Wave 2 covers the app and starts only when the owner explicitly asks. This document changes the website design direction; it does not authorise or announce an app redesign or a production deployment.

This is the controlling website design philosophy. It supersedes conflicting website presentation rules in the earlier brand guide and inner-page brief. Existing app rules remain in force until Wave 2. Verified product behaviour, legal content, calculator logic, published commercial terms and the logo construction rules remain authoritative.

## The idea

Make the relief of well-kept books visible.

The visitor should see what needs attention, understand what Hysaab does about it, and find the evidence without hunting. An expressive headline earns attention. A precise explanation earns trust. A useful action moves the conversation forward.

The website should feel like a well-written financial publication with a working product inside it: considered typography, generous space, clear numbers, real screens and conversations that lead somewhere.

## Two complementary treatments

### Everyday: the editorial direction

Cream ground, navy text, Instrument Serif display headlines, Archivo body and interface copy, restrained peach highlights. Clear rules and deliberate whitespace separate sections. This is the default for reading, learning, comparing, using tools and making an enquiry.

Use a strong display number only when the surrounding content gives it meaning. Long articles and technical pages need readable structure more than visual theatre.

### The moment: the bold direction

Navy framing, a sage completion surface, oversized Archivo numerals and a short verdict. Use this selectively for a completed workflow or a decisive outcome. Let calmer sections before and after give it impact.

The signature completion treatment is:

> 0 loose ends
>
> A rare occasion when zero is the number you want.
>
> ALL SQUARE.

The number must have a visible scope, such as “September close checklist.” A sample screen must say “Illustrative completed close · Sample data.” It must never imply that every customer has zero errors, no financial obligations, or guaranteed compliance. An empty account, missing data or unfinished setup is not a successful zero.

Use the line once as a memorable homepage moment. Other pages can express the same relief in copy specific to their job.

## Colour system

| Role | Colour | Use |
|---|---|---|
| Reading ground | Cream `#FAF6EE` | Default page and article ground |
| Authority and structure | Navy `#122940` | Text, primary actions, rules, navigation and occasional dark sections |
| Warmth and emphasis | Blush `#E4A1A0` | Selected number panels, editorial emphasis, enquiry sections; navy text on blush |
| Completion | Sage `#547767` | Scoped completion scenes, with cream text and an explicit completion label |
| Secondary copy | Sub-navy `#46566A` | Supporting text on cream |
| Dividers | Hairline `#D9D2C6` | Quiet separation on light backgrounds |

Consolidate existing peach and cream variants into shared website tokens during implementation. Preserve existing semantic warning/error colours in product demonstrations and calculators. Blush attracts attention; it does not itself mean overdue, failed or approved. Always name the state in words.

Navy buttons on cream are the default. A blush button with navy text is appropriate on navy. This replaces the old blanket website rule that blush can never be a button. The logo tail remains its defined brand colour, independent of page status.

Check each actual text/background pair for WCAG AA; do not reuse old contrast claims without measurement. No pale blush body text on cream.

## Typography and layout

- Keep the approved outlined serif logo assets and Wordmark component. Do not approximate the logo using typed text or redraw the pen-tick. The header and footer may animate the existing y and blush tail together with a brief, subtle pen-tick flourish on entering view and on hover or keyboard focus. Keep the other letters still, return to the exact approved outline, avoid a perpetual loop, and respect reduced motion and the page motion pause.
- Use Instrument Serif for selected editorial display headlines. Use Archivo for body, controls, short verdicts and bold display numbers.
- Use exactly two Latin font families: Instrument Serif for editorial display headlines and Archivo for everything else, including labels, timestamps, captions, financial figures and controls. Use Archivo with tabular numerals for aligned data. No Courier, typewriter or separate monospace font. Hero numerals may use Archivo 800–900. Arabic retains its necessary language-specific type support.
- Use one dominant headline or number per section. A number has a visible label, unit and context where applicable.
- Aim for body copy around 16–18 px, comfortable line spacing and reading widths around 60–70 characters. Reflow headlines naturally on mobile; do not shrink an entire desktop composition.
- Keep surfaces flat, corners square or nearly square, and dividers purposeful. Avoid decorative KPI grids, unnecessary containers, glows and gradient decoration.
- Keep navigation, sign-in, language switching and primary enquiries easy to find. Give header anchors sufficient scroll offset.
- Arabic uses the existing Arabic typography and RTL support, with equivalent hierarchy and carefully written local-language copy. Do not force Latin serif styling onto Arabic text.

## Copy: a specific observation, well said

Write for the owner who has another business task waiting. Start with the concrete nuisance, explain the benefit, and show the working. A little wit belongs in the headline; precision belongs in the explanation and action.

Approved examples:

- Completed close: “A rare occasion when zero is the number you want.”
- Incomplete close: “Your month is over. Your bookkeeping nearly is.” Follow with the actual remaining checks.
- Collections: “You didn’t go into business to send ‘just checking in’.” Follow with the actual reminder workflow and approval rules.
- Evidence action: “Show me the proof.” The destination must show the supporting detail.
- Close record action: “Open September’s close record.” Use only inside the illustrative product scene or a real corresponding workflow.

Use “FIX THESE,” “CHASE IT” and “ALL SQUARE” sparingly inside relevant scenes. They are not universal section titles or substitutes for descriptive controls. Marketing enquiries remain “Book a walkthrough” or another clearly described enquiry action.

Avoid generic AI language, invented urgency, unsupported savings, claims of flawless accounting, and repeating the same clever headline across every page. Explain automation, review, overrides and limitations accurately. A rhetorical flourish must not imply capabilities the product cannot demonstrate.

## Preserve the scrollers and five ways Hysaab helps

These are required features, not optional decoration. Restyle them in the new system while keeping their content, behaviour and usefulness.

### Scrollers and motion

- Preserve the homepage “Live from the agents” scrolling timeline, its nine event rows and illustrative-data disclosure. The current homepage uses the `hy-ticker-*` presentation; do not mistakenly replace it with the separate legacy AgentFeed component.
- Preserve the five-beat automatic replay and its manual controls, including Pause replay, click-to-take-control and product-area tabs.
- Preserve in-page section navigation, smooth anchor movement where appropriate, and scrollable full-size captures.
- Inventory every additional ticker, horizontal scroller and active scrolling demonstration on public pages before changing shared CSS. Preserve its content and intended interaction.
- Motion should remain readable, pauseable and keyboard-accessible. Preserve reduced-motion behaviour, provide a static readable equivalent, and avoid duplicated announcements from looping content. Essential information must not depend on seeing one animation cycle.
- Keep mobile and RTL behaviour, touch access and reading order. Avoid new scroll hijacking or long compulsory pinned sections.

### The five ways: retain the complete proof sequence

The live website currently communicates this in two connected forms. Keep both.

| Way Hysaab helps | Real workspace proof currently on the site |
|---|---|
| 1. Send it in. | Intake from WhatsApp, email and bank feed |
| 2. Coded and checked on arrival. | Proposed coding, confidence, tax checks and duplicate holds |
| 3. Expect a second opinion. | A decision queue that questions missing or inconsistent information |
| 4. Make the call. Keep the why. | Journal commentary, decisions, supporting documents and reversals |
| 5. See where you stand. | Position tiles and reporting context |

Keep the companion five-moment narrative: invoice received → read/checked/coded/posted → human exception → approvals and period lock → explained report. These are five stages of the same demonstration, not five replacement marketing cards.

Retain the genuine workspace captures, factual captions, sample-data labels, full-size view and keyboard operation. Do not paint the future app design over real screenshots during Wave 1. Any new completion scene is an explicitly illustrated concept beside the existing evidence.

## Homepage composition

1. Open with the cream editorial system, new logo and a clear explanation of the accounting/reporting product. Retain an accessible route to the WhatsApp-first explanation and walkthrough enquiry.
2. Keep the current section navigation and scrolling agent-work evidence.
3. Keep the three-step “How it works” explanation.
4. Keep the five-moment interactive story and all five real-workspace proofs together and prominent.
5. Introduce the bold zero / ALL SQUARE scene as the payoff to a completed close, with sample-data and scope labels. Do not make an unqualified zero the entire explanation of the business.
6. Retain human control, ways to work, team, product family and enquiry sections. Use navy and peach blocks to mark meaningful transitions.
7. Retain footer attribution, legal links, contact, language switching and sign-in.

## Wave 1: every website page

| Page family | Application of the philosophy |
|---|---|
| Home | Full editorial-to-bold rhythm, preserved scrollers, five ways and zero payoff |
| Product and accounting | Readable capability story, real screens and scoped workflow outcomes |
| How it works | Five stages and human decisions remain easy to follow; replay is retained |
| Pricing and FAQ | Clear comparison, exact published prices, direct answers; no decorative outcome scores |
| Integrations and compliance | Compatibility, controls and evidence first; no invented certifications or compliance guarantees |
| Invoice, firms, audit and hire | Shared visual identity with copy specific to each product and honest availability labels |
| Guides index and each guide | Strong editorial hierarchy, readable prose, useful references and intact metadata |
| Tools index and each calculator | Large labelled outputs, legible inputs, formulas and assumptions preserved; no changes to calculation behaviour as part of styling |
| About and contact | People, credibility and a working enquiry path |
| Privacy and terms | Quiet, accessible reading; legal meaning and links unchanged |
| Existing Arabic pages | Equivalent presentation, functionality, metadata and RTL behaviour |
| Auxiliary routes | Check `/newpage`, redirects, aliases, not-found and error states for public exposure and appropriate consistency; do not promote internal prototypes or remove routes without checking their purpose |

Apply the system through the shared website shell and components, then review each page family and every individual route. A homepage-only refresh is not completion of Wave 1. Separate linked applications and external product sites are not included in this website wave.

## Implementation order and completion criteria

1. Record the current routes, screenshots and behaviours before editing. Check the live page as well as the local source.
2. Establish shared website tokens, typography, logo usage and components; preserve the current app.
3. Apply the homepage composition, explicitly protecting scrolling and five-way demonstration behaviour.
4. Roll out across all public page families and existing translations.
5. Check responsive layouts, contrast, focus, keyboard navigation, reduced motion and RTL. Verify ticker content, replay/pause/manual controls, all five captures, full-size views, anchors, enquiry behaviour and calculator results.
6. Preserve routes, canonical URLs, language alternates, metadata, structured data, search-relevant headings and useful internal links. Structured data must continue to match visible copy.
7. Present a reviewable website preview and a route-by-route completion list. Treat production deployment as a separate action; do not conflate a revised philosophy with a shipped website.

## Review basis

Reviewed the live homepage and product-page presentation at https://hysaab.ai/ and https://hysaab.ai/product on 19 September 2026. The live homepage includes its scrolling agent feed, five-beat interactive replay, five genuine workspace captures, controls, team, product family and enquiry form. Inspected the local site route inventory, homepage source, shared styling, existing brand guide and inner-page brief. This is not a claim that every live route has already passed a visual or functional audit.

Implementation references: `components/Wordmark.tsx`, `public/brand/`, `app/hysaab-home.css`, `components/home/PageShell.tsx`, `components/hysaab/Demo.tsx`, `components/home/Capture.tsx`, `lib/home-moments.ts`, and the English and Arabic route trees. Check source imports before editing, because current live behaviour takes precedence over retired component names.

## Wave 2: held for the owner

No application routes, app themes, financial workflows, permissions or app behaviour change under this brief. The owner will explicitly initiate the app phase. The two approved concepts remain design references for that later conversation.
