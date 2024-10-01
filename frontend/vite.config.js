import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',            // Use 'gzip' for Gzip compression
      ext: '.gz',                   // Use '.gz' extension for Gzip-compressed files
      // threshold: 10240,             // Only compress files larger than 10KB
      deleteOriginFile: false,      // Keep the original uncompressed files
    }),
  ],
  assetsInclude: ['**/*.pdf', "**/*.PDF"],      // Include PDF files as assets
});
