var recipeModel = require("../../models/recipes");
//===================
//CREATE RECIPE
//===================
function PostRecipe( req, res ) {

	var body = req.body;
	var messages = { 'alias' : null, 'description' : null, 'category' : null, 'instructions' : null, 'image' : null };
	var isError = false;

	if ( req.user ) {
		for ( variable in body ) {			
			if ( !body[variable] ) {				
				messages[variable] = "You left the " + variable + " field blank";
				isError = true;
			}

			if ( variable == "instructions" ) {
				if ( body[variable].length < 500 && body[variable] ) {
					messages[variable] = "Your instructions are too short. (you need at least 500 characters)";
					isError = true;
				}
			}
		}

		if ( !isError ) {
			var newRecipe = new recipeModel.userRecipe( req.body );

			newRecipe.save( function( err, data ) {
				if ( err ) {
					res.status( 400 ).send( err );
				} else {
					res.status( 200 ).send( "success!" } );
				}	
			});
		} else {
			for ( var message in messages ) {
				console.log ( 'This is the message: ' +  messages[message] );
			}
			res.status( 400 ).send( messages );
		}
	} else {
		return res.status( 400 ).send( "you are not logged in" );
	}

}

module.exports = { PostRecipe }
