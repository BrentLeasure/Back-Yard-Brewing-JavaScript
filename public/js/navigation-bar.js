document.getElementById('navigation-bar').innerHTML = 
'<ul>'+
  "<li><button onclick='Home();' id='home-link'>Home</button></li>"+
  "<li><a id='recipes-link' href='/recipes'>Recipes</a></li>"+
  "<li><a id='festivals-link' href='/festivals'>Festivals</a></li>"+
  "<li><button onclick='Logout();' id='logout'>Logout</button></li>"+
 '</ul>';

var Home = () =>{
	GetRequest('/api/me', undefined, (status, user)=>{
		if(status == 200){
			window.open('/user/' + user.username, "_parent");
			document.getElementById('logout').style.display = 'inline-block';
		}else{
			window.open('/', "_parent");
		}
	})
}

var Logout = () =>{
	GetRequest('/auth/logout', undefined, (status, response)=>{
		if(status == 200){
			document.getElementById('logout').style.display = 'none';
			window.open('/', "_parent");
		}
	})
}