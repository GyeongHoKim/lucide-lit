import fs from 'fs';
import path from 'path';
import plugins from '@lucide/rollup-plugins';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' with { type: 'json' };

const packageName = 'LucideLit';
const outputFileName = 'lucide-lit';
const outputDir = 'dist';
const inputs = [`src/lucide-lit.ts`];

const iconsSrcDir = 'src/icons';
const iconInputs = fs.existsSync(iconsSrcDir)
  ? fs
      .readdirSync(iconsSrcDir)
      .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
      .map((f) => path.join(iconsSrcDir, f))
  : [];
const bundles = [
  {
    format: 'cjs',
    inputs,
    outputDir,
  },
  {
    format: 'esm',
    inputs,
    outputDir,
    preserveModules: true,
  },
];

const isLitExternal = (id) => id === 'lit' || id.startsWith('lit/');

const configs = bundles
  .map(({ inputs, outputDir, format, preserveModules }) =>
    inputs.map((input) => ({
      input,
      plugins: plugins({ pkg }),
      external: isLitExternal,
      output: {
        name: packageName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}.js`,
            }),
        preserveModules,
        format,
        sourcemap: true,
        preserveModulesRoot: 'src',
      },
    })),
  )
  .flat();

export default [
  {
    input: inputs[0],
    output: [
      {
        file: `dist/${outputFileName}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: `src/${outputFileName}.suffixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.suffixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: `src/${outputFileName}.prefixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.prefixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  ...(iconInputs.length > 0
    ? [
        {
          // rollup-plugin-dts does not honor preserveModulesRoot, so this
          // writes to a temp dir mirroring the source path; finalize-icon-types.mjs
          // flattens it into dist/esm/icons/*.d.ts afterwards.
          input: iconInputs,
          output: {
            dir: `${outputDir}/dts-icons-tmp`,
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: iconsSrcDir,
          },
          plugins: [dts()],
        },
      ]
    : []),
  ...configs,
];
