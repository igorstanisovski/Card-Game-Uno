var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//connection to database
var mongoose = require('mongoose');
//var mongoDB = 'mongodb://localhost/cardGameDatabase';
var mongoDB = 'mongodb+srv://igorcheta:12345@cluster-game-xk9iu.mongodb.net/cardGame';
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
//check for error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//check connection
db.on('connected', () => {
  console.log("Succesfully connected!!!");
});

var indexRouter = require('./routes/index');
//routers
var usersRouter = require('./routes/userRoutes');

var app = express();

var cors = require('cors');
var allowedOrigins = ['http://localhost:4200', 'http://localhost:3000', 'http://yourapp.com', 'http://192.168.0.7:4200'];

 app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}
));

var session = require('express-session');
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
