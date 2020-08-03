// services/tokenauth.js

var jwt = require('jsonwebtoken');
// const User = require('../models/User');
const JWT_KEY ="somesecretivemessagethatshou1dbemoresecret";

var tokenauth = {

  generateToken: function(payload) {
    console.log(payload);
    return jwt.sign(payload, JWT_KEY);
  },

  verifyToken: function(token, cb) {
    return jwt.verify(token, JWT_KEY, cb);
  },

  getUserId: function(token) {
    return new Promise((resolve, reject) => {
      tokenauth.verifyToken(token, function(err, data) {
        if(err) {
          return reject(null);
        }
        else {       
          return resolve(data.userId);
        }
      });
    });
  }
};


module.exports = tokenauth;