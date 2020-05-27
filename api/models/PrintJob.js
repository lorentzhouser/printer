/**
 * PrintJob.js
 *
 * A user who can log in to this application.
 */

module.exports = {

    attributes: {
  
      user: {
        model: 'user',
        required: true,
        unique: false,
        example: '1'
      },

      username: {
        type: 'string',
        required: true,
        description: 'Full name of user'
      },
  
      description: {
        type: 'string',
        description: 'Description of file being printed',
      },
  
      duration: {
        type: 'number',
        required: true,
        description: 'Print time'
      },
  
      date: {
        type: 'number',
        required: true,
        description: 'time of print initialization',
      },

      filename: {
        type: 'string',
        required: false,
        description: 'filename of GCODE'
      },
  
      file: {
        type: 'string',
        required: false,
        description: 'GCODE file',
      },

      device: {
        type: 'string',
        required: false,
        description: 'specific printer or laser'
      },

      class: {
        type: 'boolean',
        required: false,
        description: 'is this file class related?'
      }
    },

    getTimeSlots: async function(reservationDuration) {
       /*
        GET ALL RELEVANT TIME SLOTS PERTAINING TO INTENDED ADDITION
        - if jobs[0].date < dateNowSeconds, then there is no time available earlier than first job
        - add dateNowSeconds to job coming up if current is empty
        */
       const dateNow = new Date();
       const dateNowSeconds = Math.floor(dateNow.getTime() / 1000);
       const allJobs = await PrintJob.find().sort('date ASC');
       const jobs = allJobs.filter(job => { return (job.date+job.duration) >= dateNowSeconds; });        
       const lastJobInOrder = jobs[jobs.length-1];

       if (jobs.length == 0) { 
         console.log('need to deal with 0 existing jobs case');
         return; 
       }

       var allPrintSlots = [[],[]]; //duration & start time (date in seconds)

       if (jobs[0].date > dateNowSeconds) {
         const duration = jobs[0].date - dateNowSeconds;
         const start = dateNowSeconds;
         allPrintSlots.push([duration, start]);
       }

       for (var i = 0; i < jobs.length-1; i++) {
         const duration = jobs[i+1].date - (jobs[i].date + jobs[i].duration);
         const start = jobs[i].date + jobs[i].duration;
         allPrintSlots.push([duration, start]);
       }
       
       //add end of last job possibility 
       allPrintSlots.push([-1, lastJobInOrder.date + lastJobInOrder.duration]); //+margin

       //reduce slots to usable slots
       const printSlots = allPrintSlots.filter(slot => {
         return (slot[0] >= reservationDuration || slot[0] == -1);
       });

       console.log('slots available: ' + printSlots.length);
       return printSlots;
    },

    dateFromUTCSeconds: function (seconds) {
        const date = new Date(0);
        date.setUTCSeconds(seconds);
        return date;
    },

    getHourOfDayForUTCSeconds: function (seconds) {
      return this.dateFromUTCSeconds(seconds).getHours();
    },
    
    adjustDateToStartingHour: function(date, startingWorkHour) {
      const newDate = date;
      newDate.setSeconds(0);
      newDate.setMinutes(0);
      newDate.setHours(startingWorkHour);
      return newDate;
    },

    getTransformedSecondsFromDateTime: function(seconds) {
      const date = this.dateFromUTCSeconds(seconds);
      return date.getHours()*60*60 + date.getMinutes()*60 + date.getSeconds();
    },

    getLongprintRecommendedSlots: async function (printSlots, reservationDuration, startingWorkHour, finishingWorkHour) { 
      /*
      - Make sure slots are outside of working hours.
      - Should not recommend more than 3 hours into working hours.
      */
      //TUNING VARIABLE -> how many morning working hours allowed
      const peekingHours = 3;

      var recommendedSlots = [];
      
      printSlots.forEach(slot => {
        const slotStartHour = this.getHourOfDayForUTCSeconds(slot[1]);
        console.log(reservationDuration+slot[1]);
        const slotEndHour = this.getHourOfDayForUTCSeconds(Number(reservationDuration) + Number(slot[1]));

        console.log('SLOT- startHOUR: ' + slotStartHour + ' endHOUR: ' + slotEndHour);

        if (slotStartHour >= finishingWorkHour && (slotEndHour-3 <= startingWorkHour || slotEndHour > finishingWorkHour)) {
          recommendedSlots.push(slot);
        }
      });
      
      /*
        Recommend next day if no slots pushed
      */
       if (recommendedSlots.length == 0) {
        const finalSlot = printSlots.filter(slot => { return slot[0] == -1; })[0];
        const finalSlotStartHour = this.getHourOfDayForUTCSeconds(finalSlot[1]);
        const finalSlotDate = this.dateFromUTCSeconds(finalSlot[1]);
        finalSlotDate.setSeconds(0);
        finalSlotDate.setMinutes(0);
        finalSlotDate.setHours(finishingWorkHour);
        if (finalSlotStartHour >= finishingWorkHour) {
          //add slot at startingWorkHour of the next day
          finalSlotDate.setDate(finalSlotDate.getDate() + 1);
        }
        recommendedSlots.push([-1, finalSlotDate.getTime()/1000]);
      } 

      return recommendedSlots;
    },

    getRecommendedSlots: async function (printSlots, reservationDuration, startingWorkHour, finishingWorkHour) {
      /*
      - Make sure slots are within working hours
      - Slots outside of working hours have potential to partially be within working hours
      - End of queue considered in getTimeSlots(). If end-of-queue slot is out of bounds, recommend the following startHourTime
      */

      var recommendedSlots = [];
      
      printSlots.forEach(slot => {
        const slotStartHour = this.getHourOfDayForUTCSeconds(slot[1]);
        const startingWorkSeconds = startingWorkHour*60*60;
        const slotEndSeconds = this.getTransformedSecondsFromDateTime(slot[0] + slot[1]);
        const dayStartDeltaSpace = slotEndSeconds-startingWorkSeconds; 

        if (slotStartHour >= startingWorkHour && slotStartHour <= finishingWorkHour) {
          recommendedSlots.push(slot);
        }

        /*
          WHEN A SLOT IS STARTED OUTSIDE OF WORKING HOURS AND PART OF THE SLOT EXTENDS INTO WORKING HOURS.
          - slot is 'pushed' if enough time space is available between end of slot and start of day.
          - prevent slot[0] == -1 from pushing. This item provides a slotEndSeconds earlier than the start and may have another job immediatelty prior.
          */
        else if (dayStartDeltaSpace >= reservationDuration && slot[0] != -1) {
          recommendedSlots.push(slot);
        }

      });

       /*
          RECOMMENDED SLOTS COUNT == 0 WHEN LAST SLOT IS 'OUT-OF-BOUNDS'
          - we have gone to the end of the queue
          - append a recommendation at the next startingWorkHour
      */
      if (recommendedSlots.length == 0) {
        const finalSlot = printSlots.filter(slot => { return slot[0] == -1; })[0];
        const finalSlotStartHour = this.getHourOfDayForUTCSeconds(finalSlot[1]);
        const finalSlotDate = this.dateFromUTCSeconds(finalSlot[1]);
        finalSlotDate.setSeconds(0);
        finalSlotDate.setMinutes(0);
        finalSlotDate.setHours(startingWorkHour);
        if (finalSlotStartHour > 12) {
          //add slot at startingWorkHour of the next day
          finalSlotDate.setDate(finalSlotDate.getDate() + 1);
        }
        recommendedSlots.push([-1, finalSlotDate.getTime()/1000]);
      }
      return recommendedSlots;
    },

    proposeRecommendedJob: async function (recommendedSlots) {
      /*
        FIND RECOMMENDED JOB
        - recommended means find slot of best fit. if fit is still not good enough
        - sort by duration of slot
        - first sortedSlot will have shortest space fitting around. 
        - margin to be declared later as simply an increased reservationDuration 
        - is a long print considered greater than 5 hours? 
          ? maybe if there is congestion. long prints can run during the day if low print queue
          ? long prints can be replaced by request if during the day
          ? request user to move print to evening if possile when congestion builds up
        ? should the array be [shortest, greatest, shortest+1, greatest-1, ...]
          ? need to find more standard data for average print time etc..
      */
      return recommendedSlots.sort((first, second) => { return (first[0] - second[0]); })[0][1];
    },

    proposeUrgentJob: async function (printSlots) {
      if (printSlots.length <= 0) { console.log("print slots should always be greater than 0 because of appended final infinite slot"); }
      return printSlots[0][1];
    },
    
    proposeJobs: async function (reservationDuration) {
      /*
      STARTING AND FINISHING HOURS SHOULD COME FROM CONGRESTION ESTIMATE METHODS
      - should be based on congrestion level
      - at simplest level. a boolean method isCongrested() determines work day start and end
      - more advanced might be based on semester calendar
      */
      const longPrintCriteria = 5*60*60; //5 hours or more


      const startingWorkHour = 8;
      const finishingWorkHour = 17;
      const printSlots = await this.getTimeSlots(reservationDuration);
      const recommendedSlots = await this.getRecommendedSlots(printSlots, reservationDuration, startingWorkHour, finishingWorkHour);
      const longprintRecommendedSlots = await this.getLongprintRecommendedSlots(printSlots, reservationDuration, startingWorkHour, finishingWorkHour);
      

      const recommendedJob = reservationDuration < longPrintCriteria ? await this.proposeRecommendedJob(recommendedSlots) : longprintRecommendedSlots[0][1];
      const urgentJob = await this.proposeUrgentJob(printSlots);

      return { 
        recommendJobStart : recommendedJob,
        urgentJobStart : urgentJob,
      };

    },

  };
  