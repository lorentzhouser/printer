module.exports = {


    friendlyName: 'Delete Events',
  
  
    description: 'Only for testing',
  
    exits: {
  
      success: {
        description: 'Events deleted successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided details  are invalid.',
        extendedDescription: 'The object you are trying to delete does not exist'
      },
  
    },
  
  
    fn: async function (inputs) {
        const records = await Event.destroy({}).fetch();
        if (records.length == 0) {
            throw({invalid: { error:'events do not exit'}})
        }
        return records;
    }
  
  };
  