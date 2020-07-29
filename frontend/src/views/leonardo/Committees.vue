<template>
    <div id="komite" class="container nav">
        <h1>Komiteer</h1>
        <p class="p-width">
            Komitéene er grunnen til at Leonardo linjeforening går rundt. Her er det mange forskjellige alternativer til
            hva man kan drive med, hvor man samtidig får masse god erfaring og givende arbeid. Bli med å drifte Leonardo
            da vel!
        </p>
        <br>
        <br>
        <div class="box-container">
            <a class="box box-image" v-bind:key="komite.id" v-for="komite in komiteer" href="{% url 'komite_detail' komite_slug=komite.slug %}">
                <h4>{{ komite.name }}<img src="../../assets/img/icons/arrow.svg" alt="pil"></h4>
                <img :src="komite.image.url" :alt="komite.name">
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Committees',
    data: function() {
        return {
            komiteer: [
                {
                    id: 1,
                    name: 'name',
                    image: {
                        url: "google.com"
                    },
                    slug: 'bug',
                },
                {
                    id: 2,
                    name: 'name2',
                    image: {
                        url: "google.com"
                    },
                    slug: 'bug'
                }
            ],
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/komite/_komite.scss";
</style>