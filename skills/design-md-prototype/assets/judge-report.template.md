# Artifact review — <project or brief label>

**Verdict:** PASS / REVISE / FAIL
**Score:** <n>/100
**Critical fails:** none / <list with evidence>
**Reviewed by:** independent judge
**Artifacts reviewed:** <paths>
**Task/brief reviewed:** <path>
**Rubric:** `references/judge-rubric.md`

## Contamination declaration

I received only the task, the artifacts, and the rubric. I did not see the author's conversation, run labels (`with_skill`, `baseline`, iteration numbers), previous scores, or a suggested verdict.

If any of that was visible, state it here and invalidate the review.

## Scorecard

| # | Category | Score | Evidence |
| --- | --- | ---: | --- |
| 1 | Research provenance and source discipline | /15 | |
| 2 | DESIGN.md spec compliance | /15 | |
| 3 | Design-system craft and coherence | /15 | |
| 4 | Prototype and marketing quality | /15 | |
| 5 | Showcase/spec page quality | /10 | |
| 6 | Accessibility | /10 | |
| 7 | Responsiveness and runtime robustness | /8 | |
| 8 | Evidence and verification | /7 | |
| 9 | Legal and brand safety | /5 | |
| | **Total** | **/100** | |

Hard pass: ≥85, no category below 60% of its points, zero critical fails.
Verdict mapping: PASS 85–100; REVISE 70–84 or a category below 60%; FAIL <70 or any critical fail.

## Critical checks

- [ ] Required files exist: `DESIGN.md`, `index.html`, `design-md.html`, `README.md`, `sources.md`, `evidence/`
- [ ] Both pages open from `file://`
- [ ] Official lint: 0 errors (or disclosed failure)
- [ ] CSS export succeeds
- [ ] Static validator: 0 errors
- [ ] Browser matrix: 320 / 390 / 768 / 1024 / 1440 × light/dark
- [ ] No horizontal overflow at 390
- [ ] Zero console/page errors
- [ ] Primary flow works with keyboard
- [ ] Contrast spot checks: body ≥4.5:1; large/UI ≥3:1
- [ ] No unlicensed logo/photo/testimonial/font binary
- [ ] No fabricated evidence or claims

## Evidence by category

### 1. Research provenance — /15

- Sources inspected:
- Tier-1 count:
- GitHub repo/stars/license/use:
- Conflicts resolved:
- Gaps/fabrication check:

### 2. DESIGN.md spec compliance — /15

- Lint result (command, summary):
- Sections/order:
- Duplicate keys/headings:
- Broken refs:
- Token types and components:
- Warnings triaged:

### 3. Design-system craft — /15

- Thesis:
- Palette/roles:
- Type system:
- Spacing/shape/elevation:
- Component states:
- Registers (if any):

### 4. Prototype/marketing quality — /15

- Promise/narrative or task flow:
- Visual idea:
- Copy quality and truthfulness:
- Interaction:
- States:
- Mobile layout:

### 5. Showcase quality — /10

- Token coverage:
- Typography/layout/elevation/shapes/components/motion:
- Do's and Don'ts:
- Source excerpt:
- Navigation/evidence footer:

### 6. Accessibility — /10

- Contrast measurements:
- Keyboard/focus:
- Semantics/headings/landmarks:
- Names/labels/alt:
- Reduced motion:
- Target sizes/zoom:
- Color-only state:

### 7. Responsiveness/runtime — /8

- Matrix results:
- Overflow measurements:
- `file://`:
- Console errors:
- External dependencies:
- Theme behavior:

### 8. Evidence — /7

- Lint JSON:
- Export CSS:
- Static JSON:
- Browser report:
- Lighthouse:
- README honesty:
- Stale/missing evidence:

### 9. Legal/brand safety — /5

- Fonts:
- Logos/photos/illustrations:
- Testimonials/claims:
- Disclaimer:
- Rights notes:

## What works

- <specific, with file/line, token, measurement, or quote>
-
-

## Required fixes

1. <file/section → expected change → why it matters>
2.
3.

## Non-blocking suggestions

-
-

## Unverified / residual risk

- <what could not be checked, and why>
-

## Score rationale

<Why this total. What kept it from the next band. Which category drove the verdict.>

## Checks run

```text
<command> → <result>
<command> → <result>
Browser: <matrix and result>
Lighthouse: <result or "not run: reason">
```

## Judge attestation

- I read the artifacts myself.
- I did not edit them.
- I did not receive author context or run labels.
- I distinguished "not present" from "not verified".
- I did not reward length or decoration by itself.
