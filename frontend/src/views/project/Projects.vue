<template>
    <div class="container nav" id="project-page">
        <div class="container nav">
            <h1>Prosjekter</h1>
            <p class="p-width">Dette er prosjekter laget av studenter på industriell design ved NTNU i Trondheim</p>
            <router-link to="/prosjekter/create" v-if="is_authenticated" class="button" id="create-project"><span>Legg ut prosjekt</span></router-link>
            <router-link to="/login/then ->create-project" v-if="!is_authenticated" class="button" id="create-project"><span>Legg ut prosjekt</span></router-link>
        </div>
        <div class="box-container">
            <a v-for="project in projects" v-bind:key="project.id" class="box" href="{% url 'project_detail' project_pk=project.pk %}">
                <img class="" :src="project.images[0].imageURL">
            </a>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
export default {
    name: "Projects",
    data: function() {
        return {}
    },
    computed: {
        ...mapState([
            'projects',
        ]),
        ...mapGetters([
            'is_authenticated',
        ])
    },
    created() {
        this.$store.dispatch('loadProjects');
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/project/_projects.scss";
</style>

