import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import path from 'path';
import { fileURLToPath } from 'url';


// manually define __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip', // Use 'gzip' for Gzip compression
      ext: '.gz', // Use '.gz' extension for Gzip-compressed files
      // threshold: 10240,             // Only compress files larger than 10KB
      deleteOriginFile: false, // Keep the original uncompressed files
    }),
  ],
  assetsInclude: ['**/*.pdf', '**/*.PDF'], // Include PDF files as assets
});
