module.exports = {


    friendlyName: 'Update user settings',
  
    inputs: {

      committee: {
        type: 'ref',
        required: false,
      },

      graduatingYear: { 
        type: 'number',
        required: false,
      },

      allergies: {
        type: 'string',
        required: false,
      }

    },

    exits: {
      
      success: {
        description: 'New event created successfully.'
      },

      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }

    },
  
    fn: async function (inputs, exits) {

      if (this.req.header('authorization')) {
        var token = this.req.header('authorization').split('Bearer ')[1]
        if (!token) return exits.invalid()
        const userId = await tokenauth.getUserId(token);

        var updateObject = {};
        if (inputs.committee != null) { updateObject.committee = inputs.committee; }
        if (inputs.graduatingYear != null) { updateObject.graduatingYear = inputs.graduatingYear; }
        if (inputs.allergies != null) { updateObject.allergies = inputs.allergies; }
        
        const user = await User.update({id: userId}).set(updateObject).fetch();
        return exits.success(user);
      }
      else {
        return exits.invalid;
      }
          
    }
  
  };
  
