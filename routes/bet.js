var mongo = require('../mongo');
var util = require('../util');

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

      var lastDate = null;
      items.forEach(function(item, index) {
        // pretty time
        var time = util.getLocalTime(item.time, 8);
        item.showDate = time[0];
        item.showTime = time[1];

        if (lastDate != time[0]) {
          lastDate = time[0];
        }
        else {
          item.hideDate = true;
        }
        
        // pretty score
        var score = bet.bet[index];
        if (score == null) {
          item["score1"] = "N/A";
          item["score2"] = "N/A";
        }
        else {
          item["score1"] = score.split(":")[0];
          item["score2"] = score.split(":")[1];
        }
      });
      res.render('bet', {items: items});
    });
  });
};

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
    return res.send("alert-danger,竞猜时间已过"); // 可能是用户在改系统时间...

  mongo.vote(user, score1+":"+score2, rowno, function(err) {
    if (err) {
      return res.send("alert-danger,竞猜比分失败");
    }
    res.send("alert-success,竞猜比分成功");
  })
};