<template>
    <div id="all-events" class="container nav">
        <header>
            <h1>Arrangementer</h1>
            <div v-if=is_authenticated>
                <a class="button" href="/admin/events/event/add/"><span>Nytt arrangment</span></a>
                <br><br>
            </div>
            
            <img src="../assets/img/illustrations/all-events.png" alt="Bli med på Leonardos arrangmenter som Siri" />
        </header>
        <div class="box-container">
            <div v-bind:key="event.id" v-for="event in events">
                <Event v-bind:event="event"/>
            </div>
        </div>
    </div>
</template>

<script>
import Event from '../components/Event.vue'

export default {
    name: "Events",
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
            ]
        }
    },
    computed: {
        is_authenticated: function() {
            return this.$store.getters.is_authenticated;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/events/_all-events.scss";
</style>

