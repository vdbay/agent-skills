# Description optimization

The description is the trigger. It is loaded for every available skill at startup, before the body. Optimize it separately from the workflow.

## Build the query set

Create about 20 realistic prompts:

- **8–10 should trigger.** Vary formal/casual, explicit/indirect, short/context-heavy, and single-step/multi-step. Include cases where the user does not name the skill's format but clearly needs the capability.
- **8–10 should not trigger.** Use near-misses, not obvious negatives. A PDF skill should be tested against "edit this Excel formula", not "what's the weather". A design-system skill should be tested against "review this Figma file visually" or "write a blog post about design tokens".

Store:

```json
[
  { "query": "Can you turn our brand PDF and website into a design.md plus a prototype?", "should_trigger": true },
  { "query": "Please review the spacing in this Figma frame.", "should_trigger": false }
]
```

Split roughly 60% train / 40% validation. Keep the split fixed across iterations. Both sets need a mix of positives and negatives.

## Measure

Run each query several times (3 is a reasonable default) and record whether the skill was actually loaded. A positive passes above 0.5 trigger rate; a negative passes below 0.5. If your client cannot register the skill, simulate activation by asking a fresh agent whether it would load the skill for that query, but treat that as weaker evidence.

## Improve

Use only train failures to revise:

- Positive missed → description too narrow or too abstract. Add the user intent and realistic contexts, not internal jargon.
- Negative triggered → description too broad. Add a boundary or name the adjacent capability it does not replace.
- Inconsistent → the description is ambiguous or the task is too trivial to benefit from a skill. Simplify.

Do not add keywords from individual failed queries. Find the general category of confusion. Keep the description under 1024 characters.

After 3–5 iterations, select the version with the best **validation** score, not the last or the most elaborate one. Test 5–10 fresh queries that were never part of the optimization to check generalization.

## What good looks like

A strong description is a short, pushy paragraph:

- names the capability,
- names the user's likely words and artifacts,
- states when to use it, including indirect cases,
- distinguishes the nearest non-goal,
- stays specific enough to avoid becoming a catch-all.

Do not stuff every feature. The body can explain the workflow; the description only has to win the activation decision.
