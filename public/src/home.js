var login = () => {

	//setting user
	let login = {email: null, password: null};

	login.email = document.getElementById('email').value;
	login.password = document.getElementById('password').value;

	postRequest('/auth/login', login, 'application/json', (num, user) => {
		console.log(user);
	});
}