function Login () {

	//Setting user parameters.
	let login = { email: null, password: null };

	login.email = document.getElementById( 'email' ).value;
	login.password = document.getElementById( 'password' ).value;

	PostRequest( '/auth/login', login, 'application/json', ( status, data ) => {
		
		if ( status == 200 ) {
			//Set 'expireTime' to current date and then add 1 hour to it.
			let expireTime = new Date( Date.now() );
			expireTime.setHours( expireTime.getHours() + 1 );
			
			// Parse the return data.
			let user = JSON.parse(data);
			
			//Set cookie for each user key. 
			for ( const key in user ) {
				document.cookie = key + '=' + user[key] + ';expires=' + expireTime.toUTCString() + ";";
			}

			//Open user's profile in another window using name as url.
			window.open( '/user/' + user.username, '_parent' );
		} else {
			console.log('error');
		}
		
	});

}