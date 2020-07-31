<template>
    <div class="container nav" id="event-detail">
    <div class="image">
        <img :src="event.imageURL" :alt="event.short_description">
    </div>
    <header>
        
        <a v-if="is_authenticated" class="link block" href="{% url 'event_admin' event_slug=event.slug %}">Se påmeldte</a>
        
        <h1>{{ event.title }}</h1>
        <div class="info">
            <div>
                <p><img src="../../assets/img/icons/time.svg">{{ event.event_start_time }}</p>
                <p v-if="event.location"><img src="../../assets/img/icons/location.svg">{{ event.location }}</p>
            </div>

            <div class="signup">
                <form method="POST" v-if="event.registration_required">
                    
                    <a v-if="!is_authenticated" href="" class="button cta"><span>{{ buttonText }}</span></a>
                    <!-- {% if not buttonState %}disabled{% endif %} ^^^ -->
                    <div v-if="is_authenticated">
                    <button class="button cta" type="submit"><span>{{ buttonText }}</span></button>
                     <!-- {% if not buttonState %}disabled{% endif %} -->
                    
                    <p v-if="startTime" class="registration-start-time">Påmelding
                        åpner: {{ event.registration_start_time }}</p>
                    </div>
                    
                    <p id="open-for"><span>Åpent for: </span>{{ open_for }}</p>
                </form>
            </div>
        </div>
    </header>

    <div class="body p-width">
        <p class="subtitle1">{{ event.short_description }}</p>
        <p class="content-markdown">{{ event.description }}</p>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: "EventsDetail",
    
    data: function() {
        return {
            title: this.$route.params.title
        }
    },
    computed: {
        is_authenticated: function() {
            return this.$store.getters.is_authenticated;
        },
        startTime: function() {
            return true;
            // % if event.registration_start_time and not_open_yet %}    
        },
        buttonText: function() {
            return 'dynamic button text';
        },
        event: function() {
            const relEvent = this.events.filter(event => {
                return event.title == this.title;
            });
            return relEvent[0];
        },
        ...mapState([
            'events'
        ])
        
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/events/_event-detail.scss";
    @import "@/assets/css/components/_buttons.scss";
</style>

