const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const expJwt = require('./express-pg-user/exp-jwt_handler');
const auth_token_handler = require('./express-pg-user/auth_token_handler');

var userRouter = require('./express-pg-user/user_routes_pg');
var taxonRouter = require('./routes/taxon');
var taxonApiRouter = require('./routes/taxonApi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(expJwt()); // use express-jwt to secure the api with authorization header Bearer token
app.use((req, res, next) => { auth_token_handler(req, res, next) }); // use jwt-verify to secure pug ui and api with login cooke or authorization header Bearer token

app.use('/', taxonRouter);
app.use('/user', userRouter);
app.use('/api', taxonApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
