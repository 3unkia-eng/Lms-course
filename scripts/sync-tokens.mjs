#!/usr/bin/env node
/**
 * Copies a new tokens.css export (generated from Figma by the design-system
 * docs generator) into src/styles/tokens.css.
 * Usage: npm run sync:tokens -- ../design-system/tokens.css
 */
import { copyFileSync, existsSync, readFileSync } from 'node:fs';

const src = process.argv[2];
if (!src || !existsSync(src)) {
  console.error('Usage: npm run sync:tokens -- <path/to/tokens.css>');
  process.exit(1);
}
const css = readFileSync(src, 'utf8');
if (!css.includes('Generated from Figma')) {
  console.error('This does not look like a generated tokens.css (missing header). Aborting.');
  process.exit(1);
}
const dest = new URL('../src/styles/tokens.css', import.meta.url).pathname;
copyFileSync(src, dest);
console.log(`✓ Copied ${src} → src/styles/tokens.css. Run the app in light and dark mode to check the change.`);
