/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {

    'email':{
      type: 'email',
      unique: true,
      required: true
    },

    'password':{
      type: 'string',
      required: true
    },

    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  beforeCreate: function(user, cb){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err){
          console.log('Error while hashing user password');
          console.log(err);
        }else{
          user.password = hash;
        }
        cb();
      });
    });
  },

  comparePassword: function(password, user, cb){
    bcrypt.compare(password, user.password, function(err, match){
      if(err){
        cb(err);
      }else{
        if(match){
          cb(null, true);
        }else{
          cb(null, false);
        }
      }
    });
  }

};

