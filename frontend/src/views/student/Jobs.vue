<template>
    <div id="job" class="container nav narrow">
    <h1>Stilllingsannonser</h1>
    <br>
    <br>
    <br>
        <div class="wrapper">
            <div class="filters">
            <!-- {% comment %} {% for filter in filters %} -->
                <!-- <div class="filter">{{ filter.name }}</div> -->
            <!-- {% endfor %} {% endcomment %} -->
            </div>
            <div class="stilllingsannonser">
                <a v-for="job in jobs" v-bind:key="job.id" class="annonse" href="link">
                    <div class="logo" :style="{ background: job.company.color }">
                        <img :src="job.company.logo.url" :alt="job.company.name">
                        <div class="border" :style="{ 'border-color': job.company.color }"></div>
                    </div>
                    <div class="text">
                        <div>
                            <h3>{{ job.title }}</h3>
                            <p class="deadline"><span class="label">Frist: </span>{{ job.deadline }}</p>
                            <p class="caption">{{ job.deadline }} dager igjen</p>
                        </div>
                        <!-- <p>{% for filter in job.filters.all %}<span>#{{ filter.name }}{% if not forloop.last %}, {% endif %}</span>{% endfor %}</p> -->
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Jobs',
    data: function() {
        return {
          jobs: [
            {
                id: 1,
                company: {
                    color: 'red',
                    logo: {
                        url: 'url'
                    },
                    name: 'dinesen',
                },
                deadline: 1234,
            },
          ]
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/_jobs.scss";
</style>


