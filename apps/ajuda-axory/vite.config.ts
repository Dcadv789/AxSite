import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'clear-sw-dev',
      configureServer(server) {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Clear-Site-Data', '"executionContexts"');
          next();
        });
      },
    },
  ],
  server: {
    host: true,
    port: 5180,
  },
  preview: {
    port: 4180,
    host: true,
  },
});