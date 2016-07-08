var xhr = new XMLHttpRequest();
var getRequest = (url, urlParameter, callback = undefined) => {
	if (urlParameter != undefined) {
		xhr.open('GET', url + urlParameter);	
	}else{
		xhr.open('GET', url);	
	}
	xhr.send(null);
	xhr.onreadystatechange = () => {
		if(xhr.readyState === 4 && xhr.status == 200){
			return callback(xhr);
		}else{
			return;
		}
	}
}

var postRequest = (url, data, callback = undefined) => {
	
	xhr.onreadystatechange = () => {
		//Call a function when the state changes.
	    if(xhr.readyState == 4 && xhr.status == 200) {	
	        return callback(200 , xhr.responseText);
	    }else{
	    	return callback(400, xhr.responseText);
	    }
	}
	xhr.open('POST', url)
	xhr.send(data);
}