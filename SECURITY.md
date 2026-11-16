# Security policy

## Supported versions

Security fixes are applied to the latest commit on `main`. There are no maintained release branches.

## Reporting a vulnerability

Please use GitHub's **private vulnerability reporting** on this repository (Security → Report a vulnerability). Do not open a public issue for a suspected vulnerability.

Include:

- The affected skill, script, or file.
- A minimal reproduction or proof of concept.
- The impact: data exposure, arbitrary code execution, destructive behavior, prompt injection, or hidden network access.
- Any suggested fix.

You can expect an initial response within a few days. This is a volunteer project, so timelines are best-effort.

## Scope

In scope:

- Bundled scripts in `skills/*/scripts/`.
- Instructions that could cause credential collection, data exfiltration, destructive filesystem operations, or hidden network calls.
- Skill content that could be used for prompt injection against a user or agent.
- Accidental secrets or private data committed to the repository.

Out of scope:

- Vulnerabilities in the `skills` CLI, `@google/design.md`, or other third-party tools. Report those upstream.
- Issues caused by installing an untrusted skill from another repository.
- The Gojek brand study being unofficial; that is disclosed in [`NOTICE.md`](NOTICE.md).

## Good practices for users

- Review a skill before installing it. A skill is executable instruction, not passive documentation.
- Prefer `npx skills add <source> --skill <name>` so you know exactly what is installed.
- Run skills in a workspace with appropriate permissions and secrets isolation.
- Keep dependencies and agent clients up to date.
