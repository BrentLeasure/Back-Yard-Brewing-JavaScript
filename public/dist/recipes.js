'use strict';

var xhr = new XMLHttpRequest();
var beerTypes = [];
var search = '';
getRequest('getallbeertypes', undefined, function () {
	var xhr = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

	if (xhr != undefined) {
		var parent = document.getElementById('beers');
		var docfrag = document.createDocumentFragment();
		beerTypes = JSON.parse(xhr.responseText);

		//loop through beerTypes to append a button to each list item
		for (var beer = 0; beer < beerTypes.length; beer++) {
			//create necessary elements
			var li = document.createElement('li');
			var button = document.createElement('BUTTON');

			//set text content to list item
			li.textContent = beerTypes[beer].alias;

			//append list item to button
			button.appendChild(li);

			// add onclick attribute
			button.setAttribute("value", beer);
			button.setAttribute("name", beerTypes[beer].alias);
			button.setAttribute("onclick", "moreInfo(this.getAttribute('value'))");
			button.className = 'beer-buttons';

			//append button to document fragment
			docfrag.appendChild(button);
		}

		//display on DOM element
		parent.appendChild(docfrag);
	}
});

var moreInfo = function moreInfo(beer) {
	getRequest('/beer/', beerTypes[beer].alias, function () {
		var xhr = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

		if (xhr != undefined) {
			//removing any previous nodes from previous calls
			document.getElementById('user-recipes').innerHTML = "";

			//set parent to recipes, and put the recipe list in a variable
			var parent = document.getElementById('user-recipes');
			var docfrag = document.createDocumentFragment();
			var recipeList = JSON.parse(xhr.responseText);

			//set general beer type information
			document.getElementById('title').textContent = beerTypes[beer].alias;
			document.getElementById('about').textContent = beerTypes[beer].about;
			document.getElementById('abv').textContent = beerTypes[beer].abv;

			//loop through recipeList to append a button to each list item
			for (var recipe = 0; recipe < recipeList.length; recipe++) {

				var li = document.createElement('li');
				li.textContent = recipeList[recipe].alias;

				var button = document.createElement('button');
				button.appendChild(li);

				docfrag.appendChild(button);
			}

			parent.appendChild(docfrag);

			document.getElementById('beers').style.display = 'none';
			document.getElementById('recipes').style.display = 'block';
		} else {
			console.log("ERROR!");
		}
	});
};

var closeBeerWindow = function closeBeerWindow() {
	document.getElementById('beer-list').style.display = 'inline-block';
	document.getElementById('recipes').style.display = 'none';
};

var searchBeerList = function searchBeerList(search) {
	//setting display to 'inline-block' for all li elements in 'user-recipes'

	//Sets the elements to
	if (search != '') {
		for (var beer = 0; beer < beerTypes.length; beer++) {
			var beerName = beerTypes[beer].alias.toLowerCase();
			var input = search.toLowerCase();

			if (!beerName.includes(input)) {
				document.getElementById('beers').children[beer].style.display = 'none';
			} else {}
		}
	}
};

var resetBeerList = function resetBeerList() {
	var elems = document.getElementById('beers').getElementsByTagName('button');
	for (var li = 0; li < elems.length; li++) {
		elems[li].style.display = 'inline-block';
	}
};
//# sourceMappingURL=recipes.js.map