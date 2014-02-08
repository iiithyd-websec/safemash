/*
 * Library functions
 */
exports.notFound=function(req, res){
	res.status(404);
	var msg="Sorry! No such page :-) ";
	_renderPage(res, '404!', msg);
}

function _renderPage(responseObj, title, msg){
	responseObj.render('404', { customTitle: title, customMsg: msg});
}

exports.customErrorPage=_renderPage;