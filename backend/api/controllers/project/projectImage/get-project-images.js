module.exports = {


    friendlyName: 'View all project images',
  
    exits: {
  
      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }
  
    },
  
    fn: async function () {

        const projectImages = await ProjectImage.find();
        //serve up correct size images
        projectImages.forEach(image => {
          image.thumbnailURL = image.imageURL;
        });
        return { projectImages: projectImages };
        
    }
  
  };
  
