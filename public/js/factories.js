//=================
//GET REQUEST
//=================
function GetRequest( url, urlParameter, callback = undefined ) {
	var xhr = new XMLHttpRequest();
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
		return callback( xhr.status, xhr.responseText );
	}

}


//=================
//POST REQUEST
//=================
function PostRequest( url, data, MIMEType, callback = undefined ) {
	var xhr = new XMLHttpRequest();
	
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
function GetCookie( cookieName ) {

	//Set name to equal to cookie name + '='. The equals sign is a part of the cookie, which is why we add it
    let name = cookieName + "=";
    //split the cookies into an array based on the semicolons separating them.
    let cookieArray = document.cookie.split(';');

    for ( let cookie = 0; cookie < cookieArray.length; cookie++ ) {
    	//Set the current cookie to the cookie the array is currently on. 
        let currentCookie = cookieArray[cookie];

 		//While the first character in the string is blank, delete the first character.
        while ( currentCookie.charAt( 0 )==' ' ) {
            currentCookie = currentCookie.substring( 1 );
        }

        //If name is equal to the first index of 'currentCookie', then return the name
        if ( currentCookie.indexOf( name ) == 0 ) {
            return currentCookie.substring( name.length, currentCookie.length );
        }
    }
    return "";

}

//=================
//DELETE COOKIES
//=================
function DeleteCookies() {
	console.log( 'this is running' );

	//Use old date to expire the cookies
	let expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT;'

	//Split each cookie into an array element.
	let cookiesArray = document.cookie.split(";");
	
	//Split the cookie to have name as the first value.
	//Then use the cookie's name to expire the cookie.
	for ( let cookie = 0; cookie < cookiesArray.length; cookie++ ) {
		let name = cookiesArray[cookie].split( "=" )[0];
	  	document.cookie = name + "=;" + expire;
  	}

}

//=================
//IS LOGGED IN
//=================
function IsLoggedIn() {

	//If user is logged in, display the logout button.
	GetRequest( '/api/me', undefined, ( status, data ) => {

		if ( status == 200 ) {
			document.getElementById( 'logout-button' ).style.display = 'inline-block';
		}

	});
};
