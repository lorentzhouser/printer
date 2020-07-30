<template>
    <div id="komite-detail" class="container nav">
        <h1>{{ komite.name }}</h1>
        <p class="p-width break">{{ komite.description }}</p>
    </div>
</template>

<script>
export default {
    name: 'CommitteeDetail',
    data: function() {
        return {
            slug: this.$route.params.slug
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/komite/_komite-detail.scss";
</style>