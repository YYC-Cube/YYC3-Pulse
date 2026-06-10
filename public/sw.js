/**
 * service-worker.js
 * =================
 * YYC³ Pulse — PWA Service Worker
 * 离线缓存策略：Cache First 逐个缓存（单个资源失败不影响其余）
 */

const CACHE_NAME = "yyc3-pulse-v1";

const PRECACHE_URLS = [
  "/",
  "/site.webmanifest",
  "/icons/icon-64.png",
  "/icons/icon-256.png",
  "/icons/icon-512.png",
];

/** 逐个缓存资源，单个失败不影响其余 */
async function cacheResources(cache: Cache, urls: string[]) {
  for (const url of urls) {
    try {
      const request = new Request(url, { cache: "no-cache" });
      const response = await fetch(request);
      if (response.ok) {
        await cache.put(request, response);
      }
    } catch {
      // 单个资源缓存失败不阻塞整体
    }
  }
}

// 安装：逐个预缓存关键资源
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cacheResources(cache, PRECACHE_URLS))
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// 拦截请求：Cache First with Network Fallback
self.addEventListener("fetch", (event) => {
  // 只缓存 GET 请求
  if (event.request.method !== "GET") return;

  // 不缓存 API 请求
  if (event.request.url.includes("/api/")) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((response) => {
        // 只缓存有效响应
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          try {
            cache.put(event.request, responseToCache);
          } catch { /* 忽略缓存写入失败 */ }
        });

        return response;
      }).catch(() => {
        // 网络离线时返回空白页或 fallback
        return caches.match("/");
      });
    })
  );
});
