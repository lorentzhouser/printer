import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  //STUDENT
  {
    path: '/student/tips',
    name: 'Tips',
    component: () => import(/* webpackChunkName: "about" */ '../views/student/Tips.vue')
  },
  //LEONARDO
  {
    path: '/job-reservations',
    name: 'JobReservations',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/JobReservations.vue')
  }
  //PROJECTS

  //EVENTS
]

const router = new VueRouter({
  routes
})

export default router
