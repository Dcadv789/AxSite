import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n';

// Executado no build (Node) pelo vite-prerender-plugin: gera o HTML estático
// que vai dentro do #root. A árvore precisa ser IDÊNTICA à do main.tsx para a
// hidratação no cliente bater sem "mismatch".
export async function prerender() {
  const html = renderToString(
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  );

  return {
    html,
    links: new Set<string>(['/']),
    head: {
      lang: 'pt-BR',
    },
  };
}
