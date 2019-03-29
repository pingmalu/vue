import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFoundComponent from '@/components/NotFoundComponent'
import Root from '@/components/Root'
import Show from '@/components/Show'
import Test from '@/components/Test'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/vue/',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Root,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/show',
      name: 'Show',
      component: Show,
      meta: {
        title: '项目'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: {
        title: '测试页面'
      }
    },
    {
      path: '*',
      component: NotFoundComponent,
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
