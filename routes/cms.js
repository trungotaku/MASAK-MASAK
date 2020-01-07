var express = require('express');
var router = express.Router();
var sessions = require("client-sessions");

var userController = require('../controllers/user');
var merchantController = require('../controllers/merchant');

middlewareCheckLogin = function (req, res, next) {
	//console.log(req.session);
	if (typeof req.mySession.username != 'undefined' && req.mySession.username != '') {
	  next();
	}
	else {
	  res.redirect("/cms");
	}
}
// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount), // Or credential
// 	databaseURL: 'https://mask-mask-test.firebaseio.com/'
// });


// METHOD : GET 

router.get('/', function(req, res, next) {
	if (typeof req.mySession.username != 'undefined' && req.mySession.username != '') {
		res.redirect('/cms/users')
	  }
	  else {
		let title = 'Masak Masak CMS';
		res.render('login', { 
			title: title,
			layout: 'login'
		});
	  }

});



router.get('/users', [middlewareCheckLogin, userController.getUsers])
router.get('/addColumnFirebase', [middlewareCheckLogin, userController.addColumnFirebase])

router.get('/logout', (req, res) => {
	//clear session and redirect to login page
	req.mySession.reset();
	res.redirect('/cms');
})

router.get('/merchants', [middlewareCheckLogin, merchantController.getMerchants])

// END METHOD : GET 


// START METHOD : POST

router.post('/', userController.checkLogin);

router.post('/users/changestatus', [middlewareCheckLogin, userController.changeUserSuspendStatus])

// END METHOD : POST

module.exports = router;
