# Applied eval — Gojek, one company / two properties

**Prompt given to a fresh executor:**

> You are an independent builder. Use ONLY the Agent Skill at `<skill-dir>` as your workflow. Read its `SKILL.md` and the references it tells you to read. Do not inspect any previous design output or conversation. Do not ask questions; make defensible defaults and record assumptions.
>
> Create a unified design system and prototype package for **Gojek**, treating `gojek.com` (consumer super-app) and `gojek.io` (corporate/technology) as ONE company and ONE brand system. Do not produce two competing brands. Use the skill's "one token core + registers" model: a consumer register and a corporate/technology register, with shared identity and documented expression deltas.
>
> Output directory: `<out-dir>`. Deliver a valid `DESIGN.md` in the Google Labs format, a polished standalone `index.html`, a living `design-md.html`, `README.md`, `sources.md`, and `evidence/`. Official sources outrank clones. No copied logos, photography, proprietary fonts, invented metrics, testimonials, or press quotes. The HTML must work from disk and be accessible and responsive.
>
> Official starting points: `https://asphalt.gojek.io/`, `https://gojek.design/`, `https://www.gojek.com/`, `https://gojek.io/` (may return 429; record it), the official Gojek brand guidelines PDF, `https://blog.gojek.io/`, and first-party GitHub repositories sorted by stars. Third-party material is supporting only.

**Skill path:** `<skill-dir>`

**Executor context:** fresh subagent; it did not receive the skill-authoring conversation or any prior Apple/Material design output.

**Output:** `with_skill/outputs/` (DESIGN.md, both HTML files, README, sources, evidence) and `with_skill/screenshots/` (20 full-page captures).

**Judge:** `with_skill/judge-report.md` — independent judge, only the task, artifacts, and rubric. Final recorded verdict: PASS, 93/100, no critical fails.

**Baseline:** not run. This was an applied production task with a real brand, not a controlled A/B benchmark. The absence of a no-skill baseline is recorded as a limitation, not hidden.
