var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


var app = express();

const urlDB = process.env.MONGODBFORMATION;//var avec la base mongo

var SECRET = process.env.SECRETKEY;//var avec la base mongo 'simplon_reunion_4p_dw-AB_IH_JFG'
    SECRET = 'simplon_reunion_4p_dw-AB_IH_JFG'; // /!\ COMMENTER LORS DE LA MISE EN PROD, UNIQUEMENT POUR LES TESTS'rs

//connection à la base de données
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongodb://<dbuser>:<dbpassword>@ds127851.mlab.com:27851/simplon-voitures
// mongoose.connect('mongodb://localhost/Idriss')
mongoose.connect(urlDB, { useNewUrlParser: true })
      .then(() =>  console.log('connection succesful'))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

var usersRouter = require('./routes/users');
app.use('/users', usersRouter);

var particuliersRouter = require('./routes/particuliers');
app.use('/particuliers', particuliersRouter);

var cuisiniersRouter = require('./routes/cuisiniers');
app.use('/cuisiniers', cuisiniersRouter);

var ateliersRouter = require('./routes/ateliers');
app.use('/ateliers', ateliersRouter);

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
