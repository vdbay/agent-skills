# Independent judge rubric — DESIGN.md + standalone prototypes

Use this rubric to review a delivered design-system package. The judge receives only:

1. the original task/brief and acceptance criteria,
2. the artifact folder (DESIGN.md, both HTML files, README, sources, evidence),
3. this rubric.

The judge must not receive the author's conversation, the skill's evaluation labels, previous scores, or which variant is "the assisted run". If any of that leaks, the review is contaminated and the score is invalid.

Score from evidence you can inspect. A claim in the README is not evidence unless the artifact or a reproducible check supports it. Distinguish **not present** from **not verified**.

## Hard pass

- **PASS:** 85–100, no category below 60% of its available points, zero critical fails.
- **REVISE:** 70–84, or a category below 60%, with no critical fail.
- **FAIL:** below 70, or any critical fail. A critical fail caps the total at 60 and overrides a high raw score.

A package that looks beautiful but cannot prove its sources, spec compliance, or accessibility does not pass.

## Scorecard (100 points)

| # | Category | Points | What earns points |
| --- | --- | ---: | --- |
| 1 | Research provenance and source discipline | 15 | Official sources first; traceable values; retrieval dates; GitHub repo/stars/license/use; conflicts resolved; third-party clearly supporting; assumptions labeled. |
| 2 | DESIGN.md spec compliance | 15 | Valid frontmatter; canonical sections in order; no duplicate keys/headings; resolvable refs; valid token types; `primary` and typography present; official lint 0 errors; warnings triaged. |
| 3 | Design-system craft and coherence | 15 | One clear thesis; palette/roles separated; type scale and spacing rhythm; shape/elevation logic; component states; registers coherent for multi-property; tokens actually drive the UI. |
| 4 | Prototype and marketing quality | 15 | Specific promise; credible narrative or usable flow; distinctive visual idea; real copy; working primary interaction; states; no template filler; conversion/task goal is clear. |
| 5 | Showcase/spec page quality | 10 | Real token values; type/layout/elevation/shape/component/motion coverage; do/don't examples; actual source excerpt; usable navigation; evidence footer. |
| 6 | Accessibility | 10 | WCAG 2.2 AA contrast; keyboard access; visible focus; semantics/landmarks/headings; names/labels; alt text; reduced motion; target sizes; no color-only state. |
| 7 | Responsiveness and runtime robustness | 8 | 320/390/768/1024/1440 layouts; no horizontal overflow; fluid type/grids; mobile nav; light/dark; `file://` operation; zero console/page errors; no dead controls. |
| 8 | Evidence and verification | 7 | Lint JSON, CSS export, static check, browser matrix, optional Lighthouse; screenshots/measurements; failures disclosed; "not run" reasons; README limitations. |
| 9 | Legal and brand safety | 5 | No unlicensed logos/photos/testimonials/font binaries; fallback/stand-in documented; no fake claims; unofficial disclaimer where needed; rights recorded. |

## What to inspect per category

### 1. Research provenance — 15

- At least two Tier-1 sources, one official brand/design-system source, or an explicit concept label.
- Every color/type decision traceable to a source or marked as an assumption.
- `sources.md` has URLs, retrieval dates, what each source supports, and rights notes.
- GitHub entries include repository, stars, license, last push, and exactly what was used. Stars are not treated as authority.
- Conflicts are resolved, not hidden. Third-party sources are supporting, not primary.
- No invented sources, star counts, licenses, or retrieval dates.

**Deduct:** secondary sources presented as official; missing dates; "inspiration" with no support; a palette with no provenance; GitHub stars without license; a conflict silently resolved in the wrong direction.

### 2. DESIGN.md spec compliance — 15

- File starts with `---` frontmatter; tokens parse; no duplicate top-level or nested YAML keys.
- All eight canonical sections present and in order, or omissions documented in `omitted`/prose.
- No duplicate `##` headings.
- `colors.primary` exists; typography exists; spacing/radii/components are defined.
- Every `{reference}` resolves; primitive vs composite references are used correctly.
- Components use valid properties; states are named consistently.
- Official lint: 0 errors. Warnings are listed and justified.
- Official CSS export succeeds and contains the expected custom properties.

**Deduct:** lint errors; unquoted hex; duplicate keys; section order; broken refs; a token table that the HTML ignores; "0 warnings" claimed without evidence.

### 3. Design-system craft — 15

- A one-sentence thesis that explains audience, feeling, and visual idea.
- Brand palette vs semantic roles are distinct; components reference roles.
- Accessible variants exist where brand colors fail contrast, with the original value and ratio documented.
- Type scale has hierarchy and a real fallback stack; weights and line heights are purposeful.
- Spacing/radius/elevation form a system, not arbitrary values.
- Components cover the states the prototype uses; focus/hover/disabled/error are not afterthoughts.
- Multi-property: one token core, explicit registers, deltas in density/accent/imagery/motion, no competing primaries.

**Deduct:** palette swatches with no roles; one type size repeated; arbitrary radii; states missing; separate brands for one company; a "register" that is just a different palette.

### 4. Prototype and marketing quality — 15

- Hero makes one specific promise; the page earns it with product detail or a real flow.
- Copy is specific and truthful; no lorem ipsum; no fake metrics, logos, testimonials, or awards.
- Visual idea is distinctive and tied to the brand evidence, not a generic SaaS layout.
- At least one meaningful interaction works (nav, tabs, filter, calculator, flow step) and is keyboard operable.
- States: empty, loading, success, error, disabled where relevant.
- The primary action is obvious; the page has a clear task or conversion goal.
- Mobile is a designed layout, not a squeezed desktop.

**Deduct:** template hero + three cards; feature names with no outcomes; decorative controls; fake proof; copy that could belong to any company; interaction that only works with a mouse.

### 5. Showcase/spec page quality — 10

- Shows real color tokens with values/roles/contrast notes, not only swatches.
- Typography specimens use the actual scale and fallback.
- Layout, elevation, shapes, components, and motion are covered with live examples.
- Do's and Don'ts are paired and reasoned.
- Source excerpt is the actual DESIGN.md content, escaped and readable.
- Navigation works, active state is clear, copy buttons are usable, and evidence status is honest.
- The page is a tool for a team, not a poster.

**Deduct:** values hardcoded separately from DESIGN.md; missing motion or states; source excerpt paraphrased; no evidence footer; navigation that breaks at 390.

### 6. Accessibility — 10

- Body text ≥4.5:1; large text/UI boundaries/focus indicators ≥3:1.
- All controls keyboard reachable in a logical order; no traps; skip link works.
- Visible `:focus-visible` ring; focus not removed.
- One `h1`, logical heading order, landmarks, `lang`.
- Accessible names for icon buttons; labels for inputs; errors linked with `aria-describedby`/`aria-invalid`.
- Informative images have alt text; decorative images are `alt=""`.
- `prefers-reduced-motion` honored; no autoplay/parallax that cannot be stopped.
- Targets at least 24×24 px, preferably 44×44 for primary touch.
- State is not conveyed by color alone.
- 200% zoom and 320 px reflow do not lose content.

**Deduct:** low contrast; invisible focus; div buttons; unlabeled inputs; color-only errors; motion that ignores the preference; tiny targets; missing alt.

### 7. Responsiveness and runtime robustness — 8

- 320/390/768/1024/1440 tested in light and dark.
- No horizontal overflow at 390; `scrollWidth <= innerWidth + 1`.
- Fluid type/grids; deliberate max-width at 1440; no fixed-width cards.
- Mobile nav works; tables/code blocks do not break the page.
- Both pages open from `file://`; no external app code, `fetch`, module imports, or `@import`.
- Zero console/page errors; no 404s for local assets.
- Theme toggle works and persists when possible; no flash of unreadable theme.
- External fonts degrade to a deliberate fallback.

**Deduct:** overflow; console errors; desktop-only layout; `file://` failure; hotlinked assets; external script; theme toggle that loses state or breaks.

### 8. Evidence and verification — 7

- `evidence/lint.json` shows 0 errors; warnings are explained in README.
- `evidence/export.css` exists and contains token custom properties.
- `evidence/static-check.json` exists and reports no errors.
- `evidence/browser-check.md` records the 320/390/768/1024/1440 × light/dark matrix, console, overflow, `file://`, interactions, and Lighthouse status.
- Screenshots or measurements exist where claimed.
- README states what was not run and why.
- No fabricated pass claims.

**Deduct:** missing evidence; "tested" with no file; stale evidence after edits; a matrix with blank cells; Lighthouse claimed but not run; warnings hidden.

### 9. Legal and brand safety — 5

- No unlicensed logo, photograph, illustration, icon set, testimonial, or font binary.
- Proprietary font named in DESIGN.md, not redistributed; fallback/stand-in documented.
- No fake endorsements, partnerships, awards, certifications, or metrics.
- Unofficial concept has a visible disclaimer; official work has a stated basis.
- Rights and restrictions recorded in `sources.md`.
- No gated/private content scraped or reproduced.

**Deduct:** copied mark; hotlinked brand photo; bundled font; fake "trusted by" logos; implied endorsement; missing rights note.

## Critical fails

Any one of these is an automatic FAIL, caps the total at 60, and must be stated explicitly:

1. **Fabrication:** invented source, URL, star count, license, retrieval date, testimonial, metric, award, certification, or test result.
2. **Unusable core artifact:** missing `DESIGN.md`, `index.html`, or `design-md.html`; file does not open from `file://`; broken build requirement; the page is blank.
3. **DESIGN.md rejected:** invalid frontmatter/schema, duplicate top-level keys or section headings, or official lint errors that are undisclosed.
4. **Broken system:** unresolved token references, or the HTML uses a palette/type system unrelated to DESIGN.md.
5. **Standalone violation:** external app script/stylesheet, runtime `fetch`/module import, or a build step required to view the page.
6. **Primary flow broken:** horizontal overflow at 390 px that hides content, a keyboard trap, or the primary action is unusable by keyboard.
7. **Severe contrast:** body text below 3:1, or primary control/focus indicator below 3:1, in the delivered theme.
8. **Rights violation:** copied logo, photograph, illustration, testimonial, or font binary without documented rights; implied official endorsement.
9. **Placeholder product:** lorem ipsum or unfilled placeholders throughout the primary copy.
10. **Multi-property fragmentation:** multiple competing DESIGN.md systems/primaries for one company when the brief establishes one company, with no documented register model.
11. **Contaminated judge:** judge saw the author's conversation, run labels, previous scores, or a suggested verdict. The review is invalid; re-run blind.

Do not use a critical fail for a minor issue. State the specific file and evidence.

## Required judge output

```markdown
# Artifact review — <project or brief label>

**Verdict:** PASS / REVISE / FAIL
**Score:** <n>/100
**Critical fails:** none / <list with evidence>
**Contamination declaration:** I received only the task, artifacts, and rubric. I did not see the author's conversation, run labels, or previous scores. (Or: state the leak and invalidate the review.)
**Artifacts reviewed:** <paths>
**Checks run:** <commands, browser matrix, Lighthouse, or "not run">

## Scorecard

| Category | Score | Evidence |
| --- | ---: | --- |
| Research provenance | /15 | |
| DESIGN.md spec compliance | /15 | |
| Design-system craft | /15 | |
| Prototype/marketing quality | /15 | |
| Showcase quality | /10 | |
| Accessibility | /10 | |
| Responsiveness/runtime | /8 | |
| Evidence | /7 | |
| Legal/brand safety | /5 | |
| **Total** | **/100** | |

## Critical checks

- [ ] Artifacts open and required files exist
- [ ] Official lint: 0 errors (or disclosed failure)
- [ ] CSS export succeeds
- [ ] Static validator: 0 errors
- [ ] 320/390/768/1024/1440 × light/dark matrix
- [ ] No horizontal overflow at 390
- [ ] No console/page errors
- [ ] Keyboard primary flow
- [ ] Contrast spot checks
- [ ] No unlicensed assets/fonts
- [ ] No fabricated evidence

## What works

- <specific, with file/line or measurement>

## Required fixes

1. <file/section → expected change → why it matters>
2. ...

## Unverified / residual risk

- <what the judge could not check, and why>

## Score rationale

<short paragraph: why this total, what kept it from the next band>
```

## Judge behavior

- Read the files yourself. Do not rely on the README's summary.
- Quote concrete lines, token names, measurements, or file paths for every major claim.
- Run the official lint and static validator if the environment allows. If not, say "not verified" and score evidence accordingly.
- Do not reward length, animation, or decoration by itself.
- Treat a beautiful page with no provenance as a craft success but a system failure.
- Treat a rigorous DESIGN.md with a weak prototype as a spec success but a delivery failure.
- Be willing to pass with non-blocking suggestions. Perfection is not the bar; reliable, honest usefulness is.
- Never edit the artifacts. Report only.
- If the package includes an A/B comparison, score each artifact independently before comparing; do not assume the newer or more polished one is better.
