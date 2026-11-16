#!/usr/bin/env node
/**
 * Read UTF-8 text from stdin and write it to a file without a BOM.
 * Usage:
 *   command | node scripts/write-utf8.mjs <output-file>
 *
 * This avoids Windows PowerShell redirection quirks (`>` UTF-16,
 * `Out-File -Encoding utf8` BOM) when capturing CLI JSON/CSS evidence.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const out = process.argv[2];
if (!out) {
  console.error('Usage: command | node scripts/write-utf8.mjs <output-file>');
  process.exit(2);
}

let input = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) input += chunk;
input = input.replace(/^\uFEFF/, '');
if (!input.trim()) {
  console.error('Refusing to write an empty capture.');
  process.exit(2);
}
if (!input.endsWith('\n')) input += '\n';
const target = path.resolve(out);
await mkdir(path.dirname(target), { recursive: true });
await writeFile(target, input, 'utf8');
console.log(`Wrote ${target}`);
