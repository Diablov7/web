// Service Worker DISABLED for debugging
// This version clears all caches and disables caching

self.addEventListener('install', (event) => {
  console.log('🚫 Service Worker: Cache disabled for debugging');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('🗑️ Service Worker: Clearing all caches');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('🗑️ Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Don't cache anything - always fetch from network
  event.respondWith(fetch(event.request));
});