var pg = require('pg').native
  , connectionString = process.env.HEROKU_POSTGRESQL_WHITE_URL || 'postgres://localhost:5432/prime'
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('CREATE TABLE numbers (number bigserial PRIMARY KEY prime boolean)');
query.on('end', function() { client.end(); });
