/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var TimeFormatService = require('../services/TimeFormatService');

module.exports = {

  create: function (req, res) {
    var title = req.param('title'),
      dueDate = parseInt(req.param('dueDate'));

    dueDate = sails.moment(dueDate).format('YYYY-MM-DD');

    if (title && dueDate) {
      Project.create({
          title: title,
          dueDate: dueDate,
          owner: req.token.id
        })
        .then(function (project) {
          return res.json(200, {project: project});
        })
        .fail(function (err) {
          return res.negotiate(err);
        });
    } else {
      return res.json(400, {msg: 'Title and DueDate required!'});
    }


  },

  update: function (req, res) {

    var projectId = req.param('id'),
      userId = req.token.id,
      body = req.body;

    if (body.dueDate) {
      body.dueDate = TimeFormatService.toDateString(body.dueDate);
    }
    if (body.finishedDate) {
      body.finishedDate = TimeFormatService.toDateString(body.finishedDate);
    }

    Project.checkOwnership(userId, projectId, function (err, isOwner) {
      if (err) return res.negotiate(err);

      if (isOwner) {
        Project.update({id: projectId}, body)
          .then(function (project) {
            return res.json(200, {project: project[0]});
          })
          .fail(function (err) {
            return res.negotiate(err);
          });
      } else {
        return res.json(401, {err: 'You are not authorized to update this project'});
      }
    });
  },

  delete: function (req, res) {

    var projectId = req.param('id'),
      userId = req.token.id;

    Project.checkOwnership(userId, projectId, function (err, isOwner) {
      if (err) return res.negotiate(err);

      if (isOwner) {
        Project.destroy({id: projectId})
          .then(function () {
            return res.json(200, {msg: 'Project successfully destroyed'});
          })
          .fail(function (err) {
            return res.negotiate(err);
          });
      } else {
        return res.json(401, {err: 'You are not authorized to update this project'});
      }
    });

  },

  get: function (req, res) {

    var id = req.param('id');
    var milestones = [];

    Project.findOne({id: id})
      .populate('milestones')
      .then(function (project) {
        project.milestones.forEach(function (milestone) {
          milestones.push(milestone.id);
        });
        return [project, milestones];
      })
      .spread(function (project, milestones) {
        Step.find({milestone: milestones})
          .then(function (steps) {
            project.steps = steps;
            project.done = Project.isDone(project);
            return res.json(200, {project: project});
          })
      })
      .fail(function (err) {
        return res.negotiate(err);
      });

  },

  getLatestProjects: function (req, res) {
    Project.find({limit: 6, sort: 'createdAt ASC'})
      .populate('milestones')
      .then(function (projects) {
        return res.json(projects);
        })
      .fail(function (err) {
        return res.negotiate(err);
      })
  }

};

