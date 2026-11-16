#!/usr/bin/env node
/**
 * Static validator for a DESIGN.md + standalone HTML handoff package.
 * Enforces this skill's handoff contract, which is stricter than the DESIGN.md
 * format minimum (for example, all eight canonical sections must be present).
 * No third-party dependencies.
 *
 * Usage:
 *   node scripts/validate-artifacts.mjs <out-dir> [--strict] [--json]
 *
 * Exit codes:
 *   0  no errors (and no warnings when --strict)
 *   1  validation failed
 *   2  bad invocation
 */

import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const argv = process.argv.slice(2);
const help = argv.includes('--help') || argv.includes('-h');
const json = argv.includes('--json');
const strict = argv.includes('--strict');
const outIndex = argv.indexOf('--out');
const outArg = outIndex >= 0 ? argv[outIndex + 1] : '';
const targetArg = argv.find((arg, index) => !arg.startsWith('-') && !(outIndex >= 0 && index === outIndex + 1));

if (help || !targetArg) {
  console.log(`Usage: node scripts/validate-artifacts.mjs <out-dir> [--strict] [--json] [--out <file>]

Checks a handoff package containing:
  DESIGN.md, index.html, design-md.html, README.md, sources.md, evidence/

Options:
  --strict   Treat warnings as failures.
  --json     Emit machine-readable JSON to stdout.
  --out      Also write the JSON report to this file, without shell truncation.
  --help     Show this help.`);
  process.exit(help ? 0 : 2);
}

const root = path.resolve(targetArg);
const findings = [];

function add(severity, file, message, code = '') {
  findings.push({ severity, file, message, code });
}

function rel(p) {
  return path.relative(root, p).replace(/\\/g, '/') || path.basename(root);
}

async function readText(p) {
  try {
    return await readFile(p, 'utf8');
  } catch {
    return null;
  }
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  if (!match) return null;
  return match[2] ?? match[3] ?? match[4] ?? '';
}

function normalizeSpace(value) {
  return value.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/\s+/g, ' ').trim();
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function stripInlineComment(value) {
  let quote = null;
  for (let i = 0; i < value.length; i += 1) {
    const ch = value[i];
    if (quote) {
      if (ch === quote && value[i - 1] !== '\\') quote = null;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === '#' && (i === 0 || /\s/.test(value[i - 1]))) {
      return value.slice(0, i).trimEnd();
    }
  }
  return value.trimEnd();
}

const CANONICAL = [
  { key: 'overview', label: 'Overview', aliases: ['overview', 'brand & style', 'brand and style', 'brand style'] },
  { key: 'colors', label: 'Colors', aliases: ['colors'] },
  { key: 'typography', label: 'Typography', aliases: ['typography'] },
  { key: 'layout', label: 'Layout', aliases: ['layout', 'layout & spacing', 'layout and spacing'] },
  { key: 'elevation', label: 'Elevation & Depth', aliases: ['elevation & depth', 'elevation and depth', 'elevation'] },
  { key: 'shapes', label: 'Shapes', aliases: ['shapes'] },
  { key: 'components', label: 'Components', aliases: ['components'] },
  { key: 'dos', label: "Do's and Don'ts", aliases: ["do's and don'ts", 'dos and don\'ts', "do's & don'ts", 'dos & don\'ts'] },
];

function sectionIndex(heading) {
  const normalized = normalizeSpace(heading);
  return CANONICAL.findIndex((section) => section.aliases.includes(normalized));
}

function extractYamlBlocks(body) {
  const blocks = [];
  let inBlock = false;
  let buffer = [];
  for (const line of body.split('\n')) {
    if (!inBlock && /^\s*```ya?ml\s*$/i.test(line)) {
      inBlock = true;
      buffer = [];
      continue;
    }
    if (inBlock && /^\s*```\s*$/.test(line)) {
      blocks.push(buffer);
      inBlock = false;
      continue;
    }
    if (inBlock) buffer.push(line);
  }
  return blocks;
}

function parseOmitted(text) {
  const omitted = new Set();

  const inline = text.match(/^omitted:\s*\[([^\]]*)\]/m);
  if (inline) {
    for (const part of inline[1].split(',')) {
      const value = part.replace(/["']/g, '').trim();
      if (value) omitted.add(normalizeSpace(value));
    }
  }

  let inOmitted = false;
  for (const line of text.split('\n')) {
    if (/^omitted:\s*$/.test(line)) {
      inOmitted = true;
      continue;
    }
    if (!inOmitted) continue;
    if (/^\S/.test(line)) {
      inOmitted = false;
      continue;
    }
    const match = line.match(/^\s*-\s*(?:section:\s*)?["']?([A-Za-z][A-Za-z &'-]*)["']?/);
    if (match) omitted.add(normalizeSpace(match[1]));
  }
  return omitted;
}

async function checkDesign() {
  const file = 'DESIGN.md';
  const text = await readText(path.join(root, file));
  if (text === null) {
    add('error', file, 'Missing DESIGN.md.', 'design-missing');
    return { values: [], paths: new Set(), leaves: new Set(), hasChildren: new Set(), omitted: new Set() };
  }

  const normalized = text.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');
  const state = {
    rootKeys: new Set(),
    paths: new Set(),
    leaves: new Set(),
    hasChildren: new Set(),
    values: [],
  };

  function markLeaf(tokenPath) {
    state.leaves.add(tokenPath);
    const parts = tokenPath.split('.');
    for (let i = 1; i < parts.length; i += 1) {
      state.hasChildren.add(parts.slice(0, i).join('.'));
    }
  }

  function parseYamlBlock(blockLines, label) {
    const stack = [];
    let skipIndent = null;

    for (let index = 0; index < blockLines.length; index += 1) {
      const raw = blockLines[index].replace(/\t/g, '  ');
      const trimmed = raw.trim();
      if (!trimmed) continue;

      const indent = raw.length - raw.trimStart().length;
      if (skipIndent !== null) {
        if (indent > skipIndent) continue;
        skipIndent = null;
      }
      if (trimmed.startsWith('#')) continue;
      if (trimmed.startsWith('-')) continue;

      const match = raw.match(/^(\s*)([A-Za-z0-9_.-]+):(?:\s*(.*))?$/);
      if (!match) continue;

      const key = match[2];
      const rest = stripInlineComment(match[3] ?? '').trim();

      while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
      const parent = stack.length ? stack[stack.length - 1] : null;
      const tokenPath = parent ? `${parent.path}.${key}` : key;
      const scope = parent ? parent.keys : state.rootKeys;

      if (scope.has(key)) {
        add('error', label, `Duplicate YAML key "${key}" at ${tokenPath} (line ${index + 1}). Duplicate keys are rejected by DESIGN.md consumers.`, 'duplicate-key');
      }
      scope.add(key);
      state.paths.add(tokenPath);

      if (rest === '' || rest === '|' || rest === '>' || rest === '|-' || rest === '>-') {
        if (rest.startsWith('|') || rest.startsWith('>')) skipIndent = indent;
        stack.push({ indent, key, path: tokenPath, keys: new Set() });
      } else {
        markLeaf(tokenPath);
        state.values.push({ path: tokenPath, value: rest, label, line: index + 1 });
      }
    }
  }

  let body = normalized;
  if (lines[0]?.trim() === '---') {
    const end = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
    if (end === -1) {
      add('error', file, 'Frontmatter is missing its closing --- fence.', 'frontmatter');
    } else {
      parseYamlBlock(lines.slice(1, end), file);
      body = lines.slice(end + 1).join('\n');
    }
  } else {
    add('error', file, 'DESIGN.md must start with a YAML frontmatter fence (---).', 'frontmatter');
  }

  for (const block of extractYamlBlocks(body)) {
    parseYamlBlock(block, file);
  }

  const name = state.values.find((entry) => entry.path === 'name');
  if (!name || !name.value.replace(/["']/g, '').trim()) {
    add('error', file, 'Frontmatter must define a non-empty top-level `name`.', 'name');
  } else if (/<[^>]+>/.test(name.value)) {
    add('error', file, 'Frontmatter `name` still contains a placeholder.', 'placeholder');
  }

  if (!state.leaves.has('colors.primary')) {
    add('error', file, 'Missing a primitive `colors.primary` color token.', 'primary');
  }
  if (![...state.leaves].some((tokenPath) => tokenPath.startsWith('typography.') && tokenPath.split('.').length >= 2)) {
    add('error', file, 'Missing typography tokens; agents will fall back to default fonts.', 'typography');
  }
  if (![...state.leaves].some((tokenPath) => tokenPath.startsWith('spacing.'))) {
    add('warn', file, 'No spacing tokens found.', 'spacing');
  }
  if (![...state.leaves].some((tokenPath) => tokenPath.startsWith('rounded.'))) {
    add('warn', file, 'No rounded/radius tokens found.', 'rounded');
  }
  if (![...state.leaves].some((tokenPath) => tokenPath.startsWith('components.'))) {
    add('warn', file, 'No component tokens found; the prototype will lack a component contract.', 'components');
  }

  for (const entry of state.values) {
    for (const match of entry.value.matchAll(/\{([^{}]+)\}/g)) {
      const reference = match[1].trim();
      if (!/^[A-Za-z0-9_.-]+$/.test(reference)) continue;
      if (!state.paths.has(reference)) {
        add('error', file, `Unresolved token reference {${reference}} at ${entry.path} (line ${entry.line}).`, 'broken-ref');
        continue;
      }
      const componentTypography = entry.path.startsWith('components.') && entry.path.endsWith('.typography');
      if (state.hasChildren.has(reference) && !componentTypography) {
        add('warn', file, `Reference {${reference}} points to a token group; use a primitive outside component typography.`, 'composite-ref');
      }
    }
  }

  const headings = [];
  let inFence = false;
  for (const line of body.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = line.match(/^##\s+(.+?)\s*#*\s*$/);
    if (match) headings.push(match[1].trim());
  }

  const seenHeadings = new Map();
  const seenSections = new Map();
  let lastIndex = -1;
  let unknownCount = 0;

  for (const heading of headings) {
    const normalizedHeading = normalizeSpace(heading);
    if (seenHeadings.has(normalizedHeading)) {
      add('error', file, `Duplicate section heading "## ${heading}". Duplicate headings are rejected by the format.`, 'duplicate-section');
    } else {
      seenHeadings.set(normalizedHeading, heading);
    }

    const index = sectionIndex(heading);
    if (index === -1) {
      unknownCount += 1;
      continue;
    }
    if (seenSections.has(index)) {
      add('error', file, `Duplicate canonical section "${CANONICAL[index].label}".`, 'duplicate-section');
    } else {
      seenSections.set(index, heading);
    }
    if (index < lastIndex) {
      add('error', file, `Section "## ${heading}" is out of canonical order. Expected: ${CANONICAL.map((section) => section.label).join(' → ')}.`, 'section-order');
    }
    lastIndex = Math.max(lastIndex, index);
  }

  const omitted = parseOmitted(normalized);
  for (let index = 0; index < CANONICAL.length; index += 1) {
    if (!seenSections.has(index)) {
      const section = CANONICAL[index];
      if (omitted.has(normalizeSpace(section.key)) || omitted.has(normalizeSpace(section.label))) {
        add('info', file, `Section "${section.label}" is declared as intentionally omitted.`, 'omitted-section');
      } else {
        add('error', file, `Missing canonical section "## ${section.label}".`, 'missing-section');
      }
    }
  }
  if (unknownCount > 0) {
    add('info', file, `${unknownCount} extra section heading(s) preserved; unknown sections are allowed.`, 'extra-sections');
  }
  if (!/##\s+Do['\u2019]s and Don['\u2019]ts/i.test(body)) {
    add('warn', file, 'The Do\'s and Don\'ts heading should use the canonical spelling.', 'dos-heading');
  }

  return state;
}

function isFontHost(href) {
  return /fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|fonts\.bunny\.net|fonts\.cdnfonts\.com|fontshare\.com|fonts\.com/i.test(href);
}

function extractScripts(text) {
  return [...text.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].map((match) => ({
    attrs: match[1],
    body: match[2],
  }));
}

function extractStyles(text) {
  return [...text.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]);
}

async function checkInternalLinks(file, text, ids) {
  const hrefs = [...text.matchAll(/<a\b[^>]*\bhref\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi)]
    .map((match) => match[2] ?? match[3] ?? match[4] ?? '');

  for (const href of hrefs) {
    if (!href) continue;
    if (href === '#') {
      add('warn', file, 'Found a placeholder href="#". Point it at a real section or remove the link.', 'placeholder-link');
      continue;
    }
    if (/^javascript:/i.test(href)) {
      add('error', file, 'javascript: URLs are not acceptable in a standalone artifact.', 'javascript-url');
      continue;
    }
    if (/^(https?:|mailto:|tel:|data:)/i.test(href)) {
      if (/^http:/i.test(href)) add('warn', file, `Insecure external link: ${href}`, 'insecure-link');
      continue;
    }
    if (href.startsWith('#')) {
      const id = safeDecode(href.slice(1));
      if (!ids.has(id)) add('error', file, `Internal anchor #${id} has no matching id.`, 'broken-anchor');
      continue;
    }

    const [targetPath, fragment] = href.split('#');
    if (!targetPath) continue;
    if (targetPath.startsWith('/')) {
      add('warn', file, `Root-relative link "${href}" may break when the folder is opened from file://.`, 'root-relative-link');
      continue;
    }
    const resolved = path.resolve(path.dirname(path.join(root, file)), targetPath);
    const relativeTarget = path.relative(root, resolved);
    if (relativeTarget.startsWith('..') || path.isAbsolute(relativeTarget)) {
      add('warn', file, `Link "${href}" leaves the deliverable folder.`, 'external-relative-link');
      continue;
    }
    if (!(await exists(resolved))) {
      add('error', file, `Relative link target does not exist: ${href}`, 'broken-link');
      continue;
    }
    if (fragment && /\.html?$/i.test(resolved)) {
      const targetText = await readText(resolved);
      if (targetText) {
        const targetIds = new Set([...targetText.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]));
        if (!targetIds.has(safeDecode(fragment))) {
          add('error', file, `Link "${href}" points to a missing id in ${rel(resolved)}.`, 'broken-anchor');
        }
      }
    }
  }
}

async function checkHtml(file, kind) {
  const text = await readText(path.join(root, file));
  if (text === null) {
    add('error', file, `Missing ${file}.`, 'html-missing');
    return null;
  }

  if (!/^\s*<!doctype html>/i.test(text)) add('error', file, 'Missing <!doctype html>.', 'doctype');
  if (!/<html\b[^>]*\blang\s*=\s*("([^"]+)"|'([^']+)')/i.test(text)) add('error', file, 'Missing <html lang="...">.', 'lang');

  const metas = [...text.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const viewport = metas.find((tag) => /name\s*=\s*["']viewport["']/i.test(tag));
  if (!viewport || !/width\s*=\s*device-width/i.test(viewport)) {
    add('error', file, 'Missing a responsive viewport meta tag.', 'viewport');
  }

  const title = text.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  if (!title || !stripTags(title[1])) add('error', file, 'Missing a non-empty <title>.', 'title');

  const scripts = extractScripts(text);
  for (const script of scripts) {
    const src = attr(script.attrs, 'src');
    if (src && !src.startsWith('data:')) {
      add('error', file, `External script is not allowed in a standalone artifact: ${src}`, 'external-script');
    }
    if (/\b(?:import|export)\s+[^;]*\bfrom\s+["']|\bimport\s*\(/.test(script.body)) {
      add('error', file, 'Script uses module imports; these fail or behave inconsistently from file://.', 'module-import');
    }
    if (/\bfetch\s*\(|\bXMLHttpRequest\b/.test(script.body)) {
      add('warn', file, 'Script uses network APIs; file:// delivery must not depend on them.', 'network-api');
    }
  }

  const links = [...text.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  for (const tag of links) {
    if (!/rel\s*=\s*["'][^"']*stylesheet/i.test(tag)) continue;
    const href = attr(tag, 'href');
    if (!href) continue;
    if (/^(https?:)?\/\//i.test(href)) {
      if (isFontHost(href)) {
        add('warn', file, `External font stylesheet: ${href}. Document the fallback and offline behavior.`, 'external-font');
      } else {
        add('error', file, `External stylesheet is not allowed: ${href}`, 'external-style');
      }
    } else if (!href.startsWith('data:')) {
      add('error', file, `Local stylesheet link breaks the standalone contract: ${href}`, 'external-style');
    }
  }

  const styles = extractStyles(text);
  for (const style of styles) {
    if (/@import\b/i.test(style)) add('error', file, 'CSS @import is not allowed in a standalone artifact.', 'css-import');
    if (/url\(\s*["']?https?:/i.test(style)) add('warn', file, 'CSS references a remote asset; document it or inline it.', 'remote-css-asset');
  }
  if (styles.length === 0) add('warn', file, 'No inline <style> block found; verify the page is genuinely standalone.', 'inline-style');

  const images = [...text.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  for (const tag of images) {
    const src = attr(tag, 'src') ?? '';
    const srcset = attr(tag, 'srcset') ?? '';
    if (/^https?:/i.test(src) || /https?:/i.test(srcset)) {
      const remoteValue = /^https?:/i.test(src) ? src : srcset;
      add('warn', file, `Remote image weakens offline/file:// operation: ${remoteValue}`, 'remote-image');
    }
    if (attr(tag, 'alt') === null) add('error', file, 'Image is missing an alt attribute.', 'img-alt');
    if (/<(?:brand|company|your)(?:\s[^>]*)?>|<product>/i.test(attr(tag, 'alt') ?? '')) add('error', file, 'Image alt text still contains a placeholder.', 'placeholder');
  }
  if (/<(?:iframe|embed|object|video|audio|source)\b[^>]*\b(?:src|data|srcset)\s*=\s*["'](?:https?:)?\/\//i.test(text)) {
    add('warn', file, 'External media/embed found; document it or inline a local asset.', 'external-embed');
  }

  const ids = [...text.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
  const idSet = new Set();
  for (const id of ids) {
    if (idSet.has(id)) add('error', file, `Duplicate id="${id}".`, 'duplicate-id');
    idSet.add(id);
  }

  const headings = [...text.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripTags(match[1]));
  if (headings.length === 0) add('error', file, 'Missing an <h1>.', 'h1');
  if (headings.length > 1) add('warn', file, `Found ${headings.length} <h1> elements; use one primary heading.`, 'h1-count');

  if (!/<main\b/i.test(text)) add('error', file, 'Missing a <main> landmark.', 'main');
  if (!/<nav\b/i.test(text)) add('warn', file, 'Missing a <nav> landmark.', 'nav');
  if (!/<header\b/i.test(text)) add('warn', file, 'Missing a <header> landmark.', 'header');
  if (!/<footer\b/i.test(text)) add('warn', file, 'Missing a <footer> landmark.', 'footer');

  const mediaCount = (text.match(/@media\b/g) ?? []).length;
  if (mediaCount === 0) add('error', file, 'No @media queries; the responsive contract is not implemented.', 'responsive');
  else if (mediaCount < 2) add('warn', file, `Only ${mediaCount} @media query; verify 320/390/768/1024/1440 behavior.`, 'responsive');
  if (!/prefers-color-scheme|data-theme/i.test(text)) {
    add('error', file, 'No dark-theme mechanism (prefers-color-scheme or data-theme) found.', 'dark-mode');
  }
  if (!/:focus-visible|:focus\b/i.test(text)) add('warn', file, 'No visible focus style found.', 'focus');
  if ((/@keyframes|transition\s*:|animation\s*:/.test(text)) && !/prefers-reduced-motion/i.test(text)) {
    add('warn', file, 'Animation/transition present without a prefers-reduced-motion path.', 'reduced-motion');
  }
  if (/overflow-x\s*:\s*hidden/i.test(text)) {
    add('warn', file, 'overflow-x:hidden can mask a layout overflow; fix the overflowing child instead.', 'overflow-mask');
  }
  if (!/var\(--/.test(text)) {
    add('warn', file, 'No CSS custom property usage found; verify the HTML is wired to DESIGN.md tokens.', 'token-wiring');
  }
  if (/\b(?:lorem ipsum|dolor sit amet)\b/i.test(text)) add('error', file, 'Lorem ipsum found in a final artifact.', 'lorem');
  if (/\b(?:TODO|TBD)\b/.test(text)) add('error', file, 'TODO/TBD placeholder found in a final artifact.', 'todo');
  if (/\bcoming soon\b/i.test(text)) add('warn', file, 'Empty-state copy "coming soon" found; replace it with real content or remove the section.', 'empty-copy');
  if (/<(?:brand|company|your)(?:\s[^>]*)?>|<product>/i.test(text)) add('error', file, 'Unfilled angle-bracket placeholder found.', 'placeholder');
  if (/target\s*=\s*["']_blank["']/i.test(text)) {
    const blanks = [...text.matchAll(/<a\b[^>]*target\s*=\s*["']_blank["'][^>]*>/gi)].map((match) => match[0]);
    for (const tag of blanks) {
      if (!/rel\s*=\s*["'][^"']*(?:noopener|noreferrer)/i.test(tag)) {
        add('warn', file, 'target="_blank" link is missing rel="noopener noreferrer".', 'blank-rel');
      }
    }
  }

  await checkInternalLinks(file, text, idSet);
  return { text, idSet };
}

function extractHexTokens(values) {
  const hexes = new Set();
  for (const entry of values) {
    for (const match of entry.value.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      const raw = match[0].toLowerCase();
      if ([4, 5, 7, 9].includes(raw.length)) hexes.add(raw);
    }
  }
  return hexes;
}

function checkTokenReuse(file, htmlText, designState) {
  if (!htmlText) return;
  const hexes = extractHexTokens(designState.values);
  if (hexes.size === 0) {
    add('info', file, 'No hex color tokens to cross-check; verify non-hex token values manually.', 'token-crosscheck');
    return;
  }
  const haystack = htmlText.toLowerCase();
  const matches = [...hexes].filter((hex) => haystack.includes(hex));
  if (matches.length === 0) {
    add('warn', file, 'None of the DESIGN.md hex color tokens appear in this HTML; verify token wiring.', 'token-crosscheck');
  } else if (matches.length < Math.min(3, hexes.size)) {
    add('info', file, `Only ${matches.length} of ${hexes.size} DESIGN.md hex colors appear verbatim; derived tints may explain this.`, 'token-crosscheck');
  }

  const primary = designState.values.find((entry) => entry.path === 'colors.primary');
  if (primary) {
    const primaryHex = primary.value.match(/#[0-9a-fA-F]{3,8}\b/);
    if (primaryHex && !haystack.includes(primaryHex[0].toLowerCase())) {
      add('warn', file, 'The primary color token value does not appear in this HTML.', 'primary-reuse');
    }
  }

  const fonts = new Set();
  for (const entry of designState.values) {
    if (!entry.path.endsWith('.fontFamily')) continue;
    const value = entry.value.replace(/["']/g, '').split(',')[0].trim();
    if (value && !value.startsWith('<')) fonts.add(value);
  }
  if (fonts.size > 0) {
    const missing = [...fonts].filter((font) => !haystack.includes(font.toLowerCase()));
    if (missing.length === fonts.size) {
      add('warn', file, 'No DESIGN.md font family is referenced in this HTML; verify the fallback stack.', 'font-crosscheck');
    }
  }
}

function coverageHeadings(text) {
  return [...text.matchAll(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/gi)]
    .map((match) => stripTags(match[1]).toLowerCase())
    .join(' | ');
}

function checkShowcaseCoverage(file, text) {
  if (!text) return;
  const headings = coverageHeadings(text);
  const groups = [
    ['color/tokens', /\bcolou?r|\btoken/],
    ['typography', /\btypograph/],
    ['layout/spacing', /\blayout|\bspacing|\bgrid/],
    ['elevation/depth', /\belevation|\bdepth|\bshadow/],
    ['shapes/radii', /\bshape|\bradius|\bradii/],
    ['components', /\bcomponent/],
    ['motion', /\bmotion|\banimation/],
    ["do's and don'ts", /\bdo\b|\bdon'?t\b/],
    ['source excerpt', /\bsource|\bexcerpt|\bdesign\.md\b/],
  ];
  for (const [name, pattern] of groups) {
    if (!pattern.test(headings)) {
      add('error', file, `Showcase is missing a "${name}" heading/section.`, 'showcase-coverage');
    }
  }
}

async function checkReadme(externalFont) {
  const file = 'README.md';
  const text = await readText(path.join(root, file));
  if (text === null) {
    add('error', file, 'Missing README.md.', 'readme-missing');
    return null;
  }
  const required = ['DESIGN.md', 'index.html', 'design-md.html', 'sources.md', 'evidence', 'lint', 'browser'];
  for (const needle of required) {
    if (!text.toLowerCase().includes(needle.toLowerCase())) {
      add('warn', file, `README does not mention "${needle}".`, 'readme-topic');
    }
  }
  if (!/\b(?:limitation|assumption|not run|not verified)\b/i.test(text)) {
    add('warn', file, 'README does not state limitations, assumptions, or unverified checks.', 'readme-honesty');
  }
  if (externalFont && !(/\bfont\b/i.test(text) && /\b(?:fallback|stand-in|substitute)\b/i.test(text))) {
    add('warn', file, 'External fonts are used but README does not document the fallback/stand-in.', 'font-readme');
  }
  if (/\b(?:lorem ipsum|TODO|TBD)\b/i.test(text)) add('error', file, 'README contains placeholder text.', 'placeholder');
  return text;
}

async function checkSources() {
  const file = 'sources.md';
  const text = await readText(path.join(root, file));
  if (text === null) {
    add('error', file, 'Missing sources.md.', 'sources-missing');
    return null;
  }
  const urls = [...text.matchAll(/https?:\/\/[^\s)>\]]+/g)].map((match) => match[0]);
  if (urls.length < 2) add('error', file, `Only ${urls.length} URL(s); at least two Tier-1 sources are required.`, 'sources-count');
  if (!/official/i.test(text)) add('warn', file, 'sources.md does not identify any official source.', 'sources-official');
  if (!/retrieved|accessed/i.test(text)) add('warn', file, 'sources.md does not record retrieval dates.', 'sources-date');
  if (/github\.com\//i.test(text)) {
    if (!/stars?\b/i.test(text)) add('warn', file, 'GitHub sources are used but no star counts are recorded.', 'github-stars');
    if (!/licen[cs]e/i.test(text)) add('warn', file, 'GitHub sources are used but no licenses are recorded.', 'github-license');
  }
  if (!/conflict/i.test(text)) add('warn', file, 'No conflicts/resolutions section found.', 'sources-conflict');
  if (!/assumption/i.test(text)) add('warn', file, 'No assumptions section found.', 'sources-assumptions');
  if (!/rights?|permission|licen[cs]e|trademark|copyright/i.test(text)) {
    add('warn', file, 'No rights/permission/trademark notes found.', 'sources-rights');
  }
  if (/https?:\/\/[^\s)]*localhost/i.test(text)) add('warn', file, 'sources.md cites localhost; use a stable public URL.', 'sources-localhost');
  if (/\b(?:lorem ipsum|TODO|TBD)\b/i.test(text)) add('error', file, 'sources.md contains placeholder text.', 'placeholder');
  return { text, urls };
}

async function checkEvidence(designState, readmeText) {
  const dir = path.join(root, 'evidence');
  if (!(await exists(dir))) {
    add('error', 'evidence/', 'Missing evidence/ folder; verification evidence is part of the handoff.', 'evidence-missing');
    return;
  }

  const lintPath = path.join(dir, 'lint.json');
  let lintErrors = null;
  let lintWarnings = null;
  const lintText = await readText(lintPath);
  if (lintText === null) {
    add('error', 'evidence/lint.json', 'Missing official lint JSON evidence.', 'evidence-lint');
  } else {
    try {
      const report = JSON.parse(lintText.replace(/^\uFEFF/, ''));
      if (report.unavailable === true) {
        add('warn', 'evidence/lint.json', `Official lint was not run: ${report.reason || 'no reason recorded'}.`, 'lint-unavailable');
      } else if (report.summary && typeof report.summary === 'object') {
        lintErrors = Number(report.summary.errors ?? 0);
        lintWarnings = Number(report.summary.warnings ?? 0);
        if (Number.isFinite(lintErrors) && lintErrors > 0) {
          add('error', 'evidence/lint.json', `Official lint reports ${lintErrors} error(s).`, 'lint-errors');
        }
      } else if (Array.isArray(report.findings)) {
        lintErrors = report.findings.filter((finding) => finding.severity === 'error').length;
        lintWarnings = report.findings.filter((finding) => finding.severity === 'warning').length;
        if (lintErrors > 0) add('error', 'evidence/lint.json', `Official lint findings include ${lintErrors} error(s).`, 'lint-errors');
      } else {
        add('warn', 'evidence/lint.json', 'Lint JSON has no summary/findings; cannot confirm 0 errors. Record the exact tool output.', 'lint-shape');
      }
      if (Number.isFinite(lintWarnings) && lintWarnings > 0) {
        const triaged = readmeText && /warning|warnings|triage/i.test(readmeText);
        if (!triaged) add('warn', 'README.md', `Lint reports ${lintWarnings} warning(s); triage them in README.`, 'lint-warnings');
      }
    } catch (error) {
      add('error', 'evidence/lint.json', `Cannot parse lint JSON: ${error.message}`, 'lint-json');
    }
  }

  const exportPath = path.join(dir, 'export.css');
  const exportText = await readText(exportPath);
  if (exportText === null) {
    add('error', 'evidence/export.css', 'Missing official CSS export evidence.', 'evidence-export');
  } else if (!exportText.trim()) {
    add('error', 'evidence/export.css', 'CSS export is empty.', 'export-empty');
  } else if (!/--[A-Za-z0-9_-]+\s*:|@theme|:root/.test(exportText)) {
    add('warn', 'evidence/export.css', 'CSS export does not look like a token export (no custom properties or @theme).', 'export-shape');
  }

  const staticPath = path.join(dir, 'static-check.json');
  const staticText = await readText(staticPath);
  if (staticText === null) {
    // This file is produced by this validator, so a first run cannot require it
    // without creating a self-reference. Warn, write the report, then re-run.
    add('warn', 'evidence/static-check.json', 'Missing static validator JSON evidence. Run with --json and save the report, then re-run.', 'evidence-static');
  } else {
    try {
      const report = JSON.parse(staticText.replace(/^\uFEFF/, ''));
      if (report.ok === false) {
        add('info', 'evidence/static-check.json', 'A previous static report says ok:false. The current run is authoritative; overwrite it with the final --out report.', 'static-fail');
      }
      if (Number(report.errors) > 0) {
        add('info', 'evidence/static-check.json', `A previous static report has ${report.errors} error(s). The current run is authoritative; overwrite it with the final --out report.`, 'static-errors');
      }
    } catch (error) {
      add('error', 'evidence/static-check.json', `Cannot parse static-check JSON: ${error.message}`, 'static-json');
    }
  }

  const browserPath = path.join(dir, 'browser-check.md');
  const browserText = await readText(browserPath);
  if (browserText === null) {
    add('warn', 'evidence/browser-check.md', 'Missing browser matrix evidence. Record the 320/390/768/1024/1440 × light/dark checks or explain why they were not run.', 'evidence-browser');
  } else {
    for (const width of ['390', '768', '1024', '1440']) {
      if (!browserText.includes(width)) add('warn', 'evidence/browser-check.md', `Browser evidence does not mention ${width}px.`, 'browser-width');
    }
    if (!/light/i.test(browserText) || !/dark/i.test(browserText)) {
      add('warn', 'evidence/browser-check.md', 'Browser evidence does not cover both light and dark themes.', 'browser-theme');
    }
    for (const [label, pattern] of [
      ['console errors', /console|pageerror/i],
      ['horizontal overflow', /overflow/i],
      ['file:// operation', /file:\/\//i],
      ['interactions', /interaction|keyboard|click|toggle/i],
    ]) {
      if (!pattern.test(browserText)) add('warn', 'evidence/browser-check.md', `Browser evidence does not mention ${label}.`, 'browser-topic');
    }
    if (!/lighthouse/i.test(browserText)) {
      add('info', 'evidence/browser-check.md', 'No Lighthouse status recorded; add a score or a "not run" reason if Lighthouse is available.', 'browser-lighthouse');
    }
  }

  const files = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const lighthouseFiles = files.filter((entry) => entry.isFile() && /^lighthouse-.*\.json$/i.test(entry.name));
  for (const entry of lighthouseFiles) {
    try {
      const report = JSON.parse(await readFile(path.join(dir, entry.name), 'utf8'));
      const score = report?.categories?.accessibility?.score;
      if (typeof score === 'number') {
        if (score < 0.9) add('error', `evidence/${entry.name}`, `Lighthouse accessibility score ${Math.round(score * 100)} is below 90.`, 'lighthouse-score');
        else if (score < 0.95) add('warn', `evidence/${entry.name}`, `Lighthouse accessibility score ${Math.round(score * 100)} is below the 95 target.`, 'lighthouse-score');
      }
    } catch {
      add('warn', `evidence/${entry.name}`, 'Lighthouse JSON could not be parsed.', 'lighthouse-json');
    }
  }

  if (readmeText && lintErrors !== null) {
    const claimsPass = /lint\s+(?:passes|clean)|0\s+lint\s+errors|zero\s+lint\s+errors/i.test(readmeText);
    if (claimsPass && lintErrors > 0) {
      add('error', 'README.md', 'README claims a passing lint result, but evidence/lint.json reports errors.', 'readme-contradiction');
    }
  }

  return { lintErrors, lintWarnings };
}

async function checkCrossLinks(indexText, showcaseText) {
  if (indexText && !/href\s*=\s*["'][^"']*design-md\.html/i.test(indexText)) {
    add('error', 'index.html', 'Does not link to design-md.html.', 'cross-link');
  }
  if (showcaseText && !/href\s*=\s*["'][^"']*index\.html/i.test(showcaseText)) {
    add('error', 'design-md.html', 'Does not link back to index.html.', 'cross-link');
  }
}

async function scanJunk() {
  async function walk(dir) {
    let entries = [];
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (['.git', 'node_modules', '__pycache__', '.venv', 'dist', 'build'].includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else {
        if (entry.name === '.env' || entry.name.endsWith('.pem') || entry.name.endsWith('.key')) {
          add('warn', rel(full), 'Sensitive-looking file inside the deliverable.', 'secret-file');
        }
        if (/\.(woff2?|ttf|otf|eot)$/i.test(entry.name)) {
          add('warn', rel(full), 'Font binary present. Do not redistribute unless the license explicitly permits it.', 'font-binary');
        }
      }
    }
  }
  await walk(root);
}

const requiredFiles = ['DESIGN.md', 'index.html', 'design-md.html', 'README.md', 'sources.md'];
for (const file of requiredFiles) {
  if (!(await exists(path.join(root, file)))) add('error', file, `Required file is missing: ${file}`, 'required');
}

const designState = await checkDesign();
const index = await checkHtml('index.html', 'index');
const showcase = await checkHtml('design-md.html', 'showcase');
await checkCrossLinks(index?.text, showcase?.text);
if (index?.text) checkTokenReuse('index.html', index.text, designState);
if (showcase?.text) checkTokenReuse('design-md.html', showcase.text, designState);
if (showcase?.text) checkShowcaseCoverage('design-md.html', showcase.text);

const externalFont = findings.some((finding) => finding.code === 'external-font');
const readmeText = await checkReadme(externalFont);
await checkSources();
await checkEvidence(designState, readmeText);
await scanJunk();

const errors = findings.filter((finding) => finding.severity === 'error');
const warnings = findings.filter((finding) => finding.severity === 'warn');
const info = findings.filter((finding) => finding.severity === 'info');
const ok = errors.length === 0 && (!strict || warnings.length === 0);

const result = {
  artifact: path.basename(root),
  path: root,
  ok,
  strict,
  errors: errors.length,
  warnings: warnings.length,
  info: info.length,
  findings,
};

if (outArg) {
  const outPath = path.resolve(outArg);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(result, null, 2) + '\n', 'utf8');
  if (!json) console.log(`JSON report written to ${outPath}`);
}

if (json) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`\nArtifact check: ${path.basename(root)}`);
  console.log(`Path: ${root}`);
  if (findings.length === 0) console.log('\nNo findings. Static artifact checks look good.');
  for (const finding of [...errors, ...warnings]) {
    console.log(`  ${finding.severity.toUpperCase().padEnd(5)} ${finding.file}: ${finding.message}`);
  }
  console.log(`\nSummary: ${errors.length} error(s), ${warnings.length} warning(s), ${info.length} info.`);
  console.log(`${ok ? 'PASS' : 'FAIL'}${strict ? ' (strict)' : ''}`);
}

process.exit(ok ? 0 : 1);
