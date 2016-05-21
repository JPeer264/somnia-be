/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

  create: function (req,res) {
    var title   = req.param('title'),
        dueDate = req.param('dueDate');

    dueDate = sails.moment(dueDate).toISOString();

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

  },

  delete: function (req,res) {

  },

  get: function (req,res) {

  }

};

