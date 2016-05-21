/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var JWTService = require('../services/JWTService'),
    TimeFormatService = require('../services/TimeFormatService');

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

  registerAll: function(req, res){
    try {
      var user = JSON.parse(req.param('user'));

      console.log(user);

      if(user.email){

        User.create({email: user.email})
          .then(function(newUser){
            var project = user.project;
            project.dueDate = TimeFormatService.toDateString(project.dueDate);

            project.milestones.forEach(function(milestone){
              milestone.dueDate = TimeFormatService.toDateString(milestone.dueDate);
            });

            project.owner = newUser.id;

            Project.create(project)
              .then(function(newProject){

                Milestone.find({project: newProject.id})
                  .then(function(milestones){
                    return res.json(200, {
                      user: newUser,
                      project: newProject,
                      milestones: milestones,
                      token: JWTService.issue({id: newUser.id})
                    });
                  })
                  .fail(function(err){
                    return res.negotiate(err);
                  });

              })
              .fail(function(err){
                //delete User -> cascade delete
                User.destroy({id: newUser.id})
                  .then(function(){});
                return res.negotiate(err);
              });
          })
          .fail(function(err){
            return res.negotiate(err);
          });

      }else{
        return res.json(400, {msg: 'Email required!'});
      }

    }catch(err){
      console.log('exception:');
      console.error(err.message);
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

