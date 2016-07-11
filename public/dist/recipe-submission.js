'use strict';

var submitRecipe = function submitRecipe() {
	var recipe = { alias: null, description: null, instructions: null };
	recipe.alias = document.getElementById('alias').value;
	recipe.description = document.getElementById('description').value;
	recipe.instructions = document.getElementById('instructions').value;

	postRequest("/createrecipe", recipe, function (num, err) {
		if (num === 400) {
			console.log(err.message);
		} else {
			console.log("sucess!");
		}
	});
};
//# sourceMappingURL=recipe-submission.js.map