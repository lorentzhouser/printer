<template>
    <div id="about" class="container nav">
            <h1>Om leonardo</h1>
            <p>På Gløshaugen er det en lang tradisjon for linjeforeninger, der Leonardo er en av de yngste og ble opprettet i 1994, samme året som Institutt for Produktdesign ble etablert.</p>
            <img src="../../assets/img/about2.jpg" alt="Leonardo linjeforening er linjeforeningen til studentene ved Industriell design">
            <p>Formålet med linjeforeningen er å skape et bra sosialt tilbud til studentene i og utenfor skoletiden. Ditt første møte med Leonardo er under Fadderperioden som arrangeres sammen med årets 2. klassinger. I løpet av fadderperioden vil du bli kjent med dine nye klassekamerater, og ellers folk fra de andre klassene. Fadderperioden er noe du forhåpentligvis kommer til å huske tilbake på med et smil og som en fantastisk start på livet på IPD. Utover i året fortsetter tilbudene. Blant annet immatrikuleringsball for første klasse, styrevalg, temafester, bedriftspresentasjoner og workshops.</p>

            <section>
                    <div id="kontaktperson" v-bind:key="kontaktperson.id" v-for="kontaktperson in kontaktpersons">
                        <img class="profileImg" :src="kontaktperson.image.url" :alt="kontaktperson.name">
                        <div class="details">
                            <div class = "caption gray" style="margin-bottom:8px;">{{kontaktperson.name}}</div>
                            <div class="stilling">{{kontaktperson.stilling}}</div>
                            <div class="email">{{kontaktperson.email}}</div>
                        </div>
                    </div>
            </section>
    </div>
</template>

<script>
export default {
    name: 'About',
    data: function() {
        return {
            kontaktpersons: [
                {
                    id: 1,
                    name: "name",
                    image: {
                        url: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678130-profile-alt-4-512.png"
                    },
                    stilling: "manager",
                    email: "email"
                },
                {
                    id: 2,
                    name: "name",
                    image: {
                        url: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678130-profile-alt-4-512.png"
                    },
                    stilling: "manager",
                    email: "email"
                },
                {
                    id: 3,
                    name: "name",
                    image: {
                        url: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678130-profile-alt-4-512.png"
                    },
                    stilling: "manager",
                    email: "email"
                }
            ]
        }
    }

}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/_about.scss";
</style>