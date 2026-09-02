import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets load correctly on GitHub Pages (/sbl001/), Firebase, Vercel, or custom domains
  server: {
    port: 3000,
    open: false
  }
});
