# Applied evaluation — Gojek

This directory contains a real with-skill run of `design-md-prototype` on an applied, multi-property brand task.

> Publication note: local paths and a few evidence labels were corrected for the public repository. No score changed; see `CORRECTIONS.md`.

- `prompt.md` — the task given to the fresh executor.
- `with_skill/outputs/` — DESIGN.md, both HTML files, README, sources, evidence.
- `with_skill/screenshots/` — 20 full-page screenshots.
- `with_skill/judge-report.md` — independent judge packet result: **PASS, 93/100, no critical fails**.
- `with_skill/grading.json` — 11/11 objective assertions passed, with evidence.
- `without_skill/NOT_RUN.md` — baseline limitation.

## What this proves

The skill can take a real brand, use official sources, produce a lint-clean DESIGN.md with one token core and two registers, build two standalone HTML deliverables, record provenance and evidence, and pass an independent judge. It does not prove a causal benchmark against no skill because the baseline was not run.

## Reproduction

1. Give a fresh executor only the skill path, the prompt, and an output directory.
2. Run the official linter, CSS export, static validator, browser matrix, and Lighthouse.
3. Give a different fresh judge only the task, artifacts, and rubric.
4. Record the result without labels that reveal which run used the skill.
