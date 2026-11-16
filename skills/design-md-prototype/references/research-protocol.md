# Research protocol — provenance before pixels

The visual system is only as defensible as its sources. This protocol applies to any company, category, or region. It never authorizes copying a real brand's assets; it tells you what to learn from and how to prove it.

## 1. Source hierarchy

| Tier | Source type | Use it for | Examples (generic) |
| --- | --- | --- | --- |
| 1 | Official brand guidelines, official design-system documentation, official product site, official standards, first-party source repository | Normative color, type, logo usage, component roles, accessibility, voice | The company's brand portal; its public design-system docs; its official product pages; WCAG; W3C Design Tokens; the company's own GitHub org |
| 2 | Official press/media kit, official app-store listing, official annual report, official archived docs | Supporting expression, photography direction, historical context, terminology | A press kit with approved imagery; a public earnings report; an archived brand manual |
| 3 | Reputable design press, conference talks by the brand's own team, independent case studies | Comparative context, common failure modes, vocabulary | A design publication's interview with the brand team; a conference recording |
| 4 | Fan sites, template marketplaces, clone repos, Pinterest boards, random blogs, AI-generated summaries | Discovery only; never source of truth | A "brand colors" aggregator; a re-uploaded logo pack |

Rules:

- Use at least two Tier-1 sources. At least one must be official brand or design-system guidance. If no such source exists, say so and label the output a **concept direction**, not an official system.
- A Tier-2 source may fill a gap when Tier-1 is silent. Mark it as supporting.
- Tier-3 and Tier-4 sources may suggest a question, not answer it. Never cite them as the primary basis for a token or a claim.
- Official standards (WCAG, W3C DTCG, platform accessibility guidance) outrank a brand's aesthetic preference on accessibility. Where they conflict, preserve brand expression and add an accessible role; document the deviation.
- Record the retrieval date for every source. A source without a date is not evidence.

### Discovery sequence

1. Scan the official site's header, footer, and about page for **Brand**, **Press**, **Newsroom**, **Design**, **Developers**, **Docs**, or **Trust** links.
2. Try only the obvious official paths: `/brand`, `/press`, `/design`, `/design-system`, `/foundations`, `/tokens`, `/developers`. Do not brute-force or bypass access controls.
3. Follow the official organization link from the site to GitHub. Confirm the org, then sort its repositories by stars.
4. Check official app-store listings and official documentation for interface language and terminology. Do not copy screenshots.
5. Use a domain-restricted search (`site:<official-domain> brand guidelines`) to find pages the navigation hides.
6. If current official guidance is unavailable, check an official archive and label it historical. If neither exists, use the official product site plus public docs and label the output a concept.
7. Stop when the sufficiency gate passes. More sources do not automatically mean better evidence.

## 2. What to collect

For a brand/product system:

- **Identity:** official name, descriptor, audience, category, positioning, voice attributes.
- **Color:** official palette names and values, intended roles, light/dark behavior, contrast constraints.
- **Typography:** official families, weights, scale, fallback policy, licensing.
- **Layout:** grid, spacing rhythm, density, breakpoints, content width.
- **Shape:** radius language, border weights, icon geometry.
- **Elevation:** shadow/border/tonal strategy, layering rules.
- **Components:** buttons, inputs, navigation, cards, feedback, states.
- **Motion:** duration/easing principles, reduced-motion policy.
- **Imagery:** photography/illustration style, usage rights, logo rules.
- **Proof:** claims that are actually supported; claims that must be avoided.

Do not collect a mood board of unrelated sites and call it research. Every reference must support a decision.

## 3. Evidence table

Write this in `sources.md` while researching:

```markdown
## Source table

| ID | Source | Tier | URL | Retrieved | Supports | Rights / notes |
| --- | --- | --- | --- | --- | --- | --- |
| S1 | Official brand guidelines | 1 | https://... | 2026-11-16 | Palette, logo clear space, type families | Public; no asset redistribution |
| S2 | Official design-system docs | 1 | https://... | 2026-11-16 | Component roles, spacing, focus states | Public docs; code license separate |
| S3 | Official product site | 1 | https://... | 2026-11-16 | Hero expression, photography direction | Public; images not licensed for reuse |
| S4 | Independent case study | 3 | https://... | 2026-11-16 | Comparative context only | Supporting, not normative |
```

For each source, write **what it supports** in concrete terms. "Inspiration" is not evidence. Also record:

- Whether the page is current, archived, localized, or region-specific.
- Whether values are stated as brand colors, UI roles, or both.
- Whether assets are licensed for reuse or only for reference.
- Any login, paywall, robots, or terms restriction.

## 4. GitHub method (stars, license, use)

Use GitHub when the company publishes first-party code or design tokens.

1. Confirm the repository belongs to the company's official organization or is linked from an official property.
2. Search repositories and sort by stars, descending:
   - UI: `https://github.com/search?q=<company-or-topic>&type=repositories&s=stars&o=desc`
   - Organization: `https://github.com/search?q=org%3A<org>&type=repositories&s=stars&o=desc`
   - Optional CLI: `gh api "search/repositories?q=<query>&sort=stars&order=desc"`
3. Record for every repository used:

```markdown
## GitHub repositories

| Repository | URL | Stars | License | Last push | What was used |
| --- | --- | ---: | --- | --- | --- |
| org/repo | https://github.com/org/repo | 12,345 | Apache-2.0 | 2026-10-02 | Token naming and component state model; no code copied |
```

4. Check:
   - **Official ownership:** org verification, links from the official site, or a maintainer statement. A popular fork is not first-party.
   - **License:** read `LICENSE`, `COPYING`, or the repository metadata. Stars do not grant rights.
   - **Scope:** a code license may not cover logos, fonts, images, or documentation prose.
   - **Freshness:** last push, archived flag, release tags, open issues. A stale repo may describe an old system.
   - **What you used:** naming, structure, a specific component pattern, or actual code. If you copy code, comply with the license and attribution; prefer reimplementation from observed behavior.
5. Stars are a discovery signal, not proof of quality or authority. A first-party repo with 200 stars outranks a famous third-party repo with 50k stars for brand truth.

Do not use a repository's sample palette or demo copy as the brand's palette or copy. Use it to understand structure and roles.

## 5. Conflict resolution

When sources disagree, resolve explicitly and record both sides.

| Conflict | Resolution |
| --- | --- |
| Current official brand site vs. current official design-system docs | Use design-system docs for product roles and component behavior; use the brand site for campaign expression. Record both. |
| Current official docs vs. archived manual | Current wins. Keep the archive as historical context if it explains a deliberate change. |
| Official brand color vs. WCAG contrast | Keep the official value as a brand primitive. Add an accessible role variant for text/controls. Document the original ratio and the variant. Never claim the inaccessible value passed. |
| First-party code vs. official prose | Prose defines intent; code shows implementation. If they conflict, prefer the documented intent and note the implementation gap. |
| Two official sources for two regions/properties | Treat as registers of one system unless they are legally separate brands. Preserve the shared core and document the delta. |
| Third-party source vs. official source | Official wins. Third-party becomes supporting or is rejected. |
| No official source | Use the brief and clearly label the result a concept. Do not invent an official history, palette name, or endorsement. |

Write a **Conflicts and resolutions** section in `sources.md`. A judge will look for it.

## 6. Multi-property companies: one system, explicit registers

If several domains, products, or audiences belong to one company, the default is **one unified design system with registers**, not multiple competing brands.

Decision tree:

1. **Same legal company and shared master brand?** → One DESIGN.md, one core, registers.
2. **Different audiences but shared equity?** → One core, registers differentiated by density, accent proportion, imagery, tone, and motion.
3. **Separate legal brands with independent trademarks?** → Still consider one core plus register-specific marks. Split only if the brief explicitly requires independent systems, and document why.
4. **Acquired company with its own established identity?** → One umbrella system with a named register and a documented migration path; do not erase the acquired identity without evidence.

Register model:

- **Core (shared):** master brand color roles, type families, spacing unit, radius language, focus treatment, accessibility rules.
- **Registers:** named contexts such as corporate, product, consumer/campaign, service/support, partner, or regional.
- **Deltas:** density, display scale, accent proportion, image treatment, motion intensity, vocabulary. These are expression choices, not new cores.
- **Encoding:** context-prefixed tokens (`surface-product`, `type-campaign-display`) and component variants (`product-button-primary`). Keep the canonical sections and one `primary`.
- **Evidence:** a register matrix in `## Overview` with audience, job, expression, and token deltas.
- **Demo:** show at least two registers in `index.html` and all of them in `design-md.html`. A register switcher is optional; labeled sections are enough.

Failure modes:

- Three separate DESIGN.md files with three different primaries for one company.
- Copying the consumer palette into the enterprise product "because it looks better".
- Treating a register as a license to ignore accessibility or the shared type system.
- Inventing a register the company does not have.

## 7. Rights and legal hygiene

Record in `sources.md`:

- **Fonts:** official family name, license status, whether binaries may be redistributed, fallback/stand-in used in the demo. Do not bundle proprietary font files.
- **Logos:** official mark usage rules, whether the demo may show it, and the placeholder used if not.
- **Photography/illustration:** source, license, model/property releases if relevant, and whether the demo uses a licensed substitute.
- **Testimonials/case studies:** permission and exact source. If none, omit.
- **Claims:** substantiation for metrics, awards, certifications, and comparative statements. If unavailable, do not publish the claim.
- **Terms:** do not scrape gated content or bypass access controls. Respect robots and terms.
- **Endorsement:** an unofficial concept needs a visible disclaimer. Do not imply partnership, employment, or approval.

This is not legal advice. When rights are unclear, use a neutral placeholder and flag the issue in the README.

## 8. Research sufficiency gate

Proceed to design only when:

- [ ] At least two Tier-1 sources are recorded, with retrieval dates.
- [ ] Official brand/design-system guidance is among them, or the concept label is explicit.
- [ ] Color values are traceable to a source or clearly marked as an assumption.
- [ ] Font licensing and fallback strategy are known.
- [ ] Asset rights are known (logo, photography, illustration, testimonials).
- [ ] Conflicts are resolved and written down.
- [ ] Multi-property scope has a register decision.
- [ ] No source is a clone, fan site, or template marketplace presented as official.

If a gate cannot pass, deliver a labeled concept and state the gap. Do not fill the gap with invention.
