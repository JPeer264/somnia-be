/**
 * Step.js
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
      milestone:{
        model: 'Milestone'
      }
  },

  checkOwnership: function (userId, stepId, cb) {

    Step.findOne({id: stepId})
      .then(function (step) {
        if(!step) cb(null,false);
        else{
          Milestone.checkOwnership(userId, step.milestone, function (err, isOwner) {
            if(err) cb(err,null);
            else if(isOwner){
              cb(null,true);
            }else{
              cb(null,false);
            }
          })
        }
      })
  }
};

