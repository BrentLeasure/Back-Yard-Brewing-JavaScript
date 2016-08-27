
function IsLoggedIn() {

	//If user is logged in, display the logout button.
	if (  GetCookie( '_id' ) != '' ) {
		console.log(GetCookie('_id') );
		document.getElementById( 'logout-button' ).style.display = 'inline-block';
	}

}

//Injecting the navbar HTML.
document.getElementById( 'navigation-bar' ).innerHTML = 
'<ul>'+
  "<li><button onclick='Home();' id='home-link'>Home</button></li>"+
  "<li><a id='recipes-link' href='/recipes'>Recipes</a></li>"+
  "<li><a id='festivals-link' href='/festivals'>Festivals</a></li>"+
  "<li><button id='logout-button' onclick='Logout()'>Logout</button></li>"+
 '</ul>';


function Home() {

		//Set username to 'username' cookie.
		let username = GetCookie( 'username' );

		//If username isn't empty, go to user's profile. Else go to login page.
		if ( username != ''){
			window.open('/user/' + username, '_parent');
			document.getElementById('logout').style.display = 'inline-block';
		} else{
			window.open('/', '_parent');
		}
	
}

function Logout() {

		//Sets each cookie's expire time to 1970, forcing expire.
		DeleteCookies();

		//Runs Passport's 'logout' function
		window.open( '/auth/logout',  '_parent' );

}
