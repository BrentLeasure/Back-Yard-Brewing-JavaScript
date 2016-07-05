'use strict';

var xhr = new XMLHttpRequest();
var beerTypes = [];

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
			//set general beer type information
			document.getElementById('title').textContent = beerTypes[beer].alias;
			document.getElementById('about').textContent = beerTypes[beer].about;
			document.getElementById('abv').textContent = beerTypes[beer].abv;

			//set parent to recipes, and put the recipe list in a variable
			var parent = document.getElementById('recipes');
			var docfrag = document.createDocumentFragment();
			var recipeList = JSON.parse(xhr.responseText);

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
//# sourceMappingURL=recipes.js.map