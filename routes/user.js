var dao = require('../dao');

exports.login = function(req, res, dao) {
  res.render('login');
};

exports.verifyIfLogin = function(req, res, next) {
  var user = req.session.user;
  var result = {};
  if (user == null || user === '') {
    result.css = 'alert-warning';
    result.msg = '用户未登录，请先登录再操作';
    return res.send(result);
  }
  else {
    next();
  }
};

exports.verifyUser = function(req, res, dao) {
  var result = {};
  if (req.session.user) {
    result.css = 'alert-warning';
    result.msg = req.session.user+"已登录。若以其他用户登陆，请先注销当前用户。";
    return res.send(result);
  }

  var user = req.body.user;
  var password = req.body.password;

  dao.getUserByName(user, password, function(err, item) {
    if (err || item == null) {
      result.css = 'alert-danger';
      result.msg = '登录失败：无此用户';
    }
    else if (item != null) {
      if (item.password === password) {
        req.session.user = user;
        result.css = 'alert-success';
        result.msg = '登录成功';
        // return res.redirect('/bet/vote');
      }
      else {
        result.css = 'alert-danger';
        result.msg = '登录失败：密码错误';
      }
    }
    console.log(result);
    res.send(result);
  });
};

exports.logout = function(req, res, dao) {
  if (req.session) {
    req.session = null;
    // req.session.auth = null;
    // res.clearCookie('auth');
    // req.session.destroy(function() {});
  }
  res.redirect('/');
};

exports.regView = function(req, res, dao) {
  res.render('reg');
};

// admin use
exports.adduser = function(req, res, dao) {
  var object = {
    user: req.body.user,
    showname: req.body.showname || req.body.user,
    password: req.body.password || "password"
  };

  dao.addUser(object, function(err, item) {
    if (err) return res.send("post注册失败");
    res.send("post注册成功");
  })
};

// 正常的用户注册
exports.reg = function(req, res, dao) {
  var object = {
    user: req.body.user,
    showname: req.body.showname || req.body.user,
    password: req.body.password || "password"
  };

  var result = {};
  dao.addUser(object, function(err, item) {
    if (err) {
      result.css = 'alert-danger';
      result.msg = '注册失败';
      // TODO 判断 daoError 类型
      // if (err.indexOf('duplicate key error') != -1)
      //   result.msg = '注册失败：此用户已存在';
      // else
      //   result.msg = '注册失败：' + err;
    }
    else {
      result.css = 'alert-success';
      result.msg = '注册成功';
    }
    res.send(result);
  })
};