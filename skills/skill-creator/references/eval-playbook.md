# Evaluation playbook

Use this when a skill can be tested by running it. The point is not to produce a beautiful benchmark; it is to learn whether the skill changes behavior and where it fails.

## 1. Write realistic test cases

Start with 2–3 prompts in `evals/evals.json`:

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "A realistic user message with context, file paths, and an actual goal.",
      "expected_output": "A human-readable description of success.",
      "files": [],
      "assertions": []
    }
  ]
}
```

Vary phrasing and difficulty. Include at least one boundary case, one casual request, and one prompt that names the domain indirectly. Use real file names, column names, and constraints.

Add assertions after the first outputs exist. Good assertions are observable and specific:

- "The output includes `DESIGN.md` and it passes the official lint with zero errors."
- "Both HTML files are standalone and contain no external scripts."
- "The mobile layout has no horizontal overflow at 390 px."
- "The report cites at least two official sources with URLs."

Weak assertions: "The output is good", "The design is beautiful", "The code works".

## 2. Isolate runs

Each run must start fresh. Give the executor only:

- skill path
- test prompt
- input files
- output directory

Do not give it the conversation that produced the skill, the judge rubric, or the previous output. If the executor can see the author's reasoning, the test is contaminated.

Run **with skill** and **without skill** (or with the previous version) in parallel when possible. For the baseline, omit the skill path. Save outputs under separate directories.

```text
workspace/iteration-1/eval-<name>/
├── with_skill/
│   ├── outputs/
│   ├── timing.json
│   └── grading.json
└── without_skill/
    ├── outputs/
    ├── timing.json
    └── grading.json
```

`timing.json` is optional but useful: `{ "total_tokens": 0, "duration_ms": 0 }`. Record it when the environment exposes it.

## 3. Grade

Mechanical checks belong in scripts:

- files exist and parse
- required sections or fields exist
- lint/build/test commands exit zero
- links and IDs resolve
- no external assets when standalone is required
- responsive overflow and console errors where a browser is available

Qualitative checks belong with an independent judge. Give the judge the task, the artifact, and `references/judge-rubric.md`; do not tell it which run used the skill. Require evidence (file names, quotes, measurements), not just scores.

A grading record:

```json
{
  "assertion_results": [
    {
      "text": "The output includes a valid DESIGN.md",
      "passed": true,
      "evidence": "Found DESIGN.md; official lint returned 0 errors, 0 warnings."
    }
  ],
  "summary": { "passed": 1, "failed": 0, "total": 1, "pass_rate": 1.0 }
}
```

## 4. Compare

Aggregate per configuration:

```json
{
  "run_summary": {
    "with_skill": { "pass_rate": { "mean": 0.9, "stddev": 0.0 } },
    "without_skill": { "pass_rate": { "mean": 0.4, "stddev": 0.0 } },
    "delta": { "pass_rate": 0.5 }
  }
}
```

With few runs, report raw counts rather than pretending the standard deviation is meaningful. Read the transcripts too: a run can pass while wasting most of its time on a wrong approach.

## 5. Diagnose the skill

For every failure, classify:

| Symptom | Likely fix |
| --- | --- |
| Agent ignored the workflow | Make the first step and the output contract clearer |
| Agent followed a bad path | Remove the option or explain why the default matters |
| Agent wrote the same helper again | Bundle and test the helper |
| Agent produced plausible but unverified work | Add a validator and a "do not proceed" gate |
| Output differs each run | Tighten ambiguous instructions; add an example |
| Agent loads too much context | Move detail into a conditional reference |
| Skill never triggers | Improve the description, not the body |

Change one or two root causes at a time. Rerun the same prompts in a new iteration. Generalize; do not paste the test output into the skill.

## 6. Trigger evaluation

Create about 20 queries:

```json
[
  { "query": "I need a design.md for our fintech brand and a working prototype", "should_trigger": true },
  { "query": "Can you review this Figma file for spacing?", "should_trigger": false }
]
```

- Positives: 8–10, varied phrasing, indirect requests, multi-step work.
- Negatives: 8–10 near-misses that share words or tools but need a different capability.
- Split ~60% train / 40% validation, fixed across iterations.
- Run each query 3 times if possible; report trigger rate.
- Improve from train failures only; select the best description by validation score.
- A skill should not trigger on trivial one-step work that the agent can already do; that is not evidence of quality.

## 7. Blind comparison (optional)

When comparing two versions, anonymize outputs A/B and give both to an independent judge with the same rubric. Do not reveal which version is "new". Analyze the reason for the winner, not just the score. This is useful when both versions pass all assertions but differ in craft.

## 8. Stop criteria

Stop when:

- the important assertions pass consistently,
- the judge reports no critical issues,
- a fresh held-out prompt does not regress,
- and further edits are not making a meaningful difference.

Report what was tested, what passed, what remains uncertain, and the exact paths to evidence. Do not claim human review or browser verification that did not happen.
