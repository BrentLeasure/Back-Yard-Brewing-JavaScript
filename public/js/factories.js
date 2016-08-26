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
		return callback( xhr.status, xhr.responseText );	
	}
	
}

//=================
//GET COOKIE
//=================
var getCookie = ( cookieName ) => {

	//Set name to equal to cookie name + '='. The equals sign is a part of the cookie, which is why we add it
    let name = cookieName + "=";
    //split the cookies into an array based on the semicolons separating them.
    let cookieArray = document.cookie.split(';');

    //loop through the array
    for( let cookie = 0; cookie < cookieArray.length; cookie++ ) {
    	//Set the current cookie to the cookie the array is currently on. 
        let currentCookie = cookieArray[cookie];

 		//While the first character in the string is blank, delete the first character.
        while( currentCookie.charAt( 0 )==' ' ) {
            currentCookie = currentCookie.substring( 1 );
        }

        //If name is equal to the first index of 'currentCookie', then return the name
        if( currentCookie.indexOf( name ) == 0 ) {
            return currentCookie.substring( name.length, currentCookie.length );
        }
    }
    return "";

}
