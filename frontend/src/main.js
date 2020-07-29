import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'es6-promise/auto'

Vue.config.productionTip = false
Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:1337/';

const store = new Vuex.Store({
  state: {
    user: {
      first_name: "lorentz",
      last_name: "houser",
      authenticated: false,
      allergies: [],
      graduation_year: 2010,
      komite: "my committee",
      committees: ["committee1", "committee2"],
      my_books: ["link", "link2"]
    },
  },
  getters: {
    is_authenticated (state) {
      return state.user.authenticated
    }
  },
  mutations: {
    login (state) {
      state.authenticated = true;
    },
    logout (state) {
      state.authenticated = false;
    }
  }
})

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
