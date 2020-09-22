<template>
    <div id="PrintOptions" v-if="Object.keys(this.proposal).length !== 0">
        <div class="MenuOption">
        <div class="InfoTextOption" @click="selectOption('recommended')">
            <div class="subtitle2">Recommended</div>
            <div class="caption">{{recommendedStartTime}}</div>
        </div>
        </div>
        <div class="MenuOption" @click="selectOption('urgent')">
        <div class="InfoTextOption">
            <div class="subtitle2">Urgent</div>
            <div class="caption">{{urgentStartTime}}</div>
        </div>
        </div>
        <div class="MenuOption" @click="other">
        <div class="InfoTextOption">
            <div class="subtitle2">Other</div>
            <div class="caption">static what?</div>
        </div>
        </div>
        <div class="PrivateOption"><input v-model="checked" type="checkbox">  Course Related</div>
    </div>
</template>

<script>
export default {
    name: 'Options',
    props: ['proposal'],
    data: function() {
        return {
            checked: false
        }
    },
    methods: {
        selectOption: function(option) {
            this.$emit('selectOption', option)
        },
        other: function() {
            //push with file data
            //drag
            this.$router.push('/job-reservations');
            this.$emit('hide');
        },
        convertUTCtoHumanReadable(millis) {
            var date = new Date(0);
            // var now = Date.now();
            date.setUTCSeconds(millis);
            

            // date.setUTCMilliseconds(millis);
            return date.toString();
        }
    },
    computed: {
        recommendedStartTime: function() {
            return this.convertUTCtoHumanReadable(this.proposal.recommendJobStart.startTime);
        },
        urgentStartTime: function() {
            return this.convertUTCtoHumanReadable(this.proposal.urgentJobStart.startTime);
        }
    },
    watch: { 
        checked: function() {
            this.$emit('makeCourseRelated', this.checked);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/components/_reservation-module.scss";
</style>