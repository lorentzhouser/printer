import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'es6-promise/auto'

Vue.config.productionTip = false
Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:1337/';

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    user: null,
    committees: [],
    events: [],
    projects: []
  },
  getters: {
    is_authenticated (state) {
      return (state.token != null)
    },
  },
  actions: {
    queryUser({commit}) {
      const token = localStorage.getItem('token');
      if (token != null) {
        axios
          .get('/me')
          .then((response) => {
            commit('setUser', response.data);
          })
          .catch((err) => {
            console.log('error getting my details ' + err);
          });
      }
    },
    updateUser({commit}, newUser) {
      axios
        .put('/me', newUser)
        .then(response => {
          console.log('update global user with new parameters if success');
          commit('setUser', response.data);
        })
        .catch(error => console.log(error));
    },
    loadCommittees({commit}) {
      axios
        .get("/committees")
        .then(res => {
          commit('setCommittees', res.data.committees)
        })
        .catch(error => console.log(error));
    },
    loadEvents({commit}) {
      axios
        .get("/events")
        .then(res => { 
          commit('setEvents', res.data.events);
        })
        .catch(error => {console.log(error)});
    },
    loadProjects({commit}) {
      axios
        .get("/projects", {withCredentials : true})
        .then(res => { 
          commit('setProjects', res.data.projects);
        })
        .catch(error => {console.log(error)});
    },
    login({commit}, loginCredentials) {
      axios
        .put('/api/v1/entrance/login', loginCredentials)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
          commit('setUser', response.data.user);
          commit('setToken', response.data.token);
          router.push('/');
        })
        .catch((error) => console.log(error));
    },
    logout({commit}) {
      axios
        .put('/api/v1/account/logout')
        .then(() => {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          commit('removeUserInformation');
        })
        .catch((error) => console.log(error));
    },
  },
  mutations: {
    setToken (state, token) {
      state.token = token;
    },
    setUser (state, user) {
      state.user = user;
    },
    removeUserInformation (state) {
      state.token = null;
      state.user = null;
    },
    setCommittees (state, committees) {
      state.committees = committees;
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
