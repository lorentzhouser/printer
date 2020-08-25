<template>
  <div id="app" @drop.prevent="dropped" @dragover.prevent>
    <link href="https://fonts.googleapis.com/css?family=PT+Serif:700&display=swap" rel="stylesheet">
    <NavBar/>
    <ReservationModule v-bind:visibilty="notifVisible" v-bind:file="file" v-on:toggleVisibility="toggleNotificationVisibility"/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import ReservationModule from './components/ReservationModule/ReservationModule.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    NavBar,
    ReservationModule,
  },
  data: function() {
    return {
      notifVisible: true,
      file: '',
    }
  },
  created: function() {
    if (this.user == null) {
      this.$store.dispatch('queryUser');
    }

    if (axios.defaults.headers.common['Authorization'] == 'null') {
      console.log('no header autho')
      this.$store.dispatch('logout');
    }
    
    //logout if jwt token has expired
     axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
          resolve();
        }
        reject(err);
      });
    });
  },
  methods:{
    dropped(e) { 
      let droppedFiles = e.dataTransfer.files;
      if(!droppedFiles) return;
      if(droppedFiles.length>1) {
        console.log('alert of two many files added');
      }
      else {
        this.toggleNotificationVisibility(true);
        this.file = droppedFiles[0];
        
      }
    },
    toggleNotificationVisibility(visibility) {
      this.notifVisible = visibility;
    }
  }
}
</script>

<style lang="scss">
//global
@import "@/assets/css/base/_variables.scss";
@import "@/assets/css/base/_css-reset.scss";
@import "@/assets/css/base/_global.scss";
@import "@/assets/css/base/_mixins.scss";
@import "@/assets/css/base/_typography.scss";

//components
@import "@/assets/css/components/_box.scss";
@import "@/assets/css/components/_buttons.scss";
@import "@/assets/css/components/_course-search.scss";
@import "@/assets/css/components/_dropzone.scss";
@import "@/assets/css/components/_event-component.scss";
@import "@/assets/css/components/_face.scss";
@import "@/assets/css/components/_filter.scss";
@import "@/assets/css/components/_footer.scss";
@import "@/assets/css/components/_image-viewer.scss";
@import "@/assets/css/components/_inputs.scss";
@import "@/assets/css/components/_links.scss";
@import "@/assets/css/components/_modal.scss";
@import "@/assets/css/components/_navbar.scss";
@import "@/assets/css/components/_quill.scss";
@import "@/assets/css/components/_tables.scss";
@import "@/assets/css/components/_url-preview.scss";
</style>




