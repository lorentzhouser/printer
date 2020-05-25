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
        allPrintSlots.push([-1, lastJobInOrder.date + lastJobInOrder.duration + margin]);

        //reduce slots to usable slots
        const printSlots = allPrintSlots.filter(slot => {
          return (slot[0] >= reservationDuration || slot[0] == -1);
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
        const printSlotsByDuration = printSlots.sort((first, second) => { return (first[0] - second[0]); });
        recommendJobStart = printSlotsByDuration[0][1];
      }

      //create object time slot {printer: 1, time: recommendedJobStart};
      return { 
        recommendJobStart : recommendJobStart,
        urgentJobStart : urgentJobStart,
       };
    }
  };
  