/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
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


  }
};

