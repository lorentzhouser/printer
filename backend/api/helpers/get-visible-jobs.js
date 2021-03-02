module.exports = {


  friendlyName: 'Get all relevant print jobs',


  description: 'Reusable helper should clean up code.',


  exits: {

    success: {
      outputFriendlyName: 'Viewable jobs',
    },

  },


  fn: async function () {

    const currentEpochSeconds = Math.round((new Date()).getTime() / 1000);
      const result = await PrintJob.find().sort('date ASC');
      
      //filter out jobs that are from the past
      //jobs should include reservations that are currently in progress
      const jobs = result.filter(function(job) {
          return (job.date+job.duration) >= currentEpochSeconds;
      });

      jobs.forEach(job => {
          const date = new Date(0);
          date.setUTCSeconds(job.date);
          const durationDate = new Date(1970, 0, 1); // Epoch
          durationDate.setSeconds(job.duration);

          var humanReadableDate;
          const jobSeconds = Math.round(date.getTime() / 1000);
          
          const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
          ];
          const now = new Date()
          const formattedDate = new Date(0);
          formattedDate.setUTCSeconds(jobSeconds);
      
          var dayString = "";
          if (formattedDate.getDate() == now.getDate()) {
              dayString = "Today";
          }
          else if (formattedDate.getDate() == now.getDate() + 1) {
              dayString = "Tomorrow";
          }
          else {
              dayString = "" + monthNames[formattedDate.getMonth()] + ' ' + formattedDate.getDate();
          }
          var minutes = formattedDate.getMinutes();
          if (minutes < 10) {
              minutes = '0' + minutes;
          }
          humanReadableDate = dayString + ' at ' + formattedDate.getHours() + ':' + minutes;        
          
          const pastSecondsMargin = 2*60; //2 minutes 'timeout' essentially
          if ((jobSeconds <= currentEpochSeconds) && (Math.abs(jobSeconds-currentEpochSeconds) <= pastSecondsMargin)) { humanReadableDate = 'now'; }

          // job.date = humanReadableDate;
          job.hrd = humanReadableDate;
          // jobs[i].duration = durationDate; //don't think this is necessary anymore
          job.hours = durationDate.getHours();
          job.mins = durationDate.getMinutes();       
      });
  
      //return all jobs but by printer
      const allPrinters = [1,2,3,4,5,6];
      const printerQueues = allPrinters.map(printer => {
          return {device: printer, jobs: jobs.filter(job => { return job.device == printer })};
      });

      printerQueues.forEach(printerQueue => {
          console.log('device: ' + printerQueue.device);
          console.log('jobs: ' + printerQueue.jobs);
      });
      
    //   return {printerQueues: printerQueues};
      return printerQueues;
  }


};
