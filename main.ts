// World news in one image — Monday 23 November 2026.
// This program ships the finished front page (entry.png) to the grader's
// output directory. It uses only the Node standard library, reads the image
// that sits beside this file, and writes it out byte for byte, so both of
// the grader's runs produce the same file.
//
// Run it outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error(`entry image missing: ${source}`);
}
const size = statSync(source).size;
if (size > 1048576) {
  throw new Error(`entry image too large: ${size} bytes (max 1048576)`);
}
copyFileSync(source, target);
const written = statSync(target).size;
if (written !== size) {
  throw new Error(`entry image write mismatch: wrote ${written} bytes, expected ${size}`);
}
