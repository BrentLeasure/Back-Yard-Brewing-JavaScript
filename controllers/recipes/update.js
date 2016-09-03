var recipeModel = require("../../models/recipes");
//================
// UPDATE RECIPE
//===============
function UpdateRecipe( req, res ) {
	//If user is logged in, run this. Otherwise send error telling them they are not logged in.
	if ( req.user ) {
		//if logged in, update the user's reqipe
		recipeModel.userRecipe.update( {_id: req.body._id}, req.body, function(err){
			if ( err ) {
				res.status( 400 ).send( { message: err } );
			} else {
				res.status( 200 ).send( { message: "success!" } );
			}
		});

	} else {
		return res.status( 400 ).send( { message: "you are not logged in" } );
	} 
}


module.exports =  { UpdateRecipe }

