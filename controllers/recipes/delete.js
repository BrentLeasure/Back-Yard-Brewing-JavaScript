var recipeModel = require("../../models/recipes");
//================
// DELETE RECIPE
//===============
function DeleteRecipe( req, res ) {

	//If user is logged in, remove recipe.
	if ( req.user ) {
		recipeModel.userRecipe.remove( { _id: req.params.id }, function( err ) {
			if ( err ) {
				res.status( 400 ).send( { message: err } );
			} else {
				res.status( 200 ).send( { message: "success!" } );
			}
		})
	} else {
		return res.status( 400 ).send( {	message: "you are not logged in" } );
	}
}

module.exports = { DeleteRecipe }