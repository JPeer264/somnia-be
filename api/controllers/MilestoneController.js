/**
 * MilestoneController
 *
 * @description :: Server-side logic for managing Milestones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {
    var title = req.param('title'),
        dueDate = parseInt(req.param('dueDate')),
        projectId = req.param('projectId'),
        userId = req.token.id;

    dueDate = sails.moment(dueDate).format('YYYY-MM-DD');

    Project.checkOwnership(userId, projectId, function (err, isOwner) {
      if (err) {
        return res.negotiate(err);
      }
      if (!isOwner) {
        return res.json(401, {err: 'You are not authorized to create milestones for this project!'})
      } else {
        if (title && dueDate) {
          Milestone.create({
              title: title,
              dueDate: dueDate,
              project: projectId
            })
            .then(function (milestone) {
              return res.json(200, {milestone: milestone});
            })
            .fail(function (err) {
              return res.negotiate(err);
            });
        } else {
          return res.json(400, {msg: 'Title and DueDate required!'});
        }
      }
    })


  },

  update: function (req, res) {
    var milestoneId = req.param('id'),
        userId      = req.token.id,
        body        = req.allParams();

    if (body.dueDate) {
      body.dueDate = sails.moment(parseInt(body.dueDate)).format('YYYY-MM-DD');
    }

    if(body.finishedDate){
      body.finishedDate = sails.moment(parseInt(body.finishedDate)).format('YYYY-MM-DD');
    }

    Milestone.checkOwnership(userId, milestoneId, function (err, isOwner) {
      if (err) return res.negotiate(err);

      if (isOwner) {
        Milestone.update({id: milestoneId}, body)
          .then(function (milestone) {

            //check if updated milestone was "last" one to finish
            Milestone.find({
              project : milestone.project
            }).then(function(milestones){
              var open = milestones.filter(function(milestone){
                return !milestone.finishedDate;
              });
              console.log(open);

              if(!open){
                return res.json(200, {milestone: milestone[0], last: true})
              }else{
                return res.json(200, {milestone: milestone[0], last: false});

              }
            });
          })
          .fail(function (err) {
            return res.negotiate(err);
          });
      } else {
        return res.json(401, {err: 'You are not authorized to update this milestone'});

      }
    });
  },

  delete: function (req, res) {
    var milestoneId = req.param('id'),
        userId = req.token.id;

      Milestone.checkOwnership(userId, milestoneId, function (err, isOwner) {
        if (err) return res.negotiate(err);

        if (isOwner) {
          Milestone.destroy({id: milestoneId})
            .then(function () {
              return res.json(200, {msg: 'Milestone successfully destroyed'});
            })
            .fail(function (err) {
              return res.negotiate(err);
            });
        } else {
          return res.json(401, {err: 'You are not authorized to update this milestone'});
        }
      });
    },

    get: function (req, res) {
      var id = req.param('id');

      Milestone.findOne({id: id})
        .populate('steps')
        .then(function(milestone){
          milestone.done = Milestone.milestoneDone(milestone);
          return res.json(200, {milestone: milestone});
        })
        .fail(function(err){
          return res.negotiate(err);
        });
    }

  };

