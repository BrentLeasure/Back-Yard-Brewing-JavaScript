var fs = require('fs');
var path = require("path");

function getImage( req, res ) {
	
	res.setHeader( 'Content-Type', req.query.mimetype )
	fs.createReadStream( path.join( './uploads/', req.query.filename ) );
	
}

module.exports = {
	getImage		: getImage,
}