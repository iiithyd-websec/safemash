
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index');
};

exports.safemash = function(req, res){
	res.render('safemash');
};

exports.gmaps = function(req, res){
	res.render('sm-gmaps');
};

exports.flickr = function(req, res){
	res.render('sm-flickr');
};

exports.customize = function(req, res){
	res.render('sm-customize');
};

exports.test = function(req, res){
	res.render('ifrTest');
};