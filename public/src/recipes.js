var xhr = new XMLHttpRequest();
var beerTypes = [];
var search = '';
getRequest('getallbeertypes', undefined, (xhr = undefined) =>{
	if(xhr != undefined){
		let parent = document.getElementById('beers');
		let docfrag = document.createDocumentFragment();
		beerTypes = JSON.parse(xhr.responseText);
		
		//loop through beerTypes to append a button to each list item
		for (let beer = 0; beer < beerTypes.length; beer++){
			//create necessary elements
			let li = document.createElement('li');
			let button = document.createElement('BUTTON');

			//set text content to list item
			li.textContent = beerTypes[beer].alias;

			//append list item to button
			button.appendChild(li);

			// add onclick attribute
			button.setAttribute("value", beer);
			button.setAttribute("onclick", "moreInfo(this.getAttribute('value'))");
			button.className = 'beer-buttons';

			//append button to document fragment
			docfrag.appendChild(button);
		}

		//display on DOM element
		parent.appendChild(docfrag);
	}
});		



var moreInfo = (beer) => {
	getRequest('/beer/', beerTypes[beer].alias, (xhr = undefined)=>{
		if(xhr != undefined){
			//removing any previous nodes from previous calls
			document.getElementById('user-recipes').innerHTML = "";

			//set parent to recipes, and put the recipe list in a variable
			let parent = document.getElementById('user-recipes');
			let docfrag = document.createDocumentFragment();
			let recipeList = JSON.parse(xhr.responseText);

			//set general beer type information
			document.getElementById('title').textContent = beerTypes[beer].alias;
			document.getElementById('about').textContent = beerTypes[beer].about;
			document.getElementById('abv').textContent = beerTypes[beer].abv;


			//loop through recipeList to append a button to each list item
			for(let recipe = 0; recipe < recipeList.length; recipe++){

				let li = document.createElement('li');
				li.textContent = recipeList[recipe].alias;


				let button = document.createElement('button');
				button.appendChild(li);

				docfrag.appendChild(button);
			}

			parent.appendChild(docfrag);

			document.getElementById('beers').style.display = 'none';
			document.getElementById('recipes').style.display = 'block';
		}else{
			console.log("ERROR!");
		}
	});
}


var closeBeerWindow = () =>{
	document.getElementById('beers').style.display = 'block';
	document.getElementById('recipes').style.display = 'none';
}

var searchBeerList = (keypress) =>{
	if(keypress.key == 'Backspace'){
		search = search.substring(0, search.length - 1);
	}else{
		search += keypress.key;
	}
	console.log(search);
}