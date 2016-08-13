var login = () => {

	//setting user parameters
	let login = {email: null, password: null};

	login.email = document.getElementById('email').value;
	login.password = document.getElementById('password').value;

	postRequest('/auth/login', login, 'application/json', (num, user) => {
		if(num == 200){
			//if user is passed, then open userprofile. Otherwise display err
			user = JSON.parse(user.responseText);
			window.open("/user/" + user.username, "_parent");
		}else{
			
		}
	});
}