import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NotFoundComponent from '@/components/NotFoundComponent'
import Mshow from '@/components/m-show'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/vue/',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/show',
      name: 'Mshow',
      component: Mshow,
      meta: {
        title: '项目'
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
