/**
 * MilestoneController
 *
 * @description :: Server-side logic for managing Milestones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req,res) {
    var title     = req.param('title'),
        dueDate   = parseInt(req.param('dueDate')),
        projectId = req.param('id'),
        userId    = req.token.id;

    dueDate = sails.moment(dueDate).format('YYYY-MM-DD');

    Project.checkOwnership(userId, projectId, function(err, match){
      if(err){
        return res.negotiate(err);
      }
      if(!match){
        return res.json(401, {err: 'You are not authorized to create milestones for this project!'})
      }else{
        if(title && dueDate){
          Milestone.create({
              title: title,
              dueDate: dueDate,
              owner: req.token.id
            })
            .then(function(milestone){
              return res.json(200, {milestone: milestone});
            })
            .fail(function(err){
              return res.negotiate(err);
            });
        }else{
          return res.json(400, {msg: 'Title and DueDate required!'});
        }
      }
    })




  },

  update: function (req,res) {
    var milestoneId = req.param('id'),
        title       = req.param('title'),
        dueDate     = req.param('dueDate'),
      
        
  },

  delete: function (req,res) {

  },

  get: function (req,res) {

  }

};
