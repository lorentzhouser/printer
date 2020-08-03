<template>
    <nav id="main-navigation">
        <router-link to="/" id="leo-logo" class="nav-item">
            <img src="../assets/img/Logo/Inverse.svg" alt="Leonardo-logoen">
        </router-link>
        <div id="hamburger" class="closed">
            <div class="bar"></div>
            <div id="middle" class="bar"></div>
        </div>
        <ul class="item-list">
            <li id="close-nav" class="nav-item"><img src="../assets/img/icons/close_white.svg" alt="close"></li>
            <li class="nav-item dropdown">
                <span>Student</span>
                <ul>
                    <li><router-link to="/student/tips" class="nav-item">Tips og triks</router-link></li>
                    <li><router-link to="/student/courses" class="nav-item">Fag</router-link></li>
                    <li><router-link to="/student/books" class="nav-item">Boksalg</router-link></li>
                    <li><router-link to="/student/jobs" class="nav-item">Jobb</router-link></li>
                    <li><router-link to="/student/new-student" class="nav-item">Ny student?</router-link></li>
                    <li><router-link to="/student/study-abroad" class="nav-item">Utveksling</router-link></li>
                    <li><router-link to="/student/class-trip" class="nav-item">Klasseturer</router-link></li>
                </ul>
            </li>

            <li class="nav-item dropdown">
                <span>Leonardo</span>
                <ul>
                    <li class="nav-item"><router-link to="/leonardo/committees" class="nav-item">Komiteer</router-link></li>
                    <li class="nav-item"><router-link to="/leonardo/thesign" class="nav-item">TheSign</router-link></li>
                    <li class="nav-item"><router-link to="/leonardo/about" class="nav-item">Om oss</router-link></li>
                    <li v-if="is_authenticated" class="nav-item"><router-link to="/leonardo/vedtekter" class="nav-item">Vedtekter</router-link></li>
                    
                </ul>
            </li>

            <li><router-link to="/prosjekter" class="nav-item">Prosjekter</router-link></li>
            <li><router-link to="/arrangementer" class="nav-item">Arrangementer</router-link></li>
            <li><router-link to="/job-reservations" class="nav-item">Print</router-link></li>
            <li><div @click="logout" class="nav-item">Logout</div></li>

            
            <li v-if="is_authenticated">
              <router-link to="/account" class="nav-item user">
                <div class="face">
                  <div class="eyes left"></div>
                  <div class="eyes right"></div>
                  <div class="mouth"></div>
                </div>Min side
              </router-link>
            </li>

            
            <li v-if="!is_authenticated"><router-link to="/login" class="nav-item login">Logg inn</router-link></li>
        </ul>
    </nav> 
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'NavBar',
    computed: {
      ...mapGetters([
      'is_authenticated'
      ])
    },
    methods: {
      logout: function() {
        this.$store.dispatch('logout');
      }
    }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/components/_navbar.scss";
  @import "@/assets/css/components/_face.scss";
</style>
