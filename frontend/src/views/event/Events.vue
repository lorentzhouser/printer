<template>
    <div id="all-events" class="container nav">
        <header>
            <h1>Arrangementer</h1>
            <div v-if="is_authenticated">
                <a class="button" href="/admin/events/event/add/"><span>Nytt arrangment</span></a>
                <br><br>
            </div>
            
            <img src="../../assets/img/illustrations/all-events.png" alt="Bli med på Leonardos arrangmenter som Siri" />
        </header>
        <div class="box-container">
            <router-link v-bind:key="event.id" v-for="event in events" :to="{ name: 'EventDetail', params: { title: event.title }}" >
                <Event v-bind:event="event"/>
            </router-link>
        </div>
    </div>
</template>

<script>
import Event from '../../components/Event.vue'
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
export default {
    name: "Events",
    components: {
        Event,
    },
    data: function() {
        return {
            
        }
    },
    created() {
        //check if events already exist? extra call probably no issue
        this.$store.dispatch('loadEvents');
    },
    computed: {
        ...mapState([
            'events',
        ]),
        ...mapGetters([
            'is_authenticated',
        ])
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/events/_all-events.scss";
</style>

