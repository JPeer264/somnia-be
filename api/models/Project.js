/**
 * Project.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var TimeFormatService = require('../services/TimeFormatService');

module.exports = {

  schema: true,

  attributes: {

    title:{
      type: 'string',
      required: true
    },
    dueDate:{
      type: 'date',
      required: true
    },
    finishedDate:{
      type: 'date'
    },
    milestones:{
      collection: 'milestone',
      via: 'project'
    },
    owner:{
      model: 'User'
    },

    toJSON: function(){
      var obj = this.toObject();
      obj.done = Project.isDone(this);
      return obj;
    }
  },

  checkOwnership: function(userId, projectId, cb){

    Project.findOne({
      id: projectId,
      owner: userId
    }).then(function(project){
      if(!project){
        cb(null, false);
      }else{
        cb(null, true);
      }
    }).fail(function(err){
        cb(err, null);
    });

  },

  beforeDestroy: function(criteria, projectCb){

    console.log('Project destroying');

    Project.find(criteria)
      .populate('milestones')
      .then(function(projects){
        projects.forEach(function(project){
          project.milestones.forEach(function(milestone){
            Milestone.destroy({id: milestone.id})
              .then(function(){
              });
          });
        });
      })
      .then(function(){
        projectCb();
      })
      .fail(function(err){
        console.log('Error while deleting project:');
        console.log(err);
      });

  },

  isDone: function(project) {
    return (project.finishedDate) ? true : false;
  },

  getProject: function(projectId, cb){
    var milestones = [];

    Project.findOne({id: projectId})
      .populate('milestones')
      .then(function (project) {

        var msDone = project.milestones.filter(function(ms){
          return Milestone.milestoneDone(ms);
        });

        msDone = msDone.sort(function(a, b){
          return a.finishedDate - b.finishedDate;
        });

        msOpen = project.milestones.filter(function(ms){
          return !Milestone.milestoneDone(ms);
        });

        msOpen = msOpen.sort(function(a,b){
          return a.dueDate - b.dueDate;
        });

        project.milestones = msDone.concat(msOpen);

        project.milestones.forEach(function (milestone) {
          milestones.push(milestone.id);
        });
        return [project, milestones];
      })
      .spread(function (project, milestones) {
        Step.find({milestone: milestones})
          .then(function (steps) {
            project.milestones.forEach(function(milestone){

              milestone.step = steps.filter(function(step){
                return step.milestone == milestone.id;
              });
            });
            project.done = Project.isDone(project);
            cb(null, project);
          })
      })
      .fail(function (err) {
        cb(err,null);
      });
  }
};

