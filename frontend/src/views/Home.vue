<template>
  <div class="full-width-container">

    <main id="homepage">
        <section>
            <h1>Leonardo<br>linjeforening</h1>
            <p>Studentene ved Industriell design på NTNU</p>
            <img src="../assets/img/illustrations/bao.png" alt="Velkommen til Leonardo linjeforening">
            <div class="scroll-down"><img src="../assets/img/icons/arrow.svg" alt="pil">Scroll ned</div>
        </section>
        <br>
        <div class="container">
            <h4>Kommende hendelser</h4><br>
            <div class="events box-container">
                <div v-bind:key="event.id" v-for="event in events">
                  <Event v-bind:event="event"/>
                </div>
            </div>
            <br>
            <a href="all_events" class="subtitle1 right">Se flere arrangementer <img src="../assets/img/icons/arrow.svg" alt="pil" /></a>
            <div v-if="projectsExist" class="projects box-container">
                <div v-bind:key="project.id" v-for="project in projects">
                  <a class="box" href="{% url 'project_detail' project_pk=project.pk %}">
                      <img class="" :src="project.images[0].imageURL" :alt="project.images[0].name">
                  </a>
                </div>
            </div>
            <br>
            <a href="" class="subtitle1 right">Se alle prosjektene <img src="../assets/img/icons/arrow.svg" /></a>
        </div>
    </main>
  </div>
</template>

<script>
import Event from '../components/Event.vue'
import {mapState} from 'vuex'

export default {
  name: 'Home',
  components: {
    Event,
  },
  created() {
    this.$store.dispatch('loadEvents');
    this.$store.dispatch('loadProjects');
  },
  computed: {
    projectsExist: function() {
      return this.projects.length > 0;
    },
    ...mapState([
      'events',
      'projects'
    ])
  },
  data: function() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/pages/_homepage.scss";
</style>


