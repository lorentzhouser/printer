<template>
    <div>
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
                <div class="Job" v-bind:key="job.id" v-for="job in printerQueue.jobs" v-bind:class="job.priority" v-bind:style="{ width: job.widthPercentage, left: job.left}"></div>
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
import axios from "axios";

export default {
    name: 'JobReservations',
    data: function () {
        return {
            sliderValue: 1, //slider value is simply the number of hours for an interval.
            printerQueues: [
                {
                    device: 1,
                    jobs: [
                        {
                            duration: 5000,
                            date: Number(Date.now()/1000 + 1500),
                            priority: 'Job',
                        },
                        {
                            duration: 15000,
                            date: Number((Date.now()/1000) + 9500),
                            priority: 'Urgent',
                        },
                    ]
                },
                {
                    device: 2,
                    jobs: [
                        {
                            duration: 2000,
                            date: Number(Date.now()/1000 + 3000),
                            priority: 'Private',
                        },
                        {
                            duration: 19000,
                            date: Number(Date.now()/1000 + 15000),
                            priority: 'Job',
                        },
                    ]
                },
                {
                    device: 3,
                    jobs: [
                        {
                            duration: 5000,
                            date: Number(Date.now()/1000 + 6000),
                            priority: 'Job',
                        },
                        {
                            duration: 3000,
                            date: Number(Date.now()/1000 + 13000),
                            priority: 'Job',
                        },
                    ]
                }
            ],
        }
    },
    computed: {
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
                    job.left = distanceFromLocalHour+'%';
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
            },
    },
    created() {
        //deal with cors
        axios.get("/job-reservations", {withCredentials: true})
            .then(res => { 
                this.printerQueues = res.data.printerQueues;
            })
            .catch(err => console.log(err));
    }
}    
</script>

<style lang="scss" scoped>

  .HorizontalScrollingContainer {
    /* width: 100%; */
    margin-top: $nav-height;
    overscroll-behavior-x: none;
    overflow-y: hidden; /*whole page should be scrolling.. not this div*/
    overflow-x: scroll;
    white-space: nowrap;
    background-color: transparent;
    /* border-width: 1px;
    border-color: red;
    border-style: solid;
    */
  }
  
  .TimeContainer {
    position: relative;
    background-color: transparent;
    display: inline-block;
    height: auto;
    width: 100%;
    margin-bottom: 10px;
    font-size: small;
    /* overflow-y: hidden; */
    /* overflow-x: hidden; */
  }
  
  .Day {
    height: 25px;
  }
  
  .TimeElement {
    display: inline-block;
    background-color: #F3F2EF;
    vertical-align: middle;
    width: 10%;
    color: black;
    white-space: nowrap;
  }
  
  .Queue {
    position: relative;
    vertical-align: middle;
    margin-bottom: 5px;
    height: 50px;
    width: 100%;
    background-color: transparent;
     /* border-width: 1px; */
     /* border-color: green; */
     /* border-style: solid; */
  }
  
  .LeftColumnTitle {
    z-index: 1;
    position: fixed;
    background-color: #F3F2EF;
    opacity: 0.8;
    font-size: x-large;
    text-align: center;
    vertical-align: middle;
    color: black;
    float: left;
    width: 4%;
    height: 50px;
    line-height: 2.1;
    overflow: hidden;
   
  }
  
  .RightColumnOpacity { 
    z-index: 1;
    position: fixed;
    right: 0px;
    background-color: #F3F2EF;
    opacity: 0.8;
    width: 4%;
    height: 50px;  
  }
  
  .Job {
    /* https://stackoverflow.com/questions/5209814/can-i-position-an-element-fixed-relative-to-parent */
    position: absolute;
    margin: 0px;
    float: left;
    text-align: left;
    width: 20%;
    height: 100%;
    background-color: #C23546;
    color: #E5E5E5;
    border-radius: 8px;
  }
  
  .Job:hover {
    border-width: thin;
    border-color: black;
    border-style: solid;
  }
  
  .ScrollMargin {
    height: 10px;
    width: 100%;
  }
  
  .Urgent {
    background-color: #F0AE1A;
    overflow: hidden;
    position: absolute;
    margin: 0px;
    float: left;
    text-align: left;
    width: 20%;
    height: 100%;
    color: #E5E5E5;
  }
  
  .Private {
    background-color: #3B208B;
    overflow: hidden;
    position: absolute;
    margin: 0px;
    float: left;
    text-align: left;
    width: 20%;
    height: 100%;
    color: #E5E5E5;
  }
  
  .SlideContainer {
    z-index: 1000;
    position: relative;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    height: 10px;
  }
  
  .Slider {
    position: absolute;
    right: 30px;
    top: 0px;
  }
  
  .Legend {
    position: absolute;
    left: 2%;
    margin-top: 30px;
    width: 50%;
    height: 50px;
    display: grid;
  }
  
  .Key {
    position: relative;
    width: 60px;
    height: 20px;
    border-radius: 8px;
    float: left;
    margin: 5px;
  }
  
  .LegendText {
    position: relative;
    margin-left: 35px;
    line-height: 1.8;
  }
  
  .Actions {
    position: absolute; 
    display: grid;
    grid-template-columns: 1fr 1fr;
    right: 5%;
    width: 30%;
    height: 100px;
    padding: 20px;
    padding-left: 50px;
  }
  
  .GantAction {
    margin: 10px;
    background-color: black;
    color: white;
  }
  
  .GantAction:disabled {
    opacity: 10%;
  }
</style>



        
    