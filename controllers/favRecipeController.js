var passport = require('passport');
var userModel = require("../models/user");
var recipeModel = require("../models/recipes");








module.exports = {
	addFavoriteRecipe    : addFavoriteRecipe,
	removeFavoriteRecipe : removeFavoriteRecipe,
	getFavoriteRecipes   : getFavoriteRecipes,
}
