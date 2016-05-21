/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //todo: getUser with token
  
  //Seamless Register
  'POST /api/registerAll'                         : 'AuthController.registerAll',

  //Auth
  'POST /api/register'                      : 'AuthController.register',
  'POST /api/login'                         : 'AuthController.login',

  //Project
  'POST /api/project'                       : 'ProjectController.create',
  'PUT /api/project/:id'                    : 'ProjectController.update',
  'DELETE /api/project/:id'                 : 'ProjectController.delete',
  'GET /api/project/:id'                    : 'ProjectController.get',

  //Milestones
  'POST /api/project/:projectId/milestone'  : 'MilestoneController.create',
  'PUT /api/milestone/:id'                  : 'MilestoneController.update',
  'DELETE /api/milestone/:id'               : 'MilestoneController.delete',
  'GET /api/milestone/:id'                  : 'MilestoneController.get',

  //Milestones
  'POST /api/milestone/:milestoneId/step'   : 'StepController.create',
  'PUT /api/step/:id'                       : 'StepController.update',
  'DELETE /api/step/:id'                    : 'StepController.delete',
  'GET /api/step/:id'                       : 'StepController.get',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
