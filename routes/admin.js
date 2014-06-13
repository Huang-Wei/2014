var key = require('../db/key');
var SHA1 = require('../db/sha1').SHA1;

exports.serverStatus = function(req, res, dao) {
  dao.getServerStatus(function(err, info) {
    res.render('admin/serverStatus', {err: err, info: JSON.stringify(info)})
  })
};

exports.verifyAdmin = function(req, res, next) {
  var keycode = req.body.key; // 验证
  if (keycode == null || SHA1(keycode) !== key)
    return res.send("无权限");
  else
    next();
};
