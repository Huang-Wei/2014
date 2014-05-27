var mongo = require('../mongo');

exports.showVoteResults = function(req, res) {
  var user = req.session.user;
  if (user == null || user === '') {
    res.send("用户未登陆");
    return res.redirect('/user/login');
  }

  mongo.getVoteItemsByUser(user, function(err, bet) {
    // TODO: bet为一个长度为64的数组 or 一个空的数组
    if (err) {
      console.log(err);
      return;
    }
    mongo.getAllMatches(function(err, items) {
      if (err) {
        console.log(err);
        return;
      }
      items.forEach(function(item, index) {
        var score = bet.bet[index];
        item["score1"] = score.split(":")[0];
        item["score2"] = score.split(":")[1];
      });
      res.render('bet', {items: items});
    });
  });
}

exports.vote = function(req, res) {
  var user = req.session.user;
  if (user == null || user === '') {
    res.send("用户未登陆");
    return res.redirect('/user/login');
  }

  var score1 = req.body.score1;
  var score2 = req.body.score2;
  var rowno = req.body.rowno;
  var matchTime = new Date(parseInt(req.body.matchTime));
  var thisTime = new Date();

  if (thisTime > matchTime)
    return res.send("投票时间已过"); // 可能是用户在改系统时间...

  mongo.vote(user, score1+":"+score2, rowno, function(err) {
    if (err) {
      return res.send("投票失败");
    }
    res.send("投票成功");
  })
}