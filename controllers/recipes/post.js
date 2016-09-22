var recipeModel = require("../../models/recipes");
//===================
//CREATE RECIPE
//===================
function PostRecipe( req, res ) {

	var body = req.body;
	var messages = { 'alias' : null, 'description' : null, 'category' : null, 'instructions' : null };

	if ( req.user ) {
		for ( variable in body ) {			
			if ( !body[variable] ) {				
				console.log(variable);
				messages[variable] = "You left the " + variable + " field blank";
			}

			if ( variable == "instructions" ) {
				if ( body[variable].length < 500 && body[variable] ) {
					messages[variable] = "Your instructions are too short. (you need at least 500 characters)";
				}
			}
		}

		if (  messages.alias != null || messages.description != null || messages.category != null || messages.instructions != null ) {
			var newRecipe = new recipeModel.userRecipe( req.body );
			newRecipe.save( function( err, data ) {
				if ( err ) {
					res.status( 400 ).send( { message: err } );
				} else {
					res.status( 200 ).send( { message: "success!" } );
				}	
			})
		} else {
			res.status( 400 ).send( messages );
		}
	} else {
		return res.status( 400 ).send( { message: "you are not logged in" } );
	}

}

module.exports = { PostRecipe }
