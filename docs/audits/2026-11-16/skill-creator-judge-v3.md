# Skill review - skill-creator

> Historical audit record. Local filesystem paths were replaced with placeholders when this report was published; findings and scores are unchanged. The intentionally invalid audit fixture is now stored as `SKILL.md.fixture` so the skills CLI and packager do not treat it as a real skill; copy it to a scratch folder as `SKILL.md` to reproduce the review.

**Verdict:** PASS
**Score:** 91/100
**Critical fails:** none

## Evidence by category

| Category | Score | Evidence |
| --- | ---: | --- |
| Trigger and scope | 15/15 | `SKILL.md:3` is 702 characters (measured), under the 1024 limit, and names both the capability and the activation contexts: creating, auditing, testing, improving, diagnosing triggers, optimizing descriptions, and packaging. It includes realistic user phrases ("make this reusable", "teach the agent our process", "review this skill", "compare against a baseline") and an explicit boundary ("Not for implementing an application's whole feature set or judging an artifact without a task or evaluation packet"). The scope is one coherent unit: the lifecycle of one portable skill. `SKILL.md:51` gives a useful scope test (two unrelated jobs are two skills). |
| Spec compliance | 15/15 | Frontmatter is valid, `name: skill-creator` matches the folder, and `license` / `compatibility` / `metadata` are within spec limits. `skills-ref validate` returned "Valid skill". The bundled validator returned PASS, 0 errors, 0 warnings under `--strict`. Every actual `references/`, `assets/`, `scripts/`, and `evals/` resource reference resolves (the skeleton assets contain intentional placeholders). A clean package of a generated skill contains `SKILL.md` at the archive root. `references/spec-checklist.md:18-27` accurately reflects the agentskills.io frontmatter rules; `:101-103` describes the zip layout correctly. |
| Instruction quality | 19/20 | The workflow is specific and ordered: Phase 0 framing (`SKILL.md:39-51`), research hierarchy (`:53-63`), design (`:65-100`), scaffold (`:102-120`), validate (`:122-138`), evaluate (`:140-166`), update (`:168-170`), improve (`:172-182`), trigger quality (`:184-188`), and package/handoff (`:190-204`). Non-obvious decisions are explained, e.g. why descriptions are triggers rather than summaries (`:69-71`), why references stay one level deep (`:84`), and why baselines and fresh contexts matter (`:140-166`). Failure handling is explicit for missing inputs, bad tools, and unverifiable values (`:99`), with an iteration loop (`:172-182`) and gotchas (`:219-227`). One point off: the skill recommends Node and `skills-ref` but does not say what to do when Node is unavailable or only `skills-ref` is missing; the candidate had to add that fallback itself. |
| Progressive disclosure and resources | 14/15 | Deep material is correctly split into four focused references (`spec-checklist.md`, `eval-playbook.md`, `judge-rubric.md`, `description-optimization.md`), and `SKILL.md:229-240` maps each resource with a reason. The three assets are reusable: a skill skeleton, an eval skeleton, and a judge-report template. The scripts are dependency-free Node scripts with deterministic content behavior (the packager stamps current timestamps, so archive bytes are not reproducible), and I tested the scaffolder, validator, and packager directly. No referenced file is missing or unreachable. One point off: `scripts/validate-skill.mjs:176-184` only resolves references found in the `SKILL.md` body, so a broken link in a reference file or a missing path in `evals.json.files` can still pass; and `assets/SKILL.template.md:5` puts a literal `compatibility: Optional. Only include real environment requirements.` value in the template, which is a misleading value if copied without editing. |
| Evaluation evidence | 9/15 | Three realistic prompts exist in `evals/evals.json` (`:3-39`), including a broken-skill fixture at `evals/files/broken-skill/SKILL.md` (name mismatch, short description, missing `references/checklist.md`). Assertions are mostly observable (`evals.json:9-13`, `:22-26`, `:33-36`), and `references/eval-playbook.md` documents isolation (`:35-58`), grading (`:62-88`), comparison (`:90-104`), diagnosis (`:106-120`), trigger evaluation (`:122-138`), blind comparison (`:140-142`), and stop criteria (`:144-153`). Limitations are stated in `README.md:61-72`. However, no actual with/without or previous-version result exists in the skill: there is no `evals/results/`, benchmark, or independent judge report, and `README.md:68-72` explicitly lists running the three prompts as "Next iteration". The candidate README documents fresh-context smoke runs and says the without-skill baseline was not run, so there is applied evidence but not a controlled comparison. |
| Reliability and safety | 9/10 | No script makes network calls, and there is no destructive default. `scripts/package-skill.mjs:49-51` refuses `.env`, `.env.*`, `credential*`, `.pem`, `.key`, and `id_rsa`; I verified refusal for `.env.local` and `credentials.json`, both exit 1 with no archive written. `scripts/validate-skill.mjs:186-192` and `:215-235` scan for common secret patterns and sensitive filenames. The skill has a real validation loop (`SKILL.md:122-138`), a quality-gate checklist (`:206-217`), and explicit "no surprise" safety language (`:24`). One point off: the filename guard is not exhaustive (e.g. `id_ed25519`, `*.p12`, `*.pfx`, or arbitrary `*secret*` files are not named), `--force` can overwrite generated files, and the skill does not spell out a no-Node fallback. |
| Maintainability and handoff | 10/10 | `README.md` covers purpose, install locations, validate/package commands, file map, update guidance, known limitations, next iteration, and license. `metadata.version: "1.0.0"` is present, `LICENSE` is included, and the structure is modular: references, assets, and scripts are independently replaceable. `SKILL.md:168-170` preserves the original name and directory when updating and recommends snapshotting before edits. The `README.md:68-72` next-iteration list is concrete. A future author can change one reference or one script without rewriting the body. |

Hard-pass check: 91 ≥ 85, the lowest category is Evaluation evidence at 9/15 (60%), and there are no critical fails.

## What works

- **Spec accuracy with real enforcement.** The frontmatter, naming, description length, optional fields, and progressive-disclosure rules match the official specification. Both the bundled validator and the official `skills-ref` pass the skill cleanly.
- **A workflow that makes decisions, not just lists steps.** The phase model covers framing, research, design, scaffolding, validation, isolated evaluation, improvement, trigger testing, and packaging. It explains *why* a description is a trigger, why a reference should be conditional, and why a fresh context matters.
- **Useful tooling, tested.** `new-skill.mjs` creates a valid skill, refuses a folder/name mismatch (exit 2), refuses to overwrite without `--force`, and copies a working validator into the new skill. `validate-skill.mjs` catches the broken fixture's name mismatch and missing reference. `package-skill.mjs` produces a readable zip with `SKILL.md` at the root, skips workspace/output junk, and refuses `.env.local` and `credentials.json`.
- **Strong evaluation methodology.** `references/eval-playbook.md` is aligned with the official evaluation guidance: realistic prompts, fresh with/without runs, objective assertions, grading evidence, raw counts when runs are few, transcript review, trigger train/validation splits, and blind comparison. It explicitly warns against pretending standard deviation is meaningful with few runs.
- **Safety is treated as part of the skill, not an afterthought.** The operating stance forbids malware, credential collection, hidden network calls, and contradictory instructions; the packager and validator add concrete checks; the handoff tells the author to inspect the archive for secrets.
- **Usability evidence.** The candidate `meeting-decisions` skill is a credible fresh-executor output: it passes both validators, has a fixed output template, two realistic fixtures, a 579-line deterministic output validator, a README with limitations, and a `Validation performed` section that honestly says the baseline was not run. This is good evidence that the skill-creator can be used without the author's conversation context.

## What to fix next

1. **Add executed eval evidence to the skill itself** (`evals/`, `README.md:68-72`). Create `evals/results/iteration-1/` (or a sibling `skill-creator-workspace/`) with the three prompts run once with and once without the skill, raw pass counts, and at least one independent judge report. Add a `Validation performed` section to `README.md` with paths to the artifacts, move completed items out of `Next iteration`, and keep the remaining next steps. Also add a small trigger-eval set for skill-creator's own description (the method is already in `references/description-optimization.md`), because the current README says this is still unrun.
2. **Harden the local validator** (`scripts/validate-skill.mjs:176-184`). Resolve relative links in `references/*.md` and `README.md`, and verify that every path in `evals/evals.json`'s `files` arrays exists. Support inline YAML metadata maps such as `metadata: {version: "1.0.0"}` or downgrade that case to a note; I confirmed the current strict mode fails a skill that `skills-ref` accepts. Remove the unused CRC32 helper (`:109-116`) while touching the file.
3. **Remove template footguns** (`assets/SKILL.template.md:5`, `assets/evals.template.json:9-11`). The template currently contains a literal compatibility value ("Optional. Only include real environment requirements.") that is syntactically valid and can ship as misinformation; use a YAML comment or omit the field. Replace the placeholder assertion in `assets/evals.template.json:9-11` and the copied placeholder in `scripts/new-skill.mjs:120` with a clearly non-final comment/example or omit it, so a copied template cannot produce a meaningless passing assertion.
4. **Close the remaining safety and fallback gaps** (`scripts/package-skill.mjs:44-58`, `SKILL.md:122-138`, `:190-204`). Extend sensitive-name detection to `id_ed25519`, `*.p12`, `*.pfx`, and names containing `secret`/`token`, or run the validator's content scan before packaging. In the body, state explicitly: if Node is unavailable, use `references/spec-checklist.md` manually and say validation was not run; do not claim a pass. Mention that `--force` overwrites generated files and that an existing `.skill` archive is replaced.
5. **Make the audit eval test diagnosis rather than confirmation** (`evals/evals.json:17-21`). The prompt already enumerates the name mismatch, short description, missing reference, and missing evals, so the eval mostly checks that the agent follows instructions. Change it to a blind audit prompt ("Audit this skill folder and fix what is wrong without changing what it is trying to do") and keep the same fixture; the existing assertions can still verify the findings and preservation.

## Checks run

- `node <skill-creator-dir>\scripts\validate-skill.mjs <clean-skill-dir> --strict` → **PASS**, 0 errors, 0 warnings.
- `node <skill-creator-dir>\scripts\validate-skill.mjs <candidate-skill-dir> --strict` → **PASS**, 0 errors, 0 warnings.
- `node --check` on `new-skill.mjs`, `package-skill.mjs`, `validate-skill.mjs`, and the candidate's `validate-output.mjs` → all **OK**.
- `skills-ref validate` (available via `npx`) on the skill → **Valid skill**; on `meeting-decisions` → **Valid skill**; on `evals/files/broken-skill` → **failed**, correctly, on the directory/name mismatch.
- Scaffolder in a fresh temp directory: created `demo-skill` with `SKILL.md`, `README.md`, `evals/evals.json`, and `scripts/validate-skill.mjs`; the generated README contains install and test instructions; the generated validator passes the generated skill; `skills-ref` accepts it.
- Scaffolder mismatch: target `wrong-folder` with `--name right-name` → **exit 2**, "Target folder must be named..."; no files created.
- Scaffolder overwrite: rerun without `--force` → **exit 2**; rerun with `--force` → **exit 0**.
- Packaging refusal: `.env.local` → **exit 1**, "Refusing to package sensitive file", no archive; `credentials.json` → **exit 1**, no archive.
- Packaging success: clean package → 4 entries (`SKILL.md`, `README.md`, `evals/evals.json`, `scripts/validate-skill.mjs`), `SKILL.md` at archive root, `Expand-Archive` succeeds; `eval-workspace` and `my-workspace` directories are skipped.
- Broken fixture: `validate-skill.mjs` → **FAIL**, 2 errors (name mismatch, missing `references/checklist.md`) and 3 warnings, as intended.
- Edge case: a skill with inline `metadata: {version: "1.0.0"}` is **valid per `skills-ref`** but is warned/failed by the local strict validator; this is the documented "not a full YAML parser" limitation, and a candidate fix is listed above.
- Candidate inspection: `meeting-decisions` passes both validators; its output validator runs and rejects an intentionally malformed brief; its `README.md:61-67` claims fresh-context smoke runs and a fixed locator issue, but those run artifacts are not shipped.
- Fresh-context evidence: `executor-skill-creator/task.md` is a fresh-executor task that points only at this skill; the resulting `meeting-decisions` folder is the applied output inspected here. I did not independently re-run the three skill-creator evals.

## Verified vs not verified

**Verified directly**

- Frontmatter, name/directory match, description length, optional fields, body size, and resource resolution.
- `skills-ref` and the local strict validator on both the skill and the candidate.
- All scripts parse with `node --check`.
- Scaffolder success, folder/name mismatch refusal, overwrite refusal and `--force` behavior, generated README, and generated validator.
- Packaging refusal for `.env.local` and a credentials file; clean zip contents and root `SKILL.md`; workspace-directory exclusion.
- The broken fixture fails for the intended reasons.
- The candidate output's structure, scripts, and validator behavior; its README's honest limitation statement.

**Not verified**

- Actual execution of the skill's three prompts with and without the skill; no `evals/results/` or benchmark exists.
- An independent judge report for skill-creator itself.
- The candidate README's claimed fresh-context smoke runs; the outputs and transcripts are not shipped.
- Semantic correctness of the candidate's meeting extraction; only its structure and validator behavior were checked.
- A real trigger-eval run for skill-creator's own description.
- The exact `skills-ref` package version (it was invoked through `npx`, not a pinned local install).
- Behavior of the scaffolder/packager on operating systems other than this Windows environment; the scripts are Node-only and path-normalized, but cross-platform execution was not tested.

**Not present (as opposed to not verified)**

- No `evals/results/`, `benchmark.json`, or equivalent run evidence in the skill.
- No trigger query set for skill-creator's own description.
- No packaged `.skill` artifact in the skill folder (packaging was tested in a temp copy).

## Residual risk

- The skill can produce structurally valid skills without proving they change behavior; its own README acknowledges this and schedules the real eval run as the next iteration.
- The local validator is intentionally lightweight; a valid inline-metadata skill can fail strict mode, and broken links outside `SKILL.md` can pass. Run `skills-ref` in addition to the local check.
- The packaging guard is filename/pattern-based; a generic secret file with an unusual name could still be included. The human archive inspection in `SKILL.md:196` remains necessary.
- The candidate demonstrates usability but is not a controlled benchmark; do not treat its `Validation performed` claims as a substitute for a with/without result.
