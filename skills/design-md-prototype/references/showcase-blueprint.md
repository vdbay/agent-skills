# Showcase blueprint — two standalone deliverables

Build two HTML files from one design system. `index.html` sells or demonstrates the product. `design-md.html` proves the system and documents its rules. Both must look like the same company made them, and both must survive `file://`.

## 1. Choose the index mode

Pick one from the brief:

| Mode | When | Core requirement |
| --- | --- | --- |
| Marketing site | The goal is positioning, lead capture, launch, or explainer | A clear promise, a credible proof path, and one conversion action |
| Product prototype | The goal is to show an app, dashboard, workflow, or service | A real task flow with working controls and states |
| Hybrid | A product launch needs both story and demonstration | Marketing narrative above, interactive product surface below; do not let either become decorative |

A prototype is not a screenshot gallery. If the page claims a workflow works, at least one meaningful step must actually work in the browser.

## 2. `index.html` architecture

Use the sections that serve the argument; do not include all of them mechanically.

### Marketing spine

1. **Skip link** — first focusable element.
2. **Header** — wordmark/placeholder mark, primary nav, theme toggle, primary CTA. Mobile menu below 768 px.
3. **Hero** — one specific promise, one supporting sentence, primary and secondary actions, one visual that demonstrates the product or brand idea. Avoid a generic gradient blob.
4. **Proof or product detail** — a real interface fragment, diagram, or before/after. If using a screenshot, it must be licensed; otherwise build a simplified UI with HTML/CSS.
5. **Capabilities** — three to five concrete capabilities, each with an outcome, not a feature name alone.
6. **Use case / segment** — show the product in a real situation. If multi-property, label the register.
7. **How it works** — three to four steps with a clear sequence.
8. **Objection handling** — FAQ, comparison, or constraints. Answer a real objection; do not stack filler.
9. **Final CTA** — repeat the action with a reason to act now. No fake countdown.
10. **Footer** — company descriptor, links, legal/disclaimer, link to `design-md.html`.

### Product prototype spine

1. **App shell** — header, primary navigation, context switcher, account/status area.
2. **Task surface** — the main object (record, project, order, case, schedule) with realistic but non-confidential data.
3. **Controls** — filters, search, sort, tabs, or a form. They must work.
4. **States** — empty, loading, success, error, disabled, and selected where relevant. You can expose states through a small state switcher for demonstration.
5. **Detail panel** — the selected item or next action.
6. **Feedback** — inline validation, toast, or status message that is announced to assistive technology.
7. **Footer or help** — link to the design system, keyboard help, disclaimer.

If the prototype uses sample data, label it "sample data" once, visibly. Do not present invented customer names or metrics as real.

### Registers in the index

For a multi-property company, demonstrate at least two registers:

- Label sections with the register name and audience, e.g. "For operations teams" / "For customers".
- Or use a segmented control that switches a register class on a wrapper and changes density/accent/type expression without reloading.
- Keep the same core tokens. The register switch may change a CSS class that maps to context tokens; it must not swap to an unrelated palette.
- Announce the change with `aria-live="polite"` if content changes.

## 3. `design-md.html` architecture

This is a living spec, not a PDF-style brand book. Use a two-column layout on desktop: sticky in-page nav plus content. Collapse to a top nav or disclosure on mobile.

Required sections:

1. **Hero / system identity** — name, one-sentence thesis, version/date, evidence status. Link to `index.html`.
2. **Principles** — three to five design principles with a concrete consequence for each. "Be bold" is not a principle; "use one accent per viewport and reserve it for the primary action" is.
3. **Registers** — only if multi-property. Table of audience, job, expression, token deltas.
4. **Color** — token grid with swatch, name, value, role, contrast notes. Show light/dark pairs. Include a "not for small text" warning where relevant.
5. **Typography** — specimens for every token, actual family stack, size/weight/line-height/tracking, responsive behavior, fallback note.
6. **Layout & spacing** — spacing scale, content width, grid, density, breakpoints. Show the scale visually, not only as numbers.
7. **Elevation & depth** — shadow/border/tonal strategy, layer examples, dark-mode behavior.
8. **Shapes** — radii, border weights, icon geometry, corner rules, do/don't examples.
9. **Components** — live examples with states: button variants, input, select, card, badge, navigation, tabs, dialog/toast if used. Each example uses the real CSS classes/tokens.
10. **Motion** — durations, easing, what moves, what does not, reduced-motion behavior. If motion is intentionally absent, say so.
11. **Do's and Don'ts** — paired examples with the reason. At least four pairs.
12. **Source excerpt** — actual DESIGN.md frontmatter plus one representative section, escaped in `<pre><code>`. Add a copy button; do not paraphrase the excerpt.
13. **Provenance / evidence** — lint status, warnings, date, links to `sources.md`, `index.html`, and the evidence folder. If something was not run, say so.

The page must not claim "0 warnings" unless `evidence/lint.json` proves it. "Lint: 0 errors, 2 documented warnings" is honest and credible.

## 4. Token wiring

Define CSS custom properties once in each file from the DESIGN.md values. Keep names aligned with the token paths.

```css
:root {
  color-scheme: light;
  --color-surface: <surface value>;
  --color-on-surface: <on-surface value>;
  --color-primary: <primary value>;
  --color-on-primary: <on-primary value>;
  --color-border: <border value>;
  --color-focus: <focus value>;
  --radius-md: <radius value>;
  --space-md: <spacing value>;
  --font-body: <official family>, <fallback stack>;
  --duration-fast: 120ms;
  --ease-standard: cubic-bezier(.2, 0, 0, 1);
}
```

Rules:

- Components use semantic variables, not raw hex.
- Dark mode overrides semantic variables under `[data-theme="dark"]` and/or `@media (prefers-color-scheme: dark)`. If both exist, the explicit toggle must win.
- Do not define a second palette in the HTML that is absent from DESIGN.md. If the page needs a tint, derive it with `color-mix()` and document it, or add a token.
- The showcase may display raw token values in code samples; the UI itself should use variables.
- Test the CSS export against the page's variables. The official export is evidence that the tokens are machine-readable, not a substitute for wiring.

Theme toggle pattern:

```html
<button type="button" id="theme-toggle" aria-pressed="false" aria-label="Switch to dark theme">
  <span aria-hidden="true">◐</span>
</button>
```

```js
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const stored = localStorage.getItem('theme');
if (stored) root.dataset.theme = stored;
function sync() {
  const dark = root.dataset.theme === 'dark';
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}
toggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', root.dataset.theme);
  sync();
});
sync();
```

`localStorage` on `file://` is origin-dependent and can throw in privacy modes. Wrap reads/writes in `try/catch`; the page must still work without persistence.

## 5. Interaction contract

Every interactive element must work with keyboard and pointer:

- **Mobile nav:** button with `aria-expanded`, `aria-controls`; Escape closes; focus returns to the trigger.
- **Theme toggle:** `aria-pressed`, visible label/icon, persists when possible, no flash of wrong theme on first paint if avoidable.
- **Tabs / segmented control:** roving tabindex or arrow-key support; `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`.
- **Accordion / disclosure:** native `<details>` is preferred; if custom, `aria-expanded` and `aria-controls`.
- **Copy token buttons:** copy with `navigator.clipboard.writeText`; on failure, select the text or show a message; announce success via `aria-live`.
- **Filters/search:** update results without reload; show an empty state; keep focus stable.
- **Forms:** visible labels, inline error text linked with `aria-describedby`, `aria-invalid`, and a summary on submit.
- **Dialogs:** focus trap or native `<dialog>`; Escape closes; focus returns.
- **Links:** no `href="#"`; every internal link resolves; external links use `rel="noopener noreferrer"` with `target="_blank"` if needed.

No dead controls. If a control is decorative in a prototype, make it a non-interactive element or label it "preview".

## 6. Accessibility contract

Target WCAG 2.2 AA.

- **Contrast:** 4.5:1 for normal text, 3:1 for large text and UI component boundaries/focus indicators. Test the actual composited colors, including overlays.
- **Semantics:** one `h1` per page, logical heading order, `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` with accessible names where useful.
- **Keyboard:** all controls reachable in a logical order; no keyboard trap; skip link works.
- **Focus:** visible `:focus-visible` ring with at least 3:1 contrast against adjacent colors; do not remove outlines.
- **Names:** every control has an accessible name; icon-only buttons need `aria-label`; images need meaningful `alt` or `alt=""` if decorative.
- **Motion:** honor `prefers-reduced-motion: reduce`; disable non-essential transforms, parallax, and autoplay.
- **Targets:** at least 24×24 CSS px (WCAG 2.2 minimum), aim for 44×44 for primary touch controls.
- **Status:** dynamic messages use `role="status"` or `aria-live="polite"`; errors use `role="alert"` sparingly.
- **Zoom:** usable at 200% text zoom and 320 px reflow without loss of content.
- **Language:** `<html lang="...">` matches the copy.

Do not use color alone for state. Pair it with text, icon, underline, or shape.

## 7. Responsive contract

Test at 320, 390, 768, 1024, and 1440 px, in both themes.

- **390:** single column, no horizontal scroll, nav collapses, hero type clamps, tables become cards or scroll within a labeled region, tap targets comfortable.
- **768:** two-column where it helps, nav can still collapse or become a compact bar, no cramped three-column grids.
- **1024:** desktop layout begins; sidebar for the spec page; content max-width is deliberate.
- **1440:** the design does not stretch infinitely; use a max-width and generous margins. Avoid tiny text floating in a huge canvas.

Implementation rules:

- Use `clamp()` for display type, but cap it; do not let a 10vw headline become absurd at 1440.
- Prefer `min()`, `max()`, `minmax()`, and `auto-fit` grids over fixed pixel widths.
- Use `overflow-wrap: anywhere` for long tokens/URLs in the spec page.
- Do not use `overflow-x: hidden` on `html`/`body` to hide a layout bug. Fix the child that overflows.
- Test with the browser's device emulation and by resizing the real window; measure `scrollWidth`.
- Check the page at 200% zoom, not only at narrow widths.

## 8. Standalone and `file://` contract

- Inline all CSS and JavaScript. No external app scripts or stylesheets.
- No `fetch`, `XMLHttpRequest`, ES module imports, or JSON data files. They fail or behave inconsistently from `file://`.
- No build step, bundler, framework runtime, or package manager at view time.
- Inline SVG is preferred for marks, icons, and diagrams. Data URIs are acceptable for small images.
- Do not hotlink photography, logos, or icon fonts. Rights and offline behavior both suffer.
- External fonts are the one documented exception:
  - Use a `<link>` to the font host, not `@import`.
  - Include a real fallback stack; the page must remain usable if the font fails.
  - Request `display=swap` from the font host, or set `font-display: swap` in a self-hosted `@font-face`.
  - Record the dependency and the offline behavior in `README.md` and `sources.md`.
  - Never ship a proprietary font binary without a license that permits redistribution.
  - If the brand font is proprietary and unavailable, use a metrically compatible open stand-in or a deliberate fallback; label it in the showcase and README.
- Test by double-clicking both files from the output folder, not only via a local server.
- Relative links between `index.html`, `design-md.html`, `sources.md`, and `README.md` must work from the same folder.

## 9. Content contract

- Write specific, truthful copy from the brief and verified sources.
- No lorem ipsum, `TODO`, `TBD`, "coming soon", or empty sections.
- No invented metrics, customer counts, awards, certifications, testimonials, press logos, or partner logos.
- If proof is unavailable, use a category-level benefit ("designed for teams that…") or omit the proof section.
- If sample data is used in a prototype, label it "sample data" and keep it obviously generic.
- Use the brand's real terminology from official sources; do not invent product names.
- Keep the reading level appropriate to the audience; avoid jargon unless the category uses it.
- The showcase's source excerpt must be the actual DESIGN.md content, not a cleaned-up paraphrase.

## 10. Browser verification recipe

Use the browser tool available to the agent, or Playwright if installed. The check is a matrix, not one screenshot.

For each page (`index.html`, `design-md.html`), width (`390`, `768`, `1024`, `1440`), and theme (`light`, `dark`):

1. Open the `file://` URL.
2. Capture `pageerror` and console `error` events.
3. Assert `document.documentElement.scrollWidth <= window.innerWidth + 1`.
4. Screenshot the full page.
5. Exercise the primary interaction.
6. Check focus visibility and heading order.
7. Record pass/fail and any exception.

Minimal Playwright sketch (optional dependency; do not add it to the deliverable):

```js
import { chromium } from 'playwright';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const pages = ['index.html', 'design-md.html'];
const widths = [320, 390, 768, 1024, 1440];
const themes = ['light', 'dark'];
const browser = await chromium.launch();

for (const file of pages) {
  for (const width of widths) {
    for (const theme of themes) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
      page.on('console', message => {
        if (message.type() === 'error') errors.push(`console: ${message.text()}`);
      });
      await page.goto(pathToFileURL(path.resolve(file)).href);
      await page.evaluate(value => {
        document.documentElement.dataset.theme = value;
      }, theme);
      await page.waitForTimeout(250);
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth - window.innerWidth
      );
      console.log({ file, width, theme, overflow, errors });
      await page.screenshot({ path: `evidence/${file}-${width}-${theme}.png`, fullPage: true });
      await context.close();
    }
  }
}

await browser.close();
```

Adapt the path handling to the environment. Do not claim this ran if Playwright was not available.

Lighthouse accessibility (when Chrome is available):

```bash
npx http-server <out-dir> -p 4173
npx lighthouse http://localhost:4173/index.html --only-categories=accessibility --output=json --output-path=<out-dir>/evidence/lighthouse-index.json --chrome-flags="--headless=new"
```

Record the score and any serious/critical findings. Lighthouse does not replace keyboard and contrast review.

## 11. Common failure modes

| Symptom | Cause | Fix |
| --- | --- | --- |
| Looks like a generic template | No brand thesis; default hero + three cards | Commit to one distinctive layout or interaction from the evidence |
| Beautiful but unreadable | Marketing palette used for body text | Separate brand palette from semantic roles; test pairs |
| Spec page feels like a poster | No real token values, states, or code | Add live components, values, contrast notes, and actual excerpt |
| Mobile horizontal scroll | Fixed widths, large type, tables, absolute art | Fix the child; use fluid grids and wrapping; measure at 390 |
| Dark mode looks muddy | Mechanical inversion | Define dark surfaces, borders, accent behavior, elevation |
| Console errors | Missing assets, module imports, clipboard API on file:// | Inline assets, remove imports, guard APIs |
| Copy buttons fail silently | No fallback/permission handling | Try/catch, select text, announce failure |
| Fonts look wrong offline | Hosted font unavailable, no fallback | Real stack, `font-display: swap`, test offline |
| Judge score is low on evidence | Screenshots but no provenance or matrix | Save lint/export/static/browser evidence and link it |
| Legal risk | Copied logo/photo/testimonial | Remove, replace with a placeholder, document rights |
