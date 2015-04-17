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
	debug('serving api');
	var token = req.param("token");
		FB.setAccessToken(token);
	debug('token is ' + token);
	FB.api('/me', function (response) {
	  if(!response || response.error) {
	   console.log(!response ? 'error occurred' : response.error);
	   return;
	  }
	  console.log(response.id);
	  console.log(response.name);

	res.status(200).send({
		fbToken:token,
		name:response.name,
		profilePicURL: "https://graph.facebook.com/" + response.id + "/picture?type=normal"
	});

	});

});

app.get("/page", function(req, res){
	debug('serving page');
	res.render('main');
});

http.createServer(app).listen(3000, function ()
{
	console.log ('Listening on 3000');
});