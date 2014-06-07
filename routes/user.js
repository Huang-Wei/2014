var mongo = require('../mongo');
var key = require('../db/key');
var SHA1 = require('../db/sha1').SHA1;

exports.login = function(req, res) {
  res.render('login');
};

exports.verifyUser = function(req, res) {
  var result = {};
  if (req.session.user) {
    result.css = 'alert-warning';
    result.msg = req.session.user+"已登录。若以其他用户登陆，请先注销当前用户。";
    return res.send(result);
  }

  var user = req.body.user;
  var password = req.body.password;

  mongo.getUserByName(user, password, function(err, item) {
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
  var keycode = req.body.key; // 验证
  if (keycode == null || SHA1(keycode) !== key)
    return res.send("无权限");

  var object = {
    user: req.body.user,
    showname: req.body.showname || req.body.user,
    password: req.body.password || "password"
  };

  mongo.addUser(object, function(err, item) {
    if (err) return res.send("post注册失败");
    res.send("post注册成功");
  })
  // res.render('reg');
};