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

    dueDate:{
      type: 'date',
      required: true
    },

    finishedDate:{
      type: 'date'
    },

    milestone:{
      model: 'Milestone'
    }

  }
};

