import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/views/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/views/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/views/error',
    name: '404',
    component: () => import('@/views/error/error.vue')
  },
  {
    path: ('/' || '/views'),
    redirect: '/views/home',
  },
  {
    path: '*',
    redirect: '/views/error',
  },
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   linkActiveClass: 'active',
//   routes
// })

export default routes
