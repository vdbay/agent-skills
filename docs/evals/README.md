# Evaluation evidence

Applied runs and judge packets for the skills in this repository.

| Skill | Record | Notes |
| --- | --- | --- |
| `skill-creator` | [`skill-creator/`](skill-creator/) | Fresh-context creation evidence and independent scores for the skill and a candidate. |
| `design-md-prototype` | [`design-md-prototype/`](design-md-prototype/) | Applied Gojek run, 20 screenshots, official gates, 93/100 judge, and archive corrections. |

## How to read this

- “Applied” means a fresh agent used the skill to produce a real package; it does **not** mean a controlled with/without benchmark.
- Every current score points to the report that produced it. Historical scores whose report was not archived are marked as such.
- “Not run” is recorded as “not run”. It is never replaced with an invented result.
- Screenshots and artifacts are demonstration material. The Gojek study is unofficial; see [`NOTICE.md`](../../NOTICE.md).

## Reproduce

1. Give a fresh executor only the skill path, the task prompt, inputs, and an output directory.
2. Run the skill's official gates and record raw output.
3. Give a different fresh judge only the task, artifacts, rubric, and no author conversation or prior scores.
4. Record the result without labels that reveal which run used the skill.
