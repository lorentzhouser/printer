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
  // {
    //NEEDS MAJOR RENOVATION  
    // path: '/student/courses',
    // name: 'Courses',
    // component: () => import(/* webpackChunkName: "about" */ '../views/student/Courses.vue')
  // },
  {
    path: '/student/books',
    name: 'BookSales',
    component: () => import(/* webpackChunkName: "about" */ '../views/student/BookSales.vue')
  },
  {
    path: '/student/jobs',
    name: 'Jobs',
    component: () => import(/* webpackChunkName: "about" */ '../views/student/Jobs.vue')
  },
  {
    path: '/student/new-student',
    name: 'NewStudent',
    component: () => import(/* webpackChunkName: "about" */ '../views/student/NewStudent.vue')
  },
  {
    path: '/student/study-abroad',
    name: 'StudyAbroad',
    component: () => import(/* webpackChunkName: "about" */ '../views/student/StudyAbroad.vue')
  },
  {
    path: '/student/class-trip',
    name: 'ClassTrip',
    component: () => import(/* webpackChunkName: "about" */ '../views/student/ClassTrip.vue')
  },

  //LEONARDO
  {
    path: '/leonardo/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/leonardo/About.vue')
  },
  {
    path: '/leonardo/thesign',
    name: 'TheSign',
    component: () => import(/* webpackChunkName: "about" */ '../views/leonardo/TheSign.vue')
  },
  {
    path: '/leonardo/committees',
    name: 'Committees',
    component: () => import(/* webpackChunkName: "about" */ '../views/leonardo/Committees.vue')
  },
  //PROJECTS
  {
    path: '/prosjekter',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "about" */ '../views/Projects.vue')
  },
  //EVENTS
  {
    path: '/arrangementer',
    name: 'Events',
    component: () => import(/* webpackChunkName: "about" */ '../views/Events.vue')
  },
  //PRINT
  {
    path: '/job-reservations',
    name: 'JobReservations',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/JobReservations.vue')
  },
  //USER
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/Login.vue')
  },
  // {
    // path: '/min-profil',
    // name: 'Account',
    // component: () => import(/* webpackChunkName: "about" */ '../views/user/Account.vue')
  // },
]

const router = new VueRouter({
  routes
})

export default router
