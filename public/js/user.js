var user = {};

document.addEventListener( "DOMContentLoaded", ( event ) => {
	GetRequest( '/api/me', undefined, ( status, data ) => {
		
		if ( status === 200 ) {
			user = data;
			document.getElementById( 'username' ).innerHTML = "Welcome back, " + user.username;
		}

	});
	
});

