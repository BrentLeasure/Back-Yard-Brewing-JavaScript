var beerList = [];
var search = '';
document.getElementById( 'recipes-content' ).style.display = 'none';

window.onload = function(){
	
	RecipesLoad();
	IsLoggedIn();
	
}

function RecipesLoad() {
		
	GetRequest( '/getallbeertypes', undefined, ( status, data ) => {
		if ( status == 200 ) {
			//setting beerList to data
			beerList = JSON.parse( data );
			let parent = document.getElementById( 'beers' );
			let docfrag = document.createDocumentFragment();
			
			//loop through beerTypes to append a button to each list item
			for ( let beer = 0; beer < beerList.length; beer++ ) {
				let li = document.createElement( 'li' );
				let button = document.createElement( 'BUTTON' );

				li.textContent = beerList[beer].alias;

				button.appendChild( li );

				button.setAttribute( "value", beer );
				button.setAttribute( "name", beerList[beer].alias );
				button.setAttribute( "onclick", "MoreInfo( this.getAttribute( 'value' ) )" );
				button.className = 'beer-buttons';

				docfrag.appendChild( button );
			}

			//display docfrag on DOM
			parent.appendChild( docfrag );
		} else {
			console.log( beerList.message );
		}

	});	
	document.getElementById( 'recipes-content' ).style.display = 'inline-block';

}	



function MoreInfo( beer ) {

	GetRequest( '/beer/', beerList[beer].alias, ( num, data ) => {

		if ( num == 200 ) {
			//removing any previous nodes from previous calls
			document.getElementById( 'user-recipes' ).innerHTML = "";

			//set parent to recipes, and put the recipe list in a variable
			let parent = document.getElementById( 'user-recipes' );
			let docfrag = document.createDocumentFragment();
			let recipeList = JSON.parse( data );

			//set general beer information for passed beer
			document.getElementById( 'title' ).textContent = beerList[beer].alias;
			document.getElementById( 'about' ).textContent = beerList[beer].about;
			document.getElementById( 'abv' ).textContent = beerList[beer].abv;


			//loop through recipeList to append a button to each list item
			for ( let recipe = 0; recipe < recipeList.length; recipe++ ) {
				let button = document.createElement( 'button' );		
				let li = document.createElement( 'li' );
				li.textContent = recipeList[recipe].alias;


				button.appendChild( li );
				button.className = 'recipe-buttons';

				docfrag.appendChild( button );
			}

			parent.appendChild( docfrag );

			document.getElementById( 'beer-list' ).style.display = 'none';
			document.getElementById( 'recipes' ).style.display = 'block';
		}

	});

}


function CloseBeerWindow() {
	
	document.getElementById('beer-list').style.display = 'inline-block';
	document.getElementById('recipes').style.display = 'none';

}

function SearchBeerList( search ) {
	
	if ( search != '' ) {
		//If the search isn't empty, checks which beers match the search criteria.
		for ( let beer = 0; beer < beerList.length; beer++ ) {
			let beerName = beerList[beer].alias.toLowerCase();
			let input = search.toLowerCase();

			//If the beer does not include the search, remove from DOM. Otherwise,
			//if the beer matches and is already set to none, reset it to 'inline'.
			if ( !beerName.includes( input ) ) {
				document.getElementById( 'beers' ).children[beer].style.display = 'none';
			} else if ( document.getElementById( 'beers' ).children[beer].style.display == 'none' ) {
				document.getElementById( 'beers' ).children[beer].style.display = 'inline-block';
			}
		}
	} else if ( search == '' ) {
		for ( let beer = 0; beer < beerList.length; beer++ ) {
			document.getElementById( 'beers' ).children[beer].style.display = 'inline-block';
		}
	}
	
}