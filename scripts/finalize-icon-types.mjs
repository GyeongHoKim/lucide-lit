#!/usr/bin/env node
/**
 * Flattens the per-icon .d.ts files rollup-plugin-dts emits into
 * dist/dts-icons-tmp/src/icons/*.d.ts (it does not honor preserveModulesRoot)
 * into dist/esm/icons/*.d.ts, matching the per-icon .js files there.
 * Run via: npm run build:bundles (chained after rollup)
 */

import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const TMP_DIR = path.join(ROOT, 'dist/dts-icons-tmp/src/icons');
const OUT_DIR = path.join(ROOT, 'dist/esm/icons');

function main() {
  if (!fs.existsSync(TMP_DIR)) {
    console.log('No icon .d.ts files to finalize, skipping.');
    return;
  }

  const files = fs.readdirSync(TMP_DIR).filter((f) => f.endsWith('.d.ts'));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const file of files) {
    fs.renameSync(path.join(TMP_DIR, file), path.join(OUT_DIR, file));
  }

  fs.rmSync(path.join(ROOT, 'dist/dts-icons-tmp'), { recursive: true, force: true });

  console.log(`Finalized ${files.length} icon .d.ts files in dist/esm/icons/`);
}

main();
