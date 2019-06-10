/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/vue/precache-manifest.79b104ec3e5151d62826882acc023ba0.js"
);

workbox.core.setCacheNameDetails({prefix: "bbq"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "css/app.0edf2f69.css",
    "revision": "4004ac2cf76a4b401e0fe0b12f0542af"
  },
  {
    "url": "css/chunk-vendors.aae34bb5.css",
    "revision": "e2a12c2163c078beca3f47adfb5d597c"
  },
  {
    "url": "index.html",
    "revision": "86e098fb2a24cf243d14317767627181"
  },
  {
    "url": "js/app.fad65ae9.js",
    "revision": "e1bdf994c101bf673708e94dd9054799"
  },
  {
    "url": "precache-manifest.024f25b27a3c70a8e2fc8fe2db21404d.js",
    "revision": "ed4cdfc0ddded64d28d3de9d7c4d49f7"
  },
  {
    "url": "precache-manifest.27b35367b8c6b78c4d951b60244d9008.js",
    "revision": "27b35367b8c6b78c4d951b60244d9008"
  },
  {
    "url": "precache-manifest.e07e6a001111a6e688eae52fe7278f2b.js",
    "revision": "e07e6a001111a6e688eae52fe7278f2b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/.*\.js/, new workbox.strategies.NetworkFirst(), 'GET');
