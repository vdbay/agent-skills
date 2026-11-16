# Documentation

This folder holds repository-level documentation and evidence. Nothing here is installed by `npx skills`; the installable payload is only `skills/`.

- [`audits/`](audits/) — independent judge reports for the skills and a candidate created with `skill-creator`.
- [`evals/`](evals/) — applied evaluation runs, screenshots, and judge packets.
- [`assets/`](assets/) — preview images used by the README.

## Why evidence lives here

A skill folder is downloaded into a user's project. Screenshots, judge packets, and audit papers are valuable to maintainers but are dead weight at install time. Keeping them in `docs/` gives the repository a full evidence trail while keeping the install payload at about 222 KB.

## What the evidence proves — and what it does not

The records show that fresh agents produced usable artifacts with these skills, and that independent judges scored them. They are **not** a controlled causal benchmark: no no-skill baseline or token/time comparison was run. Each record states that limitation explicitly. Do not turn an applied score into a causal claim.

See the [root README](../README.md) for the current gates and commands.
