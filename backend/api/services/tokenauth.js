// services/tokenauth.js

var jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_KEY ="somesecretivemessagethatshou1dbemoresecret";

var tokenauth = {

  generateToken: function(payload) {
    console.log(payload);
    return jwt.sign(payload, JWT_KEY);
  },

  verifyToken: function(token, cb) {
    return jwt.verify(token, JWT_KEY, cb);
  },

  getUser: function(token, cb) {
    tokenauth.verifyToken(token, function(err, data) {
      if(err) {
        console.log(err);
        return cb(err, {}); 
      }
      else {
        console.log(data);
        return cb(null, {});
      }
    });
  }
};


module.exports = tokenauth;