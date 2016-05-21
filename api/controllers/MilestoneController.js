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
              owner: req.token.id
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
        projectId   = req.param('projectId'),
        userId      = req.token.id,
        body        = req.allParams();

    if (body.dueDate) {
      body.dueDate = sails.moment(parseInt(body.dueDate)).format('YYYY-MM-DD');
    }

    Project.checkOwnership(userId, projectId, function (err, isOwner) {
      if (err) return res.negotiate(err);

      if (isOwner) {
        Milestone.update({id: milestoneId}, body)
          .then(function (milestone) {
            console.log(milestone);
            return res.json(200, {milestone: milestone[0]});
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
        projectId   = req.param('projectId'),
        userId = req.token.id;

      Project.checkOwnership(userId, projectId, function (err, isOwner) {
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
        .then(function(milestone){
          //todo: populate with steps
          milestone.done = Milestone.milestoneDone(milestone);
          return res.json(200, {milestone: milestone});
        })
        .fail(function(err){
          return res.negotiate(err);
        });
    }

  };

