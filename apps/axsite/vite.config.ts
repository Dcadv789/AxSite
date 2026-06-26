import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Otimizações do React
      babel: {
        plugins: [
          // Remove PropTypes em produção
          ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]
        ]
      }
    })
    ,
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
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['lucide-react']
  },
  build: {
    // Otimizações agressivas de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Chunks otimizados para cache
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          ui: ['@radix-ui/react-scroll-area', '@radix-ui/react-separator', '@radix-ui/react-tabs']
        },
        // Nomes de arquivos otimizados
        chunkFileNames: 'assets/[name]-[hash:8].js',
        entryFileNames: 'assets/[name]-[hash:8].js',
        assetFileNames: 'assets/[name]-[hash:8].[ext]'
      }
    },
    // Configurações de performance
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 2048, // Reduzido para evitar payloads grandes
    chunkSizeWarningLimit: 800, // Reduzido para chunks menores
    cssMinify: 'esbuild',
    // Otimização de target
    target: 'es2020',
    // Compressão
    reportCompressedSize: false
  },
  server: {
    proxy: {
      '/api/loops': {
        target: 'https://app.loops.so',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/loops/, ''),
        secure: false
      }
    },
    host: true,
    port: 5173
  },
  preview: {
    port: 4173,
    host: true,
    headers: {
      // Headers de cache para preview
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  },
  // Configurações de SSR otimizadas
  ssr: {
    noExternal: ['framer-motion']
  },
  // Configurações de worker
  worker: {
    format: 'es'
  }
});