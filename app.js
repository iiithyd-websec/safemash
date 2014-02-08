
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes'); //same as: require('./routes/index');
var lib = require('./routes/lib');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));


//app.set('view engine', 'ejs'); 
/*BEGIN app.engine: Change default view engine to write views in "html", instead of "ejs"*/
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
/*End app.engine*/

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({secret: 'alessios'}));

var baseUrl="";
app.configure('production', function () {
    app.disable('view cache');
	env="prod";
	baseUrl="http://safemash.herokuapp.com";
});
app.configure('development', function () {
    app.disable('view cache');
	env="dev";
	baseUrl="http://localhost:3000";
});

app.use(function (req, res, next) {
	res.locals.baseUrl=baseUrl;
	next();
});

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/safemash', routes.safemash);
app.get('/gmaps',routes.gmaps);
app.get('/flickr',routes.flickr);
app.get('/customize',routes.customize);
app.get('/test',routes.test);

app.use(lib.notFound);

var port = process.env.PORT || 3000;
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + port);
});

/*
var ports = [3000, 3100];
ports.forEach(function(port) {
    var s = http.createServer(app);
    s.listen(port, function(){
		console.log('Express server listening on port ' + port);
	});
});
*/

/*
var server=http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/