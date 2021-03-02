module.exports = {


    friendlyName: 'View all jobs',
  
  
    description: 'Display jobs page.',
  
    exits: {
  
      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }
  
    },
  
    fn: async function () {
  
      // if (!this.req.me) {
      //   throw {redirect: '/'};
      // }
      
      const currenSecondsSince1970 = Math.round((new Date()).getTime() / 1000);
      const jobs = await PrintJob.find().sort('date DESC');
      
      //filter out jobs that are from the past
      //jobs should include reservations that are currently in progress
      
      // for (var i = 0; i < jobs.length; i++) {
      //   const date = new Date(0);
      //   var durationDate = new Date(1970, 0, 1); // Epoch
      //   date.setUTCSeconds(jobs[i].date);
      //   durationDate.setSeconds(jobs[i].duration);

      //   var humanReableDate;
      //   const seconds = Math.round(date.getTime() / 1000);
      //   const pastSecondsMargin = 10*60; //10 minutes 'timeout' essentially
      //   if (seconds == -1) { 
      //     humanReableDate = "undefined";
      //     break;
      //   }
        
      //   if ((seconds <= currenSecondsSince1970) && (Math.abs(seconds-currenSecondsSince1970) <= pastSecondsMargin)) {
      //     //make sure not to recommend times that are far in time..
      //     humanReableDate = 'now';
      //     break;
      //   }
      //   const monthNames = [
      //     "January", "February", "March", "April", "May", "June",
      //     "July", "August", "September", "October", "November", "December"
      //   ];
      //   const now = new Date()
      //   const formattedDate = new Date(0);
      //   formattedDate.setUTCSeconds(seconds);
    
      //   var dayString = ""
      //   if (formattedDate.getDate() == now.getDate()) {
      //     dayString = "Today";
      //   }
      //   else if (formattedDate.getDate() == now.getDate() + 1) {
      //     dayString = "Tomorrow";
      //   }
      //   else {
      //     dayString = "" + monthNames[formattedDate.getMonth()] + ' ' + formattedDate.getDate();
      //   }
      //   var minutes = formattedDate.getMinutes();
      //   if (minutes < 10) {
      //     minutes = '0' + minutes;
      //   }
      //   humanReableDate = dayString + ' at ' + formattedDate.getHours() + ':' + minutes;        
        
      //   jobs[i].hours = durationDate.getHours();
      //   jobs[i].mins = durationDate.getMinutes();        
      // }

      return { allJobs: jobs };
    }
  
  };
  
