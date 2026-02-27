const DEV_MODE = true; // 🔴 coloque false quando publicar

const CACHE_NAME = "smooth-cache-v17";

const FILES_TO_CACHE = [
  "/",
  "index.html",
  "offline.html",

  "css/global/reset.css",
  "css/global/base.css",
  "css/theme/theme.css",

  "img/icons/icone-smooth.png",
  "img/icons/icone-maskable.png"
];


/* ========================
   INSTALL
======================== */
self.addEventListener("install", event => {
  self.skipWaiting();

  if (!DEV_MODE) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(FILES_TO_CACHE))
    );
  }
});


/* ========================
   ACTIVATE
======================== */
self.addEventListener("activate", event => {
  self.clients.claim();

  if (!DEV_MODE) {
    event.waitUntil(
      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
    );
  }
});


/* ========================
   FETCH
======================== */
self.addEventListener("fetch", event => {

  // 👉 MODO DESENVOLVIMENTO
  if (DEV_MODE) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 👉 MODO PRODUÇÃO (seu código original)
  event.respondWith(
    caches.match(event.request).then(cached => {

      if (cached) return cached;

      return fetch(event.request)
        .then(response => {

          if (
            response.status === 200 &&
            response.type === "basic"
          ) {
            const clone = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, clone));
          }

          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("offline.html");
          }
        });

    })
  );
});
