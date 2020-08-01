module.exports = {


    friendlyName: 'Delete Project by ID',
  
  
    description: 'Delete Project by ID. Common use in quit create',
  
    inputs: {
        id: {
          type: 'string',
          required: true,
        }
    },

    exits: {
  
      success: {
        description: 'Project deleted successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided details  are invalid.',
        extendedDescription: 'The object you are trying to delete does not exist'
      },
  
    },
    
    fn: async function (inputs, exits) {
        const record = await Project.destroy({id: inputs.id}).fetch();
        if (record.length == 0) {
            return exits.invalid();
        }
        return exits.success(record);
    }
  
  };
  