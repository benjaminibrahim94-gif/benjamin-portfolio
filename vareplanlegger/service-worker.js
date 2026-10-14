const CACHE_NAME = "vareplanlegger-v1";
const APP_FILES = [
  "./vareplanlegger.html",
  "./butikkplan-ny.png",
  "./manifest.webmanifest",
  "./icons/app-192.png",
  "./icons/app-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith("vareplanlegger-") && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(async response => {
          const cache = await caches.open(CACHE_NAME);
          await cache.put("./vareplanlegger.html", response.clone());
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match("./vareplanlegger.html");
          if (cachedPage) return cachedPage;
          throw new Error("Vareplanlegger finnes ikke i offline-bufferen.");
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(cached => cached || fetch(request).then(response => {
        if (!response.ok) return response;
        return caches.open(CACHE_NAME)
          .then(cache => cache.put(request, response.clone()))
          .then(() => response);
      }))
  );
});
