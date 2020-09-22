<template>
   <div id="login-page" class="container nav max-mobile center">
        <h1 class="center">Logg inn</h1>
        <br><br><br><br>
        
        <div class="input-field fluid">
            <input v-model="email" type="text" placeholder="email">
            <label>email</label>
        </div>
        <br>
        <div class="input-field fluid">
            <input v-model="password" type="password" placeholder="password">
            <label>password</label>
        </div>
        <br>
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
    methods: {
        login: function() {
            const reqData = {
                emailAddress: this.email,
                password: this.password,
                rememberMe: true,
            };
            this.$store.dispatch('login', reqData);
        }
    }
}
</script>

<style lang="scss" scoped>
    // @import "@/assets/css/components/_inputs.scss";
    // @import "@/assets/css/components/_buttons.scss";
</style>

