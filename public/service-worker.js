const cacheName = 'dev-dannys-site-v1';

const assets = [
    '/',
    '/index.html',
    'http://localhost:3000/',
    '/app.js',


];

self.addEventListener('install', (event) => {
    // Etapa de instalación
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                return cache.addAll(assets);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((name) => {
                        if (name !== cacheName) {
                            return caches.delete(name);
                        }
                    })
                );
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: 'icon.png',
        badge: 'badge.png',
    };

    event.waitUntil(
        self.registration.showNotification('Notificación Push', options)
    );
});