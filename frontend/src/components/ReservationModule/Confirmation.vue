<template>
    <div id="Confirmation">
        <div class="receipt">
            <div id="confirm-schedule" class="subtitle">
                {{receipt.date || 'no data'}}
            </div>
            <div id="confirm-printer" class="caption">
                printer {{receipt.device}}
            </div>
            <div id="confirm-filament" class="caption">
                {{receipt.filament || 'no data'}} mm
            </div>
        </div>
        <div @click="confirmReservation" id="reserve-button" class="confirm Button">RESERVE</div>
    </div>
</template>

<script>
// import axios from 'axios';

export default {
    name: 'Confirmation',
    //probably passed as props
    props: ['receipt'],
    methods: {
        confirmReservation: function() {
            const receipt = this.$props.receipt;
            
            // if ((this.getDuration() == -1) || (this.getSelectedReservationValue() == -1)) {
            //     console.log("one date variable has not been initialized");
            //     return;
            // }

            // var formData = new FormData()
            // formData.set('duration', receipt.duration);
            // formData.set('date', receipt.date);
            // formData.set('description', receipt.filename);
            // formData.set('class', receipt.private);
            // formData.set('startTime', receipt.startTime);
            // formData.set('device', receipt.device);

            // //must address cross-site post issue (for refresh of site)?
            // let request = new XMLHttpRequest();
            // request.open("POST", postURL);
            // request.send(formData);

            // priority should be enum selectable

            const postData = {
                'duration': receipt.duration,
                'date': receipt.date,
                'description': receipt.filename,
                'priority': receipt.priority,
                'device': receipt.device,
                'filament': receipt.filament,
            }
            console.log(postData);
            this.$store.dispatch('reserveJob', postData);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/components/_reservation-module.scss";
</style>