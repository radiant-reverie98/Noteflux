import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  server: {
    port: 5173,
    cors: true,
    proxy: {
      // Redirects API calls to your backend in dev mode
      '/api': {
        target: 'https://noteflux.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },

  build: {
    rollupOptions: {
      input: '/index.html',
    },
  },
});
