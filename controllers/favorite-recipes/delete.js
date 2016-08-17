var RemoveFavoriteRecipe = function(req, res){
	if(req.user){
		userModel.User.update({_id: req.user._id}, {$pull :{favoriteRecipes: {_id: req.body._id}}}, function(err){
			if(err){
				res.send(err);
			}else{
				res.send("success!");
			}
		});	
	}else{
		return res.status(403).send({
			message: "you are not logged in"
		});
	}
}

module.exports = {
	RemoveFavoriteRecipe : RemoveFavoriteRecipe,
}