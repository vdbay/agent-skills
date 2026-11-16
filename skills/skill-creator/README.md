# skill-creator

Create, audit, test, and improve portable **Agent Skills** in the [agentskills.io](https://agentskills.io/specification) format. Inspired by Anthropic's [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator), but self-contained and client-agnostic.

## What it does

- Turns a real workflow into a reusable skill
- Enforces the official frontmatter and directory constraints
- Keeps context lean with progressive disclosure
- Adds scripts, references, templates, and evals only when they earn their place
- Runs isolated with-skill / baseline tests and independent judges
- Optimizes descriptions with train/validation trigger sets
- Packages a portable `.skill` archive

## Install

Install with the Agent Skills CLI (recommended):

```bash
npx skills add vdbay/agent-skills --skill skill-creator
```

Add `-g` to install for all projects, or omit `--skill` to choose from both skills. You can also copy the folder into your client's skills directory:

- VS Code / generic: `.agents/skills/skill-creator/`
- Claude: the configured skills directory
- OpenCode: the skills path configured for the session

Or point any agent at this folder and tell it to follow `SKILL.md`.

## Validate

```bash
node scripts/validate-skill.mjs . --strict
```

Optional official check:

```bash
skills-ref validate .
```

## Package

```bash
node scripts/package-skill.mjs .
```

Packaging excludes `evals/results/` and `evals/files/`, so evaluation results and the intentionally broken fixture do not ship in the `.skill` archive.

## Files

- `SKILL.md` — workflow
- `references/spec-checklist.md` — exact format constraints
- `references/eval-playbook.md` — isolated evaluation method
- `references/judge-rubric.md` — 100-point independent review
- `references/description-optimization.md` — trigger testing
- `scripts/new-skill.mjs` — scaffold
- `scripts/validate-skill.mjs` — local validator
- `scripts/package-skill.mjs` — `.skill` zip
- `assets/` — copyable templates
- `evals/evals.json` — three realistic test prompts
- `evals/files/broken-skill/` - intentionally invalid audit fixture stored as `SKILL.md.fixture` so discovery never treats it as a real skill; copy it to a scratch folder as `SKILL.md` to run the audit eval. The packager excludes `evals/files/`.
- Evaluation record (repo) — applied evidence and independent scores: <https://github.com/vdbay/agent-skills/tree/main/docs/evals/skill-creator>

## Updating an existing skill

Preserve the original `name` and directory name. Snapshot the installed skill, copy it to a writable location if necessary, edit the copy, and validate the copy. Do not create a `-v2` name just to version it; use version control or metadata. Re-run the same evals and compare against the previous version before replacing the installed skill.

## Known limitations

- The official format is evolving; re-check the agentskills.io spec and `skills-ref` before freezing a workflow.
- The local validator is a fast structural check, not a full YAML parser or an official replacement.
- The skill provides an eval method and templates, but it does not bundle an eval viewer or a benchmark aggregator; use the client's subagents/runner and record raw results.
- Trigger optimization depends on the target client's ability to report which skill was loaded.

## Next iteration

- Run the three prompts in `evals/evals.json` with and without the skill and record the results under the repository's `docs/evals/skill-creator/` folder.
- Verify the packaging output with a zip reader after any change to `package-skill.mjs`.
- Add a real trigger-eval run in the target client; the current description optimization guidance is client-agnostic.

## License

MIT. The format specification and linked official documentation belong to their respective owners.
