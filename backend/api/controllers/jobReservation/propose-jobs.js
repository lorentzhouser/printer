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
      const reservationDuration = this.req.params.duration;
      const jobProposals = await PrintJob.proposeJobs(reservationDuration);
      
      //create object time slot {printer: 1, time: recommendedJobStart};
      return jobProposals;
    }
  };
  