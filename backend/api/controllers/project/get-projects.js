module.exports = {


    friendlyName: 'View all projects',
  
  
    description: 'Provide all projects page.',
  
    exits: {
  
      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }
  
    },
  
    fn: async function () {

        const projects = await Project.find().populate('images');
        return { projects: projects };
        
    }
  
  };
  
