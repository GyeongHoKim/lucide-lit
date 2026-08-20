#!/usr/bin/env node
/**
 * Stamps the module format of each dist bundle directory.
 *
 * The root package.json has no "type" field, so Node and TypeScript treat every
 * .js file under dist/ as CommonJS. That breaks `moduleResolution: node16`
 * consumers importing the ESM build. Marking each directory explicitly keeps
 * both builds resolvable in their own format.
 * Run via: npm run build:pkg
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');

const formats = [
  ['esm', 'module'],
  ['cjs', 'commonjs'],
];

for (const [dir, type] of formats) {
  const target = path.join(DIST, dir);
  if (!fs.existsSync(target)) {
    throw new Error(`Missing bundle directory: ${target}`);
  }
  fs.writeFileSync(
    path.join(target, 'package.json'),
    `${JSON.stringify({ type }, null, 2)}\n`,
  );
  console.log(`Stamped dist/${dir}/package.json as "type": "${type}"`);
}
