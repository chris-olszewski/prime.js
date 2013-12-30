
var pg = require('pg').native
	, connectionString = process.env.HEROKU_POSTGRES_WHITE_URL || 'postgres://localhost:5432/prime'
	, client
	, query;

/* Returns next number to be generated */

exports.next_number = function(req, res) {
	client = new pg.Client(connectionString);
	client.connect(function(err) {
		if (err) {
			console.error("Error connecting to PostgreSQL", err);
		} else {
			client.query('SELECT max(number) FROM numbers', function(err, result) {
				var new_number = parseInt(result.rows[0].max) + 1;
				console.log("New number is " + new_number)
				client.query('INSERT INTO numbers (number) VALUES ($1)', [String(parseInt(result.rows[0].max) + 1)], function(err, result) {
					res.send(String(new_number));
				});
			});
		};
	});
};

/* Updates number */

exports.update = function(req, res) {
	number = req.params.number
	client = new pg.Client(connectionString);
	client.connect(function() {
		client.query('UPDATE numbers SET prime=$1 WHERE number=$2', [String(req.query.prime), String(number)], function() {
			res.send("Updated number");
		});
	});
};