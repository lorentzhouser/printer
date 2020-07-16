<template>
  <div id="app">
    <NavBar/>
    <JobReservation/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import JobReservation from './components/JobReservation.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    JobReservation
  }
}
</script>

<style lang="scss">
@import "@/assets/css/base/_variables.scss";
@import "@/assets/css/base/_css-reset.scss";
@import "@/assets/css/base/_global.scss";
@import "@/assets/css/base/_mixins.scss";
@import "@/assets/css/base/_typography.scss";
</style>
