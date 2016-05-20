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

  }

};

