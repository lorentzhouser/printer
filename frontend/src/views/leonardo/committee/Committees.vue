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
            <router-link v-bind:key="committee.id" v-for="committee in committees" :to="{ name: 'CommitteeDetail', params: { committee: committee }}">
                <a class="box box-image">
                <h4>{{ committee.name }}<img src="../../../assets/img/icons/arrow.svg" alt="pil"></h4>
                <img :src="committee.imageURL" :alt="committee.name">
                </a>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'Committees',
    created() {
        axios.get("/committees", {withCredentials: true})
            .then(res => {
                this.committees = res.data.committees;
            })
            .catch(err => console.log(err));
    },
    data: function() {
        return {
            committees: [
                {
                    id: 1,
                    name: 'name',
                    image: {
                        url: "https://www.pngitem.com/pimgs/m/461-4618525_ig-small-instagram-logo-2019-hd-png-download.png"
                    },
                    slug: 'bug',
                },
                {
                    id: 2,
                    name: 'name2',
                    image: {
                        url: "https://www.pngitem.com/pimgs/m/461-4618525_ig-small-instagram-logo-2019-hd-png-download.png"
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
    @import "@/assets/css/components/_box.scss";
</style>