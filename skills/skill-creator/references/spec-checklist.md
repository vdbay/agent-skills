# Agent Skills spec checklist

Authoritative source: <https://agentskills.io/specification>. Retrieved 2026-11-16.

## Minimum shape

```text
skill-name/
├── SKILL.md          # required
├── scripts/          # optional executable helpers
├── references/       # optional on-demand docs
├── assets/           # optional templates and static resources
└── evals/            # recommended test prompts
```

A skill may contain other files and directories. The format does not require any particular body structure, but it does require valid YAML frontmatter followed by Markdown.

## Frontmatter

| Field | Required | Rules |
| --- | --- | --- |
| `name` | yes | 1–64 chars; lowercase `a-z`, `0-9`, hyphens; no leading/trailing hyphen; no consecutive `--`; must equal the directory name |
| `description` | yes | 1–1024 chars; say what the skill does and when to use it |
| `license` | no | Short license name or bundled license file |
| `compatibility` | no | 1–500 chars; only for real environment requirements |
| `metadata` | no | Map of string keys to string values |
| `allowed-tools` | no | Experimental, space-separated pre-approved tools |

Minimal:

```yaml
---
name: skill-name
description: What it does and when to use it. Use when the user asks ...
---
```

## Description quality

- It is the only thing loaded before activation. Treat it as the trigger, not a summary.
- Include user intent, domain terms, synonyms, and realistic contexts.
- Use imperative phrasing: "Use this skill when…".
- Add a boundary for near-misses if the skill is easily confused with an adjacent task.
- Keep it under 1024 characters. Do not paste the workflow into it.
- Prefer concrete user language over internal implementation names.

Good:

```yaml
description: Create and validate DESIGN.md design systems plus standalone HTML prototypes and living style-guide pages from a brand's official documentation. Use when the user asks for a DESIGN.md, design tokens, a brand system, a UI showcase, a prototype in a company's visual language, or wants to unify several properties under one company, even if they do not name the format.
```

Poor:

```yaml
description: Helps with design systems.
```

## Body

- Keep `SKILL.md` under 500 lines / roughly 5,000 tokens. The whole body loads when the skill activates.
- Explain the workflow, decision points, and failure handling.
- Prefer examples, templates, and validators over abstract advice.
- Put detailed reference material in `references/` and state exactly when to load each file.
- Keep file references one level deep from `SKILL.md`; avoid chains of references.
- Include a validation loop and a final quality checklist for fragile work.
- Do not duplicate what the model already knows. Add what it would get wrong without this skill.

## Scripts

- Self-contained or with documented dependencies.
- Helpful errors and non-zero exit codes on failure.
- Deterministic; no surprise network calls or destructive defaults.
- Test the script yourself before shipping it.
- Document the exact invocation in `SKILL.md`.

## Assets

Templates, starter files, images, and data that the agent should copy or fill. Keep them small and reusable. Do not put credentials or private data in assets.

## Security and trust

- No malware, exploit code, credential harvesting, hidden exfiltration, or instructions that contradict the description.
- Be explicit about destructive operations and require confirmation where appropriate.
- Do not make a skill that impersonates a person or hides its purpose.
- Do not include secrets, tokens, or private URLs.

## Validation checklist

- [ ] `SKILL.md` exists and has YAML frontmatter
- [ ] `name` matches the directory and the regex
- [ ] `description` is non-empty and ≤1024 characters
- [ ] optional fields meet their length rules
- [ ] body is non-empty and focused
- [ ] all relative references resolve
- [ ] scripts run and fail clearly
- [ ] no secrets, caches, or build junk
- [ ] `skills-ref validate <dir>` passes if available
- [ ] a fresh-context test works with only the skill path and task

## Packaging

A `.skill` archive is a zip of the skill directory with `SKILL.md` at the root of that directory. Exclude `.git`, `node_modules`, caches, temporary workspaces, and archives. The bundled `scripts/package-skill.mjs` creates a portable zip without third-party dependencies.
