module.exports = {


    friendlyName: 'Propose suitable time for a given job',
  
  
    description: 'Find suitable reservations for a job. The logic that finds relevant reservation time slots',
  
    //Algorithm tips: avoid times from 0:00 to 7:00. But present the option for urgent if possible.
    //At 'menu option' that notifies of super later/early prints for choosing in the manual interface.

    exits: {
  
      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }
  
    },
  
  
    fn: async function () {
  
      if (!this.req.me) {
        throw {redirect: '/'};
      }
      //TUNING VARIABLES
      const margin = 300; //5 minutes in seconds between last print and next for append to end of slots.
      const startingWorkHour = 8;
      const finishingWorkHour = 17;
      //

      const dateNow = new Date();
      const dateNowSeconds = Math.floor(dateNow.getTime() / 1000);
      const reservationDuration = this.req.params.duration;
      //duration in seconds
      const allJobs = await PrintJob.find().sort('date ASC');
      console.log("stored all-job count: " + allJobs.length);
      
      /* 
      RETURN RELEVANT JOBS
      - retain job that is in process but started earlier than now.
      */
      const jobs = allJobs.filter(job => { return (job.date+job.duration) >= dateNowSeconds; });        
      var recommendJobStart;
      var urgentJobStart;

      /*
        add job to printer if no jobs are queued.
        - oversimplified, shouldn't be recommending anything outside of work hours
      */
      if (jobs.length == 0) {
        recommendJobStart = dateNowSeconds + margin;
        urgentJobStart = recommendJobStart;
      }
      else {
        //recommendedJobStart appends to the end of the queue
        const lastJobInOrder = jobs[jobs.length-1];
        recommendJobStart = Math.max(lastJobInOrder.duration + lastJobInOrder.date + margin, dateNowSeconds + margin);

        /*
        FIND URGENT JOB START TIME
        - if jobs[0].date < dateNowSeconds, then there is no time available earlier than first job
        - add dateNowSeconds to job coming up if current is empty
        */
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
                  recommendedSlots.push([delta_time, startingWorkDate.getUTCSeconds()]);
                }
              }
            }
          }
        });

        //urgent means get first usable slot
        if (printSlots.length <= 0) { console.log("print slots should always be greater than 0 because of appended final infinite slot"); }
        urgentJobStart = printSlots[0][1];

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
          lastResortDate.setHours(7);
          if (endLastSlotDate < 0 || lastSlotEndHours > startingWorkHour) {
            console.log('next day');
            lastResortDate.setDate(endLastSlotDate.getDate() + 1);
          }
          recommendJobStart = lastResortDate.getTime()/1000; //convert to seconds from millis -> divide by 1000 
        }
        else {
          const recommendedSlotsByDuration = recommendedSlots.sort((first, second) => { return (first[0] - second[0]); });
          recommendedSlotsByDuration.forEach(slot => {
            console.log(slot[0] + ' ' + slot[1]);
          });

          recommendJobStart = recommendedSlotsByDuration[0][1];
        }
      }

      //create object time slot {printer: 1, time: recommendedJobStart};
      return { 
        recommendJobStart : recommendJobStart,
        urgentJobStart : urgentJobStart,
       };
    }
  };
  