var Login = () => {

	//Setting user parameters.
	let login = { email: null, password: null };

	login.email = document.getElementById( 'email' ).value;
	login.password = document.getElementById( 'password' ).value;

	PostRequest( '/auth/login', login, 'application/json', ( status, user ) => {
		
		if ( status == 200 ) {
			//If user is passed, then set cookie for user. Otherwise display error.
			
			window.open( "/user/" + user.username, "_parent" );
		} else {
			console.log("error");
		}
		
	});

}