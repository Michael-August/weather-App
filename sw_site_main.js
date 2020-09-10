cacheName = 'main version'

// call install Event
self.addEventListener("install", (e) => {
})

// call Activate event
self.addEventListener("activate", (e) => {
    // remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

// call fetch event
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // make copy/clone of response from the server
            const resClone = res.clone()
            // open a cache
            caches
                .open(cacheName)
                .then(cache => {
                    // add the response to the cache
                    cache.put(e.request, resClone)
                })
            return res
        }).catch(err => caches.match(e.request).then(res => res))
    )
})