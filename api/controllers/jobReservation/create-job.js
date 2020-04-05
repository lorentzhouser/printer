module.exports = {


    friendlyName: 'Create Job Reservation',
  
  
    description: 'Reservation for print jobs and laser cutter',

    //needs to implement validation of request and alert user if spot has been taken while waiting to reserve.
  
    inputs: {
  
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
        required: true,
        description: 'specific printer or laser'
      }
    },
  
  
    exits: {
  
      success: {
        description: 'New job reservation created successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided details  are invalid.',
        extendedDescription: 'If this request was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
      },
  
    },
  
    fn: async function (inputs) {
      const userId = this.req.session.userId
      const username = this.req.me.fullName
      creation = await PrintJob.create({description: inputs.description, duration: inputs.duration, date: inputs.date, device: inputs.device, user: userId, username: username})
      this.res.redirect('/job-reservations')
    }
  
  };
  