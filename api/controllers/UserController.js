/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  delete: function(req, res){

    var id = req.param('id');

    if(id == req.token.id){
      
      User.destroy({id: id})
        .then(function(){
          return res.json(200, {msg: "User with id: " + id + " successfully destroyed!"});
        })
        .fail(function(err){
          console.log('Error while destroying user (UserController):');
          console.log(err);
          return res.negotiate(err);
        });
    }else{
      return res.json(401, {err: 'You are not authorized to delete this Profile'});
    }

  }

};

