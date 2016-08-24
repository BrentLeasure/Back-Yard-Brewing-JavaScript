//setting the navbar HTML
document.getElementById( 'navigation-bar' ).innerHTML = 
'<ul>'+
  "<li><button onclick='Home();' id='home-link'>Home</button></li>"+
  "<li><a id='recipes-link' href='/recipes'>Recipes</a></li>"+
  "<li><a id='festivals-link' href='/festivals'>Festivals</a></li>"+
  "<li><a href='/auth/logout' id='logout'>Logout</a></li>"+
 '</ul>';

// window.onload = () => {
// 	GetRequest( '/api/me', undefined, ( status, user ) => {

// 		if ( user._id == undefined ) {
// 			document.getElementById( 'logout' ).style.display = 'none';
// 		} else { 
// 			document.getElementById( 'logout' ).style.display = 'inline-block';
// 		}

// 	});
// }

var Home = () => {

	GetRequest( '/api/me', undefined, ( status, user ) => {

		if(status == 200){
			window.open('/user/' + user.username, "_parent");
			document.getElementById('logout').style.display = 'inline-block';
		}else{
			window.open('/', "_parent");
		}

	});
	
}

