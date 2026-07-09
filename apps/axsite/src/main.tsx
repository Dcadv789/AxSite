import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { GTMEvents, gtmEvent, trackScrollDepth, trackTimeOnPage } from './utils/gtm.ts';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const app = (
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

// Monta a aplicação. Se o HTML já veio pré-renderizado (build/SSG), hidrata;
// senão (dev), monta do zero.
const mount = () => {
  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app);
  } else {
    createRoot(rootElement).render(app);
  }
};

// Em produção (SSG) o conteúdo já está visível a partir do HTML estático, então
// ADIAMOS a hidratação para o navegador conseguir pintar o LCP (hero) antes de o
// React ocupar a thread principal com o trabalho pesado de hidratação. Roda
// quando a thread fica ociosa (ou em no máximo 1.5s). Em dev monta na hora.
if (rootElement.hasChildNodes() && typeof requestIdleCallback === 'function') {
  requestIdleCallback(mount, { timeout: 1500 });
} else {
  mount();
}

// A detecção/troca de idioma acontece em um useEffect dentro de <App> (roda
// APÓS a hidratação), para o 1º render bater com o HTML pré-renderizado (pt-BR)
// e não gerar erro de hidratação (React #418/#425).

// Rastreamento de cliques via Umami (todos os botões e links). Listener único
// e delegado — não precisa marcar cada botão. Se o script do Umami ainda não
// carregou (defer) ou não existe (dev/preview), simplesmente não faz nada.
const setupUmamiClickTracking = () => {
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest('button, a');
      if (!el) return;

      const umami = (window as unknown as { umami?: { track: (name: string, data?: Record<string, unknown>) => void } }).umami;
      if (!umami || typeof umami.track !== 'function') return;

      const label =
        el.getAttribute('data-umami-event') ||
        el.getAttribute('aria-label') ||
        (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60) ||
        (el.tagName === 'A' ? el.getAttribute('href') || 'link' : 'button');

      const data: Record<string, unknown> = { tag: el.tagName.toLowerCase(), label };
      const href = el.getAttribute('href');
      if (href) data.href = href;

      umami.track('click', data);
    },
    true
  );
};
setupUmamiClickTracking();

// Inicializar tracking do GTM (apenas em produção)
if (import.meta.env.PROD) {
  GTMEvents.pageView('Home');
  trackScrollDepth();
  trackTimeOnPage();

  // Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS((metric) => gtmEvent('web_vital', { metric_name: 'CLS', metric_value: metric.value, metric_rating: metric.rating }));
    getFID((metric) => gtmEvent('web_vital', { metric_name: 'FID', metric_value: metric.value, metric_rating: metric.rating }));
    getFCP((metric) => gtmEvent('web_vital', { metric_name: 'FCP', metric_value: metric.value, metric_rating: metric.rating }));
    getLCP((metric) => gtmEvent('web_vital', { metric_name: 'LCP', metric_value: metric.value, metric_rating: metric.rating }));
    getTTFB((metric) => gtmEvent('web_vital', { metric_name: 'TTFB', metric_value: metric.value, metric_rating: metric.rating }));
  }).catch(() => {
    // Silently fail se web-vitals não estiver disponível
  });
}

// Error boundaries globais
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  if (import.meta.env.PROD) {
    gtmEvent('javascript_error', {
      error_message: event.error?.message || 'Unknown error',
      error_filename: event.filename,
      error_lineno: event.lineno,
      page_location: window.location.href
    });
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  if (import.meta.env.PROD) {
    gtmEvent('promise_rejection', {
      error_message: event.reason?.message || 'Unknown promise rejection',
      page_location: window.location.href
    });
  }
});

// Service Worker registration (apenas em produção)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            });
          }
        });
      })
      .catch(error => console.log('SW registration failed:', error));
  });
}
