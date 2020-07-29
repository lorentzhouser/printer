<template>
    <div id="thesign" class="container nav">
        <h1>TheSign</h1>
        <br>
        <p class="p-width">Linjeforeningsmagasinet til Leonardo laget av gjengen i Redda</p>
        <br>
        <br>
        <br>
        <div class="box-container">
        
            <a class="box" v-bind:key="thesign.id" v-for="thesign in thesigns" :href="thesign.url" target="_blank">
                <div class="image-container">
                <img :src="thesign.image.url" :alt="alt(thesign)">
                </div>
                <p>{{ thesign.edition }} {{ thesign.year }}</p>
            </a>

    </div>
  </div>
</template>

<script>
export default {
    name: "TheSign",
    data: function() {
        return {
            thesigns: [
                {
                    id: 1,
                    url: 'url',
                    edition: 4,
                    year: 2020,
                    image: {
                        url: 'url'
                    },
                }
            ]
        }
    },
    methods: {
        alt: function(thesign) {
            return thesign.edition + " " + thesign.year;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/_thesign.scss";
</style>


    
