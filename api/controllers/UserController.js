/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getUser: function (req, res) {
    var userId = req.token.id;

    User.findOne({id: userId})
      .populate('projects')
      .then(function (user) {
        user.project = user.projects.filter(function(project){
          return !project.finishedDate;
        })[0];
        user.project = Project.getProject(user.project.id, function (err, project) {
          console.log(project);
          if(err) return res.negotiate(err);
          if(project){
            user.project = project;
            console.log(user);
            return res.json(200,{user:user});
          }else{
            return res.json(400,{msg:'error occured'});
          }
        });
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

  }

};

