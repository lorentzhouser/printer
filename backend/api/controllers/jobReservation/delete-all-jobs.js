module.exports = {


    friendlyName: 'Delete Job Reservations',
  
  
    description: 'Remove all jobs',
  
    
  
  
    exits: {
  
      success: {
        description: 'Job reservation deleted successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided details  are invalid.',
        extendedDescription: 'The object you are trying to delete does not exist'
      },
  
    },
  
  
    fn: async function () {
      const records = await PrintJob.destroy({}).fetch();
      if (records.length == 0) {
        throw({invalid: { error:'job does not exit'}})
      }
      return records;
    }
  
  };
  