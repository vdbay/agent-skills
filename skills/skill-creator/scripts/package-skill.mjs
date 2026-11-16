#!/usr/bin/env node
/**
 * Package a skill folder as a .skill zip (stored entries, no dependencies).
 * Usage: node scripts/package-skill.mjs <skill-dir> [--out <file.skill>]
 */

import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
let target = '';
let outArg = '';
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--out') outArg = args[++i] || '';
  else if (!args[i].startsWith('-') && !target) target = args[i];
}

if (!target) {
  console.error('Usage: node scripts/package-skill.mjs <skill-dir> [--out <file.skill>]');
  process.exit(2);
}

const skillDir = path.resolve(target);
const skillName = path.basename(skillDir);
const outFile = path.resolve(outArg || path.join(path.dirname(skillDir), `${skillName}.skill`));
const SKIP_DIRS = new Set(['.git', 'node_modules', '.venv', 'venv', '__pycache__', 'dist', 'build', '.cache', 'eval-workspace', 'skill-workspace']);
const SKIP_FILES = new Set(['.DS_Store', 'Thumbs.db']);
const SKIP_PATHS = new Set(['evals/results', 'evals/files']);

function crc32(buffer) {
  let crc = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date = new Date()) {
  const time = ((date.getHours() & 31) << 11) | ((date.getMinutes() & 63) << 5) | (Math.floor(date.getSeconds() / 2) & 31);
  const day = (((date.getFullYear() - 1980) & 127) << 9) | (((date.getMonth() + 1) & 15) << 5) | (date.getDate() & 31);
  return { time, date: day };
}

async function collect(dir, base = '') {
  const entries = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory() && (SKIP_DIRS.has(entry.name) || entry.name.endsWith('-workspace') || SKIP_PATHS.has(rel))) continue;
    if (entry.isFile() && (SKIP_FILES.has(entry.name) || entry.name.endsWith('.skill') || entry.name.endsWith('.log'))) continue;
    if (entry.isFile() && (entry.name === '.env' || /^\.env\./i.test(entry.name) || /credential/i.test(entry.name) || entry.name.endsWith('.pem') || entry.name.endsWith('.key') || entry.name === 'id_rsa')) {
      console.error(`Refusing to package sensitive file: ${path.join(dir, entry.name)}`);
      process.exit(1);
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) entries.push(...await collect(full, rel));
    else if (entry.isFile()) entries.push({ full, rel, data: await readFile(full) });
  }
  return entries;
}

function u16(n) { const b = Buffer.alloc(2); b.writeUInt16LE(n >>> 0); return b; }
function u32(n) { const b = Buffer.alloc(4); b.writeUInt32LE(n >>> 0); return b; }

const entries = (await collect(skillDir)).sort((a, b) => a.rel.localeCompare(b.rel));
if (!entries.some(e => e.rel === 'SKILL.md')) {
  console.error('Refusing to package: SKILL.md is not at the root of the skill directory.');
  process.exit(2);
}

const { time, date } = dosDateTime();
const locals = [];
const centrals = [];
let offset = 0;

for (const entry of entries) {
  const name = Buffer.from(entry.rel.replace(/\\/g, '/'), 'utf8');
  const crc = crc32(entry.data);
  const size = entry.data.length;
  const local = Buffer.concat([
    u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(time), u16(date),
    u32(crc), u32(size), u32(size), u16(name.length), u16(0), name, entry.data,
  ]);
  locals.push(local);
  const central = Buffer.concat([
    u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(time), u16(date),
    u32(crc), u32(size), u32(size), u16(name.length), u16(0), u16(0), u16(0),
    u16(0), u32(0), u32(offset), name,
  ]);
  centrals.push(central);
  offset += local.length;
}

const central = Buffer.concat(centrals);
const eocd = Buffer.concat([
  u32(0x06054b50), u16(0), u16(0), u16(entries.length), u16(entries.length),
  u32(central.length), u32(offset), u16(0),
]);

await writeFile(outFile, Buffer.concat([...locals, central, eocd]));
console.log(`Packaged ${entries.length} file(s) → ${outFile}`);
console.log(`Size: ${(Buffer.concat([...locals, central, eocd]).length / 1024).toFixed(1)} KB`);
