<template>
   <div id="login-page" class="container nav max-mobile center">
        <h1 class="center">Logg inn</h1>
        <br><br><br><br>

            <label>
            <input v-model="email" placeholder="email" class="input-field fluid">
            </label>
            <input v-model="password" placeholder="password" class="input-field fluid">
            
            <button class="button fluid" type="submit" @click="login"><span>Logg inn</span></button>
            <br><br><br>
            <a class="button secondary center" href="{% url 'register' %}" style="width: 80%"><span>Registrer ny bruker</span></a>
            <br><br>
            <a class="link center" href="/accounts/password_reset">Glemt passordet?</a>
        
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import axios from 'axios'
export default {
    name: "Login",
    data: function() {
        return {
            email: "",
            password: ""
        }
    },
    computed: {
        // is_authenticated: function() {
        //     return this.$store.getters.is_authenticated;
        // }
    },
    methods: {
        login: function() {
            const reqData = {
                emailAddress: 'stine@me.com',
                password: '1234',
                rememberMe: true,
            };
            this.$store.dispatch('login', reqData);
        }
    }
}
</script>

<style lang="scss" scoped>
    // @import "@/assets/css/pages";
</style>

