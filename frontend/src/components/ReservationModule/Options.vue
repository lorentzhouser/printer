<template>
    <div id="PrintOptions" v-if="Object.keys(this.proposal).length !== 0">
        <div class="MenuOption">
        <div class="InfoTextOption" @click="selectOption('recommended')">
            <div class="subtitle2">Recommended</div>
            <div class="caption">{{proposal.recommended.startTime}}</div>
        </div>
        </div>
        <div class="MenuOption" @click="selectOption('urgent')">
        <div class="InfoTextOption">
            <div class="subtitle2">Urgent</div>
            <div class="caption">{{proposal.urgent.startTime}}</div>
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