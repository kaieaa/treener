const { dbConfig } = require('./config');
// get the client
const mysql = require('mysql2');
const util = require('util');
 
// create the connection to database
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  timezone: 'local',
  dateStrings: [
		'DATE', // DATE's are returned as strings (otherwise they would be interpreted as YYYY-MM-DD 00:00:00+00:00)
		'DATETIME' // DATETIME's return as strings (otherwise they would interpreted as YYYY-MM-DD HH:mm:ss+00:00)
	]
});

connection.query = util.promisify(connection.query);

module.exports = connection;