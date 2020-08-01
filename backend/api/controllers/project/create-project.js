module.exports = {

    friendlyName: 'Create New Project',
  
    description: 'Obtain a project identifier for saving images and later updating (PUT) with models fields',

    inputs: {
  
    },

    exits: {
  
      success: {
        description: 'New project created successfully.'
      },

      successWithoutData: {
          description: 'New project created successfully.'
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
        return exits.success(project.id);
    },
  };
  

