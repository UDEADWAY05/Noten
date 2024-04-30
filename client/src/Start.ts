if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((req) => console.log("Service Worker registered", req))
        .catch((err) => console.log('Service Worker not registered', err))
}