var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');

var indexRouter = require('./routes/indexRoute');
var usersRouter = require('./routes/usersRoute');
var disabilitiesRouter = require('./routes/disabilitiesRoute');

var app = express();

//var cors = require('cors');
//app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.use(cors({ origin: 'http://localhost:3000 ', credentials: true }));

//Allow Access Control
app.use(function(req, res, next) {//http://localhost:3009
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


/*app.use(function(req,res,next){
  res.writeHead(200, {'Content-Type': 'application/json'});
  next();
});*/


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/disabilities', disabilitiesRouter);

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
  //res.render('error');
  console.log(err);
  res.send(err.message);
});

module.exports = app;
