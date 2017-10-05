var express = require('express');
var db = require('./database.js');

var randomStat = 0;
var randomSentence = "";

function callback(data) {
	randomStat = data.stats;
	randomSentence = data.sentence;
}

var app = express();

app.set('view engine', 'ejs');

app.listen(3000);
console.log("Listening to port 3000...");

app.use(express.static('public'));

app.get('/', function(req, res) {
	console.log(req.url);
	res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(req, res) {
	console.log(req.url);
	res.sendFile(__dirname + '/assets/style.css');
});

app.get('/script.js', function(req, res) {
	console.log(req.url);
	res.sendFile(__dirname + '/scripts/script.js');
});

app.get('/database/:id', function(req, res) {
	console.log(req.url);
	db.getRandomStat(req.params.id, callback);
	setTimeout(function() {
		res.send({
			'stats' : randomStat,
			'sentence' : randomSentence
		});
	}, 10);
});
