# design-md-prototype — evaluation evidence

This folder contains the evaluation record for [`skills/design-md-prototype`](../../../skills/design-md-prototype/). The evidence lives outside the skill folder so installs stay lean.

## Applied run: Gojek

A fresh executor received only the skill path and a task brief. It produced a complete design-system package for Gojek (`gojek.com` + `gojek.io`) as one brand with consumer and corporate registers.

- **Result:** [RESULTS.md](iteration-1/gojek-applied/RESULTS.md)
- **Artifacts:** [`with_skill/outputs/`](iteration-1/gojek-applied/with_skill/outputs/)
- **Screenshots:** [`with_skill/screenshots/`](iteration-1/gojek-applied/with_skill/screenshots/) (20 full-page PNGs)
- **Independent judge:** [`with_skill/judge-report.md`](iteration-1/gojek-applied/with_skill/judge-report.md) — **PASS, 93/100**, no critical fails
- **Objective assertions:** [`with_skill/grading.json`](iteration-1/gojek-applied/with_skill/grading.json) — 11/11
- **Missing baseline:** [`without_skill/NOT_RUN.md`](iteration-1/gojek-applied/without_skill/NOT_RUN.md) — no no-skill control was run
- **Publication corrections:** [`CORRECTIONS.md`](iteration-1/gojek-applied/CORRECTIONS.md)

The later independent audit of the final skill plus applied package scored **95/100 PASS**; see [`docs/audits/2026-11-16/design-md-prototype-judge.md`](../../audits/2026-11-16/design-md-prototype-judge.md). The earlier clean-skill review scored **92/100** and is preserved as [`judge-skill-review-final.md`](judge-skill-review-final.md); it predates several fixes.

## Coverage

The four prompts in [`evals/evals.json`](../../../skills/design-md-prototype/evals/evals.json) cover single-property, multi-property, audit/fix, and vague-brief tasks. Only the multi-property case has a recorded applied run. The others remain available for future isolated evaluations.

## Caveats

- This is an applied usability check plus independent review, **not a causal benchmark**. No no-skill baseline or token/time comparison exists.
- The archived evidence was produced on Windows. Local filesystem paths were replaced with placeholders for publication; measurements are unchanged.
- The DESIGN.md format is alpha and the official CLI can change. Re-run the official gates before relying on a frozen result.
- The Gojek package is an unofficial brand study, not an official Gojek deliverable. See [`NOTICE.md`](../../../NOTICE.md).
