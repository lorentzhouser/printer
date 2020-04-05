module.exports = {


    friendlyName: 'View all jobs',
  
  
    description: 'Display jobs page.',
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/entrance/reserved-jobs',
      },
  
      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }
  
    },
  
    fn: async function () {
  
      if (!this.req.me) {
        throw {redirect: '/'};
      }

      const jobs = await PrintJob.find().sort('date ASC');
      for (var i = 0; i < jobs.length; i++) {
        const date = new Date(0);
        const duration = new Date(1970, 0, 1);
        date.setUTCSeconds(jobs[i].date);
        duration.setSeconds(jobs[i].duration);
        jobs[i].date = date;
        jobs[i].duration = duration;
      }
     
      return { allJobs: jobs };
  
    }
  
  
  };
  