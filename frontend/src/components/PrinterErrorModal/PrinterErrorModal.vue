<template>
    <!-- <div class="ReservationModal" v-bind:class="{ Visible: printerErrorvisibilty }"> -->
    <div class="ErrorModal">
      <div class="ErrorModalContent">
        <div class="ModalTitle header3">Printer Error</div>

        <div class="FormContainer">

          <div class="ModalRow">
            <button class="button fluid" @click="nozzleJam"><span>Nozzle Jammed</span></button>
          </div>
          <div class="ModalRow">
            <button class="button fluid" @click="nozzleHeating"><span>Nozzle Heating</span></button>
          </div>
          <div class="ModalRow">
            <button class="button fluid" @click="bedHeating"><span>Bed Heating</span></button>
          </div>
          <div class="ModalRow">
            <button class="button fluid" @click="unsure"><span>Not sure what's wrong!</span></button>
          </div>
          <div class="ModalRow lastFlexItem">
            <button class="button secondary fluid" @click="hide"><span>Cancel</span></button>
          </div>
          
        </div>

      </div>
    </div>
</template>

<script>
// import axios from 'axios'
// import { mapState } from 'vuex'

export default {
    name: 'ReservationModal',
    props: ["visibilty", "file"],
    // computed: {
    //   ...mapState(['modalVisibility'])
    // },
    methods: {
      nozzleJam: function() {

      },
      nozzleHeating: function() {

      },
      bedHeating: function() {

      },
      unsure: function() {

      },
      hide: function() {

      }
    }
    
}
</script>

<style lang="scss" scoped>
   @import "@/assets/css/components/_printer-error-modal.scss";
</style>

