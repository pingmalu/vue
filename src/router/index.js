import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NotFoundComponent from '@/components/NotFoundComponent'
import Mshow from '@/components/m-show'

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
    {
      path: '/show',
      name: 'Mshow',
      component: Mshow
    },
    { path: '*', component: NotFoundComponent }
  ]
})
