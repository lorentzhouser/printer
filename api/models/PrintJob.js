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

    getHourOfDayForUTCSeconds: function (seconds) {
      const date = new Date(0);
      date.setUTCSeconds(seconds);
      return date.getHours();
    },
    
    getRecommendedSlots: async function (printSlots, reservationDuration, startingWorkHour, finishingWorkHour) {
      //recommendedSlots sorted by date
      var recommendedSlots = [];
      printSlots.forEach((slot,index) => {
        const slotDate = new Date(0);
        slotDate.setUTCSeconds(slot[1]);
        const slotHrs = slotDate.getHours();
        if (slotHrs >= startingWorkHour && slotHrs <= finishingWorkHour) {
          recommendedSlots.push(slot);
        }
        else if (index < printSlots.length-1) {
          const nextSlotDate = new Date(1970, 0, 1); // Epoch
          nextSlotDate.setSeconds(printSlots[index+1][1]);
          const nextSlotHrs = slotDate.getHours();
          if (nextSlotHrs > startingWorkHour) {
            //get end-of-print hour
            const endSlotDate = new Date(1970, 0, 1); // Epoch
            endSlotDate.setSeconds(Number(slot[1]) + Number(slot[0]));
            const slotEndHrs = endSlotDate.getHours();

            const startWorkDate = nextSlotDate;
            startWorkDate.setSeconds(0);
            startWorkDate.setMinutes(0);
            startWorkDate.setHours(startingWorkHour);
            
            if (slotEndHrs > startingWorkHour) {
              //check time between this print and next
              const delta_time = nextSlotDate.getUTCSeconds() - endSlotDate.getUTCSeconds();
              if (delta_time >= reservationDuration) {
                console.log('cons 2');
                recommendedSlots.push([delta_time, endSlotDate.getUTCSeconds()]);
              }
            }
            else {
              //check time between startingWorkHour and nextTime
              const delta_time = nextSlotDate.getUTCSeconds() - startWorkDate.getUTCSeconds();
              if (delta_time >= reservationDuration) {
                console.log('cons 3');
                recommendedSlots.push([delta_time, startWorkDate.getUTCSeconds()]);
              }
            }
          }
        }
      });
      return recommendedSlots;
    },
    
    proposeRecommendedJob: async function (printSlots, recommendedSlots, startingWorkHour) {
      const margin = 300;
      /*
        FIND RECOMMENDED JOB
        - recommended means find slot of best fit. if fit is still not good enough
        - sort by duration of slot
        - first sortedSlot will have shortest space fitting around
        - should be checking for proper margin between prints
        - recommended jobs are during work hours 8 - 17
        - is a long print considered greater than 5 hours? 
          - maybe if there is congestion. long prints can run during the day if low print queue
          - long prints can be replaced by request if during the day
          - request user to move print to evening if possile when congestion builds up
        -? should the array be [shortest, greatest, shortest+1, greatest-1, ...]
          -? need to find more standard data for average print time etc..
      */

       if (recommendedSlots.length == 0) {
        console.log('no recommendations yet!');
        
        // getLastSlotTime
        const lastSlot = printSlots.filter(slot => { return (slot[0]==-1); });
        if (lastSlot.length>1) { console.log ('should only have one slot with duration -1'); }
        const endLastSlotDate = new Date(1970, 0, 1); // Epoch
        endLastSlotDate.setSeconds(Number(lastSlot[0][0]) + Number(lastSlot[0][1]));
        const lastSlotEndHours = endLastSlotDate.getHours();

        const lastResortDate = new Date(endLastSlotDate.getFullYear(), endLastSlotDate.getMonth(), endLastSlotDate.getDate()); // Epoch
        lastResortDate.setHours(startingWorkHour);
        if (endLastSlotDate < 0 || lastSlotEndHours > startingWorkHour) {
          console.log('next day');
          lastResortDate.setDate(endLastSlotDate.getDate() + 1);
        }
        return lastResortDate.getTime()/1000; //convert to seconds from millis -> divide by 1000 
      }
      else {
        var recommendedSlotsByDuration = recommendedSlots[0];
        if (recommendedSlots.length > 1) {
          recommendedSlotsByDuration = recommendedSlots.sort((first, second) => { return (first[0] - second[0]); })[0];
        }
        return recommendedSlotsByDuration[1];
      }
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
      const startingWorkHour = 8;
      const finishingWorkHour = 17;
      const printSlots = await this.getTimeSlots(reservationDuration);
      const recommendedSlots = await this.getRecommendedSlots(printSlots, reservationDuration, startingWorkHour, finishingWorkHour);

      const recommendedJob = await this.proposeRecommendedJob(printSlots, recommendedSlots, startingWorkHour);
      const urgentJob = await this.proposeUrgentJob(printSlots);

      return { 
        recommendJobStart : recommendedJob,
        urgentJobStart : urgentJob,
      };

    },

  };
  