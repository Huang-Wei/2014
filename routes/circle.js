var mongo = require('../mongo');

exports.index = function(req, res) {
  if (req.session.user == null) {
    return res.redirect('/user/login');
  }

  mongo.getMyCircles(req.session.user, function(err, items) {
    if (err) {
      console.log(err);
      return res.render('circle', {items:{}});
    }
    res.render('circle', {items: items});
  });
};

exports.showBoard = function(req, res) {
  var circleNo = parseInt(req.params.no);

  mongo.getUsersByCircle(circleNo, function(err, users) {
    if (err || users == null || users.length == 0) {
      console.log(err);
      return res.render('board', {items:{}});
    }

    userList = [];
    users.forEach(function(item, index) {
      userList.push(item.user);
    });
    mongo.getBoard({user: {$in: userList}}, function(err, items) {
      res.render('board', {items: items, circleNo: circleNo});
    });
  });
}