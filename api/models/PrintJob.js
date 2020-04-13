/**
 * PrintJob.js
 *
 * A user who can log in to this application.
 */

module.exports = {

    attributes: {
  
      user: {
        model: 'user',
        required: true,
        unique: false,
        example: '1'
      },

      username: {
        type: 'string',
        required: true,
        description: 'Full name of user'
      },
  
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
        required: false,
        description: 'specific printer or laser'
      },

      class: {
        type: 'boolean',
        required: false,
        description: 'is this file class related?'
      }
    },
  
  };
  