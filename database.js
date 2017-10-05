var sqlite3 = require('sqlite3');

exports.getRandomStat = function(id, callback) {

	var db = new sqlite3.Database('db/facts.db');

	db.serialize(function() {
		var statQuery = "SELECT * FROM facts WHERE _id = " + id;

		db.get(statQuery, function(err, row) {
			if (err) throw err;
			data = {stats : row.stats, sentence : row.sentence};
			callback(data);
		});
	});
}
