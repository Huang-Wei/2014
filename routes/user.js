var mongo = require('../mongo');

exports.login = function(req, res) {
  res.render('login');
};

exports.verifyUser = function(req, res) {
  var result = {};
  if (req.session.user) {
    result.msg = req.session.user+"已登录";
    return res.send(result);
  }

  var user = req.body.user;
  var password = req.body.password;

  mongo.getUserByName(user, password, function(err, item) {
    if (err || item == null)
      result.msg = "登录失败：无此用户";
    else if (item != null) {
      if (item.password === password) {
        req.session.user = user;
        return res.redirect('/bet/vote');
      }
      else {
        result.msg = "登录失败：密码错误";
      }
    }
    res.send(result);
  });
};

exports.logout = function(req, res) {
  if (req.session) {
    req.session.auth = null;
    res.clearCookie('auth');
    req.session.destroy(function() {});
  }
  res.redirect('/');
};

exports.regView = function(req, res) {
  res.render('reg');
};

exports.reg = function(req, res) {
  var object = {
    user: req.body.user,
    showname: req.body.showname || user,
    password: req.body.password || "password"
  };

  mongo.addUser(object, function(err, item) {
    if (err) return res.send("post注册失败");
    res.send("post注册成功");
  })
  // res.render('reg');
};