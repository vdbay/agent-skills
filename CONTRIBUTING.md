# Contributing

Thanks for improving these skills. The bar is deliberately high: a skill is a behavior change, not a topic summary.

## Before you start

- Read the [Agent Skills specification](https://agentskills.io/specification) and the bundled `skills/skill-creator/references/spec-checklist.md`.
- Open an issue for a new skill or a scope change. One coherent unit of work per skill.
- Keep changes compatible with the existing layout: `skills/<name>/SKILL.md`.

## Adding or changing a skill

1. **Name and scope.** Lowercase letters, digits, and hyphens; the folder name must equal the frontmatter `name`. Describe one job the agent could not reliably do before.
2. **Description.** Under 1024 characters. Say what the skill does and, more importantly, when to use it. Include realistic trigger phrases and an explicit boundary.
3. **Progressive disclosure.** Keep `SKILL.md` lean. Move deep material to `references/`, deterministic helpers to `scripts/`, and templates to `assets/`. Explain when to read each one.
4. **Scripts.** No third-party dependencies unless unavoidable. No telemetry, hidden network calls, credential collection, or destructive commands. Document every write target.
5. **Evals.** Add realistic prompts to `evals/evals.json`, with assertions that can be checked. If you run an evaluation, put the record in `docs/evals/<skill>/`, never inside the installed skill folder.
6. **Evidence.** Official sources first. Record retrieval dates, licenses, conflicts, and assumptions. “Not run” is a valid result; invented results are not.

## Validate

Run the same gates as CI from the repository root:

```bash
node skills/skill-creator/scripts/validate-skill.mjs skills/<name> --strict

for f in $(find skills -name '*.mjs'); do node --check "$f"; done

node -e "const fs=require('fs'); for (const f of process.argv.slice(1)) JSON.parse(fs.readFileSync(f,'utf8'))" \
  skills/skill-creator/evals/evals.json \
  skills/design-md-prototype/evals/evals.json
```

If you change `design-md-prototype`, also run the archived artifact check:

```bash
node skills/design-md-prototype/scripts/validate-artifacts.mjs \
  docs/evals/design-md-prototype/iteration-1/gojek-applied/with_skill/outputs --strict
```

Optional official check:

```bash
skills-ref validate skills/<name>
```

## Install-size rule

Everything under `skills/<name>/` ships to users. Do not add screenshots, judge packets, large reports, caches, or build output there. Put evidence in `docs/` and link it from the skill README.

## Pull requests

- Keep the diff focused.
- Say what you validated and what you did not run.
- Include before/after evidence for behavior changes.
- Update `CHANGELOG.md` for user-visible changes.
- Do not bump a skill's `metadata.version` in a drive-by change; versions move when the skill behavior changes.

## Style

- Markdown: sentence case headings, fenced code blocks with a language, one sentence per line is welcome but not required.
- Scripts: dependency-free ES modules, Node 18+, `node:` imports, clear errors, no silent overwrites.
- No em dashes as a substitute for structure; use them only where they read naturally.
- Keep line endings LF and files UTF-8 without a BOM.

## Reporting problems

Use GitHub issues for bugs and documentation gaps. For security issues, follow [`SECURITY.md`](SECURITY.md).
