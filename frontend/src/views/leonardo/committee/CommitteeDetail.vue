<template>
    <div id="komite-detail" class="container nav">
        <h1>{{ committee.name }}</h1>
        <p class="p-width break">{{ committee.description }}</p>
    </div>
</template>

<script>
export default {
    name: 'CommitteeDetail',
    data: function() {
        return {
            committee: this.$route.params.committee
        }
    },
    mounted() {
        window.scrollTo(0, 0)
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/komite/_komite-detail.scss";
</style>