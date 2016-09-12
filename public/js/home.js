window.onload = () => {

	IsLoggedIn();
	
}

function Login () {

	//Setting user parameters.
	let login = { email: null, password: null };

	login.email = document.getElementById( 'email' ).value;
	login.password = document.getElementById( 'password' ).value;

	PostRequest( '/auth/login', login, 'application/json', ( status, data ) => {
		
		if ( status == 200 ) {
			// Parse the return data.
			let user = JSON.parse(data);
			
			//Open user's profile in another window using name as url.
			window.open( '/user/' + data.username, '_parent' );
		} else {
			console.log('error');
		}
		
	});

}