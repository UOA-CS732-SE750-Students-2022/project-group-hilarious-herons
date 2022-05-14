var APP_PREFIX = 'FUNTER'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_1.0.0'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + "_" + VERSION
var URLS = [
    'index.html'
]

// Install Service Worker and cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Installing cache: ' + CACHE_NAME);
                return cache.addAll(URLS);
            })
    )
});

// Listen for requests and respond with cached resources
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(function (request) {
                if (request) { // If cache is available, respond with cache
                    console.log('responding with cache : ' + event.request.url)
                    return request
                } else {       // If there is no cache, try fetching request
                    console.log('file is not cached, fetching : ' + event.request.url)
                    return fetch(event.request)
                }
            })
    )
});

// Activate the Service Worker and delete outdated caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    console.log('Deleting cache: ' + cacheName)
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});