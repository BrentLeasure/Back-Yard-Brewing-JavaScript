'use strict';

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
//# sourceMappingURL=ajax.js.map