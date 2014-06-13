var routes = require('./routes');
var match = require('./routes/match');
var bet = require('./routes/bet');
var board = require('./routes/board');
var user = require('./routes/user');
var circle = require('./routes/circle');
var rule = require('./routes/rule');
var admin = require('./routes/admin');

exports.routes = function(app, db) {
  var dao = require('./dao')(db);

  /**************************** static **********************************/
  app.get('/', routes.index);
  app.get('/rule', rule.index);

  /**************************** monitor *********************************/
  app.get('/admin/serverStatus', function(req, res) {
    admin.serverStatus(req, res, dao);
  });

  /**************************** guest use *******************************/
  app.get('/calendar', function(req, res) {
    match.showCalendar(req, res, dao);
  });

  app.get('/match/:no', function(req, res) {
    match.showBetItemsByMatch(req, res, dao);
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

  /**************************** user use *******************************/
  app.get('/bet/vote', user.verifyIfLogin, function(req, res) {
    bet.showVoteResults(req, res, dao);
  });

  app.post('/bet/vote', user.verifyIfLogin, function(req, res) {
    bet.vote(req, res, dao);
  });

  app.post('/bet/voteAll', user.verifyIfLogin, function(req, res) {
    bet.voteAll(req, res, dao);
  });

  app.get('/circle/create', user.verifyIfLogin, function(req, res) {
    circle.createView(req, res, dao);
  });

  app.post('/circle/create', user.verifyIfLogin, function(req, res) {
    circle.create(req, res, dao);
  });

  app.get('/circle/join/:circleName', user.verifyIfLogin, function(req, res) {
    circle.join(req, res, dao);
  });

  app.get('/circle/quit/:circleName', user.verifyIfLogin, function(req, res) {
    circle.quit(req, res, dao);
  });

  app.get('/circle/discard/:circleName', user.verifyIfLogin, function(req, res) {
    circle.discard(req, res, dao);
  });

  app.get('/circle', user.verifyIfLogin, function(req, res) {
    circle.index(req, res, dao);
  });

  /***************************** admin use *******************************/
  app.post('/admin/match', admin.verifyAdmin, function(req, res) {
    match.updateScore(req, res, dao);
  });

  app.post('/admin/adduser', admin.verifyAdmin, function(req, res) {
    user.adduser(req, res, dao);
  });

  app.post('/admin/insertMatch', admin.verifyAdmin, function(req, res) {
    match.insertMatch(req, res, dao);
  });

  app.post('/admin/createIndex', admin.verifyAdmin, function(req, res) {
    match.createIndex(req, res, dao);
  });

  /***************************************************************************/
  app.get('/circle/:circleName', function(req, res) {
    circle.showBoard(req, res, dao);
  });
};