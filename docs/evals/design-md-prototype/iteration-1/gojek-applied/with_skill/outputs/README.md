# Gojek — One Green, Two Registers

An unofficial design-system and prototype package for **Gojek**, treating `gojek.com` (consumer super-app) and `gojek.io` (corporate/technology) as one company with one brand core and two documented **registers**. The work is a study in brand evidence, not an official Gojek deliverable.

> **Unofficial concept.** Not affiliated with, endorsed by, or produced by Gojek or PT GoTo Gojek Tokopedia Tbk. No logo, photograph, testimonial, or proprietary font binary is copied or redistributed.

## The idea

**Design thesis:** For people moving through an Indonesian day and for the teams building the systems behind it, Gojek should feel like one continuous green route — warm and human at the surface, precise and legible underneath.

The organising visual idea is the **route line**. The prototype's central interaction shows the same sample day from two sides:

- **Consumer register** — Bahasa Indonesia, larger display type, brand green as a field, 24px editorial cards, 200–320ms motion. It follows a rider, a meal, a package, and a payment.
- **Corporate / technology register** — English, denser 14–36px type, ink surfaces, green as a signal, 16px data cards, 120–200ms functional motion. It explains the request, match, handoff, and settlement behind the same moments.

Both registers share one token core: `colors.primary` #00880D, the Maison Neue family, a 4px grid, the radius family (pill actions, 16–24px containers), and the focus treatment. There is no second palette, typeface, logo, or primary.

## File map

| File | What it is |
| --- | --- |
| `DESIGN.md` | Official-format design system: YAML tokens + canonical prose. 58 color tokens, including explicit dark-role extensions, 15 typography tokens, 8 radii, 12 spacing tokens, 53 components. |
| `index.html` | Standalone marketing/prototype page. Consumer register in Indonesian; corporate/technology register in English. Working theme toggle, mobile nav, day/register switcher, service-to-moment links, native FAQ. |
| `design-md.html` | Living specification: principles, register matrix, all 58 color roles with measured contrast notes for key pairs, dark role extensions, type specimens, spacing, elevation, radii, live core components, motion demos, do/don't pairs, verbatim DESIGN.md excerpt, evidence footer. |
| `README.md` | This handoff note. |
| `sources.md` | Source table, GitHub table, conflicts, assumptions, rights, rejected sources. |
| `evidence/lint.json` | Official `@google/design.md` lint output. |
| `evidence/export.css` | Official `css-tailwind` export. |
| `evidence/static-check.json` | Bundled artifact-validator output. |
| `evidence/browser-check.md` | 320/390/768/1024/1440 × light/dark matrix, console/overflow/interaction notes, Lighthouse status. |
| `evidence/browser-matrix.json` | Machine-readable output of the 20-cell matrix (320/390/768/1024/1440 × light/dark). |
| `../screenshots/` | Full-page screenshots for every tested page/width/theme cell (stored next to `outputs/` in this archive). |
| `evidence/lighthouse-index.json` | Lighthouse accessibility report for `index.html` (100/100). |
| `evidence/lighthouse-design-md.json` | Lighthouse accessibility report for `design-md.html` (100/100). |
| `evidence/source-css-extract.txt` | Attributed excerpt of current gojek.com CSS custom properties, used for provenance. |

Approximate sizes: `index.html` ~106 KB, `design-md.html` ~127 KB, `DESIGN.md` ~36 KB, `sources.md` ~16 KB, `README.md` ~10 KB. Evidence JSON and reports add about 0.85 MB; the 20 full-page screenshots add about 14.5 MB.

## How to open

1. Double-click `index.html` or `design-md.html` from this folder. Both work from `file://` with no server or build step.
2. Use the header theme button to switch light/dark. The preference is stored with `localStorage` when available; if storage is blocked, the toggle still works for the session.
3. On mobile/narrow windows, use the menu button (index) or the section-nav button (design-md).
4. On `index.html`, choose a moment in “Satu hari, dua cara melihatnya” and switch between “Dari sisi pengguna” and “Dari sisi sistem.” The service cards jump back to the matching moment.
5. On `design-md.html`, use the sidebar or the mobile section nav; copy buttons announce success or fallback failure through a live region.

The two pages cross-link: `index.html` → `design-md.html` and `design-md.html` → `index.html`.

## Validation

Run from this directory.

| Check | Command | Result |
| --- | --- | --- |
| Official lint | `npx -p @google/design.md designmd lint DESIGN.md` | **0 errors, 0 warnings**, 1 info (token summary) |
| Lint JSON | `npx -p @google/design.md designmd lint --format json DESIGN.md` | Saved to `evidence/lint.json`; summary 0/0 |
| CSS export | `npx -p @google/design.md designmd export --format css-tailwind DESIGN.md` | Saved to `evidence/export.css`; export succeeded |
| Static artifact check | `node <skill-dir>/scripts/validate-artifacts.mjs . --strict` | **PASS**: 0 errors, 0 warnings, 0 info; JSON in `evidence/static-check.json` |
| Browser matrix | Playwright 1.65.1 + installed Chrome 157, `file://` | 20/20 cells: 320/390/768/1024/1440 × light/dark; 0 console/page errors, 0 horizontal overflow |
| Lighthouse accessibility | Headless Chrome, local server | **100/100** on both pages; dark theme is covered by the 20-cell browser matrix. JSON in `evidence/` |

**Lint warnings:** none. The only lint finding is the informational token summary. There are no documented exceptions to triage.

**Static-check warnings:** none. The strict run reports 0 errors, 0 warnings, 0 info. The validator was run after the final HTML changes; its own evidence file is part of the report, so it was bootstrapped and rerun to avoid a self-reference loop.

**Browser checks:** the matrix lives in `evidence/`; the screenshots live in `../screenshots/`. If a cell was not run, it is marked “not run” with the reason; no cell is silently treated as a pass.

## Fonts and fallback strategy

- **Official families:** Maison Neue and Maison Neue Extended (display), with Fira Code for code in the current web UI.
- **License status:** Maison Neue is proprietary. No font files are downloaded, bundled, or redistributed.
- **HTML fallback:** `"Maison Neue Extended", "Helvetica Neue", Helvetica, Arial, sans-serif` for display; `"Maison Neue", "Helvetica Neue", Helvetica, Arial, sans-serif` for text; `"Fira Code", ui-monospace, SFMono-Regular, Consolas, monospace` for code.
- **Offline behaviour:** no external font request. The fallback is deliberate and visibly labelled in `design-md.html`.
- **Trade-off:** the fallback is not a metric clone of Maison Neue. Layouts use generous spacing and `clamp()` so the substitution does not cause overflow.

## Rights and content safety

- No official logo, wordmark SVG, product logo, screenshot, photography, or illustration is copied. The wordmark is typographic; the small route mark is original geometry.
- No testimonials, customer names, awards, press quotes, or invented metrics. The sample day and system flow are labelled as fictional/illustrative.
- Official service names (GoRide, GoCar, GoFood, GoSend, GoPay, GoMart, GoCorp) are used for context only; that is not a claim of partnership.
- Gojek and the Gojek name are trademarks of their owner. The package is an unofficial concept.
- See `sources.md` for the full rights table, retrieval dates, conflicts, assumptions, and rejected sources.

## Assumptions and known limitations

- **Concept, not official.** The package studies public first-party evidence; it is not a Gojek brand manual and does not imply endorsement.
- **Language split.** Consumer copy is Indonesian; corporate/technology copy is English. This is a register choice, not a claim that Gojek uses only one language in each context.
- **Web CSS as product evidence.** The current `gojek.com` inline CSS is treated as representative of the consumer **web** UI, not the native app.
- **Dark theme is an original extension.** Asphalt documents light/dark themes, but the published images did not expose usable dark hex values. The dark surfaces, borders, and semantic tints are derived and labelled in `DESIGN.md`; they are not claimed as official Gojek dark tokens.
- **Motion timings are partly a system decision.** The easing curves are official [S14]; the showcase's 800ms comparison and the 120/200/320ms interface timings are this concept's scaling.
- **Corporate evidence gap.** `gojek.io` returned **HTTP 429** on 2026-11-16 and was not bypassed. The corporate register uses GoCorp, the official products page, Asphalt, and gojek.design instead of invented `gojek.io` copy. The Gojek Tech blog returned a private Ghost portal; no blog content was used.
- **Not verified:** native iOS/Android rendering, manual screen-reader sessions, proprietary Maison Neue rendering, internal Gojek component code, and current internal architecture. The system view in the prototype is explicitly illustrative.
- **No Gojek design-system repository found.** The official GitHub organization search surfaced engineering libraries, not an Asphalt code repository. No third-party clone was used as brand truth.

## Independent review

An independent judge report is stored at `evidence/judge/judge-report.md`, with a copy at `../judge-report.md` in this archive. This README does not repeat the score, so the report stays separable from the artifact packet. The builder has not fabricated a judge verdict. The judge copy exists for link integrity and must be omitted when constructing a future blind judge packet.

## What to inspect first

1. `index.html` — the day/register switcher is the main idea; test it with keyboard only.
2. `design-md.html#color` — the brand-green vs product-green distinction and measured ratios.
3. `design-md.html#components` — live states, tabs, toast, and focus ring.
4. `DESIGN.md` — the token core and register prose.
5. `sources.md` — the 429, the GitHub table, the conflicts, and the rights notes.
