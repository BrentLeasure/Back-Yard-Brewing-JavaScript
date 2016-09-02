var user = {};

window.onload = function(){
	UserLoad();
	IsLoggedIn();
}

function UserLoad() {

	GetRequest( '/api/me', undefined, ( status, data ) => {
		if ( status === 200 ) {
			user = JSON.parse( data );
			document.getElementById( 'username' ).innerHTML = "Welcome back, " + user.username;
		}

	});
	
}

