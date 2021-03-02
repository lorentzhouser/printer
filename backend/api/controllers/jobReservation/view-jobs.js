module.exports = {


    friendlyName: 'View all relevant jobs',
  
    description: 'Display jobs page.',
  
    exits: {
		
      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }
  
    },
  
    fn: async function () {
  
      var printerQueues = await sails.helpers.getVisibleJobs();
      return printerQueues;

    }
      
  };
  
