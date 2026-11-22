#!/usr/bin/env node
/**
 * Token source check: proves src/styles/tokens.css is still the Figma export.
 * - tokens.css must carry the "Generated from Figma" header.
 * - Every CSS variable declared in tokens.css must exist in the Figma
 *   variable snapshot (tokens/tokens.json), and every snapshot variable
 *   must be declared in tokens.css (deprecated aliases listed below are allowed).
 * - Primitive values (hex colors in the default mode) must match the snapshot.
 * A hand-added or hand-edited token fails the build. Change tokens in Figma,
 * re-export, then run `npm run sync:tokens`.
 */
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const snap = JSON.parse(readFileSync(new URL('../tokens/tokens.json', import.meta.url), 'utf8'));

const errors = [];
if (!/Generated from Figma/.test(css)) errors.push('tokens.css is missing the "Generated from Figma" header.');

// Collect variables from the Figma snapshot.
const fromFigma = new Map();
(function walk(node) {
  if (!node || typeof node !== 'object') return;
  const name = node.$extensions?.css;
  if (typeof name === 'string') fromFigma.set(name, node.$value);
  for (const [k, v] of Object.entries(node)) if (!k.startsWith('$')) walk(v);
})(snap);

// Collect variables declared in tokens.css (first declaration = default mode).
const declared = new Map();
for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
  if (!declared.has(m[1])) declared.set(m[1], m[2].trim());
}

// Deprecated aliases kept on purpose until 2.0.0 (see Design.md / docs changelog).
const isDeprecatedAlias = (n) => n.startsWith('--redius-') || n === '--surface-brand-soft-default-2';

for (const n of declared.keys()) {
  if (!fromFigma.has(n) && !isDeprecatedAlias(n)) errors.push(`${n} is in tokens.css but not in the Figma snapshot.`);
}
for (const n of fromFigma.keys()) {
  if (!declared.has(n)) errors.push(`${n} is in the Figma snapshot but missing from tokens.css.`);
}
for (const [n, v] of fromFigma) {
  if (typeof v === 'string' && /^#[0-9a-f]{3,8}$/i.test(v) && declared.has(n)) {
    if (declared.get(n).toLowerCase() !== v.toLowerCase()) errors.push(`${n}: tokens.css has ${declared.get(n)}, Figma has ${v}.`);
  }
}

if (errors.length) {
  console.error(`✗ Token source check failed (${errors.length}):\n  ` + errors.slice(0, 40).join('\n  '));
  process.exit(1);
}
console.log(`✓ tokens.css matches the Figma snapshot (${fromFigma.size} variables).`);
