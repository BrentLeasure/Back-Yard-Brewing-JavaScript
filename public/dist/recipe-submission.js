'use strict';

//resets message
document.addEventListener("DOMContentLoaded", function (event) {
	getRequest('/recipes/getallbeertypes', undefined, function (num, beerTypes) {
		if (num === 200) {
			var select = document.getElementById('beer-type-selection');
			for (var beer = 0; beer < beerTypes.length; beer++) {
				var option = document.createElement('option');
				option.innerHTML = beerTypes[beer].alias;
				option.value = beerTypes[beer].alias;
				select.appendChild(option);
			}
		}
	});
});

var submitRecipe = function submitRecipe() {

	//sets the recipe object and its keys
	var recipe = { alias: null, description: null, instructions: null };

	//sets the recipe object key's to the user's inputs
	recipe.alias = document.getElementById('alias').value;
	recipe.description = document.getElementById('description').value;
	recipe.instructions = document.getElementById('instructions').value;

	//posts to the server
	postRequest("/createrecipe", recipe, 'application/json', function (num, err) {
		if (num === 400) {
			//if error, then display error message, othewise show success
			document.getElementsByClassName('message')[0].style.color = 'red';
			document.getElementsByClassName('message')[0].innerHTML = err.message;
		} else {
			document.getElementsByClassName('message')[0].style.color = 'green';
			document.getElementsByClassName('message')[0].innerHTML = "success!";
		}
	});
};
//# sourceMappingURL=recipe-submission.js.map