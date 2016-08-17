var recipeModel = require("../../models/recipes");
var passport = require('passport');
var Post = require('./post');
var Delete = require('./delete');
var Get = require('./get');


module.exports = {
	Post 			: 	Post,
	Delete 			: 	Delete,
	Get 			: 	Get,
}