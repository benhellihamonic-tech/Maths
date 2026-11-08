const CACHE = "archipel-interface-v21";
const FILES = ["/", "/style.css", "/app.js", "/classroom.js", "/training-figures.js", "/chapters.js", "/chapters4.js", "/chapters5.js", "/chapter-tools.js", "/chapters-bilans.js", "/chapters3-algebre.js", "/content.js", "/curriculum.js", "/assessment.js", "/progression.js", "/pedagogie.js", "/manifest.webmanifest",
  "/icon.svg", "/icon-192.png", "/icon-512.png", "/atlas.svg"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES))));
self.addEventListener("activate", event => event.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(key => (key.startsWith("archipel-interface-") || key.startsWith("jppmaths-interface-")) && key !== CACHE).map(key => caches.delete(key))))
));
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("/")));
  } else if (FILES.includes(url.pathname)) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
  }
});
