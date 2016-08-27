//when the page is loaded, this will run
document.addEventListener( "DOMContentLoaded", ( event ) => {

	//request beer types
	GetRequest( '/recipes/getallbeertypes', undefined, ( status, beerTypes ) => {

		//if request is successfull, run this code
		if ( status === 200 ) {
			let select = document.getElementById('beer-type-selection');
			//sets first option to null
			let option = document.createElement('option');
			option.innerHTML = '-- Select One --'
			option.value = null;
			select.appendChild(option);

			for ( let beer = 0; beer < beerTypes.length; beer++ ) {
				//Set select options to each beer type
				let option = document.createElement('option');
				option.innerHTML = beerTypes[beer].alias;
				option.value = beerTypes[beer].alias;
				select.appendChild(option);
			}
		}

	});

});



function SubmitRecipe() {

	//sets the recipe object and its keys
	let recipe = { alias: null, description: null, category: null, instructions: null };

	//sets the recipe object key's to the user's inputs
	recipe.alias = document.getElementById( 'alias' ).value;
	recipe.description = document.getElementById( 'description' ).value;
	recipe.category = document.getElementById( 'beer-type-selection' ).value;
	recipe.instructions = document.getElementById( 'instructions' ).value;

	//Posts user's recipe to the server
	PostRequest( "/createrecipe", recipe, 'application/json', ( status, message ) => {

		if ( status != 200 ) {
			//if error, then display error message, othewise show success
			document.getElementsByClassName( 'message' )[0].style.color = 'red';
			document.getElementsByClassName( 'message' )[0].innerHTML = message;	
		}else{
			document.getElementsByClassName( 'message' )[0].style.color = 'green';
			document.getElementsByClassName( 'message' )[0].innerHTML = message;	
		}
		
	});

};