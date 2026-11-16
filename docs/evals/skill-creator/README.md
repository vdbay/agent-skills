# skill-creator — evaluation evidence

This folder records what fresh agents produced with [`skills/skill-creator`](../../../skills/skill-creator/) and how independent judges scored it.

## Results

| Evidence | What it shows | Score |
| --- | --- | ---: |
| [`applied-evidence.md`](applied-evidence.md) | Fresh executor created a `meeting-decisions` skill with the skill; independent judge reviewed it | 90/100 PASS |
| [`applied-evidence.md`](applied-evidence.md) | Fresh author created `design-md-prototype` using only `skill-creator` | 92/100 PASS (pre-fix skill review) |
| [`../audits/2026-11-16/skill-creator-judge-v3.md`](../../audits/2026-11-16/skill-creator-judge-v3.md) | Blind review of a clean `skill-creator` copy | 91/100 PASS |

The remaining gap called out by the judge is the absence of a controlled with/without benchmark. The evidence is applied usability plus independent review, not a causal comparison.

## Not included

- No baseline run for the `skill-creator` prompts.
- No token/time comparison.
- No claim that every skill created with it will score 90+.

See [`../../audits/README.md`](../../audits/README.md) for the audit protocol and caveats.
