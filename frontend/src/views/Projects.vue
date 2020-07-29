<template>
    <div class="container nav" id="project-page">
        <div class="container nav">
            <h1>Prosjekter</h1>
            <p class="p-width">Dette er prosjekter laget av studenter på industriell design ved NTNU i Trondheim</p>
            <a v-if="user.is_authenticated" class="button" id="create-project" href="createprojectlink"><span>Legg ut prosjekt</span></a>
            <a v-if="!user.is_authenticated" class="button" id="create-project" href="login -> createprojectlink"><span>Legg ut prosjekt</span></a>
        </div>
        <div class="box-container">
            <a v-for="project in projects" v-bind:key="project.id" class="box" href="{% url 'project_detail' project_pk=project.pk %}">
                <img class="" :src="project.first_image_url">
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Projects",
    data: function() {
        return {
            user: {
                is_authenticated: true
            },
            projects: [
                {   
                    id: 1,
                    first_image_url: "image url",
                },
                {   
                    id: 2,
                    first_image_url: "image url",
                },
                {   
                    id: 3,
                    first_image_url: "image url",
                },
                {   
                    id: 4,
                    first_image_url: "image url",
                },
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/project/_projects.scss";
</style>

