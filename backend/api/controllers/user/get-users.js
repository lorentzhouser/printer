module.exports = {


    friendlyName: 'View all users',
  
    exits: {
  
      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }
  
    },
  
    fn: async function () {

        const users = await User.find()
          .populate('projects')
          .populate('event_registrations')
          .populate('waiting_lists')
          .populate('committee');
        console.log(users.length);
        return users;
        
    }
  
  };
  
