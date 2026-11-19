const V='financas-jean-elia-v2';
self.addEventListener('install',e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(['./financas.html','financas-manifest.json','financas-icon-192.png']).catch(()=>{})).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('financas-')&&x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url); if(e.request.method!=='GET') return;
  const mesmo=u.origin===location.origin, sdk=u.hostname==='www.gstatic.com';
  if(!mesmo && !sdk) return;   // Firestore/Auth passam direto
  e.respondWith(fetch(e.request).then(r=>{ if(r.ok){ const c=r.clone(); caches.open(V).then(x=>x.put(e.request,c)); } return r; }).catch(()=>caches.match(e.request).then(r=>r||caches.match('financas.html'))));
});
