var recipeModel = require("../../models/recipes");
//===================
//CREATE RECIPE
//===================
PostRecipe = function(req, res){
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

module.exports = {PostRecipe}


