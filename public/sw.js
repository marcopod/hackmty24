if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/128.png",revision:"8166104075b1d9f995c97897918d75e2"},{url:"/512.png",revision:"39f9454d8b257b949513cca39ec4bb15"},{url:"/_next/app-build-manifest.json",revision:"26a554b0300f9e846e7294425b242690"},{url:"/_next/static/chunks/138-11a2ac59efc0c327.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/23-abeffd390783c9b5.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/648-d5404915660bf9dd.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/853-7f37675243f08110.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/app/LOL/page-d42b4b3860c33ec9.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/app/_not-found/page-9c85b45a5a716da3.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/app/analisis/page-3febb0c2b6e4c3de.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/app/bitacoras/page-0e0f583f9636417d.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/app/layout-8da001b9df4e8e9c.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/app/page-6b62536824d85156.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/fd9d1056-0395f68b8cc78a20.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/main-app-a954d2049f8b1e0d.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/main-e7add3c453e1ba9a.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-d8cbbbeadcf78de7.js",revision:"x5akiArSDPpsa8TZWhYV9"},{url:"/_next/static/css/eb06d05b567af6ff.css",revision:"eb06d05b567af6ff"},{url:"/_next/static/media/bootstrap-icons.70a9dee9.woff",revision:"70a9dee9"},{url:"/_next/static/media/bootstrap-icons.bfa90bda.woff2",revision:"bfa90bda"},{url:"/_next/static/x5akiArSDPpsa8TZWhYV9/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/x5akiArSDPpsa8TZWhYV9/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/logo.ico",revision:"0b791ce3a6988a469a5d2553c00a27d4"},{url:"/logo.png",revision:"dfc17ecb8654566036f851b1669448d9"},{url:"/logo.svg",revision:"b0d7aec380c696deb5eb16342bcb9883"},{url:"/manifest.json",revision:"67c940448e8834c983effd38764350ca"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
