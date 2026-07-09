import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

// Embute o CSS do build direto no <head> do index.html e remove o <link
// rel="stylesheet"> correspondente. O CSS deixa de ser um recurso que bloqueia
// a renderização no caminho crítico -> melhora FCP e LCP (principalmente no
// mobile). Roda no final (closeBundle), depois da pré-renderização.
function inlineCssPlugin() {
  return {
    name: 'inline-css',
    closeBundle() {
      const dist = fileURLToPath(new URL('./dist', import.meta.url));
      const htmlPath = path.join(dist, 'index.html');
      if (!fs.existsSync(htmlPath)) return;
      let html = fs.readFileSync(htmlPath, 'utf8');

      const linkRe = /<link[^>]+rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g;
      let match: RegExpExecArray | null;
      const links: { tag: string; href: string }[] = [];
      while ((match = linkRe.exec(html)) !== null) {
        links.push({ tag: match[0], href: match[1] });
      }

      for (const { tag, href } of links) {
        const cssPath = path.join(dist, href.replace(/^\//, ''));
        if (!fs.existsSync(cssPath)) continue;
        const css = fs.readFileSync(cssPath, 'utf8');
        html = html.replace(tag, `<style>${css}</style>`);
      }

      fs.writeFileSync(htmlPath, html);
    },
  };
}

// Shim mínimo de `document` para a pré-renderização (Node). Algumas libs
// (framer-motion/lucide) podem tocar em `document` ao serem avaliadas. Injetado
// no topo de cada chunk; no browser é no-op. NÃO define `window` — assim as
// guardas de SSR (typeof window === 'undefined') continuam funcionando.
const DOCUMENT_SHIM = `if(typeof document==='undefined'){var __d=function(){return{style:{},setAttribute:function(){},removeAttribute:function(){},appendChild:function(){},removeChild:function(){},getAttribute:function(){return null},addEventListener:function(){},removeEventListener:function(){},classList:{add:function(){},remove:function(){}}}};globalThis.document={createElement:__d,createElementNS:__d,createTextNode:function(){return{}},createComment:function(){return{}},documentElement:__d(),head:__d(),body:__d(),getElementById:function(){return null},querySelector:function(){return null},querySelectorAll:function(){return[]},addEventListener:function(){},removeEventListener:function(){}};}`;

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
    // Pré-renderização estática (SSG): gera o HTML já montado dentro do #root no
    // build; o app hidrata no cliente. Reduz drasticamente LCP/FCP.
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: fileURLToPath(new URL('./src/prerender.tsx', import.meta.url)),
    }),
    inlineCssPlugin(),
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
        // Injeta o shim de `document` no topo de cada chunk (necessário na
        // pré-renderização em Node).
        intro: DOCUMENT_SHIM,
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