import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Garbage from './views/Garbage.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/garbage',
      children: [
        {
          path: 'garbage',
          name: 'garbage',
          component: Garbage
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('./views/HotSearch.vue')
        },
        {
          path: 'knowledge',
          name: 'knowledge',
          component: () => import('./views/Knowledge.vue')
        }
      ]
    }
  ]
})
