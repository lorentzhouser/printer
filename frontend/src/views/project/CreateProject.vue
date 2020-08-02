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
    <vue-dropzone ref="myVueDropzone" id="dropzone" class="dropzone" :options="dropzoneOptions" 
        v-on:vdropzone-sending="sendingFile"
        v-on:vdropzone-queue-complete="queueComplete"
        v-on:vdropzone-files-added="filesAdded"
        v-on:vdropzone-complete="uploadComplete"
        v-on:vdropzone-success="uploadSuccess"
        v-on:vdropzone-canceled="uploadCancelled"
        >
    </vue-dropzone>
    <br>
    <br>
    <br>
    <br>
    <button @click="checkForm" :disabled="!ready" class="button" id="saveButton"><span>Legg ut prosjektet</span></button>
    <br> 
    </div>
</template>

<script>
import axios from 'axios'
import vue2Dropzone from 'vue2-dropzone'

export default {
    name: "CreateProject",
    components: {
        vueDropzone: vue2Dropzone
    },
    data: function() {
        return {
            ready: false,
            saved: false,
            description: '',
            creator: '',
            course: 'hard coursed',
            class_year: '',
            project_pk: null,
            errors: [], 
            dropzoneOptions: {
                url: 'http://localhost:1337/project-image',
                withCredentials: true,
                thumbnailWidth: 60,
                thumbnailHeight: 60,
                maxFiles: 10,
                maxFileSize: 10,
                // headers: { "My-Awesome-Header": "header value" }
            }
        }
    },
    mounted() {
        const saveButton = document.getElementById("saveButton");
        saveButton.disable = true;
        axios
            .post("/project", {withCredentials: true, 'owner': this.$store.state.user.userId })
            .then(res => {
                this.project_pk = res.data;
            })
            .catch(error => {console.log(error)});
    },
    methods: {
        // fileAdded: function() {
        //     this.ready = false;
        //     console.log('file added');
        // },
        filesAdded: function(files) {
            console.log('files added ' + files);
            this.ready = false;
        },
        sendingFile: function(file, xhr, formData) {
            formData.append('name', file.name);
            formData.append('project', this.project_pk);
            formData.append('imageFile', file);
        },
        uploadCancelled: function(file) {
            console.log('cancelled: ' + file);
        },
        uploadComplete: function(response) {
            console.log('response: ' + response);
        },
        uploadSuccess: function(file, response) {
            //for deleting uploads in future version
            console.log(file);
            console.log(response);
        },
        queueComplete: function() {
            this.ready = true;
        },  
        checkForm: function() {
            this.errors = [];
            // this.course = courseSelector.value;
            if (!this.description.length) this.errors.push('Du må skrive litt om prosjektet');
            if (!this.creator.length) this.errors.push('Vi vil gjerne vite hvem som har laget dette');
            if (!this.course.length) this.errors.push('Velg faget dette prosjektet ble gjort i');
            if (!this.class_year.length) this.errors.push('Når ble det laget?');
            if (!this.project_pk) this.errors.push('Du må laste opp minst ett bilde');

            !this.errors.length && this.project_pk !== null ? this.saveProject() : null;
            return (this.errors.length != 0)
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
                .then(() => {
                    this.saved = true;
                    this.$router.push('prosjekter');
                })
                .catch((err) => {
                    this.saved = false;
                    console.log('axios put error: ' + err)
                });
        },
        deleteProject: function() {
            if (this.project_pk == null) { return; }
            axios
                .delete('/project', {withCredentials: true, data: { 'id': this.project_pk }})
                .then(res => {
                    console.log('deleted project: ' + res);
                })
                .catch((err) => console.log('axios delete error: ' + err));
        }
    },
    beforeRouteLeave (to, from , next) {
        //check data
        if(this.saved) {
            next();
        }
        else if (this.checkForm()) {
            this.deleteProject();
            next();
        }
        else {
            const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
            if (answer) {
                //delete images and project
                this.deleteProject();
                next()
                
            } else {
                next(false)
            }
        }
    }
}

</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/project/_projects.scss";
</style>

