document.getElementById('navigation-bar').innerHTML = 
'<ul>'+
  "<li><button onclick='home();' id='home-link'>Home</button></li>"+
  "<li><a id='recipes-link' href='/recipes'>Recipes</a></li>"+
  "<li><a id='festivals-link' href='/festivals'>Festivals</a></li>"+
 '</ul>';

var home = () =>{
	getRequest('/api/me', undefined, (status, user)=>{
		if(status === 200){
			window.open('/user/' + user.username, "_parent");
		}else{
			window.open('/', "_parent")
		}
	})
}