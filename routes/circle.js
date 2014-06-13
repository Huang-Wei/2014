// var dao = require('../dao');

exports.index = function(req, res, dao) {
  dao.getMyCircles(req.session.user, function(err, items) {
    if (err || items == null) {
      console.log(err);
      return res.render('circle/index', {items:{}});
    }
    res.render('circle/index', {items: items});
  });
};

exports.showBoard = function(req, res, dao) {
  // var circleNo = parseInt(req.params.no);
  var circleName = req.params.circleName;

  dao.getUsersByCircle(circleName, function(err, users) {
    if (err || users == null || users.length == 0) {
      console.log(err);
      return res.render('board', {items:{}});
    }

    var userList = [];
    var loginUser = req.session.user;
    var enableJoin = true; // 当前登录用户是否属于这个组

    users.forEach(function(item, index) {
      userList.push(item.user);
      if (item.user === loginUser)
        enableJoin = false;
    });
    dao.getBoard({user: {$in: userList}}, function(err, items) {
      res.render('board', {
        items: items,
        circleName: circleName,
        enableJoin: enableJoin
      });
    });
  });
};

exports.createView = function(req, res, dao) {
  res.render('circle/create');
};

exports.create = function(req, res, dao) {
  var circle = {
    name: req.body.name,
    desc: req.body.desc,
    owner: req.session.user
  };

  dao.createCircleByName(circle, function(err, item) {
    // TODO: 错误处理
    res.redirect('circle');
  });
};

exports.join = function(req, res, dao) {
  var circleName = req.params.circleName;
  var user = req.session.user;

  dao.joinCircle(user, circleName, function(err, item) {
    // TODO: 错误处理
    res.redirect('circle/'+circleName);
  });
};

exports.quit = function(req, res, dao) {
  var circleName = req.params.circleName;
  var user = req.session.user;

  dao.quitCircle(user, circleName, function(err, item) {
    // TODO: 错误处理
    res.redirect('circle');
  });
};

exports.discard = function(req, res, dao) {
  var circleName = req.params.circleName;
  var user = req.session.user;

  dao.discardCircle(user, circleName, function(err, item) {
    if (item == 0)
      console.log("只有圈子owner才能解散圈子");
    // TODO: 错误处理
    res.redirect('circle');
  });
};