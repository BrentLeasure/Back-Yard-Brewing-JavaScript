document.addEventListener("DOMContentLoaded", (event) => {
	//when the page is loaded, run these functions

	//request beer types
	getRequest('/recipes/getallbeertypes', undefined, (num, beerTypes) =>{

		if(num === 200){
			//if request is successfull, run this code
			let select = document.getElementById('beer-type-selection');
			//sets first option to null
			let option = document.createElement('option');
			option.innerHTML = '-- Select One --'
			option.value = null;
			select.appendChild(option);
			for(let beer = 0; beer < beerTypes.length; beer++){
				//loop through and set select options to each beer type
				let option = document.createElement('option');
				option.innerHTML = beerTypes[beer].alias;
				option.value = beerTypes[beer].alias;
				select.appendChild(option);
			}
		}
	})
});



var submitRecipe = () => {

	//sets the recipe object and its keys
	let recipe = {alias: null, description: null, category: null, instructions: null};

	//sets the recipe object key's to the user's inputs
	recipe.alias = document.getElementById('alias').value;
	recipe.description = document.getElementById('description').value;
	recipe.category = document.getElementById('beer-type-selection').value;
	recipe.instructions = document.getElementById('instructions').value;

	//posts to the server
	postRequest("/createrecipe", recipe, 'application/json', (num, err) => {
		if(num === 400){
			//if error, then display error message, othewise show success
			document.getElementsByClassName('message')[0].style.color = 'red';
			document.getElementsByClassName('message')[0].innerHTML = err.message;	
		}else{
			document.getElementsByClassName('message')[0].style.color = 'green';
			document.getElementsByClassName('message')[0].innerHTML = "success!";	
		}
		
	})
};