const tokenauth = require("../../services/tokenauth");
const viewJobs = require("./view-jobs");

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
      },

      priority: {
        type: 'string',
        required: false,
        description: 'is this file class related, urgent, or standard?'
      }

    },
  
  
    exits: {
  
      success: {
        description: 'New job reservation created successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided details  are invalid.',
        extendedDescription: 'If this was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
      },
  
    },
  
    fn: async function (inputs, exits) {
      if (this.req.header('authorization')) {
        var token = this.req.header('authorization').split('Bearer ')[1]
        if (!token) return exits.invalid();
        
        const userId = await tokenauth.getUserId(token);
        const user = await User.findOne({id: userId});
        sails.log("userId: " + userId);
        if (user) {
          //simply check that the user with the given id exists. Should have a special exit for user does not exist.
          const username = user.firstName + ' ' + user.lastName[0] + '.';
          await PrintJob.create({description: inputs.description, duration: inputs.duration, date: inputs.date, device: inputs.device, user: userId, username: username, priority: inputs.priority});
          
          var printerQueues = await sails.helpers.getVisibleJobs();
          // return printerQueues;
          
          return exits.success(printerQueues); 
        }
      }
      return exits.invalid();
    }
  
  };
  