/**
 * User.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs'),
  EmailService = require('../services/EmailService');

module.exports = {

  schema: true,

  attributes: {

    email:{
      type: 'email',
      unique: true,
      required: true
    },

    password:{
      type: 'string',
      required: true,
      defaultsTo: function(){
        return User.generatePassword();
      }
    },

    projects:{
      collection: 'project',
      via: 'owner'
    },

    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  beforeCreate: function(user, cb){

    EmailService.sendPasswordEmail(user.email, user.password);

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

  beforeDestroy: function(criteria, cb){
    console.log('User destroying');
    User.find(criteria)
      .populate('projects')
      .then(function(users){
        users.forEach(function(user){
          user.projects.forEach(function(project){
            Project.destroy({id: project.id})
              .then(function(){
                cb();
              });
          });
        });
      })
      .fail(function(err){
        console.log("Error while destroying ");
        console.log(err);
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
  },

  generatePassword: function(){

    var size = 8;

    var result = '';
    var chars = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ!?#*+-.:;,";

    for (var i = size; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

    return result;

  }

};

