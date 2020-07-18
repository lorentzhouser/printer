<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=PT+Serif:700&display=swap" rel="stylesheet">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
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




