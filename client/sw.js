const staticCacheName = "static-site-v4"
const dynamicCacheName = "dinamic-site"

const ASSETS = [
    "/",
    "/index.html",
    "/src/index.css",
    "/src/App.tsx",
    "/src/index.tsx",
    "/src/pages/infoPage",
    "/src/pages/mainFieldPage",
    "/src/pages/mainPage",
    "/src/components/NavBar",
    "/src/components/Loader",
    "/src/assets/img/add.png",
    "/src/assets/img/search_icon.png",
    "/src/assets/img/sleep.png",
    "/src/assets/img/logo.png",
    "/src/assets/img/close.svg",
    "/src/assets/img/logOut.svg",
    "/src/assets/img/menu.svg",
    "/src/pages/errorPage",
    "/src/pages/notFoundPage",
]

self.addEventListener('install', async (event) => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(ASSETS)
});

self.addEventListener('activate', async (event) => {
    const cashesKeysArr = await caches.keys()
    await Promise.all(cashesKeysArr.filter(key => key !== staticCacheName && key !== staticCacheName).map(key => caches.delete(key)))
});

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request))
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    try {
        return cached ?? await fetch(request).then(response => {
            return networkFirst(request);
        });
    } catch (error) {
        return networkFirst(request)
    }
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    } catch (error) {
        const cached = await cache.match(request);
        return cached ?? await caches.match("/src/pages/notFoundPage/notFoundPage.tsx");
    }
}