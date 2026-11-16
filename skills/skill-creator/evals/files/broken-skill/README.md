# Broken skill fixture

This folder is an intentionally invalid skill used by the `skill-creator` audit eval. It must never be installed or treated as a real skill.

To run the audit eval:

1. Copy this folder to a scratch directory.
2. Rename `SKILL.md.fixture` to `SKILL.md`.
3. Run the eval prompt from `evals/evals.json` (case 2) against the scratch folder.

The fixture keeps its broken `name`, vague description, dangling `references/checklist.md` reference, and missing evals. Do not “fix” the fixture in place; the audit is supposed to find those defects.
