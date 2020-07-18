<template>
    <div>
        <div id="tips-page" class="container nav">
            <header>
                <h1>Tips og triks</h1>
                <br>
                <p>Del noe lurt med dine medstudenter!</p>
                <a href="{% url 'new-tip' %}" class="button fab"><img src="../../assets/img/icons/add_white.svg" alt="add"></a>
                <img src="../../assets/img/illustrations/herman.png" alt="Tips og triks for designstudenter">
            <br><br><br><br>
                <div v-bind:key="tag.id" v-for="tag in tags">
                    <div class="tag filter">{{ tag.name }}</div>
                </div>
            <br><br>
            </header>
            <div class="box-container">
                <a class="box clickable" :href="tip.slug" v-bind:key="tip.id" v-for="tip in tips">
                    <h3>{{ tip.title }}</h3>
                    <span v-bind:key="index" v-for="(tag, index) in tip.tags">
                        {{ tag.name }}<span v-if="index + 1 < tip.tags.length">, </span>
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tips',
    data: function() {
        return {
            tips: [
                {
                    id: 1,
                    slug: 'ref',
                    tags: ["tag"],
                    title: "verkstedet"
                },
                {
                    id: 2,
                    slug: 'ref2',
                    tags: ["tag2"],
                    title: "interaksjon"
                }
            ],
            tags: [
                {
                    id: 1,
                    name: "tip1"
                },
                {
                    id: 2,
                    name: "tip2"
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/_tips.scss";
</style>


