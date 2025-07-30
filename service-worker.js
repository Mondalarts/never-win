const CACHE_NAME = "troll-platformer-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  // Add external images used in your game:
  "https://i.ibb.co/1Gk0yV0F/vecteezy-pixel-art-characters-illustration-49049830-removebg-preview-1.png",
  "https://i.ibb.co/VWV1TP3s/pixel-flag-icon-vector-art-260nw-2145467049-removebg-preview.png"
  // Add your local JS or CSS files here if any, e.g. "./script.js"
];

// Install event - cache everything in urlsToCache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event - respond with cache first, fallback to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
