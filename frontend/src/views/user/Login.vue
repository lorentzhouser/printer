<template>
   <div id="login-page" class="container nav max-mobile center">
        <h1 class="center">Logg inn</h1>
        <br><br><br><br>
        <form method="POST">

            <div class="input-field fluid">
                dynamic
                <label for="dynamic">E-post</label>
                dynamic
            </div>
            <div class="input-field fluid">
                dynamic
                <label for="dynamic">Passord</label>
                dynamic
            </div>
            <button class="button fluid" type="submit"><span>Logg inn</span></button>
            <br><br><br>
            <a class="button secondary center" href="{% url 'register' %}" style="width: 80%"><span>Registrer ny bruker</span></a>
            <br><br>
            <a class="link center" href="/accounts/password_reset">Glemt passordet?</a>
        </form>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
    name: "Login",
    data: function() {
        return {
            
        }
    },
    computed: {
        // is_authenticated: function() {
        //     return this.$store.getters.is_authenticated;
        // }
    }
}
</script>

<style lang="scss" scoped>
    // @import "@/assets/css/pages";
</style>

