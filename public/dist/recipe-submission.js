'use strict';

var submitRecipe = function submitRecipe() {
	var recipe = { alias: null, description: null, instructions: null };
	recipe.alias = document.getElementById('alias').value;
	recipe.description = document.getElementById('description').value;
	recipe.instruction = document.getElementById('instructions').value;

	postRequest("/createrecipe", recipe, function (xhr) {
		console.log("Hello!" + JSON.parse(xhr.responseText));
	});
};
//# sourceMappingURL=recipe-submission.js.map