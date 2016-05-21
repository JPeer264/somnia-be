/**
 * Milestone.js
 *
 * @description :: 
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
    steps:{
      collection: 'step',
      via: 'milestone'
    },
    project:{
      model: 'Project'
    }
  },

  milestoneDone: function(milestone){
    return (milestone.finishedDate) ? true : false;
  },

  checkOwnership: function (userId, milestoneId, cb) {

    Milestone.findOne({id: milestoneId})
      .then(function (milestone) {
        if(!milestone) cb(null,false);
        else{
          Project.checkOwnership(userId, milestone.project, function (err, isOwner) {
            if(err) cb(err,null);
            if(isOwner){
              cb(null,true);
            }else{
              cb(null,false);
            }
          })
        }
      })
  }
};

