import Vue from 'vue'
import VueRouter from 'vue-router'
// import NotFoundComponent from '@/components/NotFoundComponent'
// import Root from '@/components/Root'
// import Show from '@/components/Show'
// import Test from '@/components/Test'
// import d2_1 from '@/components/2-1'
// import d2_2 from '@/components/2-2'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/vue/',
  routes: [
    {
      path: '/',
      name: 'Root',
      // component: Root,
      component: () => import('@/components/Root'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/show',
      name: 'Show',
      // component: Show,
      component: () => import('@/components/Show'),
      meta: {
        title: '项目'
      }
    },
    {
      path: '/test',
      name: 'Test',
      // component: Test,
      component: () => import('@/components/Test'),
      meta: {
        title: '测试页面'
      }
    },
    {
      path: '/2-1',
      name: '2-1',
      // component: d2_1,
      component: () => import('@/components/2-1'),
      meta: {
        title: 'DEMO'
      }
    },
    {
      path: '/2-2',
      name: '2-2',
      // component: d2_2,
      component: () => import('@/components/2-2'),
      meta: {
        title: 'DEMO'
      }
    },
    {
      path: '*',
      component: () => import('@/components/NotFoundComponent'),
      meta: {
        title: '404 找不到页面'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) { // 如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  next()
})

export default router
