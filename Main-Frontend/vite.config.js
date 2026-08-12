import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // ALIAS
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    react(),

    visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),

    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
    }),

    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    }),
  ],
  // PDF assets
  assetsInclude: ['**/*.pdf', '**/*.PDF'],

  // Development server
  server: {
    host: 'localhost',
    port: 5174,
  },

  // Production build preview
  preview: {
    host: 'localhost',
    port: 4173,
  },
});
