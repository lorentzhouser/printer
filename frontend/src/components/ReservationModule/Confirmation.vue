<template>
    <div id="Confirmation">
        <div class="receipt">
            <div id="confirm-schedule" class="subtitle">
                {{receipt.startTime}}
            </div>
            <div id="confirm-printer" class="caption">
                printer {{receipt.printer}}
            </div>
            <div id="confirm-filament" class="caption">
                {{receipt.filament}} mm
            </div>
        </div>
        <div @click="confirmReservation" id="reserve-button" class="confirm Button">RESERVE</div>
    </div>
</template>

<script>
export default {
    name: 'Confirmation',
    //probably passed as props
    props: ['receipt'],
    methods: {
        confirmReservation: function() {
            this.$router.push('/job-reservations');
            console.log('redirect after server post request');

            // const postURL = '/api/v1/reserve-job';

            // if ((this.getDuration() == -1) || (this.getSelectedReservationValue() == -1)) {
            //     console.log("one date variable has not been initialized");
            //     return;
            // }

            // var formData = new FormData()
            // formData.set('duration', this.getDuration());
            // formData.set('date', this.getSelectedReservationValue().startTime); 
            // formData.set('description', this.getFilename());
            // formData.set('class', this.getClassRelatedStatus());
            // formData.set('device', this.getSelectedReservationValue().device);

            // //must address cross-site post issue (for refresh of site)?
            // let request = new XMLHttpRequest();
            // request.open("POST", postURL);
            // request.send(formData);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/components/_reservation-module.scss";
</style>