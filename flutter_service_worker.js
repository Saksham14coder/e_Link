'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "b34097c9364d897fcb0912a1016e2f10",
"assets/AssetManifest.json": "17bd730b12992f28148f31230bc2ec79",
"assets/assets/fonts/DancingScript-Bold.ttf": "a3fc746619e755e853818ee67924ebbe",
"assets/assets/fonts/Poppins-Medium.ttf": "bf59c687bc6d3a70204d3944082c5cc0",
"assets/assets/images/ad2.png": "d4b7a634c2272c4c9dc86b618c2f5c81",
"assets/assets/images/add.png": "0ff5ca00ca16eb5bf410f24f06c329ea",
"assets/assets/images/addpost.png": "8aa8762e384c3fd19dbfaf13a91ccf13",
"assets/assets/images/ads.png": "8854592cdf4aa846366d5850dcec4ccd",
"assets/assets/images/ads3.jpg": "24363cf3c43688ec48271df4e5c9be05",
"assets/assets/images/avatar.png": "b9363295c406e47f0dc0700a1b979d8b",
"assets/assets/images/bookmark.png": "3174e9ad7c4453dca12ee54b4c312198",
"assets/assets/images/bot.png": "78399594cd4ce07c0246b0413c95f7bf",
"assets/assets/images/heart.png": "8c7b45fc169e1394eb7738441a8825e6",
"assets/assets/images/heart2.png": "9f61111962cc66e53f0c907d4fcc17cb",
"assets/assets/images/human.png": "e24f8a74c7e51bd0b6ca9f9767dd1e9b",
"assets/assets/images/i1.jpeg": "6dc9cb6784400be1c37bffccc3151bb8",
"assets/assets/images/i5.jpeg": "12b1fefd7b46e3fc1c4c24d9bd963a2b",
"assets/assets/images/img.png": "0336c5816c2a4887b64c43b5d38bef21",
"assets/assets/images/job1.jpg": "a3ab2527dfe74c3120cc5642d64ba867",
"assets/assets/images/jobsearch.png": "2ef1c6645f451d14ea2e762038240d21",
"assets/assets/images/logo.png": "b1d7acdfb46664b1887f02c99463f8dc",
"assets/assets/images/mits_logo.png": "d71b8474a613f47ed1d542de8da66702",
"assets/assets/images/mlogo.png": "d71b8474a613f47ed1d542de8da66702",
"assets/assets/images/naac.png": "8b98009d95aad91a63017590756ee37a",
"assets/assets/images/naac2.png": "feadfbc52928691379eed45d6a3d3fa0",
"assets/assets/images/rakhi.jpg": "d702cd6c474a2adb698b803a9c0ca740",
"assets/assets/images/reel.png": "f9a0e6dd491c52683b91afac42ec2477",
"assets/assets/images/sa.png": "d08ad5df71be9374fc2fbdeb54f115e3",
"assets/assets/images/sak.png": "10f8058e09bc99b0491d6929ae5bdb61",
"assets/assets/images/src.png": "15d81d7d7a05e81436ebbf16c9b80b08",
"assets/assets/images/star.png": "26a1cd1031945a1ed903acfbdfe6f6ef",
"assets/assets/images/user.png": "12169f1a37cd9ca5c6084a2c3e20c69f",
"assets/FontManifest.json": "a8e28df882477b9bf4dc894d5bc7257e",
"assets/fonts/MaterialIcons-Regular.otf": "3c0b7c9aed503ef335540abb179a11e8",
"assets/NOTICES": "445175aa17d566637642389797e15c77",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "fe569dd5898122ba6d6ba0b66211138c",
"/": "fe569dd5898122ba6d6ba0b66211138c",
"main.dart.js": "06c94038eff2316ec1227f51c7897b9d",
"manifest.json": "d6ba718ae68f0e2b06395fa4dc920559",
"version.json": "fc19073b35a06838f0ca5c62a20ef168"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
