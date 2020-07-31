<template>
    <div class="container nav narrow">
    <h1>Last opp prosjekt</h1>
    <br>
    <br>
    <br>
    <!-- <form id="this"> -->
        <div class="input-field">
            <textarea name="description" id="id_description" v-model="description"
                placeholder="Beskrivelse av projsektet" required></textarea>
            <label>Beskrivelse av prosjektet</label>
        </div>
        <div class="input-field">
            <input type="text" name="creator" id="id_creator" v-model="creator" placeholder="Hvem har laget det?"
                required>
            <label>Hvem har laget det?</label>
        </div>
        <div class="input-field">
            <select name="class_year" id="id_class_year" v-model="class_year" required>
                <option value="">---------</option>
                <option value="1. klasse" selected>1. klasse</option>
                <option value="2. klasse">2. klasse</option>
                <option value="3. klasse">3. klasse</option>
                <option value="4. klasse">4. klasse</option>
                <option value="5. klasse">5. klasse</option>
            </select>
            <!-- <label for="{{ form.class_year.id_for_label }}">År</label> -->
        </div>
        <div class="input-field">
            <ul class="errorlist" v-if="errors.length">
                <li :key="error" v-for="error in errors">{{ error }}</li>
                <!-- remove key eventually -->
            </ul>
        </div>
    <!-- course search component -->
    <br>
    <div class="dropzone-previews"></div>
    <br>
    <form id="dropzone" action="upload_project_image" method="post" enctype="multipart/form-data"
        class="dropzone">
        <!-- {% csrf_token %} -->
    </form>
    <br>
    <br>
    <br>
    <br>
    <button @click="checkForm" class="button"><span>Legg ut prosjektet</span></button>
    <br> 
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "CreateProject",
    data: function() {
        return {
            description: '',
            creator: '',
            course: '',
            class_year: '',
            project_pk: null,
            errors: []
        }
    },
    mounted() {
        axios
            .post("/project", {withCredentials: true})
            .then(res => {
                this.project_pk = res.data;
            })
            .catch(error => {console.log(error)});
    },
    methods: {
        checkForm: function() {
            this.errors = [];
            // this.course = courseSelector.value;
            if (!this.description.length) this.errors.push('Du må skrive litt om prosjektet');
            if (!this.creator.length) this.errors.push('Vi vil gjerne vite hvem som har laget dette');
            if (!this.course.length) this.errors.push('Velg faget dette prosjektet ble gjort i');
            if (!this.class_year.length) this.errors.push('Når ble det laget?');
            if (!this.project_pk) this.errors.push('Du må laste opp minst ett bilde');

            !this.errors.length && this.project_pk !== null ? this.saveProject() : null;
            // this.errors.length && this.project_pk ? this.saveProject() : null;
        },
        saveProject: function() {
            const data = {
                'id': this.project_pk,
                'creator': this.creator,
                'description': this.description,
                'classYear': this.class_year,
                'course': this.course,
            };
            axios
                .put('/project', data)
                .then(res => {
                    console.log('result after change project: ' + res);
                    // window.onbeforeunload = () => {};
                    // window.location.href = "{% url 'projects' %}";
                })
                .catch((err) => console.log('axios put error: ' + err));
        }
    },
}

</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/project/_projects.scss";
</style>

