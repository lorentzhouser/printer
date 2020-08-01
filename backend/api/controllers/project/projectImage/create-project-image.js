var fileUpload = require('../../file-upload.js');

module.exports = {

    friendlyName: 'Create New Project Image',
  
    description: 'Create New Project Image',

    files: ['imageFile'],

    inputs: {
  
        name: {
            type: 'string',
            required: false,
            allowNull: true,
            maxLength: 500,
        },

        project: {
            type: 'ref',
            model: 'project'
        },
        
        imageFile: {
            type: 'ref',
            required: true,
            description: 'Image file',
        },

    },
  
  
    exits: {
  
      success: {
        description: 'New project image created successfully.'
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
        statusCode: 500,
        description: "some server error",
      }

    },
  
    fn: async function (inputs, exits) {        
        // if (!inputs.imageFile.files) {
        //   return exits.noRecordings('no file');
        // }

        fileUpload.upload(inputs.imageFile, "/images/projects", 10000000)
        .then((imageDirectory) => {
            ProjectImage.create({ 
                name : inputs.name,
                project : inputs.project,
                imageURL : imageDirectory,
                thumbnailURL : '',
             })
            .then(() => {
                return exits.success();
            })
            .catch((err) => {
                return exits.serverError("Model create failure!");
            });
        })
        .catch((err) => { 
            return exits.serverError("File upload failure!");
        })
    },
  };
  

