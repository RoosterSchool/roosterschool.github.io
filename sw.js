const CACHE_NAME = 'rooster-academy-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/programs.html',
  '/contact.html',
  '/404.html',
  '/css/style.css',
  '/css/bootstrap.min.css',
  '/css/critical.css',
  '/js/main.js',
  '/img/roosterlogo.png',
  '/img/favicon.ico',
  '/img/carousel-1.jpg',
  '/img/about.png',
  '/lib/animate/animate.min.css',
  '/lib/owlcarousel/assets/owl.carousel.min.css',
  '/lib/lightbox/css/lightbox.min.css',
  '/lib/wow/wow.min.js',
  '/lib/easing/easing.min.js',
  '/lib/waypoints/waypoints.min.js',
  '/lib/counterup/counterup.min.js',
  '/lib/owlcarousel/owl.carousel.min.js',
  '/lib/isotope/isotope.pkgd.min.js',
  '/lib/lightbox/js/lightbox.min.js'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 