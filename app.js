var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session')
var sessions = require("client-sessions");

var cmsRouter = require('./routes/cms');





var app = express();


app.use(session({
	secret: 'blargadeeblargblarg',
	resave: false,
  saveUninitialized: true,
  
  cookie: { secure: false, maxAge: 10*60*60, }
}))

app.use(sessions({
  cookieName: 'mySession', // cookie name dictates the key name added to the request object
  secret: 'blargadeeblargblarg', // should be a large unguessable string
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.set('layout', 'index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cms', cmsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect('/cms/users');
});


// error handler
app.use(function(err, req, res, next) {
  //res.locals.sessionUser = req.mySession.sessionUser
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  console.log('---------- ERROR START -------- ');
  console.log(`Oops: ${err}`); 
  console.log(err.stack);
  console.log('---------- ERROR END -------- ');

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
