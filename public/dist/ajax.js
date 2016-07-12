'use strict';

var xhr = new XMLHttpRequest();

//=================
//GET REQUEST
//=================
var getRequest = function getRequest(url, urlParameter) {
	var callback = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

	if (urlParameter != undefined) {
		xhr.open('GET', url + urlParameter);
	} else {
		xhr.open('GET', url);
	}
	xhr.send(null);
	xhr.onload = function () {
		if (xhr.status == 200) {
			return callback(200, JSON.parse(xhr.responseText));
		} else {
			return callback(400, JSON.parse(xhr.responseText));
		}
	};
};

//=================
//POST REQUEST
//=================
var postRequest = function postRequest(url, data, MIMEType) {
	var callback = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

	data = JSON.stringify(data);
	xhr.open('POST', url);
	xhr.setRequestHeader('Content-Type', MIMEType);
	xhr.send(data);

	xhr.onload = function () {
		//Call a function when the state changes.
		if (xhr.status == 200) {
			return callback(200, xhr);
		} else {
			var err = JSON.parse(xhr.responseText);
			return callback(400, err);
		}
	};
};
//# sourceMappingURL=ajax.js.map