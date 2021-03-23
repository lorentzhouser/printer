import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'es6-promise/auto'
import movable from "v-movable"
import VDragged from 'v-dragged'


Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(movable)
Vue.use(VDragged)
axios.defaults.baseURL = 'http://localhost:1337/';

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    user: null,
    sliderValue: 1,
    modalVisibility: false,
    newJob: {
      exists: false,
      description: '',
      file: null,
      duration: -1,
      date: -1,
      device: -1,
      priority: '',

    },
    printerQueues: [
      {
          device: 1,
          jobs: [
              {
                  duration: 7200,
                  date: Number(Date.now()/1000 + 9000),
                  priority: 'Urgent',
              },
              // {
              //     duration: 15000,
              //     date: Number((Date.now()/1000) + 9500),
              //     priority: 'Urgent',
              // },
          ]
      },
      {
          device: 2,
          jobs: [
              {
                  duration: 3600,
                  date: Number(Date.now()/1000 + 7200),
                  priority: 'Private',
              },
              // {
              //     duration: 19000,
              //     date: Number(Date.now()/1000 + 15000),
              //     priority: 'Job',
              // },
          ]
      },
      {
          device: 3,
          jobs: [
              {
                  duration: 3600,
                  date: Number(Date.now()/1000 + 14400),
                  priority: 'Job',
              },
              // {
              //     duration: 3000,
              //     date: Number(Date.now()/1000 + 13000),
              //     priority: 'Job',
              // },
          ]
      },
    //   {
    //     device: 4,
    //     jobs: []
    // }
    ]
  },
  getters: {
    is_authenticated (state) {
      return (state.token != null)
    },
    username (state) {
      if (state.user !== null) { 
        return state.user.firstName + ' ' + state.user.lastName;  
      }
      return "logged out";
    },
    userId (state) {
      return (state.user !== null) ? state.user.id : -1;
    }
  },
  actions: {
    //PRINTER ERRORS
    printerError({commit}, errorMessage, job) {
      const postData = {
        'errorMessage' : errorMessage,
        'job' : job,
      };
      axios
        .post('/printerError', postData)
        .then(result => {
            //send a message to studass?
            console.log('result of error feedback: ');
            console.log(result.data);
            commit('hideErrorModal');
        })
        .catch(error => { console.log('could not create a reservation: ' + error)});
    },
    //
    updateQueues({commit}, queues) {
      commit('updateQueues', queues);
    }, 
    updateNewJob({commit}, update) {
      commit('updateNewDate', update);
    },
    showModal({commit}) {
      commit('showModal');
    },
    hideModal({commit}) {
      commit('hideModal');
    },
    addJobToStaging({commit}, newJob) {
      commit('insertNewJob', newJob);
      commit('hideModal');
    },
    reserveJob({commit}, newJob) {
      const postData = {
        'device' : newJob.device,
        'date' : newJob.date,
        'duration' : newJob.duration,
      };
      console.log("post data:");
      console.log(postData.date);
      console.log(postData.device);
      console.log(postData.duration);
      axios
        .post('/api/v1/reserve-job', postData)
        .then(result => {
            console.log('result of reservation: ');
            console.log(result.data);
            commit('setJobs', result.data);
            //update by adding result to data array or recall get jobs..
        })
        .catch(error => { console.log('could not create a reservation: ' + error)});
    },
    deleteJob({commit}, id) {
      axios.delete("/api/v1/delete-job/" + id)
        .then(res => { 
          console.log(res.data);
          commit("setJobs", res.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    queryJobs({commit}) {
      axios.get("/job-reservations")
        .then(res => { 
            commit('setJobs', res.data);
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    queryUser({commit}) {
      const token = localStorage.getItem('token');
      if (token != null) {
        axios
          .get('/me')
          .then((response) => {
            console.log('user set');
            commit('setUser', response.data);
            // console.log(this.state.user.firstName);
          })
          .catch((err) => {
            this.logout();
            console.log('error getting my details ' + err);
          });
      }
    },
    updateUser({commit}, updateUser) {
      console.log('update user');
      axios
        .put('/me', updateUser)
        .then(response => {
          console.log('response.data: ' + response.data)
          commit('setUser', response.data);
        })
        .catch(error => console.log(error));
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
      console.log("logout in main.js");
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      commit('removeUserInformation');
      router.push('/login');
    },
  },
  mutations: {
    updateQueues (state, updated) {
      state.printerQueues = updated;
    },
    updateNewDate (state, updatedDate) {
      console.log("updatedDate: " + updatedDate);
      state.newJob.date = updatedDate;
    },
    showModal (state) {
      state.modalVisibility = true;
    },
    hideModal (state) {
      state.modalVisibility = false;
    },
    insertNewJob (state, createdJob) {
      const queues = state.printerQueues;
      var appendedJob = createdJob;
      appendedJob.priority = "New"
      appendedJob.date = createdJob.startTime;
      appendedJob.device = createdJob.device;
      appendedJob.duration = createdJob.duration;
      appendedJob.username = createdJob.username;

      queues.filter((queue) => {
        return (queue.device == createdJob.device);
      })[0].jobs.push(appendedJob);

      state.newJob.device = createdJob.device;
      state.newJob.date = createdJob.startTime;
      state.newJob.duration = createdJob.duration;
      state.newJob.priority = createdJob.priority;
      //more fields
      // state.printerQueues = queues;
      
    },
    setJobs (state, queriedQueues) {
      state.printerQueues = queriedQueues;
    },
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
  }
})

Vue.directive('visible', function (el, binding) {
  el.style.display = (binding.value) ? 'block' : 'none';
})

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
