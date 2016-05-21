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
  }
};

