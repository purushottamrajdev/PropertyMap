// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));


// self.addEventListener('fetch', function(event) {
//     console.log("hey api req",event.request.url);

//     event.respondWith(
//       caches.match(event.request).then(function(response) {
//           console.log("network response", response);
//           console.log('offline request' , event.request)
//         return response || fetch(event.request);
//       })
//     );
//    });

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('mysite-dynamic-data').then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());// store in cache
          return response;
        });
      });
    })
  );
});

//background


// check the notification action s


self.addEventListener('notificationclick', e => {
  let notification = e.notification;
  let action = e.action;

  if (action === 'open') {
    let url = location.origin;
    clients.openWindow(url);
    notification.close();
  } else {
    console.log("Notification _Rejected!");
   
    notification.close();
  }

})

self.addEventListener('notificationclose', e => {
  let notification = e.notification;
  let action = e.action;

  console.log("notification is closed", notification);
})



//  read the notification from the server 

self.addEventListener('push', function (e) {
  console.log("someone push the notification !!");

  console.log("server notification data", e.data);

  // generate the notification from server data 
  let payload = e.data ? JSON.parse(e.data.text()) : {
    title: "default Title for noitification",
    body: "default -server push notification body",
    icon: "images\icons\icon-96x96.png"
  };

  var options = {
    body: payload.body,
    icon: 'images\icons\icon-96x96.png',
    badge: "images\icons\icon-96x96.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'open', title: 'Explore this new world',
        icon: 'images\icons\icon-96x96.png'
      },
      {
        action: 'close', title: 'Close',
        icon: 'images\icons\icon-96x96.png'
      },
    ]
  };
  e.waitUntil(
    self.registration.showNotification(payload.title, options)
  );

});






// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// app-shell
workbox.routing.registerRoute("/", workbox.strategies.networkFirst());
