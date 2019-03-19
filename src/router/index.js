import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NotFoundComponent from '@/components/404'
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: '/vue/',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    { path: '*', component: NotFoundComponent }
  ]
})
