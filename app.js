var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var match = require('./routes/match');
var bet = require('./routes/bet');
var board = require('./routes/board');
var user = require('./routes/user');

var app = express();

var MongoStore = require('connect-mongo')(express);
// var MemoryStore = express.session.MemoryStore;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  store: new MongoStore({
    url: 'mongodb://localhost:27017/2014'
  }),
  secret: 'hweicdl@cn.ibm.com'
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.render('404');
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/match', match.updateScore); // admin use
app.get('/match/:no', match.showBetItemsByMatch);
app.get('/bet/vote', bet.showVoteResults);
app.post('/bet/vote', bet.vote);
app.get('/board', board.index);
app.get('/user/login', user.login);
app.post('/user/login', user.verifyUser);
app.get('/user/logout', user.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
