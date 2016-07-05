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