import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/demo',
      name: 'home'
    },
    {
      path: '/demo',
      component: Layout,
      children: [
        {
          path: '',
          name: 'demo',
          component: () => import(/* webpackChunkName: "common" */ '@/views/demo/index'),
          meta: { title: 'DEMO' }
        }]
    }
  ]
})
