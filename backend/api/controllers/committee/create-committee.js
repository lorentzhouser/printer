var fileUpload = require('../file-upload.js'); 

module.exports = {

    friendlyName: 'Create New Committee',
  
    description: 'Create New Committee',
    
    files: ['imageFile'],

    inputs: {
  
        name: {
            type: 'string',
            description: 'Name of committee'
        },

        description: {
            type: 'string',
            description: 'Description of committee',
        },

        imageFile: {
            type: 'ref',
            required: false,
            description: 'Image file',
        },

    },
  
  
    exits: {
  
      success: {
        description: 'New committee created successfully.'
      },

      successWithoutImage: {
          description: 'New committee created successfully. Failed image upload.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided details  are invalid.',
        extendedDescription: 'If this request was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
      },
  
      noRecordings: {
        responseType: 'no recordings',
        description: `You don't have any recording for this event`,
      },
      
      serverError: {
        responseType: 'server error',
        description: `Failed to upload the file`,
      }

    },
  
    fn: async function (inputs, exits) {
        fileUpload.upload(inputs.imageFile, "/images/committee", 10000000)
        .then((imageDirectory) => {
            Committee.create({ name: inputs.name, description: inputs.description, imageURL: imageDirectory })
            .then(() => {
                return exits.success('sucessfully created');
            })
            .catch(() => {
                return exits.serverError('could not create committee');
            });
        })
        .catch((err) => { 
            sails.log.warn('File Upload Fail');
            Committee.create({ name: inputs.name, description: inputs.description, imageURL: '' })
            .then(() => {
                return exits.successWithoutImage('sucessfully created');
            })
            .catch(() => {
                return exits.serverError('could not create committee');
            });  
        })
    },
  };
  