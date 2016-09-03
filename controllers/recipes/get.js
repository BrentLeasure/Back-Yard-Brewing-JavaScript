var recipeModel = require("../../models/recipes");

//================
// GET ALL RECIPES IN SELECTED CATEGORY
//================
function GetByBeerType( req, res ) {
	
	recipeModel.userRecipe.find({selectedCategory: req.params.beerAlias}, function( err, recipes ) {
	
		if ( err ) {
			res.send( err );
		} else { 
			res.send( recipes );	
		}
		
	})

}


//================
// GET MULTIPLE RECIPES
//===============
function GetUserRecipes( req, res ) {
 	
 	recipeModel.userRecipe.find( { userID: req.params._id }, function( err, userRecipes ) {
		if ( err ) {
			res.send( err );
		} else {
			res.send( userRecipes );
		}
	})

}

//================
// GET SINGLE RECIPE
//===============
function GetUserRecipe( req, res ) {
	
	recipeModel.userRecipe.findOne( { _id: req.params._id }, function( err, userRecipe ) {
		if ( err ) {
			res.send( err );
		} else if ( !userRecipe ) {
			return res.status( 404 ).send( { message: "The recipe you are looking for is not here." } );
		} else {
			res.send ( userRecipe );
		}
	})

}


//================
// GETS BEER TYPES
//===============
function GetAllBeerTypes( req, res ) {

	recipeModel.beerTypes.find( {}, function( err, beers ) {
		if ( err) {
			res.send( err );
		} else {
			res.send( beers );
		}
		
	});

}

module.exports = {
	GetByBeerType   : GetByBeerType,
	GetUserRecipes	: GetUserRecipes,
	GetUserRecipe 	: GetUserRecipe,
	GetAllBeerTypes : GetAllBeerTypes,
}