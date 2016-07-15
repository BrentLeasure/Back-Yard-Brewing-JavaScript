'use strict';

document.getElementById('navigation-bar').innerHTML = '<ul>' + "<li><button onclick='home();' id='home-link'>Home</button></li>" + "<li><a id='recipes-link' href='/recipes'>Recipes</a></li>" + "<li><a id='festivals-link' href='/festivals'>Festivals</a></li>" + '</ul>';

var home = function home() {
	getRequest('/api/me', undefined, function (status, user) {
		if (status === 200) {
			window.open('/user/' + user.username, "_parent");
		} else {
			window.open('/', "_parent");
		}
	});
};
//# sourceMappingURL=navigation-bar.js.map