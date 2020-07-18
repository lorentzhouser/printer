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
            <div class="projects box-container">
                <div v-bind:key="project.id" v-for="project in projects">
                  <a class="box" href="{% url 'project_detail' project_pk=project.pk %}">
                      <img class="" :src="project.projectimage_set[0]" :alt="project.creator">
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

export default {
  name: 'Home',
  components: {
    Event,
  },
  data: function() {
    return {
      events: [
        {
          id: 1,
          title: 'event',
          slug: 'link',
          short_description: 'short desc',
          description: 'description',
          location: 'just a location',
          event_start_time: 'start time date',
          event_end_time: 'should be a end time date',
          registration_required: false,
          registration_start_time: '12:00',
          alumni: true,
          class_1 : false,
          class_2 : false,
          class_3 : false,
          class_4 : false,
          class_5 : false,
          only_komite : false,
          available_spots : true,
          registered_users : false,
          waiting_list : ["me", "you", "dupree"],
          image : "../assets/dev_images/images/Immen_thornielsen_rektor_09oyYIG.jpg",
          thumbnail : {
            url: "../assets/img/Logo/Inverse.svg",
            img: "img",
          },
        },
        {
          id: 2,
          title: 'event2',
          slug: 'link',
          short_description: 'short desc',
          description: 'description',
          location: 'just a location',
          event_start_time: 'start time date',
          event_end_time: 'should be a end time date',
          registration_required: false,
          registration_start_time: '12:00',
          alumni: true,
          class_1 : false,
          class_2 : false,
          class_3 : false,
          class_4 : false,
          class_5 : false,
          only_komite : false,
          available_spots : true,
          registered_users : false,
          waiting_list : ["me", "you", "dupree"],
          image : "img_url",
          thumbnail : "thumbnail_url",
        },
        {
          id: 3,
          title: 'event3',
          slug: 'link',
          short_description: 'short desc',
          description: 'description',
          location: 'just a location',
          event_start_time: 'start time date',
          event_end_time: 'should be a end time date',
          registration_required: false,
          registration_start_time: '12:00',
          alumni: true,
          class_1 : false,
          class_2 : false,
          class_3 : false,
          class_4 : false,
          class_5 : false,
          only_komite : false,
          available_spots : true,
          registered_users : false,
          waiting_list : ["me", "you", "dupree"],
          image : "img_url",
          thumbnail : "thumbnail_url",
        },
        {
          id: 4,
          title: 'event4',
          slug: 'link',
          short_description: 'short desc',
          description: 'description',
          location: 'just a location',
          event_start_time: 'start time date',
          event_end_time: 'should be a end time date',
          registration_required: false,
          registration_start_time: '12:00',
          alumni: true,
          class_1 : false,
          class_2 : false,
          class_3 : false,
          class_4 : false,
          class_5 : false,
          only_komite : false,
          available_spots : true,
          registered_users : false,
          waiting_list : ["me", "you", "dupree"],
          image : "img_url",
          thumbnail : "thumbnail_url",
        }

      ],
      projects: [
        {
          id: 1,
          pk: "project_pk",
          projectimage_set: ["../assets/dev_images/thumbnails/project.jpg", "url2","url3..."],
          creator: "author"
        },
        {
          id: 2,
          pk: "project_pk",
          projectimage_set: ["url1", "url2","url3..."],
          creator: "author"
        },
        {
          id: 3,
          pk: "project_pk",
          projectimage_set: ["url1", "url2","url3..."],
          creator: "author"
        }
        ,{
          id: 4,
          pk: "project_pk",
          projectimage_set: ["url1", "url2","url3..."],
          creator: "author"
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/pages/_homepage.scss";
</style>


