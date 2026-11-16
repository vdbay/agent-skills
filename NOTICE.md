# Notices and attribution

This repository is MIT-licensed. The formats, tools, and brands referenced below belong to their respective owners.

## Agent Skills format

The portable skill format is defined by [agentskills.io](https://agentskills.io/specification). The skills in this repository implement that public format. No specification text is redistributed as a substitute for the official document.

## `skill-creator`

Inspired by [Anthropic's `skill-creator`](https://github.com/anthropics/skills/tree/main/skills/skill-creator). This version is a self-contained, client-agnostic rewrite with its own workflow, scripts, references, and evaluation method. No upstream source code is redistributed.

## `design-md-prototype`

Implements the public [Google Labs DESIGN.md format](https://github.com/google-labs-code/design.md), which is published under Apache-2.0. The skill paraphrases the public format, links to the canonical source, and does not redistribute upstream code or the upstream sample palette.

The `designmd` CLI is fetched at run time through `npx -p @google/design.md`; it is not bundled.

## `skills` CLI

The install command uses the open-source [`skills` CLI](https://github.com/vercel-labs/skills) from Vercel Labs. It is not bundled or modified here.

## Gojek applied study

`docs/evals/design-md-prototype/iteration-1/gojek-applied/` is an **unofficial design-system study** created to evaluate the `design-md-prototype` skill.

- Not affiliated with, endorsed by, sponsored by, or produced by Gojek or PT GoTo Gojek Tokopedia Tbk.
- “Gojek”, “GoRide”, “GoCar”, “GoFood”, “GoSend”, “GoPay”, “GoMart”, “GoCorp”, and related marks are trademarks of their respective owners.
- No official logo file, photograph, testimonial, or proprietary font binary is redistributed. The prototype uses a text-based lockup and system font fallbacks.
- All product names, copy, and data shown in the prototype are illustrative. They are not official claims, metrics, or statements from the company.
- The study exists to demonstrate and evaluate a design workflow. Do not present it as an official brand deliverable.

If you are a rights holder and want an asset removed, open an issue or contact the maintainer through GitHub.

## Third-party links

Links to external documentation, repositories, and tools are provided for reference. Their content and licenses are controlled by their owners.
