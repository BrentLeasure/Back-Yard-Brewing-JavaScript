//Injecting the navbar HTML.
document.getElementById( 'navigation-bar' ).innerHTML = 
'<ul>'+
  "<li><button onclick='Home();' id='home-link'>Home</button></li>"+
  "<li><a id='recipes-link' href='/recipes'>Recipes</a></li>"+
  "<li><a id='logout-button' href='/auth/logout'>Logout</a></li>" + 
'</ul>';


function Home() {

	//If username isn't empty, go to user's profile. Else go to login page.
	GetRequest( '/api/me', undefined, ( status, data ) => {

		//Set data to user.
		let user = JSON.parse( data );

		if ( status == 200){
			window.open('/user/' + user.username, '_parent');
		} else{
			window.open( '/', '_parent' );
		}
	});
	
}
