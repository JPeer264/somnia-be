/**
 * StepController
 *
 * @description :: Server-side logic for managing Steps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {
    var title = req.param('title'),
        milestoneId = req.param('milestoneId'),
        userId = req.token.id;

    Milestone.checkOwnership(userId, milestoneId, function (err, isOwner) {
      if (err) {
        return res.negotiate(err);
      }
      if (!isOwner) {
        return res.json(401, {err: 'You are not authorized to create steps for this milestone!'})
      } else {
        if (title) {
          Step.create({
              title: title,
              milestone: milestoneId
            })
            .then(function (step) {
              return res.json(200, {step: step});
            })
            .fail(function (err) {
              return res.negotiate(err);
            });
        } else {
          return res.json(400, {msg: 'Title required!'});
        }
      }
    })


  },

  update: function (req, res) {
    var stepId = req.param('id'),
        userId = req.token.id,
        body   = req.allParams();

    Step.checkOwnership(userId, stepId, function (err, isOwner) {
      if (err) return res.negotiate(err);

      if (isOwner) {
        Step.update({id: stepId}, body)
          .then(function (step) {
            console.log(step);
            return res.json(200, {step: step[0]});
          })
          .fail(function (err) {
            return res.negotiate(err);
          });
      } else {
        return res.json(401, {err: 'You are not authorized to update this step'});

      }
    });
  },

  delete: function (req, res) {
    var stepId = req.param('id'),
        userId = req.token.id;

    Step.checkOwnership(userId, stepId, function (err, isOwner) {
      if (err) return res.negotiate(err);

      if (isOwner) {
        Step.destroy({id: stepId})
          .then(function () {
            return res.json(200, {msg: 'Step successfully destroyed'});
          })
          .fail(function (err) {
            return res.negotiate(err);
          });
      } else {
        return res.json(401, {err: 'You are not authorized to update this step'});
      }
    });
  },

  get: function (req, res) {
    var id = req.param('id');

    Step.findOne({id: id})
      .then(function(step){
        return res.json(200, {step: step});
      })
      .fail(function(err){
        return res.negotiate(err);
      });
  }
};

