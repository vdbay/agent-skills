#!/usr/bin/env node
/**
 * Validate an Agent Skill folder against the agentskills.io format.
 * No dependencies. Usage:
 *   node scripts/validate-skill.mjs <skill-dir> [--strict] [--json]
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const target = args.find(a => !a.startsWith('-'));
const strict = args.includes('--strict');
const json = args.includes('--json');

if (!target) {
  console.error('Usage: node scripts/validate-skill.mjs <skill-dir> [--strict] [--json]');
  process.exit(2);
}

const skillDir = path.resolve(target);
const findings = [];
const add = (severity, message, file = 'SKILL.md') => findings.push({ severity, message, file });

function unquote(value) {
  let v = value.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  return v.replace(/\\n/g, '\n');
}

function parseFrontmatter(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  if (lines[0]?.trim() !== '---') return { error: 'SKILL.md must start with a YAML frontmatter fence (---).' };
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (end === -1) return { error: 'Frontmatter is missing its closing --- fence.' };

  const fmLines = lines.slice(1, end);
  const data = {};
  let currentKey = null;
  let currentIndent = 0;
  let blockLines = [];
  let blockMode = null;

  const flushBlock = () => {
    if (!currentKey) return;
    if (blockMode) {
      const joined = blockMode === '>' ? blockLines.join(' ').replace(/\s+/g, ' ').trim() : blockLines.join('\n');
      data[currentKey] = joined;
    }
    currentKey = null;
    blockMode = null;
    blockLines = [];
  };

  for (const rawLine of fmLines) {
    const line = rawLine.replace(/\t/g, '  ');
    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();

    if (!trimmed) {
      if (blockMode) blockLines.push('');
      continue;
    }

    if (indent === 0) {
      flushBlock();
      const match = trimmed.match(/^([A-Za-z0-9_.-]+):(?:\s*(.*))?$/);
      if (!match) {
        add('error', `Cannot parse frontmatter line: ${trimmed}`);
        continue;
      }
      const [, key, rest = ''] = match;
      if (rest === '|' || rest === '>' || rest === '|-' || rest === '>-') {
        currentKey = key;
        blockMode = rest[0];
        blockLines = [];
      } else if (rest === '') {
        // Could be a nested map (metadata). Capture child scalar keys.
        currentKey = key;
        currentIndent = indent;
        data[key] = {};
      } else {
        data[key] = unquote(rest);
      }
      continue;
    }

    if (currentKey && blockMode && indent > 0) {
      blockLines.push(trimmed);
      continue;
    }

    if (currentKey && typeof data[currentKey] === 'object' && indent > 0) {
      const child = trimmed.match(/^([A-Za-z0-9_.-]+):\s*(.*)$/);
      if (child) data[currentKey][child[1]] = unquote(child[2]);
      else add('warn', `Ignoring nested metadata line: ${trimmed}`);
      continue;
    }

    add('warn', `Unexpected indented frontmatter line: ${trimmed}`);
  }
  flushBlock();

  return { data, body: lines.slice(end + 1).join('\n') };
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

let result;
try {
  const skillMd = path.join(skillDir, 'SKILL.md');
  let text;
  try {
    text = await readFile(skillMd, 'utf8');
  } catch {
    add('error', 'SKILL.md is missing or unreadable.');
    text = '';
  }

  if (text) {
    const parsed = parseFrontmatter(text);
    if (parsed.error) add('error', parsed.error);
    const fm = parsed.data || {};
    const body = parsed.body || '';

    const name = typeof fm.name === 'string' ? fm.name.trim() : '';
    const description = typeof fm.description === 'string' ? fm.description.trim() : '';

    if (!name) add('error', 'Frontmatter is missing the required `name` field.');
    else {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) add('error', '`name` must be lowercase a-z, 0-9 and single hyphens, with no leading/trailing hyphen.');
      if (name.length > 64) add('error', '`name` is longer than 64 characters.');
      if (path.basename(skillDir) !== name) add('error', `Directory name "${path.basename(skillDir)}" does not match frontmatter name "${name}".`);
    }

    if (!description) add('error', 'Frontmatter is missing the required `description` field.');
    else {
      if (description.length > 1024) add('error', `\`description\` is ${description.length} characters; the limit is 1024.`);
      if (!/\b(use|when|for)\b/i.test(description)) add('warn', 'Description does not clearly say when to use the skill.');
      if (description.length < 80) add('warn', 'Description is very short; it may not trigger reliably.');
    }

    if (fm.compatibility !== undefined) {
      if (typeof fm.compatibility !== 'string') add('error', '`compatibility` must be a string if present.');
      else {
        const value = fm.compatibility;
        if (value.length < 1 || value.length > 500) add('error', '`compatibility` must be 1–500 characters if present.');
      }
    }
    if (fm.metadata !== undefined && (typeof fm.metadata !== 'object' || Array.isArray(fm.metadata))) {
      add('warn', '`metadata` should be a map of string keys to string values.');
    }
    for (const key of Object.keys(fm)) {
      if (!['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'].includes(key)) {
        add('warn', `Unknown top-level frontmatter key: ${key}`);
      }
    }

    const bodyLines = body.replace(/\r\n/g, '\n').split('\n');
    if (body.trim().length < 80) add('warn', 'SKILL.md body is very short; it may not contain an actionable workflow.');
    if (bodyLines.length > 500) add('warn', `SKILL.md body is ${bodyLines.length} lines; the recommendation is under 500.`);

    const refs = new Set();
    for (const match of body.matchAll(/(?:\(|`)((?:references|scripts|assets|evals)\/[A-Za-z0-9._\/-]+)(?:\)|`)/g)) refs.add(match[1]);
    for (const match of body.matchAll(/(?:^|\s)((?:references|scripts|assets|evals)\/[A-Za-z0-9._\/-]+)/gm)) refs.add(match[1].replace(/[.,;:)]+$/, ''));
    for (const match of body.matchAll(/\]\(([^)]+)\)/g)) {
      if (/^(references|scripts|assets|evals)\//.test(match[1])) refs.add(match[1].replace(/[#?].*$/, ''));
    }
    for (const ref of refs) {
      if (!(await exists(path.join(skillDir, ref)))) add('error', `Referenced file does not exist: ${ref}`);
    }

    const secretPatterns = [
      /AKIA[0-9A-Z]{16}/,
      /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
      /\bghp_[A-Za-z0-9]{30,}/,
      /\bsk-[A-Za-z0-9]{20,}/,
    ];
    if (secretPatterns.some(pattern => pattern.test(text))) add('error', 'Possible secret material found in SKILL.md.');

    // Eval file, if present
    const evalPath = path.join(skillDir, 'evals', 'evals.json');
    if (await exists(evalPath)) {
      try {
        const evals = JSON.parse(await readFile(evalPath, 'utf8'));
        if (!Array.isArray(evals.evals)) add('error', 'evals/evals.json must contain an `evals` array.');
        else {
          if (evals.skill_name && name && evals.skill_name !== name) add('warn', 'evals/evals.json `skill_name` does not match the skill name.');
          if (evals.evals.length < 2) add('warn', 'Recommend at least 2 evaluation prompts.');
          evals.evals.forEach((item, index) => {
            if (!item.prompt) add('warn', `Eval ${index + 1} has no prompt.`);
            if (item.assertions && !Array.isArray(item.assertions)) add('error', `Eval ${index + 1} assertions must be an array.`);
          });
        }
      } catch (error) {
        add('error', `evals/evals.json is not valid JSON: ${error.message}`);
      }
    } else {
      add('warn', 'No evals/evals.json found. Real execution tests are recommended.');
    }

    // Junk and secret scan in the directory
    const textExtensions = new Set(['.md', '.markdown', '.json', '.yaml', '.yml', '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.py', '.sh', '.ps1', '.txt', '.toml', '.html', '.css']);
    const walk = async (dir) => {
      for (const entry of await readdir(dir, { withFileTypes: true })) {
        if (['.git', 'node_modules', '__pycache__', '.venv', 'dist', 'build'].includes(entry.name)) continue;
        const p = path.join(dir, entry.name);
        const relative = path.relative(skillDir, p);
        if (entry.isDirectory()) await walk(p);
        else if (entry.name === '.env' || entry.name.endsWith('.pem') || entry.name.endsWith('.key')) {
          add('error', `Sensitive-looking file inside the skill: ${relative}. Remove it before sharing.`, relative);
        } else if (textExtensions.has(path.extname(entry.name).toLowerCase())) {
          try {
            const fileText = await readFile(p, 'utf8');
            if (secretPatterns.some(pattern => pattern.test(fileText))) {
              add('error', `Possible secret material found in ${relative}.`, relative);
            }
          } catch { /* unreadable file is reported by the packaging/validation step that needs it */ }
        }
      }
    };
    await walk(skillDir);
  }

  const errors = findings.filter(f => f.severity === 'error');
  const warnings = findings.filter(f => f.severity === 'warn');
  result = {
    skill: path.basename(skillDir),
    path: skillDir,
    ok: errors.length === 0 && (!strict || warnings.length === 0),
    errors: errors.length,
    warnings: warnings.length,
    findings,
  };

  if (json) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`\nSkill: ${result.skill}`);
    console.log(`Path:  ${result.path}`);
    if (!findings.length) console.log('\nNo findings. Skill structure looks valid.');
    for (const f of findings) console.log(`  ${f.severity.toUpperCase().padEnd(5)} ${f.file}: ${f.message}`);
    console.log(`\n${result.ok ? 'PASS' : 'FAIL'} — ${errors.length} error(s), ${warnings.length} warning(s)${strict ? ' (strict)' : ''}`);
  }
  process.exit(result.ok ? 0 : 1);
} catch (error) {
  console.error('Validator crashed:', error);
  process.exit(2);
}
