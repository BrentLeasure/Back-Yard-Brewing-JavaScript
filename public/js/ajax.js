var xhr = new XMLHttpRequest();


//=================
//GET REQUEST
//=================
var GetRequest = (url, urlParameter, callback = undefined) => {
	if (urlParameter != undefined) {
		xhr.open('GET', url + urlParameter);	
	}else{
		xhr.open('GET', url);	
	}
	xhr.send(null);
	xhr.onload = () => {
		if(xhr.status == 200){
			return callback(200, JSON.parse(xhr.responseText));
		}else{
			return callback(400, JSON.parse(xhr.responseText));
		}
	}
}


//=================
//POST REQUEST
//=================
var PostRequest = (url, data, MIMEType, callback = undefined) => {
	data = JSON.stringify(data);
	xhr.open('POST', url);
	xhr.setRequestHeader('Content-Type', MIMEType);
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
