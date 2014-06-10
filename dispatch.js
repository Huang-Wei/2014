// var MongoClient = require('mongodb').MongoClient;
// var util = require('./util');
// var url = util.getURL();
var routes = require('./routes');
var match = require('./routes/match');
var bet = require('./routes/bet');
var board = require('./routes/board');
var user = require('./routes/user');
var circle = require('./routes/circle');
var rule = require('./routes/rule');
var admin = require('./routes/admin');

exports.routes = function(app, db) {
  // MongoClient.connect(url, function(err, db) {
    var dao = require('./dao')(db);

    app.get('/', routes.index);
    app.get('/rule', rule.index);

    app.get('/calendar', function(req, res) {
      match.showCalendar(req, res, dao);
    });

    // monitor
    app.get('/admin/serverStatus', function(req, res) {
      admin.serverStatus(req, res, dao);
    });

    // admin use
    app.post('/admin/match', function(req, res) {
      match.updateScore(req, res, dao);
    });

    // admin use
    app.post('/admin/adduser', function(req, res) {
      user.adduser(req, res, dao);
    });

    // admin use
    app.post('/admin/insertMatch', function(req, res) {
      match.insertMatch(req, res, dao);
    });

    // admin use
    app.post('/admin/createIndex', function(req, res) {
      match.createIndex(req, res, dao);
    });

    app.get('/match/:no', function(req, res) {
      match.showBetItemsByMatch(req, res, dao);
    });

    app.get('/bet/vote', function(req, res) {
      bet.showVoteResults(req, res, dao);
    });

    app.post('/bet/vote', function(req, res) {
      bet.vote(req, res, dao);
    });

    app.post('/bet/voteAll', function(req, res) {
      bet.voteAll(req, res, dao);
    });

    app.get('/board', function(req, res) {
      board.index(req, res, dao);
    });

    app.get('/user/login', function(req, res) {
      user.login(req, res, dao);
    });

    app.post('/user/login', function(req, res) {
      user.verifyUser(req, res, dao);
    });

    app.get('/user/logout', function(req, res) {
      user.logout(req, res, dao);
    });

    app.get('/user/reg', function(req, res) {
      user.regView(req, res, dao);
    });

    app.post('/user/reg', function(req, res) {
      user.reg(req, res, dao);
    });

    app.get('/circle', function(req, res) {
      circle.index(req, res, dao);
    });

    app.get('/circle/create', function(req, res) {
      circle.createView(req, res, dao);
    });

    app.post('/circle/create', function(req, res) {
      circle.create(req, res, dao);
    });

    app.get('/circle/join/:circleName', function(req, res) {
      circle.join(req, res, dao);
    });

    app.get('/circle/quit/:circleName', function(req, res) {
      circle.quit(req, res, dao);
    });

    app.get('/circle/discard/:circleName', function(req, res) {
      circle.discard(req, res, dao);
    });

    app.get('/circle/:circleName', function(req, res) {
      circle.showBoard(req, res, dao);
    });

  // });
};