import plugins from '@lucide/rollup-plugins';
import pkg from './package.json' with { type: 'json' };

const isLitExternal = (id) => id === 'lit' || id.startsWith('lit/');

// ESM-only build. Type declarations are emitted separately by
// `npm run build:types` (tsc --emitDeclarationOnly), so this config only
// produces JavaScript.
export default {
  input: 'src/lucide-lit.ts',
  plugins: plugins({ pkg }),
  external: isLitExternal,
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
  },
};
