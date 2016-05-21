/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

  create: function (req,res) {
    var title   = req.param('title'),
        dueDate = parseInt(req.param('dueDate'));

    dueDate = sails.moment(dueDate).format('YYYY-MM-DD');

    if(title && dueDate){
      Project.create({
        title: title,
        dueDate: dueDate,
        owner: req.token.id
      })
        .then(function(project){
          return res.json(200, {project: project});
        })
        .fail(function(err){
          return res.negotiate(err);
        });
    }else{
      return res.json(400, {msg: 'Title and DueDate required!'});
    }


  },

  update: function (req,res) {

    var projectId = req.param('id'),
        userId    = req.token.id,
        body      = req.body;

    if(body.dueDate){
      body.dueDate = sails.moment(parseInt(body.dueDate)).format('YYYY-MM-DD');
    }

    Project.checkOwnership(userId, projectId, function(err, isOwner){
      if(err) return res.negotiate(err);

      if(isOwner){
        Project.update({id: projectId}, body)
          .then(function(project){
            return res.json(200, {project: project});
          })
          .fail(function(err){
            return res.negotiate(err);
          });
      }else{
        return res.json(401, {err:'You are not authorized to update this project'});
      }


    });


  },

  delete: function (req,res) {

  },

  get: function (req,res) {

  }

};

