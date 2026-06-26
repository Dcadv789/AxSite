import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { GTMEvents, gtmEvent, trackScrollDepth, trackTimeOnPage } from './utils/gtm.ts';

// Otimizações críticas de performance
const initializeApp = async () => {
  // Remove loading spinner
  const removeLoadingSpinner = () => {
    document.body.classList.add('loaded');
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
      spinner.remove();
    }
  };

  // Preload recursos críticos de forma assíncrona
  const preloadCriticalResources = () => {
    const criticalImages = [
      'https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_800,h_600,c_fill/v1751258417/axsiteescuro2redondoreduzido_nb0wdo.webp',
      'https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_400,h_300,c_fill/v1751258417/axsiteescuro2redondoreduzido_nb0wdo.webp'
    ];

    // Preload sem bloquear o render
    const scheduleIdle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 } as IdleDeadline), 1));
    scheduleIdle(() => {
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    });
  };

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const root = createRoot(rootElement);

  // Render imediato da aplicação
  root.render(
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  );

  // Otimizações pós-render
  removeLoadingSpinner();
  preloadCriticalResources();

  // Inicializar tracking do GTM
  if (import.meta.env.PROD) {
    // Page view inicial
    GTMEvents.pageView('Home');
    
    // Inicializar tracking de scroll e tempo
    trackScrollDepth();
    trackTimeOnPage();
  }

  // Web Vitals tracking apenas em produção
  if (import.meta.env.PROD) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => {
        gtmEvent('web_vital', {
          metric_name: 'CLS',
          metric_value: metric.value,
          metric_rating: metric.rating
        });
      });
      getFID((metric) => {
        gtmEvent('web_vital', {
          metric_name: 'FID',
          metric_value: metric.value,
          metric_rating: metric.rating
        });
      });
      getFCP((metric) => {
        gtmEvent('web_vital', {
          metric_name: 'FCP',
          metric_value: metric.value,
          metric_rating: metric.rating
        });
      });
      getLCP((metric) => {
        gtmEvent('web_vital', {
          metric_name: 'LCP',
          metric_value: metric.value,
          metric_rating: metric.rating
        });
      });
      getTTFB((metric) => {
        gtmEvent('web_vital', {
          metric_name: 'TTFB',
          metric_value: metric.value,
          metric_rating: metric.rating
        });
      });
    }).catch(() => {
      // Silently fail se web-vitals não estiver disponível
    });
  }
};

// Inicialização otimizada
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Error boundaries globais
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  // Enviar erro para GTM
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
  
  // Enviar erro para GTM
  if (import.meta.env.PROD) {
    gtmEvent('promise_rejection', {
      error_message: event.reason?.message || 'Unknown promise rejection',
      page_location: window.location.href
    });
  }
});

// Service Worker registration otimizado
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('SW registered:', registration);
        
        // Update automático do SW
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Novo SW disponível
                newWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            });
          }
        });
      })
      .catch(error => console.log('SW registration failed:', error));
  });
}