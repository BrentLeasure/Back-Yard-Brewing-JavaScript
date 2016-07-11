var xhr = new XMLHttpRequest();
var getRequest = (url, urlParameter, callback = undefined) => {
	if (urlParameter != undefined) {
		xhr.open('GET', url + urlParameter);	
	}else{
		xhr.open('GET', url);	
	}
	xhr.send(null);
	xhr.onload = () => {
		if(xhr.status == 200){
			return callback(xhr);
		}else{
			return;
		}
	}
}

var postRequest = (url, data, callback = undefined) => {
	data = JSON.stringify(data);
	xhr.open('POST', url);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(data);

	xhr.onload = () => {
		//Call a function when the state changes.
	    if(xhr.status == 200) {	
	        return callback(200 , xhr);
	    }else{
	    	let err = JSON.parse(xhr.responseText);
	    	return callback(400, err);
	    }
	}

}