# Applied evidence — skill-creator

This is not a controlled with/without benchmark. It records what fresh agents actually produced with the skill and how independent judges scored it.

## 1. Fresh executor: `meeting-decisions`

- A fresh subagent was given only the clean `skill-creator` and a short task (meeting transcript → decision log).
- It created a valid `meeting-decisions` skill with a fixed output contract, extraction guide, validator, fixtures, and two evals.
- The bundled strict validator and official `skills-ref` both pass.
- A different fresh judge scored the candidate **90/100, PASS** and noted that it is valid, specific, non-generic, and properly scoped.
- The candidate skill itself is not archived in this repository; the judge report is the record.
- Report: `docs/audits/2026-11-16/meeting-decisions-judge.md`.

## 2. Fresh skill author: `design-md-prototype`

- A fresh subagent used only `skill-creator` to create `design-md-prototype`.
- The created skill passed the official `skills-ref` and strict local validator.
- Independent judges scored the created skill **92/100 PASS** (clean skill review, pre-fix) and its applied Gojek output **93/100 PASS** (applied judge). The later independent audit of the final skill plus applied package scored **95/100 PASS**.
- Reports: [`../../audits/2026-11-16/design-md-prototype-judge.md`](../../audits/2026-11-16/design-md-prototype-judge.md), the applied [`judge-report.md`](../design-md-prototype/iteration-1/gojek-applied/with_skill/judge-report.md), and the historical [`skill review`](../design-md-prototype/judge-skill-review-final.md).

## 3. Meta-skill judge

- A clean copy of `skill-creator` (prior results removed) was reviewed blind.
- Final judge: **91/100 PASS**; the remaining gap is missing controlled with/without eval runs, not a structural or usability failure. The reviewer confirmed the candidate skill was strong evidence of usability.
- Report: `docs/audits/2026-11-16/skill-creator-judge-v3.md`.

## Limitation

No no-skill baseline or benchmark was run. The evidence is applied usability plus independent review, not a causal comparison. Any future higher claim should add a fresh no-skill control run and record tokens/time.
