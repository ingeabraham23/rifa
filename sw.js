if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>n(e,o),f={module:{uri:o},exports:t,require:c};i[o]=Promise.all(s.map((e=>f[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-B8Rc7VlQ.css",revision:null},{url:"assets/index-Cko__4mQ.js",revision:null},{url:"index.html",revision:"e081e8093d6abef5ee6038a925c96f6f"},{url:"registerSW.js",revision:"9bc20c7f39308eee35bec4fb31cbf9ff"},{url:"maskable-icon-512x512.png",revision:"4d7ac2cc2a4c3d00d1438414ee966d02"},{url:"pwa-192x192.png",revision:"1be1bbca9030e11a4a5063a3a479747c"},{url:"pwa-512x512.png",revision:"efa4515f4c9d88595a129479b5db0ae7"},{url:"pwa-64x64.png",revision:"ff4b878b51524946a7c0d87f264fd96e"},{url:"manifest.webmanifest",revision:"09dd94c64b997f01de8727948f4ee528"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
