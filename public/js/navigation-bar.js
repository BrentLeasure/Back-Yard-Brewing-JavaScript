
function IsLoggedIn() {
	//if user is logged in, display the logout button
	var temp = GetCookie( '_id' );
	if(  temp != "") {
		console.log( temp );
		document.getElementById( 'logout-button' ).style.display = 'inline-block';
	}

}

//setting the navbar HTML
document.getElementById( 'navigation-bar' ).innerHTML = 
'<ul>'+
  "<li><button onclick='Home();' id='home-link'>Home</button></li>"+
  "<li><a id='recipes-link' href='/recipes'>Recipes</a></li>"+
  "<li><a id='festivals-link' href='/festivals'>Festivals</a></li>"+
  "<li><a id='logout-button' href='/auth/logout' >Logout</a></li>"+
 '</ul>';


function Home() {

	GetRequest( '/api/me', undefined, ( status, user ) => {

		if(status == 200){
			window.open('/user/' + user.username, "_parent");
			document.getElementById('logout').style.display = 'inline-block';
		}else{
			window.open('/', "_parent");
		}

	});
	
}

