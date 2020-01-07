const admin = require('firebase-admin');
var serviceAccount = require('./secret/mask-mask-firebase-adminsdk-offql-586ca99d44.json');


admin.initializeApp({
	credential: admin.credential.cert(serviceAccount), // Or credential
	databaseURL: 'https://mask-mask-hoangtest.firebaseio.com/'
});

var db = admin.database();

module.exports = db;