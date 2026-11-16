# Collaboration and context isolation

The builder may work solo. The method must still be reproducible by a team, and the final quality claim must survive a fresh-context judge. This file defines the roles, the handoff contract, and the rule that makes the review honest.

## 1. Roles

| Role | Owns | Must not |
| --- | --- | --- |
| **Orchestrator** | Scope, register decision, schedule, final acceptance | Write the design tokens or judge the craft |
| **Researcher** | Source hierarchy, evidence table, conflicts, rights, GitHub stars/license | Choose the final palette or write production HTML |
| **Design architect / builder** | Design thesis, token core, DESIGN.md, both HTML files, evidence | Judge its own work as the final verdict |
| **Verifier** | Official lint, export, static validator, browser matrix, accessibility checks, evidence pack | Change the design direction without sending it back |
| **Judge** | Independent 100-point review against the rubric | Edit artifacts, see the author's conversation, or receive a suggested score |

Small teams can combine researcher and builder. Never combine builder and final judge in the same context.

## 2. Context isolation rule

A role receives only what it needs for its task:

- **Researcher:** brief, source-access constraints, output schema. No author's preferred palette.
- **Builder:** brief, approved source dossier, design constraints, output directory. No judge rubric scores, no previous failed outputs unless the task is explicitly a repair.
- **Verifier:** artifacts, acceptance checks, commands. No author's rationale or "what I meant".
- **Judge:** original task/brief, artifacts, rubric. **Nothing else.**

The judge must not receive:

- the conversation that produced the skill or the artifacts,
- the skill's evaluation labels ("with_skill", "baseline", "iteration-2"),
- previous scores or a target score,
- the author's explanation of why a choice is good,
- a list of known defects that tells it where to look,
- an A/B label that reveals which variant is new.

If the judge sees any of these, declare contamination and re-run with a clean packet. A contaminated score is not evidence.

## 3. Handoff packet

Write handoffs as files, not as chat context. A packet is self-contained.

```text
handoff/
├── task.md                 # original request, scope, non-goals, acceptance criteria
├── brief.md                # filled intake; assumptions and unknowns
├── sources.md              # evidence table, conflicts, rights
├── artifacts/
│   ├── DESIGN.md
│   ├── index.html
│   ├── design-md.html
│   ├── README.md
│   └── evidence/
└── checks.md               # commands, results, open issues (not for the judge)
```

### Handoff 1 — Orchestrator → Researcher

Include:

- Company/properties and the register question.
- Categories, regions, languages, and audiences in scope.
- Source constraints (public only, no gated content, no scraping).
- Required output: `sources.md` using the evidence table, GitHub table, conflicts, assumptions, rights.
- Deadline and stop rule: "return what is verifiable; label the rest as a gap."

Do not include a preferred color or a mood board. That biases the evidence.

### Handoff 2 — Researcher → Builder

Include:

- Approved `sources.md`.
- A one-paragraph synthesis: shared equity, tensions, and the recommended register model.
- Known gaps and assumptions.
- Rights constraints (fonts, logos, photography, testimonials).
- The brief and acceptance criteria.

The builder may challenge the synthesis, but must record the challenge and resolution.

### Handoff 3 — Builder → Verifier

Include:

- The artifact folder.
- The exact commands to run.
- The acceptance gates: lint 0 errors, export success, static check, browser matrix, no lorem/fake proof, rights.
- A list of deliberate exceptions (for example, a documented lint warning).
- No request to "make it pass". The verifier reports; the builder fixes.

### Handoff 4 — Verifier → Judge

Include only:

- `task.md` (original request and acceptance criteria).
- The artifact folder, excluding `evidence/judge/` and any previous judge report or score.
- `references/judge-rubric.md` (or a copy).
- A blank judge report template.

Do not include `checks.md`, the verifier's opinion, the builder's rationale, a previous judge score, or a list of expected defects. The judge may run its own checks. The artifact `README.md` may state validation outcomes and limitations, but must not contain a previous judge score.

### Handoff 5 — Judge → Orchestrator

The judge returns the completed report with:

- verdict, score, critical fails,
- contamination declaration,
- evidence per category,
- required fixes,
- unverified items.

The judge does not edit files. The builder fixes; the verifier rechecks; a fresh judge re-scores if the changes are substantive.

## 4. Judge protocol

1. **Blind the packet.** Remove folder names like `with_skill`/`baseline`, author names, git history, and comments that reveal the method. Keep only the task, artifacts, and rubric.
2. **Declare contamination.** The judge writes what it received and whether it saw any author context.
3. **Score independently.** Read the files, run checks where possible, and quote evidence. Do not accept the README's claims as proof.
4. **Check critical fails first.** A critical fail is an automatic FAIL; still complete the scorecard for diagnosis.
5. **Do not reward polish alone.** A beautiful page with fabricated provenance fails. A rigorous spec with a broken prototype fails delivery.
6. **Separate "not present" from "not verified".** Missing evidence is a gap, not proof that the underlying quality is absent; score evidence accordingly.
7. **Re-score after substantive changes.** Use a fresh judge packet. Do not let the first judge's score anchor the second.

### A/B comparison

If comparing two variants:

- Anonymize as A and B.
- Give both the same task and rubric.
- Score each independently before comparing.
- Do not reveal which is the new version or which used the skill.
- Report the reason for the difference, not just the winner.

## 5. Solo mode

A solo builder can still follow the method:

1. **Researcher pass:** fill `sources.md` before opening the design tool. Timebox it. Stop when the sufficiency gate passes or the gaps are explicit.
2. **Builder pass:** write the thesis, token core, DESIGN.md, and both pages. Keep a decision log in `README.md`.
3. **Verifier pass:** switch to a checklist mindset. Run the commands and browser matrix. Do not "just look at it".
4. **Fresh judge pass:** open a new session with only the task, artifacts, and rubric. Do not paste the build conversation. If a fresh session is impossible, use a different agent/model and state the limitation; self-review in the same context is not independent.

The solo path is slower but preserves the evidence chain. The failure mode is skipping the judge because "I already know it's good".

## 6. Parallel work

Safe parallelism:

- Multiple researchers on different source lanes (brand, product docs, standards, first-party repos) with one synthesis owner.
- Verifier can run static checks while the builder finishes copy, but the final evidence must be regenerated after the last edit.
- Accessibility and responsive checks can run in parallel with content/rights review.

Unsafe parallelism:

- Two builders editing the token core or DESIGN.md.
- Two people choosing different primaries for different properties.
- A judge working while the builder edits the artifacts.
- A verifier "fixing" issues silently instead of reporting them.

One owner for the token core. One owner for the final artifact tree. One independent judge.

## 7. Escalation

Escalate to the orchestrator when:

- Official sources conflict on a core token and neither is clearly current.
- The company's properties may be separate legal brands.
- A required asset has unclear rights.
- The brief asks for a claim that cannot be substantiated.
- The official linter and the static validator disagree.
- The judge finds a critical fail that the builder believes is a false positive.

Record the decision and its rationale in `sources.md` or `README.md`. Do not leave a silent exception.

## 8. How this proves the skill works

The skill is evaluated the same way it asks artifacts to be evaluated:

1. **Fix the prompts.** Use the cases in `evals/evals.json`: single-property, multi-property, audit/fix, and a casual/vague request.
2. **Run fresh contexts.** For each prompt, run once with the skill and once without (or with the previous version). Give the executor only the skill path, task, input files, and output directory.
3. **Save outputs separately.** `with_skill/` and `without_skill/` must not share a conversation or a workspace.
4. **Grade mechanically.** Run the official lint, export, static validator, and the browser matrix. Record raw results.
5. **Judge blind.** Anonymize the two outputs and give the judge only task + artifacts + rubric. No labels, no author rationale.
6. **Compare and diagnose.** A higher score with fabricated evidence is not a win. Read the transcripts for wasted paths, ignored gates, and missing research.
7. **Iterate the skill, not the demo.** Fix ambiguous instructions, missing references, or absent scripts. Re-run the same prompts in a new iteration.

Do not record a result you did not run. A `results` folder with "not run" is more credible than invented numbers.

## 9. Handoff checklist

- [ ] Task, scope, non-goals, and acceptance criteria are written.
- [ ] Brief and assumptions are written.
- [ ] Sources, retrieval dates, GitHub stars/license, conflicts, and rights are written.
- [ ] One token core and one DESIGN.md (or a documented reason for more).
- [ ] Registers documented if multi-property.
- [ ] Both HTML files standalone and cross-linked.
- [ ] Lint, export, static, browser, and optional Lighthouse evidence saved.
- [ ] README states what was run and what was not.
- [ ] Judge packet is blind and contains only task, artifacts, rubric.
- [ ] Judge report includes contamination declaration, score, critical fails, and fixes.
- [ ] Substantive changes were re-verified and, if needed, re-judged.
