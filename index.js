var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = app.listen(4040, "localhost",
	function(){
		var host  = server.address().address;
		var port = server.address().port;
		console.log('Example app is listening at http://%s:%s', host, port);
	});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(require(__dirname + '/config/Router')(express.Router()));