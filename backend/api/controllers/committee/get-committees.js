module.exports = {


    friendlyName: 'View all committees',
  
  
    description: 'Provide all committees page.',
  
    exits: {
  
      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }
  
    },
  
    fn: async function () {
        
        const committees = await Committee.find();
        
        return { committees: committees };
    }
  
  };
  
