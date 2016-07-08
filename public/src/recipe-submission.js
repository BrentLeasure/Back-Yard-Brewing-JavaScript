var submitRecipe = () => {
	let recipe = {alias: null, description: null, instructions: null};
	recipe.alias = document.getElementById('alias').value;
	recipe.description = document.getElementById('description').value;
	recipe.instruction = document.getElementById('instructions').value;

	postRequest("/createrecipe", recipe, (xhr) => {
		console.log("Hello!" + JSON.parse(xhr.responseText));
	})
};