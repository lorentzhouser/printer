module.exports = {


    friendlyName: 'View all events',
  
  
    description: 'Provide all events page.',
  
    exits: {
  
      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }
  
    },
  
    fn: async function () {

        const events = await Event.find();
        events.forEach(event => {
          //do some cropping and processing here
          // npm install sails-service-image
          event.thumbnailURL = event.imageURL;
        });
        return { events: events };
        
    }
  
  };
  
