#!/usr/bin/env node
/**
 * Scaffold an Agent Skill folder.
 * Usage:
 *   node scripts/new-skill.mjs <target-dir> --name <name> --description "<text>" [--force]
 */

import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const positional = [];
let name = '';
let description = '';
let force = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--name') name = args[++i] || '';
  else if (arg === '--description') description = args[++i] || '';
  else if (arg === '--force') force = true;
  else if (!arg.startsWith('-')) positional.push(arg);
  else {
    console.error(`Unknown option: ${arg}`);
    process.exit(2);
  }
}

const target = positional[0];
if (!target || !name || !description) {
  console.error('Usage: node scripts/new-skill.mjs <target-dir> --name <name> --description "<text>" [--force]');
  process.exit(2);
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  console.error('Name must be lowercase a-z, 0-9 and single hyphens, with no leading/trailing hyphen.');
  process.exit(2);
}
if (name.length > 64) {
  console.error('Name must be 64 characters or fewer.');
  process.exit(2);
}
if (description.length > 1024) {
  console.error(`Description is ${description.length} chars; the limit is 1024.`);
  process.exit(2);
}

const dir = path.resolve(target);
if (path.basename(dir) !== name) {
  console.error(`Target folder must be named "${name}" to match the skill name. Got: ${path.basename(dir)}`);
  process.exit(2);
}
try {
  await access(dir);
  if (!force) {
    console.error(`Target already exists: ${dir}. Pass --force to overwrite generated files.`);
    process.exit(2);
  }
} catch { /* does not exist */ }

await mkdir(path.join(dir, 'references'), { recursive: true });
await mkdir(path.join(dir, 'assets'), { recursive: true });
await mkdir(path.join(dir, 'scripts'), { recursive: true });
await mkdir(path.join(dir, 'evals'), { recursive: true });

const skill = `---
name: ${name}
description: ${JSON.stringify(description)}
license: MIT
metadata:
  version: "0.1.0"
---

# ${name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}

One paragraph: what capability this adds and why it matters.

## When to use

- Concrete situations, user phrases, and artifacts.
- What this skill does **not** cover, if the boundary is easy to confuse.

## Workflow

1. **Understand the input.** What to inspect, ask, or default.
2. **Do the core work.** Steps, decisions, defaults, and why.
3. **Validate.** Run the validator or checklist; fix and repeat.
4. **Deliver.** Exact output shape and where to put it.

## Output contract

Describe files, format, naming, and success criteria.

## Gotchas

- Environment-specific facts that defy reasonable assumptions.

## Quality checklist

- [ ] The core output exists and is valid.
- [ ] The validation loop was run.
- [ ] A fresh-context test worked with only this skill and the task.

## References

Add files under \`references/\`, \`scripts/\`, or \`assets/\` only when they earn their place, and reference each one here with a condition for loading it.
`;

await writeFile(path.join(dir, 'SKILL.md'), skill, 'utf8');
await writeFile(path.join(dir, 'evals', 'evals.json'), JSON.stringify({
  skill_name: name,
  evals: [
    {
      id: 1,
      prompt: 'A realistic user request with context and a concrete goal.',
      expected_output: 'A description of a successful result.',
      files: [],
      assertions: ['REPLACE: one objective, observable check (a file exists, a command exits 0, a value matches).'],
    },
    {
      id: 2,
      prompt: 'A second prompt, including an edge case.',
      expected_output: 'A description of a successful result.',
      files: [],
      assertions: [],
    },
  ],
}, null, 2) + '\n', 'utf8');

await writeFile(path.join(dir, 'README.md'), `# ${name}\n\n${description}\n\n## Install\n\nCopy this folder into your client's skills directory, or point the client at this path.\n\n## Test\n\n\`\`\`bash\nnode scripts/validate-skill.mjs . --strict\n# Optional, if skills-ref is installed:\nskills-ref validate .\n\`\`\`\n\nRun the prompts in \`evals/evals.json\` in fresh contexts and save the outputs. Record what was actually run and what was not.\n`, 'utf8');
await writeFile(path.join(dir, 'scripts', 'validate-skill.mjs'), await readFile(path.join(here, 'validate-skill.mjs'), 'utf8'), 'utf8');

console.log(`Created ${dir}`);
console.log('Next: replace the placeholder body, add resources, then run the validator.');
