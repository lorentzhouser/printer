<template>
    <div class="container nav narrow">
         <vue-dropzone ref="imgDropZone" id="customdropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
    <div v-if="images.length > 0" class="image-div">
      <div v-for="image in images" :key="image.src">
        <img :src="image.src" class="image" />
      </div>
    </div>
    </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";

export default {
    name: "CreateProject",
    components: {
        vueDropzone: vue2Dropzone
    },
    data: function() {
        return {
            dropzoneOptions: {
            url: "https://httpbin.org/post",
            thumbnailWidth: 150,
            thumbnailHeight: 150,
            addRemoveLinks: false,
            acceptedFiles: ".jpg, .jpeg, .png",
            dictDefaultMessage: `<p class='text-default'><i class='fa fa-cloud-upload mr-2'></i> Drag Images or Click Here</p>
            <p class="form-text">Allowed Files: .jpg, .jpeg, .png</p>
            `
            },
            images: [],
        }
    },
    methods: {
        async afterComplete(upload) {
        var imageName = uuid.v1();
        this.isLoading = true;
        try {
            //save image
            let file = upload;
            var metadata = {
            contentType: "image/png"
            };
            var storageRef = firebase.storage().ref();
            var imageRef = storageRef.child(`images/${imageName}.png`);
            await imageRef.put(file, metadata);
            var downloadURL = await imageRef.getDownloadURL();
            this.images.push({ src: downloadURL });
        } catch (error) {
            console.log(error);
        }
        this.$refs.imgDropZone.removeFile(upload);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/project/_projects.scss";
</style>

