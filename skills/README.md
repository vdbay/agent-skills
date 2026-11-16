# Skills

Both folders are installable [Agent Skills](https://agentskills.io/specification). Install them through the repository root:

```bash
npx skills add vdbay/agent-skills
```

The `design-md-prototype` workflow and artifact validator are self-contained; its optional strict structure validator lives in the sibling `skill-creator` skill. Both skills pass the bundled validator and the official `skills-ref` check when run from this repository.

| Folder | What it does |
| --- | --- |
| [`skill-creator/`](skill-creator/) | Create, audit, evaluate, and package portable Agent Skills. |
| [`design-md-prototype/`](design-md-prototype/) | Build a Google Labs `DESIGN.md`, a standalone prototype, and a living spec page. |

Each skill contains:

- `SKILL.md` — frontmatter plus the workflow the agent loads on activation.
- `references/` — deep material loaded only when needed.
- `assets/` — copyable templates.
- `scripts/` — dependency-free helpers, where the job benefits from determinism.
- `evals/` — realistic prompts and fixtures. Applied evidence lives in the repository's [`docs/evals/`](../docs/evals/), not here, so installs stay lean.

See the [root README](../README.md) for usage, evidence, and quality gates.
