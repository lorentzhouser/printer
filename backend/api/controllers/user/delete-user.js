module.exports = {

    friendlyName: 'Delete user by id',
  
    inputs: {
      id: {
        type: 'number',
        required: true
      }
    },

    exits: {
  
      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }
  
    },
  
    fn: async function (inputs) {

        const user = await User.destroy({id: inputs.id}).fetch();
        return user;
        
    }
  
  };
  
