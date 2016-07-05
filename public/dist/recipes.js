'use strict';

var xhr = new XMLHttpRequest();

getRequest('getallbeertypes', undefined, function () {
	var xhr = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

	if (xhr != undefined) {
		var parent = document.getElementById('beers');
		var docfrag = document.createDocumentFragment();
		var beerTypes = JSON.parse(xhr.responseText);

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
			button.setAttribute("name", beerTypes[beer].alias);
			button.setAttribute("onclick", "moreInfo(this.getAttribute('name'))");
			button.className = 'beer-buttons';

			//append button to document fragment
			docfrag.appendChild(button);
		}

		//display on DOM element
		parent.appendChild(docfrag);
	}
});

var moreInfo = function moreInfo(alias) {
	getRequest('/beer/', alias, function () {
		var xhr = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

		if (xhr != undefined) {

			var parent = document.getElementById('recipes');
			var docfrag = document.createDocumentFragment();
			var recipeList = JSON.parse(xhr.responseText);
			console.log(recipeList.length);
		} else {
			console.log("ERROR!");
		}
	});
};
//# sourceMappingURL=recipes.js.map