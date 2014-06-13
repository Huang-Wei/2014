var express = require('express');
var http = require('http');
var path = require('path');
var dispatch = require('./dispatch');
var url = require('./util').getURL();
var MongoClient = require('mongodb').MongoClient;

var app = express();

// var MongoStore = require('connect-mongo')(express);

// all environments
app.set('port', process.env.VCAP_APP_PORT || 2014);
// app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('hweicdl@cn.ibm.com'));
app.use(express.cookieSession());
// app.use(express.session({
//   store: new MongoStore({
//     url: url
//   }),
//   secret: 'hweicdl@cn.ibm.com'
// }));
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.render('404');
});

// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }
app.use(express.errorHandler({dumpExceptions: true, showStack: true}));

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log(err);
    return;
  }

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

  dispatch.routes(app, db);
});
