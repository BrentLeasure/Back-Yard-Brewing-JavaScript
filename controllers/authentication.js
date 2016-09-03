var passport = require('passport'), LocalStrategy = require('passport-local').Strategy, userModel = require('../models/user');


var performLogin = function( req, res, user ) {

  //Logs the user in. If error, send it to the front end. Otherwise send new user information.
  req.login( user, function( err ) {
    if ( err) {
      res.status( 400 ).send( { message: err } );
    } else {
      user.password = "none of your damn business";
      res.send(user);
    }
  });

};

//Authentication controller
var authenticationController = {

  processLogin: function(req, res){

    var authenticate =  passport.authenticate('local', function(err, user, info){
      
        if ( err ) {
          res.send( err );
        } else if( !user ) {
          return res.status( 400 ).send( { message: "username or password incorrect" } );
        } else {
          performLogin( req, res, user );
        }

    });
    authenticate( req, res );

  },

  processSignup: function(req, res) {
    
    //Create user and assign passed values to associated object keys.
    var user = new userModel.User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    
    //save user in the database
    user.save( function( err, user ) {
      //Check for error in post.
      if ( err ) {
        //if 11000, it means there is a user that already exists. Otherwise, send error back as message.
        if ( err.code === 11000 ) {
          return res.status( 400 ).send( { message: "Your username/email is already in use" } );
        } else {
          return res.status( 400 ).send( { message: err } );
		    }
        
      } else {
        performLogin( req, res, user );
      }
    });
  },

  
  logout: function( req, res ) {
    
    //Log the user out and return them to the page they were just on.
    req.logout();
    res.redirect('/');

  }

};

// Export our controller methods
module.exports = authenticationController;