function Login () {

	//Setting user parameters.
	let login = { email: null, password: null };

	login.email = document.getElementById( 'email' ).value;
	login.password = document.getElementById( 'password' ).value;

	PostRequest( '/auth/login', login, 'application/json', ( status, user ) => {
		
		if ( status == 200 ) {

			let userJson = JSON.parse(user);
			//If user is passed, then set cookie for each user key. Otherwise display error.
			for ( const key in userJson ) {
				document.cookie= key + "=" + userJson[key];
			}

			window.open( "/user/" + user.username, "_parent" );
		} else {
			console.log("error");
		}
		
	});

}