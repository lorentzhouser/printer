module.exports = {


    friendlyName: 'Delete Job Reservation',
  
  
    description: 'Remove a specific reservation by id',
  
    inputs: {
      jobId: {
            type: 'number',
            required: true
        }
    },
  
  
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
  
  
    fn: async function (inputs) {
      const record = await PrintJob.destroy({ id: inputs.jobId}).fetch()
      if (record.length == 0) {
        throw({invalid: { error:'job does not exit'}})
      }
      var printerQueues = await sails.helpers.getVisibleJobs();
      return printerQueues;
    }
  
  };
  