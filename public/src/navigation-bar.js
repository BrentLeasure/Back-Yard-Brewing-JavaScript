document.getElementById('navigation-bar').innerHTML = 
'<ul>'+
  "<li><button onclick='home();' id='home-link'>Home</button></li>"+
  "<li><a id='recipes-link' href='/recipes'>Recipes</a></li>"+
  "<li><a id='festivals-link' href='/festivals'>Festivals</a></li>"+
  "<li><button onclick='logout();' id='logout'>Home</button></li>"+
 '</ul>';

var home = () =>{
	getRequest('/api/me', undefined, (status, user)=>{
		if(status == 200){
			window.open('/user/' + user.username, "_parent");
			document.getElementById('logout').style.display = 'block';
		}else{
			window.open('/', "_parent");
		}
	})
}

var logout = () =>{
	getRequest('/auth/logout', undefined, (status, response)=>{
		if(status == 200){
			document.getElementById('logout').style.display = 'none';
			window.open('/', "_parent");
		}
	})
}