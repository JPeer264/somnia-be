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
    },

    toJSON: function(){
      var obj = this.toObject();
      obj.done = Milestone.milestoneDone(this);
      return obj;
    }
  },

  beforeDestroy: function(criteria, cb){
    Milestone.find(criteria)
      .populate('steps')
      .then(function(milestones){
        milestones.forEach(function(milestone){
          milestone.steps.forEach(function(step){
            Step.destroy({id: step.id})
              .then(function(){})
          });
        });
      })
      .then(function(){
        cb();
      })
      .fail(function(err){
        console.log('Error while destroying Milestones: ');
        console.log(err);
      });
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

