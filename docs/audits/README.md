# Independent audits

Audits are run on clean copies, with prior scores and author conversation removed. Judges receive the skill (or applied package), the task, the official reference material, and a rubric. A pass requires **≥85/100**, no category below 60%, and no critical fail.

## 2026-11-16

| Artifact | Judge report | Score | Verdict |
| --- | --- | ---: | --- |
| `skill-creator` | [skill-creator-judge-v3.md](2026-11-16/skill-creator-judge-v3.md) | **91/100** | PASS |
| `design-md-prototype` + applied Gojek package | [design-md-prototype-judge.md](2026-11-16/design-md-prototype-judge.md) | **95/100** | PASS |
| `meeting-decisions` (created by a fresh executor with `skill-creator`) | [meeting-decisions-judge.md](2026-11-16/meeting-decisions-judge.md) | **90/100** | PASS |

## Caveats

- No no-skill baseline was run for the applied checks. The audits are evidence of usability and review quality, not a causal benchmark.
- Local filesystem paths in the reports were replaced with placeholders for publication; findings and scores are unchanged.
- The `design-md-prototype` report reviews both the skill and its applied package. The judge received a packet with a one-line withholding notice where the applied judge report now sits; the published archive restores the full 93/100 report for link integrity. The judge did not see that report. Exclude both copies from future blind packets.
- A separate, earlier clean-skill review scored 92/100 before several fixes; it is preserved in [`docs/evals/design-md-prototype/`](../evals/design-md-prototype/judge-skill-review-final.md). The applied package was later re-judged at 93/100.
- Historical reports describe the state of the artifacts at review time. Publication-only corrections are listed in [`CORRECTIONS.md`](../evals/design-md-prototype/iteration-1/gojek-applied/CORRECTIONS.md).

The audit used the [agentskills.io specification](https://agentskills.io/specification), the [Agent Skills best practices](https://agentskills.io/skill-creation/best-practices), the [evaluating skills guide](https://agentskills.io/skill-creation/evaluating-skills), Anthropic's [`skill-creator`](https://github.com/anthropics/skills/tree/main/skills/skill-creator), and the [Google Labs DESIGN.md spec](https://github.com/google-labs-code/design.md).
