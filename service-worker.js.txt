const CACHE_NAME = "troll-platformer-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./player.png",   // যদি থাকে
  "./flag.png",     // যদি থাকে
  "./styles.css",   // যদি থাকে
  "./script.js"     // যদি আলাদা JS থাকে
];

// ✅ Install event - cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// ✅ Fetch event - serve from cache if offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// ✅ Activate event - clear old cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});
