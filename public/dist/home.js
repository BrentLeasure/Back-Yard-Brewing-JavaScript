'use strict';

var login = function login() {

	//setting user
	var login = { username: null, password: null };

	login.username = document.getElementById('username').value;
	login.password = document.getElementById('password').value;

	postRequest('/auth/login', login, function (num, user) {
		console.log(user);
	});
};
//# sourceMappingURL=home.js.map