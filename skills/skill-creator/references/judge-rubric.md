# Skill judge rubric

Use this rubric when an independent judge reviews a skill. The judge should receive the skill folder, an optional task/output pair, and this rubric. Do not tell it who wrote the skill or which run was assisted.

Score each category from the evidence in the folder. A high score without evidence is invalid. Total 100 points.

| Category | Points | What earns points |
| --- | ---: | --- |
| Trigger and scope | 15 | Description says what and when, uses realistic user language, has a clear boundary, and is ≤1024 chars. Scope is one coherent unit. |
| Spec compliance | 15 | Valid frontmatter, name matches directory, body structure is clear, optional fields are used correctly, references resolve, packaging is valid. |
| Instruction quality | 20 | Workflow is specific and actionable; explains non-obvious decisions; handles failure and edge cases; avoids generic filler; body is lean and readable. |
| Progressive disclosure and resources | 15 | Deep material lives in focused references; every resource has a "when to read" reason; scripts are deterministic and tested; assets are reusable; no broken or unreachable files. |
| Evaluation evidence | 15 | Realistic evals exist; with/without or previous-version comparison is documented; assertions are objective; judge evidence is independent; limitations are stated. |
| Reliability and safety | 10 | No hidden destructive behavior, secrets, malware, or surprising network calls; validation loop; output contract is stable; failure modes are explicit. |
| Maintainability and handoff | 10 | README, version, license, install/test instructions, known limitations, and a clear next iteration. A future author can change one thing without breaking the rest. |

## Critical fails

A critical fail caps the total at 60 and must be stated explicitly, regardless of other scores:

- Invalid or missing frontmatter; `name` does not match the directory.
- Description missing, empty, or over 1024 characters.
- Malware, credential harvesting, hidden exfiltration, or instructions that contradict the skill's stated purpose.
- Destructive or irreversible behavior without a clear warning and confirmation.
- No way to verify the core output when verification is feasible.
- Broken resource references that make the skill unusable.
- The skill only works if the executor has the author's conversation context.

## Required judge output

```markdown
# Skill review — <name>

**Verdict:** PASS / REVISE / FAIL
**Score:** <n>/100
**Critical fails:** none / <list>

## Evidence by category
| Category | Score | Evidence |
| --- | ---: | --- |
| Trigger and scope | /15 | ... |
| Spec compliance | /15 | ... |
| Instruction quality | /20 | ... |
| Progressive disclosure and resources | /15 | ... |
| Evaluation evidence | /15 | ... |
| Reliability and safety | /10 | ... |
| Maintainability and handoff | /10 | ... |

## What works
- ...

## What to fix next
1. ... (specific file, section, and expected change)
2. ...

## Checks run
- `node scripts/validate-skill.mjs ...` → ...
- `skills-ref validate ...` → ...
- Fresh-context test: ...
```

## Judge behavior

- Read the files yourself; do not rely on the author's summary.
- Quote concrete lines or give file paths for every major claim.
- Distinguish "not present" from "not verified".
- Do not reward length. Reward decisions, evidence, and usability.
- If the skill has an output pair, judge both the skill and the output. A good output produced by an overfit skill is still a weak skill.
- Be willing to say PASS with a short list of non-blocking suggestions. Perfection is not the bar; reliable usefulness is.
