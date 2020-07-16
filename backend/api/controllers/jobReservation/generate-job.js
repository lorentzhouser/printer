module.exports = {


    friendlypName: 'Generate Job for Testing',
  
  
    description: 'Creates jobs within 24 hours from now based on existing jobs. Attempts to avoid overlap of jobs',
    exits: {
  
      success: {
        description: 'New job reservation generated successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided details  are invalid.',
        extendedDescription: 'If this request was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
      },
  
    },
  
  
    fn: async function () {
        const jobs = await PrintJob.find().sort('date ASC');
        var printerDevice = 1;
        const description = "generated description";
        const dateNow = new Date();
        const dateNowSeconds = Math.floor(dateNow.getTime() / 1000);
        
        const dayInSeconds = 86400;
        const hourInSeconds = 3600;
        var generatedDate = dateNowSeconds + 2*hourInSeconds;
        if (jobs.length > 0) {
            generatedDate = jobs[jobs.length-1].date + 3*hourInSeconds;
        }

        const simpleHours = hourInSeconds;
        
        // if (jobs.length > 7) {
        //     printerDevice = Math.floor((Math.random()*4))+1;
        // }
        // else if (jobs.length > 2) {
        //     printerDevice = Math.floor((Math.random()*3))+2;
        // }
        printerDevice = 1;

        const userId = this.req.session.userId
        const username = this.req.me.fullName
        creation = await PrintJob.create({description: description, duration: simpleHours, date: generatedDate, device: printerDevice, user: userId, username: username})
        this.res.redirect('/job-reservations')
    }
  
  };
  