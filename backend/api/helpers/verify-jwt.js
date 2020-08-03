var jwt = require('jsonwebtoken')
const tokenauth = require('../services/tokenauth')

module.exports = {
  friendlyName: 'Verify JWT',
  description: 'Verify a JWT token.',
  inputs: {
    req: {
      type: 'ref',
      friendlyName: 'Request',
      description: 'A reference to the request object (req).',
      required: true
    },
    res: {
      type: 'ref',
      friendlyName: 'Response',
      description: 'A reference to the response object (res).',
      required: false
    }
  },
  exits: {
    invalid: {
      description: 'Invalid token or no authentication present.',
    }
  },
  fn: function (inputs, exits) {
    var req = inputs.req
    var res = inputs.res
    if (req.header('authorization')) {
      // if one exists, attempt to get the header data
      var token = req.header('authorization').split('Bearer ')[1]
      // if there's nothing after "Bearer", no go
      if (!token) return exits.invalid()
      // if there is something, attempt to parse it as a JWT token
      
      return tokenauth.verifyToken(token, function(err, data) {
        if (err != null) { return exits.invalid(); }
        else { return exits.success(); }
      });

    }
    else {
      return exits.invalid();
    }
  }
}

// tokenauth.getUser(token, function(err, user) {
//   if (err != null) {
//     return exits.invalid();
//   }
//   else {
//     return exits.success(user);
//   }
// });