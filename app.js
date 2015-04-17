var http = require("http");

var express = require("express"),
	app = express();
var debug = require('debug')('random:app');

var FB = require('fb');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get("/", function(req, res){
	debug('serving foo');
	res.status(200).send({
		foo:'bar'
	});
});

app.get("/api/:token", function(req, res) {
     res.send("token is set to " + req.param("token"));
});

app.get("/page", function(req, res){
	debug('serving page');
	res.render('main');
});

http.createServer(app).listen(3000, function ()
{
	console.log ('Listening on 3000');
});