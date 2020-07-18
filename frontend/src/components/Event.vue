<template>
    <div>
    <a class="event" :href="event.slug">
    <div>
        <p class="date">{{ event.event_start_time }}</p>
        <h3>{{ event.title }}</h3>
    </div>
    <div class="image-container">
        <img :src="event.thumbnail.url" :alt="event.short_description">
    </div>
    </a>
    </div>
</template>

<script>
export default {
    name: 'Event',
    props: ['event'],
    computed: {
        // |date:"d.m.y"
        // create day month year format from date
    // is_now: function() {
    //     return true;
    // },
    // get_class_year: function() {
    //     const YEAR_CHOICES = []; 
            // if NOW.month > 7:
            //     YEAR += 1

            //some struct mapping to a string
            //get class year from user
    //     return 2;
    // }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/components/_box.scss";
    @import "@/assets/css/components/_event-component.scss";
</style>


