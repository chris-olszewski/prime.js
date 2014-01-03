var pg = require('pg');
var conString = process.env.DATABASE_URL || {user: 'postgres', password: 'pass', database: 'prime'};
/* Returns next number to be generated */

exports.next_number = function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('Error fetching client from pool', err);
		};
		client.query('SELECT max(number) FROM numbers', function(err, result) {
			new_number = parseInt(result.rows[0].max) + 1;
			if (!err) {
				client.query('INSERT INTO numbers (number) VALUES ($1)', [String(parseInt(result.rows[0].max) + 1)], function(err, result) {
					done();
					res.send(String(new_number));
				});
			};
		});
	});
};

/* Updates number */

exports.update = function(req, res) {
	number = req.params.number
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error("Error fetching client from pool", err);
		};
		client.query('UPDATE numbers SET prime=$1 WHERE number=$2', [String(req.query.prime), String(number)], function() {
			res.send("Updated number");
			done();
		});
	});
};