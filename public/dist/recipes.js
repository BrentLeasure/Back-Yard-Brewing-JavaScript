'use strict';

var beerList = [];
var search = '';

getRequest('getallbeertypes', undefined, function (status, returnData) {
	if (status == 200) {
		//setting beerList to the returnData
		beerList = returnData;
		var parent = document.getElementById('beers');
		var docfrag = document.createDocumentFragment();

		//loop through beerTypes to append a button to each list item
		for (var beer = 0; beer < returnData.length; beer++) {
			//create necessary elements
			var li = document.createElement('li');
			var button = document.createElement('BUTTON');

			//set text content to list item
			li.textContent = returnData[beer].alias;

			//append list item to button
			button.appendChild(li);

			// add onclick attribute
			button.setAttribute("value", beer);
			button.setAttribute("name", returnData[beer].alias);
			button.setAttribute("onclick", "moreInfo(this.getAttribute('value'))");
			button.className = 'beer-buttons';

			//append button to document fragment
			docfrag.appendChild(button);
		}

		//display on DOM element
		parent.appendChild(docfrag);
	} else {
		console.log(returnData.message);
	}
});

var moreInfo = function moreInfo(beer) {
	console.log(beer);
	getRequest('/beer/', beerList[beer].alias, function (num, data) {
		if (num == 200) {
			//removing any previous nodes from previous calls
			document.getElementById('user-recipes').innerHTML = "";

			//set parent to recipes, and put the recipe list in a variable
			var parent = document.getElementById('user-recipes');
			var docfrag = document.createDocumentFragment();
			var recipeList = data;

			//set general beer type information
			document.getElementById('title').textContent = beerList[beer].alias;
			document.getElementById('about').textContent = beerList[beer].about;
			document.getElementById('abv').textContent = beerList[beer].abv;

			//loop through recipeList to append a button to each list item
			for (var recipe = 0; recipe < recipeList.length; recipe++) {
				//create necessary elements
				var button = document.createElement('button');
				var li = document.createElement('li');
				li.textContent = recipeList[recipe].alias;

				button.appendChild(li);
				button.className = 'recipe-buttons';

				docfrag.appendChild(button);
			}

			//append document fragment to the DOM
			parent.appendChild(docfrag);

			//Hides the beer list and displays the recipes
			document.getElementById('beer-list').style.display = 'none';
			document.getElementById('recipes').style.display = 'block';
		}
	});
};

var closeBeerWindow = function closeBeerWindow() {
	//displays the beer-list and hides the recipes
	document.getElementById('beer-list').style.display = 'inline-block';
	document.getElementById('recipes').style.display = 'none';
};

var searchBeerList = function searchBeerList(search) {
	if (search != '') {
		//If the search isn't empty, checks which beers match the search criteria
		for (var beer = 0; beer < beerList.length; beer++) {
			var beerName = beerList[beer].alias.toLowerCase();
			var input = search.toLowerCase();

			if (!beerName.includes(input)) {
				//If the beer does not include the search, remove from DOM
				document.getElementById('beers').children[beer].style.display = 'none';
			} else if (document.getElementById('beers').children[beer].style.display == 'none') {
				//If the beer matches and is already set to none, reset it to 'inline'
				document.getElementById('beers').children[beer].style.display = 'inline-block';
			}
		}
	} else if (search == '') {
		for (var _beer = 0; _beer < beerList.length; _beer++) {
			document.getElementById('beers').children[_beer].style.display = 'inline-block';
		}
	}
};
//# sourceMappingURL=recipes.js.map