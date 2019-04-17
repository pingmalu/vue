import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFoundComponent from '@/components/NotFoundComponent'
import Root from '@/components/Root'
import Show from '@/components/Show'
import Test from '@/components/Test'
// import d4d0 from '@/components/d4d0'

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
      title: '实验室'
    }
  },
  {
    path: '/show',
    name: 'Show',
    component: Show,
    // component: () => import('@/components/Show'),
    meta: {
      title: '项目'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    // component: () => import('@/components/Test'),
    meta: {
      title: '测试页面'
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

let routes_arr = new Set();
routes_arr.add('d1d0');
routes_arr.add('d2d0');
routes_arr.add('d3d0');
routes_arr.add('d4d0');
routes_arr.add('d2d1');
routes_arr.add('d2d2');
routes_arr.add('d3d1');

console.log(routes_arr);

routes_arr.forEach(v => {
  console.log(v);
  routes[routes.length] = {
    path: '/' + v,
    name: v,
    // component: v,
    component: () => import('@/components/' + v),
    meta: {
      title: 'DEMO'
    }
  };
});

/* routes[routes.length] = {
  path: '/d6',
  name: 'd6',
  component: d6,
  // component: () => import('@/components/2-1'),
  meta: {
    title: 'DEMO'
  }
}; */

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
