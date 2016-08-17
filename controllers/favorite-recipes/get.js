var GetFavoriteRecipes = function(req, res){
	if(req.user){
		res.send(req.user.favoriteRecipes);
	}else{
		return res.status(403).send({
			message: "you are not logged in"
		});
	}
}


module.exports = {
	GetFavoriteRecipes : GetFavoriteRecipes,
}