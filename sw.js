const version = 1;
const cacheName = `SWproject${version}`; 
let isOnline = true;
const cacheItems = [

    'https://fonts.googleapis.com/css2?family=Montserrat&display=swap',
  '/',
  './css/main.css',
  '/',
  './index.html',
  '/',
  './js/app.js',
  '/',
  './sw.js',
  '/',
  './media/background.jpeg',
  './media/background2.jpeg'
];

self.addEventListener('install', (ev) => {
  ev
    .waitUntil
    //TODO: add all the items in cacheItems to your cache
    (caches.open(cacheName)
    .then((cache) =>
      cache.addAll(cacheItems)))
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;
    return fetch(event.request);
  })());
});

self.addEventListener('message', (ev) => {
  //message received from the web pages that use the service worker
  //this is optional
});

function sendMessage(msg, clientId) {
  //send a message to one or all clients
  //this is optional
}

class NetworkError extends Error {
  constructor(msg, response) {
    super(msg);
    this.type = 'NetworkError';
    this.response = response;
    this.message = msg;
  }
}
