# design-md-prototype

Create a validated **DESIGN.md** design system and two **standalone HTML** deliverables from any brand, product, or multi-property brief.

This is a method skill, not a template pack. It teaches an agent to research official sources, build one token core, encode it in Google Labs' DESIGN.md format, prove it with a marketing/prototype page and a living spec page, and hand off a package that an independent judge can verify.

## What it produces

```text
<out>/
├── DESIGN.md
├── index.html
├── design-md.html
├── README.md
├── sources.md
└── evidence/
    ├── lint.json
    ├── export.css
    ├── static-check.json
    ├── browser-check.md
    └── lighthouse-*.json   # optional
```

- `DESIGN.md` — official YAML tokens plus the eight canonical prose sections, linted with `@google/design.md`.
- `index.html` — a polished marketing site or product prototype in the brand's visual language.
- `design-md.html` — a living spec/showcase with tokens, type, layout, elevation, shapes, components, motion, do's/don'ts, and a real source excerpt.
- `README.md`, `sources.md`, and `evidence/` — provenance, rights, assumptions, and verification.

## Install

Install with the Agent Skills CLI (recommended):

```bash
npx skills add vdbay/agent-skills --skill design-md-prototype
```

Add `-g` to install for all projects, or omit `--skill` to choose from both skills. You can also copy this folder into your client's skills directory:

- VS Code / generic: `.agents/skills/design-md-prototype/`
- OpenCode: the skills path configured for the session
- Claude: the configured skills directory

Or point an agent at this folder and tell it to follow `SKILL.md`.

## Verify before you install

A skill runs with your agent's permissions, so check what you are installing:

- Review the source at <https://github.com/vdbay/agent-skills> — read `SKILL.md` and `scripts/` before installing.
- Check [`SECURITY.md`](https://github.com/vdbay/agent-skills/blob/main/SECURITY.md) for how to report a problem.
- Pin to a known state: `skills-lock.json` records the exact commit installed. Compare it against a published [release](https://github.com/vdbay/agent-skills/releases) before updating with `npx skills update`.

## Use

Give the agent a brief, a product URL, or a set of official sources. A useful request:

> Build a DESIGN.md and a standalone marketing prototype for our company. We have three customer-facing properties; use one system with registers. Cite official sources, lint the DESIGN.md, and include the verification evidence.

The agent should fill `assets/site-brief.template.md`, research official sources, write one token core, build both pages, run the official lint/export and the bundled static validator, then submit a blind judge packet.

## Files

| File | Purpose |
| --- | --- |
| `SKILL.md` | The workflow, gates, gotchas, and reference map. |
| `references/design-md-spec.md` | Condensed official schema, sections, token rules, CLI, and links. |
| `references/research-protocol.md` | Source hierarchy, GitHub star/license method, conflicts, rights, multi-property registers. |
| `references/showcase-blueprint.md` | Section architecture and interaction/accessibility/responsive contracts for both HTML files. |
| `references/judge-rubric.md` | 100-point rubric, critical fails, hard pass, required judge output. |
| `references/collaboration.md` | Researcher/builder/verifier/judge roles, handoff packets, context isolation, solo mode. |
| `assets/DESIGN.template.md` | Generic starter; replace every placeholder. |
| `assets/site-brief.template.md` | Intake form with sources, rights, scope, and acceptance criteria. |
| `assets/judge-report.template.md` | Blank judge report; do not prefill scores. |
| `scripts/validate-artifacts.mjs` | Dependency-free static checks for the handoff package. |
| `scripts/write-utf8.mjs` | BOM-free stdin → file helper for lint/export evidence. |
| `evals/evals.json` | Single-property, multi-property, audit/fix, and vague-brief test prompts. |
| Evaluation record (repo) | Applied Gojek run, 20 screenshots, and the independent 93/100 judge report: <https://github.com/vdbay/agent-skills/tree/main/docs/evals/design-md-prototype> |

## Validate the skill

The bundled strict validator lives in the sibling `skill-creator` skill. If it is installed:

```bash
node ../skill-creator/scripts/validate-skill.mjs . --strict
```

Optional official check, if `skills-ref` is installed:

```bash
skills-ref validate .
```

Validate a generated artifact package:

```bash
node scripts/validate-artifacts.mjs <out-dir> --strict
node scripts/validate-artifacts.mjs <out-dir> --json --out <out-dir>/evidence/static-check.json
```

The artifact validator checks required files, DESIGN.md frontmatter/sections/order/duplicate keys/token references, HTML standalone constraints, IDs/links/alt text, cross-links, dark-mode and responsive hints, placeholder copy, README/sources/evidence completeness, and token reuse. It has no third-party dependencies.

## Evaluation status

A real applied run is recorded in the repository at [`docs/evals/design-md-prototype/iteration-1/gojek-applied/`](https://github.com/vdbay/agent-skills/tree/main/docs/evals/design-md-prototype/iteration-1/gojek-applied). The evaluation record is kept outside the skill folder so installs stay lean.

- Fresh executor, skill path only; no author conversation.
- Gojek (`gojek.com` + `gojek.io`) as one brand with consumer and corporate registers.
- Official lint: 0 errors, 0 warnings; CSS export succeeded; strict artifact validator passed.
- 20/20 browser cells at 320/390/768/1024/1440 in light and dark; 0 console/page errors, 0 horizontal overflow.
- Lighthouse accessibility: 100/100 on both pages.
- Independent judge: PASS, 93/100, no critical fails.
- 11/11 objective assertions passed.
- **No no-skill baseline was run**; that limitation is recorded in `without_skill/NOT_RUN.md`. Treat this as an applied validation, not a causal benchmark.

The other prompts in `evals/evals.json` remain available for future isolated runs. Do not add scores without the reports.

## Known limitations

- The DESIGN.md format is **alpha**; the spec and CLI can change. Verify current docs before relying on a command.
- The official CLI is fetched through `npx`; network or registry access is required. If it is unavailable, the package can still be produced, but the official lint must be recorded as "not run" and the judge will score the gap.
- Browser verification requires a browser or Playwright. The skill does not bundle Playwright.
- Lighthouse is optional and may be unavailable in headless or locked-down environments.
- The judge is a structured reviewer, not a substitute for legal review, usability testing with real users, or a manual screen-reader audit.
- Proprietary fonts and trademarked assets require rights clearance. The skill defaults to fallbacks and neutral placeholders.

## Design principles

- Official sources first; third-party sources support, never define.
- One company, one token core; multi-property differences become registers.
- Brand palette and semantic roles are separate; accessibility is designed in.
- Standalone means one file, inline app code, and no build at view time.
- Evidence over claims; "not run" is honest, fabrication is a critical fail.
- The judge sees artifacts, task, and rubric — never the author's conversation.

## Attribution

The DESIGN.md format is published by Google Labs under Apache-2.0:
<https://github.com/google-labs-code/design.md>. This skill paraphrases the public format, links to the canonical source, and does not redistribute the upstream code or sample palette. The skill's original content is MIT-licensed; see `LICENSE`.

No third-party brand assets, logos, fonts, or photography are included.
