importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.1.1/workbox-sw.js');

if (workbox) {
  // Cache your app shell during installation
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/style.css', revision: '1' },
    { url: '/app.js', revision: '1' },
    // Add other static assets you want to cache here
  ]);

  // Cache external resources like Google Fonts
  workbox.routing.registerRoute(
    new RegExp('^https://fonts.googleapis.com'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts',
    })
  );

  // Define a caching strategy for API requests (if your app makes them)
  workbox.routing.registerRoute(
    new RegExp('^https://api.example.com'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'api-cache',
    })
  );
} else {
  console.log('Workbox could not be loaded. Offline caching is not supported.');
}
