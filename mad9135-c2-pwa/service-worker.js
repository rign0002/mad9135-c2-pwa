importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}


workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.NetworkFirst()
  );
  

const staticCacheName ='site-static'
const assets = [
    '/',
    '/index.html',
    '/index.js',
    '/index.css',
    '/http://api.openweathermap.org/data/2.5/weather?',
    '/manifest.json',
    '/icons'
]

// install service worker
self.addEventListener('install', ev => {
    ev.waitUntil(
        caches.open(staticCacheName).then(cache => {
        console.log('caching shell assets')
            cache.addAll(assets)
        })        
    )
})


// fetch event

self.addEventListener('fetch', ev => {
    console.log(ev)
})