/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {


  //todo: configure real email service
  /*sails.config.email.auth.user = 'somnia.noreply@gmail.com';
  sails.config.email.auth.pass = '!gmail#Somn1a';
  sails.config.email.from = 'somnia@noreply.com';
  sails.config.email.testMode = false;*/
  sails.config.email.templateDir = sails.config.appPath+'/views/email/';
  
  console.log(sails.config.email);

  sails.moment = require('moment');


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
