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

importScripts("/vue/wb/workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/vue/wb/workbox-v4.3.1"});

importScripts(
  "/vue/wb/precache-manifest.fce092ef0628a02dc83f39bbc0424349.js"
);

workbox.core.setCacheNameDetails({prefix: "maluvue"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "/vue/d1d0",
    "revision": "6512bd43d9caa6e02c990b0a82652dca"
  },
  {
    "url": "/vue/test",
    "revision": "6512bd43d9caa6e02c990b0a82652dca"
  },
  {
    "url": "/vue/d4d0",
    "revision": "6512bd43d9caa6e02c990b0a82652dca"
  },
  {
    "url": "/vue/show",
    "revision": "6512bd43d9caa6e02c990b0a82652dca"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/.*\.js/, new workbox.strategies.NetworkFirst({ "networkTimeoutSeconds":2, plugins: [] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/c1.malu.me\//, new workbox.strategies.NetworkFirst({ "networkTimeoutSeconds":2, plugins: [] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/malu.me\/vue/, new workbox.strategies.NetworkFirst({ "networkTimeoutSeconds":2, plugins: [] }), 'GET');
