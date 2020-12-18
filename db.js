  // Impordime config.js failist andmebaasiühenduse jaoks vajalikud muutujad
  const { dbConfig } = require('./config')
  // Impordime mysql2 teegi ja omistame selle mysql konstanti
  const mysql = require('mysql2');
  // Impordime Node util teegi selleks, et saaksime hiljem mysql andmebaasi ühendust kasutada sünkroonselt async/await-iga
  const util = require('util');

  // Loome andmebaasi ühenduse jaoks config objekti
  const config = {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
};
// Loome ühenduse andmebaasiga
const connection = mysql.createConnection(config);
// Muudame query callback funktsiooni Promise-ks
connection.query = util.promisify(connection.query);
// Ekspordime ühenduse
module.exports = connection;