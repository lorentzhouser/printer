module.exports = {

    friendlyName: 'Create New Project',
  
    description: 'Create New Project',

    files: ['imageFile'],

    inputs: {
  
        creator: {
            type: 'string',
            required: false,
            allowNull: true,
            maxLength: 300,
        },

        description: {
            type: 'string',
            allowNull: true,
            required: false,
            description: 'Description of the event',
        },

        projectImages: {
            type: 'ref',
            collection: 'projectimage',
            via: 'project'
        },

        classYear: {
            type: 'string',
            allowNull: true,
            required: false,
            isIn: ['1. klasse', '2. klasse', '3. klasse', '4. klasse','5. klasse'],
            maxLength: 10, 
        },

        course: {
            type: 'string',
            allowNull: true,
            required: false,
            maxLength: 150, 
        },

        imageFile: {
          type: 'ref',
          required: false,
          description: 'Image file',
        },
    },
  
  
    exits: {
  
      success: {
        description: 'New event created successfully.'
      },

      successWithoutData: {
          description: 'New event created successfully. Failed image upload.'
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
        const project = await Project.create({}).fetch();
        return exits.successWithoutData(project.id);
    },
  };
  

