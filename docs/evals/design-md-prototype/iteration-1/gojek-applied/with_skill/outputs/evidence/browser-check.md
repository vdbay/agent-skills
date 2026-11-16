# Browser and accessibility checks

**Status:** run. This file records what was executed, not what was hoped for.

**Final post-fix recheck:** after the last accessibility and consistency edits (corporate title scale and weight, hero sizes, alt-surface and control-boundary contrast, explicit dark role tokens, brand-lockup names, landmark wrappers, stable theme-toggle labels, skip-link focus, 900px TOC behavior, breakpoints, tabular figures, source excerpt, 15/15 type specimens, service-card focus, the feature icon on brand green, CTA headline aligned to `brand-display`, and decorative SVG hiding), the complete 20-cell matrix was rerun from `file://` with raw Chrome DevTools Protocol. Result: **20/20 pass**, 0 console/page errors, 0 horizontal overflow, one `<h1>`, no duplicate IDs, and all internal anchors resolve. The service-card jump moves focus to `#panel-title` (`tabindex="-1"`), the skip link focuses `<main id="main">`, the mobile TOC closes at 900px (not only 860px), and the sidebar `sources.md` link computes to `#00680A` on `#FAFAFA` (6.74:1) in light and `#18C22A` on the dark surface. All 20 screenshots were regenerated during the final matrix pass. A subsequent focus-ring and CTA-boundary polish was verified in Chrome after that pass; it does not change page composition. The dark brand-green CTA now uses a 3px ink ring (`#1C1D1D` on `#00AA13`, **5.44:1**) with a white halo (`3.11:1`), not a light-only ring. Lighthouse was rerun on both pages: **100/100**.

## Environment

| Item | Value |
| --- | --- |
| Date | 2026-11-16 |
| OS | Windows (win32) |
| Browser | Google Chrome 157.0.8103.51 (installed stable), launched headless by Playwright |
| Driver | Playwright Core 1.65.1 |
| Node | 24.19.0 |
| Page loading | `file:///<out-dir>/index.html` and `file:///<out-dir>/design-md.html` for the matrix; local HTTP server only for Lighthouse |
| Themes | Explicit light and dark via stored theme + `color-scheme`; system `prefers-color-scheme` also implemented |

## Required matrix

Each cell was loaded from `file://`, with console and page errors captured. “Pass” means: **0 console/page errors, 0 px horizontal overflow, one `<h1>`, no duplicate IDs, and the primary interaction completed** (day/register switch on index; register tabs on the spec page). Mobile navigation was exercised at every collapsed width.

| Page | Width | Light | Dark |
| --- | ---: | --- | --- |
| `index.html` | 320 | Pass — overflow 0, console 0, day/register + mobile nav | Pass — overflow 0, console 0, day/register + mobile nav |
| `index.html` | 390 | Pass — overflow 0, console 0, day/register + mobile nav | Pass — overflow 0, console 0, day/register + mobile nav |
| `index.html` | 768 | Pass — overflow 0, console 0, day/register + mobile nav | Pass — overflow 0, console 0, day/register + mobile nav |
| `index.html` | 1024 | Pass — overflow 0, console 0, day/register | Pass — overflow 0, console 0, day/register |
| `index.html` | 1440 | Pass — overflow 0, console 0, day/register + keyboard sweep | Pass — overflow 0, console 0, day/register + keyboard sweep |
| `design-md.html` | 320 | Pass — overflow 0, console 0, tabs + mobile TOC | Pass — overflow 0, console 0, tabs + mobile TOC |
| `design-md.html` | 390 | Pass — overflow 0, console 0, tabs + mobile TOC | Pass — overflow 0, console 0, tabs + mobile TOC |
| `design-md.html` | 768 | Pass — overflow 0, console 0, tabs + mobile TOC | Pass — overflow 0, console 0, tabs + mobile TOC |
| `design-md.html` | 1024 | Pass — overflow 0, console 0, tabs | Pass — overflow 0, console 0, tabs |
| `design-md.html` | 1440 | Pass — overflow 0, console 0, tabs + keyboard sweep | Pass — overflow 0, console 0, tabs + keyboard sweep |

**Totals:** 20/20 cells passed. 0 console errors, 0 page errors, 0 failed requests, 0 horizontal-overflow findings, 1 `<h1>` and 0 duplicate IDs in every cell. The 320px row is part of the required 320/390/768/1024/1440 matrix. The machine-readable record is `evidence/browser-matrix.json`.

### 200% zoom / reflow proxy

A 720 CSS-px viewport corresponds to a 1440px-wide window at 200% browser zoom. Both pages were loaded at 720px in light and dark with `prefers-reduced-motion: reduce`:

- `index.html`: 0 overflow, 0 console/page errors.
- `design-md.html`: 0 overflow, 0 console/page errors.
- This is a layout proxy, not a literal browser-zoom setting. A literal 200% browser zoom was **not run**. The 320px row covers the narrow-reflow requirement separately.

## Interaction checks

### Theme toggle and persistence

At 390px, both pages were switched from light to dark with the header button:

| Page | `aria-pressed` before → after | Stable label | Stored | After reload |
| --- | --- | --- | --- | --- |
| `index.html` | false → true | “Tema gelap” | `dark` | dark, pressed true |
| `design-md.html` | false → true | “Dark theme” | `dark` | dark, pressed true |

No console errors. `localStorage` is wrapped in `try/catch`; the toggle still works if storage is blocked.

### System preference

With no stored theme, the `data-theme` attribute is absent and the CSS `prefers-color-scheme` path applies. At 390px:

| Page | System scheme | Body background | `aria-pressed` | Label |
| --- | --- | --- | --- | --- |
| `index.html` | light | `rgb(255, 255, 255)` | false | "Tema gelap" |
| `index.html` | dark | `rgb(17, 19, 19)` | true | "Tema gelap" |
| `design-md.html` | light | `rgb(255, 255, 255)` | false | "Dark theme" |
| `design-md.html` | dark | `rgb(17, 19, 19)` | true | "Dark theme" |

0 overflow, 0 console/page errors. The explicit toggle still wins because it sets `data-theme` and the media query is scoped to `:root:not([data-theme="light"])`.

### Index — day and register switch

- Clicking “Dari sisi sistem” changed the panel `lang` from `id` to `en`, changed the panel title, set the system button to `aria-pressed="true"`, and kept the consumer button false.
- Clicking “Dari sisi pengguna” restored the consumer view.
- Clicking the GoFood moment changed the kicker to `12:20 · GoFood` and the title to “Makan siang.”
- Service cards jump to the day section and select the matching moment. The four cards now map one-to-one to the four moments: GoRide, GoFood, GoSend, GoPay.
- Keyboard: focusing the consumer register button and pressing **ArrowRight** selected the system view, moved focus to the system button, and set the panel to `lang="en"`.
- The native FAQ `<details>` opened and closed with the keyboard/pointer.

### Index — mobile navigation

At 320, 390, and 768px in both themes:

- The menu button opened the panel with `aria-expanded="true"` and `hidden` removed.
- **Escape** closed it, set `aria-expanded="false"`, and returned focus to `#menu-toggle`.
- Clicking a nav link closed the panel.

### design-md — tabs, TOC, toast, motion, copy

- **Tabs:** clicking “Corporate” set `aria-selected="true"`, revealed `#panel-corporate`, and hid `#panel-consumer`. Clicking “Consumer” restored it. Keyboard: ArrowRight from the consumer tab moved focus to the corporate tab, selected it, and revealed its panel. Home/End are also implemented.
- **Mobile TOC:** at 320, 390, and 768px in both themes, the button opened the sidebar, `aria-expanded="true"`; Escape closed it, returned focus to `#toc-toggle`, and restored the mobile `display:none` state.
- **Toast:** “Show toast” removed `hidden`, added `is-visible`, and displayed the status text. It auto-dismisses after four seconds with `role="status"`.
- **Motion:** “Play all four” added `is-playing` to all four cards. Each track uses its documented curve; the demo is 800ms and respects reduced motion.
- **Copy:** “Copy excerpt” reported **“DESIGN.md excerpt copied.”** in the live region. The implementation tries `navigator.clipboard.writeText`, then a `document.execCommand('copy')` fallback, then reports a failure; it does not fail silently.
- **Focus:** the first Tab on each page focused the skip link, with computed `outline: solid 3px` and `box-shadow: ... 0 0 0 5px` (the official blue halo).
- **Heading order:** first heading is `<h1>`; no skipped heading levels after the sidebar label was changed from a heading to a paragraph. Index and spec both have one `<h1>`.

## Reduced motion

At 720px, both pages, both themes, with `prefers-reduced-motion: reduce`:

- The hero route line computed to `matrix(1, 0, 0, 1, 0, 0)` immediately (fully drawn, no grow animation).
- Switching the index register did **not** add the `is-swapping` animation class.
- The spec page’s motion demo still receives the `is-playing` class, but the global reduced-motion rule reduces the animation duration to 0.01ms; the dots jump to the end state.
- 0 console/page errors.

## Screenshots

Full-page screenshots exist for every tested cell in `evidence/screenshots/`:

`index-{320,390,768,1024,1440}-{light,dark}.png` and `design-md-{320,390,768,1024,1440}-{light,dark}.png`.

The screenshots are evidence of the rendered state at capture time; they are not a substitute for the measured overflow and console results.

## Lighthouse accessibility

| Page | Score | Report |
| --- | ---: | --- |
| `index.html` | **100 / 100** | `evidence/lighthouse-index.json` |
| `design-md.html` | **100 / 100** | `evidence/lighthouse-design-md.json` |

The final Lighthouse runs were executed after the fixes and saved to the two reports above. Dark theme was checked in the 20-cell browser matrix rather than as a separate Lighthouse run after the final edits. Lighthouse is an automated floor; it does not prove manual screen-reader quality, keyboard comfort, or comprehension.

Run with:

```bash
npx -y http-server . -p 4173 -c-1
npx -y lighthouse http://localhost:4173/index.html --only-categories=accessibility --output=json --output-path=evidence/lighthouse-index.json --chrome-flags="--headless=new --no-sandbox" --quiet
npx -y lighthouse http://localhost:4173/design-md.html --only-categories=accessibility --output=json --output-path=evidence/lighthouse-design-md.json --chrome-flags="--headless=new --no-sandbox" --quiet
```

The first index run scored 96 and flagged three `service-link` elements at 4.44:1 on `#FAFAFA`. The link colour was changed to `#00680A` (the text-safe primary-hover role) and the page re-ran at 100. The first spec run scored 97 and flagged the small brand-green principle numbers, a green-text-on-white "do" example, and evidence links at 4.44:1; those were changed to accessible roles/fields and the page re-ran at 100. An earlier forced-dark audit found the warning alert at **1.3:1** because it inherited dark-theme `on-surface` (#F5F5F2) on the yellow fill; the alert now uses the new `on-warning` #1C1D1D token. The final reports above are the post-fix runs; the final 20-cell matrix covers both themes.

Lighthouse is an automated floor. It does not prove manual screen-reader quality, keyboard comfort, or comprehension.

## Not run

| Check | Why not run |
| --- | --- |
| Manual NVDA / VoiceOver / TalkBack session | No screen reader was available in this headless environment; automated semantics and contrast checks ran instead. |
| Safari and Firefox rendering | The available browser was Chrome 157. No Safari/Firefox binary was available. |
| Native iOS / Android app rendering | This package is a web prototype; no app build or device lab was available. |
| Literal 200% browser zoom setting | A 720 CSS-px viewport was used as the layout proxy; the browser zoom control was not scripted. |
| Real proprietary Maison Neue rendering | The font is proprietary and not installed; the documented fallback stack was rendered. |

No test result in this file is fabricated. If a check is absent, it is listed above rather than implied to pass.
