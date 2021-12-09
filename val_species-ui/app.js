const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const expJwt = require('./express-pg-user/exp_jwt');
const secrets = require('./secrets').secrets;

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

//https://stackoverflow.com/questions/34589272/how-to-set-authorization-headers-with-nodejs-and-express
//app.use(expJwt()); // use JWT auth to secure the api

app.use(async (req) => {
  const token = req.headers.authorization || req.cookies.login;
  if (token) {
    await jwt.verify(token, secrets.token.secret, (err, payload) => {
      if (err) {
        console.log('jwt.verify | ERROR', err);
        return req.next(err);
      }
      payload.now = Date.now();
      console.log('app.use::jwt.verify | token payload:', payload);
      req.user = payload;
      return req.next();
    });
  } else {
    //match open paths. thow next(err) to stop propgation
    console.log('request route |', req.baseUrl + req.path);
    switch (req.baseUrl + req.path) {
      case '/':
      case '/user/reset':
      case '/user/login':
        return req.next();
        break;
      default:
        next('No auth token.');
    }
  }
});

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
