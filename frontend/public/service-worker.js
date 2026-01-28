// Service Worker for 365-Dev-Tools
// Provides offline functionality and caching

const CACHE_NAME = '365-dev-tools-v1';
const RUNTIME_CACHE = '365-dev-tools-runtime-v1';

// Assets to precache
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/logo.png',
    '/manifest.json'
];

// Install event - precache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Precaching assets');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => {
                        return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
                    })
                    .map((cacheName) => {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // Return cached response and update cache in background
                event.waitUntil(
                    fetch(request).then((response) => {
                        if (response && response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(RUNTIME_CACHE).then((cache) => {
                                cache.put(request, responseClone);
                            });
                        }
                    }).catch(() => {
                        // Network failed, but we have cache
                    })
                );
                return cachedResponse;
            }

            // Not in cache, fetch from network
            return fetch(request).then((response) => {
                // Don't cache non-successful responses
                if (!response || response.status !== 200 || response.type === 'error') {
                    return response;
                }

                // Clone response for caching
                const responseClone = response.clone();

                caches.open(RUNTIME_CACHE).then((cache) => {
                    cache.put(request, responseClone);
                });

                return response;
            }).catch(() => {
                // Network failed and no cache
                // Return offline page if available
                if (request.destination === 'document') {
                    return caches.match('/offline.html');
                }
            });
        })
    );
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(RUNTIME_CACHE).then((cache) => {
                return cache.addAll(event.data.urls);
            })
        );
    }
});

console.log('Service Worker loaded');
