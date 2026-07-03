import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

const SITE_URL = 'https://ajuda.axory.com.br';

// Shim mínimo de `document` para o processo de pré-renderização (Node).
// Algumas libs de conteúdo (react-markdown & cia.) tocam em `document` ao
// serem avaliadas. Injetado no topo de cada chunk; no browser é no-op
// (document já existe). NÃO define `window` — assim a guarda de SSR do
// useTheme (typeof window === 'undefined') continua funcionando.
const DOCUMENT_SHIM = `if(typeof document==='undefined'){var __d=function(){return{style:{},setAttribute:function(){},removeAttribute:function(){},appendChild:function(){},removeChild:function(){},getAttribute:function(){return null},addEventListener:function(){},removeEventListener:function(){},classList:{add:function(){},remove:function(){}}}};globalThis.document={createElement:__d,createElementNS:__d,createTextNode:function(){return{}},createComment:function(){return{}},documentElement:__d(),head:__d(),body:__d(),getElementById:function(){return null},querySelector:function(){return null},querySelectorAll:function(){return[]},addEventListener:function(){},removeEventListener:function(){}};}`;

// Gera dist/sitemap.xml a partir das páginas pré-renderizadas (cada index.html).
function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      const dist = fileURLToPath(new URL('./dist', import.meta.url));
      if (!fs.existsSync(dist)) return;
      const urls: string[] = [];
      const walk = (dir: string, rel: string) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          if (entry.isDirectory()) {
            walk(path.join(dir, entry.name), `${rel}/${entry.name}`);
          } else if (entry.name === 'index.html') {
            urls.push(rel === '' ? `${SITE_URL}/` : `${SITE_URL}${rel}`);
          }
        }
      };
      walk(dist, '');
      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls
          .sort()
          .map((u) => `  <url><loc>${u}</loc></url>`)
          .join('\n') +
        `\n</urlset>\n`;
      fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    // Gera HTML estático por rota em build (conteúdo legível sem JavaScript,
    // para crawlers/leitores de IA), depois o app hidrata no cliente.
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: fileURLToPath(new URL('./src/prerender.tsx', import.meta.url)),
    }),
    sitemapPlugin(),
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
  build: {
    rollupOptions: {
      output: {
        intro: DOCUMENT_SHIM,
      },
    },
  },
  server: {
    host: true,
    port: 5180,
  },
  preview: {
    port: 4180,
    host: true,
  },
});
