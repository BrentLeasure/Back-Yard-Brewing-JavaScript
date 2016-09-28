//when the page is loaded, this will run
document.getElementById( 'submission-content' ).style.display = 'none';
window.onload = function(){
	
	RecipeSubmissionLoad();
	IsLoggedIn();
	
}

function RecipeSubmissionLoad(){
	//request beer types
	GetRequest( '/getallbeertypes', undefined, ( status, data ) => {

		//if request is successfull, run this code
		if ( status === 200 ) {
			//set data to beerTypes
			let beerTypes = JSON.parse( data );
			let select = document.getElementById('beer-type-selection');
			//sets first option to null

			for ( let beer = 0; beer < beerTypes.length; beer++ ) {
				//Set select options to each beer type
				let option = document.createElement('option');
				option.innerHTML = beerTypes[beer].alias;
				option.value = beerTypes[beer].alias;
				select.appendChild(option);
			}
		}

	});
	document.getElementById( 'submission-content' ).style.display = 'inline-block';
}



function SubmitRecipe() {

	//sets the recipe object and its keys
	let recipe = { alias: null, description: null, category: null, instructions: null, image: null };

	let img = document.getElementById( 'image' );
	img = img.files[0];
	//sets the recipe object key's to the user's inputs
	recipe.alias = document.getElementById( 'alias' ).value;
	recipe.description = document.getElementById( 'description' ).value;
	recipe.category = document.getElementById( 'beer-type-selection' ).value;
	recipe.instructions = document.getElementById( 'instructions' ).value;
	FileReadImage( img, function ( image ) {
		recipe.image = image;
		// Posts user's recipe to the server
		PostRequest( "/createrecipe", recipe, 'application/json', ( status, message ) => {
			let messages = JSON.parse( message );
			let spans = document.getElementsByTagName( 'span' );

			for ( let span = 0; span < spans.length; span++ ) {
				spans[span].innerHTML = '';
			}

			if ( status != 200 ) {
		
				if ( messages['alias'] ){
					document.getElementById( 'alias-err' ).innerHTML = '*' + messages['alias'];
				} 
				if ( messages['description'] ){
					document.getElementById( 'description-err' ).innerHTML = '*' + messages['description'];
				}
				if ( messages['category'] ){
					document.getElementById( 'category-err' ).innerHTML = '*' + messages['category'];
				}
				if ( messages['instructions'] ){
					document.getElementById( 'instructions-err' ).innerHTML = '*' + messages['instructions'];
				}
				if ( messages['image'] ){
					document.getElementById( 'image-err' ).innerHTML = '*' + messages['image'];
				}				
				if ( messages.message ) {
					document.getElementsByClassName( 'message' )[0].style.color = 'red';
					document.getElementsByClassName( 'message' )[0].innerHTML = messages.message;	
				}
			} else{
				document.getElementsByClassName( 'message' )[0].style.color = 'green';
				document.getElementsByClassName( 'message' )[0].innerHTML = message;	
			}
			
		});
	});
		

};