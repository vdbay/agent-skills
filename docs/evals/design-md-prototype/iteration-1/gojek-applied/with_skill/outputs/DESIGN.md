---
version: alpha
name: "Gojek — One Green, Two Registers"
description: "A unified design system for Gojek's consumer and corporate/technology expressions: one green route, warm at the surface and precise underneath."
colors:
  primary: "#00880D"
  primary-hover: "#00680A"
  primary-active: "#004F08"
  brand: "#00AA13"
  brand-soft: "#EAFFEA"
  on-brand: "#1C1D1D"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  surface-alt: "#FAFAFA"
  surface-sunken: "#E8E8E8"
  on-surface: "#1C1D1D"
  on-surface-secondary: "#494A4A"
  muted: "#727272"
  border: "#BDBDBD"
  border-strong: "#727272"
  focus: "#1C1D1D"
  focus-halo: "#86AFFF"
  success: "#00680A"
  success-soft: "#EAFFEA"
  warning: "#FFC41C"
  warning-soft: "#FFF8E7"
  warning-text: "#7A5D0E"
  on-warning: "#1C1D1D"
  error: "#EA001F"
  error-soft: "#FFF3F3"
  error-text: "#C60E26"
  info: "#008BAB"
  info-soft: "#E8FBFF"
  info-text: "#006F89"
  inverse-surface: "#1C1D1D"
  inverse-on-surface: "#FFFFFF"
  surface-dark: "#111313"
  surface-dark-raised: "#1C1D1D"
  on-surface-dark: "#F5F5F2"
  muted-dark: "#B9B9B4"
  border-dark: "#6B6D6D"
  primary-dark: "#00AA13"
  on-primary-dark: "#08210D"
  surface-sunken-dark: "#2A2C2C"
  on-surface-secondary-dark: "#D6D6D1"
  border-strong-dark: "#8A8C8C"
  focus-dark: "#F5F5F2"
  primary-hover-dark: "#18C22A"
  primary-active-dark: "#33D944"
  brand-soft-dark: "#13351B"
  success-dark: "#7DDB8A"
  success-soft-dark: "#12351A"
  warning-dark: "#FFD355"
  warning-soft-dark: "#332B12"
  warning-text-dark: "#FFE08A"
  error-dark: "#FF6B7A"
  error-soft-dark: "#3A1519"
  error-text-dark: "#FFB3BA"
  info-dark: "#5DD6F0"
  info-soft-dark: "#0E2F36"
  info-text-dark: "#9DEBFA"
  inverse-surface-dark: "#F5F5F2"
  inverse-on-surface-dark: "#111313"

typography:
  brand-hero:
    fontFamily: "Maison Neue Extended, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 72px
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: -0.03em
  brand-display:
    fontFamily: "Maison Neue Extended, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: -0.02em
  display-2xl:
    fontFamily: "Maison Neue Extended, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.618
    letterSpacing: -0.01em
  display-lg:
    fontFamily: "Maison Neue Extended, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.618
    letterSpacing: -0.005em
  heading-lg:
    fontFamily: "Maison Neue, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0em
  heading-md:
    fontFamily: "Maison Neue, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0em
  heading-sm:
    fontFamily: "Maison Neue, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0em
  corporate-title:
    fontFamily: "Maison Neue, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.01em
  body-lg:
    fontFamily: "Maison Neue, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.618
    letterSpacing: 0em
  body-md:
    fontFamily: "Maison Neue, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.618
    letterSpacing: 0em
  body-sm:
    fontFamily: "Maison Neue, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.618
    letterSpacing: 0em
  label-md:
    fontFamily: "Maison Neue, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.01em
  label-sm:
    fontFamily: "Maison Neue, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.02em
  overline:
    fontFamily: "Maison Neue, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.12em
  code-md:
    fontFamily: "Fira Code, ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.618
    letterSpacing: 0em

rounded:
  none: 0px
  xs: 6px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  full: 992px

spacing:
  base: 4px
  2xs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
  3xl: 48px
  4xl: 64px
  section: 96px
  section-lg: 128px

components:
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  page-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-surface-dark}"
    typography: "{typography.body-md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 14px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 14px
  button-primary-disabled:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 14px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 14px
  button-corporate:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 14px
  button-corporate-hover:
    backgroundColor: "{colors.on-surface-secondary}"
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 14px
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 14px
  button-primary-dark:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.on-primary-dark}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 14px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 12px
  card:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.2xl}"
    padding: 24px
  card-dark:
    backgroundColor: "{colors.surface-dark-raised}"
    textColor: "{colors.on-surface-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.2xl}"
    padding: 24px
  card-meta:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.on-surface-secondary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  badge:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.success}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 6px
  badge-neutral:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-secondary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 6px
  alert-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  alert-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-warning}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  alert-warning-subtle:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning-text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  alert-error:
    backgroundColor: "{colors.error-soft}"
    textColor: "{colors.error-text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  alert-info:
    backgroundColor: "{colors.info-soft}"
    textColor: "{colors.info-text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  toast:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  focus-ring:
    backgroundColor: "{colors.focus}"
    rounded: "{rounded.full}"
    size: 3px
  focus-halo:
    backgroundColor: "{colors.focus-halo}"
    rounded: "{rounded.full}"
    size: 5px
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  divider-dark:
    backgroundColor: "{colors.border-dark}"
    height: 1px
  brand-panel:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    typography: "{typography.brand-display}"
    rounded: "{rounded.2xl}"
    padding: 32px
  route-node:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: 12px
  status-dot-info:
    backgroundColor: "{colors.info}"
    rounded: "{rounded.full}"
    size: 8px
  helper-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  helper-text-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.muted-dark}"
    typography: "{typography.body-sm}"
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  link-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary-hover}"
    typography: "{typography.body-md}"
  nav-link-active:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.success}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px
  chip:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px
  button-primary-hover-dark:
    backgroundColor: "{colors.primary-hover-dark}"
    textColor: "{colors.on-primary-dark}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 44px
  button-primary-active-dark:
    backgroundColor: "{colors.primary-active-dark}"
    textColor: "{colors.on-primary-dark}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 44px
  input-dark:
    backgroundColor: "{colors.surface-sunken-dark}"
    textColor: "{colors.on-surface-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    height: 44px
  body-dark-secondary:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-surface-secondary-dark}"
    typography: "{typography.body-sm}"
  divider-strong-dark:
    backgroundColor: "{colors.border-strong-dark}"
    height: 1px
  focus-ring-dark:
    backgroundColor: "{colors.focus-dark}"
    rounded: "{rounded.full}"
    height: 3px
  chip-dark:
    backgroundColor: "{colors.brand-soft-dark}"
    textColor: "{colors.success-dark}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 8px
  alert-success-dark:
    backgroundColor: "{colors.success-soft-dark}"
    textColor: "{colors.success-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 16px
  alert-warning-dark:
    backgroundColor: "{colors.warning-soft-dark}"
    textColor: "{colors.warning-text-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 16px
  alert-error-dark:
    backgroundColor: "{colors.error-soft-dark}"
    textColor: "{colors.error-text-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 16px
  alert-info-dark:
    backgroundColor: "{colors.info-soft-dark}"
    textColor: "{colors.info-text-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 16px
  toast-dark:
    backgroundColor: "{colors.inverse-surface-dark}"
    textColor: "{colors.inverse-on-surface-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 16px
  status-dot-success-dark:
    backgroundColor: "{colors.success-dark}"
    rounded: "{rounded.full}"
    size: 8px
  status-dot-warning-dark:
    backgroundColor: "{colors.warning-dark}"
    rounded: "{rounded.full}"
    size: 8px
  status-dot-error-dark:
    backgroundColor: "{colors.error-dark}"
    rounded: "{rounded.full}"
    size: 8px
  status-dot-info-dark:
    backgroundColor: "{colors.info-dark}"
    rounded: "{rounded.full}"
    size: 8px
---

# Gojek — One Green, Two Registers

> Unofficial concept. Not affiliated with, endorsed by, or produced by Gojek or PT GoTo Gojek Tokopedia Tbk. Gojek is a trademark of its owner. This document studies public brand and design-system evidence; it is not an official brand manual.

## Overview

Gojek is one company with two public faces: a consumer super-app that helps people move, eat, send, shop, and pay, and a corporate/technology platform that serves businesses, partners, and the systems behind those moments. This system treats both as **one brand with two registers**, not two brands. The shared core is Gojek green, Maison Neue, a 4px rhythm, soft containers, pill-shaped actions, and a route line that connects one moment to the next. The registers change density, accent proportion, type scale, tone, and motion intensity; they never change the core identity.

**Design thesis:** For people moving through an Indonesian day and for the teams building the systems behind it, Gojek should feel like one continuous green route — warm and human at the surface, precise and legible underneath.

The organising visual idea is the **route line**. On the consumer surface it is a day: a pickup, a meal, a package, a payment. On the corporate surface it is a system: a request, a match, a handoff, a confirmation. The same 2px line and circular nodes carry both stories. This is why the prototype's central interaction flips one sample day between a human view and a system view instead of presenting two unrelated brand worlds.

The tone comes from Gojek's own voice guidance: **clear, casual, witty, and empathetic** [S4]. Consumer copy is Bahasa Indonesia and leads with the human moment. Corporate copy is English, shorter, and leads with the operational consequence. Wit is allowed in the consumer register; in the corporate register, clarity outranks wit.

### Registers

| Register | Audience and job | Expression deltas |
| --- | --- | --- |
| **Consumer** (`register-consumer`) | Indonesian everyday users; help them recognise a service, trust the next step, and feel the day move | `brand-hero` and `brand-display` at campaign scale; brand green as a large field; 24px editorial cards; route-line storytelling; 200–320ms motion with an overshoot accent; Bahasa Indonesia; warm, casual, specific |
| **Corporate / technology** (`register-corporate`) | Business buyers, partners, operators, and engineers; explain what the platform does and how the pieces connect | `corporate-title` and `heading-*` at denser sizes; ink surfaces with green as a signal, not a field; 16px data cards; tabular alignment; 120–200ms functional motion; English; plain, evidence-led, unsentimental |

The registers share every primitive: `colors.primary`, the Maison Neue family, the 4px spacing scale, the radius family, the focus treatment, and the accessibility rules. The consumer register may use more `colors.brand`; the corporate register may use more `colors.inverse-surface`. Neither register gets its own primary, palette, typeface, or logo. Context-prefixed components such as `card-dark`, `button-corporate`, and `nav-link-active` carry the deltas.

### Motion

Motion is functional first. The brand's documented curves are **standard** `cubic-bezier(0.4, 0, 0.2, 1)`, **ease-in** `cubic-bezier(0.4, 0, 1, 1)`, **ease-out** `cubic-bezier(0, 0, 0.2, 1)`, and **overshoot** `cubic-bezier(0.34, 1.56, 0.64, 1)` [S14]. The showcase uses one 800ms demo per curve so the curves can be compared; interface motion is scaled down to 120ms (feedback), 200ms (state change), and 320ms (route or panel reveal). Spatial motion uses transform and opacity; colour transitions are allowed. Layout is never animated. Under `prefers-reduced-motion: reduce`, transforms and looping animation are removed; state changes become an immediate swap or a 120ms opacity change. Nothing autoplays in a loop.

### Accessibility

The system targets WCAG 2.2 AA. The brand green is not automatically a text colour: `colors.brand` measures 3.11:1 on white and is reserved for large graphics, large display text, and fills. `colors.primary` measures 4.64:1 on white and carries normal-size text and controls. Every text pair used by the prototype is recorded in the contrast table below. Focus uses a 3px ink ring plus a 5px `focus-halo`; on dark surfaces the ring becomes light (`focus-dark`), and on brand-green panels the ring is ink with a white halo. The official focus blue alone is only 2.19:1 on white, so it is never the only focus signal. State is never colour alone: alerts pair an icon with a label, selected tabs change shape and text weight, and errors include text. Targets are at least 44×44 CSS px for primary actions and 24×24 px for secondary controls.

## Colors

The palette separates **brand evidence** from **semantic roles**. Gojek's brand green is `#00AA13`, named *Green ijo royo* on the official brand site [S2]. The current consumer web UI uses a deeper product green, `#00880D`, as its interactive accent [S5]. These are both official values with different jobs. The system keeps both and never silently swaps one for the other.

- **Brand (`colors.brand`, `#00AA13`):** the identity field. Use it for large panels, display type on ink, illustrations, and route lines. On white it measures **3.11:1**, so it is not for normal text or small icons that carry meaning. Ink on brand green measures **5.44:1**, which is why large brand panels use `colors.on-brand` rather than white.
- **Primary (`colors.primary`, `#00880D`):** the accessible product green. It measures **4.64:1** on white, and white on it also measures **4.64:1**, so it can carry 14–16px labels and links. It is the only colour used for primary actions.
- **Primary hover (`colors.primary-hover`, `#00680A`):** the official active green from the current UI, repurposed as the text-safe hover. The official hover green `#269A31` is an official source value, not a token in this system: white 14px text on it measures only **3.65:1**, so it is not used behind normal-size button labels or text.
- **Soft green (`colors.brand-soft`, `#EAFFEA`):** selected and success surfaces. The official success green `#00880D` measures **4.42:1** on this tint, just below AA for normal text, so green text on the tint uses `colors.success` (`#00680A`, **6.70:1**).
- **Ink and neutrals:** `#1C1D1D` is the primary ink; `#494A4A` is secondary text; `#727272` is muted text and the accessible control border; `#BDBDBD` is a decorative divider only. The official `#BDBDBD` border measures **1.88:1** on white, so it never defines an input or focus boundary. `#727272` measures **4.81:1**. On the soft surface `#FAFAFA`, primary green `#00880D` measures **4.44:1**, so links on that surface use `#00680A` (**6.74:1**) and unselected control boundaries use `#727272`.
- **Semantic families:** success `#00680A` on `#EAFFEA` (**6.70:1**); warning `#FFC41C` with ink (**10.59:1**) and warning text `#7A5D0E` on `#FFF8E7` (**5.83:1**); error `#EA001F` as a fill with white (**4.65:1**) and error text `#C60E26` on `#FFF3F3` (**5.55:1**); info `#008BAB` with text `#006F89` on `#E8FBFF` (**5.41:1**). The official warning text `#8F6F14` measures **4.72:1** on white but **4.46:1** on `#FFF8E7`; the darker `#7A5D0E` is the accessible role for warning tints. This is a deliberate role variant, not a replacement of the official brand value.
- **Focus:** `colors.focus` is ink `#1C1D1D`; `colors.focus-halo` is the official UI focus blue `#86AFFF`. The blue measures **2.19:1** on white but **7.72:1** on ink, so it sits outside the ink ring as a halo. The ring, not the halo, carries the contrast requirement.

Dark mode is a designed theme, not an inversion. Surfaces are `#111313` and `#1C1D1D`; text is `#F5F5F2`; muted text is `#B9B9B4`; borders are `#6B6D6D` (**3.58:1** on the base surface); and the accent becomes the brand green `#00AA13` (**6.00:1** on `#111313`) with `#08210D` text on it (**5.48:1**). Shadows are reduced and borders do more of the work because dark elevation reads through value, not black drops. The dark values are an original extension: Asphalt documents light and dark themes, but the published image assets did not expose usable dark hex values [S1]. The derived roles are encoded as explicit `*-dark` tokens in the color core so the theme is machine-readable and exportable, not hidden in prose: secondary text `#D6D6D1`; soft green `#13351B`; success `#7DDB8A` on `#12351A`; warning `#FFD355`, soft `#332B12`, text `#FFE08A`; error `#FF6B7A`, soft `#3A1519`, text `#FFB3BA`; info `#5DD6F0`, soft `#0E2F36`, text `#9DEBFA`; primary hover `#18C22A` and active `#33D944`; strong border `#8A8C8C`; sunken surface `#2A2C2C`; focus `#F5F5F2`; inverse surface `#F5F5F2` and inverse ink `#111313`. These remain implementation-derived role values, not claimed as official Gojek dark tokens, and they are documented so the dark theme is not a silent second palette.

Contrast notes for the pairs the prototype actually uses:

| Pair | Ratio | Use |
| --- | ---: | --- |
| `#1C1D1D` on `#FFFFFF` | 16.90:1 | Body and headings |
| `#494A4A` on `#FFFFFF` | 8.89:1 | Secondary body |
| `#727272` on `#FFFFFF` | 4.81:1 | Muted text, helper text |
| `#00880D` on `#FFFFFF` | 4.64:1 | Primary links and labels |
| `#00680A` on `#FAFAFA` | 6.74:1 | Links on the soft surface |
| `#00880D` on `#FAFAFA` | 4.44:1 | Fails AA normal text; use `#00680A` |
| `#FFFFFF` on `#00880D` | 4.64:1 | Primary button |
| `#FFFFFF` on `#00680A` | 7.04:1 | Primary hover / active |
| `#1C1D1D` on `#00AA13` | 5.44:1 | Large brand panel text |
| `#00680A` on `#EAFFEA` | 6.70:1 | Success text on soft green |
| `#7A5D0E` on `#FFF8E7` | 5.83:1 | Warning text on soft yellow |
| `#C60E26` on `#FFF3F3` | 5.55:1 | Error text on soft red |
| `#006F89` on `#E8FBFF` | 5.41:1 | Info text on soft cyan |
| `#F5F5F2` on `#111313` | 17.07:1 | Dark theme body |
| `#B9B9B4` on `#111313` | 9.47:1 | Dark theme muted |
| `#00AA13` on `#111313` | 6.00:1 | Dark theme accent text |
| `#08210D` on `#00AA13` | 5.48:1 | Dark primary button |

## Typography

Gojek's official typeface is **Maison Neue**, with **Maison Neue Extended** used for display and **Fira Code** for code in the current web UI [S3][S5]. Maison Neue is proprietary. This package names it, does not download it, and does not redistribute any font binary. The HTML uses a deliberate fallback stack — `"Maison Neue Extended", "Helvetica Neue", Helvetica, Arial, sans-serif` for display and `"Maison Neue", "Helvetica Neue", Helvetica, Arial, sans-serif` for text — so the artefacts remain usable offline. The fallback is visibly a stand-in, not a claim of typographic fidelity.

The system keeps two rhythms. Product and editorial body text uses the current site's **1.618** line-height and a **500** weight [S5]. Display and campaign type uses a tighter, editorial line-height because a 72px headline at 1.618 would separate the lines too far; that tightening is a documented **campaign extension**, not an official product token. Asphalt's own guidance is a linear scale with a 1.3 factor, a 12pt minimum, and line-heights rounded to the 4px grid [S1]; the campaign scale respects that grid at its breakpoints.

- **Display (`brand-hero`, `brand-display`, `display-2xl`, `display-lg`):** Maison Neue Extended, 700. Used once per viewport in the consumer register; not for dense UI. At 390px the CSS clamps the hero to 44px while the token remains 72px.
- **Headings and corporate titles (`heading-lg`, `heading-md`, `heading-sm`, `corporate-title`):** Maison Neue, 600. Corporate titles are denser (1.15 line-height) than consumer headings (1.5).
- **Body (`body-lg`, `body-md`, `body-sm`):** Maison Neue, 500, 1.618. `body-md` is the default; `body-lg` introduces a section; `body-sm` carries metadata and helper text.
- **Labels (`label-md`, `label-sm`, `overline`):** 600. Overline is uppercase with **0.12em** tracking. Sentence case is the default in both registers; uppercase is reserved for overlines, status labels, and tabular headers.
- **Code (`code-md`):** Fira Code, 400. It is open-source (SIL OFL) but is not shipped; the stack falls back to the platform monospace. Code is for token values and technical evidence, not for consumer copy.

Asphalt does not use italics in its system [S1]; this system follows that. No synthetic oblique is applied to headings or labels. Numerals in corporate tables use `font-variant-numeric: tabular-nums` so columns line up.

The HTML uses a small set of responsive display/editorial extensions beyond the token table — for example 52/42/34/26/20/19/15/13/11/10px sizes and 18/14/22px line-heights — because the page needs clamps and metadata that the 15-step product scale does not express. These are documented page-level extensions, not new system tokens; a component should use the nearest token unless the brief explicitly calls for an editorial display moment.

## Layout

The layout sits on a **4px base grid** with a **1240px** maximum content width and 24px gutters. Content uses task-specific 7/5 or 6/6 editorial splits, 2-, 3-, and 4-column arrangements; the 12-column model is a planning guide, not a literal CSS grid. Consumer sections are generous: 96–128px vertical spacing, 24px card padding. The corporate register compresses to 64–96px section spacing, 20–24px card padding, and denser data grids.

- **Spacing unit:** 4px. The scale is `4, 8, 12, 16, 24, 32, 40, 48, 64, 96, 128`. Components use the small end; sections use `spacing.section` and `spacing.section-lg`.
- **Content widths:** 720px for long prose, 560px for forms, 1240px for the page shell. The specification page uses a 240px sticky sidebar plus a 760px content column.
- **Breakpoints:** 480px (single column, type clamp), 760px (mobile nav and single-column shell), 980px (tablet; desktop nav/sidebar collapses), 1080px (compact desktop), 1240–1280px (maximum shell). The page is tested at 320, 390, 768, 1024, and 1440px; at 1440px the extra space becomes margin, not wider paragraphs.
- **Density:** consumer is comfortable; corporate is compact. The same `spacing.md` (16px) is a paragraph gap in consumer and a table cell padding in corporate. Density changes the rhythm, not the unit.
- **Route geometry:** the route line is 2px; nodes are 12px circles with a 4px surface ring; the selected node grows to 20px and gains a label. The line is decoration only when it connects two real moments; it is never a background texture behind unrelated copy.
- **Mobile:** all multi-column layouts collapse to one column; tables become stacked definition lists or scroll inside a labelled region; the hero clamps; no fixed-width card exceeds `min(100%, 360px)`.

## Elevation & Depth

Depth follows Asphalt's model: a light source perpendicular to the screen, with elevation measured from the base to the top of a 1px-thick surface [S1]. The system keeps three shadow levels from the current UI — **low** `0 2px 20px rgba(0,0,0,0.08)`, **mid** `0 4px 20px rgba(0,0,0,0.10)`, **high** `0 16px 64px rgba(0,0,0,0.12)` — and uses them sparingly [S5].

- **Low:** resting cards, sticky bars, and the day panel. A 1px border may replace the shadow when the card sits on a tinted surface.
- **Mid:** hovered cards, popovers, and the active route detail. It lifts without appearing to float.
- **High:** dialogs, mobile navigation sheets, and the toast. Only one high-elevation surface is visible at a time.

Borders and tonal layers are the primary hierarchy tools in the corporate register. A corporate card uses `surface-alt`, a 1px `border` divider, and no shadow at rest; hover adds `shadow-low`. The consumer register may use a shadow at rest because the card is an editorial object, not a data row. Do not combine a strong shadow and a strong border on the same surface: choose one hierarchy signal.

Dark mode keeps the same light-source logic but reduces shadow opacity and adds a visible `border-dark` to raised surfaces. `surface-dark-raised` is one step lighter than `surface-dark`; that value step, not a black drop shadow, communicates elevation. The high shadow is reserved for the mobile sheet and toast.

Motion belongs to depth: a panel enters with `ease-out` and exits with `ease-in`; an overshoot is reserved for a playful consumer confirmation, never for an error or a corporate data table. Durations and reduced-motion behaviour are documented in **Overview → Motion**.

## Shapes

The shape language is **soft containers, pill actions, and a circular route**. Actions use the full radius (`992px`), which is the current UI's 62rem action-control radius [S5]. Containers use 16, 20, or 24px depending on scale: 16px for compact data and feedback, 20px for medium cards, 24px for editorial panels. Inputs use 6px (small) or 8px (default); tabular data may use 0px because a table is a grid, not a card. The range is intentional: the pill is the signature, the container radius is the scale.

- **Action controls:** always full radius, 2px border for secondary actions, 44px minimum height, 14px label. A pill is never used for a table cell or a status chip that needs to align in a column.
- **Containers:** 16–24px. A card's radius should not exceed its padding; a 16px card with 12px padding looks like a lozenge, not a surface.
- **Inputs:** 6–8px. A pill input is reserved for search and chips, not for forms with labels and validation.
- **Data:** 0px for tables and code blocks; 12px for menus; 992px for status dots and avatars.
- **Icons:** 24px box, 2px stroke, rounded caps and joins, 2px corner radius on square glyphs. Icons are drawn on the same 4px grid as spacing; do not mix filled and outline icons in one control group.
- **Route nodes:** circles, never squares. A selected node may grow, but the line stays 2px so the route remains a route rather than a timeline of cards.

Do not mix sharp and soft corners inside one component. A sharp table can sit next to a soft card if the table is clearly a different object; a card with one sharp corner is a defect, not a style.

## Components

The YAML above is the normative component set. This prose explains anatomy and state behaviour. All interactive components are built with native elements where possible; the showcase uses real buttons, inputs, links, and details, not pictures of components.

- **Buttons:** `button-primary` is the only green fill in a viewport; `button-secondary` is a white pill with a 2px `border-strong` outline; `button-corporate` is an ink pill for the corporate register; `button-danger` is reserved for destructive confirmation. Hover uses `primary-hover` (`#00680A`), not the official `#269A31`, because white label text needs 4.5:1. Active uses `primary-active`. Disabled uses `surface-sunken` with `on-surface-secondary` text and no shadow; it remains readable but clearly inactive. Focus is a 3px ink ring with a 2px offset and a 5px blue halo. Minimum height is 44px; icon-only buttons are 44×44 with an accessible name.
- **Inputs:** visible label above the field, optional helper text below, error text linked with `aria-describedby`, `aria-invalid="true"` on error, 1px `border-strong` at rest, 2px ink ring on focus. The input radius is 6px; the field is 48px tall. Placeholder text is `muted` and never the only label.
- **Cards:** `card` is the consumer editorial surface (24px padding, 24px radius, `surface-alt`, optional `shadow-low`). `card-meta` is the compact metadata surface (16px padding, 16px radius). `card-dark` is the corporate dark surface (24px padding, `surface-dark-raised`, 1px `border-dark`). Interactive cards use a real link or button covering the whole card; the hover state must be visible on the card and the focus ring must appear on the interactive element.
- **Navigation:** desktop inline links with a 44px hit area; active item uses `nav-link-active` (soft green pill) plus `aria-current="page"` or `aria-current="location"`. Mobile navigation is a disclosure: a 44px button with `aria-expanded` and `aria-controls`, Escape closes it, focus returns to the trigger, and the panel is removed from the tab order when closed.
- **Tabs and segmented controls:** one `role="tablist"`, roving `tabindex`, arrow-key support, `aria-selected`, and a visible selected state that is not colour alone (weight + surface + indicator). The register switch in the prototype is a pair of pressed toggle buttons, not a second tab system, so it does not create competing keyboard models.
- **Feedback:** alerts use an icon plus a text label; they never rely on hue alone. `alert-success`, `alert-warning`, `alert-warning-subtle`, `alert-error`, and `alert-info` cover the five states. The toast uses `inverse-surface` and `role="status"`; errors use `role="alert"` only when the message requires immediate attention. Inline errors sit next to the field and are announced through the field's description.
- **Register variants:** `button-corporate`, `card-dark`, and `corporate-title` are the only register-specific components. They change fill, density, and type scale; they do not change the green, the family, the 4px unit, or the focus treatment.

## Do's and Don'ts

- **Do** use `colors.brand` `#00AA13` as a large field, a display accent, or a route line. **Don't** set 12–14px text in it on white: it measures **3.11:1**, below AA for normal text.
- **Do** use `colors.primary` `#00880D` for primary controls and links. **Don't** replace it with the brighter brand green because it "looks more Gojek"; the brighter green is the identity field, not the control colour.
- **Do** keep one primary action per viewport. **Don't** stack two green pills; the second action becomes `button-secondary` or a text link.
- **Do** use the route line to connect two real moments. **Don't** run it behind unrelated copy as a decorative texture; the line is a narrative device, not wallpaper.
- **Do** use 44×44px targets and a visible focus ring. **Don't** remove outlines or rely on the official blue halo alone; the halo is 2.19:1 on white.
- **Do** write consumer copy in plain, warm Bahasa Indonesia with a specific next step. **Don't** import corporate jargon into a consumer flow; "platform", "leverage", and "stakeholder" are not everyday words.
- **Do** keep the corporate register dense, evidence-led, and unsentimental. **Don't** dress it as a consumer campaign with oversized display type and playful overshoot.
- **Do** label sample scenarios, illustrative system views, and the unofficial status. **Don't** invent metrics, customer names, awards, press quotes, or endorsements.
- **Do** honour `prefers-reduced-motion` and keep spatial motion to transform and opacity; colour transitions are allowed. **Don't** animate layout, autoplay a looping animation, or use overshoot on errors and data.
- **Do** name Maison Neue and Maison Neue Extended in the spec while shipping a fallback stack. **Don't** download, bundle, or redistribute the proprietary font binaries.
