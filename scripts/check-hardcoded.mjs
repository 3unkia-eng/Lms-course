#!/usr/bin/env node
/**
 * Token lint: fails when UI code contains raw style values.
 * Flags hex colors, rgb()/hsl(), and px values in src/** (CSS and TSX),
 * except the token files themselves, @media queries (CSS can't read
 * variables there) and lines marked `token-exempt`.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('../src/', import.meta.url).pathname;
const SKIP = new Set(['styles/tokens.css', 'styles/tokens.ext.css']);
const RULES = [
  { name: 'hex color', re: /#[0-9a-fA-F]{3,8}\b(?![\w-])/g, css: true, tsx: true },
  { name: 'rgb/hsl color', re: /\b(?:rgba?|hsla?)\(/g, css: true, tsx: true },
  { name: 'px value', re: /(?<![\w-])\d*\.?\d+px\b/g, css: true, tsx: true },
];

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

let problems = 0;
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  if (SKIP.has(rel) || !/\.(css|tsx?)$/.test(file)) continue;
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (line.includes('token-exempt') || line.trim().startsWith('@media')) return;
    // ignore comments and URLs in TS/TSX (e.g. anchors like #field-title)
    const code = line.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*$/, '');
    for (const r of RULES) {
      for (const m of code.matchAll(r.re)) {
        if (r.name === 'hex color' && /['"`]#[a-z-]+/i.test(code.slice(m.index - 1, m.index + 12)) && !/^#[0-9a-f]+$/i.test(m[0])) continue;
        if (r.name === 'hex color' && /href=|to=|`#|'#field|"#field|#main/.test(code)) continue;
        console.log(`${rel}:${i + 1}  ${r.name}: ${m[0]}   ${line.trim()}`);
        problems++;
      }
    }
  });
}
if (problems) {
  console.error(`\n✗ ${problems} hardcoded value(s). Use tokens (var(--…)). See Design.md.`);
  process.exit(1);
}
console.log('✓ No hardcoded colors or px values in src/ (tokens only).');
