import Vue from 'vue'
import VueRouter from 'vue-router'
import JobReservation from '../views/JobReservations.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'job-reservations',
    component: JobReservation
  },
  //USER
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/Login.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/Account.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
