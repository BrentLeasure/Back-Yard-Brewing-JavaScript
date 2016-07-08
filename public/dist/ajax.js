'use strict';

var xhr = new XMLHttpRequest();
var getRequest = function getRequest(url, urlParameter) {
	var callback = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

	if (urlParameter != undefined) {
		xhr.open('GET', url + urlParameter);
	} else {
		xhr.open('GET', url);
	}
	xhr.send(null);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status == 200) {
			return callback(xhr);
		} else {
			return;
		}
	};
};

var postRequest = function postRequest(url, data) {
	var callback = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];


	console.log("Data: " + data.alias);
	xhr.onreadystatechange = function () {
		//Call a function when the state changes.
		if (xhr.readyState == 4 && xhr.status == 200) {
			return callback(200, xhr.responseText);
		} else {
			return callback(400, xhr.responseText);
		}
	};
	xhr.open('POST', url);
	xhr.send(data);
};
//# sourceMappingURL=ajax.js.map