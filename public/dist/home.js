'use strict';

var login = function login() {

	//setting user
	var login = { email: null, password: null };

	login.email = document.getElementById('email').value;
	login.password = document.getElementById('password').value;

	postRequest('/auth/login', login, 'application/json', function (num, user) {
		console.log(user);
	});
};
//# sourceMappingURL=home.js.map