# DESIGN.md — condensed official specification

Upstream format: Google Labs, `google-labs-code/design.md`.
Status at retrieval: **alpha** (npm `@google/design.md` 0.4.0). Verify current docs before freezing commands or schema assumptions.

## Canonical links

| What | URL | Notes |
| --- | --- | --- |
| Repository | <https://github.com/google-labs-code/design.md> | Apache-2.0; approximately 28.9k stars and 2.3k forks at retrieval on 2026-11-16. Stars are a popularity signal, not a correctness signal. |
| Full specification | <https://github.com/google-labs-code/design.md/blob/main/docs/spec.md> | Authoritative prose for tokens, sections, and consumer behavior. |
| README / CLI | <https://github.com/google-labs-code/design.md#readme> | Lint, diff, export, spec commands. |
| npm package | <https://www.npmjs.com/package/@google/design.md> | Published CLI and linter. |
| W3C Design Tokens | <https://www.designtokens.org/> | Inspiration for typed token groups and references; not identical to DESIGN.md. |
| WCAG 2.2 | <https://www.w3.org/TR/WCAG22/> | Contrast and accessibility baseline used by the linter and judge. |

Retrieved 2026-11-16. Re-check the repository and npm version before relying on a command or rule in a long-lived project.

## What the file is

DESIGN.md is a plain-text design system with two layers:

1. **YAML design tokens** — machine-readable values. They may be in frontmatter, in interleaved fenced ` ```yaml ` blocks inside sections, or both. All blocks merge into one token tree. Each top-level schema key may be defined **at most once across the whole document**.
2. **Markdown prose** — human-readable rationale, application guidance, and guardrails, organized into canonical `##` sections.

The tokens are normative. Prose explains why and when to use them. Do not let prose invent values that contradict the tokens.

## Frontmatter shape

```yaml
---
version: <string>          # optional; current documented value: "alpha"
name: <string>             # required; product/system name
description: <string>      # optional
omitted: <string[] | OmittedSection[]>  # optional; intentional omissions
colors:
  <token-name>: <Color>
typography:
  <token-name>: <Typography>
rounded:
  <scale-level>: <Dimension>
spacing:
  <scale-level>: <Dimension | number>
components:
  <component-name>:
    <property>: <string | token reference>
---
```

Use frontmatter for this skill's deliverables. Interleaved blocks are valid but make duplicate-key mistakes easier; if you use them, define each top-level key in exactly one place.

## Token types

| Type | Accepted form | Notes |
| --- | --- | --- |
| Color | Any valid CSS color: hex, named, `rgb()`, `hsl()`, `hwb()`, `oklch()`, `oklab()`, `lch()`, `lab()`, `color-mix(...)` | Hex `#RRGGBB` is the recommended default. Quote hex in YAML. |
| Dimension | Number plus `px`, `em`, or `rem` | Examples of shape: `48px`, `-0.02em`, `1.5rem`. |
| Token reference | `{path.to.token}` | Must resolve. For most groups, point to a primitive, not a group. Composite typography refs are allowed inside `components`. |
| Typography | Object with `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `fontFeature`, `fontVariation` | `fontWeight` is numeric (bare or quoted); `lineHeight` may be a dimension or a unitless multiplier. |
| Spacing | Dimension or unitless number | Unitless numbers can represent counts or ratios. |
| Component | Map of component name to property map | Valid properties: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`. |

Unknown color or typography token names are accepted if the value is valid. Unknown component properties are accepted with a warning. Unknown top-level keys may be custom extensions; the linter warns when a key looks like a typo or contains token-like values.

## Canonical sections and order

Sections use `##` headings. Any section may be omitted, but those present must appear in this order:

1. **Overview** — also accepted as "Brand & Style".
2. **Colors**
3. **Typography**
4. **Layout** — also accepted as "Layout & Spacing".
5. **Elevation & Depth** — also accepted as "Elevation".
6. **Shapes**
7. **Components**
8. **Do's and Don'ts**

An optional `#` document title is allowed and is not parsed as a section. Unknown `##` sections are preserved, not errors. Duplicate section headings are errors. This skill's deliverables include all eight sections; if a section is genuinely inapplicable, write the prose explaining the alternative (for example, a flat design's border-based hierarchy) or declare it in `omitted`.

Place multi-property register information inside `## Overview` as a `### Registers` subsection. Do not create a second `## Colors` or a parallel brand system.

## Component tokens

```yaml
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
```

- States are separate component entries with related names (`-hover`, `-focus`, `-active`, `-disabled`).
- Component values may be literals or references.
- The exact set of components is domain-specific. Cover the components the prototype actually uses; do not list forty decorative variants.
- Every color token need not be used by a component, but unused tokens trigger `orphaned-tokens` warnings. Either reference them from a relevant component or document why they are reserved primitives.

## Omitted sections

The optional `omitted` list suppresses warnings for intentionally absent sections:

```yaml
omitted:
  - spacing
  - section: rounded
    reason: "The brand system is intentionally square; no radius tokens exist."
```

Do not use `omitted` to hide a section you simply forgot.

## Consumer behavior for unknown content

| Scenario | Behavior |
| --- | --- |
| Unknown section heading | Preserve; no error. |
| Unknown color token name | Accept if the value is a valid color. |
| Unknown typography token name | Accept as valid typography. |
| Unknown spacing value | Accept; keep as a string if not a valid dimension. |
| Unknown component property | Accept with a warning. |
| Duplicate section heading | Error; reject the file. |
| Duplicate top-level YAML key | Error; reject the file. |

## Official CLI

Use the dot-free alias `designmd`; it works across platforms and avoids the Windows `.md` file-association collision.

```bash
# Lint (the CLI defaults to JSON)
npx -p @google/design.md designmd lint DESIGN.md

# Lint as JSON
npx -p @google/design.md designmd lint --format json DESIGN.md

# Capture JSON without a BOM (recommended on Windows)
npx -p @google/design.md designmd lint --format json DESIGN.md | node scripts/write-utf8.mjs evidence/lint.json

# Lint from stdin
npx -p @google/design.md designmd lint -

# Compare versions
npx -p @google/design.md designmd diff DESIGN.md DESIGN-v2.md

# Export Tailwind v4 CSS custom properties
npx -p @google/design.md designmd export --format css-tailwind DESIGN.md

# Export Tailwind v3 JSON theme extension
npx -p @google/design.md designmd export --format json-tailwind DESIGN.md

# Export W3C DTCG tokens
npx -p @google/design.md designmd export --format dtcg DESIGN.md

# Print the current spec or rules
npx -p @google/design.md designmd spec
npx -p @google/design.md designmd spec --rules
```

Exit codes:

- `lint`: `1` if errors are found, `0` otherwise. Warnings alone do not fail the command.
- `diff`: `1` if the "after" file has more errors or warnings than "before".
- `export`: `0` on success, `1` for an invalid format or emitter error, `2` if the input cannot be read.

Windows notes:

- If `npx @google/design.md ...` produces no output or opens the Markdown file, use `npx -p @google/design.md designmd ...`.
- PowerShell 5.1 `>` redirection can write UTF-16, and `Out-File -Encoding utf8` can add a BOM. Pipe through `scripts/write-utf8.mjs` (or another BOM-free writer) and strip a leading U+FEFF before parsing. The artifact validator is BOM-tolerant.
- If npm reports `ENOVERSIONS`, check `npm config get registry`; a private mirror may not have synced the package.

## Active lint rules

| Rule | Severity | What it checks |
| --- | --- | --- |
| `broken-ref` | error | A `{token.reference}` does not resolve. |
| `missing-primary` | warning | Colors exist but no `primary` token exists. |
| `contrast-ratio` | warning | A component's `textColor`/`backgroundColor` pair is below WCAG AA 4.5:1. |
| `orphaned-tokens` | warning | A color token is never referenced by a component. |
| `token-summary` | info | Counts tokens by section. |
| `missing-sections` | info | Spacing or rounded sections are absent while other tokens exist. |
| `missing-typography` | warning | Colors exist but no typography tokens exist. |
| `section-order` | warning | Recognized sections are out of canonical order. |
| `unknown-key` | warning | A top-level key looks like a typo of a known schema key. |
| `token-like-ignored` | warning | An unknown key contains token-like values, suggesting it was dropped or misspelled. |
| `omitted-rules` | info | Checks the `omitted` configuration for unknown or redundant entries. |

A passing artifact has **0 errors**. Treat warnings as review items: fix real defects; document deliberate exceptions. Do not claim "lint clean" if warnings remain.

Read the finding message, not only the severity. A `contrast-ratio` finding may report a pair that passes WCAG AA (for example as a summary); do not change a passing value just because the row says "warning". Conversely, a warning about a missing primary or typography token is a real defect.

## References and composition

- `{colors.primary}` points to a primitive color.
- `{rounded.md}` points to a radius.
- `{typography.body-md}` is a composite reference and is allowed inside a component's `typography` property.
- A reference to `{colors}` or `{typography}` as a group outside that component context is not a valid value.
- Keep token names stable and semantic. Renaming a token is a breaking change; use the `diff` command when comparing versions.

## Practical checks before linting

1. The file starts with `---` and closes the frontmatter with `---`.
2. Every hex color is quoted.
3. No top-level key appears twice anywhere in the document.
4. No `##` heading is duplicated.
5. Sections are in canonical order.
6. Every `{reference}` resolves to a defined path.
7. `colors.primary` exists.
8. Typography tokens exist and use valid dimensions.
9. Component `typography` references are composite; other refs are primitive.
10. Text/background pairs meet 4.5:1 for normal text and 3:1 for large text/UI components.

## Drift warning

The format is alpha and the CLI is actively changing. The commands and rules above reflect the 0.4.0 package and the public spec at retrieval. If a command fails after an upgrade, run `designmd spec --rules` and check the repository changelog before changing your DESIGN.md to satisfy a guess.
