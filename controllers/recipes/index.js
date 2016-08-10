var recipeModel = require("../../models/recipes");
var Update = require('./update');
var Delete = require('./delete');
var Get = require('./get');
var Post = require('./post');

module.exports = {
	Update 			: 	Update,
	Delete 			: 	Delete,
	Get 			: 	Get,
	Post 			: 	Post,
}