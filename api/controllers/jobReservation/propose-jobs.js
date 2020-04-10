module.exports = {


    friendlyName: 'Propose suitable job for time',
  
  
    description: 'Find suitable reservations for a job.',
  
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
      const dateNow = new Date();
      const dateNowSeconds = Math.floor(dateNow.getTime() / 1000);
      console.log('date now seconds: ' + dateNowSeconds);
      const reservationDuration = this.req.params.duration;
      //duration in seconds
      const jobs = await PrintJob.find().sort('date ASC');
      

      const lastJobInOrder = jobs[jobs.length-1];
      var recommendJobStart = lastJobInOrder.duration + lastJobInOrder.date;

      var urgentJobStart = -1;
      for (var i = 0; i < jobs.length-1; i++) {
        if (i==0) {
          if (reservationDuration < jobs[0].date) {
            console.log('first if');
            urgentJobStart = 0;
            break;
          }
        }
        const lastEnd = jobs[i].duration + jobs[i].date;
        const nextStart = jobs[i+1].date;
        if (nextStart-lastEnd > reservationDuration) {
          urgentJobStart = lastEnd;
          break;
        }
        console.log('oops if');
      }
      if (dateNowSeconds > recommendJobStart ) {
        console.log('second if');
        recommendJobStart = dateNowSeconds;
        console.log(recommendJobStart);
      }
      if (urgentJobStart == -1) {
        console.log('last if');
        urgentJobStart = recommendJobStart;
      }
      console.log('outside the ifs. should work');
    
      // //the logic that finds relevant reservation time slots   

      //create object time slot {printer: 1, time: recommendedJobStart};
      return { 
        recommendJobStart : recommendJobStart,
        urgentJobStart : urgentJobStart,
       };
    }
  };
  