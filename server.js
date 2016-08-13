//===============
//  REQUIRES
//===============
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var multer = require("multer");
var crypto = require("crypto");
var path = require('path')

var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err){
      	return cb(err);
      } 
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage })
var server = express();


//===================
//CONTROLLERS
//===================
var recipes = require("./controllers/recipes/index");
var favRecipeController = require("./controllers/favRecipeController");
var authenticationController = require('./controllers/authentication');
var imageController = require("./controllers/imageController");
var dataScrape = require("./controllers/dataScrape");

var passportConfig = require('./config/passport');
var passport = require('passport');

//application configuration
//resave will keep it true

server.sessionMiddleware = session({
	secret            : "2CBABA1ITL#ST#1@92",
	resave            : true,
	saveUninitialized : false,
	rolling			  : true,
	cookie			  : {maxAge: 60000 * 60}
});
server.use(server.sessionMiddleware);

//End Express Session Setup

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false}));
server.use(express.static(__dirname + "/public"));


server.use(passport.initialize());

server.use(passport.session());

//==============
//GET ROUTES
//==============
server.get("/", function(req, res){
	res.sendFile("/home.html", {root: "./public/html"})
});

server.get("/recipes", function(req, res){
	res.sendFile("/recipes.html", {root: "./public/html"})
});

server.get("/submitrecipe", function(req, res){
	res.sendFile("/recipe-submission.html", {root: "./public/html"})
});
server.get("/user/:id", function(req, res){
	res.sendFile("/user.html", {root: "./public/html"})
});



server.get("/beer/:beerAlias", recipes.Get.GetByBeerType);

server.get("/getallbeertypes", recipes.Get.GetAllBeerTypes);

server.get("/getImage/", imageController.getImage);

//MULTIPLE RECIPES
server.get("/getuserrecipes/:_id", recipes.Get.GetUserRecipes);
//SINGLE RECIPE
server.get("/getuserrecipe/:_id", recipes.Get.GetUserRecipe);

server.get("/getFavoriteRecipes", favRecipeController.getFavoriteRecipes);

server.get("/getFestivals", dataScrape.getFestivals);



//=============
//POST ROUTES
//=============
// server.post("/createrecipe", upload.single("image"), recipes.createRecipe);
server.post("/createrecipe", recipes.Post.PostRecipe);

server.post("/addFavoriteRecipe", favRecipeController.addFavoriteRecipe);

//=============
//PUT ROUTES
//=============
server.put("/updaterecipe", recipes.Update.UpdateRecipe);
// server.put("/updaterecipe", recipes.updateRecipe);
server.put("/removeFavoriteRecipe", favRecipeController.removeFavoriteRecipe);	

//==============
//DELETE ROUTES
//==============
server.delete("/deleterecipe/:id", recipes.Delete.DeleteRecipe);



//==============
//PASSPORT AUTHENTICATION ROUTES
//==============

// Post received from submitting the login form
server.post('/auth/login', authenticationController.processLogin);

server.post('/auth/signup', authenticationController.processSignup);


server.get('/auth/logout', authenticationController.logout);

// This route is designed to send back the logged in user (or undefined if they are NOT logged in)
server.get('/api/me', function(req, res){
	if(req.user){
		req.user.password = "none of your damn business";
		res.send(req.user)
	}else{
		res.status(400).send({message: "user not found"});
	}
})

//============
//PORT
//============
var port = 3000;
server.listen(port, function(){
  console.log('Server running on port ' + port);
})

