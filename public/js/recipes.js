var beerList = [];
var search = '';

function RecipesReady() {
	//when page loads, this will be ran
	GetRequest( '/getallbeertypes', undefined, ( status, data ) => {

		if ( status == 200 ) {
			//setting beerList to data
			beerList = JSON.parse( data );
			let parent = document.getElementById( 'beers' );
			let docfrag = document.createDocumentFragment();
			
			//loop through beerTypes to append a button to each list item
			for ( let beer = 0; beer < beerList.length; beer++ ) {
				//create necessary elements
				let li = document.createElement( 'li' );
				let button = document.createElement( 'BUTTON' );

				//set text content to list item
				li.textContent = beerList[beer].alias;

				//append list item to button
				button.appendChild( li );

				// add onclick attribute
				button.setAttribute( "value", beer );
				button.setAttribute( "name", beerList[beer].alias );
				button.setAttribute( "onclick", "MoreInfo( this.getAttribute( 'value' ) )" );
				button.className = 'beer-buttons';

				//append button to document fragment
				docfrag.appendChild( button );
			}

			//display on DOM element
			parent.appendChild( docfrag );
		} else {
			console.log( beerList.message );
		}

	});	

}	



function MoreInfo( beer ) {

	GetRequest( '/beer/', beerList[beer].alias, ( num, userRecipes ) => {
		console.log( userRecipes.length );
		if ( num == 200 ) {
			//removing any previous nodes from previous calls
			document.getElementById( 'user-recipes' ).innerHTML = "";

			//set parent to recipes, and put the recipe list in a variable
			let parent = document.getElementById( 'user-recipes' );
			let docfrag = document.createDocumentFragment();
			let recipeList = userRecipes;
			console.log(recipeList);
			//set general beer type information
			document.getElementById( 'title' ).textContent = beerList[beer].alias;
			document.getElementById( 'about' ).textContent = beerList[beer].about;
			document.getElementById( 'abv' ).textContent = beerList[beer].abv;


			//loop through recipeList to append a button to each list item
			for ( let recipe = 0; recipe < recipeList.length; recipe++ ) {
				//create necessary elements
				let button = document.createElement( 'button' );		
				let li = document.createElement( 'li' );
				li.textContent = recipeList[recipe].alias;


				button.appendChild( li );
				button.className = 'recipe-buttons';

				docfrag.appendChild( button );
			}

			//append document fragment to the DOM
			parent.appendChild( docfrag );

			//Hides the beer list and displays the recipes
			document.getElementById( 'beer-list' ).style.display = 'none';
			document.getElementById( 'recipes' ).style.display = 'block';
		}

	});

}


function CloseBeerWindow() {
	
	//displays the beer-list and hides the recipes 
	document.getElementById('beer-list').style.display = 'inline-block';
	document.getElementById('recipes').style.display = 'none';

}

function SearchBeerList( search ) {
	
	if ( search != '' ) {
		//If the search isn't empty, checks which beers match the search criteria
		for ( let beer = 0; beer < beerList.length; beer++ ) {
			let beerName = beerList[beer].alias.toLowerCase();
			let input = search.toLowerCase();


			if ( !beerName.includes( input ) ) {
				//If the beer does not include the search, remove from DOM
				document.getElementById( 'beers' ).children[beer].style.display = 'none';
				
			} else if ( document.getElementById( 'beers' ).children[beer].style.display == 'none' ) {
				//If the beer matches and is already set to none, reset it to 'inline'
				document.getElementById( 'beers' ).children[beer].style.display = 'inline-block';

			}
		}
	} else if ( search == '' ) {
		for ( let beer = 0; beer < beerList.length; beer++ ) {
			document.getElementById( 'beers' ).children[beer].style.display = 'inline-block';
		}
	}
	
}