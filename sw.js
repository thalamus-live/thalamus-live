// Esquina Radar — Service Worker
// Handles push notifications for new signals

const CACHE_NAME = 'esquina-radar-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Handle push notifications sent from the app
self.addEventListener('push', e => {
  if(!e.data) return;
  const data = e.data.json();
  e.waitUntil(
    self.registration.showNotification(data.title || 'Esquina Radar', {
      body: data.body || '',
      icon: data.icon || 'https://raw.githubusercontent.com/thalamus-live/thalamus-live/main/icon-192.png',
      badge: data.badge || 'https://raw.githubusercontent.com/thalamus-live/thalamus-live/main/badge-96.png',
      tag: data.tag || 'signal',
      data: data.data || {},
      vibrate: [200, 100, 200],
      requireInteraction: false,
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes('esquina-radar'));
      if(existing) return existing.focus();
      return clients.openWindow('/esquina-radar');
    })
  );
});
