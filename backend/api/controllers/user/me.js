const tokenauth = require("../../services/tokenauth");

module.exports = {
    friendlyName: 'Me',
    description: 'Get my profile',
    
    exits: {
        success: {
            description: 'User details aquired successfully.'
        },
        invalid: {
            description: 'Invalid token or no authentication present.',
        }
    },
    fn: async function (exits) {
        if (this.req.header('authorization')) {
            // if one exists, attempt to get the header data
            var token = this.req.header('authorization').split('Bearer ')[1]
            // if there's nothing after "Bearer", no go
            if (!token) return exits.invalid()
            // if there is something, attempt to parse it as a JWT token
            
            const userId = await tokenauth.getUserId(token);
    
            const user = await User.findOne({id: userId})
                .populate('projects')
                .populate('event_registrations')
                .populate('waiting_lists')
                .populate('committee')
            
            if (user) {
                return user;
            }
            else {
                return exits.invalid;      
            }
        }
        else {
            return exits.invalid;
        }
    }
}