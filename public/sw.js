const pwaCache = "pwa-cache-1";
const staticCache = ["/index.html"];

self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(pwaCache).then((cache) => cache.addAll(staticCache))
    );
    // self.skipWaiting();
});


self.addEventListener("activate", (e) => {
    let cacheCleaned = caches.keys().then((keys) => {
      keys.forEach((key) => {
        if (key != pwaCache) return caches.delete(key);
      });
    });
  
    e.waitUntil(cacheCleaned);
});


self.addEventListener("fetch", (e) => {
  // 1. cache and network race with offline content
  let firstResponse = new Promise((resolve, reject) => {
    let firstRejectionReceived = false;

    const rejectOnce = () => {
      if (firstRejectionReceived) {
        reject("No response received..");
      } else {
        firstRejectionReceived = true;
      }
    };

    fetch(e.request)
      .then((res) => {
        res.ok
          ? caches.open(pwaCache).then((cache) => {
              cache.put(e.request, res.clone());
              return resolve(res);
            })
          : rejectOnce();
      })
      .catch(rejectOnce);

    caches.match(e.request).then((res) => {
      res ? resolve(res) : rejectOnce();
    });
  });

  e.respondWith(firstResponse);
});
