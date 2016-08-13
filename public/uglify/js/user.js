'use strict';

var user = {};
document.addEventListener("DOMContentLoaded", function (event) {
	getRequest('/api/me', undefined, function (status, data) {
		if (status === 200) {
			user = data;
			document.getElementById('username').innerHTML = "Welcome back, " + user.username;
		}
	});
});
//# sourceMappingURL=user.js.map