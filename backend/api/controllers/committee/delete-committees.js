module.exports = {


    friendlyName: 'Delete Committee',
  
  
    description: 'Only for testing',
  
    exits: {
  
      success: {
        description: 'Committees deleted successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided details  are invalid.',
        extendedDescription: 'The object you are trying to delete does not exist'
      },
  
    },
  
  
    fn: async function (inputs) {
        const records = await Committee.destroy({}).fetch();
        if (records.length == 0) {
            throw({invalid: { error:'committees do not exit'}})
        }
        return records;
    }
  
  };
  