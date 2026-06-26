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
    'https://res.cloudinary.com/ducd9j4tx/image/upload/v1751041685/Ativo_25_n6x26v.svg',
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