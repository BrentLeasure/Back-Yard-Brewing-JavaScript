var recipeModel = require("../models/recipes");



//================
// GET ALL RECIPES IN SELECTED CATEGORY
//================
getRecipes = function(req, res){
	recipeModel.userRecipe.find({selectedCategory: req.params.beerAlias}, function(err, recipes){
		if(err){
			res.send(err);
		}else{ 
			res.send(recipes);	
		}
		
	})
}


//================
// GET MULTIPLE RECIPES
//===============
getUserRecipes = function(req, res){
 	recipeModel.userRecipe.find({userID: req.params._id}, function(err, userRecipes){
		if(err){
			res.send(err);
		}else{
			res.send(userRecipes);
		}
	})
}

//================
// GET SINGLE RECIPE
//===============
getUserRecipe = function(req, res){
	recipeModel.userRecipe.findOne({_id: req.params._id}, function(err, userRecipe){
		if(err){
			res.send(err);
		}else if(!userRecipe){
			return res.status(404).send({message: "The recipe you are looking for is not here."});
		}else{
			res.send(userRecipe);
		}
	})
}


//================
// GETS BEER TYPES
//===============
getAllBeerTypes = function(req, res){
	recipeModel.beerTypes.find({}, function(err, beers){
		if(err){
			res.send(err);
		}else{
			res.send(beers);
		}
		
	});
}

//===================
//CREATE RECIPE
//===================
createRecipe = function(req, res){
	//creating variables
	var nullVariable;
	var body = req.body

	// if(req.file === undefined){
	// 	return res.status(400).send({
 //   			message: "You need to include a picture!"
	// 	});
	// }else{
	// 	req.body.image = req.file;
	// }

	if(req.user){

		for(variable in body){
			if(body[variable] === null){

				//if any of the variables are null, sent back with name of null variable.
				nullVariable = variable;
				return res.status(400).send({message: "You left the" + nullVariable + "field blank"});
			}

			if(variable == "instructions"){
				//if on instructions, check if length is over 500 characters.
				if(body[variable].length < 500){
					//if under 500 characters, send and error back.
					return res.status(400).send({message: "Your instructions are too short. (you need at least 500 characters)"});
				}
			}
		}

		//if it passes all the requirements, then it is pushed to the server.
		var newRecipe = new recipeModel.userRecipe(req.body);
		newRecipe.save(function(err, data){
			if(err){
				res.status(400).send({message: err});
			}else{
				res.status(200).send({message: "success!"});
			}	
		})
	}else{
		return res.status(403).send({message: "you are not logged in"});
	}
}

//================
// UPDATE RECIPE
//===============
updateRecipe = function(req, res){
	var err;
	if(req.user){
		//if logged in, update the user's reqipe
		recipeModel.userRecipe.update({_id: req.body._id}, req.body, function(err){
			if(err){
				res.status(400).send({message: err});
			}else{
				res.status(200).send({
					message: "success!"
				});
			}
		});

	}else{
		return res.status(400).send({
			message: "you are not logged in"
		});
	} 
}


//================
// DELETE RECIPE
//===============
deleteRecipe = function(req, res){
	if(req.user){
		recipeModel.userRecipe.remove({_id: req.params.id}, function(err){
			if(err){
				res.status(400).send({
					message: err
				});
			}else{
				res.status(200).send({
					message: "success!"
				});
			}
		})
	}else{
		return res.status(400).send({
			message: "you are not logged in"
		});
	}
}


module.exports = {
	getRecipes      : getRecipes,
	getUserRecipes	: getUserRecipes,
	getUserRecipe 	: getUserRecipe,
	getAllBeerTypes : getAllBeerTypes,
	createRecipe  	: createRecipe,
	updateRecipe	: updateRecipe,
	deleteRecipe  	: deleteRecipe,
}