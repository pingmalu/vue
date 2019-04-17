import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFoundComponent from '@/components/NotFoundComponent'
import Root from '@/components/Root'
// import Show from '@/components/Show'
// import Test from '@/components/Test'
import d1 from '@/components/d1'
import d2 from '@/components/d2'
import d3 from '@/components/d3'
import d4 from '@/components/d4'
import d5 from '@/components/d5'
import d6 from '@/components/d6'

import d1d1 from '@/components/d1.1'


const config = require('../../config');
// console.log(config);
// console.log(process.env.NODE_ENV === 'development');

Vue.use(VueRouter)

var routes = [
  {
    path: '/',
    name: 'Root',
    component: Root,
    // component: () => import('@/components/Root'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/show',
    name: 'Show',
    component: d6,
    // component: () => import('@/components/Show'),
    meta: {
      title: '项目'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: d1d1,
    // component: () => import('@/components/Test'),
    meta: {
      title: '测试页面'
    }
  },
  {
    path: '/d1',
    name: 'd1',
    component: d1,
    // component: () => import('@/components/2-1'),
    meta: {
      title: 'DEMO'
    }
  },
  {
    path: '/d2',
    name: 'd2',
    component: d2,
    // component: () => import('@/components/2-1'),
    meta: {
      title: 'DEMO'
    }
  },
  {
    path: '/d3',
    name: 'd3',
    component: d3,
    // component: () => import('@/components/2-1'),
    meta: {
      title: 'DEMO'
    }
  },
  {
    path: '/d4',
    name: 'd4',
    component: d4,
    // component: () => import('@/components/2-1'),
    meta: {
      title: 'DEMO'
    }
  },
  {
    path: '/d5',
    name: 'd5',
    component: d5,
    // component: () => import('@/components/2-1'),
    meta: {
      title: 'DEMO'
    }
  },
  {
    path: '*',
    component: NotFoundComponent,
    // component: () => import('@/components/NotFoundComponent'),
    meta: {
      title: '404 找不到页面'
    }
  }
];

console.log(routes);

const router = new VueRouter({
  mode: 'history',
  base: (process.env.NODE_ENV === 'development') ? config.dev.assetsPublicPath : config.build.assetsPublicPath,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) { // 如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  next()
})

export default router
