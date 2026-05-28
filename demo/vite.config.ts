import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const demoRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: demoRoot,
  base: '/lucide-lit/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
