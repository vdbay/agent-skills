---
# DESIGN.md starter — replace every <...> placeholder.
#
# This file is intentionally incomplete and is expected to fail the official
# linter until you replace the placeholders with sourced values. Do not ship
# it as-is.
#
# Rules:
# - Quote every hex color. An unquoted # starts a YAML comment.
# - Do not repeat a top-level YAML key anywhere in the document.
# - Keep the eight canonical ## sections in order. Do not duplicate a heading.
# - Components must reference tokens, not paste a parallel palette.
# - Name the official font in DESIGN.md. Do not bundle a proprietary font binary.
# - Every number below is an illustrative placeholder. Replace it with a sourced
#   or derived value, or omit it. Do not ship a generic scale just because it is here.
version: alpha
name: "<Product or system name>"
description: "<One sentence: audience, category, and the visual idea>"

colors:
  primary: "<#RRGGBB>"
  secondary: "<#RRGGBB>"
  tertiary: "<#RRGGBB>"
  neutral: "<#RRGGBB>"
  surface: "<#RRGGBB>"
  on-surface: "<#RRGGBB>"
  on-primary: "<#RRGGBB>"
  muted: "<#RRGGBB>"
  border: "<#RRGGBB>"
  focus: "<#RRGGBB>"
  success: "<#RRGGBB>"
  warning: "<#RRGGBB>"
  error: "<#RRGGBB>"

typography:
  display-lg:
    fontFamily: "<Official brand font or documented fallback>"
    fontSize: 64px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "<Official brand font or documented fallback>"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.01em
  headline-md:
    fontFamily: "<Official brand font or documented fallback>"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0em
  body-lg:
    fontFamily: "<Official brand font or documented fallback>"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-md:
    fontFamily: "<Official brand font or documented fallback>"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  label-sm:
    fontFamily: "<Official brand font or documented fallback>"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.08em

rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px

spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  section: 96px

components:
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.md}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-primary-focus:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px
  badge:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 6px
  focus-ring:
    backgroundColor: "{colors.focus}"
    rounded: "{rounded.full}"
---

# <Product or system name>

## Overview

<Who this is for, the category, and the one visual idea that carries the identity.
Replace this with evidence-backed prose, not adjectives. State the design thesis in
one sentence, then explain the trade-offs it implies.>

### Registers

<!-- Delete this subsection for a single-property system. -->

| Register | Audience and job | Expression deltas |
| --- | --- | --- |
| <Corporate / product / consumer / service> | <Who and what they need> | <Density, accent proportion, imagery, motion, tone> |

<Explain the shared core and what changes by register. One token core, one primary,
one type system. Context-prefixed tokens and component variants carry the deltas.>

## Colors

<Explain the palette logic and the roles. Name the brand colors, their intended use,
and the accessible variants. Call out any official color that must not be used for
small text, with its measured ratio. Do not list hex values without provenance.>

- **Primary:** <role and reason>
- **Secondary:** <role and reason>
- **Tertiary / accent:** <role and reason; accent is not a synonym for decoration>
- **Neutral / surface:** <role and reason>
- **Semantic:** <success, warning, error, focus; do not rely on hue alone>

## Typography

<Explain the type strategy: families, weights, scale, fallback, and licensing.
Name the official family. State the demo fallback or stand-in if the official font
is proprietary. Explain how the scale behaves at small widths.>

- **Display:** <family, weight, use>
- **Body:** <family, weight, use>
- **Labels:** <family, weight, use; tracking and case rules>

## Layout

<Describe the grid, content width, spacing rhythm, density, and breakpoints.
State the mobile-first behavior and the max-width at large screens.>

- Spacing unit: <value and derivation>
- Content max-width: <value>
- Breakpoints: <values and what changes>
- Density: <compact / comfortable / spacious, and where each applies>

## Elevation & Depth

<Describe how hierarchy is conveyed: shadows, borders, tonal layers, or a flat
system. If flat, explain the alternative. State the dark-mode behavior.>

## Shapes

<Describe the corner language, border weights, and icon geometry. Explain why the
radii are what they are. State where sharp and soft shapes may or may not mix.>

## Components

<Describe the component contracts and states. The YAML above is the normative token
set; this prose explains behavior, anatomy, and when to use each variant.>

- **Buttons:** <variants, sizes, states, icon rules, disabled behavior>
- **Inputs:** <label, helper, error, focus, disabled>
- **Cards / surfaces:** <padding, border/elevation, interactive behavior>
- **Navigation:** <desktop/mobile, active state, overflow>
- **Feedback:** <toast, inline message, dialog; announcement behavior>

## Do's and Don'ts

- Do <specific practice with a reason>.
- Don't <specific failure with a reason>.
- Do <accessibility or brand rule>.
- Don't <common misuse>.
- Do <content or motion rule>.
- Don't <another common misuse>.
