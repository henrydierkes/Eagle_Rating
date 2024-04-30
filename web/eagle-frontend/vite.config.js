import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      // external: ['@material-ui/core/styles'], // Add @material-ui/core/styles to the external dependencies
    },
  },
});
