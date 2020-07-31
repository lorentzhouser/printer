<template>
    <div class="container nav" id="books">
        <h1>Boksalg</h1>
        <p class="paragraph p-width">Finner du en bok du ønsker å kjøpe kan du enten løpe inn i klasserommet og prate
            med
            personen, eller sende en melding med favoritt-meldingstjenesten din.</p>
        <img src="../../assets/img/illustrations/trond-are.png" alt="Trond Are selger bøker">
        <a v-if="user.is_authenticated" href="createBookUrl" class="button"><span>Legg ut bok for salg</span></a>
        <br><br><br>
        <div class="box-container">
                <div v-bind:key="book.id" v-for="book in books" class="book box">
                    <div class="image-container">
                        <img :src="book.image.url" alt="">
                    </div>
                    <p class="caption gray">{{ book.course.name }} – {{ book.course.course_code }}</p>
                    <p class="">{{ book.title }}</p>
                    <div class="bottom">
                        <p class="caption">{{ book.seller.first_name }} {{ book.seller.last_name }}, {{ book.seller.get_class_year }}.
                            klasse</p>
                            <p class="caption" v-if="user.is_authenticated">{{ book.seller.email }}</p>
                            <p class="caption" v-if="!user.is_authenticated">Logge inn for kontaktinfo</p>
                        <h6 class="subtitle2">{{ book.price }} kr</h6>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BookSales",
    data: function() {
        return {
            user: {
                is_authenticated: true
            },
            books: [
                {
                    course: {
                        name: 'physics',
                        course_code: '2342',
                    },
                    id: 1,
                    title: 'my book',
                    price: 250,
                    seller: {
                        first_name: 'lorentz',
                        last_name: 'houser',
                        get_class_year: '4',
                        email: 'lorentzhouser@email.com',
                    },
                    image: {
                        url: "https://static.wixstatic.com/media/5e47c9_ba7a875e11eb4a9b96a6de9ddb29b1ab~mv2.jpg/v1/fill/w_1280,h_720,al_c,q_85/5e47c9_ba7a875e11eb4a9b96a6de9ddb29b1ab~mv2.webp",
                    },
                }
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/_books.scss";
</style>