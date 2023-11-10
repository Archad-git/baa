'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.json": "8729c349345643cabaf5b6472e4df2a7",
"assets/AssetManifest.smcbin": "9cb578a4056f64ec6e4206f994e59125",
"assets/assets/accueildbs.jpg": "60e4e3e0ba8230eb2a9574d583ec1024",
"assets/assets/aerien.png": "74ea3881b4a74229c9ac4f5070f3b357",
"assets/assets/backAuth.png": "7ee33173a383e77f919eccc8a6f90b0b",
"assets/assets/Borcelle__1_-removebg-preview.png": "dc55036aa17a3cec3607c393d1f37c8c",
"assets/assets/Capture1.png": "b713a5ae29e8593c9d678842820510b6",
"assets/assets/Capture2.png": "95c3ab41a98aff330d4ae54a1e8c3a42",
"assets/assets/Capture3.png": "f97228c302f4b2aac4658aaf2ac4ba24",
"assets/assets/CaptureSplash.png": "e355e07ef62a204b2bcae1c13956ecfc",
"assets/assets/chargement.gif": "34b3af3ca27f12736c62a6cd54aa7ba2",
"assets/assets/colisBak.png": "4e82f5571e7334d6c9ea07ee835b3023",
"assets/assets/cout.png": "552e7d81c76c0afaffa217164b1ccc1c",
"assets/assets/dbsS.png": "6671f9a40ae5d38073ecf3dc4e9a3891",
"assets/assets/dbs_profilFemme.jpg": "91011674c7748aa04f0bb67c3f45cd8c",
"assets/assets/dbs_profilHomme.jpg": "8e9ea3bf21575e30586a948d95f6f28c",
"assets/assets/Fond_blanc.png": "680fee9dc4b82ac7a296bd0a57aae648",
"assets/assets/frame.png": "ecf42c5be27cdd0822bcedcbaa731dd2",
"assets/assets/image.jpg": "495af0b9d3f4398ef3ffb1ac3cf17ef9",
"assets/assets/imagesdbs.jpeg": "bf65c319eca8fb13d38cf29440301f95",
"assets/assets/localization.png": "2fe617ae63c05067817c47b807edc60b",
"assets/assets/logistique.png": "c6334e4beae758e2c25ee4f9185137cb",
"assets/assets/logo_blanc.png": "352b890d1cece1c3bd9cd6281178c06c",
"assets/assets/logo_noir.png": "fad620827311b617d2a1c8f44417940d",
"assets/assets/maritine.png": "c995061b6cd6dab73225dbd07354bacd",
"assets/assets/profil-back.jpg": "0cf8675b686a535b989f1947c6cf1695",
"assets/assets/routier.png": "9289ef64add418b7c17ffccc4d882405",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "91f225575e212a183a2ac40f56f9ec71",
"assets/NOTICES": "e2d47eb35390640e1454aed5161770ca",
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
"index.html": "fb9d23e5ec4a53c523deed4ae7358041",
"/": "fb9d23e5ec4a53c523deed4ae7358041",
"logo.png": "fad620827311b617d2a1c8f44417940d",
"main.dart.js": "2a99062a120d1ef7897f4eb5e476d4a4",
"manifest.json": "9b6208332c047bc8350c64bf28986e3e",
"splash/img/light-background.png": "680fee9dc4b82ac7a296bd0a57aae648",
"version.json": "9a514832a70f571a6f897bd430fc2e01"};
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
