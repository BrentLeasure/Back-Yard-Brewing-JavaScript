var xhr = new XMLHttpRequest();


//=================
//GET REQUEST
//=================
var GetRequest = ( url, urlParameter, callback = undefined ) => {
	//If url parameter is defined, use it in the request
	if ( urlParameter != undefined ) {
		xhr.open( 'GET', url + urlParameter );	
	} else {
		xhr.open( 'GET', url );	
	}

	//send the request
	xhr.send( null );
	//Once we recieve a response, return the callback function
	xhr.onload = () => {
		console.log(xhr.responseText);
			return callback( xhr.status, JSON.parse( xhr.responseText ) );
	}

}


//=================
//POST REQUEST
//=================
var PostRequest = ( url, data, MIMEType, callback = undefined ) => {

	data = JSON.stringify(data);
	xhr.open( 'POST', url );
	xhr.setRequestHeader( 'Content-Type', MIMEType );
	xhr.send( data );
 
	xhr.onload = () => {
		if(MIMEType == 'application/json'){
			return callback(xhr.status , xhr.responseText );	
		} else {
			//Once we recieve a response, return the callback function
	        return callback(xhr.status , JSON.parse( xhr.responseText ) );
	    }
	}
	
}
