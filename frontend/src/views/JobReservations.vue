<template>
    <div>
        <div class="TempNav">
            <div class="PageTitle">Printer Reservation</div>
            <div class="UserInfo">
              <button class="NewReservationBtn" @click="openReservationModal">
                <span>+</span>
              </button>
              {{username}}
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

                <!-- <Moveable class="moveable" v-bind="moveable" @drag="handleDrag" @resize="handleResize" @scale="handleScale" @rotate="handleRotate" @warp="handleWarp" @pinch="handlePinch"></Moveable> -->

                <!-- <Moveable class="Job" :draggable="true" @drag="handleDrag" v-bind:key="job.id" v-for="job in printerQueue.jobs" v-bind:class="job.priority" v-bind:style="{ width: job.widthPercentage, left: job.left }"></Moveable> -->

                <!-- <movable class="testmove" posTop="444" :grid="20"><span>grid:20</span></movable> -->
                <!-- <movable class="Job" posLeft="job.left" shiftKey="true" v-bind:key="job.id" v-for="job in printerQueue.jobs" v-bind:class="job.priority" v-bind:style="{ width: job.widthPercentage}"></movable> -->

                <div v-dragged="onDragged" class="Job" v-bind:key="job.id" v-for="job in printerQueue.jobs" v-bind:class="job.priority" v-bind:style="{ width: job.widthPercentage, left: job.left}"></div>
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
      }
    },
    methods: {
      openReservationModal: function() {
        console.log("open reservation modally");
        this.$emit('toggleVisibility', true);
      },
      handleDrag({ target, transform }) {
        console.log('onDrag left, top', transform);
        this.lastDragged = target;
        target.style.transform = transform;
      },
      endDrag() {
        // const target = this.lastDragged;
        // console.log('drog ended');
      },
      onDragged({ el, deltaX, deltaY, clientX, clientY, offsetX, offsetY, first, last }) {
        console.log('offset: ' + offsetX + ', ' + offsetY);
        console.log('ignore this: ' + clientX + ', ' + clientY);
        if (first) {
          this.startTop = el.style.top;
          console.log('start');
          
          el.style.zIndex = "500";
          return
        }
        if (last) { //COMPLETE DRAG
          
          //RESET Z-Index after animation
          el.style.zIndex = "10";
          
          
          return
        }
        var l = +window.getComputedStyle(el)['left'].slice(0, -2) || 0
        var t = +window.getComputedStyle(el)['top'].slice(0, -2) || 0
        el.style.left = l + deltaX + 'px'
        el.style.top = t + deltaY + 'px'
      }
    },
    computed: {
        ...mapState(['sliderValue', 'printerQueues', 'newJob']),
        ...mapGetters(['username']),
        computedPrinterQueues: function() {
            const computedPrinterQueue = this.printerQueues;
            computedPrinterQueue.forEach(printerQueue => {
                printerQueue.jobs.forEach(job => {
                    /*
                    - this.sliderValue is simply the time between intervals
                    - time elements are at 10% page width
                    - (job.duration in seconds) 
                    - ratio is this.sliderWidth per 10% -> this.sliderValue/.10
                    Percentage = (job.duration * 10%) / (this.sliderValue * 3600)
                    */
                    job.widthPercentage = (job.duration * 10) / (this.sliderValue * 3600) + '%';
                    /*
                    - recalibrate left positioning
                    - left is referenced from start hard 
                    - pixels?
                    
                    */
                    
                    const startDate = new Date(0);
                    startDate.setUTCSeconds(Date.now()/1000);
                    startDate.setHours(startDate.getHours());
                    startDate.setMinutes(0);
                    startDate.setSeconds(0);
                    
                    const deltaTime = job.date - (startDate.getTime()/1000);
                    //deltaTime is number of seconds between now and job
                    //sliderValue is time interval
                    const deltaTimeInHours = deltaTime/3600; //3600 seconds in an hour
                    
                    const distanceFromLocalHour = (deltaTimeInHours*10)/(Number(this.sliderValue));
                    // console.log('distanceFromLocalHour %: ' + distanceFromLocalHour);
                    // job.left = distanceFromLocalHour+'%';

                    //Could choose 100 px per hour 

                    // const pixelDistanceFromLocalHours = (1500/deltaTimeInHours);

                    job.left = distanceFromLocalHour + '%';
                    // job.left = pixelDistanceFromLocalHours + 'px';
                });
            });
            return computedPrinterQueue;
        },
        timeline: function() {
                /*
                important that this accomdates css flex
                starting with 2 hour intervals. width between time stamps is defined by a percentage number
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
                timelineObject[0] = {};
                return timelineObject;
            }
    },
    created() {
        //deal with cors
        // this.$store.dispatch('queryJobs');
    }
}    
</script>

<style lang="scss" scoped>
  @import "@/assets/css/pages/_job-reservations.scss";
</style>



        
    