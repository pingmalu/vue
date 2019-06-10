// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import 'es6-promise/auto'
import Vuex from 'vuex'
// import {store} from './vuex/store' // vuex store instance
import router from './router'
import './plugins/element.js'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import './registerServiceWorker'


// import fs from 'fs' 
// var fs = require('fs');
// var path = require('path');//解析需要遍历的文件夹
// var filePath = path.resolve('./components');


// console.log(fs)

// fs.readdir(filePath,function(err,files){
//   console.log(files)
// })
// import importJs from './common/importJs';

// 使用vuex插件
Vue.use(Vuex)

// 全局过滤器
Vue.filter('bytesToSize', function (bytes) {
  if (bytes === 0) return '0 B';
  let k = 1024;
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  let num = bytes / Math.pow(k, i);
  return num.toPrecision(3) + ' ' + sizes[i];
})

Vue.config.productionTip = false
Vue.component(CollapseTransition.name, CollapseTransition);

const store = new Vuex.Store()

// 将router放入vuex.store中实时同步
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 实例化的时候引入store，供子组件使用
  components: { App },
  template: '<App/>'
})
