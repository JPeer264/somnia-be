/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

  getUser: function (req, res) {
    var userId = req.token.id;

    User.findOne({id: userId})
      .populate('projects')
      .then(function (user) {
        //console.log(userId);
        if(user){
          user.project = user.projects.filter(function(project){
            return !project.finishedDate;
          })[0];
          //console.log(user);
          user.project = Project.getProject(user.project.id, function (err, project) {
            //console.log(project);
            if(err) return res.negotiate(err);
            if(project){
              user.project = project;
              //console.log(user);
              return res.json(200,{user:user});
            }else{
              return res.json(400,{msg:'error occured'});
            }
          });
        }
        else{
          return res.json(400,{msg:'error, no user logged in'})
        }

      })

  },

  delete: function(req, res){

    var id = req.param('id');

    if(id == req.token.id){

      User.destroy({id: id})
        .then(function(){
          return res.json(200, {msg: "User with id: " + id + " successfully destroyed!"});
        })
        .fail(function(err){
          console.log('Error while destroying user (UserController):');
          console.log(err);
          return res.negotiate(err);
        });
    }else{
      return res.json(401, {err: 'You are not authorized to delete this Profile'});
    }

  },

  changePassword: function (req,res) {

    var id    = req.token.id,
        newPw = req.param('newPw'),
        oldPw = req.param('oldPw');

    User.findOne({id:id})
      .then(function (user) {
        console.log(user);
        User.comparePassword(oldPw,user,function (err,match) {
          if(err) return res.negotiate(err);
          if(match){

            bcrypt.genSalt(10, function(err, salt){
              bcrypt.hash(newPw, salt, null, function(err, hash){
                if(err){
                  console.log('Error while hashing user password');
                  console.log(err);
                }else{
                  newPw = hash;

                  User.update({id:id}, {password: newPw})
                    .then(function(user){
                        return res.json(200, {msg: 'Userpassword was changed successfully!'})
                    })
                    .fail(function (err) {
                      return res.negotiate(err);
                    });
                }
              });
            });


          }
          else{
            console.log('error');
          }
        });
    })
      .fail(function (err) {

      });
  },

  getSpecificuser: function (req,res) {
    var userId = req.param('id');

    User.findOne({id:userId})
      .then(function (user) {
        if(user){
          return res.json(user.email);
        }
        else{
          return res.json({msg:'User does not exist'});
        }
      })
      .fail(function (err) {
        return res.negotiate(err);
      })
  }

};

