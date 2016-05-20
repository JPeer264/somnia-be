/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var JWTService = require('../services/JWTService');

module.exports = {

  register: function(req, res){

    var body = req.allParams();

    if(body.email){

      User.create({email: body.email})
        .then(function(user){
          return res.json(200, {user: user, token: JWTService.issue({id: user.id})});
        })
        .fail(function(err){
          return res.negotiate(err);
        });

    }else{
      return res.json(400, {msg: 'Email required!'});
    }

  },

  login: function(req, res){

    var pw    = req.param('password');
    var email = req.param('email');

    if(pw && email){
      User.findOne({email: email})
        .then(function(user){
          if(!user){
            return res.json(400,{msg:'email or password is not correct'});
          }
          else{
            User.comparePassword(pw,user,function (err, match) {
              if(err){
                return res.negotiate(err);
              }
              else{
                if(match){
                  return res.json(200,{user: user, token: JWTService.issue({id: user.id})});
                }
                else {
                  return res.json(400,{msg:'email or password is not correct'});
                }
              }
            })
          }
        })
    }

  }

};

