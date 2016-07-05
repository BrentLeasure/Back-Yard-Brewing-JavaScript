var xhr = new XMLHttpRequest();

getRequest('getallbeertypes', undefined, (xhr = undefined) =>{
	if(xhr != undefined){
		let parent = document.getElementById('beers');
		let docfrag = document.createDocumentFragment();
		let beerTypes = JSON.parse(xhr.responseText);

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



var moreInfo = (alias) => {
	getRequest('/beer/', alias, (xhr = undefined)=>{
		if(xhr != undefined){

			let parent = document.getElementById('recipes');
			let docfrag = document.createDocumentFragment();
			let recipeList = JSON.parse(xhr.responseText);
			console.log(recipeList.length);
		}else{
			console.log("ERROR!");
		}
	});
}
