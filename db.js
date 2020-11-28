const admin = require('firebase-admin');

const { serviceAccount, config } = require('./config');
//var  = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  databaseURL: config.databaseUrl
});

const db = admin.firestore();

module.exports = db;