var login = () => {

	//setting user
	let login = {username: null, password: null};

	login.username = document.getElementById('username').value;
	login.password = document.getElementById('password').value;

	postRequest('/auth/login', login, (num, user) => {
		console.log(user);
	});
}