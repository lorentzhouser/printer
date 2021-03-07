<template>
    <div>
        <div class="TempNav">
            <div class="PageTitle">Printer Reservation</div>
            <div class="UserInfo">
              <button v-if="reservationInProcess==false" class="button small NewReservationBtn" @click="openReservationModal">
                <span>+</span>
              </button>
              <button v-if="reservationInProcess==true" class="button small ConfirmReservationBtn" @click="confirmReservation">
                <span>Confirm</span>
              </button>
              <button v-if="reservationInProcess==true" class="button small ConfirmReservationBtn" @click="cancelReservation">
                <span>Cancel</span>
              </button>
              <!-- {{username}} -->
            </div>
        </div>
        
        <div class="HorizontalScrollingContainer" id="ScrollingContainer">
            <div class="TimeContainer">
                <!-- <div class="LeftColumnTitle"></div> -->
                <div class="TimeElement" v-bind:key="time.id" v-for="time in timeline">
                    <div class="Day">{{time.date}}</div>
                    <div class="Time">{{time.time}}</div>
                </div>
            </div>

            <div class="Queue" v-bind:key="printerQueue.device" v-for="printerQueue in computedPrinterQueues">
                <div class="LeftColumnTitle">{{printerQueue.device}}</div>
                <div v-dragged="onDragged" class="Job" v-bind:key="job.id" v-for="job in printerQueue.jobs" v-bind:class="job.priority" v-bind:style="{ width: job.widthPercentage, left: job.left}">
                    <div class="StartTime" v-if="job.priority == 'New'">
                        <span>{{startTimeHumanReadable}}</span>
                    </div>
                </div>
                <div class="RightColumnOpacity"></div>
            </div>

            <div class="ScrollMargin"></div>
        </div>

        <div class="SlideContainer">
            <input type="range" class="Slider" min="1" max="6" step="1" v-model="sliderValue">
        </div>

        <div class="Legend">
            <div>
                <div class="Key" style="background-color: #F0AE1A;"></div>
                <div class="LegendText">Urgent</div>
            </div>
            <div>
                <div class="Key" style="background-color: #3B208B;"></div>
                <div class="LegendText">Private</div>
            </div>
        </div>

        <div class="Actions">
            <button class="GantAction">Printer Error</button>
            <button class="GantAction">Contact Author</button>
            <button class="GantAction">Request Slot</button>
            <button class="GantAction">Other Actions?</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
// import Moveable from 'vue-moveable';
 
export default {
    name: 'JobReservations',
    data: function() {
      return {
        startTop: -1,
        startTimeHumanReadable: "",
      }
    },
    methods: {
    convertPositionToDate: function(left) {
        const hours = left/100;
        const secondsFromLeft = hours*3600;

        const startDate = new Date(0);
        startDate.setUTCSeconds(Date.now()/1000);
        startDate.setHours(startDate.getHours());
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        
        return ((startDate.getTime()/1000) + secondsFromLeft);    
    },
    humanReadableTime: function(left) {
        const absoluteDateSeconds = this.convertPositionToDate(left);
        // console.log("absolute seconds: " + absoluteDateSeconds);
        const date = new Date(0);
        date.setUTCSeconds(absoluteDateSeconds);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        this.startTimeHumanReadable = hours+":"+minutes;
    },
    openReservationModal: function() {
        this.$store.dispatch("showModal");
    },
    confirmReservation: function() {
        console.log("confirm reservation  new date: " + this.newJob.date);
        this.$store.dispatch("reserveJob", this.newJob);
        console.log("confirm");
    },
    cancelReservation: function() {
        this.$store.dispatch("queryJobs");
    },
    onDragged({ el, deltaX, deltaY, _clientX, _clientY, _offsetX, _offsetY, first, last }) {
        // QUIT IF NOT A NEW JOB PROPOSAL
        var shouldContinue = false;
        el.classList.forEach((className) => {
            if (className == "New") { shouldContinue = true; }
        })
        if (shouldContinue ==  false) { return; }

        // BULLSHIT
        if ((_clientX == (1/_clientY)) && (_offsetX == _offsetY)) {console.log('surprise');}
        // BULLSHIT

        var l = +window.getComputedStyle(el)['left'].slice(0, -2) || 0;
        var t = +window.getComputedStyle(el)['top'].slice(0, -2) || 0;

        if (first) {
            this.startTop = el.style.top;
            this.printerQueues.forEach(queue => {  
                queue.jobs.forEach(job => {
                    if (job.priority == "New") {
                        this.job = job;
                        // this.device = queue.device;
                    }
                });
            });
            
            el.style.zIndex = "500";
            return
        }
        if (last) { //COMPLETE DRAG
            
            var deltaYvertical = parseFloat(window.getComputedStyle(el).top);
            //THERE IS A difference between moving one space and moving two!

            var distanceToOvercome = parseFloat(window.getComputedStyle(el.parentNode).height)/2+ parseFloat(window.getComputedStyle(el.parentNode).marginBottom)/2;
            var rowChange = 0;
            var sign = deltaYvertical < 0 ? -1 : 1;
            deltaYvertical = Math.abs(deltaYvertical);
            while (deltaYvertical > distanceToOvercome) {
                rowChange++;
                distanceToOvercome += parseFloat(window.getComputedStyle(el.parentNode).height)+ parseFloat(window.getComputedStyle(el.parentNode).marginBottom);
            }
            rowChange *= sign;
            const lastDevice = this.newJob.device;
            var newDevice = lastDevice + rowChange;

            // console.log('deltaY ' + deltaYvertical);
            // console.log('rowChange ' + rowChange);

            // get job from priority, get device, get new device from transformation
            
            var updatedJob = this.newJob;
            updatedJob.device = newDevice;
            updatedJob.date = this.convertPositionToDate(parseFloat(el.style.left));
            
            if (lastDevice == newDevice) {
                console.log("no queue change");
            }
            else {
                var updatedQueues = this.printerQueues;
                var remainingJobs;

                //get jobs regular jobs
                this.printerQueues.forEach((queue) => {
                    if (queue.device == lastDevice) {
                        remainingJobs = queue.jobs.filter((job) => {
                            return (job.priority != "New");
                        });
                    }
                });

                console.log("remaining job count: " + remainingJobs.length);

                //update previous and new queue
                updatedQueues.forEach((queue) => {
                    if (queue.device == lastDevice) {
                        queue.jobs = remainingJobs;
                    }
                    if (queue.device == newDevice) {
                        queue.jobs.push(this.newJob);
                    }
                });
                // this.printerQueues = updatedQueues;
                this.$store.dispatch("updateQueues", updatedQueues);
            }


            this.$store.dispatch("updateNewJob", updatedJob.date);

            //RESET Z-Index after animation
            const jobStyle = el.style;
            jobStyle.zIndex = "0";
            
            this.startTimeHumanReadable = '';
            
            return;
        }
        // el.style.left = l + deltaX + 'px';
        //Update date
        
        el.style.left = l + deltaX + 'px';
        el.style.top = t + deltaY + 'px';
        this.humanReadableTime(parseFloat(el.style.left));
        }
    },
    computed: {
        ...mapState(['sliderValue', 'printerQueues', 'newJob', 'modalVisibility']),
        ...mapGetters(['username']),
        computedPrinterQueues: function() {
            const computedPrinterQueue = this.printerQueues;
            computedPrinterQueue.forEach(printerQueue => {
                printerQueue.jobs.forEach(job => {
                    /*

                    - this.sliderValue is simply the time between intervals
                    - time elements are 2 hour intervals at 100px. 2hours/100px
                    - (job.duration in seconds) 
                    - ratio is this.sliderWidth per 10% -> this.sliderValue/.10
                    Percentage = (job.duration * 10%) / (this.sliderValue * 3600)
                    */
                        
                        // duration is in seconds?
                        // (50px/ 1hour) * job.duration * 1hour/3600seconds
                    job.widthPercentage = (50 * job.duration / 3600) + 'px';
                    
                    const startDate = new Date(0);
                    startDate.setUTCSeconds(Date.now()/1000);
                    startDate.setHours(startDate.getHours());
                    startDate.setMinutes(0);
                    startDate.setSeconds(0);
                    
                    const deltaTime = job.date - (startDate.getTime()/1000);
                    //deltaTime is number of seconds between now and job
                    //sliderValue is time interval
                    const deltaTimeInHours = deltaTime/3600; //3600 seconds in an hour
                    
                    // const deltaTimeInHoursInPixels = deltaTimeInHours * 50px/hour
                    const deltaTimeInHoursInPixels = (deltaTimeInHours * 100) + 'px';
                    job.left = deltaTimeInHoursInPixels;

                    // const distanceFromLocalHour = (deltaTimeInHours*10)/(Number(this.sliderValue));
                    // console.log('distanceFromLocalHour %: ' + distanceFromLocalHour);
                    // job.left = distanceFromLocalHour+'%';

                    //Could choose 100 px per hour 

                    // const pixelDistanceFromLocalHours = (1500/deltaTimeInHours);

                    // job.left = distanceFromLocalHour + '%';
                    // job.left = pixelDistanceFromLocalHours + 'px';
                });
            });
            return computedPrinterQueue;
        },
        timeline: function() {

                /*
                important that this accomdates css flex
                starting with 2 hour intervals per 100px
                */
                var dateForTimeElement = new Date();
                const dayString = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                const currentHour = (new Date()).getHours();
                const currentSeconds = Date.now()/1000; //seems to be millis
                var endDateSeconds = currentSeconds;

                this.printerQueues.forEach(printerQueue => {
                    printerQueue.jobs.forEach(job => {
                        const jobEndSeconds = Number(job.duration) + Number(job.date);
                        if (jobEndSeconds > endDateSeconds) {
                            endDateSeconds = jobEndSeconds;
                        }
                    });
                });
                const timelineDurationSeconds = (endDateSeconds - currentSeconds);
                /* if timelineDurationSeconds < full page of time
                    add appropriate # hours
                */
                // const timelineNumberOfHours = (endDateSeconds - currentSeconds)/(this.sliderValue*3600);
                var timelineObject = [];
                timelineObject.push({
                    time: currentHour,
                    date: ""
                }); 
                /*
                timelineObject = [
                    22,
                    23,
                    0,
                    1,
                ]
                */
                //should always have enough hours for one day?, but more hours when needed. Width of spacing between times is to be predefined
                
                var i = 1;
                var sumTime = 0;
                while ( i <= 11 || sumTime <= timelineDurationSeconds ) {
                    sumTime += Number(this.sliderValue) * 3600;
                    const lastNumber = timelineObject[timelineObject.length-1].time;
                    const tentativeNextNumber = Number(lastNumber) + Number(this.sliderValue);
                    if (tentativeNextNumber >= 24) {
                        //add day here
                        timelineObject.push({
                            time: Number(tentativeNextNumber-24),
                            date: dayString[dateForTimeElement.getDay()] + " " + dateForTimeElement.getDate()
                        });
                        dateForTimeElement.setDate(dateForTimeElement.getDate() + 1);
                    }
                    else {
                        timelineObject.push({
                            time: tentativeNextNumber,
                            date: (i == 1) ? (dayString[dateForTimeElement.getDay()] + " " + dateForTimeElement.getDate()) : ""
                        });
                        if (i == 1) { 
                            dateForTimeElement.setDate(dateForTimeElement.getDate() + 1);
                        }
                    }
                    i++;
                }
                timelineObject = timelineObject.map(numObj => {
                    return {
                        time: (numObj.time < 10) ? ('0' + numObj.time + ':00') : (''+ numObj.time + ':00'),
                        date: numObj.date
                    }
                });
                //remove first time for clarity (temporarily for testing)
                // timelineObject[0] = {};
                return timelineObject;
            },
            reservationInProcess: function() {
                var inProcess = false;
                this.printerQueues.forEach((queue) => {
                    queue.jobs.forEach((job) => {
                        if (job.priority == "New") { inProcess = true; }
                    });
                });
                return inProcess;
            }
    },
    created() {
        //deal with cors
        this.$store.dispatch('queryJobs');
    }
}    
</script>

<style lang="scss" scoped>
  @import "@/assets/css/pages/_job-reservations.scss";
</style>



        
    