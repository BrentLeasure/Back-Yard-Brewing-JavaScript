'use strict';

//resets message
document.getElementsByClassName('message').innerText = "hello";
// console.log(x);

var submitRecipe = function submitRecipe() {

	//sets the recipe object and its keys
	var recipe = { alias: null, description: null, instructions: null };

	//sets the recipe object key's to the user's inputs
	recipe.alias = document.getElementById('alias').value;
	recipe.description = document.getElementById('description').value;
	recipe.instructions = document.getElementById('instructions').value;

	//posts to the server
	postRequest("/createrecipe", recipe, function (num, err) {
		if (num === 400) {
			//if error, then display error message, othewise show success
			message = err.message;
		} else {
			message = "sucess!";
		}
	});
};
//# sourceMappingURL=recipe-submission.js.map