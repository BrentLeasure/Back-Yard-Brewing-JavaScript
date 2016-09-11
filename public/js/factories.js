function GetRequest( url, urlParameter, callback = undefined ) {

	var xhr = new XMLHttpRequest();

	if ( urlParameter != undefined ) {
		xhr.open( 'GET', url + urlParameter );	
	} else {
		xhr.open( 'GET', url );	
	}

	xhr.send( null );
	xhr.onload = () => {
		return callback( xhr.status, xhr.responseText );
	}

}

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

function GetCookie( cookieName ) {

    let name = cookieName + "=";
    let cookieArray = document.cookie.split(';');

    for ( let cookie = 0; cookie < cookieArray.length; cookie++ ) {
        let currentCookie = cookieArray[cookie];
 
        while ( currentCookie.charAt( 0 )==' ' ) {
            currentCookie = currentCookie.substring( 1 );
        }

        if ( currentCookie.indexOf( name ) == 0 ) {
            return currentCookie.substring( name.length, currentCookie.length );
        }
    }
    return "";

}

function DeleteCookies() {

	let expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT;'
	let cookiesArray = document.cookie.split(";");
	
	for ( let cookie = 0; cookie < cookiesArray.length; cookie++ ) {
		let name = cookiesArray[cookie].split( "=" )[0];
	  	document.cookie = name + "=;" + expire;
  	}

}

function IsLoggedIn() {

	GetRequest( '/api/me', undefined, ( status, data ) => {

		if ( status == 200 ) {
			document.getElementById( 'logout-button' ).style.display = 'inline-block';
		} else {
			document.getElementById( 'logout-button' ).style.display = 'none';
		}

	});
};
