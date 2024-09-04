self.addEventListener('install', event => {
    console.log('Instalado');
    event.waitUntil(
        caches.open('mi-cache-v1').then(cache => {
            return cache.addAll([  
                '/',              
                '/index.html',
                '/catalogo.html',
                '/css/styles.css',
                '/app.js',
                '/manifest.json',
                '/src/images/1.jpg',
                '/src/images/2.jpeg',
                '/src/images/3.jpg',
                '/src/images/4.jpg',
                '/src/images/5.jpg',
                '/src/images/6.jpg',
                '/src/images/7.jpg',
                '/src/icons/ecologia.png',
                '/src/icons/el-planeta-tierra.png',                                                
            ]);
        })
    );
});

self.addEventListener('activate', function(event){ // Cambiado "active" a "activate"
    console.log('Activo');
    const cacheWhiteList = ['mi-cache-v1'];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if(cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim(); // Removido "this"
});

self.addEventListener('fetch', function(event){
    console.log('Fetch: ', event.request.url);
    event.respondWith(
        caches.match(event.request).then(res => {
            return res || fetch(event.request);
        }).catch(() => caches.match('/index.html')) // Removido "this"
    );
});
