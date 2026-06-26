// Utilitários de performance

// Debounce para eventos de scroll/resize
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle para eventos frequentes
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Preload de imagens críticas
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Preload de recursos críticos
export async function preloadCriticalResources() {
  const criticalImages = [
    'https://img.axory.com.br/insecure/rs:fit:1440:1080/q:95/plain/https://storage.axory.com.br/imagens-saas-sites/Logo_axory_branco.svg@webp',
    'https://img.axory.com.br/insecure/rs:fit:1440:1080/q:95/plain/https://storage.axory.com.br/imagens-saas-sites/Ativo_35_-_Logo_Azul_Cinza_feb1hr%20(1).svg@webp',
    'https://aznchizusxvfegpubttp.supabase.co/storage/v1/object/public/logos//banner1.svg',
  ];

  try {
    await Promise.all(criticalImages.map(preloadImage));
  } catch (error) {
    console.warn('Failed to preload some critical resources:', error);
  }
}

// Lazy loading de componentes
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return React.lazy(importFunc);
}

// Otimização de re-renders
export function areEqual<T>(prevProps: T, nextProps: T): boolean {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

// Web Vitals tracking
export function trackWebVitals() {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
}