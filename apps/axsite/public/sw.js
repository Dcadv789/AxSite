// Service Worker ultra-otimizado para PageSpeed 100
const CACHE_NAME = 'axory-v4';
const STATIC_CACHE = 'axory-static-v4';
const DYNAMIC_CACHE = 'axory-dynamic-v4';
const IMAGE_CACHE = 'axory-images-v4';

// Recursos críticos para cache imediato
const criticalResources = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  'https://img.axory.com.br/insecure/rs:fit:262:64/q:95/plain/https://storage.axory.com.br/imagens-saas-sites/Ativo_35_-_Logo_Azul_Cinza_feb1hr%20(1).svg@webp'
];

// Recursos de imagem para cache otimizado
const imageResources = [
  'https://img.axory.com.br/insecure/rs:fill:800:600/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558363210-axsiteescuro.png@webp',
  'https://img.axory.com.br/insecure/rs:fill:400:300/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558363210-axsiteescuro.png@webp',
  'https://img.axory.com.br/insecure/rs:fill:800:600/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558454045-axsiteclaro2redondo.png@webp',
  'https://img.axory.com.br/insecure/rs:fill:400:300/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558454045-axsiteclaro2redondo.png@webp'
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
            !cacheName.includes('v4') && 
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

  // Estratégia cache-first para imagens (proxy img.axory.com.br)
  if (url.hostname === 'img.axory.com.br') {
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
            .filter(cacheName => !cacheName.includes('v4'))
            .map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});