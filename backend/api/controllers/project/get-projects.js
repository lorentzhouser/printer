const { inputs } = require("./create-project");

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
        // // doesn't really work because deleting projects that are in the process.
        // // but maybe if the user must be same as creator?

        const projects = await Project.find().populate('images');
        const projectsWithImage = projects.filter(project => {
          return project.images.length > 0;
        });
        return { projects: projectsWithImage };
        
    }
  
  };
  
