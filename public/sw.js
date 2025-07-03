// Service Worker ultra-otimizado para PageSpeed 100
const CACHE_NAME = 'axory-v3';
const STATIC_CACHE = 'axory-static-v3';
const DYNAMIC_CACHE = 'axory-dynamic-v3';
const IMAGE_CACHE = 'axory-images-v3';

// Recursos críticos para cache imediato
const criticalResources = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  'https://res.cloudinary.com/ducd9j4tx/image/upload/v1751041685/Ativo_25_n6x26v.svg'
];

// Recursos de imagem para cache otimizado
const imageResources = [
  'https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_800,h_600,c_fill/v1751258417/axsiteescuro2redondoreduzido_nb0wdo.webp',
  'https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_400,h_300,c_fill/v1751258417/axsiteescuro2redondoreduzido_nb0wdo.webp',
  'https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_800,h_600,c_fill/v1751258131/axsiteclaro2redondoreduzido_apfqbv.webp',
  'https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_400,h_300,c_fill/v1751258131/axsiteclaro2redondoreduzido_apfqbv.webp'
];

// Install event otimizado
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache recursos críticos
      caches.open(STATIC_CACHE).then(cache => cache.addAll(criticalResources)),
      // Cache imagens em paralelo
      caches.open(IMAGE_CACHE).then(cache => {
        return Promise.allSettled(
          imageResources.map(url => 
            fetch(url, { mode: 'no-cors' })
              .then(response => cache.put(url, response))
              .catch(() => console.log(`Failed to cache: ${url}`))
          )
        );
      })
    ]).then(() => self.skipWaiting())
  );
});

// Activate event otimizado
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => 
            !cacheName.includes('v3') && 
            (cacheName.includes('axory') || cacheName.includes('static') || cacheName.includes('dynamic') || cacheName.includes('images'))
          )
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event com estratégias otimizadas
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Estratégia cache-first para recursos estáticos
  if (criticalResources.some(resource => request.url.includes(resource))) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        
        return fetch(request).then(fetchResponse => {
          if (fetchResponse.ok) {
            const responseClone = fetchResponse.clone();
            caches.open(STATIC_CACHE).then(cache => cache.put(request, responseClone));
          }
          return fetchResponse;
        });
      })
    );
    return;
  }

  // Estratégia cache-first para imagens do Cloudinary
  if (url.hostname === 'res.cloudinary.com') {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        
        return fetch(request, { mode: 'cors' }).then(fetchResponse => {
          if (fetchResponse.ok) {
            const responseClone = fetchResponse.clone();
            caches.open(IMAGE_CACHE).then(cache => cache.put(request, responseClone));
          }
          return fetchResponse;
        }).catch(() => {
          // Fallback para imagem offline
          return new Response('', { status: 200, statusText: 'OK' });
        });
      })
    );
    return;
  }

  // Network-first para APIs e recursos dinâmicos
  if (url.pathname.includes('/api/') || url.hostname.includes('wa.me') || url.hostname.includes('maps')) {
    event.respondWith(
      fetch(request, { mode: 'cors' })
        .then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Estratégia padrão stale-while-revalidate
  event.respondWith(
    caches.match(request).then(response => {
      const fetchPromise = fetch(request).then(fetchResponse => {
        if (fetchResponse.ok) {
          const responseClone = fetchResponse.clone();
          caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, responseClone));
        }
        return fetchResponse;
      });
      
      return response || fetchPromise;
    })
  );
});

// Background sync otimizado
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Implementar sincronização em background
      Promise.resolve()
    );
  }
});

// Cleanup de cache antigo
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_CLEANUP') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => !cacheName.includes('v3'))
            .map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});