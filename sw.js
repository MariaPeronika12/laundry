// Bilas Laundry Service Worker
// Version: 2.0.0 - Update this when changing cached assets

const CACHE_NAME = 'bilas-laundry-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './admin.html',
  './404.html',
  './style.css',
  './script.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=Figtree:wght@400;600&display=swap'
];

// Install - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { credentials: 'same-origin' })));
    }).catch(err => console.error('[SW] Cache install failed:', err))
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (fonts, etc.) - let them go to network
  if (url.origin !== location.origin && !url.href.includes('fonts.googleapis.com')) {
    return;
  }

  // Strategy: Cache First for static assets, Network First for HTML
  const isHTML = request.headers.get('accept')?.includes('text/html');
  const isStaticAsset = request.destination === 'style' || 
                        request.destination === 'script' || 
                        request.destination === 'image' ||
                        url.pathname.endsWith('.css') ||
                        url.pathname.endsWith('.js') ||
                        url.pathname.endsWith('.json');

  if (isStaticAsset) {
    // Cache First for static assets
    event.respondWith(cacheFirst(request));
  } else if (isHTML) {
    // Network First for HTML (always try to get fresh content)
    event.respondWith(networkFirst(request));
  } else {
    // Default: Network First
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    console.error('[SW] Fetch failed:', err);
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cached = await cache.match(request);
    if (cached) return cached;
    
    // Fallback for HTML pages
    if (request.headers.get('accept')?.includes('text/html')) {
      const offlinePage = await cache.match('./index.html');
      if (offlinePage) return offlinePage;
    }
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Background Sync for form submissions (when online)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-booking' || event.tag === 'sync-order') {
    event.waitUntil(syncPendingData(event.tag));
  }
});

async function syncPendingData(tag) {
  // This would sync localStorage data to server when online
  // For now, just log - would need backend integration
  console.log('[SW] Background sync:', tag);
}

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'Ada update dari Bilas Laundry',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🧺</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🧺</text></svg>',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: [
      { action: 'open', title: 'Buka' },
      { action: 'close', title: 'Tutup' }
    ]
  };
  
  event.waitUntil(self.registration.showNotification(data.title || 'Bilas Laundry', options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open') {
    event.waitUntil(clients.openWindow('./index.html'));
  }
});

// Periodic sync for updates (future)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-updates') {
    event.waitUntil(checkForUpdates());
  }
});

async function checkForUpdates() {
  // Could check for new version and prompt refresh
  console.log('[SW] Checking for updates...');
}