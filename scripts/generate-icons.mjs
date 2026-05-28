#!/usr/bin/env node
/**
 * Generates src/icons/ TypeScript files from the installed lucide npm package.
 * Run via: npm run build:icons
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ICONS_ESM_DIR = path.resolve(ROOT, 'node_modules/lucide/dist/esm/icons');
const OUT_DIR = path.resolve(ROOT, 'src/icons');
const ALIASES_DIR = path.resolve(ROOT, 'src/aliases');

const toPascalCase = (str) =>
  str.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());

function iconFileContent(componentName, iconName, iconNode) {
  return `import createLucideIcon from '../createLucideIcon';
import type { IconNode } from '../types';

const iconNode: IconNode = ${JSON.stringify(iconNode)};

/**
 * @component @name ${componentName}
 * @see https://lucide.dev/icons/${iconName}
 */
const ${componentName} = createLucideIcon('${iconName}', iconNode);

export default ${componentName};
`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(ALIASES_DIR, { recursive: true });

  const iconFiles = fs
    .readdirSync(ICONS_ESM_DIR)
    .filter((f) => f.endsWith('.mjs') && !f.endsWith('.map.mjs'));

  const exports = [];

  for (const file of iconFiles) {
    const iconName = file.replace(/\.mjs$/, '');
    const componentName = toPascalCase(iconName);

    const mod = await import(pathToFileURL(path.join(ICONS_ESM_DIR, file)).href);
    const iconNode = mod.default;

    const tsContent = iconFileContent(componentName, iconName, iconNode);
    fs.writeFileSync(path.join(OUT_DIR, `${componentName}.ts`), tsContent, 'utf-8');

    exports.push(`export { default as ${componentName} } from './${componentName}';`);
  }

  fs.writeFileSync(
    path.join(OUT_DIR, 'index.ts'),
    exports.join('\n') + '\n',
    'utf-8',
  );

  // Stub alias files so entrypoints compile cleanly
  const aliasStub = '// aliases are not yet generated\nexport {};\n';
  ['aliases.ts', 'prefixed.ts', 'suffixed.ts'].forEach((f) => {
    const target = path.join(ALIASES_DIR, f);
    if (!fs.existsSync(target)) {
      fs.writeFileSync(target, aliasStub, 'utf-8');
    }
  });

  console.log(`Generated ${exports.length} icons in src/icons/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
