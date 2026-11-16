# Changelog

All notable changes to this repository are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses semantic versioning for skill behavior.

## 1.0.0 — 2026-11-17

### Added

- `skill-creator` 1.0.0: a spec-first workflow for creating, auditing, evaluating, and packaging Agent Skills.
  - Strict validator, scaffolder, and dependency-free `.skill` packager.
  - 100-point judge rubric, evaluation playbook, and description-trigger optimization.
  - Three realistic eval prompts and an intentionally invalid audit fixture.
- `design-md-prototype` 1.0.0: a research-and-craft workflow for Google Labs `DESIGN.md` systems plus two standalone HTML deliverables.
  - DESIGN.md schema, research protocol, showcase blueprint, judge rubric, and collaboration guide.
  - Dependency-free artifact validator and BOM-safe UTF-8 writer.
  - Four eval prompts covering single-property, multi-property, audit/fix, and vague-brief tasks.
- Public evaluation evidence under `docs/evals/`, including the applied Gojek study and 20 full-page screenshots.
- Independent audit reports under `docs/audits/`.
- GitHub Actions validation for both skills, bundled scripts, eval JSON, install size, and local-path leaks.
- Repository documentation: README, CONTRIBUTING, SECURITY, NOTICE, and MIT license.

### Changed

- Moved evaluation artifacts out of the installable skill folders to keep installs at about 222 KB.
- Normalized local filesystem paths in published evidence and corrected documented evidence labels; see `docs/evals/design-md-prototype/iteration-1/gojek-applied/CORRECTIONS.md`.
- Updated both skill READMEs with `npx skills add` instructions.
- Fixed the `skill-creator` frontmatter template, eval wording, and packaging skip rules.
- Removed a duplicate lint-failure instruction from `design-md-prototype/SKILL.md`.
