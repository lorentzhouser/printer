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
    token: null,
    user: {
      userId: '1',
      first_name: "lorentz",
      last_name: "houser",
      authenticated: true,
      allergies: [],
      graduation_year: 2010,
      komite: "my committee",
      committees: ["committee1", "committee2"],
      my_books: ["link", "link2"]
    },
    events: [],
    projects: []
  },
  getters: {
    is_authenticated (state) {
      return (state.token != null)
    }
  },
  actions: {
    login({commit}, loginCredentials) {
      axios
        .put('/api/v1/entrance/login', loginCredentials)
        .then((response) => {
          console.log(response.data);
          commit('setToken', response.data.token);
        })
        .catch((error) => console.log(error));
    },
    loadEvents({commit}) {
      axios
        .get("/events", {withCredentials: true})
        .then(res => { 
          console.log(res.data); 
          commit('setEvents', res.data.events);
        })
        .catch(error => {console.log(error)});
    },
    loadProjects({commit}) {
      axios
        .get("/projects", {withCredentials : true})
        .then(res => { 
          console.log(res.data); 
          commit('setProjects', res.data.projects);
        })
        .catch(error => {console.log(error)});
    },
  },
  mutations: {
    setToken (state, token) {
      state.token = token;
    },
    logout (state) {
      state.authenticated = false;
    },
    setEvents (state, events) {
      state.events = events;
    },
    setProjects (state, projects) {
      state.projects = projects;
    },
  }
})

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
